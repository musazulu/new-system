import React from 'react';
import { 
  Users, UserPlus, Download, Upload, LayoutGrid, Table, 
  RotateCcw, Sparkles, CopyX 
} from 'lucide-react';

interface NavbarProps {
  onOpenAddModal: () => void;
  onOpenImportModal: () => void;
  onOpenPasteModal: () => void;
  onOpenPublicPortal: () => void;
  onExportCSV: () => void;
  onRemoveDuplicates: () => void;
  duplicateCount: number;
  onResetData: () => void;
  viewMode: 'table' | 'cards';
  onViewModeChange: (mode: 'table' | 'cards') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddModal,
  onOpenImportModal,
  onOpenPasteModal,
  onOpenPublicPortal,
  onExportCSV,
  onRemoveDuplicates,
  duplicateCount,
  onResetData,
  viewMode,
  onViewModeChange
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                Member Directory
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                <Sparkles className="w-2.5 h-2.5" /> Fast Filter
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              Filter by name, surname, or phone • Instant updates • CSV export
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View toggle (Desktop / Tablet) */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table view"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('cards')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'cards'
                  ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Reset Demo Data button */}
          <button
            type="button"
            onClick={onResetData}
            title="Reset sample members"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200/80 transition-colors hidden lg:flex items-center gap-1.5 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>

          {/* Duplicate cleanup */}
          <button
            type="button"
            onClick={onRemoveDuplicates}
            title={duplicateCount > 0 ? `Remove ${duplicateCount} duplicate record${duplicateCount === 1 ? '' : 's'}` : 'Check the directory for duplicate records'}
            className="p-2 text-slate-500 hover:text-amber-800 hover:bg-amber-50 rounded-xl border border-slate-200/80 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <CopyX className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{duplicateCount > 0 ? `Duplicates (${duplicateCount})` : 'Duplicates'}</span>
          </button>

          {/* BA Tax Clearance Portal Button */}
          <button
            type="button"
            onClick={onOpenPublicPortal}
            className="p-2 sm:px-3 sm:py-2 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 text-xs font-bold shadow-2xs"
            title="Open BA Tax Clearance Verification Link & Upload Portal"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse hidden sm:inline-block"></span>
            <span>BA Tax Portal</span>
          </button>

          {/* Paste Names */}
          <button
            type="button"
            onClick={onOpenPasteModal}
            className="p-2 sm:px-3 sm:py-2 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 transition-colors flex items-center gap-1.5 text-xs font-bold"
            title="Paste exact list of names and numbers"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Paste Names</span>
          </button>

          {/* Import CSV */}
          <button
            type="button"
            onClick={onOpenImportModal}
            className="p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 rounded-xl border border-slate-200/80 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Import Contacts from CSV"
          >
            <Upload className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Import CSV</span>
          </button>

          {/* Export CSV */}
          <button
            type="button"
            onClick={onExportCSV}
            className="p-2 sm:px-3 sm:py-2 text-slate-700 hover:text-indigo-700 bg-slate-100 hover:bg-indigo-50 rounded-xl border border-slate-200/80 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Export full or filtered contact list to CSV"
          >
            <Download className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {/* Add Member button */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-1.5 text-xs font-bold shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>
    </header>
  );
};
