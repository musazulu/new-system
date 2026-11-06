import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Tag, FileText, CheckCircle2 } from 'lucide-react';
import { Member, MemberStatus } from '../types/member';
import { AVAILABLE_ROLES, AVATAR_GRADIENTS } from '../data/initialMembers';

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Member) => void;
  initialMember?: Member | null;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialMember
}) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Core Member');
  const [customRole, setCustomRole] = useState('');
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [status, setStatus] = useState<MemberStatus>('active');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialMember) {
      setFirstName(initialMember.firstName);
      setSurname(initialMember.surname);
      setPhone(initialMember.phone);
      setEmail(initialMember.email || '');
      if (AVAILABLE_ROLES.includes(initialMember.role)) {
        setRole(initialMember.role);
        setIsCustomRole(false);
        setCustomRole('');
      } else {
        setRole('custom');
        setIsCustomRole(true);
        setCustomRole(initialMember.role);
      }
      setStatus(initialMember.status);
      setNotes(initialMember.notes || '');
    } else {
      setFirstName('');
      setSurname('');
      setPhone('');
      setEmail('');
      setRole('Core Member');
      setIsCustomRole(false);
      setCustomRole('');
      setStatus('active');
      setNotes('');
    }
    setErrors({});
  }, [initialMember, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) {
      errs.firstName = 'First name is required';
    }
    if (!surname.trim()) {
      errs.surname = 'Surname is required';
    }
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (phone.trim().length < 6) {
      errs.phone = 'Please enter a valid phone number (at least 6 digits)';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (isCustomRole && !customRole.trim()) {
      errs.role = 'Please specify the role/group';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const finalRole = isCustomRole ? customRole.trim() : role;
    const now = new Date().toISOString();

    const memberToSave: Member = {
      id: initialMember?.id || `mem-${Date.now()}`,
      firstName: firstName.trim(),
      surname: surname.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      role: finalRole || 'General Member',
      status: status,
      notes: notes.trim() || undefined,
      createdAt: initialMember?.createdAt || now,
      avatarColor:
        initialMember?.avatarColor ||
        AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)]
    };

    onSave(memberToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50 to-indigo-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {initialMember ? 'Update Member Profile' : 'Add New Member'}
              </h2>
              <p className="text-xs text-slate-500">
                {initialMember ? 'Edit contact details & quick status' : 'Enter personal info, phone and role'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Name Fields in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }));
                  }}
                  placeholder="e.g. Sipho"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                    errors.firstName ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Surname / Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                    if (errors.surname) setErrors(prev => ({ ...prev, surname: '' }));
                  }}
                  placeholder="e.g. Ndlovu"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                    errors.surname ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                  }`}
                />
              </div>
              {errors.surname && (
                <p className="text-xs text-red-500 mt-1 font-medium">{errors.surname}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                }}
                placeholder="e.g. +27 82 123 4567 or 082 123 4567"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono transition-all ${
                  errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              />
            </div>
            {errors.phone ? (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.phone}</p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1">Supports local or international formats with area codes.</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                placeholder="e.g. member@organization.com"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Role and Status Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Role / Group Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-500" /> Role / Group
              </label>
              <select
                value={isCustomRole ? 'custom' : role}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setIsCustomRole(true);
                  } else {
                    setIsCustomRole(false);
                    setRole(e.target.value);
                  }
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {AVAILABLE_ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
                <option value="custom">+ Custom Role...</option>
              </select>

              {isCustomRole && (
                <input
                  type="text"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  placeholder="Enter custom role or group"
                  className="mt-2 w-full px-3 py-2 rounded-xl border border-indigo-200 bg-indigo-50/30 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              )}
            </div>

            {/* Membership Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Membership Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('active')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    status === 'active'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Active
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('inactive')}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    status === 'inactive'
                      ? 'border-amber-500 bg-amber-50 text-amber-800 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Inactive
                </button>
              </div>
            </div>
          </div>

          {/* Notes / Comments */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" /> Notes & Information <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Key project role, meeting attendance notes, or preferred contact time."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm hover:shadow flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              {initialMember ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
