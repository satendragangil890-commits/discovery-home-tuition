import React, { useState } from 'react';
import {
  Mail,
  Sparkles,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Bell,
  MapPin,
  Send,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Eye,
  X,
  FileText,
} from 'lucide-react';
import { ORAI_LOCALITIES } from '../data/masterData';
import { StorageService } from '../services/storage';
import { getWhatsAppUrl } from '../utils/contact';

const TOPIC_OPTIONS = [
  { id: 'Child Education Tips', label: '💡 Child Education & Study Habits' },
  { id: 'New Tutors in Orai', label: '🎓 New Tutors in My Area' },
  { id: 'Board Exam Guidance', label: '📝 Board Exam Strategies (CBSE/UP/ICSE)' },
];

const SAMPLE_EDUCATION_TIPS = [
  {
    title: 'The 25-Minute Study Rhythm (Pomodoro for School Students)',
    category: 'Study Habits',
    summary:
      'Encouraging your child to study in focused 25-minute sprints followed by a 5-minute movement break prevents mental fatigue and doubles retention for formula-heavy subjects like Science & Mathematics.',
  },
  {
    title: 'Eliminating Mathematics Fear in Class 6–10',
    category: 'Subject Strategy',
    summary:
      'Math anxiety usually starts when foundational steps are skipped in school. A dedicated 1-on-1 home tutor in Orai identifies the exact conceptual gap from earlier grades before advancing.',
  },
  {
    title: 'Board Exam Schedule: 90 Days Before Pre-Boards',
    category: 'Exam Guidance',
    summary:
      'Why past 5 years’ chapter-wise question banks and weekly timed answer-writing practice yield a 15–20% higher score than passive re-reading of textbooks.',
  },
];

interface NewsletterSignupProps {
  onSelectArea?: (area: string) => void;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ onSelectArea }) => {
  const [email, setEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [phoneOrWhatsapp, setPhoneOrWhatsapp] = useState('');
  const [locality, setLocality] = useState('Indra Nagar');
  const [studentClass, setStudentClass] = useState('Class 9 - 10 (Secondary)');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Child Education Tips',
    'New Tutors in Orai',
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showTipPreview, setShowTipPreview] = useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = StorageService.addNewsletterSubscription({
        email: email.trim(),
        parentName: parentName.trim(),
        phoneOrWhatsapp: phoneOrWhatsapp.trim(),
        locality,
        studentClass,
        topics: selectedTopics.length > 0 ? selectedTopics : ['Child Education Tips'],
      });

      setIsSubmitting(false);
      setIsSubscribed(true);
      setFeedbackMessage(res.message);
    }, 450);
  };

  return (
    <div className="relative mb-12 overflow-hidden rounded-2xl border border-blue-900/40 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/40 p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
      {/* Ambient background decoration */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Main Content Box */}
      {!isSubscribed ? (
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Orai Parents Club • Free Educational Digest</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Parent Newsletter: Child Education Tips & Tutor Alerts in Orai
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Join <span className="text-amber-400 font-semibold">450+ parents</span> in Orai.
                Receive weekly parenting study techniques, board exam strategies, and instant notifications
                whenever newly verified home tutors join your locality.
              </p>
            </div>

            {/* Quick Preview Badge Button */}
            <div className="shrink-0 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowTipPreview(!showTipPreview)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-medium text-slate-200 border border-slate-700 transition"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>{showTipPreview ? 'Hide Tips Preview' : 'Read Sample Tips'}</span>
              </button>
            </div>
          </div>

          {/* Tips Preview Drawer if toggled */}
          {showTipPreview && (
            <div className="my-6 p-4 sm:p-5 rounded-xl bg-slate-950/70 border border-blue-900/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Recent Education Tips Shared with Orai Parents
                </span>
                <button
                  type="button"
                  onClick={() => setShowTipPreview(false)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {SAMPLE_EDUCATION_TIPS.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5"
                  >
                    <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded">
                      {tip.category}
                    </span>
                    <h5 className="text-xs font-bold text-white line-clamp-2">{tip.title}</h5>
                    <p className="text-[11px] text-slate-400 leading-normal">{tip.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Topic Preferences */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                What updates would you like to receive?
              </label>
              <div className="flex flex-wrap gap-2">
                {TOPIC_OPTIONS.map((t) => {
                  const isChecked = selectedTopics.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTopic(t.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                          : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span>{t.label}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Parent Name */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Parent Name (Optional)
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Student Class */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Student's Class / Level
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Primary (Nursery - Class 5)">Primary (Nursery - Class 5)</option>
                  <option value="Middle School (Class 6 - 8)">Middle School (Class 6 - 8)</option>
                  <option value="Class 9 - 10 (Secondary)">Class 9 - 10 (Secondary CBSE/UP)</option>
                  <option value="Class 11 - 12 (Senior Secondary)">Class 11 - 12 (Senior CBSE/UP)</option>
                  <option value="All Levels">All Levels / General Parenting</option>
                </select>
              </div>

              {/* Locality in Orai */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Your Locality in Orai
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 absolute left-3 top-2.5" />
                  <select
                    value={locality}
                    onChange={(e) => {
                      setLocality(e.target.value);
                      if (onSelectArea && e.target.value !== 'All Areas in Orai') {
                        onSelectArea(e.target.value);
                      }
                    }}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    {ORAI_LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Optional WhatsApp alert & Submit Button Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={phoneOrWhatsapp}
                    onChange={(e) => setPhoneOrWhatsapp(e.target.value)}
                    placeholder="WhatsApp No. for instant alert (Optional)"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Subscribe to Parent Tips</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>
                100% Free • No spam • Verified tutors only • Unsubscribe anytime with 1 click.
              </span>
            </p>
          </form>
        </div>
      ) : (
        /* Subscribed State */
        <div className="relative z-10 text-center py-6 px-4 space-y-4">
          <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl font-bold text-white">Welcome to the Orai Parents Club!</h4>
            <p className="text-xs text-emerald-400 font-semibold">{feedbackMessage}</p>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              We have linked <span className="text-white font-medium">{email}</span> for updates on{' '}
              <span className="text-amber-400 font-semibold">{locality}</span>. Look out for our weekly educational tips and tutor alerts in your inbox!
            </p>
          </div>

          {/* Instant Welcome Tip Card */}
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <BookOpen className="w-4 h-4" />
              <span>Instant Welcome Tip for Parents in Orai</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              “How to Help Your Child Overcome Homework Procrastination”
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Start homework at the same hour every day before dinner. Pair the hardest subject
              (e.g., Mathematics or Physics) with the first 30 minutes when energy levels are peak.
              A weekly verified home tutor further reinforces this disciplined habit.
            </p>
          </div>

          {/* Action links */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={getWhatsAppUrl(
                `Hello Discovery Home Tuition Orai, I am a parent from ${locality}. I just subscribed to the newsletter (${email}) and would like to receive education tips on WhatsApp too.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Receive Tips on WhatsApp Also</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsSubscribed(false);
                setEmail('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              Add Another Email / Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
