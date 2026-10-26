const pptxgen = require('pptxgenjs');
const path = require('path');

console.log('Generating EVOLVE PowerPoint presentation...');

const pptx = new pptxgen();

// Configure 16:9 widescreen presentation
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'EVOLVE Product Team';
pptx.company = 'EVOLVE CS Learning';
pptx.revision = '1.0';
pptx.subject = 'EVOLVE — Predefined CS Curriculum & Staged Learning Recommendation MVP';
pptx.title = 'EVOLVE — Project Presentation';

// Color Palette Constants
const COLORS = {
  bgCanvas: 'FAF9F6',
  cardBg: 'FFFFFF',
  tealDark: '0F766E',
  tealDeep: '115E59',
  tealNavy: '042F2E',
  tealLight: 'F0FDFA',
  tealBorder: 'CCFBF1',
  textDark: '111827',
  textMuted: '4B5563',
  textLight: '6B7280',
  amber: 'D97706',
  amberLight: 'FEF3C7',
  emerald: '059669',
  emeraldLight: 'ECFDF5',
  cardBorder: 'E5E7EB',
  white: 'FFFFFF'
};

// Helper to create consistent slide backgrounds and headers
function createSlide(title, category = 'EVOLVE CS CURRICULUM MVP') {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.bgCanvas };

  // Top category tracker
  slide.addText(category.toUpperCase(), {
    x: 0.8,
    y: 0.4,
    w: 8.0,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: COLORS.tealDark,
    bold: true,
    charSpacing: 2
  });

  // Main slide title
  slide.addText(title, {
    x: 0.8,
    y: 0.7,
    w: 11.5,
    h: 0.6,
    fontSize: 22,
    fontFace: 'Arial',
    color: COLORS.textDark,
    bold: true
  });

  // Subtle bottom footer bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 7.0,
    w: 11.7,
    h: 0.02,
    fill: { color: COLORS.cardBorder }
  });

  slide.addText('EVOLVE — Predefined CS Curriculum & Staged Mastery Path', {
    x: 0.8,
    y: 7.05,
    w: 7.0,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: COLORS.textLight
  });

  slide.addText('Confidential • Computer Science Education', {
    x: 8.0,
    y: 7.05,
    w: 4.5,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: COLORS.textLight,
    align: 'right'
  });

  return slide;
}

// =========================================================================
// SLIDE 1: Title Slide
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.tealNavy };

  // Subtle accent shape
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 1.2,
    w: 0.8,
    h: 0.8,
    rectRadius: 0.15,
    fill: { color: COLORS.tealDark }
  });
  slide.addText('E', {
    x: 1.0,
    y: 1.2,
    w: 0.8,
    h: 0.8,
    fontSize: 32,
    fontFace: 'Arial',
    color: COLORS.white,
    bold: true,
    align: 'center',
    valign: 'middle'
  });

  slide.addText('EVOLVE', {
    x: 2.0,
    y: 1.3,
    w: 6.0,
    h: 0.6,
    fontSize: 34,
    fontFace: 'Arial',
    color: COLORS.white,
    bold: true,
    charSpacing: 3
  });

  slide.addText('CS Learning Recommendation & Staged Mastery MVP', {
    x: 1.0,
    y: 2.3,
    w: 11.0,
    h: 0.8,
    fontSize: 26,
    fontFace: 'Arial',
    color: '5EEAD4',
    bold: true
  });

  slide.addText('Turning a predefined 51-subject university curriculum into a trustworthy, staged path: theory, problem sets, and applied projects.', {
    x: 1.0,
    y: 3.2,
    w: 10.5,
    h: 1.0,
    fontSize: 15,
    fontFace: 'Arial',
    color: 'CCFBF1',
    lineSpacing: 22
  });

  // Feature pills on title slide
  const pillData = [
    'Authoritative 51-Subject Catalog',
    'Evidence-Based Curation',
    'Stage 1 Core Competence',
    'Applied Capstone Projects',
    'Independent Gamification'
  ];

  pillData.forEach((pill, idx) => {
    const px = 1.0 + (idx * 2.2);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: px,
      y: 4.8,
      w: 2.05,
      h: 0.45,
      rectRadius: 0.08,
      fill: { color: COLORS.tealDeep },
      line: { color: '2DD4BF', width: 1 }
    });
    slide.addText(pill, {
      x: px,
      y: 4.8,
      w: 2.05,
      h: 0.45,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: COLORS.white,
      bold: true,
      align: 'center',
      valign: 'middle'
    });
  });

  slide.addText('Architecture & Implementation Brief • Fully Tested & Working MVP', {
    x: 1.0,
    y: 6.2,
    w: 11.0,
    h: 0.4,
    fontSize: 11,
    fontFace: 'Arial',
    color: '99F6E4'
  });
}

