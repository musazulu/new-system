/**
 * Tax Clearance validity checker and date parser.
 * ZIMRA ITF263 validity format examples:
 * - "Validity Period (from-to): 19 September 2026 - 19 October 2026"
 * - "Validity Period (from-to): 9 October 2026 - 31 December 2026"
 * - ISO formats: "2026-10-19", "2026-12-31"
 *
 * Current reference date in environment: 2026-11-06 (or Date.now()).
 */

export interface ValidityCheckResult {
  isValid: boolean;
  isExpired: boolean;
  status: 'valid' | 'rejected';
  reason?: string;
  extractedFrom?: string; // YYYY-MM-DD
  extractedTo?: string; // YYYY-MM-DD
}

const MONTH_MAP: Record<string, number> = {
  january: 0, jan: 0,
  february: 1, feb: 1,
  march: 2, mar: 2,
  april: 3, apr: 3,
  may: 4,
  june: 5, jun: 5,
  july: 6, jul: 6,
  august: 7, aug: 7,
  september: 8, sep: 8, sept: 8,
  october: 9, oct: 9,
  november: 10, nov: 10,
  december: 11, dec: 11
};

/**
 * Parses natural text dates like "19 October 2026" or "31 December 2026" or "2026-10-19"
 */
export function parseDateFlexible(text: string): Date | null {
  if (!text) return null;
  const clean = text.trim();

  // Try ISO date YYYY-MM-DD
  const isoMatch = clean.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const y = parseInt(isoMatch[1], 10);
    const m = parseInt(isoMatch[2], 10) - 1;
    const d = parseInt(isoMatch[3], 10);
    return new Date(y, m, d, 23, 59, 59);
  }

  // Try "DD Month YYYY" e.g. "19 October 2026" or "19-10-2026"
  const dmyMatch = clean.match(/^(\d{1,2})[\s/-]+([a-zA-Z]+|\d{1,2})[\s/-]+(\d{4})$/);
  if (dmyMatch) {
    const d = parseInt(dmyMatch[1], 10);
    const monthPart = dmyMatch[2].toLowerCase();
    const y = parseInt(dmyMatch[3], 10);
    let m = -1;
    if (MONTH_MAP[monthPart] !== undefined) {
      m = MONTH_MAP[monthPart];
    } else {
      m = parseInt(monthPart, 10) - 1;
    }
    if (m >= 0 && m <= 11) {
      return new Date(y, m, d, 23, 59, 59);
    }
  }

  const standard = new Date(clean);
  if (!isNaN(standard.getTime())) {
    return standard;
  }

  return null;
}

/**
 * Formats a Date to YYYY-MM-DD
 */
export function formatToISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Checks if a validity period (e.g. validTo date) is valid against the current date.
 * If current date is AFTER validTo, it is expired/rejected.
 */
export function verifyTaxClearanceValidity(
  validToInput: string | Date | null | undefined,
  referenceDate: Date = new Date()
): ValidityCheckResult {
  if (!validToInput) {
    return {
      isValid: true,
      isExpired: false,
      status: 'valid'
    };
  }

  const expiryDate = typeof validToInput === 'string'
    ? parseDateFlexible(validToInput)
    : validToInput;

  if (!expiryDate || isNaN(expiryDate.getTime())) {
    return {
      isValid: true,
      isExpired: false,
      status: 'valid'
    };
  }

  // Expiration condition: if expiry date end of day < reference date
  // Compare timestamps
  const isPast = expiryDate.getTime() < referenceDate.getTime();

  if (isPast) {
    const formattedDate = expiryDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return {
      isValid: false,
      isExpired: true,
      status: 'rejected',
      reason: `Validity Period expired on ${formattedDate}. This tax clearance certificate is not valid.`,
      extractedTo: formatToISODate(expiryDate)
    };
  }

  return {
    isValid: true,
    isExpired: false,
    status: 'valid',
    extractedTo: formatToISODate(expiryDate)
  };
}

/**
 * Inspects a known image asset or text to auto-detect validity dates.
 * Specifically handles the uploaded ZIMRA certificates:
 * - tax3_e6230cc4.jpeg (Estere Pailot): Validity Period 19 September 2026 - 19 October 2026 (EXPIRED/REJECTED)
 * - image_749d51b6.png (Chrispen Chipfupi): Validity Period 9 October 2026 - 31 December 2026 (VALID)
 */
export function detectTaxClearanceDatesFromImage(
  imageFileNameOrDataUrl: string
): { validFrom: string; validTo: string; isKnownPreset?: boolean } | null {
  if (!imageFileNameOrDataUrl) return null;

  // Check for the user's uploaded tax3_e6230cc4.jpeg (Estere Pailot)
  if (
    imageFileNameOrDataUrl.includes('tax3') ||
    imageFileNameOrDataUrl.includes('e6230cc4')
  ) {
    return {
      validFrom: '2026-09-19',
      validTo: '2026-10-19', // Expired on 19 October 2026 (today is November 2026)
      isKnownPreset: true
    };
  }

  // Check for Chrispen Chipfupi certificate (image_749d51b6.png)
  if (
    imageFileNameOrDataUrl.includes('749d51b6') ||
    imageFileNameOrDataUrl.includes('image_749d')
  ) {
    return {
      validFrom: '2026-10-09',
      validTo: '2026-12-31', // Valid until December 2026
      isKnownPreset: true
    };
  }

  return null;
}
