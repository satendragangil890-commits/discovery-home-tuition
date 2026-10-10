import React, { useState } from 'react';
import {
  GraduationCap,
  CheckCircle,
  ShieldCheck,
  Upload,
  Sparkles,
  Phone,
  MessageCircle,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  BookOpen,
} from 'lucide-react';
import {
  CLASSES_LIST,
  BOARDS_LIST,
  CORE_SUBJECTS,
  ORAI_LOCALITIES,
  DAYS_PREFERENCES,
  TIME_SLOTS,
  QUALIFICATIONS_LIST,
  BUSINESS_CONFIG,
} from '../data/masterData';
import { Tutor } from '../types';
import { StorageService } from '../services/storage';
import { getWhatsAppUrl } from '../utils/contact';

interface BecomeTutorSectionProps {
  onTutorRegistered?: (tutor: Tutor) => void;
}

export const BecomeTutorSection: React.FC<BecomeTutorSectionProps> = ({
  onTutorRegistered,
}) => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [qualification, setQualification] = useState(QUALIFICATIONS_LIST[0]);
  const [customQualification, setCustomQualification] = useState('');
  const [experienceYears, setExperienceYears] = useState(3);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics', 'Science']);
  const [selectedClasses, setSelectedClasses] = useState<string[]>(['Class 9', 'Class 10']);
  const [selectedBoards, setSelectedBoards] = useState<string[]>(['CBSE', 'UP Board']);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(['Rajendra Nagar', 'Rath Road']);
  const [tuitionModes, setTuitionModes] = useState<('Home Tuition' | 'Online Tuition')[]>([
    'Home Tuition',
  ]);
  const [availableDays, setAvailableDays] = useState<string[]>([DAYS_PREFERENCES[0]]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([TIME_SLOTS[2]]);
  const [expectedMonthlyFee, setExpectedMonthlyFee] = useState(3000);
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredTutor, setRegisteredTutor] = useState<Tutor | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleArrayItem = <T extends string>(item: T, list: T[], setter: (v: T[]) => void) => {
    if (list.includes(item)) {
      if (list.length > 1) setter(list.filter((x) => x !== item));
    } else {
      setter([...list, item]);
    }
  };

  const validateMobile = (num: string): boolean => {
    const cleaned = num.replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]/.test(cleaned);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!validateMobile(mobile)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (selectedSubjects.length === 0) {
      setErrorMessage('Please select at least one teaching subject.');
      return;
    }
    if (selectedClasses.length === 0) {
      setErrorMessage('Please select at least one class grade.');
      return;
    }

    const finalPhoto =
      photoUrl.trim() ||
      (gender === 'Female'
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80');

    const finalQual = customQualification.trim() || qualification;

    const newTutor = StorageService.saveTutor({
      name: fullName.trim(),
      mobile: mobile.trim(),
      whatsappNumber: (whatsappNumber.trim() || mobile.trim()),
      email: email.trim() || `${mobile.trim()}@dht-tutor.com`,
      gender,
      qualification: finalQual,
      experienceYears: Number(experienceYears),
      subjects: selectedSubjects,
      classes: selectedClasses,
      boards: selectedBoards,
      teachingAreas: selectedAreas,
      tuitionModes,
      availableDays,
      availableTimeSlots,
      weeklySchedule: [
        { day: 'Monday', isAvailable: true, slots: availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: availableTimeSlots[0] || '4:00 PM - 6:00 PM' },
        { day: 'Tuesday', isAvailable: true, slots: availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: availableTimeSlots[0] || '4:00 PM - 6:00 PM' },
        { day: 'Wednesday', isAvailable: true, slots: availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: availableTimeSlots[0] || '4:00 PM - 6:00 PM' },
        { day: 'Thursday', isAvailable: true, slots: availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: availableTimeSlots[0] || '4:00 PM - 6:00 PM' },
        { day: 'Friday', isAvailable: true, slots: availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: availableTimeSlots[0] || '4:00 PM - 6:00 PM' },
        { day: 'Saturday', isAvailable: true, slots: availableTimeSlots, demoSlotAvailable: true, preferredDemoTime: availableTimeSlots[0] || '3:00 PM - 5:00 PM', note: 'Weekend demo slot' },
        { day: 'Sunday', isAvailable: false, slots: [], demoSlotAvailable: false, note: 'Off' },
      ],
      expectedMonthlyFee: Number(expectedMonthlyFee),
      bio:
        bio.trim() ||
        `Experienced ${finalQual} tutor in Orai specializing in ${selectedSubjects.join(
          ', '
        )} for ${selectedClasses.join(', ')}.`,
      photoUrl: finalPhoto,
      isVerified: false,
      status: 'New', // Starts as New until Admin verification
    });

    setRegisteredTutor(newTutor);
    setIsSubmitted(true);
    if (onTutorRegistered) onTutorRegistered(newTutor);
  };

  return (
    <section id="become-tutor-section" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Why Join DHT as Tutor in Orai */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60">
                Join Orai’s #1 Tuition Network
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-2.5">
                Become a Verified Home Tutor with Discovery
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Are you a passionate teacher, college graduate, or subject expert in Orai? Teach students near your home and earn respectable monthly income with complete payment safety.
              </p>
            </div>

            {/* Benefits cards */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Tuitions in Your Own Locality
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    No long travelling. Get verified students in Rajendra Nagar, Rath Road, Konch Road, and nearby Orai colonies.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                  💰
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Guaranteed Timely Monthly Fee
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Discovery Home Tuition coordinates fees directly, ensuring zero payment delays from parents.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                  🛡️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Verified Parents & Respectful Families
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    We verify parent requirements and house locations before assigning demo classes for teacher safety.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold shrink-0">
                  ⏰
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Flexible Timing & Independence
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Choose your own morning or evening hours and number of teaching days per week.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct helpline for tutors */}
            <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-xs text-blue-200 font-semibold">Tutor Support Helpline</div>
                <div className="font-extrabold text-sm sm:text-base mt-0.5">
                  Call / WhatsApp: {BUSINESS_CONFIG.phone}
                </div>
              </div>
              <a
                href={getWhatsAppUrl('Hello DHT team, I want to join Discovery Home Tuition as a tutor in Orai.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs">
              {!isSubmitted ? (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="font-bold text-base sm:text-lg text-blue-950">
                      Tutor Registration Form
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Fill your details accurately. Our team will verify and activate your profile.
                    </p>
                  </div>

                  {/* Personal details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Er. Pradeep Saxena"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit number"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="Same as mobile"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Qualification & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Highest Qualification *
                      </label>
                      <select
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      >
                        {QUALIFICATIONS_LIST.map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Teaching Experience (Years) *
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="35"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Subjects Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subjects You Can Teach * (Tap to toggle)
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1.5 bg-white rounded-lg border border-slate-200">
                      {CORE_SUBJECTS.map((sub) => {
                        const isSelected = selectedSubjects.includes(sub);
                        return (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => toggleSubjectItem(sub, selectedSubjects, setSelectedSubjects)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition ${
                              isSelected
                                ? 'bg-blue-900 text-white border-blue-900'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {sub}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Classes & Boards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Classes (Grades) *
                      </label>
                      <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1.5 bg-white rounded-lg border border-slate-200">
                        {CLASSES_LIST.map((cls) => {
                          const isSelected = selectedClasses.includes(cls);
                          return (
                            <button
                              key={cls}
                              type="button"
                              onClick={() => toggleSubjectItem(cls, selectedClasses, setSelectedClasses)}
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition ${
                                isSelected
                                  ? 'bg-orange-600 text-white border-orange-600'
                                  : 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              {cls}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Boards Handled *
                      </label>
                      <div className="flex flex-wrap gap-1.5 p-1.5 bg-white rounded-lg border border-slate-200">
                        {BOARDS_LIST.map((b) => {
                          const isSelected = selectedBoards.includes(b);
                          return (
                            <button
                              key={b}
                              type="button"
                              onClick={() => toggleSubjectItem(b, selectedBoards, setSelectedBoards)}
                              className={`px-3 py-1 rounded text-xs font-bold border transition ${
                                isSelected
                                  ? 'bg-blue-900 text-white border-blue-900'
                                  : 'bg-slate-50 text-slate-700 border-slate-200'
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Teaching Areas in Orai */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Teaching Areas in Orai (Where you can visit)
                    </label>
                    <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto p-2 bg-white rounded-lg border border-slate-200">
                      {ORAI_LOCALITIES.map((loc) => {
                        const isSelected = selectedAreas.includes(loc);
                        return (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => toggleSubjectItem(loc, selectedAreas, setSelectedAreas)}
                            className={`px-2 py-0.5 rounded text-[11px] font-medium border transition ${
                              isSelected
                                ? 'bg-emerald-700 text-white border-emerald-700'
                                : 'bg-slate-50 text-slate-700 border-slate-200'
                            }`}
                          >
                            {loc}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expected Monthly Fee & Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Expected Monthly Fee per Student (₹)
                      </label>
                      <input
                        type="number"
                        step="100"
                        value={expectedMonthlyFee}
                        onChange={(e) => setExpectedMonthlyFee(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tuition Mode
                      </label>
                      <div className="flex gap-2">
                        {(['Home Tuition', 'Online Tuition'] as const).map((m) => (
                          <label
                            key={m}
                            className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer bg-white px-2.5 py-1.5 rounded-lg border border-slate-200"
                          >
                            <input
                              type="checkbox"
                              checked={tuitionModes.includes(m)}
                              onChange={() => toggleSubjectItem(m, tuitionModes, setTuitionModes)}
                            />
                            <span>{m}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Simulated Document Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Resume / Marksheet / ID Proof (Optional for Fast Verification)
                    </label>
                    <div className="border border-dashed border-slate-300 rounded-xl p-3 text-center bg-white">
                      {resumeUploaded ? (
                        <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold px-2">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" />
                            <span>{resumeFileName || 'Resume_Document_Attached.pdf'}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setResumeUploaded(false);
                              setResumeFileName('');
                            }}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block text-xs text-slate-500 hover:text-blue-700">
                          <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                          <span className="font-semibold text-blue-900">Click to attach document</span> or drag & drop (PDF, JPG)
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setResumeUploaded(true);
                                setResumeFileName(file.name);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Short Bio / Teaching Highlights
                    </label>
                    <textarea
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="e.g. 5 years experience in coaching UP Board toppers in Mathematics. Patient with weak students."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-950 hover:to-indigo-950 text-white rounded-xl font-bold text-sm shadow-md transition transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4 text-amber-300" />
                    <span>Register as Tutor</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    🔒 All registrations undergo admin verification before listing. Your mobile number remains secure.
                  </p>
                </form>
              ) : (
                /* Post-registration screen */
                <div className="text-center space-y-4 py-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-blue-950">
                      Registration Received, {registeredTutor?.name}!
                    </h3>
                    <p className="text-sm font-semibold text-emerald-800 mt-1">
                      “Thank you for registering with Discovery Home Tuition. Our team will verify your profile and contact you.”
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Tutor ID: <span className="font-mono font-bold">{registeredTutor?.id}</span> • Status: <span className="font-bold text-amber-600">Under Verification</span>
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-left text-xs space-y-1">
                    <div>
                      <span className="text-slate-500">Subjects Registered:</span>{' '}
                      <span className="font-bold text-slate-900">
                        {registeredTutor?.subjects.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Areas Covered:</span>{' '}
                      <span className="font-bold text-slate-900">
                        {registeredTutor?.teachingAreas.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Expected Fee:</span>{' '}
                      <span className="font-bold text-slate-900">
                        ₹{registeredTutor?.expectedMonthlyFee} / month
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={getWhatsAppUrl(`Hello DHT admin, I just registered as tutor (${registeredTutor?.name}, ${registeredTutor?.qualification}). Please verify my profile.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Notify Admin on WhatsApp</span>
                    </a>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800"
                    >
                      Register Another Tutor or Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// helper to toggle multi-select
function toggleSubjectItem<T extends string>(item: T, list: T[], setter: (v: T[]) => void) {
  if (list.includes(item)) {
    if (list.length > 1) setter(list.filter((x) => x !== item));
  } else {
    setter([...list, item]);
  }
}
