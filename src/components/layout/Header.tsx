import React from 'react';
import { 
  Compass, 
  BookOpen, 
  Flame, 
  Award, 
  Layers, 
  User
} from 'lucide-react';
import { useLearningStore } from '../../store/learningStore';
import { NavigationTab } from '../../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenProfileModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenProfileModal,
}) => {
  const { profile, totalXp, playerProgression } = useLearningStore();

  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'today', label: 'Today', icon: <Compass className="w-4 h-4" /> },
    { id: 'curriculum', label: 'Curriculum (51)', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'projects', label: 'Applied Projects', icon: <Layers className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress & Ledger', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('today')}>
            <div className="w-9 h-9 rounded-lg bg-teal-800 flex items-center justify-center text-white font-bold shadow-sm">
              <span className="text-lg tracking-wider">E</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900 text-lg tracking-tight">EVOLVE</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-teal-50 text-teal-800 border border-teal-200 rounded">
                  CS MVP
                </span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">Predefined CS Curriculum & Staged Mastery</p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-900 border border-teal-200 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className={isActive ? 'text-teal-700' : 'text-gray-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Status Badges: Academic Year vs Player Progression */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Streak Counter */}
            <div 
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium"
              title="Consecutive study streak days"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{profile.streakDays}d streak</span>
            </div>

            {/* Separate Player Level & XP Badge */}
            <div 
              onClick={() => onSelectTab('progress')}
              className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-white border border-gray-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer shadow-xs"
              title={`Player Level is earned through study activities only (Independent of academic year)`}
            >
              <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-bold">
                {playerProgression.level}
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1 text-xs font-semibold text-gray-800">
                  <span>{playerProgression.levelTitle}</span>
                  <span className="text-gray-400 font-normal">({totalXp} XP)</span>
                </div>
                <div className="w-20 bg-gray-100 rounded-full h-1 mt-0.5 overflow-hidden">
                  <div 
                    className="bg-teal-600 h-1 rounded-full transition-all duration-300" 
                    style={{ width: `${playerProgression.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* University Standing Badge (Clickable to open profile modal) */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition shadow-xs"
              title="Click to edit university year and currently studying subjects"
            >
              <User className="w-3.5 h-3.5 text-teal-700" />
              <div className="text-left">
                <span className="font-semibold text-gray-900 block leading-tight">Year {profile.academicYear}</span>
                <span className="text-[10px] text-gray-500">{profile.currentlyStudyingSubjectIds.length} studying</span>
              </div>
            </button>

          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-gray-200">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex flex-col items-center py-1 px-2 text-xs font-medium ${
                  isActive ? 'text-teal-700 font-semibold' : 'text-gray-500'
                }`}
              >
                {item.icon}
                <span className="mt-0.5">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
