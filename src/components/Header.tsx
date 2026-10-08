import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Bell,
  User,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { BUSINESS_CONFIG, ORAI_LOCALITIES } from '../data/masterData';
import { AppNotification, UserRole } from '../types';
import { getCallUrl, getWhatsAppUrl } from '../utils/contact';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
  onOpenFindTutor: () => void;
  onOpenDemo: () => void;
  onOpenBecomeTutor: () => void;
  onOpenProfile: () => void;
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
  selectedArea: string;
  onSelectArea: (area: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  notifications,
  onOpenNotifications,
  onOpenFindTutor,
  onOpenDemo,
  onOpenBecomeTutor,
  onOpenProfile,
  language,
  onToggleLanguage,
  selectedArea,
  onSelectArea,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro-bar: Location & Hotline */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white text-xs px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Area Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAreaDropdownOpen(!areaDropdownOpen)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition text-slate-100 font-medium"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="truncate max-w-[130px] sm:max-w-none">
                  {selectedArea || 'Orai, UP'}
                </span>
                <span className="text-[10px] opacity-75">▼</span>
              </button>

              {areaDropdownOpen && (
                <div
                  className="absolute left-0 mt-1 w-52 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-1 z-50 max-h-60 overflow-y-auto text-xs"
                  onClick={() => setAreaDropdownOpen(false)}
                >
                  <div className="px-3 py-1 font-semibold text-slate-500 border-b border-slate-100">
                    Select Locality in Orai
                  </div>
                  {ORAI_LOCALITIES.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => onSelectArea(loc)}
                      className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 transition ${
                        selectedArea === loc ? 'text-blue-700 font-semibold bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="hidden md:inline text-blue-200">
              {language === 'hi'
                ? 'हर बच्चे के लिए सही टीचर, हर घर तक'
                : '1-to-1 Verified Home Tutors in Orai'}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language toggle */}
            <button
              type="button"
              onClick={onToggleLanguage}
              className="text-[11px] bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition font-medium"
              title="Toggle Hindi/English"
            >
              {language === 'hi' ? 'EN | हिंदी' : 'English | हिं'}
            </button>

            {/* Direct Call Link */}
            <a
              href={getCallUrl()}
              className="flex items-center gap-1.5 hover:text-amber-300 transition font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{BUSINESS_CONFIG.phone}</span>
            </a>

            {/* Quick WhatsApp */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded text-[11px] font-medium transition"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20 shrink-0">
            <GraduationCap className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-blue-950">
                DISCOVERY
              </span>
              <span className="font-bold text-xs sm:text-sm text-orange-600 tracking-wide uppercase">
                Home Tuition
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-tight">
              {BUSINESS_CONFIG.slogan} • Orai
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          <button
            type="button"
            onClick={onOpenFindTutor}
            className="hover:text-blue-700 transition flex items-center gap-1"
          >
            <Search className="w-4 h-4 text-blue-600" />
            <span>Find a Tutor</span>
          </button>
          <button
            type="button"
            onClick={onOpenDemo}
            className="hover:text-blue-700 transition flex items-center gap-1"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Book Free Demo</span>
          </button>
          <button
            type="button"
            onClick={onOpenBecomeTutor}
            className="hover:text-blue-700 transition flex items-center gap-1"
          >
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Become a Tutor</span>
          </button>
          <a
            href="#reviews-section"
            className="hover:text-blue-700 transition"
          >
            Parent Reviews
          </a>
          <a
            href="#why-us"
            className="hover:text-blue-700 transition"
          >
            Why DHT
          </a>
        </nav>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Button */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Role Pill Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => onRoleChange('parent')}
              className={`px-2.5 py-1 rounded-md transition ${
                currentRole === 'parent'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parent
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('tutor')}
              className={`px-2.5 py-1 rounded-md transition ${
                currentRole === 'tutor'
                  ? 'bg-white text-indigo-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tutor
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('admin')}
              className={`px-2.5 py-1 rounded-md transition ${
                currentRole === 'admin'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin
            </button>
          </div>

          {/* User Profile / Dashboard trigger */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            <User className="w-4 h-4 text-blue-700" />
            <span className="hidden sm:inline capitalize">{currentRole} Portal</span>
          </button>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onOpenFindTutor}
            className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm transition"
          >
            <span>Find a Tutor</span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Switch Role
            </span>
            <div className="flex gap-1 text-xs">
              {(['parent', 'tutor', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    onRoleChange(r);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-medium capitalize ${
                    currentRole === r
                      ? 'bg-blue-800 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm font-medium">
            <button
              type="button"
              onClick={() => {
                onOpenFindTutor();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-blue-50 text-blue-900 flex items-center justify-between"
            >
              <span>🔍 Find a Home Tutor</span>
              <span className="text-xs text-orange-600 font-bold">10-Step Form</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-50 text-slate-800 flex items-center justify-between"
            >
              <span>✨ Book Free Demo Class</span>
              <span className="text-xs text-emerald-600 font-bold">Free Trial</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenBecomeTutor();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-800 flex items-center justify-between"
            >
              <span>👨‍🏫 Become a Tutor in Orai</span>
              <span className="text-xs text-blue-600 font-bold">Register</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-800"
            >
              👤 My Profile & Requests
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
            <a
              href={getCallUrl()}
              className="py-2.5 bg-blue-900 text-white rounded-lg font-bold flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 7268961107</span>
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 bg-emerald-600 text-white rounded-lg font-bold flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
