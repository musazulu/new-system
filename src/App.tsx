/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  StatsDashboard 
} from './components/StatsDashboard';
import { 
  QuickAddBar 
} from './components/QuickAddBar';
import { 
  SearchBar 
} from './components/SearchBar';
import { 
  MemberTable 
} from './components/MemberTable';
import { 
  MemberCards 
} from './components/MemberCards';
import { 
  MemberModal 
} from './components/MemberModal';
import { 
  CSVImportModal 
} from './components/CSVImportModal';
import { 
  BulkPasteModal 
} from './components/BulkPasteModal';
import { 
  TaxClearanceModal 
} from './components/TaxClearanceModal';
import { 
  PublicUploadPortalModal 
} from './components/PublicUploadPortalModal';
import { 
  BatchActionBar 
} from './components/BatchActionBar';
import { 
  Toast, 
  ToastMessage 
} from './components/Toast';
import { 
  Member, 
  FilterField, 
  SortField, 
  SortOrder, 
  MemberStatus,
  TaxClearanceInfo,
  TaxClearanceStatus
} from './types/member';
import { 
  loadMembers, 
  saveMembers, 
  resetToInitialMembers 
} from './utils/storage';
import { 
  exportMembersToCSV 
} from './utils/csv';
import { deduplicateMembers } from './utils/deduplicateMembers';
import { 
  Download, 
  LayoutGrid, 
  Table as TableIcon, 
  Sparkles,
  CheckCircle2,
  PhoneCall,
  ClipboardPaste
} from 'lucide-react';

