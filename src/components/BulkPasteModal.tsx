import React, { useState } from 'react';
import { X, ClipboardPaste, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { Member } from '../types/member';
import { AVATAR_GRADIENTS } from '../data/initialMembers';

interface BulkPasteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportMembers: (members: Member[], replaceExisting: boolean) => void;
}

export const BulkPasteModal: React.FC<BulkPasteModalProps> = ({
  isOpen,
  onClose,
  onImportMembers
}) => {
  const [rawText, setRawText] = useState('');
  const [replaceExisting, setReplaceExisting] = useState(false);
  const [previewList, setPreviewList] = useState<Member[]>([]);
  const [parsed, setParsed] = useState(false);

  if (!isOpen) return null;

  const parseLines = (text: string): Member[] => {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const parsedMembers: Member[] = [];

    lines.forEach((line) => {
      // Look for phone numbers (patterns with digits and optional +, spaces, dashes, parentheses)
      // e.g. +27 82 123 4567, 0821234567, (011) 555-1234, +1 555 123 4567
      const phoneMatch = line.match(/(?:\+?\d{1,4}[ -]?)?(?:\(?\d{2,4}\)?[ -]?)?\d{3,4}[ -]?\d{3,5}/);
      let phone = phoneMatch ? phoneMatch[0].trim() : '';

      // Remove phone from line to isolate names
      let namePart = phone ? line.replace(phone, '').trim() : line;

      // Clean up common delimiters like colons, commas, tabs, bullets, numbers
      namePart = namePart.replace(/^[\d+.)\-*•\t]+\s*/, '').replace(/[,;:]+$/, '').trim();

      // Check if there is an email
      const emailMatch = namePart.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      const email = emailMatch ? emailMatch[0].trim() : undefined;
      if (email) {
        namePart = namePart.replace(email, '').trim();
      }

      // Split name into first and surname
      const nameTokens = namePart.split(/\s+/).filter(Boolean);
      let firstName = 'Member';
      let surname = '';

      if (nameTokens.length === 1) {
        firstName = nameTokens[0];
      } else if (nameTokens.length > 1) {
        firstName = nameTokens[0];
        surname = nameTokens.slice(1).join(' ');
      }

      if (!phone) {
        // Fallback default phone placeholder if none found on line
        phone = '+27 00 000 0000';
      }

      parsedMembers.push({
        id: `bulk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        firstName,
        surname,
        phone,
        email,
        role: 'Core Member',
        status: 'active',
        createdAt: new Date().toISOString(),
        avatarColor: AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)]
      });
    });

    return parsedMembers;
  };

  const handlePreview = () => {
    if (!rawText.trim()) return;
    const items = parseLines(rawText);
    setPreviewList(items);
    setParsed(true);
  };

  const handleConfirm = () => {
    const listToSave = previewList.length > 0 ? previewList : parseLines(rawText);
    if (listToSave.length > 0) {
      onImportMembers(listToSave, replaceExisting);
      onClose();
      setRawText('');
      setPreviewList([]);
      setParsed(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-linear-to-r from-slate-50 to-indigo-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <ClipboardPaste className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Paste Contact Names & Numbers
              </h2>
              <p className="text-xs text-slate-500">
                Paste any list, WhatsApp text, or document notes. One contact per line.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Paste Your Names & Phone Numbers:
            </label>
            <textarea
              rows={8}
              value={rawText}
              onChange={(e) => {
                setRawText(e.target.value);
                setParsed(false);
              }}
              placeholder={`Example formats accepted (one per line):
Sipho Zulu 082 123 4567
Nomvula Mthembu +27 73 999 8888
Kagiso Dlamini - 084 555 4321
Sarah Jenkins, 071 888 2211, sarah@example.com`}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePreview}
              disabled={!rawText.trim()}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-indigo-700 border border-slate-200 text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Preview Parsed Contacts
            </button>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
              <input
                type="checkbox"
                checked={replaceExisting}
                onChange={(e) => setReplaceExisting(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="font-semibold text-slate-800">Replace current list</span>
              <span className="text-slate-400">(uncheck to add to existing)</span>
            </label>
          </div>

          {/* Parsed Preview Table */}
          {parsed && previewList.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden mt-3">
              <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Recognized {previewList.length} Contacts</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready to save
                </span>
              </div>
              <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                {previewList.map((m, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between gap-2 hover:bg-slate-50">
                    <div className="font-semibold text-slate-900">
                      {m.firstName} {m.surname}
                    </div>
                    <div className="font-mono text-slate-600">{m.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {parsed && previewList.length === 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Could not detect any names or numbers. Please paste text line-by-line.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!rawText.trim()}
            onClick={handleConfirm}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            {replaceExisting ? 'Replace with These Names' : 'Add All These Names'}
          </button>
        </div>
      </div>
    </div>
  );
};
