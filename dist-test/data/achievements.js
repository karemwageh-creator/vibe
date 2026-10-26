"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEVEL_TIERS = exports.INITIAL_ACHIEVEMENTS = void 0;
exports.INITIAL_ACHIEVEMENTS = [
    {
        id: 'ach-first-step',
        title: 'First Step into the Craft',
        description: 'Complete your first verified learning activity or lesson in the curriculum.',
        iconName: 'Footprints',
        category: 'getting_started',
        unlockedAt: null
    },
    {
        id: 'ach-problem-solver',
        title: 'Problem Solver',
        description: 'Complete and verify your first substantive problem set or programming assignment.',
        iconName: 'Code2',
        category: 'problem_solving',
        unlockedAt: null
    },
    {
        id: 'ach-systems-lab',
        title: 'Lab Practitioner',
        description: 'Complete your first hands-on systems or software lab with working implementation code.',
        iconName: 'FlaskConical',
        category: 'problem_solving',
        unlockedAt: null
    },
    {
        id: 'ach-core-competence',
        title: 'Core Competence Verified',
        description: 'Pass your first subject synthesis checkpoint to verify foundational theory and practice.',
        iconName: 'Award',
        category: 'core_mastery',
        unlockedAt: null
    },
    {
        id: 'ach-project-builder',
        title: 'Project Builder',
        description: 'Complete and document your first applied end-to-end subject project.',
        iconName: 'Rocket',
        category: 'projects',
        unlockedAt: null
    },
    {
        id: 'ach-consistency-streak',
        title: 'Consistent Scholar',
        description: 'Maintain study activity across consecutive days.',
        iconName: 'Flame',
        category: 'consistency',
        unlockedAt: null
    },
    {
        id: 'ach-curriculum-explorer',
        title: 'Curriculum Navigator',
        description: 'Select and track your current university subjects across the 51-subject catalog.',
        iconName: 'Compass',
        category: 'getting_started',
        unlockedAt: null
    }
];
exports.LEVEL_TIERS = [
    { level: 1, minXp: 0, maxXp: 150, title: 'CS Apprentice' },
    { level: 2, minXp: 151, maxXp: 400, title: 'Computational Explorer' },
    { level: 3, minXp: 401, maxXp: 800, title: 'Algorithmic Thinker' },
    { level: 4, minXp: 801, maxXp: 1400, title: 'Systems Implementer' },
    { level: 5, minXp: 1401, maxXp: 2200, title: 'Software Engineer' },
    { level: 6, minXp: 2201, maxXp: 3200, title: 'Architectural Analyst' },
    { level: 7, minXp: 3201, maxXp: 4500, title: 'Senior Problem Solver' },
    { level: 8, minXp: 4501, maxXp: 6000, title: 'Distributed Systems Specialist' },
    { level: 9, minXp: 6001, maxXp: 8000, title: 'Master Technologist' },
    { level: 10, minXp: 8001, maxXp: 99999, title: 'Computer Science Scholar' },
];
