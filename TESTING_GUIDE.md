# Testing Guide - Tax Clearance Validation & Duplicate Prevention

## Quick Start Testing

### 1. Start the Development Server
```bash
npm run dev
```

---

## 🧪 Test Cases

### Test Case 1: Expired Certificate Detection (Public Portal)

**Steps:**
1. Open the application in browser
2. Click the green "Open BA Upload Portal" button
3. In Step 2, click **"Test Expired Image (tax3)"** button
4. Observe the validation warnings

**Expected Results:**
- ❌ Red warning appears: "EXPIRED — Will be Rejected"
- ❌ Certificate preview shows "Validity Period Expired (2026-10-19)"
- ❌ Validity status shows "EXPIRED — Will be Rejected" with red shield icon
- ❌ Submit button is red and says "Reject Expired Tax Clearance"
- ℹ️ Warning text: "validity date has passed. Submitting will mark BA as Rejected"

**After Submit:**
- ❌ Red rejection screen appears
- 📝 Message: "Tax Clearance REJECTED — Expired Validity Period"
- 🏷️ Member status shows "Rejected" badge in main table

---

### Test Case 2: Valid Certificate Acceptance (Public Portal)

**Steps:**
1. Open the "BA Upload Portal"
2. In Step 2, click **"Test Valid Image"** button
3. Observe the validation success

**Expected Results:**
- ✅ Green success badge: "VALID (Active Period)"
- ✅ Certificate preview shows "Validity Period is Active (Valid until 2026-12-31)"
- ✅ Submit button is green: "Submit & Verify Tax Clearance"

**After Submit:**
- ✅ Green success screen appears
- 📝 Message: "Tax Clearance Verified & Accepted (Valid)!"
- 🏷️ Member shows green "Valid" badge in table

---

### Test Case 3: Manual Tax Entry - Expired Date Warning

**Steps:**
1. In main dashboard, click on any member's tax status cell (green/red badge area)
2. Tax Clearance Modal opens
3. Change "Valid Until" date to **2026-10-15** (past date)
4. Keep status as "Valid"
5. Click "Save Tax Clearance Status"

**Expected Results:**
- ⚠️ Date field turns red/pink background
- ⚠️ Red warning box appears below dates:
  ```
  ⚠️ EXPIRED Certificate - Validity Period Has Passed
  [Reason text explaining expiry]
  The system will automatically recommend rejection.
  ```
- 🔔 Confirmation dialog appears:
  ```
  ⚠️ WARNING: The validity period expires on 2026-10-15, which has already passed.
  
  This certificate is EXPIRED and should be marked as "Rejected".
  
  Do you want to automatically reject this expired certificate?
  ```

**If User Clicks "Yes":**
- ✅ Status automatically changed to "Rejected"
- 📝 Notes field populated with rejection reason
- 💾 Saved with "Rejected" status

**If User Clicks "No":**
- 🔔 Second warning: "You are about to mark an EXPIRED certificate as valid..."
- ⚠️ User can proceed but is warned

---

### Test Case 4: Duplicate Member Prevention

**Setup:** Add a test member first
1. Click "+ Add Member" button
2. Fill in:
   - First Name: John
   - Surname: Doe
   - Phone: 0821234567
   - Email: john@example.com
3. Click "Add Member"

**Test:** Try adding duplicate
1. Click "+ Add Member" again
2. Fill in:
   - First Name: John
   - Surname: Doe
   - Phone: 27821234567 (same number, different format)
   - Email: johndoe@example.com (different email)
3. Click "Add Member"

**Expected Results:**
- ℹ️ Toast notification: "Added John Doe. A similar record was found and merged automatically."
- 📊 Only ONE "John Doe" appears in the table
- 📧 Email is preserved from the more complete record
- 📞 Phone number is normalized

**Duplicate Detection Rules:**
- Same phone number (normalized: 0821234567 = 27821234567)
- Same email address
- Same first name + surname (if no phone/email match)