// =========================================================================
// SLIDE 2: The Core Problem in CS Learning
// =========================================================================
{
  const slide = createSlide('The Core Problem in Computer Science Self-Study', 'Industry Context & Need');

  // 3 Comparison Problem Cards
  const cards = [
    {
      title: 'Course Catalog Overload',
      subtitle: 'Discovery Paradox',
      body: 'Generic MOOC directories list thousands of courses ranked by popularity or star ratings rather than curricular depth, leaving students overwhelmed without clear prerequisites.',
      highlight: 'Lacks Academic Alignment'
    },
    {
      title: 'Passive Watching Illusion',
      subtitle: 'The Tutorial Trap',
      body: 'Watching video lectures without substantive, autograded problem sets produces a false sense of mastery. Real competence requires writing code, debugging pointers, and constructing proofs.',
      highlight: 'Passive ≠ Competence'
    },
    {
      title: 'Missing Application Bridge',
      subtitle: 'Theory Without Practice',
      body: 'Students finish courses but cannot apply concepts to practical systems. They either copy cookbook tutorials or abandon ambitious projects due to missing foundational checkpoints.',
      highlight: 'Application Disconnect'
    }
  ];

  cards.forEach((c, idx) => {
    const x = 0.8 + (idx * 4.0);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x,
      y: 1.6,
      w: 3.7,
      h: 4.8,
      rectRadius: 0.1,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.cardBorder, width: 1 }
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.3,
      y: 1.9,
      w: 3.1,
      h: 0.35,
      rectRadius: 0.05,
      fill: { color: 'FEE2E2' },
      line: { color: 'FCA5A5', width: 0.5 }
    });
    slide.addText(c.highlight.toUpperCase(), {
      x: x + 0.3,
      y: 1.9,
      w: 3.1,
      h: 0.35,
      fontSize: 9,
      fontFace: 'Arial',
      color: '991B1B',
      bold: true,
      align: 'center',
      valign: 'middle'
    });

    slide.addText(c.title, {
      x: x + 0.3,
      y: 2.4,
      w: 3.1,
      h: 0.5,
      fontSize: 16,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true
    });

    slide.addText(c.subtitle, {
      x: x + 0.3,
      y: 2.9,
      w: 3.1,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      color: COLORS.tealDark,
      bold: true
    });

    slide.addText(c.body, {
      x: x + 0.3,
      y: 3.3,
      w: 3.1,
      h: 2.6,
      fontSize: 12,
      fontFace: 'Arial',
      color: COLORS.textMuted,
      lineSpacing: 18
    });
  });
}

// =========================================================================
// SLIDE 3: The EVOLVE Value Proposition
// =========================================================================
{
  const slide = createSlide('The EVOLVE Solution: High-Signal, Staged Learning', 'Product Strategy');

  // Left banner: Core Answer
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.6,
    w: 5.6,
    h: 5.0,
    rectRadius: 0.12,
    fill: { color: COLORS.tealNavy }
  });

  slide.addText('THE CORE QUESTION EVOLVE ANSWERS', {
    x: 1.2,
    y: 2.0,
    w: 4.8,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: '5EEAD4',
    bold: true,
    charSpacing: 2
  });

  slide.addText('“For the subject I am studying right now, what is the best reliable path to learn the theory, practice real problems, and build an applied project?”', {
    x: 1.2,
    y: 2.4,
    w: 4.8,
    h: 2.0,
    fontSize: 17,
    fontFace: 'Arial',
    color: COLORS.white,
    italic: true,
    bold: true,
    lineSpacing: 24
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: 1.2,
    y: 4.6,
    w: 4.8,
    h: 0.02,
    fill: { color: COLORS.tealDark }
  });

  slide.addText('EVOLVE matches a university subject to verified, evidence-based courses, authoritative companion textbooks, synthesis checkpoints, and hands-on capstone projects.', {
    x: 1.2,
    y: 4.8,
    w: 4.8,
    h: 1.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: 'CCFBF1',
    lineSpacing: 18
  });

  // Right Side: 3 Key Pillars
  const pillars = [
    {
      title: 'Current Academic Focus First',
      desc: 'Recommendations prioritize the subjects the student is currently studying this term over popularity or gamification rank.'
    },
    {
      title: 'Theory & Practice Together',
      desc: 'Default primary recommendation requires both conceptual clarity and autograded coding assignments or problem sets.'
    },
    {
      title: 'Stage-Based Progression',
      desc: 'Learning progresses through clear stages: Stage 0 (Prerequisites) → Stage 1 (Core Competence) → Stage 2 (Deepening) → Applied Projects.'
    }
  ];

  pillars.forEach((p, idx) => {
    const y = 1.6 + (idx * 1.65);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 6.8,
      y: y,
      w: 5.7,
      h: 1.45,
      rectRadius: 0.1,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.cardBorder, width: 1 }
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 7.1,
      y: y + 0.25,
      w: 0.4,
      h: 0.4,
      rectRadius: 0.08,
      fill: { color: COLORS.tealLight },
      line: { color: COLORS.tealBorder, width: 1 }
    });
    slide.addText((idx + 1).toString(), {
      x: 7.1,
      y: y + 0.25,
      w: 0.4,
      h: 0.4,
      fontSize: 14,
      fontFace: 'Arial',
      color: COLORS.tealDark,
      bold: true,
      align: 'center',
      valign: 'middle'
    });

    slide.addText(p.title, {
      x: 7.7,
      y: y + 0.2,
      w: 4.6,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true
    });

    slide.addText(p.desc, {
      x: 7.7,
      y: y + 0.55,
      w: 4.6,
      h: 0.75,
      fontSize: 11,
      fontFace: 'Arial',
      color: COLORS.textMuted,
      lineSpacing: 15
    });
  });
}

