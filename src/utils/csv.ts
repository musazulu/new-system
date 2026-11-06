import { Member } from '../types/member';
import { AVATAR_GRADIENTS } from '../data/initialMembers';

/**
 * Escapes a cell value for standard CSV compatibility (RFC 4180).
 */
function escapeCSVCell(value: string | undefined | null): string {
  if (value === undefined || value === null) return '""';
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Exports members to a clean, downloadable CSV file with Excel-compatible UTF-8 BOM.
 */
export function exportMembersToCSV(members: Member[], customFilename?: string): void {
  const headers = [
    'First Name',
    'Surname',
    'Full Name',
    'Phone Number',
    'Email Address',
    'Role / Group',
    'Status',
    'Tax Clearance',
    'Tax Valid Until',
    'Notes',
    'Date Added'
  ];

  const rows = members.map((m) => [
    escapeCSVCell(m.firstName),
    escapeCSVCell(m.surname),
    escapeCSVCell(`${m.firstName} ${m.surname}`.trim()),
    escapeCSVCell(m.phone),
    escapeCSVCell(m.email || ''),
    escapeCSVCell(m.role || 'General Member'),
    escapeCSVCell(m.status),
    escapeCSVCell(m.taxClearance?.status ? m.taxClearance.status.toUpperCase() : 'NOT SUBMITTED'),
    escapeCSVCell(m.taxClearance?.validTo || ''),
    escapeCSVCell(m.notes || ''),
    escapeCSVCell(m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '')
  ]);

  const csvContent = '\uFEFF' + [
    headers.map((h) => `"${h}"`).join(','),
    ...rows.map((row) => row.join(','))
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const timestamp = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', customFilename || `member_contacts_${timestamp}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a blank CSV template ready for bulk adding contacts.
 */
export function downloadCSVTemplate(): void {
  const templateHeaders = ['First Name', 'Surname', 'Phone Number', 'Email Address', 'Role', 'Status', 'Notes'];
  const sampleRow = ['John', 'Doe', '+1 555 123 4567', 'john.doe@example.com', 'Core Member', 'active', 'Coordinator'];
  
  const csvContent = '\uFEFF' + [
    templateHeaders.map(h => `"${h}"`).join(','),
    sampleRow.map(c => `"${c}"`).join(',')
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'members_import_template.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parses a simple CSV text into Member objects.
 */
export function parseCSVToMembers(csvText: string): { members: Member[]; errors: string[] } {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) {
    return { members: [], errors: ['CSV file must have a header row and at least one data row.'] };
  }

  // Helper to split a CSV line respecting quotes
  const parseLine = (text: string): string[] => {
    const results: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        results.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
    results.push(cur.trim());
    return results;
  };

  const headerLine = lines[0];
  const headers = parseLine(headerLine).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));

  // Find column indices
  let fnIdx = headers.findIndex(h => h.includes('firstname') || h === 'first' || h === 'fname' || h === 'name');
  let snIdx = headers.findIndex(h => h.includes('surname') || h.includes('lastname') || h === 'last' || h === 'lname');
  let phoneIdx = headers.findIndex(h => h.includes('phone') || h.includes('mobile') || h.includes('tel') || h.includes('cell'));
  let emailIdx = headers.findIndex(h => h.includes('email') || h.includes('mail'));
  let roleIdx = headers.findIndex(h => h.includes('role') || h.includes('group') || h.includes('dept') || h.includes('category'));
  let statusIdx = headers.findIndex(h => h.includes('status'));
  let notesIdx = headers.findIndex(h => h.includes('note') || h.includes('comment') || h.includes('remark'));

  // If there's a single 'name' header and no surname header, try to split names
  const splitFullName = fnIdx !== -1 && snIdx === -1 && headers[fnIdx] === 'name';

  const imported: Member[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = parseLine(lines[i]);
    if (row.length === 0 || row.every(val => !val)) continue;

    let firstName = fnIdx !== -1 ? (row[fnIdx] || '') : '';
    let surname = snIdx !== -1 ? (row[snIdx] || '') : '';

    if (splitFullName && firstName) {
      const parts = firstName.trim().split(/\s+/);
      if (parts.length > 1) {
        firstName = parts[0];
        surname = parts.slice(1).join(' ');
      }
    }

    const phone = phoneIdx !== -1 ? (row[phoneIdx] || '') : '';
    const email = emailIdx !== -1 ? (row[emailIdx] || '') : '';
    const role = roleIdx !== -1 && row[roleIdx] ? row[roleIdx] : 'General Member';
    const rawStatus = statusIdx !== -1 && row[statusIdx] ? row[statusIdx].toLowerCase() : 'active';
    const status: 'active' | 'inactive' = rawStatus.includes('inact') ? 'inactive' : 'active';
    const notes = notesIdx !== -1 ? (row[notesIdx] || '') : '';

    if (!firstName && !surname && !phone) {
      continue;
    }

    if (!phone) {
      errors.push(`Row ${i + 1}: Skipped "${firstName} ${surname}" because phone number is missing.`);
      continue;
    }

    imported.push({
      id: `imp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      firstName: firstName || 'Member',
      surname: surname || '',
      phone: phone,
      email: email || undefined,
      role: role,
      status: status,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
      avatarColor: AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)]
    });
  }

  return { members: imported, errors };
}
