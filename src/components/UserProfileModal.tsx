import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  ShieldCheck,
  Calendar,
  BookOpen,
  CheckCircle,
  Clock,
  Sparkles,
  LogOut,
  KeyRound,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';
import { TuitionRequest, DemoRequest, Tutor, AppNotification, UserRole } from '../types';
import { StorageService } from '../services/storage';
import { getWhatsAppUrl, getCallUrl } from '../utils/contact';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  tuitionRequests: TuitionRequest[];
  demoRequests: DemoRequest[];
  tutors: Tutor[];
  notifications: AppNotification[];
  onOpenFindTutor: () => void;
  onOpenDemo: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onRoleChange,
  tuitionRequests,
  demoRequests,
  tutors,
  notifications,
  onOpenFindTutor,
  onOpenDemo,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(StorageService.getUserPhone());
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default logged in with active phone

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setIsOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234' || otp.length === 4) {
      StorageService.setUserPhone(phoneNumber);
      setIsLoggedIn(true);
      setIsOtpSent(false);
    }
  };

  const myTuitionRequests = tuitionRequests.filter(
    (r) => r.mobile === phoneNumber || r.mobile === '9838012345'
  );
  const myDemoRequests = demoRequests.filter(
    (d) => d.mobile === phoneNumber || d.mobile === '9838012345'
  );
  const myTutorProfile = tutors.find(
    (t) => t.mobile === phoneNumber || t.mobile === '9839124455'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold">
              {currentRole === 'tutor' ? (
                <GraduationCap className="w-5 h-5 text-amber-300" />
              ) : currentRole === 'admin' ? (
                <ShieldCheck className="w-5 h-5 text-orange-400" />
              ) : (
                <User className="w-5 h-5 text-blue-200" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">
                {currentRole === 'admin'
                  ? 'Admin Control Console'
                  : currentRole === 'tutor'
                  ? 'Tutor Portal & Assignments'
                  : 'Parent Dashboard'}
              </h2>
              <p className="text-xs text-blue-200">
                Registered Mobile: +91 {phoneNumber}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Switcher Toolbar (Parent & Tutor only) */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center justify-between px-4 shrink-0 text-xs">
          <span className="font-semibold text-slate-600">Switch Account Role:</span>
          <div className="flex gap-1.5">
            {(['parent', 'tutor'] as UserRole[]).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => onRoleChange(role)}
                className={`px-3.5 py-1 rounded-md font-bold capitalize transition ${
                  currentRole === role
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                {role}
              </button>
            ))}
            {currentRole === 'admin' && (
              <span className="px-2.5 py-1 rounded-md font-bold text-[11px] bg-orange-600 text-white">
                Admin Mode Active
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* PARENT DASHBOARD VIEW */}
          {currentRole === 'parent' && (
            <div className="space-y-5">
              {/* My Tuition Requirements */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                    My Submitted Tuition Requirements
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenFindTutor();
                    }}
                    className="text-xs font-bold text-orange-600 hover:underline"
                  >
                    + New Requirement
                  </button>
                </div>

                {myTuitionRequests.length > 0 ? (
                  <div className="space-y-2">
                    {myTuitionRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">
                            {req.studentClass} ({req.board}) · {req.subjects.join(', ')}
                          </span>
                          <span className="font-bold text-[11px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            {req.status}
                          </span>
                        </div>
                        <div className="text-slate-500">
                          Student: {req.studentName} · 📍 {req.area}, Orai · Mode: {req.tuitionMode}
                        </div>
                        {req.assignedTutorName && (
                          <div className="pt-1 text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Assigned Tutor: {req.assignedTutorName}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                    No tuition requests submitted yet for this number.
                  </div>
                )}
              </div>

              {/* My Free Demo Classes */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                    My Booked Free Demo Classes
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenDemo();
                    }}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    + Book Demo
                  </button>
                </div>

                {myDemoRequests.length > 0 ? (
                  <div className="space-y-2">
                    {myDemoRequests.map((demo) => (
                      <div
                        key={demo.id}
                        className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/70 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-950">
                            {demo.subject} ({demo.studentClass})
                          </span>
                          <span className="font-bold text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                            {demo.status}
                          </span>
                        </div>
                        <div className="text-slate-600">
                          Date: <span className="font-semibold">{demo.preferredDate}</span> ({demo.preferredTime})
                        </div>
                        <div className="text-slate-500">
                          Student: {demo.studentName} · 📍 {demo.area}, Orai
                        </div>
                        {demo.tutorName && (
                          <div className="text-blue-900 font-semibold pt-0.5">
                            Teacher: {demo.tutorName}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                    No demo classes booked yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TUTOR PORTAL VIEW */}
          {currentRole === 'tutor' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-indigo-950 text-sm">
                    Tutor Profile Status
                  </span>
                  <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">
                    Verified & Active in Orai
                  </span>
                </div>
                <p className="text-slate-600">
                  You are registered to receive student demo requests in Rajendra Nagar, Rath Road, and central Orai areas.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Assigned Student Enquiries for You
                </h4>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Class 10 CBSE (Maths & Science)</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">
                      Assigned Lead
                    </span>
                  </div>
                  <div className="text-slate-600">
                    Student: Aarav · Parent: Sunil Gupta · 📍 Rajendra Nagar, Orai
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Preferred Timing: Evening 4:00 PM - 6:00 PM (6 Days/Week)
                  </div>

                  {/* Strict Privacy Notice */}
                  <div className="p-2.5 bg-amber-50/90 border border-amber-200/80 rounded-lg text-[11px] text-amber-900 flex items-start gap-1.5">
                    <span>🔒</span>
                    <span>
                      <strong>Parent Contact Privacy Protected:</strong> Parent direct mobile number & WhatsApp are strictly restricted to DHT Admin. Contact our official coordinator to schedule this demo class.
                    </span>
                  </div>

                  <div className="pt-1 flex items-center gap-2">
                    <a
                      href={getCallUrl()}
                      className="flex-1 text-center py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition"
                    >
                      Call DHT Helpline (7268961107)
                    </a>
                    <a
                      href={getWhatsAppUrl('Hello DHT coordinator, please schedule my demo class for Rajendra Nagar Class 10 student (Aarav).')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition"
                    >
                      WhatsApp Coordinator
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick OTP Login simulation for phone change */}
          <div className="pt-3 border-t border-slate-200">
            <h4 className="font-bold text-xs text-slate-700 mb-2">
              Login with a different Mobile Number
            </h4>
            <div className="flex gap-2">
              <input
                type="tel"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 font-medium"
              />
              <button
                type="button"
                onClick={() => {
                  StorageService.setUserPhone(phoneNumber);
                  alert(`Logged in with mobile: ${phoneNumber}`);
                }}
                className="px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold"
              >
                Update Phone
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between text-xs">
          <span className="text-slate-500">Need support? Call 7268961107</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
