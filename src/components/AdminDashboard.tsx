import React, { useState } from 'react';
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  XCircle,
  Edit,
  Search,
  Filter,
  Bell,
  RefreshCw,
  Plus,
  BookOpen,
  MapPin,
  Star,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  Tutor,
  TuitionRequest,
  DemoRequest,
  Review,
  AppNotification,
  LeadStatus,
  TutorStatus,
  DemoStatus,
} from '../types';
import { StorageService } from '../services/storage';
import { getCallUrl, getWhatsAppUrl } from '../utils/contact';

interface AdminDashboardProps {
  tutors: Tutor[];
  tuitionRequests: TuitionRequest[];
  demoRequests: DemoRequest[];
  reviews: Review[];
  notifications: AppNotification[];
  onRefreshData: () => void;
  onClose: () => void;
}

const LEAD_STATUS_OPTIONS: LeadStatus[] = [
  'New',
  'Contacted',
  'Requirement Collected',
  'Tutor Searching',
  'Tutor Assigned',
  'Demo Scheduled',
  'Demo Completed',
  'Confirmed',
  'Closed',
];

const TUTOR_STATUS_OPTIONS: TutorStatus[] = [
  'New',
  'Under Verification',
  'Verified',
  'Active',
  'Inactive',
  'Rejected',
];

