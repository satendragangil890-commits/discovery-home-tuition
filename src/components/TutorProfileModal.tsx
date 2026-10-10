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
import { VerifiedBadge } from './VerifiedBadge';
import { TutorProficiencyRadar } from './TutorProficiencyRadar';

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
              <div className="absolute -bottom-1 -right-1">
                <VerifiedBadge tutor={tutor} variant="icon" size="md" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{tutor.name}</h2>
                <VerifiedBadge tutor={tutor} variant="seal" size="md" />
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

          {/* Radar Chart: Subject & Class Level Proficiency Matrix */}
          <TutorProficiencyRadar tutor={tutor} />

          {/* Teaching Areas & Summary Availability */}
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
                <span>Overall Routine & Preference</span>
              </div>
              <div className="text-xs text-slate-700 space-y-0.5">
                <div>• {tutor.availableDays.join(', ')}</div>
                <div>• {tutor.availableTimeSlots.join(', ')}</div>
              </div>
            </div>
          </div>

          {/* Weekly Availability Schedule for Demo Classes */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50/70 via-slate-50 to-indigo-50/50 border border-blue-200/90 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-2xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-1.5">
                    <span>Weekly Availability Schedule</span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300">
                      Live Free Demo Slots
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Parents can check free slots and request a trial demo class on open days.
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-[11px] text-slate-600 self-start sm:self-auto pt-1 sm:pt-0">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
                  <span>Free for Demo</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                  <span>Unavailable</span>
                </span>
              </div>
            </div>

            {/* Days Schedule Grid */}
            <div className="space-y-2 mt-2">
              {tutor.weeklySchedule && tutor.weeklySchedule.length > 0 ? (
                tutor.weeklySchedule.map((sched) => (
                  <div
                    key={sched.day}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl border text-xs transition ${
                      sched.isAvailable
                        ? sched.demoSlotAvailable
                          ? 'bg-white border-emerald-200/90 hover:border-emerald-300 shadow-2xs'
                          : 'bg-white/80 border-slate-200'
                        : 'bg-slate-100/70 border-slate-200/70 opacity-70'
                    }`}
                  >
                    {/* Day name & demo status pill */}
                    <div className="flex items-center gap-2.5 min-w-[140px]">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          sched.isAvailable
                            ? sched.demoSlotAvailable
                              ? 'bg-emerald-500 ring-2 ring-emerald-200'
                              : 'bg-blue-500'
                            : 'bg-slate-300'
                        }`}
                      />
                      <span className="font-bold text-slate-900 w-24">{sched.day}</span>
                      {sched.isAvailable && sched.demoSlotAvailable && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                          <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                          <span>Demo Free</span>
                        </span>
                      )}
                      {!sched.isAvailable && (
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-200/60 px-1.5 py-0.5 rounded">
                          Off Day
                        </span>
                      )}
                    </div>

                    {/* Time Slots & Note */}
                    <div className="flex-1 mt-1.5 sm:mt-0 sm:px-3 text-slate-600 flex flex-wrap items-center gap-1.5">
                      {sched.isAvailable ? (
                        <>
                          {sched.slots && sched.slots.length > 0 ? (
                            sched.slots.map((slot) => (
                              <span
                                key={slot}
                                className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 font-medium px-2 py-0.5 rounded text-[11px] border border-slate-200/80"
                              >
                                <Clock className="w-3 h-3 text-indigo-600" />
                                <span>{slot}</span>
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 italic text-[11px]">Slots available on request</span>
                          )}

                          {sched.preferredDemoTime && (
                            <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-800 font-semibold px-2 py-0.5 rounded text-[11px] border border-orange-200">
                              <span>Demo: {sched.preferredDemoTime}</span>
                            </span>
                          )}

                          {sched.note && (
                            <span className="text-[11px] text-slate-500 italic block sm:inline">
                              ({sched.note})
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">
                          {sched.note || 'No routine batches on this day'}
                        </span>
                      )}
                    </div>

                    {/* Quick Demo Action for this day */}
                    {sched.isAvailable && sched.demoSlotAvailable && (
                      <button
                        type="button"
                        onClick={() => {
                          onRequestDemo(tutor);
                          onClose();
                        }}
                        className="mt-2 sm:mt-0 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-lg transition shrink-0 self-end sm:self-center flex items-center gap-1"
                      >
                        <span>Book for {sched.day}</span>
                      </button>
                    )}
                  </div>
                ))
              ) : (
                /* Fallback if schedule is still loading or plain text */
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">
                    Teaching Days: {tutor.availableDays.join(', ')}
                  </div>
                  <div>Available Slots: {tutor.availableTimeSlots.join(' • ')}</div>
                  <div className="text-emerald-700 font-bold flex items-center gap-1 pt-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free demo sessions can be scheduled anytime between Monday - Saturday!</span>
                  </div>
                </div>
              )}
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
