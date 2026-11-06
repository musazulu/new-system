import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Member } from '../types/member';
import { parseCSVToMembers, downloadCSVTemplate } from '../utils/csv';

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (newMembers: Member[]) => void;
}

export const CSVImportModal: React.FC<CSVImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [parsedResult, setParsedResult] = useState<{ members: Member[]; errors: string[] } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      alert('Please upload a valid .csv file');
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setFileContent(text);
      const res = parseCSVToMembers(text);
      setParsedResult(res);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleConfirmImport = () => {
    if (parsedResult && parsedResult.members.length > 0) {
      onImport(parsedResult.members);
      onClose();
    }
  };

  const resetState = () => {
    setFileContent(null);
    setFileName('');
    setParsedResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Import Members from CSV</h2>
              <p className="text-xs text-slate-500">Bulk upload contact lists or rosters</p>
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

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Download Template Banner */}
          <div className="flex items-center justify-between p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs">
            <div className="text-indigo-900">
              <span className="font-semibold">Need a sample format?</span> Download our ready-to-use CSV template.
            </div>
            <button
              type="button"
              onClick={downloadCSVTemplate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" /> Template
            </button>
          </div>

          {/* Upload Drop Zone */}
          {!parsedResult ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-indigo-400 bg-slate-50/40 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />
              <div className="w-12 h-12 mx-auto rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                Click to browse or drop your CSV file here
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports columns: First Name, Surname, Phone Number, Email, Role, Status
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-100 rounded-xl">
                <div className="flex items-center gap-2 text-sm text-slate-800 font-medium truncate">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{fileName}</span>
                </div>
                <button
                  type="button"
                  onClick={resetState}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold underline ml-2 shrink-0"
                >
                  Choose another
                </button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div className="text-xs text-emerald-700 font-medium">Valid Members Ready</div>
                  <div className="text-2xl font-bold text-emerald-800">{parsedResult.members.length}</div>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                  <div className="text-xs text-amber-700 font-medium">Skipped / Warning Rows</div>
                  <div className="text-2xl font-bold text-amber-800">{parsedResult.errors.length}</div>
                </div>
              </div>

              {/* Errors list if any */}
              {parsedResult.errors.length > 0 && (
                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl max-h-32 overflow-y-auto text-xs text-amber-900 space-y-1">
                  <div className="font-semibold flex items-center gap-1 text-amber-900">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Validation Notices:
                  </div>
                  {parsedResult.errors.map((err, idx) => (
                    <div key={idx} className="text-amber-800">• {err}</div>
                  ))}
                </div>
              )}

              {/* Preview table (up to 5 items) */}
              {parsedResult.members.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                    Preview Sample ({Math.min(parsedResult.members.length, 5)} of {parsedResult.members.length})
                  </div>
                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 text-slate-600 font-semibold">
                        <tr>
                          <th className="py-2 px-3">Name</th>
                          <th className="py-2 px-3">Phone</th>
                          <th className="py-2 px-3">Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {parsedResult.members.slice(0, 5).map((m) => (
                          <tr key={m.id}>
                            <td className="py-1.5 px-3 font-medium text-slate-900">{m.firstName} {m.surname}</td>
                            <td className="py-1.5 px-3 font-mono text-slate-700">{m.phone}</td>
                            <td className="py-1.5 px-3 text-slate-600">{m.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!parsedResult || parsedResult.members.length === 0}
            onClick={handleConfirmImport}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold shadow-xs flex items-center gap-2 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            Import {parsedResult?.members.length || 0} Contacts
          </button>
        </div>
      </div>
    </div>
  );
};