// =========================================================================
// SLIDE 4: Authoritative 51-Subject Curriculum Catalog
// =========================================================================
{
  const slide = createSlide('The Authoritative 51-Subject Curriculum Catalog', 'Curriculum Architecture');

  // Left card: Catalog Rules
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.6,
    w: 5.6,
    h: 5.0,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.cardBorder, width: 1 }
  });

  slide.addText('AUTHORITATIVE CATALOG RULES', {
    x: 1.1,
    y: 1.9,
    w: 5.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.tealDark,
    bold: true
  });

  const catalogRules = [
    'Canonical Order Preserved: All 51 subjects retain exact curriculum_order (1 to 51) without missing indices.',
    'Original Source Naming Preserved: Preserves original names (e.g. "prob and stat", "mutli media", "software mainenance and evolution") alongside clean display titles.',
    'Unassigned Semesters Policy: Year/semester assignments are unassigned in the MVP to avoid artificial 4-year guesses.',
    'Explicit Active Focus: Students select their university year (1–4) and mark subjects as "Currently Studying" to guide daily recommendations.',
    'Honest Curation State: Subjects without verified resources display an honest "In Curation" banner with complete syllabus topics.'
  ];

  catalogRules.forEach((rule, idx) => {
    slide.addText(`•  ${rule}`, {
      x: 1.1,
      y: 2.3 + (idx * 0.8),
      w: 5.0,
      h: 0.7,
      fontSize: 10.5,
      fontFace: 'Arial',
      color: COLORS.textMuted,
      lineSpacing: 15
    });
  });

  // Right card: Curriculum Domain Breakdown
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 1.6,
    w: 5.7,
    h: 5.0,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.cardBorder, width: 1 }
  });

  slide.addText('CURRICULUM CATEGORY BREAKDOWN (51 TOTAL)', {
    x: 7.1,
    y: 1.9,
    w: 5.1,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.tealDark,
    bold: true
  });

  const categories = [
    { name: 'Foundations & Mathematical Principles', count: '6 Subjects', examples: 'Discrete maths, Intro to CS, Linear algebra, Prob & stat' },
    { name: 'Computer Systems & Architecture', count: '14 Subjects', examples: 'Digital logic, Computer organization, OS, Networks, C++' },
    { name: 'Software Engineering & Lifecycle', count: '16 Subjects', examples: 'SE, OOP, SPM, QA, Verification & validation, Maintenance' },
    { name: 'Theory of Computation & Algorithms', count: '5 Subjects', examples: 'Data structures, Algorithms analysis, Theory of comp' },
    { name: 'Applied AI & Intelligent Systems', count: '5 Subjects', examples: 'AI, Machine Learning, Soft computing, Software agents' },
    { name: 'Specialized Technologies', count: '5 Subjects', examples: 'Multimedia, Computer graphics, HCI, Game programming' }
  ];

  categories.forEach((cat, idx) => {
    const cy = 2.3 + (idx * 0.72);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 7.1,
      y: cy,
      w: 5.1,
      h: 0.65,
      rectRadius: 0.05,
      fill: { color: COLORS.bgCanvas },
      line: { color: COLORS.cardBorder, width: 0.5 }
    });

    slide.addText(cat.name, {
      x: 7.25,
      y: cy + 0.05,
      w: 3.5,
      h: 0.3,
      fontSize: 10.5,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true
    });

    slide.addText(cat.count, {
      x: 10.6,
      y: cy + 0.05,
      w: 1.45,
      h: 0.3,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: COLORS.tealDark,
      bold: true,
      align: 'right'
    });

    slide.addText(cat.examples, {
      x: 7.25,
      y: cy + 0.32,
      w: 4.8,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Arial',
      color: COLORS.textLight
    });
  });
}

