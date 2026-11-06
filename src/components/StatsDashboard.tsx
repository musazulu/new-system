import React from 'react';
import { Users, UserCheck, ShieldCheck, Layers, Download, Upload, Plus, ExternalLink } from 'lucide-react';
import { Member, MemberStatus, TaxClearanceStatus } from '../types/member';

interface StatsDashboardProps {
  members: Member[];
  onOpenAddModal: () => void;
  onOpenImportModal: () => void;
  onOpenPublicPortal: () => void;
  onExportCSV: () => void;
  currentStatusFilter: 'all' | MemberStatus;
  onStatusFilterChange: (status: 'all' | MemberStatus) => void;
  currentTaxFilter: 'all' | TaxClearanceStatus;
  onTaxFilterChange: (taxStatus: 'all' | TaxClearanceStatus) => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  members,
  onOpenAddModal,
  onOpenImportModal,
  onOpenPublicPortal,
  onExportCSV,
  currentStatusFilter,
  onStatusFilterChange,
  currentTaxFilter,
  onTaxFilterChange
}) => {
  const total = members.length;
  const activeCount = members.filter((m) => m.status === 'active').length;
  const validTaxCount = members.filter((m) => m.taxClearance?.status === 'valid').length;
  const pendingTaxCount = members.filter((m) => m.taxClearance?.status === 'pending').length;
  
  // Unique roles
  const uniqueRoles = new Set(members.map((m) => m.role || 'General Member')).size;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* Total Card */}
      <div 
        onClick={() => onStatusFilterChange('all')}
        className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-2xs hover:shadow-sm ${
          currentStatusFilter === 'all'
            ? 'border-indigo-400 ring-2 ring-indigo-100 bg-indigo-50/10'
            : 'border-slate-200/80 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Members
          </span>
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {total}
          </span>
          <span className="text-xs text-slate-400 font-medium">all registered</span>
        </div>
      </div>

      {/* Active Members Card */}
      <div 
        onClick={() => onStatusFilterChange('active')}
        className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-2xs hover:shadow-sm ${
          currentStatusFilter === 'active'
            ? 'border-emerald-400 ring-2 ring-emerald-100 bg-emerald-50/20'
            : 'border-slate-200/80 hover:border-emerald-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Active Members
          </span>
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight">
            {activeCount}
          </span>
          <span className="text-xs text-emerald-600 font-medium">
            {total > 0 ? `${Math.round((activeCount / total) * 100)}% active` : '0%'}
          </span>
        </div>
      </div>

      {/* Tax Clearance Valid Card */}
      <div 
        onClick={() => onTaxFilterChange(currentTaxFilter === 'valid' ? 'all' : 'valid')}
        className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer shadow-2xs hover:shadow-sm ${
          currentTaxFilter === 'valid'
            ? 'border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50/30'
            : 'border-slate-200/80 hover:border-emerald-300'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            Valid Tax Clearance
          </span>
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight">
                {validTaxCount}
              </span>
              <span className="text-xs text-emerald-600 font-medium">
                {total > 0 ? `${Math.round((validTaxCount / total) * 100)}% verified` : '0%'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">ITF263 compliant</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPublicPortal();
            }}
            title="Open BA upload link portal"
            className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-lg border border-emerald-200 flex items-center gap-1 transition-colors"
          >
            <span>BA Link</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Roles & Management Quick Actions */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Groups & Roles
          </span>
          <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {uniqueRoles}
            </span>
            <span className="text-xs text-slate-400 block font-medium">categories</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onExportCSV}
              title="Export all to CSV"
              className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenImportModal}
              title="Import from CSV"
              className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 border border-slate-200 transition-colors"
            >
              <Upload className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAddModal}
              title="Add New Member"
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
