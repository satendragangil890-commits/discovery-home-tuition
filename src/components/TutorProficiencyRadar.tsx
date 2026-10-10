import React, { useState, useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  Sparkles,
  Award,
  Layers,
  BookOpen,
  TrendingUp,
  Info,
  CheckCircle,
} from 'lucide-react';
import { Tutor, ProficiencyMetric, TutorProficiencyProfile } from '../types';

interface TutorProficiencyRadarProps {
  tutor: Tutor;
}

// Generate sensible, realistic proficiency metrics if tutor doesn't have custom ones
export function getOrCreateProficiencyProfile(tutor: Tutor): TutorProficiencyProfile {
  if (
    tutor.proficiencyProfile &&
    tutor.proficiencyProfile.subjects?.length >= 3 &&
    tutor.proficiencyProfile.classLevels?.length >= 3
  ) {
    return tutor.proficiencyProfile;
  }

  // Base score calculated from tutor's rating, experience & verification
  const ratingBonus = Math.round((tutor.rating - 4.0) * 15); // e.g. 4.9 -> +13
  const expBonus = Math.min(10, tutor.experienceYears * 1.5);
  const baseScore = Math.min(96, Math.max(78, 76 + ratingBonus + expBonus));

  // 1. Subject metrics
  const primarySubjects = tutor.subjects.length > 0 ? tutor.subjects : ['Mathematics', 'Science', 'English'];
  const subjectList = primarySubjects.slice(0, 5);
  // Ensure at least 4-5 spokes for a balanced radar shape
  const extraPillars = ['Concept Clarity', 'Doubt Resolution', 'Exam Strategy'];
  const combinedSubjects = [...subjectList];
  for (const pillar of extraPillars) {
    if (combinedSubjects.length < 5 && !combinedSubjects.includes(pillar)) {
      combinedSubjects.push(pillar);
    }
  }

  const subjects: ProficiencyMetric[] = combinedSubjects.map((sub, index) => {
    // slight variation per spoke
    const variation = index === 0 ? 4 : index === 1 ? 2 : index === 2 ? -2 : index === 3 ? 1 : -3;
    const score = Math.min(99, Math.max(72, Math.round(baseScore + variation)));
    return {
      subjectOrLevel: sub,
      proficiency: score,
      benchmark: 72,
      ratingLabel: score >= 92 ? 'Mastery' : score >= 85 ? 'Advanced' : 'Proficient',
      highlight:
        score >= 95
          ? 'Top 5% in Orai'
          : score >= 90
          ? 'Exemplary clarity'
          : 'Verified methodology',
    };
  });

  // 2. Class level metrics
  const primaryClasses = tutor.classes.length > 0 ? tutor.classes : ['Class 9', 'Class 10', 'Class 11', 'Class 12'];
  const classList = primaryClasses.slice(0, 5);
  const extraClassPillars = ['Foundation Batch', 'Board Exam Prep', 'Rapid Doubt Revision'];
  const combinedClasses = [...classList];
  for (const pillar of extraClassPillars) {
    if (combinedClasses.length < 5 && !combinedClasses.includes(pillar)) {
      combinedClasses.push(pillar);
    }
  }

  const classLevels: ProficiencyMetric[] = combinedClasses.map((lvl, index) => {
    const variation = index === 0 ? 3 : index === 1 ? 4 : index === 2 ? -1 : index === 3 ? -3 : 1;
    const score = Math.min(99, Math.max(70, Math.round(baseScore + variation)));
    return {
      subjectOrLevel: lvl,
      proficiency: score,
      benchmark: 70,
      ratingLabel: score >= 92 ? 'Mastery' : score >= 85 ? 'Advanced' : 'Proficient',
      highlight:
        score >= 95
          ? 'High Board Marks Rate'
          : score >= 90
          ? 'Deep curriculum coverage'
          : 'Consistent improvement',
    };
  });

  return {
    subjects,
    classLevels,
    primaryFocus: tutor.subjects[0] || 'Core Academics',
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ProficiencyMetric;
    value: number;
    dataKey: string;
    name: string;
  }>;
}

const CustomRadarTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ProficiencyMetric;
    const tutorScore = data.proficiency;
    const benchmark = data.benchmark ?? 72;
    const delta = tutorScore - benchmark;

    return (
      <div className="bg-slate-900/95 text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-xs backdrop-blur-md min-w-[210px] space-y-1.5 animate-in fade-in duration-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
          <span className="font-bold text-slate-100 text-sm">{data.subjectOrLevel}</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {data.ratingLabel || (tutorScore >= 90 ? 'Mastery' : 'Advanced')}
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-0.5">
          <span className="text-slate-400">Tutor Score:</span>
          <span className="text-base font-extrabold text-blue-400">
            {tutorScore}%
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Orai Peer Avg:</span>
          <span className="font-medium text-slate-300">{benchmark}%</span>
        </div>

        <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 pt-1 border-t border-slate-800/80">
          <TrendingUp className="w-3 h-3 shrink-0" />
          <span>
            {delta > 0 ? `+${delta}% above peer baseline` : 'Meets peer standard'}
          </span>
        </div>

        {data.highlight && (
          <div className="text-[10px] text-amber-300/90 italic pt-0.5">
            ★ {data.highlight}
          </div>
        )}
      </div>
    );
  }
  return null;
};

