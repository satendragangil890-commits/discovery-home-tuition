import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Search,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Clock,
  MapPin,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/masterData';
import { getCallUrl, getWhatsAppUrl } from '../utils/contact';

interface HeroProps {
  onOpenFindTutor: () => void;
  onOpenDemo: () => void;
  language: 'en' | 'hi';
}

export const Hero: React.FC<HeroProps> = ({ onOpenFindTutor, onOpenDemo, language }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-slate-200">
      {/* Subtle background mesh glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-blue-200/40 via-amber-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Core Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>
                {language === 'hi'
                  ? 'ओरई का सबसे भरोसेमंद होम ट्यूशन नेटवर्क'
                  : 'Orai’s Trusted Home Tuition Network'}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-orange-700 font-bold">1-to-1 at Home</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-950 leading-[1.15]">
              Find the Right <span className="text-blue-700">Home Tutor</span> for Your Child
            </h1>

            {/* Sub-headline & Tagline */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-medium text-slate-700">
                Verified & Experienced Tutors for <span className="font-bold text-slate-900">Nursery to Class 12</span>
              </p>
              <p className="text-sm sm:text-base font-semibold text-orange-600 italic">
                “{BUSINESS_CONFIG.tagline}”
              </p>
              <p className="text-xs sm:text-sm text-slate-500">
                CBSE • ICSE • UP Board • All Subjects • Dedicated Teacher at Your Doorstep in Orai
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenFindTutor}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white rounded-xl font-bold text-base shadow-lg shadow-orange-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Find a Tutor</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                className="w-full sm:w-auto px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold text-base shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Book Free Demo</span>
              </button>
            </div>

            {/* Direct hotline reminder */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-600 pt-1">
              <a
                href={getCallUrl()}
                className="inline-flex items-center gap-1.5 text-blue-900 hover:text-blue-700 hover:underline"
              >
                <PhoneCall className="w-4 h-4 text-orange-600" />
                <span>Call Helpline: {BUSINESS_CONFIG.phone}</span>
              </a>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>No Advance Fees for Demo</span>
              </span>
            </div>

            {/* 4 Pillars Grid (Mandatory Display Requirements) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-4 border-t border-slate-200/80">
              <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs text-left">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-1.5 font-bold">
                  1:1
                </div>
                <div className="font-bold text-xs text-slate-900 leading-tight">1-to-1 Personalized</div>
                <div className="text-[11px] text-slate-500">Home Tuition</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs text-left">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900 leading-tight">Verified Tutors</div>
                <div className="text-[11px] text-slate-500">ID & Bio Checked</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs text-left">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-1.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900 leading-tight">Free Demo Class</div>
                <div className="text-[11px] text-slate-500">Judge First, Then Decide</div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs text-left">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-1.5">
                  <Award className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900 leading-tight">Subject Experts</div>
                <div className="text-[11px] text-slate-500">Experienced Faculty</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Trust Card / EdTech Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                      Live Matching in Orai
                    </span>
                  </div>
                  <span className="text-[11px] bg-white/15 px-2 py-0.5 rounded font-medium">
                    📍 Jalaun District
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  How Discovery Home Tuition Works
                </h3>
              </div>

              {/* 3 Step Visual Funnel */}
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Share Child’s Class & Subject
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tell us student's class, board, locality in Orai and suitable study timings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      We Match the Best Nearby Tutor
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Our coordinator recommends background-verified teachers matching your syllabus.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Take 100% Free Demo Class
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Teacher visits your home for a demo. Confirm monthly tuition only when fully satisfied.
                    </p>
                  </div>
                </div>

                {/* Guarantee Banner */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold">
                    🛡️
                  </div>
                  <div className="text-xs text-amber-950">
                    <span className="font-bold">Replacement Tutor Guarantee:</span> If you are not happy after any session, we arrange an alternate teacher immediately without extra charges.
                  </div>
                </div>

                {/* Quick Call Out */}
                <div className="pt-2 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Need urgent tutor today?</span>
                  <a
                    href={getWhatsAppUrl('Hello Discovery Home Tuition, I need an urgent home tutor today in Orai.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                  >
                    <span>Instant WhatsApp Chat</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Bottom stats banner */}
              <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex items-center justify-around text-center text-xs">
                <div>
                  <div className="font-extrabold text-blue-950 text-sm">350+</div>
                  <div className="text-slate-500 text-[10px]">Active Tutors</div>
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <div>
                  <div className="font-extrabold text-blue-950 text-sm">1,200+</div>
                  <div className="text-slate-500 text-[10px]">Orai Families</div>
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <div>
                  <div className="font-extrabold text-blue-950 text-sm">4.9 / 5</div>
                  <div className="text-slate-500 text-[10px]">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