export default function App() {
  const [members, setMembers] = useState<Member[]>(() => loadMembers());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterField, setFilterField] = useState<FilterField>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | MemberStatus>('all');
  const [taxFilter, setTaxFilter] = useState<'all' | TaxClearanceStatus>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [taxClearanceTargetMember, setTaxClearanceTargetMember] = useState<Member | null>(null);
  const [isPublicPortalOpen, setIsPublicPortalOpen] = useState(false);

  // Toast feedback
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'error', text: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to localStorage on changes
  useEffect(() => {
    saveMembers(members);
  }, [members]);

  // Check URL hash for direct #upload-tax-clearance portal link
  useEffect(() => {
    if (window.location.hash.includes('tax-clearance')) {
      setIsPublicPortalOpen(true);
    }
  }, []);

  // Available unique roles for filter dropdown
  const availableRoles = useMemo(() => {
    const set = new Set<string>();
    members.forEach((m) => {
      if (m.role) set.add(m.role);
    });
    return Array.from(set).sort();
  }, [members]);

  const duplicateCount = useMemo(
    () => deduplicateMembers(members).removedCount,
    [members]
  );

  // Filtering & Sorting pipeline
  const filteredAndSortedMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const cleanDigits = searchQuery.replace(/[^0-9]/g, '');

    return members
      .filter((member) => {
        // Status filter
        if (statusFilter !== 'all' && member.status !== statusFilter) {
          return false;
        }

        // Tax Clearance filter
        if (taxFilter !== 'all') {
          const currentTaxStatus = member.taxClearance?.status || 'not_submitted';
          if (taxFilter === 'valid' && currentTaxStatus !== 'valid') {
            return false;
          }
          if (taxFilter === 'not_submitted' && currentTaxStatus !== 'not_submitted') {
            return false;
          }
          if (taxFilter !== 'valid' && taxFilter !== 'not_submitted' && currentTaxStatus !== taxFilter) {
            return false;
          }
        }

        // Role filter
        if (roleFilter !== 'all' && member.role !== roleFilter) {
          return false;
        }

        // Search text matching
        if (!query) return true;

        const fn = (member.firstName || '').toLowerCase();
        const sn = (member.surname || '').toLowerCase();
        const fullName = `${fn} ${sn}`;
        const phone = (member.phone || '').toLowerCase();
        const cleanPhoneDigits = member.phone ? member.phone.replace(/[^0-9]/g, '') : '';
        const phoneWithoutZero = cleanPhoneDigits.startsWith('0') ? cleanPhoneDigits.slice(1) : cleanPhoneDigits;
        const queryWithoutZero = cleanDigits.startsWith('0') ? cleanDigits.slice(1) : cleanDigits;

        const matchesPhoneDigits = cleanDigits.length >= 2 && (
          cleanPhoneDigits.includes(cleanDigits) ||
          phoneWithoutZero.includes(queryWithoutZero) ||
          cleanPhoneDigits.includes(queryWithoutZero)
        );

        if (filterField === 'firstName') {
          return fn.includes(query);
        } else if (filterField === 'surname') {
          return sn.includes(query);
        } else if (filterField === 'phone') {
          return phone.includes(query) || matchesPhoneDigits;
        } else {
          // 'all': matches first name, surname, full name, or phone number
          const matchesFirst = fn.includes(query);
          const matchesSurname = sn.includes(query);
          const matchesFullName = fullName.includes(query);
          const matchesPhone = phone.includes(query) || matchesPhoneDigits;
          return matchesFirst || matchesSurname || matchesFullName || matchesPhone;
        }
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortField === 'name') {
          comp = a.firstName.localeCompare(b.firstName);
        } else if (sortField === 'surname') {
          comp = a.surname.localeCompare(b.surname);
        } else if (sortField === 'phone') {
          comp = a.phone.localeCompare(b.phone);
        } else if (sortField === 'createdAt') {
          comp = (a.createdAt || '').localeCompare(b.createdAt || '');
        }
        return sortOrder === 'asc' ? comp : -comp;
      });
  }, [members, searchQuery, filterField, statusFilter, roleFilter, sortField, sortOrder]);

  // Handlers
  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleSaveMember = (member: Member) => {
    setMembers((prev) => {
      const exists = prev.some((m) => m.id === member.id);
      if (exists) {
        // Updating existing member
        addToast('success', `Updated details for ${member.firstName} ${member.surname}`);
        return prev.map((m) => (m.id === member.id ? member : m));
      } else {
        // Adding new member - check for potential duplicates
        const allMembers = [member, ...prev];
        const dedupResult = deduplicateMembers(allMembers);
        
        if (dedupResult.removedCount > 0) {
          // Duplicate detected and merged
          addToast('info', 
            `Added ${member.firstName} ${member.surname}. A similar record was found and merged automatically.`
          );
        } else {
          // No duplicate, simple add
          addToast('success', `Added ${member.firstName} ${member.surname} to directory`);
        }
        
        return dedupResult.members;
      }
    });
  };

  const handleDeleteMember = (id: string) => {
    const memberToDelete = members.find((m) => m.id === id);
    const confirmName = memberToDelete ? `${memberToDelete.firstName} ${memberToDelete.surname}` : 'this member';
    
    if (window.confirm(`Are you sure you want to remove ${confirmName}?`)) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
      setSelectedIds((prev) => prev.filter((item) => item !== id));
      addToast('info', `Removed ${confirmName} from contacts`);
    }
  };

  // Quick inline updates
  const handleToggleStatus = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newStatus: MemberStatus = m.status === 'active' ? 'inactive' : 'active';
          addToast('info', `${m.firstName} marked as ${newStatus}`);
          return { ...m, status: newStatus };
        }
        return m;
      })
    );
  };

  const handleQuickUpdatePhone = (id: string, newPhone: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          addToast('success', `Updated phone for ${m.firstName} to ${newPhone}`);
          return { ...m, phone: newPhone };
        }
        return m;
      })
    );
  };

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredAndSortedMembers.length && filteredAndSortedMembers.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAndSortedMembers.map((m) => m.id));
    }
  };

  // CSV Export Actions
  const handleExportAllOrFiltered = () => {
    const isFiltered = searchQuery || statusFilter !== 'all' || roleFilter !== 'all';
    const exportData = filteredAndSortedMembers;
    
    if (exportData.length === 0) {
      addToast('error', 'No contacts to export matching current criteria.');
      return;
    }

    const filename = isFiltered
      ? `filtered_members_${new Date().toISOString().slice(0, 10)}.csv`
      : `all_members_${new Date().toISOString().slice(0, 10)}.csv`;

    exportMembersToCSV(exportData, filename);
    addToast('success', `Successfully exported ${exportData.length} contacts to CSV!`);
  };

  const handleExportSelected = () => {
    const selectedMembers = members.filter((m) => selectedIds.includes(m.id));
    if (selectedMembers.length === 0) return;
    exportMembersToCSV(selectedMembers, `selected_members_${selectedMembers.length}.csv`);
    addToast('success', `Exported ${selectedMembers.length} selected contacts to CSV`);
  };

  // Batch updates
  const handleBatchSetStatus = (status: 'active' | 'inactive') => {
    setMembers((prev) =>
      prev.map((m) => (selectedIds.includes(m.id) ? { ...m, status } : m))
    );
    addToast('success', `Updated ${selectedIds.length} members to ${status}`);
    setSelectedIds([]);
  };

  const handleBatchDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedIds.length} selected members?`)) {
      setMembers((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
      addToast('info', `Deleted ${selectedIds.length} members`);
      setSelectedIds([]);
    }
  };

  // CSV Import
  const handleImportMembers = (newMembers: Member[]) => {
    setMembers((prev) => {
      const existing = deduplicateMembers(prev).members;
      const result = deduplicateMembers([...newMembers, ...existing]);
      const addedCount = result.members.length - existing.length;
      const mergedCount = newMembers.length - addedCount;
      addToast(
        'success',
        mergedCount > 0
          ? `Imported ${addedCount} new contacts and merged ${mergedCount} duplicate${mergedCount === 1 ? '' : 's'}.`
          : `Successfully imported ${addedCount} new contacts!`
      );
      return result.members;
    });
  };

  // Bulk Paste Import
  const handleBulkPasteImport = (newMembers: Member[], replaceExisting: boolean) => {
    if (replaceExisting) {
      const result = deduplicateMembers(newMembers);
      setMembers(result.members);
      addToast('success', `Directory replaced with ${result.members.length} contacts${result.removedCount ? `; ${result.removedCount} duplicate${result.removedCount === 1 ? '' : 's'} merged.` : '!'} `);
    } else {
      handleImportMembers(newMembers);
    }
  };

  const handleRemoveDuplicates = () => {
    const result = deduplicateMembers(members);
    if (result.removedCount === 0) {
      addToast('info', 'No duplicates found. Records are matched by phone number or email address.');
      return;
    }

    if (!window.confirm(`Remove ${result.removedCount} duplicate record${result.removedCount === 1 ? '' : 's'}? The most complete record will be kept and missing details will be merged.`)) {
      return;
    }

    const remainingIds = new Set(result.members.map((member) => member.id));
    setMembers(result.members);
    setSelectedIds((prev) => prev.filter((id) => remainingIds.has(id)));
    addToast('success', `Removed ${result.removedCount} duplicate record${result.removedCount === 1 ? '' : 's'} and retained their available details.`);
  };

  // Reset sample demo data
  const handleResetData = () => {
    if (window.confirm('Reset directory to initial default sample members? Custom additions will be overwritten.')) {
      const reset = resetToInitialMembers();
      setMembers(reset);
      setSelectedIds([]);
      setSearchQuery('');
      setStatusFilter('all');
      setRoleFilter('all');
      addToast('info', 'Directory reset to default sample records.');
    }
  };

  // Tax Clearance Update Handler
  const handleSaveTaxClearance = (memberId: string, taxInfo: TaxClearanceInfo) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const updated = {
            ...m,
            taxClearance: taxInfo
          };
          addToast('success', `Tax Clearance updated for ${m.firstName} ${m.surname} (${taxInfo.status.toUpperCase()})`);
          return updated;
        }
        return m;
      })
    );
  };

  const handleOpenTaxClearance = (member: Member) => {
    setTaxClearanceTargetMember(member);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterField('all');
    setStatusFilter('all');
    setTaxFilter('all');
    setRoleFilter('all');
  };

  const isAllSelected =
    filteredAndSortedMembers.length > 0 &&
    selectedIds.length >= filteredAndSortedMembers.length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 pb-20">
      {/* Toast Feedback */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Top Navigation */}
      <Navbar
        onOpenAddModal={handleOpenAddModal}
        onOpenImportModal={() => setIsImportModalOpen(true)}
        onOpenPasteModal={() => setIsPasteModalOpen(true)}
        onOpenPublicPortal={() => setIsPublicPortalOpen(true)}
        onExportCSV={handleExportAllOrFiltered}
        onRemoveDuplicates={handleRemoveDuplicates}
        duplicateCount={duplicateCount}
        onResetData={handleResetData}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Notice for BA Tax Clearance Verification Portal */}
        <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-emerald-800/60 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    BA Tax Clearance Verification Link (ZIMRA ITF263)
                  </h3>
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
                    Live
                  </span>
                </div>
                <p className="text-xs text-emerald-100/80 mt-0.5">
                  Brand Ambassadors (BAs) can follow this link to upload their tax clearance certificate image, automatically aligning the <strong className="text-emerald-300">&quot;Valid&quot;</strong> badge next to their Active status.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsPublicPortalOpen(true)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Open BA Upload Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <StatsDashboard
          members={members}
          onOpenAddModal={handleOpenAddModal}
          onOpenImportModal={() => setIsImportModalOpen(true)}
          onOpenPublicPortal={() => setIsPublicPortalOpen(true)}
          onExportCSV={handleExportAllOrFiltered}
          currentStatusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          currentTaxFilter={taxFilter}
          onTaxFilterChange={setTaxFilter}
        />

        {/* Instant Quick-Add Bar */}
        <QuickAddBar
          onAddMember={handleSaveMember}
          onOpenFullModal={handleOpenAddModal}
        />

        {/* Filter and Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterField={filterField}
          onFilterFieldChange={setFilterField}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          taxFilter={taxFilter}
          onTaxFilterChange={setTaxFilter}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          availableRoles={availableRoles}
          totalMatches={filteredAndSortedMembers.length}
          totalMembers={members.length}
          onResetFilters={handleResetFilters}
        />

        {/* View Switcher Bar for Mobile & Quick Sort */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Display:</span>
            <div className="inline-flex sm:hidden bg-slate-200/80 p-0.5 rounded-lg">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-white text-indigo-600 font-bold shadow-2xs' : 'text-slate-600'}`}
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md ${viewMode === 'cards' ? 'bg-white text-indigo-600 font-bold shadow-2xs' : 'text-slate-600'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
            <span>
              Tip: Click the <span className="font-semibold text-emerald-700">Valid</span> tax cell to view certificate scans, verify TINs, or update ZIMRA details!
            </span>
          </div>

          <div className="hidden sm:block text-slate-400">
            Sorted by <span className="font-semibold text-slate-700 capitalize">{sortField}</span> ({sortOrder.toUpperCase()})
          </div>
        </div>

        {/* Contact List: Table or Cards View */}
        {viewMode === 'table' ? (
          <MemberTable
            members={filteredAndSortedMembers}
            searchQuery={searchQuery}
            filterField={filterField}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
            onToggleStatus={handleToggleStatus}
            onQuickUpdatePhone={handleQuickUpdatePhone}
            onOpenTaxClearance={handleOpenTaxClearance}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
            isAllSelected={isAllSelected}
          />
        ) : (
          <MemberCards
            members={filteredAndSortedMembers}
            searchQuery={searchQuery}
            filterField={filterField}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
            onToggleStatus={handleToggleStatus}
            onQuickUpdatePhone={handleQuickUpdatePhone}
            onOpenTaxClearance={handleOpenTaxClearance}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
          />
        )}
      </main>

      {/* Floating Batch Actions Bar when items selected */}
      <BatchActionBar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        onExportSelected={handleExportSelected}
        onDeleteSelected={handleBatchDelete}
        onSetStatusSelected={handleBatchSetStatus}
      />

      {/* Add / Edit Member Modal */}
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        initialMember={editingMember}
      />

      {/* CSV Bulk Import Modal */}
      <CSVImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportMembers}
      />

      {/* Bulk Paste Names Modal */}
      <BulkPasteModal
        isOpen={isPasteModalOpen}
        onClose={() => setIsPasteModalOpen(false)}
        onImportMembers={handleBulkPasteImport}
      />

      {/* Tax Clearance Certificate View & Verify Modal */}
      <TaxClearanceModal
        isOpen={Boolean(taxClearanceTargetMember)}
        member={taxClearanceTargetMember}
        onClose={() => setTaxClearanceTargetMember(null)}
        onSave={handleSaveTaxClearance}
      />

      {/* Public BA Upload Link Portal Modal */}
      <PublicUploadPortalModal
        isOpen={isPublicPortalOpen}
        members={members}
        onClose={() => setIsPublicPortalOpen(false)}
        onSubmitUpload={handleSaveTaxClearance}
      />
    </div>
  );
}