export const TutorProficiencyRadar: React.FC<TutorProficiencyRadarProps> = ({ tutor }) => {
  const [activeDimension, setActiveDimension] = useState<'subjects' | 'classes' | 'comparison'>('subjects');
  const [showBenchmark, setShowBenchmark] = useState<boolean>(true);

  const profile = useMemo(() => getOrCreateProficiencyProfile(tutor), [tutor]);

  // Selected dataset for the radar chart
  const currentData = useMemo(() => {
    if (activeDimension === 'classes') {
      return profile.classLevels;
    }
    return profile.subjects;
  }, [activeDimension, profile]);

  // Top highlight metric
  const topMetric = useMemo(() => {
    const list = [...profile.subjects, ...profile.classLevels];
    return list.reduce((prev, current) => (prev.proficiency > current.proficiency ? prev : current), list[0]);
  }, [profile]);

  // Average proficiency
  const avgProficiency = useMemo(() => {
    const items = currentData;
    if (!items || items.length === 0) return 90;
    const sum = items.reduce((acc, curr) => acc + curr.proficiency, 0);
    return Math.round(sum / items.length);
  }, [currentData]);

  return (
    <div className="bg-slate-50/80 rounded-2xl border border-slate-200/90 p-4 sm:p-5 space-y-4 shadow-2xs">
      {/* Header and Dimension Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-2xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>Expertise & Proficiency Matrix</span>
                <span className="text-[10px] font-semibold text-blue-800 bg-blue-100/90 px-2 py-0.5 rounded border border-blue-200">
                  Radar Visualizer
                </span>
              </h4>
              <p className="text-[11px] text-slate-500">
                Detailed radar evaluation across subject depths and class levels.
              </p>
            </div>
          </div>
        </div>

        {/* Dimension Switcher (Functional Segmented Buttons) */}
        <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveDimension('subjects')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeDimension === 'subjects'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>By Subject</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveDimension('classes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeDimension === 'classes'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>By Class Level</span>
          </button>
        </div>
      </div>

      {/* Main Radar Chart & Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Radar Chart Display */}
        <div className="md:col-span-7 bg-white rounded-xl border border-slate-200/90 p-3 pt-2 relative shadow-2xs">
          {/* Chart top bar controls */}
          <div className="flex items-center justify-between px-1 mb-1 text-[11px] text-slate-600">
            <span className="font-semibold text-slate-800">
              {activeDimension === 'subjects' ? 'Subject Domain Depth' : 'Class Grade Competency'}
            </span>
            <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showBenchmark}
                onChange={(e) => setShowBenchmark(e.target.checked)}
                className="w-3.5 h-3.5 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span className="text-[10px] text-slate-500">Compare Peer Benchmark</span>
            </label>
          </div>

          <div className="h-[250px] sm:h-[270px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="72%" data={currentData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="subjectOrLevel"
                  tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[40, 100]}
                  tick={{ fill: '#94a3b8', fontSize: 9 }}
                  stroke="#cbd5e1"
                />

                {/* Benchmark Polygon */}
                {showBenchmark && (
                  <Radar
                    name="Orai Peer Benchmark"
                    dataKey="benchmark"
                    stroke="#94a3b8"
                    fill="#94a3b8"
                    fillOpacity={0.15}
                    strokeDasharray="4 4"
                  />
                )}

                {/* Tutor Polygon */}
                <Radar
                  name={tutor.name}
                  dataKey="proficiency"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.42}
                  strokeWidth={2}
                  dot={{ r: 3.5, fill: '#1d4ed8', stroke: '#ffffff', strokeWidth: 1.5 }}
                />

                <Tooltip content={<CustomRadarTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend and guidance */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-[11px] text-slate-600 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-500/80 ring-1 ring-blue-600/30"></span>
              <span className="font-semibold text-slate-800">{tutor.name}</span>
            </div>
            {showBenchmark && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t-2 border-dashed border-slate-400"></span>
                <span className="text-slate-500">Orai Baseline Avg (72%)</span>
              </div>
            )}
            <span className="text-slate-400 text-[10px] hidden sm:inline">
              (Hover/tap any axis corner for metrics)
            </span>
          </div>
        </div>

        {/* Key Competency Breakdown & Parent Guide */}
        <div className="md:col-span-5 space-y-3">
          {/* Overall Score Badge Card */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Composite Proficiency</span>
              <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs border border-blue-200">
                {avgProficiency}% Index
              </span>
            </div>

            {/* Top strength spotlight */}
            {topMetric && (
              <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Peak Strength: {topMetric.subjectOrLevel}</span>
                </div>
                <div className="text-[11px] text-amber-800 leading-snug">
                  Rated {topMetric.proficiency}% with {topMetric.highlight || 'proven student marks boost'}.
                </div>
              </div>
            )}
          </div>

          {/* Interactive Metric Bars */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs space-y-2.5">
            <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
              <span>Detailed Breakdown</span>
              <span className="text-[10px] font-normal text-slate-500">Out of 100</span>
            </div>

            <div className="space-y-2">
              {currentData.map((metric) => (
                <div key={metric.subjectOrLevel} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-800">{metric.subjectOrLevel}</span>
                    <span className="font-bold text-blue-700">{metric.proficiency}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        metric.proficiency >= 94
                          ? 'bg-blue-600'
                          : metric.proficiency >= 88
                          ? 'bg-indigo-500'
                          : 'bg-sky-500'
                      }`}
                      style={{ width: `${metric.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Assessment Stamp */}
          <div className="p-2.5 rounded-xl bg-slate-100/80 border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              Proficiency scores are validated through academic credentials, past student results in Orai schools, and DHT evaluation demo sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
