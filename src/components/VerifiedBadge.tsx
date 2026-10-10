import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Tutor, TutorStatus } from '../types';

export interface VerifiedBadgeProps {
  tutor?: Tutor;
  isVerified?: boolean;
  status?: TutorStatus;
  variant?: 'icon' | 'badge' | 'seal' | 'inline';
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  tutor,
  isVerified: directIsVerified,
  status: directStatus,
  variant = 'badge',
  size = 'md',
  showTooltip = true,
  className = '',
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Resolve verification and status from tutor or direct props
  const isVerified =
    directIsVerified !== undefined
      ? directIsVerified
      : tutor
      ? tutor.isVerified || tutor.status === 'Active' || tutor.status === 'Verified'
      : false;

  const status = directStatus || (tutor ? tutor.status : 'Verified');

  // Size configurations
  const sizeMap = {
    sm: {
      icon: 'w-3 h-3',
      text: 'text-[10px]',
      padding: 'px-1.5 py-0.5',
      sealIcon: 'w-3.5 h-3.5',
    },
    md: {
      icon: 'w-3.5 h-3.5',
      text: 'text-xs',
      padding: 'px-2 py-0.5',
      sealIcon: 'w-4 h-4',
    },
    lg: {
      icon: 'w-4 h-4',
      text: 'text-xs font-bold',
      padding: 'px-2.5 py-1',
      sealIcon: 'w-5 h-5',
    },
  };

  const currentSize = sizeMap[size];

  // Tooltip content explaining verification checks in Orai
  const renderTooltip = () => (
    <div
      role="tooltip"
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-3 bg-slate-900 text-white rounded-xl shadow-xl text-left z-50 text-[11px] pointer-events-none animate-in fade-in zoom-in-95 duration-150 border border-slate-700/80"
    >
      <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Discovery Verified Faculty</span>
      </div>
      <div className="space-y-1 text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>Govt ID & Address in Orai Checked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>Degrees & Marksheets Authenticated</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>Sample Demo Class Evaluated</span>
        </div>
      </div>
      <div className="text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-slate-800">
        100% Background Screened by DHT
      </div>
      {/* Downward triangle arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
    </div>
  );

  // If NOT verified yet (e.g. Under Verification / New)
  if (!isVerified) {
    if (variant === 'icon') {
      return (
        <span
          className={`inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-700 p-0.5 ${className}`}
          title="Profile Under Verification"
        >
          <Clock className={currentSize.icon} />
        </span>
      );
    }

    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 rounded-md ${currentSize.padding} ${currentSize.text} ${className}`}
      >
        <Clock className={currentSize.icon} />
        <span>Under Verification</span>
      </span>
    );
  }

  // 1. Icon variant (perfect for overlaying on tutor avatar photo)
  if (variant === 'icon') {
    return (
      <div
        className="relative inline-block cursor-help"
        onMouseEnter={() => showTooltip && setTooltipOpen(true)}
        onMouseLeave={() => showTooltip && setTooltipOpen(false)}
        onTouchStart={() => showTooltip && setTooltipOpen(!tooltipOpen)}
      >
        <span
          className={`inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xs p-1 ring-2 ring-white ${className}`}
          title="Verified by Discovery Home Tuition"
        >
          <ShieldCheck className={currentSize.sealIcon} />
        </span>
        {tooltipOpen && renderTooltip()}
      </div>
    );
  }

  // 2. Inline text variant (quiet, zero-pill aesthetic for metadata lines)
  if (variant === 'inline') {
    return (
      <span
        className={`inline-flex items-center gap-1 text-emerald-700 font-semibold cursor-help relative ${currentSize.text} ${className}`}
        onMouseEnter={() => showTooltip && setTooltipOpen(true)}
        onMouseLeave={() => showTooltip && setTooltipOpen(false)}
        onTouchStart={() => showTooltip && setTooltipOpen(!tooltipOpen)}
      >
        <CheckCircle2 className={`${currentSize.icon} text-emerald-600 shrink-0`} />
        <span>DHT Verified</span>
        {tooltipOpen && renderTooltip()}
      </span>
    );
  }

  // 3. Seal variant (featured trust seal for headers or profile modal)
  if (variant === 'seal') {
    return (
      <div
        className="relative inline-block cursor-help"
        onMouseEnter={() => showTooltip && setTooltipOpen(true)}
        onMouseLeave={() => showTooltip && setTooltipOpen(false)}
        onTouchStart={() => showTooltip && setTooltipOpen(!tooltipOpen)}
      >
        <div
          className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-lg shadow-xs ${currentSize.padding} ${currentSize.text} ${className}`}
        >
          <ShieldCheck className={`${currentSize.icon} text-amber-300 shrink-0`} />
          <span className="tracking-wide uppercase text-[10px]">DHT Verified Teacher</span>
        </div>
        {tooltipOpen && renderTooltip()}
      </div>
    );
  }

  // 4. Default 'badge' variant (clean, crisp badge with icon and label)
  return (
    <div
      className="relative inline-block cursor-help"
      onMouseEnter={() => showTooltip && setTooltipOpen(true)}
      onMouseLeave={() => showTooltip && setTooltipOpen(false)}
      onTouchStart={() => showTooltip && setTooltipOpen(!tooltipOpen)}
    >
      <span
        className={`inline-flex items-center gap-1 bg-emerald-50/90 text-emerald-800 border border-emerald-300/80 rounded-md font-semibold transition hover:bg-emerald-100/90 ${currentSize.padding} ${currentSize.text} ${className}`}
      >
        <ShieldCheck className={`${currentSize.icon} text-emerald-600 shrink-0`} />
        <span>Verified</span>
      </span>
      {tooltipOpen && renderTooltip()}
    </div>
  );
};