---

### Test Case 5: CSV Import with Duplicates

**Steps:**
1. Create a CSV file `test_members.csv`:
```csv
firstName,surname,phone,email,role
Alice,Smith,0821111111,alice@test.com,Core Member
Bob,Jones,0822222222,bob@test.com,Core Member
Alice,Smith,27821111111,alice.smith@test.com,Core Member
```

2. Click menu (☰) → "Import from CSV"
3. Upload the CSV file
4. Click "Confirm Import"

**Expected Results:**
- ✅ Import completes
- ℹ️ Toast: "Imported 2 new contacts and merged 1 duplicate"
- 📊 Only 2 members appear (Alice Smith merged, Bob Jones added)
- 📧 Alice's record has both emails preserved in notes (if possible)

---

### Test Case 6: Manual Duplicate Removal

**Steps:**
1. If you see duplicate counter in navbar (e.g., "3 duplicates detected")
2. Click menu (☰) → "Remove Duplicates"
3. Confirm the action

**Expected Results:**
- ℹ️ Confirmation dialog: "Remove X duplicate records? The most complete record will be kept..."
- ✅ After confirm: Duplicates removed
- ℹ️ Toast: "Removed X duplicate records and retained their available details"
- 🔢 Duplicate counter disappears from navbar

---

## 🐛 Debugging Tips

### If validation isn't working:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Verify current system date matches November 7, 2026
4. Check that `taxValidation.ts` is imported correctly

### If duplicates aren't merging:
1. Check phone numbers have at least 7 digits
2. Verify emails contain '@' symbol
3. Check Console for deduplication function errors
4. Try "Remove Duplicates" manually from menu

### If dates aren't parsing:
1. Use YYYY-MM-DD format (e.g., 2026-12-31)
2. Check browser date input compatibility
3. Verify no timezone issues in DevTools

---

## ✅ Success Criteria Checklist

After testing, verify:

- [ ] Expired certificates are rejected in Public Upload Portal
- [ ] Valid certificates are accepted in Public Upload Portal
- [ ] Manual tax entry warns about expired dates
- [ ] Expired date fields turn red with warning message
- [ ] Confirmation dialogs appear for expired certificates
- [ ] Adding duplicate members triggers auto-merge
- [ ] Toast notifications show when merges occur
- [ ] CSV import handles duplicates correctly
- [ ] "Remove Duplicates" button works from menu
- [ ] Tax status badges show correctly (Valid/Rejected/etc.)

---

## 📸 Visual Indicators Reference

### Valid Certificate:
- 🟢 Green badge: "Valid"
- ✅ Green checkmark icon
- 🟢 Green border on validity period input
- 📝 Success message: "Validity Period is Active"

### Rejected/Expired Certificate:
- 🔴 Red badge: "Rejected"
- ⚠️ Shield alert icon (red)
- 🔴 Red border on validity period input
- 📝 Error message: "EXPIRED Certificate - Validity Period Has Passed"

### Duplicate Detection:
- ℹ️ Blue info toast
- 📊 Duplicate counter in navbar (if present)
- 🔄 Merge icon in notifications

---

## 🎯 Test Results Template

```
Test Date: _______________
Tester Name: _____________

Test Case 1 (Expired Cert - Public Portal):    [ ] PASS  [ ] FAIL
Test Case 2 (Valid Cert - Public Portal):      [ ] PASS  [ ] FAIL
Test Case 3 (Manual Entry Warning):            [ ] PASS  [ ] FAIL
Test Case 4 (Duplicate Prevention):            [ ] PASS  [ ] FAIL
Test Case 5 (CSV Import Duplicates):           [ ] PASS  [ ] FAIL
Test Case 6 (Manual Duplicate Removal):        [ ] PASS  [ ] FAIL

Notes:
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

---

**All tests should PASS! If any fail, check the console for errors and review the FUNCTIONALITY_REPORT.md**
