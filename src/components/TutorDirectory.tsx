import React, { useState, useMemo, useEffect } from 'react';
import { TutorCard } from './TutorCard';
import { QuickSearchFilter, FilterState } from './QuickSearchFilter';
import { Tutor, MatchScoreResult } from '../types';
import { calculateTutorMatch } from '../utils/matching';
import { SEOService } from '../services/seo';
import { Sparkles, ArrowUpDown } from 'lucide-react';

interface TutorDirectoryProps {
  tutors: Tutor[];
  onViewProfile: (tutor: Tutor) => void;
  onRequestDemo: (tutor: Tutor) => void;
  onOpenParentFlow: () => void;
  initialFilters?: Partial<FilterState>;
}

export const TutorDirectory: React.FC<TutorDirectoryProps> = ({
  tutors,
  onViewProfile,
  onRequestDemo,
  onOpenParentFlow,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    studentClass: initialFilters?.studentClass || '',
    board: initialFilters?.board || '',
    subject: initialFilters?.subject || '',
    area: initialFilters?.area || '',
    tuitionMode: '',
    gender: '',
    minExperience: 0,
    searchQuery: '',
  });

  const [sortBy, setSortBy] = useState<'match' | 'rating' | 'experience'>('match');

  // Synchronize area if selected from top header
  useEffect(() => {
    if (initialFilters?.area !== undefined) {
      setFilters((prev) => ({
        ...prev,
        area: initialFilters.area || '',
      }));
    }
  }, [initialFilters?.area]);

  const handleReset = () => {
    setFilters({
      studentClass: '',
      board: '',
      subject: '',
      area: '',
      tuitionMode: '',
      gender: '',
      minExperience: 0,
      searchQuery: '',
    });
  };

  // Filter and rank tutors
  const processedTutors = useMemo(() => {
    // Only active/verified for parents
    const activeList = tutors.filter((t) => t.status === 'Active' || t.status === 'Verified');

    const filtered = activeList.filter((tutor) => {
      // Query filter
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = tutor.name.toLowerCase().includes(q);
        const matchesQual = tutor.qualification.toLowerCase().includes(q);
        const matchesSub = tutor.subjects.some((s) => s.toLowerCase().includes(q));
        const matchesArea = tutor.teachingAreas.some((a) => a.toLowerCase().includes(q));
        if (!matchesName && !matchesQual && !matchesSub && !matchesArea) return false;
      }

      // Class filter
      if (filters.studentClass) {
        const hasClass = tutor.classes.some(
          (c) => c.toLowerCase() === filters.studentClass.toLowerCase()
        );
        if (!hasClass) return false;
      }

      // Board filter
      if (filters.board) {
        const hasBoard = tutor.boards.some(
          (b) => b.toLowerCase() === filters.board.toLowerCase()
        );
        if (!hasBoard) return false;
      }

      // Subject filter
      if (filters.subject) {
        const hasSub =
          filters.subject === 'All Subjects' ||
          tutor.subjects.includes('All Subjects') ||
          tutor.subjects.some((s) => s.toLowerCase() === filters.subject.toLowerCase());
        if (!hasSub) return false;
      }

      // Area filter
      if (filters.area) {
        const isAll = filters.area.includes('All') || tutor.teachingAreas.includes('All Areas in Orai');
        const hasArea = isAll || tutor.teachingAreas.some((a) => a.toLowerCase() === filters.area.toLowerCase());
        if (!hasArea) return false;
      }

      // Gender filter
      if (filters.gender && tutor.gender !== filters.gender) return false;

      // Tuition mode
      if (filters.tuitionMode) {
        const hasMode = tutor.tuitionModes.some((m) =>
          m.toLowerCase().includes(filters.tuitionMode.toLowerCase())
        );
        if (!hasMode) return false;
      }

      // Min Experience
      if (filters.minExperience > 0 && tutor.experienceYears < filters.minExperience) {
        return false;
      }

      return true;
    });

    // Score with matching algorithm
    const withScores = filtered.map((tutor) => {
      const matchResult = calculateTutorMatch(tutor, {
        studentClass: filters.studentClass,
        board: filters.board,
        subjects: filters.subject ? [filters.subject] : undefined,
        area: filters.area,
        tuitionMode: filters.tuitionMode,
      });
      return { tutor, matchResult };
    });

    // Sorting
    if (sortBy === 'rating') {
      withScores.sort((a, b) => b.tutor.rating - a.tutor.rating);
    } else if (sortBy === 'experience') {
      withScores.sort((a, b) => b.tutor.experienceYears - a.tutor.experienceYears);
    } else {
      withScores.sort((a, b) => b.matchResult.score - a.matchResult.score);
    }

    return withScores;
  }, [tutors, filters, sortBy]);

  // Dynamically update document title & meta tags when search filters change
  useEffect(() => {
    const hasActiveSearch = Boolean(
      filters.studentClass ||
      filters.subject ||
      filters.board ||
      (filters.area && !filters.area.includes('All')) ||
      filters.searchQuery
    );

    if (hasActiveSearch) {
      SEOService.setSearchSEO({
        studentClass: filters.studentClass,
        subject: filters.subject,
        board: filters.board,
        area: filters.area,
        count: processedTutors.length,
      });
    }
  }, [
    filters.studentClass,
    filters.subject,
    filters.board,
    filters.area,
    filters.searchQuery,
    processedTutors.length,
  ]);

  return (
    <section id="find-tutor-section" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full">
                Verified Faculty Directory
              </span>
              <span className="text-xs text-slate-500 font-medium">📍 Orai, UP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-1.5">
              Available Home Tutors in Orai
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Browse top educators near your locality. Direct 1-to-1 demo available at your home.
            </p>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort by:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-2xs"
            >
              <option value="match">Best Match</option>
              <option value="rating">Highest Rated</option>
              <option value="experience">Experience (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Filter Toolbar */}
        <QuickSearchFilter
          filters={filters}
          onChange={setFilters}
          onReset={handleReset}
          totalResults={processedTutors.length}
        />

        {/* Tutor Cards Grid */}
        {processedTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {processedTutors.map(({ tutor, matchResult }) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                matchInfo={matchResult}
                onViewProfile={onViewProfile}
                onRequestDemo={onRequestDemo}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-xl font-bold">
              🔍
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                No Exact Tutor Matching Current Filters
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We have over 350+ tutors registered across Orai. Submit your custom requirement and our coordinator will assign the best matching teacher within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={onOpenParentFlow}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition"
              >
                Post Tuition Requirement
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
