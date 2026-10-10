import React from 'react';
import { Home, Search, Sparkles, GraduationCap, User } from 'lucide-react';
import { UserRole } from '../types';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: 'home' | 'find_tutor' | 'free_demo' | 'become_tutor' | 'profile') => void;
  currentRole: UserRole;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  currentRole,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 lg:hidden">
      <div className="grid grid-cols-5 h-14 max-w-lg mx-auto">
        {/* Home */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center transition ${
            currentTab === 'home' ? 'text-blue-900 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Find Tutor */}
        <button
          type="button"
          onClick={() => onSelectTab('find_tutor')}
          className={`flex flex-col items-center justify-center transition ${
            currentTab === 'find_tutor' ? 'text-blue-900 font-bold' : 'text-slate-500'
          }`}
        >
          <Search className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Find Tutor</span>
        </button>

        {/* Free Demo (Highlighted Center) */}
        <button
          type="button"
          onClick={() => onSelectTab('free_demo')}
          className="flex flex-col items-center justify-center text-orange-600 font-bold"
        >
          <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xs -mt-2">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 text-orange-700">Free Demo</span>
        </button>

        {/* Become Tutor */}
        <button
          type="button"
          onClick={() => onSelectTab('become_tutor')}
          className={`flex flex-col items-center justify-center transition ${
            currentTab === 'become_tutor' ? 'text-blue-900 font-bold' : 'text-slate-500'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Become Tutor</span>
        </button>

        {/* Profile / Role */}
        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center transition ${
            currentTab === 'profile' ? 'text-blue-900 font-bold' : 'text-slate-500'
          }`}
        >
          <User className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};
