import React, { useState } from 'react';
import { 
  Phone, Mail, Edit2, Trash2, Check, Copy, MessageSquare, 
  CheckSquare, Square 
} from 'lucide-react';
import { Member, FilterField } from '../types/member';
import { HighlightText } from './HighlightText';
import { TaxClearanceBadge } from './TaxClearanceBadge';

interface MemberCardsProps {
  members: Member[];
  searchQuery: string;
  filterField: FilterField;
  onEditMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onQuickUpdatePhone: (id: string, newPhone: string) => void;
  onOpenTaxClearance: (member: Member) => void;
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

export const MemberCards: React.FC<MemberCardsProps> = ({
  members,
  searchQuery,
  filterField,
  onEditMember,
  onDeleteMember,
  onToggleStatus,
  onQuickUpdatePhone,
  onOpenTaxClearance,
  selectedIds,
  onToggleSelect
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

  const highlightFirst = filterField === 'all' || filterField === 'firstName' ? searchQuery : '';
  const highlightSurname = filterField === 'all' || filterField === 'surname' ? searchQuery : '';
  const highlightPhone = filterField === 'all' || filterField === 'phone' ? searchQuery : '';

  if (members.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => {
        const isSelected = selectedIds.includes(member.id);
        const initials = `${member.firstName?.[0] || ''}${member.surname?.[0] || ''}`.toUpperCase();
        const isEditingPhone = editingPhoneId === member.id;
        const cleanWaPhone = member.phone.replace(/[^0-9]/g, '');

        return (
          <div
            key={member.id}
            className={`bg-white rounded-2xl border p-4 sm:p-5 transition-all shadow-2xs hover:shadow-md relative flex flex-col justify-between ${
              isSelected ? 'border-indigo-500 ring-2 ring-indigo-100 bg-indigo-50/20' : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div>
              {/* Header: Select + Avatar + Name + Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleSelect(member.id)}
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300" />
                    )}
                  </button>

                  <div
                    className={`w-10 h-10 rounded-xl bg-linear-to-tr ${
                      member.avatarColor || 'from-indigo-600 to-purple-600'
                    } text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0 select-none`}
                  >
                    {initials || 'M'}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-base leading-tight">
                      <HighlightText text={member.firstName} highlight={highlightFirst} />{' '}
                      <HighlightText text={member.surname} highlight={highlightSurname} />
                    </h4>
                    <span className="inline-block mt-0.5 text-xs text-slate-500 font-medium">
                      {member.role || 'Member'}
                    </span>
                  </div>
                </div>

                {/* Status Toggle & Tax Clearance Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  <button
                    type="button"
                    onClick={() => onToggleStatus(member.id)}
                    title="Click to toggle status"
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${
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

                  <TaxClearanceBadge
                    taxClearance={member.taxClearance}
                    onClick={() => onOpenTaxClearance(member)}
                  />
                </div>
              </div>

              {/* Contact Info Details */}
              <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs">
                {/* Phone */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Phone className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Phone:</span>
                  </div>

                  {isEditingPhone ? (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveQuickPhone(member.id);
                          if (e.key === 'Escape') setEditingPhoneId(null);
                        }}
                        autoFocus
                        className="px-2 py-0.5 text-xs font-mono border border-indigo-500 rounded bg-white w-32"
                      />
                      <button
                        type="button"
                        onClick={() => saveQuickPhone(member.id)}
                        className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <span
                        onClick={(e) => startEditPhone(member, e)}
                        title="Click to quick-edit phone"
                        className="font-mono font-semibold text-slate-800 cursor-pointer hover:text-indigo-600 hover:underline"
                      >
                        <HighlightText text={member.phone} highlight={highlightPhone} />
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyPhone(member.id, member.phone, e)}
                        className="p-1 text-slate-400 hover:text-slate-700"
                        title="Copy phone"
                      >
                        {copiedId === member.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Email */}
                {member.email && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>Email:</span>
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-slate-700 hover:text-indigo-600 truncate max-w-[170px]"
                      title={member.email}
                    >
                      {member.email}
                    </a>
                  </div>
                )}

                {/* Notes */}
                {member.notes && (
                  <div className="bg-slate-50 p-2 rounded-xl text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                    {member.notes}
                  </div>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Added {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : '—'}
              </span>

              <div className="flex items-center gap-1">
                <a
                  href={`tel:${member.phone.replace(/\s+/g, '')}`}
                  title="Call"
                  className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>

                {cleanWaPhone && (
                  <a
                    href={`https://wa.me/${cleanWaPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => onEditMember(member)}
                  title="Edit details"
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteMember(member.id)}
                  title="Delete"
                  className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