const DEMO_STATUS_OPTIONS: DemoStatus[] = [
  'Pending',
  'Demo Scheduled',
  'Demo Completed',
  'Confirmed',
  'Cancelled',
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  tutors,
  tuitionRequests,
  demoRequests,
  reviews,
  notifications,
  onRefreshData,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'leads' | 'tutors' | 'demos' | 'reviews' | 'notifications' | 'master'
  >('leads');

  const [leadFilterStatus, setLeadFilterStatus] = useState<string>('All');
  const [tutorFilterStatus, setTutorFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Assign Tutor Modal State
  const [assigningLead, setAssigningLead] = useState<TuitionRequest | null>(null);
  const [selectedTutorForLead, setSelectedTutorForLead] = useState<string>('');

  // Broadcast Notification State
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifRole, setNotifRole] = useState<'all' | 'parent' | 'tutor'>('all');
  const [notifSent, setNotifSent] = useState(false);

  // Status changers
  const handleLeadStatusChange = (
    id: string,
    newStatus: LeadStatus,
    tutorId?: string,
    tutorName?: string
  ) => {
    StorageService.updateTuitionRequestStatus(id, newStatus, tutorId, tutorName);
    onRefreshData();
  };

  const handleTutorStatusChange = (id: string, newStatus: TutorStatus) => {
    const isVerified = newStatus === 'Verified' || newStatus === 'Active';
    StorageService.updateTutorStatus(id, newStatus, isVerified);
    onRefreshData();
  };

  const handleDemoStatusChange = (id: string, newStatus: DemoStatus) => {
    StorageService.updateDemoStatus(id, newStatus);
    onRefreshData();
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle.trim() || !notifMessage.trim()) return;

    StorageService.addNotification({
      title: notifTitle.trim(),
      message: notifMessage.trim(),
      type: 'admin_message',
      targetRole: notifRole,
    });
    setNotifSent(true);
    setNotifTitle('');
    setNotifMessage('');
    onRefreshData();
    setTimeout(() => setNotifSent(false), 2000);
  };

  const handleResetToSeed = () => {
    if (window.confirm('Reset all demo data back to default initial state?')) {
      StorageService.resetAll();
      onRefreshData();
    }
  };

  // KPIs
  const totalLeads = tuitionRequests.length;
  const newLeads = tuitionRequests.filter((l) => l.status === 'New').length;
  const activeTutorsCount = tutors.filter((t) => t.status === 'Active').length;
  const pendingDemosCount = demoRequests.filter((d) => d.status === 'Pending').length;
  const confirmedTuitions = tuitionRequests.filter((l) => l.status === 'Confirmed').length;

  return (
    <div className="bg-slate-100 min-h-screen py-6 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-blue-950">
                  Discovery Admin Portal
                </h1>
                <span className="bg-orange-100 text-orange-800 text-[11px] font-extrabold px-2 py-0.5 rounded uppercase">
                  Orai Central HQ
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Lead Management • Tutor Verification • Demo Scheduling • Business Helpline: 7268961107
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetToSeed}
              className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition"
              title="Reset sample data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition"
            >
              Exit to Parent View
            </button>
          </div>
        </div>

        {/* KPI Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500">Total Enquiries</div>
            <div className="text-2xl font-extrabold text-blue-950 mt-1">{totalLeads}</div>
            <div className="text-[11px] text-orange-600 font-medium">{newLeads} New Needs Action</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500">Pending Demos</div>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">{pendingDemosCount}</div>
            <div className="text-[11px] text-slate-400">Trial Class Scheduled</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500">Active Tutors</div>
            <div className="text-2xl font-extrabold text-indigo-700 mt-1">{activeTutorsCount}</div>
            <div className="text-[11px] text-slate-400">Total: {tutors.length} Registered</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="text-xs font-semibold text-slate-500">Confirmed Tuitions</div>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">{confirmedTuitions}</div>
            <div className="text-[11px] text-emerald-700 font-medium">Active Monthly Batches</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
            <div className="text-xs font-semibold text-slate-500">Reviews</div>
            <div className="text-2xl font-extrabold text-blue-900 mt-1">{reviews.length}</div>
            <div className="text-[11px] text-slate-400">★ 4.9 Average Rating</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex flex-wrap gap-1">
          {[
            { id: 'leads', label: `Parent Enquiries (${tuitionRequests.length})` },
            { id: 'tutors', label: `Tutor Profiles (${tutors.length})` },
            { id: 'demos', label: `Demo Requests (${demoRequests.length})` },
            { id: 'reviews', label: `Reviews (${reviews.length})` },
            { id: 'notifications', label: 'Send Notifications' },
            { id: 'master', label: 'Master Data / Config' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition ${
                activeTab === tab.id
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PARENT ENQUIRIES / LEADS */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Filter Status:</span>
                <select
                  value={leadFilterStatus}
                  onChange={(e) => setLeadFilterStatus(e.target.value)}
                  className="text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="All">All Statuses</option>
                  {LEAD_STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Admin can directly WhatsApp or Call parent to discuss tutor match.
              </div>
            </div>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Student & Parent</th>
                    <th className="py-3 px-3">Class & Board</th>
                    <th className="py-3 px-3">Subjects</th>
                    <th className="py-3 px-3">Locality in Orai</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Assigned Tutor</th>
                    <th className="py-3 px-4 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {tuitionRequests
                    .filter(
                      (req) =>
                        leadFilterStatus === 'All' || req.status === leadFilterStatus
                    )
                    .map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{req.parentName}</div>
                          <div className="text-[11px] text-slate-500">
                            Student: {req.studentName} · 📞 +91 {req.mobile}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-800">{req.studentClass}</div>
                          <div className="text-[11px] text-slate-500">{req.board}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-800">
                            {req.subjects.join(', ')}
                          </div>
                          <div className="text-[10px] text-slate-400">{req.tuitionMode}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-blue-900">📍 {req.area}</span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={req.status}
                            onChange={(e) =>
                              handleLeadStatusChange(req.id, e.target.value as LeadStatus)
                            }
                            className={`py-1 px-2 rounded-md font-bold text-[11px] border ${
                              req.status === 'New'
                                ? 'bg-orange-50 text-orange-700 border-orange-200'
                                : req.status === 'Confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : req.status === 'Tutor Assigned'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {LEAD_STATUS_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-3">
                          {req.assignedTutorName ? (
                            <span className="font-bold text-slate-900">
                              {req.assignedTutorName}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setAssigningLead(req);
                                setSelectedTutorForLead(tutors[0]?.id || '');
                              }}
                              className="text-xs text-orange-600 font-bold hover:underline"
                            >
                              + Assign Tutor
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`tel:${req.mobile}`}
                              className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md"
                              title="Call Parent"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`https://wa.me/91${req.mobile}?text=${encodeURIComponent(
                                `Hello ${req.parentName}, this is Discovery Home Tuition Orai regarding your tuition request for ${req.studentClass}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md"
                              title="WhatsApp Parent"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TUTOR PROFILES & VERIFICATION */}
        {activeTab === 'tutors' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Filter Tutor Status:</span>
                <select
                  value={tutorFilterStatus}
                  onChange={(e) => setTutorFilterStatus(e.target.value)}
                  className="text-xs font-semibold py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="All">All Tutors</option>
                  {TUTOR_STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-slate-500">
                🔒 Tutors' phone numbers visible to admin for coordination.
              </div>
            </div>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Tutor Name & Contacts</th>
                    <th className="py-3 px-3">Qualification & Exp</th>
                    <th className="py-3 px-3">Subjects & Classes</th>
                    <th className="py-3 px-3">Teaching Areas</th>
                    <th className="py-3 px-3">Monthly Fee</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {tutors
                    .filter(
                      (t) =>
                        tutorFilterStatus === 'All' || t.status === tutorFilterStatus
                    )
                    .map((tutor) => (
                      <tr key={tutor.id} className="hover:bg-slate-50/60 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={tutor.photoUrl}
                              alt={tutor.name}
                              className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-200"
                            />
                            <div>
                              <div className="font-bold text-slate-900 flex items-center gap-1">
                                <span>{tutor.name}</span>
                                {tutor.isVerified && (
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                📞 +91 {tutor.mobile}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-800">
                            {tutor.qualification}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {tutor.experienceYears} Years Experience
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-800">
                            {tutor.subjects.join(', ')}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {tutor.classes.join(', ')} ({tutor.boards.join(', ')})
                          </div>
                        </td>
                        <td className="py-3 px-3 max-w-[150px] truncate">
                          📍 {tutor.teachingAreas.join(', ')}
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900">
                            ₹{tutor.expectedMonthlyFee}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={tutor.status}
                            onChange={(e) =>
                              handleTutorStatusChange(tutor.id, e.target.value as TutorStatus)
                            }
                            className={`py-1 px-2 rounded-md font-bold text-[11px] border ${
                              tutor.status === 'Active' || tutor.status === 'Verified'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : tutor.status === 'New' || tutor.status === 'Under Verification'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            {TUTOR_STATUS_OPTIONS.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {tutor.status !== 'Active' ? (
                              <button
                                type="button"
                                onClick={() => handleTutorStatusChange(tutor.id, 'Active')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold"
                              >
                                Approve & Activate
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleTutorStatusChange(tutor.id, 'Inactive')}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold"
                              >
                                Deactivate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DEMO REQUESTS */}
        {activeTab === 'demos' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-sm text-blue-950">Free Demo Classes Roster</h3>
              <span className="text-xs text-slate-500">
                Ensure tutor visits on scheduled date & time
              </span>
            </div>

            <div className="divide-y divide-slate-100 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Student & Parent</th>
                    <th className="py-3 px-3">Subject & Class</th>
                    <th className="py-3 px-3">Scheduled Date & Time</th>
                    <th className="py-3 px-3">Area in Orai</th>
                    <th className="py-3 px-3">Assigned Tutor</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {demoRequests.map((demo) => (
                    <tr key={demo.id} className="hover:bg-slate-50/60 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{demo.studentName}</div>
                        <div className="text-[11px] text-slate-500">
                          Parent: {demo.parentName} · 📞 +91 {demo.mobile}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-blue-950">{demo.subject}</div>
                        <div className="text-[11px] text-slate-500">
                          {demo.studentClass} ({demo.board})
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{demo.preferredDate}</div>
                        <div className="text-[11px] text-slate-500">{demo.preferredTime}</div>
                      </td>
                      <td className="py-3 px-3">📍 {demo.area}</td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-900">
                          {demo.tutorName || 'Not Assigned Yet'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={demo.status}
                          onChange={(e) =>
                            handleDemoStatusChange(demo.id, e.target.value as DemoStatus)
                          }
                          className="py-1 px-2 rounded-md font-bold text-[11px] border bg-slate-50"
                        >
                          {DEMO_STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:${demo.mobile}`}
                            className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md"
                            title="Call"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/91${demo.mobile}?text=${encodeURIComponent(
                              `Hello ${demo.parentName}, Discovery Home Tuition has scheduled your free demo class for ${demo.studentName} on ${demo.preferredDate}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS MANAGEMENT */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-blue-950">Published Parent Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reviews.map((r) => (
                <div key={r.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900">{r.parentName}</span>
                    <span className="text-amber-500 font-bold text-xs">
                      {'★'.repeat(r.rating)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mb-2">
                    {r.studentClass} · {r.subject} · 📍 {r.area}
                  </div>
                  <p className="text-xs text-slate-700 italic">“{r.comment}”</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SEND NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-xl mx-auto">
            <h3 className="font-bold text-base text-blue-950 mb-1">
              Broadcast System Notification
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Push notification alerts to parents or registered tutors.
            </p>

            <form onSubmit={handleSendNotification} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Audience
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'all', label: 'Everyone' },
                    { id: 'parent', label: 'Parents Only' },
                    { id: 'tutor', label: 'Tutors Only' },
                  ].map((aud) => (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => setNotifRole(aud.id as any)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                        notifRole === aud.id
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notification Title *
                </label>
                <input
                  type="text"
                  required
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  placeholder="e.g. New Board Exam Crash Course Available"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notification Message *
                </label>
                <textarea
                  rows={3}
                  required
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  placeholder="e.g. Free demo slots opening this Sunday for Class 10 & 12 students in Orai..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              {notifSent && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200">
                  ✓ Notification broadcasted successfully!
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Bell className="w-4 h-4" />
                <span>Send Broadcast Notification</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: MASTER DATA & APP CONFIG */}
        {activeTab === 'master' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-blue-950">App Configuration & Master Records</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Official Brand Info</div>
                <div>Name: DISCOVERY HOME TUITION</div>
                <div>Tagline: “Har Bacche Ke Liye Sahi Teacher, Har Ghar Tak.”</div>
                <div>Location: Orai, Uttar Pradesh, India</div>
                <div>Helpline: +91 7268961107</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">Supported Curriculums</div>
                <div>Classes: Nursery, LKG, UKG to Class 12</div>
                <div>Boards: CBSE, ICSE, UP Board</div>
                <div>Mode: 1-to-1 Home Tuition & Online</div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Assign Tutor to Lead */}
        {assigningLead && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative border border-slate-200 shadow-2xl space-y-4">
              <h3 className="font-bold text-base text-blue-950">
                Assign Tutor to {assigningLead.parentName}
              </h3>
              <p className="text-xs text-slate-500">
                Requirement: {assigningLead.studentClass} ({assigningLead.subjects.join(', ')}) at {assigningLead.area}
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Choose Tutor from Verified Roster
                </label>
                <select
                  value={selectedTutorForLead}
                  onChange={(e) => setSelectedTutorForLead(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
                >
                  {tutors.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — {t.qualification} ({t.subjects.join(', ')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssigningLead(null)}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const tutor = tutors.find((t) => t.id === selectedTutorForLead);
                    if (tutor && assigningLead) {
                      handleLeadStatusChange(
                        assigningLead.id,
                        'Tutor Assigned',
                        tutor.id,
                        tutor.name
                      );
                    }
                    setAssigningLead(null);
                  }}
                  className="flex-1 py-2 text-xs font-bold text-white bg-blue-900 rounded-lg"
                >
                  Confirm Assignment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
