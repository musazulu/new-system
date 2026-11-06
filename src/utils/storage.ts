import { Member } from '../types/member';
import { EXACT_IMAGE_MEMBERS } from '../data/initialMembers';

const STORAGE_KEY = 'member_roster_exact_v3';

export function loadMembers(): Member[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Check if previous version exists and merge
      const v2 = localStorage.getItem('member_roster_exact_v2');
      if (v2) {
        try {
          const parsed = JSON.parse(v2);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // merge in Chrispen's tax clearance if missing
            const merged = parsed.map((m: Member) => {
              if (m.firstName.toLowerCase().includes('chrispen') && m.surname.toLowerCase().includes('chipfupi')) {
                return {
                  ...m,
                  status: 'active' as const,
                  taxClearance: {
                    status: 'valid' as const,
                    certificateNumber: 'ITF263',
                    tin: '1000732986',
                    authenticationCode: '49557662',
                    taxpayerName: 'Chrispen Chipfupi',
                    tradeName: 'Chrispen/Chipfupi/Tanisha investments/Tadisa Tradings',
                    issuedOn: '2026-10-09',
                    validFrom: '2026-10-09',
                    validTo: '2026-12-31',
                    imageUrl: '/assets/aistudio/image_749d51b6.png',
                    uploadedAt: '2026-10-16T09:00:00Z',
                    notes: 'ZIMRA Tax Clearance Certificate (ITF263) verified.'
                  }
                };
              }
              return m;
            });
            saveMembers(merged);
            return merged;
          }
        } catch {
          // ignore
        }
      }
      saveMembers(EXACT_IMAGE_MEMBERS);
      return EXACT_IMAGE_MEMBERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return EXACT_IMAGE_MEMBERS;
  } catch (err) {
    console.error('Failed to load members from localStorage', err);
    return EXACT_IMAGE_MEMBERS;
  }
}

export function saveMembers(members: Member[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  } catch (err) {
    console.error('Failed to save members to localStorage', err);
  }
}

export function resetToInitialMembers(): Member[] {
  saveMembers(EXACT_IMAGE_MEMBERS);
  return EXACT_IMAGE_MEMBERS;
}
