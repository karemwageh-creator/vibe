import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Award, 
  FileCheck, 
  Layers, 
  BookOpen, 
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Activity, Resource } from '../../types';
import { CURRICULUM_SUBJECTS } from '../../data/curriculum';
import { CURATED_RESOURCES } from '../../data/resources';
import { SUBJECT_ACTIVITIES } from '../../data/stages';
import { useLearningStore } from '../../store/learningStore';
import { ResourceCard } from './ResourceCard';
import { ActivityCompletionModal } from './ActivityCompletionModal';

interface SubjectDetailViewProps {
  subjectId: string;
  onBack: () => void;
  onSelectSubject: (id: string) => void;
}

export const SubjectDetailView: React.FC<SubjectDetailViewProps> = ({
  subjectId,
  onBack,
  onSelectSubject
}) => {
  const { 
    profile, 
    progress, 
    toggleSubjectCurrentlyStudying, 
    startActivity,
    getSubjectProgress
  } = useLearningStore();

  const [activeStageTab, setActiveStageTab] = useState<1 | 2 | 'project'>(1);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<Activity | null>(null);

  const subject = CURRICULUM_SUBJECTS.find(s => s.id === subjectId);
  if (!subject) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <p className="text-gray-500">Subject not found in curriculum.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-teal-800 text-white rounded-lg text-xs font-semibold">
          Return to Curriculum
        </button>
      </div>
    );
  }

  const isCurrentlyStudying = profile.currentlyStudyingSubjectIds.includes(subject.id);
  const subjectProgress = getSubjectProgress(subject.id);

  // Curated resources matching this subject
  const subjectResources: Resource[] = subject.curatedResourceIds
    .map(id => CURATED_RESOURCES.find(r => r.id === id))
    .filter((r): r is Resource => !!r);

  // Group resources by role
  const primaryResources = subjectResources.filter(r => r.role === 'primary_balanced');
  const bookCompanions = subjectResources.filter(r => r.role === 'book_companion');
  const alternativeResources = subjectResources.filter(r => r.role === 'alternative' || r.role === 'theory_focused' || r.role === 'practice_focused');
  const deepeningResources = subjectResources.filter(r => r.role === 'deepening_advanced');

  // Filter activities for this subject
  const subjectActivities = SUBJECT_ACTIVITIES.filter(a => a.subjectId === subject.id);
  const stage1Activities = subjectActivities.filter(a => a.stage === 1).sort((a, b) => a.order - b.order);
  const stage2Activities = subjectActivities.filter(a => a.stage === 2).sort((a, b) => a.order - b.order);
  const projectActivity = subjectActivities.find(a => a.stage === 'project');

  // Prerequisites status
  const prerequisiteSubjects = subject.prerequisites.map(preId => {
    const preSub = CURRICULUM_SUBJECTS.find(s => s.id === preId);
    const preProg = preSub ? getSubjectProgress(preSub.id) : null;
    return {
      id: preId,
      name: preSub?.cleanName || preId,
      isCompleted: preProg ? preProg.stage1Complete : false
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Back button & Subject Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curriculum</span>
        </button>

        <span className="text-xs font-mono text-gray-400">
          Curriculum Position: #{subject.curriculumOrder} of 51
        </span>
      </div>

      {/* Main Subject Header Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-mono font-bold bg-gray-100 text-gray-700 rounded border border-gray-200">
                #{subject.curriculumOrder}
              </span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200 rounded capitalize">
                {subject.category.replace('_', ' ')}
              </span>
              {subject.hasCuratedResources ? (
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Curated Learning Path Ready</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 rounded">
                  Resources in Curation
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {subject.cleanName}
            </h1>

            {subject.cleanName.toLowerCase() !== subject.rawName.toLowerCase() && (
              <p className="text-xs text-gray-500 italic">
                Source curriculum title: <span className="font-mono">{subject.rawName}</span>
              </p>
            )}

            <p className="text-sm text-gray-700 max-w-3xl leading-relaxed pt-1">
              {subject.shortDescription}
            </p>
          </div>

          {/* Toggle Studying Action Button */}
          <div className="shrink-0 flex flex-col items-start md:items-end space-y-2">
            <button
              onClick={() => toggleSubjectCurrentlyStudying(subject.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition shadow-xs ${
                isCurrentlyStudying
                  ? 'bg-teal-700 text-white hover:bg-teal-800 border border-teal-800'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isCurrentlyStudying ? 'fill-white' : ''}`} />
              <span>{isCurrentlyStudying ? 'Currently Studying (Active Focus)' : 'Mark as Currently Studying'}</span>
            </button>

            {isCurrentlyStudying && (
              <span className="text-[11px] text-teal-700 font-medium">
                ★ Prioritized in your daily Today dashboard
              </span>
            )}
          </div>

        </div>

        {/* Prerequisites Row if any */}
        {prerequisiteSubjects.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-gray-700">Prerequisites:</span>
            {prerequisiteSubjects.map((pre) => (
              <button
                key={pre.id}
                onClick={() => onSelectSubject(pre.id)}
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md border text-xs transition ${
                  pre.isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span>{pre.name}</span>
                {pre.isCompleted ? (
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                ) : (
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* If Subject is Uncurated: Honest Curation Pending State */}
      {!subject.hasCuratedResources ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-xs text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-lg font-bold text-gray-900">
              Verified Resources in Curation
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              In accordance with EVOLVE’s evidence-based curation standards, we only publish courses and literature that have been personally inspected for theoretical rigor, verifiable problem sets, and reputable publisher sources.
            </p>
          </div>

          {/* Syllabus Topics & Outcomes available for the subject */}
          <div className="max-w-2xl mx-auto text-left bg-canvas border border-gray-200 rounded-lg p-5 space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
                Expected Core Curriculum Topics:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {subject.topics.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white text-gray-800 text-xs rounded border border-gray-200 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {subject.learningOutcomes.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">
                  Target Learning Outcomes:
                </h4>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                  {subject.learningOutcomes.map((lo, i) => (
                    <li key={i}>{lo}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500">
            You can still mark <strong className="text-gray-800">{subject.cleanName}</strong> as "Currently Studying" to organize your university coursework.
          </div>
        </div>
      ) : (
        /* Curated Subject Content with Progressive Stages */
        <div className="space-y-6">
          
          {/* Stage Selection Tabs */}
          <div className="flex border-b border-gray-200 space-x-1 sm:space-x-4">
            
            <button
              onClick={() => setActiveStageTab(1)}
              className={`pb-3 px-3 text-sm font-semibold border-b-2 transition flex items-center space-x-2 ${
                activeStageTab === 1
                  ? 'border-teal-700 text-teal-900'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Stage 1: Core Competence (Primary)</span>
              {subjectProgress.stage1Complete && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
              )}
            </button>

            {stage2Activities.length > 0 && (
              <button
                onClick={() => setActiveStageTab(2)}
                className={`pb-3 px-3 text-sm font-semibold border-b-2 transition flex items-center space-x-2 ${
                  activeStageTab === 2
                    ? 'border-teal-700 text-teal-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Stage 2: Deeper Theory & Practice</span>
              </button>
            )}

            {projectActivity && (
              <button
                onClick={() => setActiveStageTab('project')}
                className={`pb-3 px-3 text-sm font-semibold border-b-2 transition flex items-center space-x-2 ${
                  activeStageTab === 'project'
                    ? 'border-teal-700 text-teal-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Applied Project Extension</span>
                {subjectProgress.projectCompleted && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                )}
              </button>
            )}

          </div>

          {/* TAB 1: STAGE 1 CORE COMPETENCE */}
          {activeStageTab === 1 && (
            <div className="space-y-6">
              
              {/* Stage Goal Box */}
              <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-teal-950">
                    Stage 1 Goal — Baseline Theory Plus Practical Problem-Solving
                  </h3>
                  <span className="text-xs font-semibold text-teal-800">
                    {subjectProgress.completedActivities} / {stage1Activities.length} Completed
                  </span>
                </div>
                <p className="text-xs text-teal-900 leading-relaxed">
                  <strong>Exit Outcome:</strong> You can explain the core ideas without hand-waving, solve representative problem sets, and write verified code without merely copying examples.
                </p>
              </div>

              {/* Verified Ranked Resources */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Ranked Curated Resources ({subjectResources.length})
                  </h3>
                  <span className="text-xs text-gray-500">
                    Sorted by theory/practice balance & academic evidence
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Primary Balanced Courses First */}
                  {primaryResources.map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}

                  {/* Book Companions */}
                  {bookCompanions.map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}

                  {/* Alternatives */}
                  {alternativeResources.map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}
                </div>
              </div>

              {/* Stage 1 Activities Checklist */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                      Stage 1 Learning & Problem-Solving Activities
                    </h3>
                    <p className="text-xs text-gray-500">
                      Meaningful activities award XP only once upon verified first-time completion
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {stage1Activities.map((activity) => {
                    const actProgress = progress[activity.id];
                    const isCompleted = actProgress?.status === 'completed';
                    const isInProgress = actProgress?.status === 'in_progress';

                    return (
                      <div
                        key={activity.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isCompleted
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : isInProgress
                            ? 'bg-white border-teal-300 ring-1 ring-teal-300/30'
                            : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                                activity.kind === 'checkpoint'
                                  ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                  : activity.kind === 'problem_set'
                                  ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                  : activity.kind === 'lab'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {activity.kind.replace('_', ' ')}
                              </span>
                              <span className="text-xs text-gray-500 font-mono flex items-center space-x-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span>{activity.estimatedEffort}</span>
                              </span>
                              <span className="text-xs font-bold text-teal-800">
                                +{activity.xpReward} XP
                              </span>
                            </div>

                            <h4 className={`text-sm font-bold ${isCompleted ? 'text-emerald-950' : 'text-gray-900'}`}>
                              {activity.title}
                            </h4>

                            <p className="text-xs text-gray-600 leading-relaxed">
                              {activity.description}
                            </p>

                            {/* Saved Evidence note if completed */}
                            {isCompleted && actProgress?.evidenceNote && (
                              <div className="mt-2 p-2 bg-emerald-100/50 rounded text-[11px] text-emerald-900 font-mono">
                                <strong>Your verification notes:</strong> {actProgress.evidenceNote}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="shrink-0 flex items-center space-x-2">
                            {isCompleted ? (
                              <button
                                onClick={() => setSelectedActivityForModal(activity)}
                                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/70 rounded-lg border border-emerald-300 transition"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Completed ({activity.xpReward} XP)</span>
                              </button>
                            ) : (
                              <>
                                {!isInProgress && (
                                  <button
                                    onClick={() => startActivity(activity.id)}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-lg transition"
                                  >
                                    Start
                                  </button>
                                )}
                                <button
                                  onClick={() => setSelectedActivityForModal(activity)}
                                  className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition"
                                >
                                  <FileCheck className="w-3.5 h-3.5" />
                                  <span>{isInProgress ? 'Submit & Verify' : 'Complete'}</span>
                                </button>
                              </>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: STAGE 2 DEEPER THEORY & PRACTICE */}
          {activeStageTab === 2 && (
            <div className="space-y-6">
              <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl space-y-1">
                <h3 className="text-sm font-bold text-purple-950">
                  Stage 2 Goal — Deeper Mathematical Proofs, Harder Edge Cases & Low-Level Mechanics
                </h3>
                <p className="text-xs text-purple-900 leading-relaxed">
                  Extends core competence with advanced literature and challenging implementation assignments. Recommended once Stage 1 is mastered.
                </p>
              </div>

              {/* Deepening Curated Resources */}
              {deepeningResources.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Advanced Deepening Literature
                  </h3>
                  {deepeningResources.map(res => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}
                </div>
              )}

              {/* Stage 2 Activities */}
              <div className="space-y-3">
                {stage2Activities.map((activity) => {
                  const actProgress = progress[activity.id];
                  const isCompleted = actProgress?.status === 'completed';

                  return (
                    <div
                      key={activity.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isCompleted ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider bg-purple-100 text-purple-900">
                              {activity.kind.replace('_', ' ')}
                            </span>
                            <span className="text-xs font-bold text-teal-800">
                              +{activity.xpReward} XP
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-gray-900">{activity.title}</h4>
                          <p className="text-xs text-gray-600">{activity.description}</p>
                        </div>

                        <button
                          onClick={() => setSelectedActivityForModal(activity)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                            isCompleted 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                              : 'bg-teal-800 text-white hover:bg-teal-900'
                          }`}
                        >
                          {isCompleted ? 'Completed' : 'Complete Activity'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: APPLIED PROJECT EXTENSION */}
          {activeStageTab === 'project' && projectActivity && (
            <div className="space-y-6">
              
              {/* Project Unlocking Notice */}
              <div className={`p-4 rounded-xl border space-y-2 ${
                subjectProgress.stage1Complete
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                <div className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-teal-700" />
                  <h3 className="text-sm font-bold">
                    {subjectProgress.stage1Complete
                      ? 'Stage 1 Core Complete — Applied Project Recommended'
                      : 'Stage 1 In Progress — Complete Core Checkpoint First'}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed">
                  Projects are not meant for copy-pasting tutorials. A true project extension requires synthesizing theory, designing tests, and delivering a functional, demonstrable artifact.
                </p>
              </div>

              {/* Project Specification Box */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider bg-amber-100 text-amber-900">
                      Applied Subject Project
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">
                      {projectActivity.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 text-xs font-bold bg-teal-700 text-white rounded">
                      +{projectActivity.xpReward} XP
                    </span>
                    <span className="block text-[11px] text-gray-500 mt-0.5">
                      Est. Effort: {projectActivity.estimatedEffort}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Project Brief & Architectural Requirements:
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {projectActivity.description}
                  </p>
                </div>

                <div className="space-y-1.5 p-3 bg-canvas border border-gray-200 rounded-lg text-xs">
                  <span className="font-semibold text-gray-900 block">
                    Deliverable & Completion Verification Criteria:
                  </span>
                  <p className="text-gray-700">{projectActivity.completionCriteria}</p>
                  {projectActivity.deliverablePrompt && (
                    <p className="text-teal-900 font-mono text-[11px] pt-1">
                      Deliverable prompt: {projectActivity.deliverablePrompt}
                    </p>
                  )}
                </div>

                {/* Completion Action */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedActivityForModal(projectActivity)}
                    className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>
                      {progress[projectActivity.id]?.status === 'completed' 
                        ? 'Update Project Evidence Notes' 
                        : 'Submit Project Deliverable & Verify'}
                    </span>
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* Completion Modal */}
      <ActivityCompletionModal
        activity={selectedActivityForModal}
        isOpen={!!selectedActivityForModal}
        onClose={() => setSelectedActivityForModal(null)}
      />

    </div>
  );
};