// =========================================================================
// SLIDE 5: Resource Acceptance & Transparent Curation Policy
// =========================================================================
{
  const slide = createSlide('Evidence-Based Curation & Transparent Role Labels', 'Quality Standards');

  // Top banner: Primary Recommendation Criteria
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    h: 1.6,
    rectRadius: 0.1,
    fill: { color: COLORS.tealLight },
    line: { color: COLORS.tealBorder, width: 1 }
  });

  slide.addText('PRIMARY RECOMMENDATION CRITERIA — BALANCED CORE', {
    x: 1.1,
    y: 1.75,
    w: 11.1,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.tealNavy,
    bold: true
  });

  slide.addText('To receive the "Primary Recommendation — Balanced Core" label, a course MUST provide:\n1. Video instruction with clear, accurate theoretical foundations.\n2. Substantive, verified problem sets, programming assignments, or labs (passive watching alone is disqualified).\n3. Credible academic institution/instructor with transparent syllabus and functioning official links.', {
    x: 1.1,
    y: 2.1,
    w: 11.1,
    h: 0.95,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.tealDeep,
    lineSpacing: 16
  });

  // 4 Resource Role Cards
  const roles = [
    {
      role: 'Primary Balanced Core',
      desc: 'Full coverage of core outcomes with theory + autograded coding problem sets.',
      example: 'Harvard CS50x, Berkeley CS61B, CMU 15-445, OSTEP'
    },
    {
      role: 'Authoritative Book Companion',
      desc: 'Selected chapters from verified technical and academic publishers.',
      example: 'CLRS (MIT Press), Stroustrup (Pearson), DDIA (O’Reilly)'
    },
    {
      role: 'Alternative Recommendation',
      desc: 'A balanced substitute with different teaching style, language, or depth.',
      example: 'Princeton Algorithms Part I (Coursera Audit), MIT 6.0001'
    },
    {
      role: 'Stage 2 Deepening & Advanced',
      desc: 'Rigorous mathematical proofs, low-level mechanics, and complex edge cases.',
      example: 'SICP (MIT Press), Effective Modern C++, Tanenbaum MOS'
    }
  ];

  roles.forEach((r, idx) => {
    const x = 0.8 + (idx * 3.0);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x,
      y: 3.4,
      w: 2.8,
      h: 3.2,
      rectRadius: 0.08,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.cardBorder, width: 1 }
    });

    slide.addText(r.role, {
      x: x + 0.2,
      y: 3.6,
      w: 2.4,
      h: 0.5,
      fontSize: 12,
      fontFace: 'Arial',
      color: COLORS.tealDark,
      bold: true
    });

    slide.addText(r.desc, {
      x: x + 0.2,
      y: 4.2,
      w: 2.4,
      h: 1.1,
      fontSize: 10.5,
      fontFace: 'Arial',
      color: COLORS.textMuted,
      lineSpacing: 15
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.2,
      y: 5.4,
      w: 2.4,
      h: 0.01,
      fill: { color: COLORS.cardBorder }
    });

    slide.addText('Examples:\n' + r.example, {
      x: x + 0.2,
      y: 5.5,
      w: 2.4,
      h: 0.9,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: false
    });
  });
}

// =========================================================================
// SLIDE 6: Progressive Staged Learning Model
// =========================================================================
{
  const slide = createSlide('The Progressive Staged Competency Model', 'Pedagogy & Stage Design');

  const stages = [
    {
      stage: 'Stage 0',
      title: 'Prerequisites & Catch-Up',
      target: 'Conditional Bridge',
      desc: 'Targeted lessons or readings for missing prerequisites. Only suggested when a gap blocks current learning; not required for students with background.',
      color: '6B7280',
      bgColor: 'F3F4F6'
    },
    {
      stage: 'Stage 1',
      title: 'Core Competence',
      target: 'Primary Target (MVP Focus)',
      desc: 'Baseline theory + practical problem-solving. Includes primary balanced course, selected readings, required problem sets, and a subject synthesis checkpoint.',
      color: COLORS.tealDark,
      bgColor: COLORS.tealLight
    },
    {
      stage: 'Stage 2',
      title: 'Deeper Theory & Practice',
      target: 'Advanced Literature & Proofs',
      desc: 'Extends Stage 1 with formal mathematical proofs, complex edge cases, low-level implementation details, or deeper companion textbooks.',
      color: '7C3AED',
      bgColor: 'F5F3FF'
    },
    {
      stage: 'Applied Project',
      title: 'Applied Project Extension',
      target: 'Demonstrable Application',
      desc: 'Recommended after Stage 1 completion. Requires building a functional software artifact with automated tests and architectural design explanations.',
      color: COLORS.amber,
      bgColor: COLORS.amberLight
    }
  ];

  stages.forEach((st, idx) => {
    const x = 0.8 + (idx * 3.0);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x,
      y: 1.6,
      w: 2.8,
      h: 5.0,
      rectRadius: 0.1,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.cardBorder, width: 1 }
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.2,
      y: 1.85,
      w: 2.4,
      h: 0.35,
      rectRadius: 0.05,
      fill: { color: st.bgColor }
    });
    slide.addText(st.stage.toUpperCase(), {
      x: x + 0.2,
      y: 1.85,
      w: 2.4,
      h: 0.35,
      fontSize: 10,
      fontFace: 'Arial',
      color: st.color,
      bold: true,
      align: 'center',
      valign: 'middle'
    });

    slide.addText(st.title, {
      x: x + 0.2,
      y: 2.3,
      w: 2.4,
      h: 0.5,
      fontSize: 13,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true
    });

    slide.addText(st.target, {
      x: x + 0.2,
      y: 2.8,
      w: 2.4,
      h: 0.35,
      fontSize: 10,
      fontFace: 'Arial',
      color: st.color,
      bold: true
    });

    slide.addText(st.desc, {
      x: x + 0.2,
      y: 3.25,
      w: 2.4,
      h: 2.5,
      fontSize: 11,
      fontFace: 'Arial',
      color: COLORS.textMuted,
      lineSpacing: 16
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.2,
      y: 5.9,
      w: 2.4,
      h: 0.45,
      rectRadius: 0.05,
      fill: { color: COLORS.bgCanvas },
      line: { color: COLORS.cardBorder, width: 0.5 }
    });
    slide.addText(idx === 1 ? 'Primary MVP Goal' : idx === 3 ? '180–200 XP Capstone' : 'Deepening Track', {
      x: x + 0.2,
      y: 5.9,
      w: 2.4,
      h: 0.45,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true,
      align: 'center',
      valign: 'middle'
    });
  });
}

