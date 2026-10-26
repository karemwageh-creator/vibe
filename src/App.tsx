import React, { useState } from 'react';
import { NavigationTab } from './types';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { CurriculumView } from './components/curriculum/CurriculumView';
import { SubjectDetailView } from './components/subject/SubjectDetailView';
import { ProjectsView } from './components/projects/ProjectsView';
import { ProgressProfileView } from './components/progress/ProgressProfileView';
import { ProfileModal } from './components/profile/ProfileModal';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('today');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('intro-to-cs');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Navigate directly to subject detail
  const handleOpenSubject = (subjectId: string) => {
    setSelectedSubjectId(subjectId);
    setCurrentTab('subject');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'today' && (
          <DashboardView
            onSelectSubject={handleOpenSubject}
            onOpenProfileModal={() => setIsProfileModalOpen(true)}
            onNavigateToCurriculum={() => setCurrentTab('curriculum')}
            onNavigateToProjects={() => setCurrentTab('projects')}
          />
        )}

        {currentTab === 'curriculum' && (
          <CurriculumView
            onSelectSubject={handleOpenSubject}
          />
        )}

        {currentTab === 'subject' && (
          <SubjectDetailView
            subjectId={selectedSubjectId}
            onBack={() => setCurrentTab('curriculum')}
            onSelectSubject={handleOpenSubject}
          />
        )}

        {currentTab === 'projects' && (
          <ProjectsView
            onSelectSubject={handleOpenSubject}
          />
        )}

        {currentTab === 'progress' && (
          <ProgressProfileView />
        )}
      </main>

      {/* Global Academic Focus & Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Calm, Credible Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-800">EVOLVE</span>
            <span>—</span>
            <span>Predefined CS Curriculum & Staged Mastery MVP</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-gray-400">
            <span>51 Preserved Curriculum Subjects</span>
            <span>•</span>
            <span>Evidence-Based Curation</span>
            <span>•</span>
            <span>Independent Gamification Model</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
