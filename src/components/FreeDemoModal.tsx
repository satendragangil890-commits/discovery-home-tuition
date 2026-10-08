import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  User,
  ShieldCheck,
} from 'lucide-react';
import {
  CLASSES_LIST,
  BOARDS_LIST,
  CORE_SUBJECTS,
  ORAI_LOCALITIES,
  TIME_SLOTS,
  BUSINESS_CONFIG,
} from '../data/masterData';
import { DemoRequest, Tutor } from '../types';
import { StorageService } from '../services/storage';
import { getCallUrl, getWhatsAppDemoUrl } from '../utils/contact';

interface FreeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTutor?: Tutor | null;
  prefilledSubject?: string;
}

export const FreeDemoModal: React.FC<FreeDemoModalProps> = ({
  isOpen,
  onClose,
  selectedTutor,
  prefilledSubject,
}) => {
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState(
    selectedTutor ? selectedTutor.classes[0] : 'Class 10'
  );
  const [board, setBoard] = useState(
    selectedTutor ? selectedTutor.boards[0] : 'CBSE'
  );
  const [subject, setSubject] = useState(
    prefilledSubject || (selectedTutor ? selectedTutor.subjects[0] : 'Mathematics')
  );
  const [area, setArea] = useState(
    selectedTutor ? selectedTutor.teachingAreas[0] : 'Rajendra Nagar'
  );
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[2]);
  const [mobile, setMobile] = useState('');
  const [additionalRequirement, setAdditionalRequirement] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedDemo, setSubmittedDemo] = useState<DemoRequest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const validateMobile = (num: string): boolean => {
    const cleaned = num.replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]/.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!parentName.trim()) {
      setErrorMessage('Please enter parent’s name.');
      return;
    }
    if (!studentName.trim()) {
      setErrorMessage('Please enter student’s name.');
      return;
    }
    if (!validateMobile(mobile)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    const demo = StorageService.createDemoRequest({
      parentName: parentName.trim(),
      studentName: studentName.trim(),
      mobile: mobile.trim(),
      studentClass,
      board,
      subject,
      area,
      preferredDate,
      preferredTime,
      additionalNotes: additionalRequirement,
      assignedTutorId: selectedTutor?.id,
      tutorName: selectedTutor?.name,
    });

    StorageService.setUserPhone(mobile.trim());
    setSubmittedDemo(demo);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                {isSubmitted ? 'Demo Request Submitted' : 'Book 100% Free Demo Class'}
              </h3>
              <p className="text-xs text-blue-200">
                {selectedTutor
                  ? `With tutor: ${selectedTutor.name} in Orai`
                  : 'Experience 1-on-1 personalized teaching at home'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {selectedTutor && (
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center gap-3">
                  <img
                    src={selectedTutor.photoUrl}
                    alt={selectedTutor.name}
                    className="w-11 h-11 rounded-lg object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
                      <span>{selectedTutor.name}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1 rounded font-semibold">
                        Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {selectedTutor.qualification} · {selectedTutor.experienceYears} Yrs Exp
                    </div>
                  </div>
                </div>
              )}

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Parent Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Ramesh Verma"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Aryan Verma"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Class & Board */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class *</label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {CLASSES_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Board *</label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {BOARDS_LIST.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject & Area */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subject *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {CORE_SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Area in Orai *</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {ORAI_LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Time *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  10-Digit Mobile Number *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-700 font-semibold text-xs">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="7268961107"
                    className="w-full px-3 py-2 rounded-r-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium tracking-wide"
                  />
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Requirement / Topic to Test
                </label>
                <input
                  type="text"
                  value={additionalRequirement}
                  onChange={(e) => setAdditionalRequirement(e.target.value)}
                  placeholder="e.g. Chapter 4 Trigonometry demo, child is shy..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-md transition transform active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Free Demo</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero registration fees • Pay only after demo satisfaction</span>
              </div>
            </form>
          ) : (
            /* Confirmation Screen */
            <div className="text-center space-y-4 py-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-blue-950">
                  Demo Request Confirmed!
                </h4>
                <p className="text-sm font-semibold text-emerald-800 mt-1">
                  “Your Free Demo Request has been submitted successfully.”
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Reference: <span className="font-mono font-bold">{submittedDemo?.id}</span> • We will confirm the tutor’s exact time slot within 2 hours.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1">
                <div>
                  <span className="text-slate-500">Student:</span>{' '}
                  <span className="font-bold text-slate-900">{submittedDemo?.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-500">Class & Subject:</span>{' '}
                  <span className="font-bold text-slate-900">
                    {submittedDemo?.studentClass} ({submittedDemo?.board}) · {submittedDemo?.subject}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Scheduled Date:</span>{' '}
                  <span className="font-bold text-slate-900">{submittedDemo?.preferredDate}</span> ({submittedDemo?.preferredTime})
                </div>
                <div>
                  <span className="text-slate-500">Location:</span>{' '}
                  <span className="font-bold text-slate-900">{submittedDemo?.area}, Orai</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={getCallUrl()}
                  className="py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 7268961107</span>
                </a>
                <a
                  href={getWhatsAppDemoUrl({
                    studentName: submittedDemo?.studentName,
                    studentClass: submittedDemo?.studentClass,
                    subject: submittedDemo?.subject,
                    area: submittedDemo?.area,
                    preferredDate: submittedDemo?.preferredDate,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Alert</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 pt-2"
              >
                Done & Return to Homepage
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
