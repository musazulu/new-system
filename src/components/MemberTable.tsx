import React, { useState } from 'react';
import { 
  Phone, Mail, Edit2, Trash2, Check, Copy, ExternalLink, 
  ArrowUpDown, ArrowUp, ArrowDown, MessageSquare, MoreHorizontal,
  CheckSquare, Square
} from 'lucide-react';
import { Member, SortField, SortOrder, FilterField } from '../types/member';
import { HighlightText } from './HighlightText';
import { TaxClearanceBadge } from './TaxClearanceBadge';

interface MemberTableProps {
  members: Member[];
  searchQuery: string;
  filterField: FilterField;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortChange: (field: SortField) => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onQuickUpdatePhone: (id: string, newPhone: string) => void;
  onOpenTaxClearance: (member: Member) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  isAllSelected: boolean;
}

export const MemberTable: React.FC<MemberTableProps> = ({
  members,
  searchQuery,
  filterField,
  sortField,
  sortOrder,
  onSortChange,
  onEditMember,
  onDeleteMember,
  onToggleStatus,
  onQuickUpdatePhone,
  onOpenTaxClearance,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  isAllSelected
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingPhoneId, setEditingPhoneId] = useState<string | null>(null);
  const [tempPhone, setTempPhone] = useState<string>('');

  const handleCopyPhone = (id: string, phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const startEditPhone = (member: Member, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPhoneId(member.id);
    setTempPhone(member.phone);
  };

  const saveQuickPhone = (id: string) => {
    if (tempPhone.trim()) {
      onQuickUpdatePhone(id, tempPhone.trim());
    }
    setEditingPhoneId(null);
  };

  const cancelQuickPhone = () => {
    setEditingPhoneId(null);
  };

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-300 opacity-60 ml-1 inline" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-indigo-600 font-bold ml-1 inline" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-indigo-600 font-bold ml-1 inline" />
    );
  };

  const getCleanPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
  };

  const highlightFirst = filterField === 'all' || filterField === 'firstName' ? searchQuery : '';
  const highlightSurname = filterField === 'all' || filterField === 'surname' ? searchQuery : '';
  const highlightPhone = filterField === 'all' || filterField === 'phone' ? searchQuery : '';

  if (members.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          <Phone className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No matching members found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
          We couldn&apos;t find any contacts matching your criteria. Try adjusting your search term or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/90 text-slate-500 border-b border-slate-200 text-xs font-bold uppercase tracking-wider select-none">
              <th className="py-3.5 pl-4 pr-2 w-10">
                <button
                  type="button"
                  onClick={onSelectAll}
                  className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center"
                  title={isAllSelected ? 'Deselect all' : 'Select all'}
                >
                  {isAllSelected ? (
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              
              <th 
                onClick={() => onSortChange('name')} 
                className="py-3.5 px-3 cursor-pointer hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center">
                  <span>First Name</span>
                  {renderSortIndicator('name')}
                </div>
              </th>

              <th 
                onClick={() => onSortChange('surname')} 
                className="py-3.5 px-3 cursor-pointer hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center">
                  <span>Surname</span>
                  {renderSortIndicator('surname')}
                </div>
              </th>

              <th 
                onClick={() => onSortChange('phone')} 
                className="py-3.5 px-3 cursor-pointer hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center">
                  <span>Phone Number</span>
                  {renderSortIndicator('phone')}
                </div>
              </th>

              <th className="py-3.5 px-3 hidden md:table-cell">
                Role & Group
              </th>

              <th className="py-3.5 px-3">
                Status
              </th>

              {/* Tax Clearance Verification Column next to Status */}
              <th className="py-3.5 px-3">
                <div className="flex items-center gap-1.5">
                  <span>Tax Clearance</span>
                  <span className="text-[10px] lowercase font-normal text-slate-400">(ITF263)</span>
                </div>
              </th>

              <th 
                onClick={() => onSortChange('createdAt')} 
                className="py-3.5 px-3 cursor-pointer hover:bg-slate-100/70 transition-colors hidden lg:table-cell"
              >
                <div className="flex items-center">
                  <span>Added</span>
                  {renderSortIndicator('createdAt')}
                </div>
              </th>

              <th className="py-3.5 pr-4 pl-3 text-right">
                Quick Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {members.map((member) => {
              const isSelected = selectedIds.includes(member.id);
              const initials = `${member.firstName?.[0] || ''}${member.surname?.[0] || ''}`.toUpperCase();
              const isEditingPhone = editingPhoneId === member.id;
              const cleanWaPhone = getCleanPhoneForWhatsApp(member.phone);

              return (
                <tr
                  key={member.id}
                  className={`group transition-colors ${
                    isSelected ? 'bg-indigo-50/50 hover:bg-indigo-50/70' : 'hover:bg-slate-50/80'
                  }`}
                >
                  {/* Select Checkbox */}
                  <td className="py-3 pl-4 pr-2">
                    <button
                      type="button"
                      onClick={() => onToggleSelect(member.id)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                      )}
                    </button>
                  </td>

                  {/* First Name with Avatar */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl bg-linear-to-tr ${
                          member.avatarColor || 'from-indigo-600 to-purple-600'
                        } text-white font-bold text-xs flex items-center justify-center shadow-2xs shrink-0 select-none`}
                      >
                        {initials || 'M'}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 truncate">
                          <HighlightText text={member.firstName} highlight={highlightFirst} />
                        </div>
                        {member.email && (
                          <div className="text-xs text-slate-400 truncate flex items-center gap-1 font-normal md:hidden">
                            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{member.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Surname */}
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">
                      <HighlightText text={member.surname} highlight={highlightSurname} />
                    </div>
                    {member.notes && (
                      <div className="text-xs text-slate-400 truncate max-w-xs font-normal">
                        {member.notes}
                      </div>
                    )}
                  </td>

                  {/* Phone Number (with inline quick edit) */}
                  <td className="py-3 px-3 font-mono text-xs">
                    {isEditingPhone ? (
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={tempPhone}
                          onChange={(e) => setTempPhone(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveQuickPhone(member.id);
                            if (e.key === 'Escape') cancelQuickPhone();
                          }}
                          autoFocus
                          className="px-2 py-1 text-xs font-mono bg-white border-2 border-indigo-500 rounded-lg focus:outline-none w-36 shadow-xs"
                        />
                        <button
                          type="button"
                          onClick={() => saveQuickPhone(member.id)}
                          className="p-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                          title="Save phone number"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={cancelQuickPhone}
                          className="p-1 bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group/phone">
                        <span 
                          onClick={(e) => startEditPhone(member, e)}
                          title="Click to quick-update phone number"
                          className="cursor-pointer hover:text-indigo-600 hover:underline text-slate-700 font-semibold"
                        >
                          <HighlightText text={member.phone} highlight={highlightPhone} />
                        </span>
                        
                        <div className="flex items-center opacity-0 group-hover/phone:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => handleCopyPhone(member.id, member.phone, e)}
                            title="Copy phone"
                            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                          >
                            {copiedId === member.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Role / Group */}
                  <td className="py-3 px-3 hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                      {member.role || 'Member'}
                    </span>
                  </td>

                  {/* Status (Clickable for instant quick update toggle) */}
                  <td className="py-3 px-3">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(member.id)}
                      title="Click for quick status toggle"
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${
                        member.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          member.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      />
                      <span className="capitalize">{member.status}</span>
                    </button>
                  </td>

                  {/* Tax Clearance Cell next to Status */}
                  <td className="py-3 px-3">
                    <TaxClearanceBadge
                      taxClearance={member.taxClearance}
                      onClick={() => onOpenTaxClearance(member)}
                    />
                  </td>

                  {/* Created At */}
                  <td className="py-3 px-3 hidden lg:table-cell text-xs text-slate-400">
                    {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : '—'}
                  </td>

                  {/* Quick Action Buttons */}
                  <td className="py-3 pr-4 pl-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {/* Call direct */}
                      <a
                        href={`tel:${member.phone.replace(/\s+/g, '')}`}
                        title={`Call ${member.phone}`}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                      </a>

                      {/* WhatsApp direct if digits available */}
                      {cleanWaPhone && (
                        <a
                          href={`https://wa.me/${cleanWaPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Message on WhatsApp"
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      )}

                      {/* Edit full details */}
                      <button
                        type="button"
                        onClick={() => onEditMember(member)}
                        title="Edit member details"
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDeleteMember(member.id)}
                        title="Delete member"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