// =========================================================================
// SLIDE 7: Applied Capstone Projects Spotlight
// =========================================================================
{
  const slide = createSlide('Applied Capstone Projects: Knowledge Put to Work', 'Practical Mastery');

  slide.addText('Projects in EVOLVE are surfaced once Stage 1 core competence is achieved. Students must build, test, and document real software.', {
    x: 0.8,
    y: 1.4,
    w: 11.7,
    h: 0.35,
    fontSize: 12,
    fontFace: 'Arial',
    color: COLORS.textMuted
  });

  const projects = [
    {
      subject: 'Data Structures (CS61B)',
      title: '“Gitlet” — Version Control System from Scratch',
      stack: 'Java / C++',
      brief: 'Build a content-addressable version control system: SHA-1 blob hashing, directed acyclic commit graph, branch pointers, checkout, and 3-way merge conflict resolution.',
      criteria: 'Passes integration test suite for init, add, commit, rm, branch, checkout, and merge without memory corruption.'
    },
    {
      subject: 'Operating Systems (OSTEP)',
      title: 'Preemptive User-Level Thread Scheduler',
      stack: 'C / POSIX',
      brief: 'Implement a green thread library using setjmp/longjmp or ucontext.h, with a timer interrupt (SIGALRM) simulating preemptive round-robin scheduling, thread yield, join, and mutexes.',
      criteria: 'Passes concurrency stress tests ensuring preemption occurs even during infinite CPU loops.'
    },
    {
      subject: 'Database Systems (CMU 15-445)',
      title: 'Disk-Backed Key-Value Storage Engine with WAL',
      stack: 'Modern C++20',
      brief: 'Construct a persistent storage engine featuring an append-only write-ahead log (WAL), in-memory index, binary log compaction, and ARIES crash recovery.',
      criteria: 'Verifies zero data loss after ungraceful process kill (kill -9) during active write transactions.'
    },
    {
      subject: 'Computer Networks (Stanford CS144)',
      title: 'High-Performance Epoll Concurrent HTTP Server',
      stack: 'C++ / Socket API',
      brief: 'Develop an event-driven HTTP/1.1 web server using Linux epoll socket multiplexing, handling keep-alive connections, non-blocking I/O, and concurrent streaming.',
      criteria: 'Sustains 5,000+ simultaneous connections benchmarked with wrk without dropping requests or leaking file descriptors.'
    }
  ];

  projects.forEach((proj, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 0.8 + (col * 6.0);
    const y = 1.9 + (row * 2.5);

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x,
      y: y,
      w: 5.7,
      h: 2.3,
      rectRadius: 0.1,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.cardBorder, width: 1 }
    });

    slide.addText(proj.subject.toUpperCase() + '  •  ' + proj.stack, {
      x: x + 0.25,
      y: y + 0.15,
      w: 5.2,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Arial',
      color: COLORS.tealDark,
      bold: true
    });

    slide.addText(proj.title, {
      x: x + 0.25,
      y: y + 0.4,
      w: 5.2,
      h: 0.35,
      fontSize: 12.5,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true
    });

    slide.addText(proj.brief, {
      x: x + 0.25,
      y: y + 0.75,
      w: 5.2,
      h: 0.75,
      fontSize: 10,
      fontFace: 'Arial',
      color: COLORS.textMuted,
      lineSpacing: 14
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.25,
      y: y + 1.55,
      w: 5.2,
      h: 0.6,
      rectRadius: 0.05,
      fill: { color: COLORS.bgCanvas },
      line: { color: COLORS.cardBorder, width: 0.5 }
    });
    slide.addText('Verification Criteria: ' + proj.criteria, {
      x: x + 0.35,
      y: y + 1.6,
      w: 5.0,
      h: 0.5,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: COLORS.textDark,
      lineSpacing: 12
    });
  });
}

