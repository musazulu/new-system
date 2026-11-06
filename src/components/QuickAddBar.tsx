import React, { useState } from 'react';
import { UserPlus, Plus, ArrowRight } from 'lucide-react';
import { Member } from '../types/member';
import { AVATAR_GRADIENTS } from '../data/initialMembers';

interface QuickAddBarProps {
  onAddMember: (member: Member) => void;
  onOpenFullModal: () => void;
}

export const QuickAddBar: React.FC<QuickAddBarProps> = ({
  onAddMember,
  onOpenFullModal
}) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setError('First name is required');
      return;
    }
    if (!surname.trim()) {
      setError('Surname is required');
      return;
    }
    if (!phone.trim()) {
      setError('Phone is required');
      return;
    }

    const newMember: Member = {
      id: `mem-${Date.now()}`,
      firstName: firstName.trim(),
      surname: surname.trim(),
      phone: phone.trim(),
      role: 'Core Member',
      status: 'active',
      createdAt: new Date().toISOString(),
      avatarColor: AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)]
    };

    onAddMember(newMember);
    setFirstName('');
    setSurname('');
    setPhone('');
    setError('');
  };

  return (
    <div className="bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-lg relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-500/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-500/30 rounded-lg text-indigo-300">
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold tracking-tight text-white">
              Instant Quick Add
            </h3>
            <span className="text-xs text-indigo-200/70 hidden sm:inline">
              — Add a member in seconds with just Name, Surname & Phone
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenFullModal}
            className="text-xs text-indigo-300 hover:text-white flex items-center gap-1 font-medium transition-colors hover:underline self-start sm:self-auto"
          >
            <span>Need more fields (Email, Role, Notes)?</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleQuickAdd} className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
          <div className="sm:col-span-3">
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (error) setError('');
              }}
              placeholder="First name *"
              className="w-full px-3 py-2 bg-white/10 hover:bg-white/15 focus:bg-white text-slate-100 focus:text-slate-900 placeholder:text-slate-400 rounded-xl border border-white/20 focus:border-white text-sm focus:outline-none transition-all"
            />
          </div>

          <div className="sm:col-span-3">
            <input
              type="text"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
                if (error) setError('');
              }}
              placeholder="Surname / Last name *"
              className="w-full px-3 py-2 bg-white/10 hover:bg-white/15 focus:bg-white text-slate-100 focus:text-slate-900 placeholder:text-slate-400 rounded-xl border border-white/20 focus:border-white text-sm focus:outline-none transition-all"
            />
          </div>

          <div className="sm:col-span-4">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error) setError('');
              }}
              placeholder="Phone number (e.g. +27 82 000 0000) *"
              className="w-full px-3 py-2 bg-white/10 hover:bg-white/15 focus:bg-white text-slate-100 focus:text-slate-900 placeholder:text-slate-400 rounded-xl border border-white/20 focus:border-white text-sm font-mono focus:outline-none transition-all"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full h-full py-2 px-3 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Quick Add</span>
            </button>
          </div>
        </form>

        {error && (
          <p className="text-xs text-rose-300 font-semibold mt-2 animate-shake">
            ⚠️ {error}
          </p>
        )}
      </div>
    </div>
  );
};
