"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePlayerLevel = calculatePlayerLevel;
exports.useLearningStore = useLearningStore;
const react_1 = require("react");
const curriculum_1 = require("../data/curriculum");
const stages_1 = require("../data/stages");
const achievements_1 = require("../data/achievements");
const STORAGE_KEYS = {
    PROFILE: 'evolve_student_profile_v1',
    PROGRESS: 'evolve_activity_progress_v1',
    XP_LEDGER: 'evolve_xp_ledger_v1',
    ACHIEVEMENTS: 'evolve_achievements_v1',
};
const DEFAULT_PROFILE = {
    displayName: 'Alex Mercer',
    academicYear: 2,
    currentlyStudyingSubjectIds: ['intro-to-cs', 'data-structures'],
    preferredFormat: 'all',
    accessPreference: 'all',
    dailyGoalMinutes: 45,
    lastActiveDate: new Date().toISOString().split('T')[0],
    streakDays: 1
};
function calculatePlayerLevel(totalXp) {
    for (let i = achievements_1.LEVEL_TIERS.length - 1; i >= 0; i--) {
        const tier = achievements_1.LEVEL_TIERS[i];
        if (totalXp >= tier.minXp) {
            const nextTier = achievements_1.LEVEL_TIERS[i + 1] || null;
            const min = tier.minXp;
            const target = nextTier ? nextTier.minXp : tier.maxXp;
            const range = target - min;
            const earned = totalXp - min;
            const progressPercent = Math.min(100, Math.max(0, Math.round((earned / (range || 1)) * 100)));
            return {
                totalXp,
                level: tier.level,
                levelTitle: tier.title,
                currentLevelMinXp: min,
                nextLevelTargetXp: target,
                progressPercent: nextTier ? progressPercent : 100
            };
        }
    }
    return {
        totalXp: 0,
        level: 1,
        levelTitle: achievements_1.LEVEL_TIERS[0].title,
        currentLevelMinXp: 0,
        nextLevelTargetXp: achievements_1.LEVEL_TIERS[1].minXp,
        progressPercent: 0
    };
}
const listeners = new Set();
function notifyAll() {
    listeners.forEach(l => l());
}
function loadFromStorage(key, fallback) {
    try {
        if (typeof localStorage === 'undefined')
            return fallback;
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
    }
    catch (err) {
        console.error(`Error loading ${key} from storage:`, err);
        return fallback;
    }
}
function saveToStorage(key, data) {
    try {
        if (typeof localStorage === 'undefined')
            return;
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (err) {
        console.error(`Error saving ${key} to storage:`, err);
    }
}
let profileState = loadFromStorage(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
let progressState = loadFromStorage(STORAGE_KEYS.PROGRESS, {});
let xpLedgerState = loadFromStorage(STORAGE_KEYS.XP_LEDGER, []);
let achievementsState = loadFromStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements_1.INITIAL_ACHIEVEMENTS);
// Check and maintain calendar streak
function checkAndUpdateStreak(currentProfile) {
    const todayStr = new Date().toISOString().split('T')[0];
    const lastActiveStr = currentProfile.lastActiveDate;
    if (lastActiveStr === todayStr) {
        return currentProfile;
    }
    const lastDate = new Date(lastActiveStr);
    const today = new Date(todayStr);
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let newStreak = currentProfile.streakDays;
    if (diffDays === 1) {
        newStreak += 1;
    }
    else if (diffDays > 1) {
        newStreak = 1;
    }
    const updated = {
        ...currentProfile,
        lastActiveDate: todayStr,
        streakDays: newStreak
    };
    saveToStorage(STORAGE_KEYS.PROFILE, updated);
    return updated;
}
profileState = checkAndUpdateStreak(profileState);
function useLearningStore() {
    const [, setTick] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const listener = () => setTick(t => t + 1);
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    }, []);
    const totalXp = xpLedgerState.reduce((sum, ev) => sum + ev.xpAwarded, 0);
    const playerProgression = calculatePlayerLevel(totalXp);
    // Update student profile
    const updateProfile = (updates) => {
        profileState = { ...profileState, ...updates };
        saveToStorage(STORAGE_KEYS.PROFILE, profileState);
        notifyAll();
    };
    // Toggle Currently Studying for any of the 51 subjects
    const toggleSubjectCurrentlyStudying = (subjectId) => {
        const current = profileState.currentlyStudyingSubjectIds;
        const exists = current.includes(subjectId);
        const updated = exists
            ? current.filter(id => id !== subjectId)
            : [...current, subjectId];
        updateProfile({ currentlyStudyingSubjectIds: updated });
        if (!exists && updated.length >= 1) {
            unlockAchievement('ach-curriculum-explorer');
        }
    };
    // Start activity
    const startActivity = (activityId) => {
        const existing = progressState[activityId];
        if (existing?.status === 'completed')
            return;
        const activity = stages_1.SUBJECT_ACTIVITIES.find(a => a.id === activityId);
        if (!activity)
            return;
        progressState = {
            ...progressState,
            [activityId]: {
                activityId,
                subjectId: activity.subjectId,
                status: 'in_progress',
                startedAt: existing?.startedAt || new Date().toISOString(),
                xpAwarded: existing?.xpAwarded || false,
                evidenceNote: existing?.evidenceNote
            }
        };
        saveToStorage(STORAGE_KEYS.PROGRESS, progressState);
        notifyAll();
    };
    // Authoritative, idempotent completion & XP award
    const completeActivity = (activityId, evidenceNote) => {
        const existing = progressState[activityId];
        // Idempotency check: if already completed and XP awarded, do NOT re-award XP!
        if (existing?.status === 'completed' && existing.xpAwarded) {
            // Just update evidence note if edited
            if (evidenceNote !== undefined && evidenceNote !== existing.evidenceNote) {
                progressState = {
                    ...progressState,
                    [activityId]: {
                        ...existing,
                        evidenceNote
                    }
                };
                saveToStorage(STORAGE_KEYS.PROGRESS, progressState);
                notifyAll();
            }
            return;
        }
        const activity = stages_1.SUBJECT_ACTIVITIES.find(a => a.id === activityId);
        if (!activity)
            return;
        const subject = curriculum_1.CURRICULUM_SUBJECTS.find(s => s.id === activity.subjectId);
        const nowIso = new Date().toISOString();
        // Verify against XP ledger to be 100% certain this activity was never credited before
        const alreadyInLedger = xpLedgerState.some(ev => ev.activityId === activityId);
        const awardAmount = alreadyInLedger ? 0 : activity.xpReward;
        // Update progress state
        progressState = {
            ...progressState,
            [activityId]: {
                activityId,
                subjectId: activity.subjectId,
                status: 'completed',
                startedAt: existing?.startedAt || nowIso,
                completedAt: nowIso,
                evidenceNote: evidenceNote || existing?.evidenceNote,
                xpAwarded: true
            }
        };
        saveToStorage(STORAGE_KEYS.PROGRESS, progressState);
        // If eligible for first-time XP, write immutable event to ledger
        if (awardAmount > 0) {
            const newEvent = {
                id: `xp-ev-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                activityId: activity.id,
                subjectId: activity.subjectId,
                subjectName: subject?.cleanName || activity.subjectId,
                activityTitle: activity.title,
                kind: activity.kind,
                xpAwarded: awardAmount,
                timestamp: nowIso
            };
            xpLedgerState = [newEvent, ...xpLedgerState];
            saveToStorage(STORAGE_KEYS.XP_LEDGER, xpLedgerState);
            // Trigger achievement evaluations
            evaluateAchievementsAfterCompletion(activity);
        }
        notifyAll();
    };
    // Evaluate achievements on completion
    const evaluateAchievementsAfterCompletion = (activity) => {
        // 1. First learning activity
        unlockAchievement('ach-first-step');
        // 2. First problem set
        if (activity.kind === 'problem_set') {
            unlockAchievement('ach-problem-solver');
        }
        // 3. First lab
        if (activity.kind === 'lab') {
            unlockAchievement('ach-systems-lab');
        }
        // 4. First checkpoint (Core mastery)
        if (activity.kind === 'checkpoint') {
            unlockAchievement('ach-core-competence');
        }
        // 5. First applied project
        if (activity.kind === 'project' || activity.stage === 'project') {
            unlockAchievement('ach-project-builder');
        }
        // 6. Streak consistency
        if (profileState.streakDays >= 2) {
            unlockAchievement('ach-consistency-streak');
        }
    };
    const unlockAchievement = (achId) => {
        let changed = false;
        achievementsState = achievementsState.map(ach => {
            if (ach.id === achId && !ach.unlockedAt) {
                changed = true;
                return { ...ach, unlockedAt: new Date().toISOString() };
            }
            return ach;
        });
        if (changed) {
            saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievementsState);
        }
    };
    // Helper: Get subject progress analytics
    const getSubjectProgress = (subjectId) => {
        const activities = stages_1.SUBJECT_ACTIVITIES.filter(a => a.subjectId === subjectId);
        if (activities.length === 0) {
            return {
                totalActivities: 0,
                completedActivities: 0,
                percentComplete: 0,
                stage1Complete: false,
                hasProject: false,
                projectCompleted: false
            };
        }
        const stage1Activities = activities.filter(a => a.stage === 1);
        const stage1Completed = stage1Activities.filter(a => progressState[a.id]?.status === 'completed');
        const isStage1Complete = stage1Activities.length > 0 && stage1Completed.length === stage1Activities.length;
        const completed = activities.filter(a => progressState[a.id]?.status === 'completed');
        const percent = Math.round((completed.length / activities.length) * 100);
        const projectActivity = activities.find(a => a.stage === 'project');
        const projectCompleted = projectActivity ? progressState[projectActivity.id]?.status === 'completed' : false;
        return {
            totalActivities: activities.length,
            completedActivities: completed.length,
            percentComplete: percent,
            stage1Complete: isStage1Complete,
            hasProject: !!projectActivity,
            projectCompleted
        };
    };
    // Helper: Prioritized recommendations following Section 7 of the brief
    const getPrioritizedRecommendations = () => {
        const currentSubjectIds = profileState.currentlyStudyingSubjectIds;
        // 1. Stage 1 incomplete activities for Currently Studying subjects (Highest priority)
        const currentSubjectStage1Incomplete = [];
        // 2. Project extensions for current subjects whose Stage 1 is complete
        const currentSubjectProjectsReady = [];
        // 3. Stage 2 deepening for completed current subjects
        const currentSubjectStage2 = [];
        // 4. Other subjects with curated resources
        const otherSubjectsStage1 = [];
        // Process currently studying subjects in priority
        currentSubjectIds.forEach(subId => {
            const subject = curriculum_1.CURRICULUM_SUBJECTS.find(s => s.id === subId);
            if (!subject)
                return;
            const activities = stages_1.SUBJECT_ACTIVITIES.filter(a => a.subjectId === subId).sort((a, b) => a.order - b.order);
            const subProg = getSubjectProgress(subId);
            // Incomplete Stage 1
            activities.filter(a => a.stage === 1 && progressState[a.id]?.status !== 'completed')
                .forEach(activity => currentSubjectStage1Incomplete.push({ activity, subject }));
            // Ready projects
            if (subProg.stage1Complete) {
                activities.filter(a => a.stage === 'project' && progressState[a.id]?.status !== 'completed')
                    .forEach(activity => currentSubjectProjectsReady.push({ activity, subject }));
                activities.filter(a => a.stage === 2 && progressState[a.id]?.status !== 'completed')
                    .forEach(activity => currentSubjectStage2.push({ activity, subject }));
            }
        });
        // Other subjects not in currently studying
        curriculum_1.CURRICULUM_SUBJECTS.filter(s => !currentSubjectIds.includes(s.id) && s.hasCuratedResources)
            .forEach(subject => {
            const activities = stages_1.SUBJECT_ACTIVITIES.filter(a => a.subjectId === subject.id && a.stage === 1 && progressState[a.id]?.status !== 'completed');
            activities.forEach(activity => otherSubjectsStage1.push({ activity, subject }));
        });
        return {
            topNextActivity: currentSubjectStage1Incomplete[0] || currentSubjectProjectsReady[0] || otherSubjectsStage1[0] || null,
            currentSubjectStage1Incomplete,
            currentSubjectProjectsReady,
            currentSubjectStage2,
            otherSubjectsStage1
        };
    };
    // Full reset for testing / evaluation
    const resetAllData = () => {
        localStorage.removeItem(STORAGE_KEYS.PROFILE);
        localStorage.removeItem(STORAGE_KEYS.PROGRESS);
        localStorage.removeItem(STORAGE_KEYS.XP_LEDGER);
        localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
        profileState = { ...DEFAULT_PROFILE };
        progressState = {};
        xpLedgerState = [];
        achievementsState = achievements_1.INITIAL_ACHIEVEMENTS.map(a => ({ ...a, unlockedAt: null }));
        saveToStorage(STORAGE_KEYS.PROFILE, profileState);
        saveToStorage(STORAGE_KEYS.PROGRESS, progressState);
        saveToStorage(STORAGE_KEYS.XP_LEDGER, xpLedgerState);
        saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievementsState);
        notifyAll();
    };
    // Export JSON backup
    const exportDataJson = () => {
        const payload = {
            profile: profileState,
            progress: progressState,
            xpLedger: xpLedgerState,
            achievements: achievementsState,
            exportedAt: new Date().toISOString()
        };
        return JSON.stringify(payload, null, 2);
    };
    // Import JSON backup
    const importDataJson = (jsonString) => {
        try {
            const data = JSON.parse(jsonString);
            if (data.profile) {
                profileState = data.profile;
                saveToStorage(STORAGE_KEYS.PROFILE, profileState);
            }
            if (data.progress) {
                progressState = data.progress;
                saveToStorage(STORAGE_KEYS.PROGRESS, progressState);
            }
            if (data.xpLedger) {
                xpLedgerState = data.xpLedger;
                saveToStorage(STORAGE_KEYS.XP_LEDGER, xpLedgerState);
            }
            if (data.achievements) {
                achievementsState = data.achievements;
                saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievementsState);
            }
            notifyAll();
            return true;
        }
        catch (err) {
            console.error('Failed to parse import JSON:', err);
            return false;
        }
    };
    return {
        profile: profileState,
        progress: progressState,
        xpLedger: xpLedgerState,
        achievements: achievementsState,
        totalXp,
        playerProgression,
        updateProfile,
        toggleSubjectCurrentlyStudying,
        startActivity,
        completeActivity,
        getSubjectProgress,
        getPrioritizedRecommendations,
        resetAllData,
        exportDataJson,
        importDataJson
    };
}
