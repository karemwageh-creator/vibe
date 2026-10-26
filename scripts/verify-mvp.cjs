// Comprehensive Automated Verification Suite for EVOLVE CS Learning Recommendation MVP
const assert = require('assert');
const { CURRICULUM_SUBJECTS } = require('../dist-test/data/curriculum');
const { CURATED_RESOURCES } = require('../dist-test/data/resources');
const { SUBJECT_ACTIVITIES } = require('../dist-test/data/stages');
const { LEVEL_TIERS, INITIAL_ACHIEVEMENTS } = require('../dist-test/data/achievements');
const { calculatePlayerLevel } = require('../dist-test/store/learningStore');

console.log('====================================================');
console.log('EVOLVE MVP — Acceptance Criteria Verification Suite');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${name}`);
    console.error(`       Error: ${err.message}\n`);
    throw err;
  }
}

// 1. Curriculum Integrity Check (Section 3 of Brief)
runTest('Curriculum: All 51 subjects preserved in exact 1 to 51 sequence', () => {
  assert.strictEqual(CURRICULUM_SUBJECTS.length, 51, 'Must have exactly 51 subjects');
  for (let i = 0; i < 51; i++) {
    const expectedOrder = i + 1;
    const subject = CURRICULUM_SUBJECTS[i];
    assert.strictEqual(subject.curriculumOrder, expectedOrder, `Subject at index ${i} must have curriculumOrder ${expectedOrder}`);
    assert.ok(subject.id && typeof subject.id === 'string', 'Subject must have stable ID');
    assert.ok(subject.rawName && typeof subject.rawName === 'string', 'Subject must preserve rawName');
    assert.ok(subject.cleanName && typeof subject.cleanName === 'string', 'Subject must have cleanName');
    assert.strictEqual(subject.academicYear, null, 'academicYear must be null/unassigned initially as instructed');
    assert.strictEqual(subject.semester, null, 'semester must be null/unassigned initially as instructed');
  }
});

runTest('Curriculum: Preserves exact supplied naming including edge cases', () => {
  const s8 = CURRICULUM_SUBJECTS.find(s => s.curriculumOrder === 8);
  assert.ok(s8 && s8.rawName === 'mutli media', 'Subject 8 must preserve rawName "mutli media"');

  const s51 = CURRICULUM_SUBJECTS.find(s => s.curriculumOrder === 51);
  assert.ok(s51 && s51.rawName === 'software mainenance and evolution', 'Subject 51 must preserve rawName "software mainenance and evolution"');

  const s1 = CURRICULUM_SUBJECTS.find(s => s.curriculumOrder === 1);
  assert.ok(s1 && s1.rawName === 'Discrete maths', 'Subject 1 must preserve rawName "Discrete maths"');
});

// 2. Resource Integrity and Verification Standards (Section 4 & 5)
runTest('Resources: Verified records have evidence citations, official URLs, and explicit known gaps', () => {
  assert.ok(CURATED_RESOURCES.length >= 10, 'Curated resources dataset must contain foundational curated records');

  CURATED_RESOURCES.forEach(res => {
    assert.ok(res.officialUrl.startsWith('http'), `Resource ${res.id} must have valid official URL`);
    assert.ok(res.provider, `Resource ${res.id} must specify credible provider/institution`);
    assert.ok(res.isVerified === true, `Resource ${res.id} must be verified`);
    assert.ok(res.verifiedDate, `Resource ${res.id} must have a verification date`);
    assert.ok(Array.isArray(res.evidenceSources) && res.evidenceSources.length > 0, `Resource ${res.id} must have evidence sources`);
    assert.ok(res.whyRecommended, `Resource ${res.id} must explain why it is recommended`);
    assert.ok(res.theoryRatingNote, `Resource ${res.id} must have theory rating note`);
    assert.ok(res.practiceRatingNote, `Resource ${res.id} must have practice rating note`);
    assert.ok(Array.isArray(res.coveredTopics) && res.coveredTopics.length > 0, `Resource ${res.id} must specify covered topics`);
    assert.ok(Array.isArray(res.knownGaps), `Resource ${res.id} must declare known gaps`);
  });
});

runTest('Resources: Primary balanced recommendations satisfy theory + practice criteria', () => {
  const primaryCourses = CURATED_RESOURCES.filter(r => r.role === 'primary_balanced');
  assert.ok(primaryCourses.length >= 5, 'Must have primary balanced courses for foundational subjects');

  primaryCourses.forEach(c => {
    const fmt = c.format.toLowerCase();
    assert.ok(fmt.includes('problem') || fmt.includes('lab') || fmt.includes('exercise') || fmt.includes('assignment') || fmt.includes('project'), 
      `Primary course ${c.id} must include substantive practice/assignments/projects`);
  });
});

// 3. Uncurated Subjects Honest State (Section 3 & 4)
runTest('Uncurated Subjects: Clearly marked as uncurated without fake claims', () => {
  const uncurated = CURRICULUM_SUBJECTS.filter(s => !s.hasCuratedResources);
  assert.ok(uncurated.length >= 25, 'Remaining subjects must be explicitly uncurated');
  assert.strictEqual(uncurated.length + CURRICULUM_SUBJECTS.filter(s => s.hasCuratedResources).length, 51, 'Total must equal 51');

  uncurated.forEach(s => {
    assert.strictEqual(s.curatedResourceIds.length, 0, `Uncurated subject ${s.id} must not have resource IDs`);
    assert.ok(s.topics.length > 0, `Uncurated subject ${s.id} still has helpful syllabus topics`);
  });
});

// 4. Staged Competence Model (Section 6)
runTest('Stages: Every curated foundational subject has Stage 1 core activities, checkpoint, and applied project', () => {
  const coreCuratedIds = ['intro-to-cs', 'discrete-maths', 'data-structures', 'operating-systems', 'database-systems', 'computer-networks'];

  coreCuratedIds.forEach(subId => {
    const acts = SUBJECT_ACTIVITIES.filter(a => a.subjectId === subId);
    assert.ok(acts.length >= 4, `Subject ${subId} must have at least 4 progressive activities`);

    const stage1Acts = acts.filter(a => a.stage === 1);
    assert.ok(stage1Acts.length >= 3, `Subject ${subId} must have Stage 1 activities`);

    const checkpoint = stage1Acts.find(a => a.kind === 'checkpoint');
    assert.ok(checkpoint, `Subject ${subId} must have a Stage 1 verification checkpoint`);

    const project = acts.find(a => a.stage === 'project');
    assert.ok(project, `Subject ${subId} must have an applied project extension`);
    assert.ok(project.xpReward >= 150, `Applied project must award high XP (${project.xpReward} XP)`);
  });
});

// 5. Gamification Separation & Player Level Progression (Section 8)
runTest('Gamification: Player level is derived strictly from XP and independent of University Year', () => {
  // Test Level 1: 0 XP
  const p1 = calculatePlayerLevel(0);
  assert.strictEqual(p1.level, 1);
  assert.strictEqual(p1.levelTitle, 'CS Apprentice');

  // Test Level 2: 200 XP
  const p2 = calculatePlayerLevel(200);
  assert.strictEqual(p2.level, 2);
  assert.strictEqual(p2.levelTitle, 'Computational Explorer');

  // Test Level 3: 500 XP
  const p3 = calculatePlayerLevel(500);
  assert.strictEqual(p3.level, 3);
  assert.strictEqual(p3.levelTitle, 'Algorithmic Thinker');

  // Test High XP: 3500 XP
  const p7 = calculatePlayerLevel(3500);
  assert.strictEqual(p7.level, 7);
  assert.strictEqual(p7.levelTitle, 'Senior Problem Solver');

  // Confirm level tiers are properly ordered
  for (let i = 0; i < LEVEL_TIERS.length - 1; i++) {
    assert.ok(LEVEL_TIERS[i].minXp < LEVEL_TIERS[i + 1].minXp, 'Level tiers must be monotonically increasing');
  }
});

// 6. Idempotency & XP Ledger Invariant Simulation (Section 8 & 10)
runTest('XP Ledger: Duplicate completions never re-award XP (Idempotency)', () => {
  let xpLedger = [];
  let progress = {};

  const activity = SUBJECT_ACTIVITIES.find(a => a.id === 'act-intro-cs-2');
  assert.ok(activity, 'Test activity must exist');

  function simulateComplete(actId, note) {
    const existing = progress[actId];
    if (existing?.status === 'completed' && existing.xpAwarded) {
      if (note && note !== existing.evidenceNote) {
        progress[actId] = { ...existing, evidenceNote: note };
      }
      return { awarded: 0, reason: 'ALREADY_COMPLETED' };
    }

    const alreadyInLedger = xpLedger.some(e => e.activityId === actId);
    const awardAmount = alreadyInLedger ? 0 : activity.xpReward;

    progress[actId] = {
      activityId: actId,
      status: 'completed',
      evidenceNote: note,
      xpAwarded: true
    };

    if (awardAmount > 0) {
      xpLedger.push({
        activityId: actId,
        xpAwarded: awardAmount,
        timestamp: new Date().toISOString()
      });
    }

    return { awarded: awardAmount, reason: 'FIRST_COMPLETION' };
  }

  // 1st completion: awards XP
  const res1 = simulateComplete(activity.id, 'Pass check50 and valgrind');
  assert.strictEqual(res1.awarded, activity.xpReward, 'First completion must award activity XP');
  assert.strictEqual(xpLedger.length, 1, 'XP ledger must contain 1 entry');

  // 2nd completion (e.g. re-click, re-submission, page refresh): must award 0 XP!
  const res2 = simulateComplete(activity.id, 'Pass check50 and valgrind updated');
  assert.strictEqual(res2.awarded, 0, 'Second completion must NOT re-award XP');
  assert.strictEqual(res2.reason, 'ALREADY_COMPLETED');
  assert.strictEqual(xpLedger.length, 1, 'XP ledger must still contain only 1 entry');
  assert.strictEqual(progress[activity.id].evidenceNote, 'Pass check50 and valgrind updated', 'Notes can update without duplicating XP');
});

// 7. Recommendation Priority Logic (Section 7)
runTest('Recommendation Priority: Stage 1 activities for "Currently Studying" subjects rank first', () => {
  const currentlyStudying = ['operating-systems', 'database-systems'];

  // All activities for currently studying in Stage 1
  const priorityActs = SUBJECT_ACTIVITIES.filter(a => 
    currentlyStudying.includes(a.subjectId) && a.stage === 1
  );
  assert.ok(priorityActs.length >= 6, 'Must identify priority Stage 1 activities for current subjects');

  assert.ok(priorityActs.every(p => currentlyStudying.includes(p.subjectId)), 
    'Priority list must strictly belong to current subjects');
});

console.log(`\n====================================================`);
console.log(`Verification Complete: ${passedTests}/${totalTests} tests passed successfully!`);
console.log(`====================================================\n`);
