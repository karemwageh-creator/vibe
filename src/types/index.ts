export type ResourceType = 'course' | 'book' | 'practice' | 'project';

export type ResourceRole = 
  | 'primary_balanced'       // Primary recommendation — balanced core (Theory + Practice)
  | 'theory_focused'          // Rigorous theoretical depth
  | 'practice_focused'        // Substantive labs/assignments
  | 'deepening_advanced'      // Beyond baseline core
  | 'project_extension'       // Applied practical capstone/lab
  | 'alternative'             // Balanced alternative
  | 'book_companion';         // Authoritative reference book

export type AccessTerms = 'free' | 'free_audit' | 'paid' | 'open_access';

export interface EvidenceSource {
  name: string;
  url: string;
  note?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  role: ResourceRole;
  officialUrl: string;
  provider: string;           // E.g. MIT OpenCourseWare, Harvard CS50, UC Berkeley
  platform?: string;          // E.g. edX, Coursera, YouTube, Direct Author Website
  instructorOrAuthor: string;
  publisher?: string;         // E.g. MIT Press, Pearson, O'Reilly Media, Manning
  publicationYear?: number;
  edition?: string;
  format: string;             // E.g. "Video Lectures + Problem Sets", "Textbook (Assigned Ch 1-8)"
  description: string;
  language: string;
  accessTerms: AccessTerms;
  accessCostNote: string;
  isVerified: boolean;
  verifiedDate: string;       // ISO date format YYYY-MM-DD
  evidenceSources: EvidenceSource[];
  theoryRatingNote: string;
  practiceRatingNote: string;
  whyRecommended: string;
  coveredTopics: string[];
  knownGaps: string[];
  assignedChapters?: string;
  prerequisites?: string;
}

export interface Subject {
  id: string;
  curriculumOrder: number;   // 1 to 51 preserved strictly
  rawName: string;           // Supplied source name (e.g. "prob and stat", "mutli media")
  cleanName: string;         // Polished display title
  category: 'foundations' | 'systems' | 'software_eng' | 'applied_ai' | 'theory' | 'specialized';
  shortDescription: string;
  academicYear?: number | null; // Unassigned in MVP
  semester?: number | null;     // Unassigned in MVP
  topics: string[];
  learningOutcomes: string[];
  prerequisites: string[];   // Subject IDs
  hasCuratedResources: boolean;
  curatedResourceIds: string[];
}

export type ActivityKind = 
  | 'lesson'           // Reading / lecture
  | 'quiz_exercise'   // Short exercises
  | 'problem_set'      // Substantive problem set / coding assignment
  | 'lab'              // System lab / implementation
  | 'checkpoint'       // Subject mastery verification checkpoint
  | 'project';         // Applied end-of-stage project

export interface Activity {
  id: string;
  subjectId: string;
  stage: 0 | 1 | 2 | 3 | 'project';
  stageLabel: string;
  title: string;
  kind: ActivityKind;
  description: string;
  estimatedEffort: string;
  xpReward: number;
  associatedResourceId?: string;
  completionCriteria: string;
  deliverablePrompt?: string;
  order: number;
}

export interface ActivityProgress {
  activityId: string;
  subjectId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
  evidenceNote?: string;
  xpAwarded: boolean;
}

export interface XpEvent {
  id: string;
  activityId: string;
  subjectId: string;
  subjectName: string;
  activityTitle: string;
  kind: ActivityKind;
  xpAwarded: number;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string | null;
  category: 'getting_started' | 'problem_solving' | 'core_mastery' | 'projects' | 'consistency';
}

export interface StudentProfile {
  displayName: string;
  academicYear: 1 | 2 | 3 | 4;
  currentlyStudyingSubjectIds: string[];
  preferredFormat: 'all' | 'video_course' | 'book';
  accessPreference: 'all' | 'free_only';
  dailyGoalMinutes: number;
  lastActiveDate: string;
  streakDays: number;
}

export interface PlayerProgression {
  totalXp: number;
  level: number;
  levelTitle: string;
  currentLevelMinXp: number;
  nextLevelTargetXp: number;
  progressPercent: number;
}

export type NavigationTab = 'today' | 'curriculum' | 'subject' | 'projects' | 'progress';
