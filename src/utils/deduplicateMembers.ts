import { Member, TaxClearanceInfo } from '../types/member';

export interface DeduplicationResult {
  members: Member[];
  removedCount: number;
}

const PLACEHOLDER_PHONES = new Set(['27000000000', '0000000000']);

function normaliseText(value?: string): string {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function normalisePhone(value?: string): string {
  let digits = (value || '').replace(/\D/g, '');
  // Treat common local and international Zimbabwe formats as the same number.
  if (digits.startsWith('263') && digits.length >= 11) digits = `0${digits.slice(3)}`;
  return digits;
}

function usablePhone(member: Member): string {
  const phone = normalisePhone(member.phone);
  return phone.length >= 7 && !PLACEHOLDER_PHONES.has(phone) ? phone : '';
}

function usableEmail(member: Member): string {
  const email = normaliseText(member.email);
  return email.includes('@') ? email : '';
}

function nameKey(member: Member): string {
  const firstName = normaliseText(member.firstName);
  const surname = normaliseText(member.surname);
  return firstName && surname ? `${firstName}|${surname}` : '';
}

function taxScore(tax?: TaxClearanceInfo): number {
  if (!tax) return 0;
  return Object.values(tax).filter((value) => Boolean(value)).length + (tax.status === 'valid' ? 3 : 0);
}

function recordScore(member: Member): number {
  const values = [
    member.firstName,
    member.surname,
    usablePhone(member),
    usableEmail(member),
    member.notes,
    member.role && !['general member', 'core member'].includes(normaliseText(member.role)) ? member.role : '',
    member.avatarColor
  ];
  return values.filter(Boolean).length + taxScore(member.taxClearance);
}

function richerTax(first?: TaxClearanceInfo, second?: TaxClearanceInfo): TaxClearanceInfo | undefined {
  if (!first) return second;
  if (!second) return first;
  const preferred = taxScore(first) >= taxScore(second) ? first : second;
  const fallback = preferred === first ? second : first;
  return { ...fallback, ...preferred };
}

function mergeMembers(first: Member, second: Member): Member {
  const preferred = recordScore(first) >= recordScore(second) ? first : second;
  const fallback = preferred === first ? second : first;
  const notes = [preferred.notes, fallback.notes]
    .map((note) => note?.trim())
    .filter((note, index, all): note is string => Boolean(note) && all.indexOf(note) === index)
    .join('\n');

  return {
    ...fallback,
    ...preferred,
    id: preferred.id,
    firstName: preferred.firstName || fallback.firstName,
    surname: preferred.surname || fallback.surname,
    phone: usablePhone(preferred) ? preferred.phone : fallback.phone,
    email: preferred.email || fallback.email,
    role: preferred.role || fallback.role,
    status: preferred.status === 'active' || fallback.status === 'active' ? 'active' : 'inactive',
    createdAt: [preferred.createdAt, fallback.createdAt].filter(Boolean).sort()[0] || preferred.createdAt,
    avatarColor: preferred.avatarColor || fallback.avatarColor,
    taxClearance: richerTax(preferred.taxClearance, fallback.taxClearance),
    notes: notes || undefined
  };
}

/**
 * Collapses records that share a real phone number or email address. Name-only
 * matching is used only when an incoming record has neither identifier.
 * The more complete record is kept and missing values from its duplicate are retained.
 */
export function deduplicateMembers(members: Member[]): DeduplicationResult {
  const unique: Member[] = [];
  const phoneIndexes = new Map<string, number>();
  const emailIndexes = new Map<string, number>();
  const nameIndexes = new Map<string, number>();

  for (const member of members) {
    const phone = usablePhone(member);
    const email = usableEmail(member);
    const name = nameKey(member);
    const existingIndex = (phone ? phoneIndexes.get(phone) : undefined) ??
      (email ? emailIndexes.get(email) : undefined) ??
      (!phone && !email && name ? nameIndexes.get(name) : undefined);

    if (existingIndex === undefined) {
      const index = unique.length;
      unique.push(member);
      if (phone) phoneIndexes.set(phone, index);
      if (email) emailIndexes.set(email, index);
      if (name) nameIndexes.set(name, index);
      continue;
    }

    const merged = mergeMembers(unique[existingIndex], member);
    unique[existingIndex] = merged;

    const mergedPhone = usablePhone(merged);
    const mergedEmail = usableEmail(merged);
    const mergedName = nameKey(merged);
    if (mergedPhone) phoneIndexes.set(mergedPhone, existingIndex);
    if (mergedEmail) emailIndexes.set(mergedEmail, existingIndex);
    if (mergedName) nameIndexes.set(mergedName, existingIndex);
    if (phone) phoneIndexes.set(phone, existingIndex);
    if (email) emailIndexes.set(email, existingIndex);
  }

  return { members: unique, removedCount: members.length - unique.length };
}
