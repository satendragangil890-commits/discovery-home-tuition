import React from 'react';
import {
  X,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  Lock,
  Phone,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { Tutor } from '../types';
import { BUSINESS_CONFIG } from '../data/masterData';
import { getWhatsAppTutorConnectUrl, getCallUrl } from '../utils/contact';

interface TutorProfileModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestDemo: (tutor: Tutor) => void;
}

export const TutorProfileModal: React.FC<TutorProfileModalProps> = ({
  tutor,
  isOpen,
  onClose,
  onRequestDemo,
}) => {
  if (!isOpen || !tutor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-5 sm:p-6 shrink-0 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={tutor.photoUrl}
                alt={tutor.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-white/20 shadow-md"
              />
              {tutor.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{tutor.name}</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Verified Tutor
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-100 font-medium">
                {tutor.qualification}
              </p>
              <div className="flex items-center gap-3 text-xs text-blue-200 pt-0.5">
                <span className="flex items-center gap-1 font-semibold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{tutor.rating.toFixed(1)} / 5.0</span>
                  <span className="text-blue-200 font-normal">({tutor.reviewCount} reviews)</span>
                </span>
                <span>·</span>
                <span>{tutor.experienceYears}+ Years Teaching</span>
                <span>·</span>
                <span>{tutor.gender}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* About / Bio */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Teaching Methodology & Bio
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {tutor.bio}
            </p>
          </div>

          {/* Key Achievements */}
          {tutor.achievements && tutor.achievements.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Proven Track Record
              </h4>
              <div className="space-y-1.5">
                {tutor.achievements.map((ach) => (
                  <div
                    key={ach}
                    className="flex items-center gap-2 text-xs font-medium text-slate-800 bg-amber-50/60 border border-amber-200/70 p-2.5 rounded-lg"
                  >
                    <Award className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subjects & Classes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-700" />
                <span>Subjects Taught</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {tutor.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="text-xs font-semibold bg-white border border-slate-200 text-slate-800 px-2 py-0.5 rounded-md"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Classes & Boards</span>
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                <div>
                  <span className="font-semibold text-slate-900">Classes: </span>
                  {tutor.classes.join(', ')}
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Boards: </span>
                  {tutor.boards.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Teaching Areas & Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>Localities Covered in Orai</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {tutor.teachingAreas.join(' • ')}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Available Hours & Days</span>
              </div>
              <div className="text-xs text-slate-700 space-y-0.5">
                <div>• {tutor.availableDays.join(', ')}</div>
                <div>• {tutor.availableTimeSlots.join(', ')}</div>
              </div>
            </div>
          </div>

          {/* Privacy & Safety Disclosure */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-3 text-xs text-blue-950">
            <Lock className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Child Safety & Contact Privacy:</span> Direct mobile numbers of tutors are protected to prevent unsolicited marketing. Discovery Home Tuition facilitates the free trial demo, verifies background documents, and handles hassle-free replacement if required.
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-500">Estimated Tuition Fee</div>
            <div className="text-sm font-extrabold text-blue-950">
              ₹{tutor.expectedMonthlyFee} <span className="text-xs font-normal text-slate-500">/ month</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={getWhatsAppTutorConnectUrl(tutor.name, tutor.qualification)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp DHT</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onRequestDemo(tutor);
                onClose();
              }}
              className="flex-1 sm:flex-none py-2.5 px-5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/20 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Free Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
