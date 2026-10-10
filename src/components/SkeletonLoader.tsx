import React from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/masterData';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans animate-in fade-in duration-200">
      {/* Top Banner Skeleton */}
      <div className="bg-blue-950 px-4 py-2 text-xs flex justify-between items-center text-white/70">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
          <span className="font-semibold text-white/90">Discovery Home Tuition • Orai, UP</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">Helpline: {BUSINESS_CONFIG.phone}</span>
          <div className="w-16 h-4 bg-white/20 rounded animate-pulse" />
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-xs">
            <GraduationCap className="w-6 h-6 text-amber-400 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-blue-950">DISCOVERY</span>
              <span className="font-bold text-xs text-orange-600">HOME TUITION</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Loading Orai verified tutors...</div>
          </div>
        </div>

        {/* Header action placeholders */}
        <div className="flex items-center gap-2">
          <div className="w-20 sm:w-28 h-8 rounded-lg bg-slate-100 animate-pulse hidden sm:block" />
          <div className="w-24 sm:w-32 h-8 rounded-lg bg-orange-100 animate-pulse" />
        </div>
      </div>

      {/* Center Branding Splash Indicator */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white py-2 px-4 text-center text-xs flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
        <span className="font-medium">
          Connecting verified home tutors across Orai (CBSE, ICSE, UP Board)...
        </span>
      </div>

      {/* Main Skeleton Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 flex-1">
        {/* Hero Section Skeleton */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
          <div className="space-y-3 max-w-2xl">
            <div className="w-36 h-6 rounded-full bg-orange-100 animate-pulse" />
            <div className="w-full sm:w-3/4 h-10 rounded-xl bg-slate-200 animate-pulse" />
            <div className="w-5/6 h-5 rounded-lg bg-slate-100 animate-pulse" />
            <div className="w-2/3 h-4 rounded-lg bg-slate-100 animate-pulse" />
          </div>

          {/* Button placeholders */}
          <div className="flex flex-wrap gap-3 pt-2">
            <div className="w-36 h-11 rounded-xl bg-orange-500/80 animate-pulse" />
            <div className="w-36 h-11 rounded-xl bg-blue-900/80 animate-pulse" />
          </div>

          {/* 4 Pillars skeleton cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                <div className="w-6 h-6 rounded-md bg-slate-200 animate-pulse" />
                <div className="w-24 h-4 rounded bg-slate-200 animate-pulse" />
                <div className="w-16 h-3 rounded bg-slate-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Search Ribbon Skeleton */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="w-full h-10 rounded-xl bg-slate-100 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-9 rounded-lg bg-slate-100 animate-pulse" />
            ))}
          </div>
        </div>

        {/* Tutor Cards Grid Skeleton */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-48 h-6 rounded-lg bg-slate-200 animate-pulse" />
            <div className="w-24 h-6 rounded-lg bg-slate-100 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-2xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-16 h-16 rounded-xl bg-slate-200 animate-pulse shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="w-3/4 h-5 rounded bg-slate-200 animate-pulse" />
                    <div className="w-1/2 h-3.5 rounded bg-slate-100 animate-pulse" />
                    <div className="w-2/3 h-3 rounded bg-slate-100 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="w-full h-4 rounded bg-slate-100 animate-pulse" />
                  <div className="w-4/5 h-4 rounded bg-slate-100 animate-pulse" />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                  <div className="h-8 rounded-lg bg-slate-100 animate-pulse" />
                  <div className="h-8 rounded-lg bg-blue-100 animate-pulse" />
                  <div className="h-8 rounded-lg bg-emerald-100 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
