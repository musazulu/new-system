import React from 'react';
import { ShieldCheck, ShieldAlert, Clock, AlertCircle } from 'lucide-react';
import { TaxClearanceInfo, TaxClearanceStatus } from '../types/member';

interface TaxClearanceBadgeProps {
  taxClearance?: TaxClearanceInfo;
  onClick?: () => void;
  className?: string;
  showIconOnly?: boolean;
}

export const TaxClearanceBadge: React.FC<TaxClearanceBadgeProps> = ({
  taxClearance,
  onClick,
  className = '',
  showIconOnly = false
}) => {
  const status: TaxClearanceStatus = taxClearance?.status || 'not_submitted';

  const configs: Record<TaxClearanceStatus, {
    label: string;
    sublabel: string;
    bg: string;
    text: string;
    border: string;
    hoverBg: string;
    dot: string;
    icon: React.ReactNode;
  }> = {
    valid: {
      label: 'Valid',
      sublabel: 'ITF263 Verified',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      hoverBg: 'hover:bg-emerald-100',
      dot: 'bg-emerald-500',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
    },
    pending: {
      label: 'Pending Review',
      sublabel: 'Uploaded',
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-200',
      hoverBg: 'hover:bg-sky-100',
      dot: 'bg-sky-500',
      icon: <Clock className="w-3.5 h-3.5 text-sky-600" />
    },
    rejected: {
      label: 'Rejected',
      sublabel: 'Expired Validity Period',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      hoverBg: 'hover:bg-rose-100',
      dot: 'bg-rose-500',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
    },
    expired: {
      label: 'Expired',
      sublabel: 'Renewal Needed',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      hoverBg: 'hover:bg-rose-100',
      dot: 'bg-rose-500',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
    },
    not_submitted: {
      label: 'Not Submitted',
      sublabel: 'Upload Required',
      bg: 'bg-slate-100',
      text: 'text-slate-500',
      border: 'border-slate-200',
      hoverBg: 'hover:bg-slate-200/70',
      dot: 'bg-slate-400',
      icon: <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
    }
  };

  const config = configs[status];

  return (
    <button
      type="button"
      onClick={onClick}
      title={
        status === 'valid'
          ? `Tax Clearance Valid (TIN: ${taxClearance?.tin || 'N/A'}, Valid until: ${taxClearance?.validTo || 'N/A'}) - Click to view certificate`
          : 'Tax Clearance: Click to view / upload certificate'
      }
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border shadow-2xs ${config.bg} ${config.text} ${config.border} ${onClick ? config.hoverBg : ''} ${className}`}
    >
      {config.icon}
      {!showIconOnly && (
        <span className="font-bold tracking-tight">
          {config.label}
        </span>
      )}
      {status === 'valid' && taxClearance?.validTo && !showIconOnly && (
        <span className="text-[10px] text-emerald-600/80 font-normal hidden xl:inline">
          ({taxClearance.validTo.slice(5)})
        </span>
      )}
    </button>
  );
};
