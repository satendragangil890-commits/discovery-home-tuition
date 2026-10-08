import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Calculator,
  Brain,
  PenTool,
  MessageSquare,
  Code,
  Music,
  Headphones,
  Trophy,
  ArrowRight,
  GraduationCap,
  CheckCircle,
} from 'lucide-react';
import {
  CLASS_GROUPS,
  BOARDS_LIST,
  CORE_SUBJECTS,
  ADDITIONAL_SERVICES,
} from '../data/masterData';

interface ClassesAndSubjectsProps {
  onSelectCategory: (criteria: {
    studentClass?: string;
    board?: string;
    subject?: string;
  }) => void;
  onOpenDemo: (prefilledSubject?: string) => void;
}

const serviceIcons: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-amber-500" />,
  Calculator: <Calculator className="w-5 h-5 text-blue-600" />,
  Brain: <Brain className="w-5 h-5 text-purple-600" />,
  PenTool: <PenTool className="w-5 h-5 text-emerald-600" />,
  MessageSquare: <MessageSquare className="w-5 h-5 text-indigo-600" />,
  Code: <Code className="w-5 h-5 text-cyan-600" />,
  Music: <Music className="w-5 h-5 text-pink-600" />,
  Headphones: <Headphones className="w-5 h-5 text-teal-600" />,
  Trophy: <Trophy className="w-5 h-5 text-orange-600" />,
};

export const ClassesAndSubjects: React.FC<ClassesAndSubjectsProps> = ({
  onSelectCategory,
  onOpenDemo,
}) => {
  const [activeTab, setActiveTab] = useState<'classes' | 'boards' | 'subjects' | 'services'>('classes');

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60">
            Curriculum & Specializations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-2">
            Classes, Boards & Subjects We Cover in Orai
          </h2>
          <p className="text-sm text-slate-600 mt-1.5">
            Select child's grade or subject to find specialized, background-verified home tutors nearby.
          </p>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5 p-1 bg-slate-100 rounded-xl max-w-lg mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('classes')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'classes'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Classes (Nursery - 12)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('boards')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'boards'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Boards
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('subjects')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'subjects'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Subjects
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                activeTab === 'services'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Special Services
            </button>
          </div>
        </div>

        {/* Tab Content 1: Classes */}
        {activeTab === 'classes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLASS_GROUPS.map((group, idx) => (
              <div
                key={group.label}
                className="bg-slate-50/80 hover:bg-white rounded-xl p-4 border border-slate-200 transition hover:shadow-md hover:border-blue-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{group.label}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {group.values.map((cls) => (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => onSelectCategory({ studentClass: cls })}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50/50 transition"
                    >
                      {cls}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span>Home tutor available in all Orai areas</span>
                  <button
                    type="button"
                    onClick={() => onSelectCategory({ studentClass: group.values[0] })}
                    className="text-orange-600 font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Find Tutor</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 2: Boards */}
        {activeTab === 'boards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BOARDS_LIST.map((board) => (
              <div
                key={board}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-extrabold text-blue-900">{board}</div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Syllabus Verified
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  {board === 'CBSE' &&
                    'NCERT aligned curriculum, daily homework assistance, chapter tests, and board exam answer sheet presentation coaching.'}
                  {board === 'ICSE' &&
                    'Deep conceptual English & Science depth, project work support, and comprehensive syllabus coverage.'}
                  {board === 'UP Board' &&
                    'Bilingual (Hindi/English) expert tutors, focus on numericals, diagrams, and high scoring in state board examinations.'}
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 mb-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Nursery to Class 12 Faculty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Free Home Demo Class in Orai</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectCategory({ board })}
                  className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>View {board} Tutors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Subjects */}
        {activeTab === 'subjects' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {CORE_SUBJECTS.map((sub) => (
              <button
                key={sub}
                type="button"
                onClick={() => onSelectCategory({ subject: sub })}
                className="p-3.5 text-left rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-orange-400 hover:shadow-xs transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:text-orange-600 mb-2">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-orange-600 transition">
                  {sub}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  1-on-1 Home Tutor
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tab Content 4: Additional Services */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDITIONAL_SERVICES.map((srv) => (
              <div
                key={srv.name}
                className="p-4 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                    {serviceIcons[srv.icon] || <Sparkles className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{srv.name}</h3>
                    <p className="text-[11px] text-slate-500">{srv.description}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-semibold">Home Lessons Available</span>
                  <button
                    type="button"
                    onClick={() => onOpenDemo(srv.name)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
                  >
                    Request Demo →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
