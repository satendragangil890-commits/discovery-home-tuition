import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Phone,
  MessageCircle,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  User,
  BookOpen,
  Award,
} from 'lucide-react';
import {
  CLASSES_LIST,
  BOARDS_LIST,
  CORE_SUBJECTS,
  ORAI_LOCALITIES,
  DAYS_PREFERENCES,
  TIME_SLOTS,
  BUSINESS_CONFIG,
} from '../data/masterData';
import { TuitionRequest, Tutor, MatchScoreResult } from '../types';
import { StorageService } from '../services/storage';
import { getRankedTutors } from '../utils/matching';
import { getCallUrl, getWhatsAppRequirementUrl } from '../utils/contact';
import { VerifiedBadge } from './VerifiedBadge';

interface ParentFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledClass?: string;
  prefilledSubject?: string;
  prefilledBoard?: string;
  onTutorSelect?: (tutor: Tutor) => void;
}

export const ParentFlowModal: React.FC<ParentFlowModalProps> = ({
  isOpen,
  onClose,
  prefilledClass,
  prefilledSubject,
  prefilledBoard,
  onTutorSelect,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<TuitionRequest | null>(null);
  const [matchedTutors, setMatchedTutors] = useState<MatchScoreResult[]>([]);

  // Form State across 10 steps
  const [studentClass, setStudentClass] = useState(prefilledClass || 'Class 10');
  const [board, setBoard] = useState(prefilledBoard || 'CBSE');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    prefilledSubject ? [prefilledSubject] : ['Mathematics', 'Science']
  );
  const [area, setArea] = useState('Rajendra Nagar');
  const [customArea, setCustomArea] = useState('');
  const [tuitionMode, setTuitionMode] = useState<'Home Tuition' | 'Online Tuition'>('Home Tuition');
  const [preferredDays, setPreferredDays] = useState(DAYS_PREFERENCES[0]);
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[2]); // Evening 4-6 PM
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [additionalRequirement, setAdditionalRequirement] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const toggleSubject = (sub: string) => {
    if (sub === 'All Subjects') {
      setSelectedSubjects(['All Subjects']);
      return;
    }
    const filtered = selectedSubjects.filter((s) => s !== 'All Subjects');
    if (filtered.includes(sub)) {
      setSelectedSubjects(filtered.filter((s) => s !== sub));
    } else {
      setSelectedSubjects([...filtered, sub]);
    }
  };

  const validateMobile = (num: string): boolean => {
    const cleaned = num.replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]/.test(cleaned);
  };

  const handleNext = () => {
    setErrorMessage('');
    if (step === 3 && selectedSubjects.length === 0) {
      setErrorMessage('Please select at least one subject or All Subjects.');
      return;
    }
    if (step === 8 && !parentName.trim()) {
      setErrorMessage('Please enter parent’s name.');
      return;
    }
    if (step === 9) {
      if (!validateMobile(mobile)) {
        setErrorMessage('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 10));
  };

  const handlePrev = () => {
    setErrorMessage('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMobile(mobile)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!parentName.trim()) {
      setErrorMessage('Please enter parent name.');
      return;
    }

    const finalArea = area === 'Other Area in Orai' && customArea ? customArea : area;

    const newReq = StorageService.createTuitionRequest({
      studentName: studentName.trim() || 'Student',
      parentName: parentName.trim(),
      mobile: mobile.trim(),
      studentClass,
      board,
      subjects: selectedSubjects,
      area: finalArea,
      tuitionMode,
      preferredDays,
      preferredTime,
      additionalNotes: additionalRequirement,
    });

    // Save phone for profile
    StorageService.setUserPhone(mobile.trim());

    // Rank matching tutors
    const allTutors = StorageService.getTutors();
    const ranked = getRankedTutors(allTutors, {
      studentClass,
      board,
      subjects: selectedSubjects,
      area: finalArea,
      tuitionMode,
    });

    setSubmittedRequest(newReq);
    setMatchedTutors(ranked.slice(0, 3));
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-amber-300 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                {isSubmitted ? 'Requirement Received' : 'Find Your Home Tutor'}
              </h3>
              <p className="text-xs text-blue-200">
                {isSubmitted
                  ? 'Discovery Home Tuition Coordinator is on it'
                  : `Step ${step} of 10 • Quick 60-Second Form`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="w-full bg-slate-100 h-1.5">
            <div
              className="bg-orange-500 h-1.5 transition-all duration-300"
              style={{ width: `${(step / 10) * 100}%` }}
            />
          </div>
        )}

        {/* Form Body */}
        <div className="p-5 sm:p-6">
          {!isSubmitted ? (
            <div>
              {/* Step 1: Select Class */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 1</span>
                    <h4 className="text-lg font-bold text-blue-950">Select Student’s Class</h4>
                    <p className="text-xs text-slate-500">
                      Which class does your child study in?
                    </p>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {CLASSES_LIST.map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setStudentClass(cls)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition text-center ${
                          studentClass === cls
                            ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Select Board */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 2</span>
                    <h4 className="text-lg font-bold text-blue-950">Select School Board</h4>
                    <p className="text-xs text-slate-500">
                      Class: <span className="font-bold text-blue-900">{studentClass}</span>
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BOARDS_LIST.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBoard(b)}
                        className={`p-4 rounded-xl border text-center transition ${
                          board === b
                            ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-bold text-sm">{b}</div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            board === b ? 'text-blue-200' : 'text-slate-500'
                          }`}
                        >
                          {b === 'UP Board' ? 'Hindi / English Medium' : 'English Medium'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Select Subject */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 3</span>
                    <h4 className="text-lg font-bold text-blue-950">Select Subject(s) Needed</h4>
                    <p className="text-xs text-slate-500">
                      Tap to select multiple subjects or pick "All Subjects".
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CORE_SUBJECTS.map((sub) => {
                      const isSelected = selectedSubjects.includes(sub);
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() => toggleSubject(sub)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition flex items-center justify-between ${
                            isSelected
                              ? 'bg-orange-50 border-orange-500 text-orange-950 font-bold'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span>{sub}</span>
                          {isSelected && <CheckCircle className="w-3.5 h-3.5 text-orange-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Enter Student Location / Area */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 4</span>
                    <h4 className="text-lg font-bold text-blue-950">Student Locality / Area in Orai</h4>
                    <p className="text-xs text-slate-500">
                      Where should the home tutor visit?
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1">
                    {ORAI_LOCALITIES.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setArea(loc)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left transition ${
                          area === loc
                            ? 'bg-blue-900 text-white border-blue-900 font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        📍 {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Tuition Mode */}
              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 5</span>
                    <h4 className="text-lg font-bold text-blue-950">Preferred Tuition Mode</h4>
                    <p className="text-xs text-slate-500">
                      Choose how the teacher should conduct classes.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTuitionMode('Home Tuition')}
                      className={`p-4 rounded-xl border text-left transition ${
                        tuitionMode === 'Home Tuition'
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">🏠</div>
                      <div className="font-bold text-sm">Home Tuition</div>
                      <div
                        className={`text-xs mt-0.5 ${
                          tuitionMode === 'Home Tuition' ? 'text-blue-200' : 'text-slate-500'
                        }`}
                      >
                        Teacher visits student’s home in Orai for 1-to-1 classes.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTuitionMode('Online Tuition')}
                      className={`p-4 rounded-xl border text-left transition ${
                        tuitionMode === 'Online Tuition'
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">💻</div>
                      <div className="font-bold text-sm">Online Tuition</div>
                      <div
                        className={`text-xs mt-0.5 ${
                          tuitionMode === 'Online Tuition' ? 'text-blue-200' : 'text-slate-500'
                        }`}
                      >
                        Live 1-to-1 screen share classes with top faculties.
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 6: Preferred Days */}
              {step === 6 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 6</span>
                    <h4 className="text-lg font-bold text-blue-950">Preferred Days</h4>
                    <p className="text-xs text-slate-500">
                      How many days a week would you like the tutor?
                    </p>
                  </div>
                  <div className="space-y-2">
                    {DAYS_PREFERENCES.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setPreferredDays(day)}
                        className={`w-full p-3 rounded-xl border text-xs font-bold text-left transition ${
                          preferredDays === day
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        📅 {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 7: Preferred Time */}
              {step === 7 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 7</span>
                    <h4 className="text-lg font-bold text-blue-950">Preferred Time Slot</h4>
                    <p className="text-xs text-slate-500">
                      When is student free after school/coaching?
                    </p>
                  </div>
                  <div className="space-y-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setPreferredTime(t)}
                        className={`w-full p-3 rounded-xl border text-xs font-bold text-left transition ${
                          preferredTime === t
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        ⏰ {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 8: Parent & Student Name */}
              {step === 8 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 8</span>
                    <h4 className="text-lg font-bold text-blue-950">Parent & Student Name</h4>
                    <p className="text-xs text-slate-500">
                      So we can address you properly.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Parent’s Full Name *
                      </label>
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar Verma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Student’s Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Aryan"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 9: Mobile Number */}
              {step === 9 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 9</span>
                    <h4 className="text-lg font-bold text-blue-950">Parent Mobile Number</h4>
                    <p className="text-xs text-slate-500">
                      For free demo schedule and tutor profile sharing on WhatsApp.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      10-Digit Mobile Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-700 font-semibold text-sm">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="7268961107"
                        className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium tracking-wider"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      🔒 Your contact is strictly private. Never shared with outside telecallers.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 10: Additional Requirement & Final Review */}
              {step === 10 && (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-orange-600 uppercase">Step 10</span>
                    <h4 className="text-lg font-bold text-blue-950">Additional Requirements</h4>
                    <p className="text-xs text-slate-500">
                      Any specific preferences (e.g., female tutor, exam upcoming)?
                    </p>
                  </div>

                  <textarea
                    rows={3}
                    value={additionalRequirement}
                    onChange={(e) => setAdditionalRequirement(e.target.value)}
                    placeholder="e.g. Need strict teacher for physics numericals, female tutor preferred, budget around ₹3,000/mo..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />

                  {/* Summary preview */}
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1 text-blue-950">
                    <div className="font-bold text-blue-900">Summary:</div>
                    <div>
                      • Class: <span className="font-semibold">{studentClass}</span> ({board})
                    </div>
                    <div>
                      • Subjects: <span className="font-semibold">{selectedSubjects.join(', ')}</span>
                    </div>
                    <div>
                      • Area: <span className="font-semibold">{area}</span>, Orai
                    </div>
                    <div>
                      • Mode: <span className="font-semibold">{tuitionMode}</span> • {preferredDays}
                    </div>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {errorMessage && (
                <div className="mt-3 p-2.5 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Step Controls */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 10 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition"
                  >
                    <span>Find My Tutor</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Post-Submission Screen */
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-blue-950">
                  Thank You, {submittedRequest?.parentName}!
                </h4>
                <p className="text-sm font-semibold text-emerald-800 mt-1">
                  “Your tuition requirement has been received. Our team will contact you shortly.”
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Coordinator reference: <span className="font-mono font-bold text-slate-800">{submittedRequest?.id}</span>
                </p>
              </div>

              {/* Call & WhatsApp CTAs */}
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto pt-2">
                <a
                  href={getCallUrl()}
                  className="py-2.5 px-3 bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={getWhatsAppRequirementUrl({
                    studentClass: submittedRequest?.studentClass,
                    subject: submittedRequest?.subjects.join(', '),
                    board: submittedRequest?.board,
                    area: submittedRequest?.area,
                    parentName: submittedRequest?.parentName,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Recommended Matching Tutors Preview */}
              {matchedTutors.length > 0 && (
                <div className="text-left pt-4 border-t border-slate-200 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-blue-950">
                      Best Match for Your Requirement ({matchedTutors[0].score}% Match)
                    </span>
                    <span className="text-[10px] text-slate-500">Verified in Orai</span>
                  </div>
                  <div className="space-y-2">
                    {matchedTutors.map(({ tutor, score, reasons }) => (
                      <div
                        key={tutor.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={tutor.photoUrl}
                            alt={tutor.name}
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-slate-200"
                          />
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-slate-900 truncate flex items-center gap-1.5">
                              <span>{tutor.name}</span>
                              <VerifiedBadge tutor={tutor} variant="icon" size="sm" />
                              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded font-semibold">
                                {score}% Match
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {tutor.qualification} · {tutor.experienceYears} Yrs Exp
                            </div>
                            <div className="text-[10px] text-blue-700 truncate font-medium">
                              {reasons.join(' · ')}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (onTutorSelect) onTutorSelect(tutor);
                            resetForm();
                          }}
                          className="shrink-0 px-2.5 py-1.5 bg-blue-900 text-white text-[11px] font-bold rounded-lg hover:bg-blue-800"
                        >
                          Book Demo
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Close & Browse More Tutors
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
