import React from 'react';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  BookOpen,
  Calendar,
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Tutor, MatchScoreResult } from '../types';
import { getWhatsAppTutorConnectUrl } from '../utils/contact';

interface TutorCardProps {
  tutor: Tutor;
  matchInfo?: MatchScoreResult;
  onViewProfile: (tutor: Tutor) => void;
  onRequestDemo: (tutor: Tutor) => void;
}

export const TutorCard: React.FC<TutorCardProps> = ({
  tutor,
  matchInfo,
  onViewProfile,
  onRequestDemo,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Match Header if high match */}
        {matchInfo && matchInfo.score >= 80 && (
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white px-3.5 py-1.5 text-xs font-semibold flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Best Match for Your Requirement</span>
            </span>
            <span className="bg-amber-400 text-blue-950 font-bold px-1.5 py-0.2 rounded text-[10px]">
              {matchInfo.score}% Match
            </span>
          </div>
        )}

        <div className="p-4 sm:p-5">
          {/* Top Info: Photo, Name, Verified Badge, Rating */}
          <div className="flex items-start gap-3.5">
            <div className="relative shrink-0">
              <img
                src={tutor.photoUrl}
                alt={tutor.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-slate-200 shadow-2xs"
              />
              {tutor.isVerified && (
                <div
                  className="absolute -bottom-1.5 -right-1.5 bg-emerald-600 text-white p-0.5 rounded-full shadow-xs"
                  title="Verified by Discovery Home Tuition"
                >
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <h3 className="font-extrabold text-base text-blue-950 truncate flex items-center gap-1.5">
                    <span>{tutor.name}</span>
                  </h3>
                  <p className="text-xs font-medium text-slate-600 truncate mt-0.5">
                    {tutor.qualification}
                  </p>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-lg shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-900">{tutor.rating.toFixed(1)}</span>
                  <span className="text-[10px] text-slate-500">({tutor.reviewCount})</span>
                </div>
              </div>

              {/* Quiet unboxed metadata: Experience & Gender */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="font-semibold text-slate-700">{tutor.experienceYears}+ Years Exp</span>
                <span aria-hidden="true">·</span>
                <span>{tutor.gender}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">DHT Verified</span>
              </div>
            </div>
          </div>

          {/* Subjects Taught */}
          <div className="mt-3.5 pt-3 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Subjects
            </div>
            <div className="flex flex-wrap gap-1">
              {tutor.subjects.slice(0, 4).map((sub) => (
                <span
                  key={sub}
                  className="text-xs font-medium text-slate-700 bg-slate-100/90 px-2 py-0.5 rounded-md"
                >
                  {sub}
                </span>
              ))}
              {tutor.subjects.length > 4 && (
                <span className="text-xs text-slate-500 self-center">
                  +{tutor.subjects.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Classes & Boards */}
          <div className="mt-2.5 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Classes</span>
              <span className="font-semibold text-slate-800 truncate block">
                {tutor.classes.slice(0, 3).join(', ')}
                {tutor.classes.length > 3 ? '...' : ''}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Boards</span>
              <span className="font-semibold text-slate-800 truncate block">
                {tutor.boards.join(', ')}
              </span>
            </div>
          </div>

          {/* Teaching Areas in Orai */}
          <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
            <span className="truncate">
              Areas: {tutor.teachingAreas.slice(0, 3).join(', ')}
              {tutor.teachingAreas.length > 3 ? ` (+${tutor.teachingAreas.length - 3} more)` : ''}
            </span>
          </div>

          {/* Tuition Mode & Fee */}
          <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span>🏠 {tutor.tuitionModes.join(' / ')}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500">Starts around </span>
              <span className="font-bold text-slate-900 text-sm">₹{tutor.expectedMonthlyFee}</span>
              <span className="text-[10px] text-slate-500">/mo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="p-3 bg-slate-50/90 border-t border-slate-200/90 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onViewProfile(tutor)}
          className="py-2 px-2 text-center text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition"
        >
          View Profile
        </button>

        <button
          type="button"
          onClick={() => onRequestDemo(tutor)}
          className="py-2 px-2 text-center text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition shadow-2xs"
        >
          Request Demo
        </button>

        <a
          href={getWhatsAppTutorConnectUrl(tutor.name, tutor.qualification)}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-2 text-center text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition flex items-center justify-center gap-1"
        >
          <MessageCircle className="w-3 h-3 text-emerald-600" />
          <span>Contact DHT</span>
        </a>
      </div>
    </div>
  );
};
