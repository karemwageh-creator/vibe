import React from 'react';
import { 
  ArrowRight, 
  Bookmark, 
  Award, 
  Clock, 
  CheckCircle2, 
  Layers, 
  GraduationCap,
  Flame,
  Check
} from 'lucide-react';
import { useLearningStore } from '../../store/learningStore';
import { CURRICULUM_SUBJECTS } from '../../data/curriculum';

interface DashboardViewProps {
  onSelectSubject: (subjectId: string) => void;
  onOpenProfileModal: () => void;
  onNavigateToCurriculum: () => void;
  onNavigateToProjects: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectSubject,
  onOpenProfileModal,
  onNavigateToProjects,
}) => {
  const { 
    profile, 
    totalXp, 
    playerProgression, 
    getSubjectProgress,
    getPrioritizedRecommendations,
    achievements
  } = useLearningStore();

  const currentSubjects = profile.currentlyStudyingSubjectIds
    .map(id => CURRICULUM_SUBJECTS.find(s => s.id === id))
    .filter((s): s is NonNullable<typeof s> => !!s);

  const {
    topNextActivity,
    currentSubjectProjectsReady
  } = getPrioritizedRecommendations();

  const unlockedAchievementsCount = achievements.filter(a => !!a.unlockedAt).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Academic Focus Banner (University Standing vs Focus) */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-teal-800" />
            <h2 className="text-base font-bold text-gray-900">
              {profile.displayName} — Year {profile.academicYear} Computer Science Focus
            </h2>
          </div>
          <p className="text-xs text-gray-600">
            {currentSubjects.length > 0 ? (
              <span>
                Currently studying <strong>{currentSubjects.length} subjects</strong> this term. Recommendations below prioritize their Stage 1 core competence.
              </span>
            ) : (
              <span>
                No subjects marked as currently studying. Choose your active term subjects from the 51-subject curriculum.
              </span>
            )}
          </p>
        </div>

        <button
          onClick={onOpenProfileModal}
          className="shrink-0 px-3.5 py-1.5 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition"
        >
          Change Current Subjects / Year
        </button>
      </div>

      {/* Empty State: If no current subjects selected */}
      {currentSubjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-800 mx-auto flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-base font-bold text-gray-900">
              Select Your Active CS Subjects
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Because EVOLVE’s 51 subjects are unassigned to semesters, EVOLVE prioritizes recommendations based on the subjects you are taking right now.
            </p>
          </div>
          <button
            onClick={onOpenProfileModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg shadow-xs transition"
          >
            Select Current Subjects
          </button>
        </div>
      ) : (
        <>
          {/* 2. Top Immediate Recommendation Hero Card (Priority 1: Core Stage 1) */}
          {topNextActivity ? (
            <div className="bg-gradient-to-br from-teal-900 to-teal-950 text-white rounded-2xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-teal-800/80 text-teal-200 border border-teal-700 rounded">
                    Top Recommended Action
                  </span>
                  <span className="text-xs text-teal-300 font-medium">
                    Priority 1 • Core Stage 1 Competence for Current Subject
                  </span>
                </div>

                <div className="space-y-1 max-w-3xl">
                  <span className="text-xs text-teal-300 font-semibold uppercase tracking-wider block">
                    {topNextActivity.subject.cleanName} (Curriculum #{topNextActivity.subject.curriculumOrder})
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                    {topNextActivity.activity.title}
                  </h3>
                  <p className="text-xs text-teal-100/90 leading-relaxed pt-1">
                    {topNextActivity.activity.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-teal-200">
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>Est. {topNextActivity.activity.estimatedEffort}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-400" />
                    <span className="font-bold text-white">+{topNextActivity.activity.xpReward} XP upon first verification</span>
                  </span>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectSubject(topNextActivity.subject.id)}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-teal-950 hover:bg-teal-50 text-xs font-bold rounded-lg shadow-sm transition"
                  >
                    <span>Open Subject Learning Path</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <div className="text-xs">
                <span className="font-bold block">All Core Stage 1 Activities Completed!</span>
                You have completed baseline core competence for all your active subjects. Explore applied project extensions or deepening topics below.
              </div>
            </div>
          )}

          {/* 3. Active Subjects Grid & Stage Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Active Study Focus ({currentSubjects.length})
              </h3>
              <span className="text-xs text-gray-500">
                Stage 1 completion unlocks verified applied projects
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSubjects.map((sub) => {
                const subProg = getSubjectProgress(sub.id);

                return (
                  <div
                    key={sub.id}
                    onClick={() => onSelectSubject(sub.id)}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-gray-400">
                          #{sub.curriculumOrder}
                        </span>
                        {subProg.stage1Complete ? (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded flex items-center space-x-1">
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                            <span>Stage 1 Core Done</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-teal-50 text-teal-800 border border-teal-200 rounded">
                            Stage 1 In Progress
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-gray-900 line-clamp-1">
                        {sub.cleanName}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {sub.shortDescription}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Activities completed:</span>
                        <span className="font-semibold text-gray-900">
                          {subProg.completedActivities} / {subProg.totalActivities}
                        </span>
                      </div>

                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            subProg.stage1Complete ? 'bg-emerald-600' : 'bg-teal-700'
                          }`}
                          style={{ width: `${subProg.percentComplete}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Applied Projects Spotlight (Section 6 & 7: Surfaced when Stage 1 is complete) */}
          {currentSubjectProjectsReady.length > 0 && (
            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-amber-800" />
                  <h3 className="text-sm font-bold text-amber-950">
                    Applied Projects Ready for Current Subjects
                  </h3>
                </div>
                <button
                  onClick={onNavigateToProjects}
                  className="text-xs font-semibold text-amber-900 hover:underline"
                >
                  View All Projects →
                </button>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                You have demonstrated baseline competence in Stage 1! The following practical project extensions are ready to build:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {currentSubjectProjectsReady.map(({ activity, subject }) => (
                  <div
                    key={activity.id}
                    onClick={() => onSelectSubject(subject.id)}
                    className="p-3 bg-white border border-amber-200 rounded-lg hover:border-amber-400 cursor-pointer transition text-xs space-y-1"
                  >
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                      {subject.cleanName}
                    </span>
                    <h5 className="font-bold text-gray-900">{activity.title}</h5>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-gray-500">
                      <span>Est. {activity.estimatedEffort}</span>
                      <span className="font-bold text-teal-800">+{activity.xpReward} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </>
      )}

      {/* 5. Separate Gamification & Progression Panel (Section 8 Rule: Must be clearly separate) */}
      <div className="bg-canvas border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-teal-700" />
              <span>Player Level & Study Progression</span>
            </h3>
            <p className="text-[11px] text-gray-500">
              Independent motivational system earned exclusively through legitimate activity completions
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
            {totalXp} Total XP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Level Progress */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Player Level
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-gray-900">
                Lvl {playerProgression.level}
              </span>
              <span className="text-xs font-medium text-teal-800">
                {playerProgression.levelTitle}
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-teal-700 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${playerProgression.progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400 block text-right font-mono">
                {totalXp} / {playerProgression.nextLevelTargetXp} XP to next level
              </span>
            </div>
          </div>

          {/* Consistency Streak */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Study Streak
            </span>
            <div className="flex items-center space-x-2">
              <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
              <span className="text-2xl font-extrabold text-gray-900">
                {profile.streakDays} Day{profile.streakDays > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-[10px] text-gray-500 leading-tight">
              Calculated on genuine daily activity. Breaks never delete earned XP or completed stages.
            </p>
          </div>

          {/* Achievements */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Verified Achievements
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-extrabold text-gray-900">
                {unlockedAchievementsCount}
              </span>
              <span className="text-xs text-gray-400">/ {achievements.length} unlocked</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-tight">
              Awarded for solving first problem set, passing checkpoints, and completing projects.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
