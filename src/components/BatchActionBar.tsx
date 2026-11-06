import React from 'react';
import { Download, Trash2, CheckCircle2, XCircle, X } from 'lucide-react';

interface BatchActionBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onExportSelected: () => void;
  onDeleteSelected: () => void;
  onSetStatusSelected: (status: 'active' | 'inactive') => void;
}

export const BatchActionBar: React.FC<BatchActionBarProps> = ({
  selectedCount,
  onClearSelection,
  onExportSelected,
  onDeleteSelected,
  onSetStatusSelected
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex flex-wrap items-center gap-3 sm:gap-5 animate-slide-up">
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">
          {selectedCount}
        </span>
        <span className="text-xs sm:text-sm font-semibold">
          {selectedCount === 1 ? 'member selected' : 'members selected'}
        </span>
      </div>

      <div className="h-4 w-px bg-slate-700 hidden sm:block" />

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExportSelected}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-slate-700"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span>Export CSV</span>
        </button>

        <button
          type="button"
          onClick={() => onSetStatusSelected('active')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-950/40 text-xs font-semibold text-emerald-300 transition-colors border border-emerald-900/50"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Set</span> Active
        </button>

        <button
          type="button"
          onClick={() => onSetStatusSelected('inactive')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-950/40 text-xs font-semibold text-amber-300 transition-colors border border-amber-900/50"
        >
          <XCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Set</span> Inactive
        </button>

        <button
          type="button"
          onClick={onDeleteSelected}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-xs font-semibold text-rose-300 transition-colors border border-rose-500/30"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>

      <button
        type="button"
        onClick={onClearSelection}
        className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors ml-1"
        title="Deselect all"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