// =========================================================================
// SLIDE 8: Independent Gamification & Idempotent XP Ledger
// =========================================================================
{
  const slide = createSlide('Independent Gamification & Idempotent XP Ledger', 'Motivational Architecture');

  // Left card: 4 Distinct Concepts
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.6,
    w: 5.6,
    h: 5.0,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.cardBorder, width: 1 }
  });

  slide.addText('STRICT SEPARATION OF ACADEMIC & GAME PROGRESSION', {
    x: 1.1,
    y: 1.85,
    w: 5.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.tealDark,
    bold: true
  });

  const fourPillars = [
    { title: '1. University Academic Year (1–4)', desc: 'Student’s place in their university degree. Never altered by player level or XP.' },
    { title: '2. Subject & Stage Progress', desc: 'Progress through Stages 0–3 and project deliverables for a specific curriculum subject.' },
    { title: '3. Learning Evidence', desc: 'Working code, passed unit test checks, problem sets, and git repositories.' },
    { title: '4. Player Level & XP (1–10)', desc: 'Platform-wide motivational system earned strictly through legitimate first-time study activities.' }
  ];

  fourPillars.forEach((p, idx) => {
    const py = 2.25 + (idx * 1.05);
    slide.addText(p.title, {
      x: 1.1,
      y: py,
      w: 5.0,
      h: 0.3,
      fontSize: 11.5,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true
    });
    slide.addText(p.desc, {
      x: 1.1,
      y: py + 0.3,
      w: 5.0,
      h: 0.65,
      fontSize: 10,
      fontFace: 'Arial',
      color: COLORS.textMuted,
      lineSpacing: 14
    });
  });

  // Right card: XP Ledger & Anti-Double-Counting
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 1.6,
    w: 5.7,
    h: 5.0,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.cardBorder, width: 1 }
  });

  slide.addText('XP LEDGER & IDEMPOTENT INTEGRITY', {
    x: 7.1,
    y: 1.85,
    w: 5.1,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.tealDark,
    bold: true
  });

  const ledgerRules = [
    {
      title: 'First-Time Verified Reward Only',
      text: 'XP is awarded strictly on the initial verified completion. Repeated clicks, refreshes, or resubmissions update notes without duplicating XP.'
    },
    {
      title: 'Immutable Append-Only Ledger',
      text: 'Every earned point creates a persistent event record containing activity ID, subject name, timestamp, and reward value.'
    },
    {
      title: 'Meaningful Value Weighting',
      text: 'Rewards problem-solving heavily over passive consumption:\n• Video lesson: 15 XP\n• Substantive problem set: 70–75 XP\n• Systems lab: 85 XP\n• Core synthesis checkpoint: 100 XP\n• Applied capstone project: 180–200 XP'
    },
    {
      title: 'Streak Resilience',
      text: 'Streaks track daily study habit momentum, but broken streaks never delete earned XP, levels, or completed stages.'
    }
  ];

  ledgerRules.forEach((rule, idx) => {
    const ry = 2.2 + (idx * 1.15);
    slide.addText(rule.title, {
      x: 7.1,
      y: ry,
      w: 5.1,
      h: 0.25,
      fontSize: 11,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true
    });
    slide.addText(rule.text, {
      x: 7.1,
      y: ry + 0.25,
      w: 5.1,
      h: 0.8,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: COLORS.textMuted,
      lineSpacing: 13
    });
  });
}

// =========================================================================
// SLIDE 9: Technical Architecture & System Design
// =========================================================================
{
  const slide = createSlide('Technical Architecture & Implementation Stack', 'Engineering & Design');

  const stackBlocks = [
    {
      title: 'Presentation & UI',
      tech: 'React 18 + Vite 6 + Tailwind CSS',
      points: [
        'Component-driven single-page architecture',
        'Tailwind design system adhering to calm neutral canvas (#FAF9F6) and soft teal accent (#0F766E)',
        'Fully responsive desktop and mobile viewport support',
        'Accessible semantic controls and keyboard-friendly navigation'
      ]
    },
    {
      title: 'Type Safety & Data Models',
      tech: 'TypeScript 5.7 Strict Mode',
      points: [
        'Strict domain typing for Subjects, Resources, Activities, XP Events, and Profiles',
        'Zero `any` types across the codebase',
        'Guarantees data integrity for all 51 subjects and verified evidence structures',
        'Clean build output compiling with zero warnings'
      ]
    },
    {
      title: 'State & Persistence',
      tech: 'Reactive Store + LocalStorage + JSON Export',
      points: [
        'Centralized reactive singleton state engine',
        'Universal SSR/Node safe storage adapters with fallback handling',
        'Append-only XP ledger with idempotent completion logic',
        'One-click JSON backup export and restore capability'
      ]
    }
  ];

  stackBlocks.forEach((b, idx) => {
    const x = 0.8 + (idx * 4.0);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x,
      y: 1.6,
      w: 3.7,
      h: 5.0,
      rectRadius: 0.1,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.cardBorder, width: 1 }
    });

    slide.addText(b.title.toUpperCase(), {
      x: x + 0.3,
      y: 1.85,
      w: 3.1,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      color: COLORS.tealDark,
      bold: true
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.3,
      y: 2.2,
      w: 3.1,
      h: 0.45,
      rectRadius: 0.05,
      fill: { color: COLORS.bgCanvas },
      line: { color: COLORS.cardBorder, width: 0.5 }
    });
    slide.addText(b.tech, {
      x: x + 0.3,
      y: 2.2,
      w: 3.1,
      h: 0.45,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true,
      align: 'center',
      valign: 'middle'
    });

    slide.addText('Key Engineering Highlights:', {
      x: x + 0.3,
      y: 2.8,
      w: 3.1,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      color: COLORS.textLight,
      bold: true
    });

    b.points.forEach((pt, pIdx) => {
      slide.addText(`•  ${pt}`, {
        x: x + 0.3,
        y: 3.15 + (pIdx * 0.85),
        w: 3.1,
        h: 0.8,
        fontSize: 10,
        fontFace: 'Arial',
        color: COLORS.textMuted,
        lineSpacing: 14
      });
    });
  });
}

