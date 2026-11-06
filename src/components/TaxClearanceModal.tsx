import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Upload, ShieldCheck, CheckCircle2, Eye, Trash2, Calendar
} from 'lucide-react';
import { Member, TaxClearanceInfo, TaxClearanceStatus } from '../types/member';

interface TaxClearanceModalProps {
  isOpen: boolean;
  member: Member | null;
  onClose: () => void;
  onSave: (memberId: string, taxInfo: TaxClearanceInfo) => void;
}

export const TaxClearanceModal: React.FC<TaxClearanceModalProps> = ({
  isOpen,
  member,
  onClose,
  onSave
}) => {
  const [status, setStatus] = useState<TaxClearanceStatus>('valid');
  const [validFrom, setValidFrom] = useState('');
  const [validTo, setValidTo] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [previewEnlarged, setPreviewEnlarged] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (member) {
      const tc = member.taxClearance;
      setStatus(tc?.status || 'valid');
      setValidFrom(tc?.validFrom || new Date().toISOString().slice(0, 10));
      setValidTo(tc?.validTo || '2026-12-31');
      setNotes(tc?.notes || '');
      setImageUrl(tc?.imageUrl || '');
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') {
      alert('Please upload an image file (PNG, JPG, WebP) or PDF.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const info: TaxClearanceInfo = {
      status,
      certificateNumber: 'ITF263',
      taxpayerName: `${member.firstName} ${member.surname}`,
      validFrom: validFrom || undefined,
      validTo: validTo || undefined,
      imageUrl: imageUrl || undefined,
      uploadedAt: member.taxClearance?.uploadedAt || new Date().toISOString(),
      notes: notes.trim() || undefined
    };

    onSave(member.id, info);
    onClose();
  };

  const handleUseSampleCertificate = () => {
    setImageUrl('/assets/aistudio/image_749d51b6.png');
    setStatus('valid');
    setValidFrom('2026-10-09');
    setValidTo('2026-12-31');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-linear-to-r from-emerald-50/60 via-slate-50 to-indigo-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Tax Clearance Certificate (ITF263)
                </h2>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-500">
                BA Member: <strong className="text-slate-800">{member.firstName} {member.surname}</strong> • {member.phone}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* Status selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Verification Status
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {[
                { id: 'valid', label: 'Valid', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
                { id: 'rejected', label: 'Rejected', color: 'border-rose-500 bg-rose-50 text-rose-800 font-extrabold' },
                { id: 'expired', label: 'Expired', color: 'border-amber-500 bg-amber-50 text-amber-800' },
                { id: 'pending', label: 'Pending', color: 'border-sky-500 bg-sky-50 text-sky-800' },
                { id: 'not_submitted', label: 'Not Submitted', color: 'border-slate-300 bg-slate-100 text-slate-700' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStatus(item.id as TaxClearanceStatus)}
                  className={`py-2 px-1.5 rounded-xl border text-[11px] font-bold transition-all text-center ${
                    status === item.id
                      ? `${item.color} shadow-xs ring-2 ring-indigo-100`
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Upload / Image Preview Zone */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Certificate Image
              </label>
              {!imageUrl && (
                <button
                  type="button"
                  onClick={handleUseSampleCertificate}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold hover:underline"
                >
                  Use uploaded certificate scan
                </button>
              )}
            </div>

            {imageUrl ? (
              <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-slate-100 group">
                <img
                  src={imageUrl}
                  alt="Tax Clearance Certificate"
                  className="w-full max-h-56 object-contain bg-slate-950/5 cursor-pointer"
                  onClick={() => setPreviewEnlarged(true)}
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewEnlarged(true)}
                    className="px-3 py-1.5 bg-white text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-slate-50"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Full
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/50'
                    : 'border-slate-300 hover:border-emerald-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                />
                <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  Upload scanned Tax Clearance Certificate image
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Drag & drop image file or browse
                </p>
              </div>
            )}
          </div>

          {/* Validity Period */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Valid From
              </label>
              <input
                type="date"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Valid Until
              </label>
              <input
                type="date"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Verification Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Scanned certificate verified."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Tax Clearance Status
            </button>
          </div>
        </form>
      </div>

      {/* Enlarged Image Lightbox */}
      {previewEnlarged && imageUrl && (
        <div 
          className="fixed inset-0 z-60 bg-slate-950/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setPreviewEnlarged(false)}
        >
          <div className="max-w-4xl w-full flex flex-col items-end">
            <button
              type="button"
              onClick={() => setPreviewEnlarged(false)}
              className="mb-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <X className="w-4 h-4" /> Close Fullscreen
            </button>
            <img
              src={imageUrl}
              alt="Tax Clearance Full Document"
              className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
