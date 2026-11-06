import React from 'react';
import { Search, X, Filter, User, Phone, Check, RefreshCw, ShieldCheck, Hash } from 'lucide-react';
import { FilterField, MemberStatus, TaxClearanceStatus } from '../types/member';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterField: FilterField;
  onFilterFieldChange: (field: FilterField) => void;
  statusFilter: 'all' | MemberStatus;
  onStatusFilterChange: (status: 'all' | MemberStatus) => void;
  taxFilter: 'all' | TaxClearanceStatus;
  onTaxFilterChange: (taxStatus: 'all' | TaxClearanceStatus) => void;
  roleFilter: string;
  onRoleFilterChange: (role: string) => void;
  availableRoles: string[];
  totalMatches: number;
  totalMembers: number;
  onResetFilters: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  filterField,
  onFilterFieldChange,
  statusFilter,
  onStatusFilterChange,
  taxFilter,
  onTaxFilterChange,
  roleFilter,
  onRoleFilterChange,
  availableRoles,
  totalMatches,
  totalMembers,
  onResetFilters
}) => {
  const isFiltered = searchQuery.trim() !== '' || statusFilter !== 'all' || taxFilter !== 'all' || roleFilter !== 'all';

  const filterModes: { id: FilterField; label: string; icon: React.ReactNode; placeholder: string }[] = [
    {
      id: 'all',
      label: 'All Fields',
      icon: <Filter className="w-3.5 h-3.5" />,
      placeholder: 'Search by first name, surname, or phone number...'
    },
    {
      id: 'firstName',
      label: 'First Name',
      icon: <User className="w-3.5 h-3.5" />,
      placeholder: 'Filter specifically by first name (e.g. Sipho, Sarah)...'
    },
    {
      id: 'surname',
      label: 'Surname',
      icon: <User className="w-3.5 h-3.5" />,
      placeholder: 'Filter specifically by surname / last name (e.g. Mokoena)...'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      icon: <Phone className="w-3.5 h-3.5" />,
      placeholder: 'Filter specifically by phone number (e.g. 082, 077)...'
    }
  ];

  const currentMode = filterModes.find((m) => m.id === filterField) || filterModes[0];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200/80 space-y-4">
      {/* Top Search Row */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Main Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-indigo-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={currentMode.placeholder}
            className="w-full pl-11 pr-10 py-3 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4 bg-slate-200 hover:bg-slate-300 rounded-full p-0.5" />
            </button>
          )}
        </div>

        {/* Quick Target Field Selector (Name, Surname, Phone, TIN, All) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 overflow-x-auto shrink-0">
          {filterModes.map((mode) => {
            const isSelected = filterField === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onFilterFieldChange(mode.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {mode.icon}
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls: Status, Tax Clearance, Role, and Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter Buttons */}
          <div className="flex items-center text-xs font-medium bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
            <button
              onClick={() => onStatusFilterChange('all')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => onStatusFilterChange('active')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                statusFilter === 'active'
                  ? 'bg-white text-emerald-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Active
            </button>
            <button
              onClick={() => onStatusFilterChange('inactive')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                statusFilter === 'inactive'
                  ? 'bg-white text-amber-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Inactive
            </button>
          </div>

          {/* Tax Clearance Filter Buttons */}
          <div className="flex items-center text-xs font-medium bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
            <button
              onClick={() => onTaxFilterChange('all')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                taxFilter === 'all'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tax: All
            </button>
            <button
              onClick={() => onTaxFilterChange('valid')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                taxFilter === 'valid'
                  ? 'bg-white text-emerald-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
              title="Show only members with verified Valid Tax Clearance"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Valid Tax
            </button>
            <button
              onClick={() => onTaxFilterChange('rejected')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                taxFilter === 'rejected'
                  ? 'bg-white text-rose-700 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
              title="Show rejected members (expired validity period)"
            >
              Rejected
            </button>
            <button
              onClick={() => onTaxFilterChange('not_submitted')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                taxFilter === 'not_submitted'
                  ? 'bg-white text-slate-800 font-semibold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Show members who still need to upload their tax clearance"
            >
              Needs Upload
            </button>
          </div>

          {/* Role Filter Dropdown */}
          <select
            value={roleFilter}
            onChange={(e) => onRoleFilterChange(e.target.value)}
            className="text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/60 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="all">All Roles & Groups</option>
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {/* Reset Filters button if any filter is applied */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Matches Badge */}
        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{totalMatches}</span> of{' '}
          <span className="font-bold text-slate-800">{totalMembers}</span> members
          {searchQuery && (
            <span className="ml-1 text-indigo-600 font-semibold">
              (matching &quot;{searchQuery}&quot; in {currentMode.label.toLowerCase()})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
