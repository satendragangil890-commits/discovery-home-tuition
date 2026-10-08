import React from 'react';
import { Search, Filter, X, RefreshCw } from 'lucide-react';
import {
  CLASSES_LIST,
  BOARDS_LIST,
  CORE_SUBJECTS,
  ORAI_LOCALITIES,
} from '../data/masterData';

export interface FilterState {
  studentClass: string;
  board: string;
  subject: string;
  area: string;
  tuitionMode: string;
  gender: string;
  minExperience: number;
  searchQuery: string;
}

interface QuickSearchFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const QuickSearchFilter: React.FC<QuickSearchFilterProps> = ({
  filters,
  onChange,
  onReset,
  totalResults,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const hasActiveFilters =
    Boolean(filters.studentClass) ||
    Boolean(filters.board) ||
    Boolean(filters.subject) ||
    Boolean(filters.area) ||
    Boolean(filters.gender) ||
    Boolean(filters.searchQuery) ||
    filters.minExperience > 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search tutor by name, qualification, area (e.g. Rajendra Nagar, Maths)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition w-full sm:w-auto ${
              showAdvanced || hasActiveFilters
                ? 'bg-blue-50 border-blue-300 text-blue-900'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-orange-600" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-orange-600 font-semibold px-2 py-2"
              title="Reset Filters"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary 4-Dropdown Filter Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mt-3.5 pt-3 border-t border-slate-100">
        {/* Class Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Class
          </label>
          <select
            value={filters.studentClass}
            onChange={(e) => onChange({ ...filters, studentClass: e.target.value })}
            className="w-full text-xs font-medium py-2 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="">All Classes (Nursery - 12)</option>
            {CLASSES_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Board Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Board
          </label>
          <select
            value={filters.board}
            onChange={(e) => onChange({ ...filters, board: e.target.value })}
            className="w-full text-xs font-medium py-2 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="">All Boards (CBSE / ICSE / UP)</option>
            {BOARDS_LIST.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Subject
          </label>
          <select
            value={filters.subject}
            onChange={(e) => onChange({ ...filters, subject: e.target.value })}
            className="w-full text-xs font-medium py-2 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="">All Subjects</option>
            {CORE_SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Locality in Orai */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Locality in Orai
          </label>
          <select
            value={filters.area}
            onChange={(e) => onChange({ ...filters, area: e.target.value })}
            className="w-full text-xs font-medium py-2 px-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
          >
            <option value="">All Orai Localities</option>
            {ORAI_LOCALITIES.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-100 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Tutor Gender</label>
            <div className="flex gap-1.5">
              {['All', 'Male', 'Female'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => onChange({ ...filters, gender: g === 'All' ? '' : g })}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium border text-center transition ${
                    (g === 'All' && !filters.gender) || filters.gender === g
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Tuition Mode</label>
            <div className="flex gap-1.5">
              {['All', 'Home Tuition', 'Online'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onChange({ ...filters, tuitionMode: m === 'All' ? '' : m })}
                  className={`flex-1 py-1.5 px-2 rounded-lg font-medium border text-center transition ${
                    (m === 'All' && !filters.tuitionMode) || filters.tuitionMode === m
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">
              Minimum Experience: {filters.minExperience > 0 ? `${filters.minExperience}+ Yrs` : 'Any'}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={filters.minExperience}
              onChange={(e) => onChange({ ...filters, minExperience: Number(e.target.value) })}
              className="w-full accent-blue-900 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Results Count & Match Indicator */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="font-bold text-slate-900">{totalResults} verified tutor{totalResults === 1 ? '' : 's'}</span>
          <span>available in Orai</span>
          {hasActiveFilters && <span>matching your filters</span>}
        </div>
        <span className="text-[11px] text-blue-700 font-semibold">
          ★ 100% Background & Qualification Checked
        </span>
      </div>
    </div>
  );
};
