# EVOLVE — CS Learning Recommendation & Staged Mastery MVP

EVOLVE is a focused, evidence-based computer science learning recommendation platform that grounds study paths in a predefined 51-subject university curriculum. Rather than acting as a generic MOOC aggregator or list of famous links, EVOLVE guides students through progressive learning stages (Core Competence, Deepening, and Applied Projects) with verified courses, authoritative textbooks, and hands-on deliverables.

---

## 1. Selected Stack & Architectural Rationale

| Layer | Chosen Technology | Rationale |
|---|---|---|
| **Frontend Framework** | **React 18 + TypeScript** | Rock-solid component lifecycle, strict type safety for domain models (Subjects, Stages, Resources, XP Ledger, Player Progression), and reactive UI state without runtime crashes. |
| **Build & Tooling** | **Vite 6** | Instantaneous HMR during development, rapid production bundling (`< 2s`), and zero complex server dependencies. |
| **Styling & Design System** | **Tailwind CSS** | Clean, calm aesthetic adhering to product rules: warm neutral canvas (`#FAF9F6`), soft teal accent (`#0F766E`), accessible contrast, thin borders, and no distracting neon HUD gimmicks. |
| **Iconography** | **Lucide React** | Crisp, lightweight, accessible SVG icons for stage statuses, verification badges, and achievements. |
| **State & Persistence** | **Reactive Singleton Store + LocalStorage** | Full local persistence across sessions with built-in JSON export and import capabilities. Guarantees immutable append-only XP events and strict idempotency (anti-double-award policy). |

---

## 2. Core Product Principles Implemented

### A. Authoritative 51-Subject CS Curriculum Preserved
- All **51 subjects** are preserved in their exact canonical `curriculum_order` (1 to 51).
- Unassigned year/semester policy strictly respected: no false four-year groupings are inferred.
- Source names are preserved (including `prob and stat`, `mutli media`, and `software mainenance and evolution`) alongside clean display titles.
- Students explicitly mark **Currently studying** subjects to prioritize recommendations for their active term.

### B. Evidence-Based Resource Curation
- Verified candidates are grounded in established university curricula and guides (**OSSU CS, TeachYourselfCS, MIT OpenCourseWare, Harvard CS50, Stanford SEE, CMU Database Group, ACM CS2023**).
- **Primary Recommendation — Balanced Core** label is granted only to courses that combine theoretical instruction with substantive problem sets, autograded assignments, or labs (e.g. Harvard CS50x, Berkeley CS61B, Stanford CS161, OSTEP, CMU 15-445, Stanford CS144).
- Textbooks are sourced exclusively from reputable academic and technical publishers (**MIT Press, Pearson / Addison-Wesley, O'Reilly Media, McGraw-Hill**) with specified chapters.
- Transparent cards display: **Why Recommended**, **Covered Topics & Outcomes**, **Known Gaps / What Is Not Covered**, **Theory & Practice Quality Assessments**, and **Verification Evidence Links**.
- Explicit honest state: subjects without verified resources display a clear **"Resources are being curated"** status instead of fabricated records.

### C. Progressive Staged Learning Model
- **Stage 1 (Core Competence):** Primary baseline combining theory and practice, ending in a subject synthesis checkpoint.
- **Stage 2 (Deeper Theory & Practice):** Rigorous proofs, advanced literature, and edge-case implementations for students moving beyond baseline mastery.
- **Applied Project Extension:** Unlocked after completing Stage 1. Requires building, testing, and documenting a functional software artifact (e.g. *Gitlet version control system*, *preemptive thread library*, *disk-backed key-value store with WAL*, *concurrent HTTP/1.1 epoll server*).

### D. Independent Academic vs Gamification Progression
- **University Academic Year (1–4)** and **Player Level (1–10)** are strictly separated. University standing never dictates player level, and earning XP never alters academic standing.
- **Authoritative XP Ledger:** Append-only event history where XP is credited strictly on the first verified completion. Re-clicking or resubmitting updates notes without duplicating XP.
- **Consistent Study Streak:** Tracks active study days without wiping out earned XP or completed stages upon a break.
- **Verified Achievements:** Milestone badges awarded for first problem set, first systems lab, core checkpoints, and applied projects.

---

## 3. Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` or `v22+`
- npm `v9+` or `v10+`

### Installation
```bash
# Clone or navigate to the project directory
cd "/home/karem_wageh/Downloads/Project Vibes"

# Install dependencies (already executed)
npm install
```

### Running the Application
```bash
# Start the local Vite development server
npm run dev

# Or build for production and run preview
npm run build
npm run preview
```

### Running the Domain & Acceptance Test Suite
```bash
# Execute the automated acceptance criteria verification suite
node scripts/verify-mvp.cjs
```

---

## 4. Acceptance Criteria Checklist Status

| # | Acceptance Criterion | Status | Implementation Verification |
|---|---|---|---|
| 1 | Create / enter learner profile | **Complete** | Profile modal with name, preferences, and university standing. |
| 2 | Select academic year & mark current subjects | **Complete** | Searchable multi-select over all 51 subjects in profile modal. |
| 3 | Selected current subjects prioritized in Today | **Complete** | `getPrioritizedRecommendations` puts current subjects at the top. |
| 4 | Open subject detail with stages, roles & limitations | **Complete** | `SubjectDetailView` with tabs, role badges, and known gaps. |
| 5 | Uncurated resources not shown as verified | **Complete** | Honest "Resources in Curation" state for pending subjects. |
| 6 | Start & complete activity, update XP | **Complete** | `ActivityCompletionModal` records progress and appends XP. |
| 7 | Duplicate completion prevention (Idempotency) | **Complete** | Checked against XP ledger; re-clicking never doubles XP. |
| 8 | State persistence across reloads | **Complete** | Stored in `localStorage` with JSON export/import capability. |
| 9 | Player level independent of university year | **Complete** | Separate level calculation engine with dedicated UI indicators. |
| 10 | Applied projects surfaced after Stage 1 completion | **Complete** | Highlighted on Dashboard and Applied Projects screen. |
| 11 | Uncurated subjects browseable with honest state | **Complete** | All 30 uncurated subjects show syllabus and pending banner. |
| 12 | No fake claims, AI hallucinations, or fake stats | **Complete** | All evidence links and dates are factual and inspectable. |
| 13 | Build / type / lint checks pass with zero errors | **Complete** | `tsc && vite build` exits with code 0. |

---

## 5. Implementation Verification Summary

- **Curriculum Catalog:** All 51 subjects populated in preserved sequence (`curriculum_order` 1 to 51).
- **Curated Foundational Set:** 21 subjects with verified courses (Harvard, MIT, Berkeley, Stanford, CMU, OSTEP, Helsinki) and textbooks (MIT Press, Pearson, O'Reilly, McGraw-Hill).
- **Automated Tests:** 9/9 acceptance tests passing in `scripts/verify-mvp.cjs`.
- **Production Build:** `dist/` bundle created with zero TypeScript errors.
