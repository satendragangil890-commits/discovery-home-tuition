import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Sparkles,
  X,
  ChevronDown,
  BookOpen,
  MapPin,
  GraduationCap,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { BUSINESS_CONFIG, CORE_SUBJECTS, ORAI_LOCALITIES, CLASSES_LIST } from '../data/masterData';
import { getCallUrl, getWhatsAppUrl, getWhatsAppSubjectInquiryUrl } from '../utils/contact';

interface FloatingContactBarProps {
  onOpenDemo: () => void;
  currentArea?: string;
}

const POPULAR_SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'Physics',
  'Chemistry',
  'Biology',
  'All Subjects',
  'Computer / Coding',
  'Accounts & Commerce',
  'Hindi',
];

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({
  onOpenDemo,
  currentArea = 'All Areas in Orai',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [customSubject, setCustomSubject] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('Class 10');
  const [selectedArea, setSelectedArea] = useState<string>(
    currentArea.includes('All') ? 'Indra Nagar' : currentArea
  );
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Compute active subject
  const activeSubject = customSubject.trim() || selectedSubject;

  // Direct WhatsApp API URL with auto-populated message
  const whatsappUrl = getWhatsAppSubjectInquiryUrl({
    subject: activeSubject,
    studentClass: selectedClass,
    area: selectedArea,
  });

  // Handler for fast 1-tap subject inquiry
  const handleFastSubjectClick = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setCustomSubject('');
    const directUrl = getWhatsAppSubjectInquiryUrl({
      subject: subjectName,
      studentClass: selectedClass,
      area: selectedArea,
    });
    window.open(directUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Subject Inquiry Popover Card */}
      {isOpen && (
        <div className="fixed bottom-28 sm:bottom-20 right-3 sm:right-6 z-40 w-[calc(100vw-24px)] sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    WhatsApp Subject Inquiry
                    <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black uppercase px-1.5 py-0.5 rounded">
                      Live API
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-100">
                    Auto-populates inquiry for Orai coordinators
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
                aria-label="Close Subject Inquiry"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 space-y-3.5 max-h-[70vh] overflow-y-auto text-slate-800">
            {/* Quick Select Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                Choose Subject for Home Tuition:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SUBJECTS.map((sub) => {
                  const isSelected = activeSubject === sub;
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => {
                        setSelectedSubject(sub);
                        setCustomSubject('');
                      }}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>

              {/* Or type custom subject */}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Or type other subject (e.g. Sanskrit, Vedic Maths)..."
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Quick Refinements (Class & Locality) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <GraduationCap className="w-3 h-3 text-emerald-600" />
                  Target Class:
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 font-medium"
                >
                  <option value="Any Class">Any Class</option>
                  <option value="Class 1 to 5">Class 1 to 5</option>
                  <option value="Class 6 to 8">Class 6 to 8</option>
                  {CLASSES_LIST.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  Locality in Orai:
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full text-xs px-2 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 font-medium"
                >
                  {ORAI_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Auto-populated Message Preview */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5 text-xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Auto-populated WhatsApp Message:
                </span>
                <span className="text-[10px] text-emerald-700 font-normal">wa.me/917268961107</span>
              </div>
              <p className="text-slate-700 text-[11px] italic leading-relaxed whitespace-pre-line bg-white/80 p-2 rounded border border-emerald-100 font-mono">
                {`Hello Discovery Home Tuition Orai,
I am inquiring about a qualified home tutor for *${activeSubject}* in Orai.
• Class: ${selectedClass}
• Locality: ${selectedArea}, Orai
Please share verified tutor profiles available for ${activeSubject} and schedule a Free Demo Class.`}
              </p>
            </div>

            {/* Direct WhatsApp API Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-emerald-600/30 transition active:scale-95 text-xs tracking-wide"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>Send WhatsApp Inquiry for {activeSubject}</span>
              <Send className="w-3.5 h-3.5 ml-1" />
            </a>

            {/* Secondary actions */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenDemo();
                }}
                className="text-emerald-700 hover:underline font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-500" /> Book Free Demo on Website
              </button>
              <a
                href={getCallUrl()}
                className="text-blue-700 hover:underline font-semibold flex items-center gap-1"
              >
                <Phone className="w-3 h-3" /> Call 7268961107
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-30 flex flex-col items-end gap-2">
        {/* Quick Subject Chip Tray (Direct WhatsApp links for top subjects) */}
        <div className="hidden md:flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full shadow-md border border-slate-200 text-[11px]">
          <span className="text-slate-500 font-semibold px-1 flex items-center gap-1">
            <MessageCircle className="w-3 h-3 text-emerald-600" /> Inquire:
          </span>
          {['Maths', 'Science', 'English', 'Physics'].map((sub) => (
            <button
              key={sub}
              type="button"
              onClick={() => handleFastSubjectClick(sub)}
              className="bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white px-2 py-0.5 rounded-full transition font-medium border border-emerald-200/60"
              title={`Direct WhatsApp inquiry for ${sub}`}
            >
              {sub}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold transition"
            title="Choose any subject for WhatsApp inquiry"
          >
            +More
          </button>
        </div>

        {/* Main WhatsApp Subject Inquiry Launcher Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-emerald-600/30 transition transform hover:-translate-y-0.5 active:scale-95"
          title="Direct WhatsApp API Link: Inquire by Subject (7268961107)"
          aria-expanded={isOpen}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold tracking-wide leading-tight flex items-center gap-1">
              WhatsApp Us
              <span className="bg-emerald-800 text-[9px] font-semibold px-1.5 py-0.2 rounded-full text-emerald-100">
                Subject Inquiry
              </span>
            </span>
            <span className="text-[10px] text-emerald-100 font-normal leading-none hidden sm:inline">
              Ask for Maths, Science, English & more
            </span>
          </div>
          <ChevronDown
            className={`w-3.5 h-3.5 text-white/80 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Direct Call Button (Quick Dial) */}
        <a
          href={getCallUrl()}
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white pl-3.5 pr-4 py-2 rounded-full shadow-md transition transform hover:-translate-y-0.5 active:scale-95"
          title="Direct Call: 7268961107"
        >
          <Phone className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-xs font-bold tracking-wide">Call 7268961107</span>
        </a>
      </div>
    </>
  );
};
