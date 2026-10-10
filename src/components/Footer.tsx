import React from 'react';
import {
  GraduationCap,
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { BUSINESS_CONFIG, ORAI_LOCALITIES } from '../data/masterData';
import { getCallUrl, getWhatsAppUrl } from '../utils/contact';
import { UserRole } from '../types';
import { NewsletterSignup } from './NewsletterSignup';

interface FooterProps {
  onOpenFindTutor: () => void;
  onOpenDemo: () => void;
  onOpenBecomeTutor: () => void;
  onOpenAdmin: () => void;
  onSelectArea: (area: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenFindTutor,
  onOpenDemo,
  onOpenBecomeTutor,
  onOpenAdmin,
  onSelectArea,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-24 sm:pb-14 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Parent Education Tips & Tutor Updates Newsletter Signup */}
        <div id="newsletter-signup">
          <NewsletterSignup onSelectArea={onSelectArea} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white font-bold shadow-md">
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white">
                  DISCOVERY HOME TUITION
                </span>
                <p className="text-xs text-orange-400 font-semibold">
                  {BUSINESS_CONFIG.slogan}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              “{BUSINESS_CONFIG.tagline}”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Connecting parents and students in Orai with verified, experienced home tutors for Nursery to Class 12 across CBSE, ICSE, and UP Board curricula.
            </p>

            {/* Direct Contact Pills */}
            <div className="space-y-2 pt-1 text-xs">
              <a
                href={getCallUrl()}
                className="flex items-center gap-2 text-white hover:text-amber-400 transition font-semibold"
              >
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Call: +91 {BUSINESS_CONFIG.phone}</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition font-semibold"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp: +91 {BUSINESS_CONFIG.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{BUSINESS_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              For Parents
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenFindTutor}
                  className="hover:text-white transition"
                >
                  Find a Home Tutor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDemo}
                  className="hover:text-white transition"
                >
                  Book Free Demo Class
                </button>
              </li>
              <li>
                <a href="#reviews-section" className="hover:text-white transition">
                  Verified Parent Reviews
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition">
                  Replacement Guarantee
                </a>
              </li>
              <li>
                <a
                  href="#newsletter-signup"
                  className="hover:text-amber-400 text-amber-400/90 transition flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Parent Newsletter & Tips</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded">
                    New
                  </span>
                </a>
              </li>
              <li>
                <a href={getCallUrl()} className="hover:text-white transition">
                  Helpdesk Support
                </a>
              </li>
            </ul>
          </div>

          {/* For Tutors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              For Educators
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenBecomeTutor}
                  className="hover:text-white transition"
                >
                  Become a Tutor in Orai
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBecomeTutor}
                  className="hover:text-white transition"
                >
                  Tutor Registration Form
                </button>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl('Hello DHT team, I am an educator in Orai looking for students.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Educator WhatsApp Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Areas in Orai */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Localities in Orai
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {ORAI_LOCALITIES.filter((l) => l !== 'All Areas in Orai').slice(0, 20).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => onSelectArea(loc)}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded transition"
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved. Orai, Uttar Pradesh.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verified Home Tutors</span>
            </span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-white transition"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
