import React from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  PhoneCall,
  Clock,
  HeartHandshake,
  CheckCircle,
  HelpCircle,
  MapPin,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/masterData';
import { getCallUrl, getWhatsAppUrl } from '../utils/contact';

interface WhyChooseUsProps {
  onOpenDemo: () => void;
  onOpenFindTutor: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  onOpenDemo,
  onOpenFindTutor,
}) => {
  return (
    <section id="why-us" className="py-14 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* About Discovery Home Tuition Card */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Discovery Home Tuition</span>
                <span className="text-white/40">·</span>
                <span className="text-white font-bold">{BUSINESS_CONFIG.slogan}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Har Bacche Ke Liye Sahi Teacher, Har Ghar Tak.
              </h2>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-3xl">
                “Discovery Home Tuition is a trusted connection point between parents and tutors. We help parents find verified and experienced home tutors according to their child's class, subject, board, location and learning requirements.”
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
                  <div className="font-bold text-amber-300">1-to-1 Focus</div>
                  <div className="text-[11px] text-blue-200">Personalized Pace</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
                  <div className="font-bold text-amber-300">Background Checked</div>
                  <div className="text-[11px] text-blue-200">Verified Credentials</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
                  <div className="font-bold text-amber-300">Free Trial Demo</div>
                  <div className="text-[11px] text-blue-200">No Advance Booking</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs">
                  <div className="font-bold text-amber-300">Free Replacement</div>
                  <div className="text-[11px] text-blue-200">Guaranteed Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 text-center sm:text-left">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Direct Contact Orai Office
              </div>
              <div className="text-xl font-black text-white">
                📞 {BUSINESS_CONFIG.phone}
              </div>
              <p className="text-xs text-blue-200">
                Operating in all localities of Orai, Uttar Pradesh (Rajendra Nagar, Rath Road, Konch Road, Station Road & more).
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  Book 1-on-1 Free Demo
                </button>
                <a
                  href={getCallUrl()}
                  className="w-full py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition text-center"
                >
                  Call Coordinator Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
              Trust & Quality Assurance
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-blue-950 mt-2">
              Why Parents in Orai Choose Discovery Home Tuition
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Multi-Step Verification
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                We physically verify tutor educational degrees, identity proofs, and teaching track record before sending them to your home.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Free Demo at Your Home
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Observe the tutor's teaching pace, explanation clarity, and rapport with your child before finalizing monthly tuition fees.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Replacement Guarantee
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                If the child isn't comfortable at any point, DHT provides an immediate alternate tutor without any cancellation charges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">
                Regular Test Tracking
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Tutors conduct weekly tests, assist with school holiday homework, and keep parents updated on syllabus completion.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h3 className="font-bold text-lg text-blue-950 mb-4 text-center">
            Frequently Asked Questions by Orai Parents
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                <span>Is the demo class really free?</span>
              </div>
              <p className="text-slate-600">
                Yes, 100% free with zero registration charges. The teacher will visit your home for a 45-60 minute session. You pay monthly fees only after you are satisfied.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                <span>How fast will a tutor be arranged in Orai?</span>
              </div>
              <p className="text-slate-600">
                Usually within 12 to 24 hours of receiving your requirement. For urgent board exams, we can arrange same-day demos in central Orai localities.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                <span>Can we get female teachers for young children?</span>
              </div>
              <p className="text-slate-600">
                Absolutely! We have experienced female tutors for Pre-Primary to Class 8 who excel in patient teaching, handwriting, and phonics.
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                <span>Do you support UP Board Hindi medium?</span>
              </div>
              <p className="text-slate-600">
                Yes, our tutors are comfortable with CBSE, ICSE, and UP Board (both Hindi and English mediums) with special focus on state board exam patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