// =========================================================================
// SLIDE 10: Product Walkthrough & Key User Flows
// =========================================================================
{
  const slide = createSlide('End-to-End Learner Journey & Key Screens', 'Product Walkthrough');

  const flows = [
    {
      step: 'Screen 1',
      title: 'Today Dashboard',
      desc: 'Instant priority action card for the top currently studied subject. Shows active subject progress rings, project unlock spotlights, and independent player gamification stats.'
    },
    {
      step: 'Screen 2',
      title: 'Profile & Focus Setup',
      desc: 'Interactive modal to select university academic year (1–4) and multi-select currently studied subjects from the 51-subject catalog with real-time search filtering.'
    },
    {
      step: 'Screen 3',
      title: 'Curriculum (51)',
      desc: 'Complete 51-subject catalog in preserved sequence. Allows filtering by category (Foundations, Systems, SE, Theory, AI) and toggling active study bookmarks.'
    },
    {
      step: 'Screen 4',
      title: 'Subject Detail View',
      desc: 'Deep-dive with progressive stage tabs (Stage 1 Core, Stage 2 Deepening, Applied Project), ranked resource cards, syllabus outcomes, and activity completion modals.'
    },
    {
      step: 'Screen 5',
      title: 'Applied Projects Hub',
      desc: 'Dedicated catalog of hands-on software capstones, highlighting readiness checks based on completed Stage 1 core competence.'
    },
    {
      step: 'Screen 6',
      title: 'Progress & XP Ledger',
      desc: 'Auditable append-only ledger displaying timestamped XP transactions, streak counter, unlocked achievement badges, and JSON backup export/import tools.'
    }
  ];

  flows.forEach((fl, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 0.8 + (col * 4.0);
    const y = 1.6 + (row * 2.6);

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x,
      y: y,
      w: 3.7,
      h: 2.35,
      rectRadius: 0.08,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.cardBorder, width: 1 }
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.2,
      y: y + 0.2,
      w: 1.0,
      h: 0.3,
      rectRadius: 0.04,
      fill: { color: COLORS.tealLight },
      line: { color: COLORS.tealBorder, width: 0.5 }
    });
    slide.addText(fl.step, {
      x: x + 0.2,
      y: y + 0.2,
      w: 1.0,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Arial',
      color: COLORS.tealDark,
      bold: true,
      align: 'center',
      valign: 'middle'
    });

    slide.addText(fl.title, {
      x: x + 1.35,
      y: y + 0.2,
      w: 2.1,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true
    });

    slide.addText(fl.desc, {
      x: x + 0.2,
      y: y + 0.65,
      w: 3.3,
      h: 1.5,
      fontSize: 10,
      fontFace: 'Arial',
      color: COLORS.textMuted,
      lineSpacing: 15
    });
  });
}

// =========================================================================
// SLIDE 11: Verification & Acceptance Criteria Report
// =========================================================================
{
  const slide = createSlide('Quality Assurance & Acceptance Criteria Report', 'Verification & Testing');

  // Top metric bar
  const metrics = [
    { label: 'Domain Tests', val: '9 / 9 Passing', sub: 'scripts/verify-mvp.cjs' },
    { label: 'Curriculum Order', val: '51 / 51 Preserved', sub: 'Exact 1 to 51 canonical order' },
    { label: 'Production Build', val: '0 Errors', sub: 'tsc && vite build in 1.7s' },
    { label: 'External Credential Blocker', val: 'None (Zero)', sub: 'Self-contained client persistence' }
  ];

  metrics.forEach((m, idx) => {
    const x = 0.8 + (idx * 3.0);
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x,
      y: 1.6,
      w: 2.8,
      h: 1.25,
      rectRadius: 0.08,
      fill: { color: COLORS.cardBg },
      line: { color: COLORS.cardBorder, width: 1 }
    });

    slide.addText(m.label.toUpperCase(), {
      x: x + 0.2,
      y: 1.75,
      w: 2.4,
      h: 0.25,
      fontSize: 9,
      fontFace: 'Arial',
      color: COLORS.textLight,
      bold: true
    });

    slide.addText(m.val, {
      x: x + 0.2,
      y: 2.0,
      w: 2.4,
      h: 0.4,
      fontSize: 15,
      fontFace: 'Arial',
      color: COLORS.tealDark,
      bold: true
    });

    slide.addText(m.sub, {
      x: x + 0.2,
      y: 2.45,
      w: 2.4,
      h: 0.25,
      fontSize: 8.5,
      fontFace: 'Arial',
      color: COLORS.textMuted
    });
  });

  // Table of Acceptance Criteria
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 3.1,
    w: 11.7,
    h: 3.6,
    rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.cardBorder, width: 1 }
  });

  slide.addText('SECTION 15 ACCEPTANCE CRITERIA MATRIX', {
    x: 1.1,
    y: 3.25,
    w: 6.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: COLORS.tealDark,
    bold: true
  });

  const criteriaRows = [
    { num: 'AC 1-2', item: 'Profile creation, academic year (1-4) & multi-subject selection', status: 'VERIFIED', detail: 'ProfileModal with search and persistent localStorage storage' },
    { num: 'AC 3-4', item: 'Priority ranking for current subjects & transparent recommendation cards', status: 'VERIFIED', detail: 'Priority 1 ranking, why recommended, topics, and known scope gaps' },
    { num: 'AC 5', item: 'Uncurated resources not shown as verified; honest pending state', status: 'VERIFIED', detail: '30 uncurated subjects show syllabus and pending banner' },
    { num: 'AC 6-7', item: 'Activity completion, immutable XP ledger & anti-double-award idempotency', status: 'VERIFIED', detail: 'Checked against XP ledger; re-clicking never doubles XP' },
    { num: 'AC 8-9', item: 'State persistence & player level strictly independent of university year', status: 'VERIFIED', detail: 'Isolated level formula (1-10) with JSON backup export/import' },
    { num: 'AC 10-12', item: 'Project surfacing on Stage 1 completion; no fake AI claims or stats', status: 'VERIFIED', detail: 'Factual evidence citations (OSSU, TeachYourselfCS, MIT OCW)' }
  ];

  criteriaRows.forEach((row, idx) => {
    const ry = 3.65 + (idx * 0.47);
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.1,
      y: ry,
      w: 11.1,
      h: 0.4,
      fill: { color: idx % 2 === 0 ? COLORS.bgCanvas : COLORS.cardBg }
    });

    slide.addText(row.num, {
      x: 1.2,
      y: ry + 0.05,
      w: 1.0,
      h: 0.3,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: COLORS.textDark,
      bold: true
    });

    slide.addText(row.item, {
      x: 2.3,
      y: ry + 0.05,
      w: 4.8,
      h: 0.3,
      fontSize: 9.5,
      fontFace: 'Arial',
      color: COLORS.textDark
    });

    slide.addText(row.status, {
      x: 7.2,
      y: ry + 0.05,
      w: 1.2,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Arial',
      color: COLORS.emerald,
      bold: true
    });

    slide.addText(row.detail, {
      x: 8.5,
      y: ry + 0.05,
      w: 3.5,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Arial',
      color: COLORS.textMuted
    });
  });
}

