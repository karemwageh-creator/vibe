import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  FileCheck, 
  ArrowRight, 
  AlertCircle
} from 'lucide-react';
import { useLearningStore } from '../../store/learningStore';
import { CURRICULUM_SUBJECTS } from '../../data/curriculum';
import { SUBJECT_ACTIVITIES } from '../../data/stages';
import { Activity } from '../../types';
import { ActivityCompletionModal } from '../subject/ActivityCompletionModal';

interface ProjectsViewProps {
  onSelectSubject: (subjectId: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onSelectSubject }) => {
  const { profile, progress, getSubjectProgress } = useLearningStore();

  const [selectedActivityForModal, setSelectedActivityForModal] = useState<Activity | null>(null);

  // Get all applied projects
  const projectActivities = SUBJECT_ACTIVITIES.filter(a => a.stage === 'project');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* View Header */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <Layers className="w-6 h-6 text-teal-800" />
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Applied Computer Science Projects
          </h1>
        </div>
        <p className="text-xs text-gray-500 max-w-2xl">
          Practical applications recommended after demonstrating Stage 1 core competence. Building and testing working software cements abstract principles.
        </p>
      </div>

      {/* Applied Learning Philosophy Alert */}
      <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-xl space-y-1 text-xs text-teal-950">
        <span className="font-bold block">Applied Project Criteria:</span>
        <p className="leading-relaxed">
          Tutorial step-copying does not count as project mastery. Each applied project requires implementing core logic, writing automated unit/stress tests, and recording evidence of design trade-offs.
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projectActivities.map((project) => {
          const subject = CURRICULUM_SUBJECTS.find(s => s.id === project.subjectId);
          if (!subject) return null;

          const isCurrentlyStudying = profile.currentlyStudyingSubjectIds.includes(subject.id);
          const subProg = getSubjectProgress(subject.id);
          const isProjectCompleted = progress[project.id]?.status === 'completed';
          const isStage1Complete = subProg.stage1Complete;

          return (
            <div
              key={project.id}
              className={`bg-white rounded-xl border p-5 transition-all flex flex-col justify-between shadow-xs ${
                isCurrentlyStudying ? 'border-teal-300 ring-1 ring-teal-200/50' : 'border-gray-200'
              }`}
            >
              
              <div className="space-y-3">
                
                {/* Badges Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      #{subject.curriculumOrder}
                    </span>
                    <button
                      onClick={() => onSelectSubject(subject.id)}
                      className="text-xs font-bold text-teal-900 hover:underline"
                    >
                      {subject.cleanName}
                    </button>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    {isCurrentlyStudying && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 rounded">
                        Active Focus
                      </span>
                    )}
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded">
                      +{project.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-base font-bold text-gray-900 leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                {/* Criteria / Verification */}
                <div className="p-3 bg-canvas border border-gray-100 rounded-lg text-xs space-y-1">
                  <span className="font-semibold text-gray-800 block text-[11px] uppercase tracking-wider">
                    Expected Deliverables & Acceptance:
                  </span>
                  <p className="text-gray-600 text-[11px] leading-relaxed">
                    {project.completionCriteria}
                  </p>
                </div>

                {/* Prerequisites Check */}
                <div className="text-[11px] flex items-center space-x-2 pt-1">
                  <span className="text-gray-500 font-medium">Stage 1 Readiness:</span>
                  {isStage1Complete ? (
                    <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Stage 1 Completed (Recommended to build now)</span>
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium flex items-center space-x-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Stage 1 In Progress ({subProg.completedActivities} / {subProg.totalActivities} completed)</span>
                    </span>
                  )}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectSubject(subject.id)}
                  className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                >
                  <span>Open Subject Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setSelectedActivityForModal(project)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-xs transition ${
                    isProjectCompleted
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-teal-800 text-white hover:bg-teal-900'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{isProjectCompleted ? 'Verified Deliverable' : 'Submit Deliverable'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Completion Modal */}
      <ActivityCompletionModal
        activity={selectedActivityForModal}
        isOpen={!!selectedActivityForModal}
        onClose={() => setSelectedActivityForModal(null)}
      />

    </div>
  );
};
