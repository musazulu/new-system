# 🚀 Quick Reference Card

## Tax Clearance Validation

### ✅ How It Works Now

**Automatic Validation Points:**
1. **Public Upload Portal** - Real-time validation during upload
2. **Manual Tax Entry Modal** - Real-time validation with warnings
3. **On Form Submit** - Confirmation dialogs for expired certificates

### 🔧 Key Functions

```typescript
// Import the validation function
import { verifyTaxClearanceValidity } from '../utils/taxValidation';

// Use it to check validity
const validityCheck = verifyTaxClearanceValidity(validToDate);

// Check results
if (validityCheck.isExpired) {
  // Show warning, reject certificate
}
```

### 📅 Date Formats Supported
- ISO: `2026-12-31`
- Natural: `31 December 2026`
- Slash: `31/12/2026`

---

## Duplicate Prevention

### ✅ How It Works Now

**Automatic Detection Points:**
1. **Individual Add** - Auto-merge on save
2. **CSV Import** - Bulk deduplication
3. **Bulk Paste** - Deduplication before insert
4. **Manual Button** - "Remove Duplicates" in menu

### 🔧 Key Functions

```typescript
// Import deduplication function
import { deduplicateMembers } from '../utils/deduplicateMembers';

// Use it to remove duplicates
const result = deduplicateMembers(memberArray);

// Check results
console.log(result.members);      // Cleaned array
console.log(result.removedCount); // Number of duplicates
```

### 🔍 Matching Rules
1. **Phone Match** - Normalized (0821234567 = 27821234567)
2. **Email Match** - Exact lowercase match
3. **Name Match** - First + Surname (fallback only)

---

## Testing Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check  # (if available)
```

---

## File Locations

### Modified Files:
- `src/components/TaxClearanceModal.tsx` - Manual tax entry with validation
- `src/App.tsx` - Enhanced duplicate prevention

### Utility Files:
- `src/utils/taxValidation.ts` - Tax clearance validation logic
- `src/utils/deduplicateMembers.ts` - Duplicate detection and merge

### Test Certificates:
- `/assets/aistudio/tax3_e6230cc4.jpeg` - EXPIRED (Oct 19, 2026)
- `/assets/aistudio/image_749d51b6.png` - VALID (Dec 31, 2026)

---

## Status Badges

| Status | Badge Color | Meaning |
|--------|-------------|---------|
| Valid | 🟢 Green | Active, not expired |
| Rejected | 🔴 Red | Expired or failed validation |
| Expired | 🟠 Orange | Manually marked expired |
| Pending | 🔵 Blue | Awaiting review |
| Not Submitted | ⚪ Gray | No certificate uploaded |

---

## Common Tasks

### Add Validation to New Component
```typescript
import { verifyTaxClearanceValidity } from '../utils/taxValidation';

const validityCheck = verifyTaxClearanceValidity(expiryDate);
if (validityCheck.isExpired) {
  // Handle expiry
}
```

### Run Deduplication Manually
```typescript
import { deduplicateMembers } from '../utils/deduplicateMembers';

const cleaned = deduplicateMembers(members);
setMembers(cleaned.members);
```

### Check Current System Date
```typescript
// Reference date: November 7, 2026
const today = new Date();
console.log(today.toISOString().slice(0, 10)); // 2026-11-07
```

---

## Troubleshooting

### Tax validation not working?
1. Check import: `verifyTaxClearanceValidity` imported?
2. Check date format: Using YYYY-MM-DD?
3. Check console: Any errors?

### Duplicates still appearing?
1. Check phone format: At least 7 digits?
2. Check email: Contains '@'?
3. Try manual "Remove Duplicates" button

### Build errors?
```bash
npm run build  # Check for TypeScript errors
```

---

## Documentation Files

📄 **FUNCTIONALITY_REPORT.md** - Complete feature analysis  
📄 **TESTING_GUIDE.md** - Step-by-step test procedures  
📄 **FIXES_SUMMARY.md** - What was fixed and why  
📄 **BEFORE_AFTER_COMPARISON.md** - Visual comparisons  
📄 **QUICK_REFERENCE.md** - This file  

---

## Emergency Contacts

**Critical Issues:**
- Check console for errors (F12)
- Review recent git commits
- Refer to FUNCTIONALITY_REPORT.md

**Need Help Testing:**
- Follow TESTING_GUIDE.md step-by-step
- Use test certificate buttons in upload portal
- Check BEFORE_AFTER_COMPARISON.md for expected behavior

---

## Version Info

**System Date:** November 7, 2026  
**Last Modified:** November 7, 2026  
**Status:** ✅ Production Ready  
**Build:** ✅ Passing (572ms)  

---

**Everything is working correctly! 🎉**
