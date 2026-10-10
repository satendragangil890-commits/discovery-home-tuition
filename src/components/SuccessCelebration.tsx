import React, { useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Phone,
  MessageCircle,
  Copy,
  Check,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Award,
  Repeat,
} from 'lucide-react';
import { DemoRequest, Tutor } from '../types';
import { getCallUrl, getWhatsAppDemoUrl } from '../utils/contact';

interface SuccessCelebrationProps {
  demo: DemoRequest;
  selectedTutor?: Tutor | null;
  onClose: () => void;
}

export const SuccessCelebration: React.FC<SuccessCelebrationProps> = ({
  demo,
  selectedTutor,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [celebrateCount, setCelebrateCount] = useState(1);

  const fireConfetti = useCallback(() => {
    // 1. Center burst
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#2563eb', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'],
      zIndex: 99999,
      disableForReducedMotion: true,
    });

    // 2. Left canon burst
    const timer1 = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.15, y: 0.65 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ffffff'],
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    }, 220);

    // 3. Right canon burst
    const timer2 = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.85, y: 0.65 },
        colors: ['#ec4899', '#8b5cf6', '#10b981', '#f59e0b'],
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    }, 420);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Fire confetti upon mounting
  useEffect(() => {
    const cleanup = fireConfetti();
    return () => {
      if (cleanup) cleanup();
      confetti.reset();
    };
  }, [fireConfetti]);

  const handleReplayConfetti = () => {
    setCelebrateCount((c) => c + 1);
    fireConfetti();
  };

  const handleCopyId = () => {
    if (demo?.id) {
      navigator.clipboard.writeText(demo.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2200);
    }
  };

  return (
    <div className="text-center space-y-4 py-2 animate-in fade-in duration-300">
      {/* Animated Success Checkmark with expanding ripple and bursts */}
      <div className="relative inline-flex items-center justify-center my-2">
        {/* Pulsing ripple wave */}
        <div className="absolute w-20 h-20 rounded-full bg-emerald-400/30 animate-ripple-ring pointer-events-none" />
        <div className="absolute w-24 h-24 rounded-full bg-emerald-500/15 animate-ping pointer-events-none duration-1000" />

        {/* Decorative sparkles */}
        <div className="absolute -top-2 -left-2 text-amber-500 animate-sparkle-burst">
          <Sparkles className="w-5 h-5 fill-amber-400" />
        </div>
        <div
          className="absolute -bottom-1 -right-2 text-indigo-500 animate-sparkle-burst"
          style={{ animationDelay: '150ms' }}
        >
          <Sparkles className="w-4 h-4 fill-indigo-400" />
        </div>
        <div
          className="absolute top-1 -right-3 text-emerald-500 animate-sparkle-burst"
          style={{ animationDelay: '300ms' }}
        >
          <Sparkles className="w-4 h-4 fill-emerald-400" />
        </div>

        {/* Success check circle SVG with drawing stroke animation */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-500/25 flex items-center justify-center relative z-10 animate-success-pop">
          <svg
            className="w-12 h-12 text-white"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle outline */}
            <circle
              cx="26"
              cy="26"
              r="24"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="3.5"
            />
            {/* Animated outer stroke */}
            <circle
              className="animate-checkmark-circle"
              cx="26"
              cy="26"
              r="24"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Animated checkmark */}
            <path
              className="animate-checkmark-check"
              d="M15 27.5L22.5 35L37 19"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Positive Reinforcement Heading */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5 text-emerald-600" />
          <span>Demo Class Request Confirmed!</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Congratulations, {demo.parentName || 'Parent'}! 🎉
        </h4>
        <p className="text-sm text-emerald-800 font-medium mt-1">
          Your free demo class for <span className="font-bold underline decoration-emerald-400 decoration-2">{demo.studentName}</span> is locked in!
        </p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Our Orai coordinator is reviewing tutor availability and will call you within 2 hours to confirm the exact time.
        </p>
      </div>

      {/* Booking Summary Card */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-left text-xs space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <span>Booking Ref:</span>
            <span className="font-mono font-bold text-slate-900">{demo.id}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyId}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            {copiedId ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-500" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="truncate">
              <strong>{demo.studentClass}</strong> ({demo.board}) · {demo.subject}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="truncate">
              <strong>{demo.area}</strong>, Orai
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              Date: <strong>{demo.preferredDate}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              Time: <strong>{demo.preferredTime}</strong>
            </span>
          </div>
        </div>

        {selectedTutor && (
          <div className="pt-1.5 border-t border-slate-200 flex items-center gap-2 text-xs text-blue-950 font-medium">
            <span className="text-slate-500">Selected Tutor:</span>
            <span className="font-bold">{selectedTutor.name}</span>
            <span className="text-[11px] text-slate-500">({selectedTutor.qualification})</span>
          </div>
        )}
      </div>

      {/* Trust reassurance pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-[11px] text-slate-600">
        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-2.5 py-1 rounded-md border border-blue-200">
          ✓ 100% Free Demo Class
        </span>
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200">
          ✓ No Advance Payment
        </span>
        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded-md border border-amber-200">
          ✓ Tutor Replaced if Unsatisfied
        </span>
      </div>

      {/* Action CTA Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <a
          href={getCallUrl()}
          className="py-2.5 px-3 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-98"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call 7268961107</span>
        </a>
        <a
          href={getWhatsAppDemoUrl({
            studentName: demo.studentName,
            studentClass: demo.studentClass,
            subject: demo.subject,
            area: demo.area,
            preferredDate: demo.preferredDate,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition active:scale-98"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Alert</span>
        </a>
      </div>

      {/* Replay confetti + Done button */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <button
          type="button"
          onClick={handleReplayConfetti}
          className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-semibold py-1 px-2 rounded hover:bg-blue-50 transition"
          title="Celebrate with confetti again"
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>Confetti again 🎉</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 py-1 px-3 rounded hover:bg-slate-100 transition"
        >
          Done & Close
        </button>
      </div>
    </div>
  );
};