// =========================================================================
// SLIDE 12: Summary & Roadmap
// =========================================================================
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.tealNavy };

  slide.addText('CONCLUSION & FUTURE ROADMAP', {
    x: 1.0,
    y: 0.8,
    w: 8.0,
    h: 0.3,
    fontSize: 11,
    fontFace: 'Arial',
    color: '5EEAD4',
    bold: true,
    charSpacing: 2
  });

  slide.addText('EVOLVE: Trustworthy, Staged CS Learning', {
    x: 1.0,
    y: 1.2,
    w: 11.0,
    h: 0.6,
    fontSize: 26,
    fontFace: 'Arial',
    color: COLORS.white,
    bold: true
  });

  // 2 summary columns
  // Left: Accomplished in MVP
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.0,
    y: 2.1,
    w: 5.5,
    h: 4.4,
    rectRadius: 0.1,
    fill: { color: COLORS.tealDeep },
    line: { color: '2DD4BF', width: 1 }
  });

  slide.addText('DELIVERED IN MVP', {
    x: 1.3,
    y: 2.3,
    w: 4.9,
    h: 0.3,
    fontSize: 12,
    fontFace: 'Arial',
    color: '99F6E4',
    bold: true
  });

  const delivered = [
    '51-Subject Authoritative Curriculum strictly ordered 1 to 51',
    '21 Foundational Subjects with verified courses, books & projects',
    '30 Uncurated Subjects with honest pending curation banners',
    'Staged Competency Model: Stage 1 Core, Stage 2 Deepening, Projects',
    'Idempotent XP Ledger and independent Player Level progression',
    'Zero External Blockers: 100% self-contained and reproducible',
    'Passing Automated Domain Verification Suite (npm test)'
  ];

  delivered.forEach((d, idx) => {
    slide.addText(`✓  ${d}`, {
      x: 1.3,
      y: 2.75 + (idx * 0.48),
      w: 4.9,
      h: 0.45,
      fontSize: 10,
      fontFace: 'Arial',
      color: COLORS.white,
      lineSpacing: 14
    });
  });

  // Right: Next Horizons
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 2.1,
    w: 5.5,
    h: 4.4,
    rectRadius: 0.1,
    fill: { color: COLORS.tealDeep },
    line: { color: '2DD4BF', width: 1 }
  });

  slide.addText('FUTURE HORIZONS (POST-MVP)', {
    x: 7.1,
    y: 2.3,
    w: 4.9,
    h: 0.3,
    fontSize: 12,
    fontFace: 'Arial',
    color: '99F6E4',
    bold: true
  });

  const nextSteps = [
    'Curate Remaining 30 Subjects with faculty review boards',
    'Ingest Authoritative Semester Mapping when officially released',
    'University Syllabus Parser (PDF / Markdown syllabus import)',
    'Interactive Code Sandbox Integration (web-assembly C++ / Python)',
    'Multi-language Support with native Arabic RTL layout',
    'Expanded Capstone Project autograders via GitHub Classroom',
    'Collaborative study groups with verified peer code reviews'
  ];

  nextSteps.forEach((n, idx) => {
    slide.addText(`→  ${n}`, {
      x: 7.1,
      y: 2.75 + (idx * 0.48),
      w: 4.9,
      h: 0.45,
      fontSize: 10,
      fontFace: 'Arial',
      color: 'CCFBF1',
      lineSpacing: 14
    });
  });
}

// Generate the PPTX File
const outputPath = path.join(__dirname, '..', 'EVOLVE_Project_Presentation.pptx');
pptx.writeFile({ fileName: outputPath })
  .then(fileName => {
    console.log(`Presentation generated successfully at: ${fileName}`);
  })
  .catch(err => {
    console.error('Error generating presentation:', err);
    process.exit(1);
  });
