export type MemberStatus = 'active' | 'inactive';

export type TaxClearanceStatus = 'valid' | 'rejected' | 'expired' | 'pending' | 'not_submitted';

export interface TaxClearanceInfo {
  status: TaxClearanceStatus;
  certificateNumber?: string; // e.g. ITF263
  tin?: string; // e.g. 1000732986
  authenticationCode?: string; // e.g. 49557662
  tradeName?: string; // e.g. Chrispen/Chipfupi/Tanisha investments/Tadisa Tradings
  validFrom?: string; // e.g. 2026-10-09
  validTo?: string; // e.g. 2026-12-31
  issuedOn?: string; // e.g. 2026-10-09
  taxpayerName?: string; // e.g. Chrispen Chipfupi
  imageUrl?: string; // link or uploaded data URL of the certificate
  uploadedAt?: string;
  notes?: string;
}

export interface Member {
  id: string;
  firstName: string;
  surname: string;
  phone: string;
  email?: string;
  role: string;
  status: MemberStatus;
  notes?: string;
  createdAt: string;
  avatarColor?: string;
  taxClearance?: TaxClearanceInfo;
}

export type FilterField = 'all' | 'firstName' | 'surname' | 'phone';

export type SortField = 'name' | 'surname' | 'phone' | 'createdAt' | 'taxStatus';
export type SortOrder = 'asc' | 'desc';
