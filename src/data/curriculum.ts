import { Subject } from '../types';

export const CURRICULUM_SUBJECTS: Subject[] = [
  {
    id: 'discrete-maths',
    curriculumOrder: 1,
    rawName: 'Discrete maths',
    cleanName: 'Discrete Mathematics',
    category: 'foundations',
    shortDescription: 'Mathematical reasoning, propositional logic, sets, relations, graphs, and combinatorics essential for computation.',
    academicYear: null,
    semester: null,
    topics: ['Propositional & Predicate Logic', 'Mathematical Proofs & Induction', 'Sets, Relations & Functions', 'Combinatorics & Counting', 'Graph Theory Basics', 'Modular Arithmetic & Cryptography foundations'],
    learningOutcomes: [
      'Construct formal mathematical proofs using direct, contrapositive, and contradiction techniques',
      'Model computational problems using graph theory and relation structures',
      'Apply asymptotic reasoning and discrete counting to algorithmic bounds'
    ],
    prerequisites: [],
    hasCuratedResources: true,
    curatedResourceIds: ['res-mit-6042j', 'res-book-mit-discrete', 'res-book-rosen-discrete']
  },
  {
    id: 'prob-and-stat',
    curriculumOrder: 2,
    rawName: 'prob and stat',
    cleanName: 'Probability and Statistics',
    category: 'foundations',
    shortDescription: 'Random variables, probability distributions, statistical inference, hypothesis testing, and regression analysis for computing.',
    academicYear: null,
    semester: null,
    topics: ['Sample Spaces & Conditioning', 'Bayes Theorem', 'Discrete & Continuous Distributions', 'Expectation & Variance', 'Central Limit Theorem', 'Hypothesis Testing'],
    learningOutcomes: [
      'Compute conditional probabilities and formulate Bayesian inferences',
      'Select and fit appropriate probability distributions for empirical data',
      'Perform hypothesis tests and compute p-values for software and experimental metrics'
    ],
    prerequisites: ['discrete-maths'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-mit-res6-012', 'res-book-blitzstein-stat']
  },
  {
    id: 'digital-logic',
    curriculumOrder: 3,
    rawName: 'digital logic',
    cleanName: 'Digital Logic & Circuit Design',
    category: 'systems',
    shortDescription: 'Boolean algebra, logic gates, combinational circuits, flip-flops, sequential circuit design, and state machines.',
    academicYear: null,
    semester: null,
    topics: ['Boolean Algebra & Karnaugh Maps', 'Combinational Logic: Adders, Decoders, Multiplexers', 'Sequential Logic: Latches & Flip-Flops', 'Finite State Machines (Moore & Mealy)', 'Registers & Counters'],
    learningOutcomes: [
      'Synthesize and minimize combinational circuits using Karnaugh maps',
      'Design robust synchronous sequential circuits and finite state machines',
      'Analyze timing constraints and propagation delays in digital circuits'
    ],
    prerequisites: ['discrete-maths'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-nand2tetris-pt1', 'res-book-harris-digital']
  },
  {
    id: 'intro-to-cs',
    curriculumOrder: 4,
    rawName: 'intro to cs',
    cleanName: 'Introduction to Computer Science',
    category: 'foundations',
    shortDescription: 'Foundational algorithmic thinking, computational problem solving, memory models, data representations, and programmatic design.',
    academicYear: null,
    semester: null,
    topics: ['Computational Thinking & Abstraction', 'Data Types & Control Flow', 'Memory Management & Pointers (C)', 'Recursion & Basic Algorithms', 'Python Scripting & Data Analysis', 'SQL & Web Foundations'],
    learningOutcomes: [
      'Deconstruct complex real-world tasks into verifiable procedural algorithms',
      'Trace and debug low-level memory allocation, pointer arithmetic, and buffer boundaries',
      'Implement, test, and package an end-to-end command-line software utility'
    ],
    prerequisites: [],
    hasCuratedResources: true,
    curatedResourceIds: ['res-harvard-cs50x', 'res-mit-60001', 'res-book-sicp']
  },
  {
    id: 'intro-to-is',
    curriculumOrder: 5,
    rawName: 'intro to is',
    cleanName: 'Introduction to Information Systems',
    category: 'foundations',
    shortDescription: 'Role of information systems in organizations, data governance, enterprise architectures, business processes, and IT strategy.',
    academicYear: null,
    semester: null,
    topics: ['Enterprise Information Architectures', 'Business Process Modeling', 'Data Governance & Security Policy', 'Decision Support Systems', 'Cloud & SaaS Strategies'],
    learningOutcomes: [
      'Evaluate how IT architectures align with business operational goals',
      'Model organizational workflow processes using standard BPMN notation',
      'Formulate information risk mitigation and data management policies'
    ],
    prerequisites: [],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'linear-algebra',
    curriculumOrder: 6,
    rawName: 'linear algebra',
    cleanName: 'Linear Algebra',
    category: 'foundations',
    shortDescription: 'Vector spaces, matrix operations, systems of linear equations, eigenvalues, eigenvectors, and singular value decomposition.',
    academicYear: null,
    semester: null,
    topics: ['Matrix Operations & Inverses', 'Vector Spaces & Subspaces', 'Linear Independence, Basis & Dimension', 'Orthogonality & Gram-Schmidt', 'Eigenvalues & Eigenvectors', 'Singular Value Decomposition (SVD)'],
    learningOutcomes: [
      'Solve and geometrically interpret large systems of linear equations',
      'Compute matrix factorizations (LU, QR, SVD) and utilize them in numerical software',
      'Project high-dimensional data onto orthogonal subspaces for ML and graphics'
    ],
    prerequisites: [],
    hasCuratedResources: true,
    curatedResourceIds: ['res-mit-1806-strang', 'res-book-strang-la']
  },
  {
    id: 'programming-principles-cpp',
    curriculumOrder: 7,
    rawName: 'programming principles cpp',
    cleanName: 'Programming Principles using C++',
    category: 'systems',
    shortDescription: 'Modern C++ programming, type systems, memory safety, RAII, pointers, references, standard template library (STL), and generic programming.',
    academicYear: null,
    semester: null,
    topics: ['C++ Type System & Streams', 'Pointers, References & Dynamic Memory', 'Resource Acquisition Is Initialization (RAII)', 'Constructors, Destructors & Rule of 5', 'STL Containers & Iterators', 'Templates & Generic Algorithms'],
    learningOutcomes: [
      'Write idiomatic modern C++ adhering to RAII and deterministic resource cleanup',
      'Manage heap memory safely using smart pointers (unique_ptr, shared_ptr)',
      'Design template classes and leverage the Standard Template Library efficiently'
    ],
    prerequisites: ['intro-to-cs'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-stanford-cs106l', 'res-book-stroustrup-cpp', 'res-book-meyers-moderncpp']
  },
  {
    id: 'mutli-media',
    curriculumOrder: 8,
    rawName: 'mutli media',
    cleanName: 'Multimedia Systems',
    category: 'specialized',
    shortDescription: 'Digital representation of audio, image, and video; compression algorithms (JPEG, MPEG), streaming protocols, and multimedia processing.',
    academicYear: null,
    semester: null,
    topics: ['Color Spaces & Image Representation', 'Lossless vs Lossy Compression', 'Discrete Cosine Transform & JPEG', 'Video Encoding & Temporal Redundancy', 'Digital Audio Sampling & Nyquist Theorem'],
    learningOutcomes: [
      'Quantize and transform raster audio/visual signals into compressed bitstreams',
      'Implement transform-based encoding algorithms (DCT, Huffman coding)',
      'Profile network latency and buffering parameters for real-time video streaming'
    ],
    prerequisites: ['linear-algebra'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'system-analysis-and-design',
    curriculumOrder: 9,
    rawName: 'system analysis and design',
    cleanName: 'System Analysis and Design',
    category: 'software_eng',
    shortDescription: 'Software lifecycle models, requirements elicitation, structured systems modeling, UML diagrams, and architectural feasibility.',
    academicYear: null,
    semester: null,
    topics: ['System Development Methodologies (Agile, Waterfall)', 'Stakeholder Requirements Elicitation', 'Use Case & Domain Modeling', 'Data Flow Diagrams & UML Interaction', 'System Architecture Specifications'],
    learningOutcomes: [
      'Translate informal stakeholder demands into verified functional requirements',
      'Construct complete UML domain, sequence, and class diagrams',
      'Synthesize an architectural blueprint for a distributed enterprise solution'
    ],
    prerequisites: ['intro-to-is'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'computer-organization-and-architecture',
    curriculumOrder: 10,
    rawName: 'computer organization and architecture',
    cleanName: 'Computer Organization & Architecture',
    category: 'systems',
    shortDescription: 'Instruction set architectures (RISC/CISC), processor datapath, pipelining, hazards, memory hierarchy, caching, and I/O bus systems.',
    academicYear: null,
    semester: null,
    topics: ['Instruction Set Architecture (RISC-V/MIPS)', 'Single-Cycle & Multi-Cycle Datapath', 'Pipelining & Hazard Resolution', 'Cache Memory Hierarchy & Locality', 'Virtual Memory & Page Translation', 'Bus Architectures & Interrupts'],
    learningOutcomes: [
      'Trace instructions through a 5-stage RISC processor pipeline and mitigate branch/data hazards',
      'Calculate cache hit/miss penalties across direct-mapped and associative hierarchies',
      'Synthesize an assembly program interacting with low-level memory-mapped I/O'
    ],
    prerequisites: ['digital-logic'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-nand2tetris-pt1', 'res-book-patterson-hennessy']
  },
  {
    id: 'software-engineering',
    curriculumOrder: 11,
    rawName: 'software engineering',
    cleanName: 'Software Engineering',
    category: 'software_eng',
    shortDescription: 'Agile methodologies, software architecture patterns, test-driven development, continuous integration, version control, and code maintenance.',
    academicYear: null,
    semester: null,
    topics: ['Agile Scrum & Kanban Practices', 'Architectural Design Patterns', 'Test-Driven Development (TDD) & Mocking', 'Continuous Integration / Continuous Deployment (CI/CD)', 'Refactoring & Technical Debt Management'],
    learningOutcomes: [
      'Lead automated test-driven development sprints with reproducible CI checks',
      'Architect modular, loosely coupled software services applying SOLID principles',
      'Conduct rigorous peer code reviews prioritizing maintainability and safety'
    ],
    prerequisites: ['programming-principles-cpp'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-berkeley-cs169', 'res-book-sommerville-se']
  },
  {
    id: 'OOP',
    curriculumOrder: 12,
    rawName: 'OOP',
    cleanName: 'Object-Oriented Programming',
    category: 'foundations',
    shortDescription: 'Encapsulation, inheritance, polymorphism, abstract classes, interfaces, design patterns, and modular application development.',
    academicYear: null,
    semester: null,
    topics: ['Classes, Objects & Encapsulation', 'Inheritance & Subtyping', 'Polymorphism & Dynamic Dispatch', 'Interfaces & Abstract Classes', 'Object-Oriented Design Patterns', 'Exception Handling & Robustness'],
    learningOutcomes: [
      'Design cohesive, extensible class hierarchies utilizing interfaces and polymorphism',
      'Apply classic GoF patterns (Factory, Observer, Strategy, Decorator) to real problems',
      'Implement robust error-handling and automated unit tests for object graphs'
    ],
    prerequisites: ['programming-principles-cpp'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-helsinki-mooc-java', 'res-book-headfirst-design-patterns', 'res-book-effective-java']
  },
  {
    id: 'web-design-and-development',
    curriculumOrder: 13,
    rawName: 'web design and development',
    cleanName: 'Web Design and Development',
    category: 'systems',
    shortDescription: 'Client-server architecture, modern HTML5/CSS, responsive UI design, JavaScript/TypeScript, RESTful APIs, and state management.',
    academicYear: null,
    semester: null,
    topics: ['Modern Semantic HTML & CSS Flex/Grid', 'DOM Manipulation & Event Loop', 'TypeScript & Component-Based UI (React)', 'RESTful API Design & HTTP Protocols', 'Client State Management & Async Fetching', 'Web Security: CORS, XSS, CSRF'],
    learningOutcomes: [
      'Construct accessible, responsive multi-device web user interfaces',
      'Implement client-server communication using typed REST endpoints',
      'Secure web applications against cross-site scripting and unauthorized access'
    ],
    prerequisites: ['OOP'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-helsinki-fullstackopen', 'res-book-learning-typescript']
  },
  {
    id: 'data-structures',
    curriculumOrder: 14,
    rawName: 'data structures',
    cleanName: 'Data Structures',
    category: 'foundations',
    shortDescription: 'Arrays, linked lists, stacks, queues, hash tables, binary search trees, balanced trees (AVL, Red-Black), heaps, and graphs.',
    academicYear: null,
    semester: null,
    topics: ['Asymptotic Analysis & Big-O Notation', 'Linear Structures: Lists, Stacks, Queues', 'Hash Tables & Collision Resolution', 'Binary Search Trees & Balanced Trees (AVL, Red-Black)', 'Heaps & Priority Queues', 'Disjoint Sets (Union-Find)'],
    learningOutcomes: [
      'Implement fundamental and self-balancing data structures from scratch',
      'Analyze time and space complexity tradeoffs across competing data structures',
      'Select and benchmark the optimal data structure for real-world memory and speed constraints'
    ],
    prerequisites: ['OOP', 'discrete-maths'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-berkeley-cs61b', 'res-princeton-algs-part1', 'res-book-weiss-dsa']
  },
  {
    id: 'database-systems',
    curriculumOrder: 15,
    rawName: 'database systems',
    cleanName: 'Database Systems',
    category: 'systems',
    shortDescription: 'Relational model, SQL querying, normalization, B+ tree indexing, buffer pool management, transactions, ACID, and concurrency control.',
    academicYear: null,
    semester: null,
    topics: ['Relational Model & Relational Algebra', 'Complex SQL Queries, Views & Triggers', 'Normalization (1NF, 2NF, 3NF, BCNF)', 'B+ Tree Indexing & Hash Indices', 'Buffer Pool & Storage Engine Internals', 'Transactions, ACID & Two-Phase Locking'],
    learningOutcomes: [
      'Formulate performant relational schemas up to Boyce-Codd Normal Form',
      'Write optimized SQL queries and analyze query execution plans',
      'Explain storage engine mechanics including write-ahead logging (WAL) and B+ tree storage'
    ],
    prerequisites: ['data-structures'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-cmu-15445', 'res-book-silberschatz-db', 'res-book-kleppmann-ddia']
  },
  {
    id: 'computer-networks',
    curriculumOrder: 16,
    rawName: 'computer networks',
    cleanName: 'Computer Networks',
    category: 'systems',
    shortDescription: 'Layered network architectures (OSI/TCP-IP), application protocols (HTTP, DNS), transport (TCP, UDP), routing algorithms, and link layer.',
    academicYear: null,
    semester: null,
    topics: ['Layered Architectures & Packet Switching', 'Application Layer: HTTP/HTTPS, DNS, SMTP', 'Transport Layer: TCP Reliability, Flow Control & Congestion', 'UDP Protocols & Real-time Streaming', 'Network Layer: IP Addressing, CIDR & Routing (BGP, OSPF)', 'Link Layer: Ethernet, ARP & MAC Protocols'],
    learningOutcomes: [
      'Explain end-to-end packet delivery across all layers of the Internet protocol stack',
      'Write concurrent network client and server socket programs using TCP and UDP',
      'Analyze packet traces with Wireshark to diagnose latency, drops, and retransmissions'
    ],
    prerequisites: ['computer-organization-and-architecture'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-stanford-cs144', 'res-book-kurose-ross', 'res-wireshark-labs']
  },
  {
    id: 'Software-project-management',
    curriculumOrder: 17,
    rawName: 'Software project management',
    cleanName: 'Software Project Management',
    category: 'software_eng',
    shortDescription: 'Project estimation, scheduling (PERT/CPM), team dynamics, risk management, agile release planning, and quality assurance.',
    academicYear: null,
    semester: null,
    topics: ['Project Scoping & Work Breakdown Structures', 'Effort Estimation (COCOMO, Story Points)', 'Critical Path Method & Gantt Scheduling', 'Risk Identification & Mitigation Matrices', 'Agile Velocity & Sprint Retrospectives'],
    learningOutcomes: [
      'Construct a comprehensive software project plan with work breakdown structures and milestones',
      'Calculate critical path timelines and resource allocation trade-offs',
      'Establish quantitative quality metrics and manage operational software delivery risk'
    ],
    prerequisites: ['software-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'algorithms-analysis-and-design',
    curriculumOrder: 18,
    rawName: 'algorithms analysis and design',
    cleanName: 'Algorithms Analysis and Design',
    category: 'foundations',
    shortDescription: 'Divide-and-conquer, greedy algorithms, dynamic programming, graph algorithms (Dijkstra, Bellman-Ford, Kruskal), network flows, and NP-completeness.',
    academicYear: null,
    semester: null,
    topics: ['Divide and Conquer & Master Theorem', 'Greedy Algorithms & Matroids', 'Dynamic Programming Formulations', 'Graph Search: Dijkstra, Bellman-Ford, Floyd-Warshall', 'Maximum Network Flow (Ford-Fulkerson)', 'NP-Completeness & Reductions'],
    learningOutcomes: [
      'Design and prove the correctness of optimal dynamic programming and greedy algorithms',
      'Solve network optimization and shortest-path problems using classical graph algorithms',
      'Demonstrate problem intractability through polynomial-time reductions to NP-Complete problems'
    ],
    prerequisites: ['data-structures', 'discrete-maths'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-stanford-cs161', 'res-book-clrs-4th', 'res-book-dasgupta-algs']
  },
  {
    id: 'compiler-design',
    curriculumOrder: 19,
    rawName: 'compiler design',
    cleanName: 'Compiler Design',
    category: 'systems',
    shortDescription: 'Lexical analysis (lexing), syntax analysis (parsing), semantic analysis, intermediate representation, code optimization, and code generation.',
    academicYear: null,
    semester: null,
    topics: ['Regular Expressions & Lexical Analysis (DFA/NFA)', 'Context-Free Grammars & LL/LR Parsing', 'Abstract Syntax Trees & Symbol Tables', 'Type Checking & Semantic Analysis', 'Intermediate Code Generation (Three-Address Code)', 'Basic Block Optimization & Register Allocation'],
    learningOutcomes: [
      'Construct a lexer and recursive-descent or LR parser for a programming language grammar',
      'Generate and manipulate typed Abstract Syntax Trees (ASTs)',
      'Emit executable machine code or bytecode from high-level source programs'
    ],
    prerequisites: ['theory-of-computation', 'computer-organization-and-architecture'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-stanford-cs143-compilers', 'res-book-dragon-compilers']
  },
  {
    id: 'advanced-programming-dynamic-languages',
    curriculumOrder: 20,
    rawName: 'Advanced programming and dynamic languages',
    cleanName: 'Advanced Programming & Dynamic Languages',
    category: 'systems',
    shortDescription: 'Metaprogramming, closures, dynamic type dispatch, functional programming paradigms, asynchronous runtime loops, and memory profiling.',
    academicYear: null,
    semester: null,
    topics: ['First-Class Functions & Closures', 'Prototypes & Dynamic Dispatch', 'Metaprogramming & Reflection', 'Event Loops & Concurrency Models', 'Garbage Collection Algorithms in Dynamic Runtimes'],
    learningOutcomes: [
      'Utilize functional paradigms (map, filter, fold, currying) to express concise transformations',
      'Architect event-driven asynchronous workflows without deadlock or thread exhaustion',
      'Profile memory allocations and memory leaks in garbage-collected environments'
    ],
    prerequisites: ['programming-principles-cpp', 'OOP'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'operating-systems',
    curriculumOrder: 21,
    rawName: 'Operating systems',
    cleanName: 'Operating Systems',
    category: 'systems',
    shortDescription: 'Process management, threads, synchronization (mutexes, semaphores), CPU scheduling, memory virtualization, paging, file systems, and crash recovery.',
    academicYear: null,
    semester: null,
    topics: ['Processes, Syscalls & Context Switching', 'Threads & Synchronization (Locks, Semaphores, Condition Variables)', 'CPU Scheduling Policies & Priority Inversion', 'Virtual Memory, Multi-Level Page Tables & TLB', 'File System Layouts, Inodes & Directory Trees', 'Crash Recovery: Journaling & Log-Structured File Systems'],
    learningOutcomes: [
      'Implement thread synchronization preventing deadlocks, data races, and starvation',
      'Trace virtual memory address translation through hardware page tables and the OS kernel',
      'Write kernel-level system software interacting directly with device drivers and file systems'
    ],
    prerequisites: ['computer-organization-and-architecture', 'data-structures'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-ostep-course', 'res-book-ostep', 'res-book-tanenbaum-mos']
  },
  {
    id: 'software-processes-engineering',
    curriculumOrder: 22,
    rawName: 'Software Processes engineering',
    cleanName: 'Software Processes Engineering',
    category: 'software_eng',
    shortDescription: 'Software process assessment (CMMI, SPICE), process improvement cycles, measurement frameworks, and organizational maturity.',
    academicYear: null,
    semester: null,
    topics: ['Process Maturity Models (CMMI)', 'Continuous Improvement Frameworks (PDCA)', 'Empirical Process Measurement & Metrics', 'Process Customization & Tailoring'],
    learningOutcomes: [
      'Assess software organization workflows against capability maturity frameworks',
      'Establish quantitative process control metrics for engineering throughput and defect rates'
    ],
    prerequisites: ['software-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'ai',
    curriculumOrder: 23,
    rawName: 'ai',
    cleanName: 'Artificial Intelligence',
    category: 'applied_ai',
    shortDescription: 'Search algorithms (A*, minimax, alpha-beta pruning), constraint satisfaction, knowledge representation, probabilistic reasoning, and Markov decision processes.',
    academicYear: null,
    semester: null,
    topics: ['Uninformed & Informed Search (A*, Greedy BFS)', 'Adversarial Search & Minimax with Alpha-Beta Pruning', 'Constraint Satisfaction Problems (CSP)', 'Bayesian Networks & Probabilistic Reasoning', 'Markov Decision Processes & Reinforcement Learning basics'],
    learningOutcomes: [
      'Formulate domain problems as state-space search and implement heuristic A* search',
      'Build game-playing agents using minimax and alpha-beta pruning heuristics',
      'Implement inference algorithms on directed acyclic Bayesian networks'
    ],
    prerequisites: ['algorithms-analysis-and-design', 'prob-and-stat'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-berkeley-cs188-ai', 'res-book-russell-norvig-aima']
  },
  {
    id: 'security-and-cryptography',
    curriculumOrder: 24,
    rawName: 'Security and cryptography',
    cleanName: 'Security and Cryptography',
    category: 'systems',
    shortDescription: 'Symmetric encryption (AES), public-key cryptography (RSA, ECC), cryptographic hashes, authentication protocols, digital signatures, and threat modeling.',
    academicYear: null,
    semester: null,
    topics: ['Symmetric Ciphers & Block Cipher Modes (AES-GCM)', 'Public Key Cryptography: RSA, Diffie-Hellman, ECC', 'Cryptographic Hash Functions & HMAC', 'Digital Signatures & Public Key Infrastructure (PKI)', 'TLS Handshake & Secure Channel Establishment', 'Authentication, Access Control & Common Vulnerabilities'],
    learningOutcomes: [
      'Explain mathematical principles behind public key cryptography and digital certificates',
      'Implement authenticated encryption pipelines preventing tampering and replay attacks',
      'Conduct software threat modeling identifying injection, buffer overflow, and side-channel threats'
    ],
    prerequisites: ['discrete-maths', 'computer-networks'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-stanford-crypto1', 'res-book-serious-cryptography']
  },
  {
    id: 'mobile-app-dev',
    curriculumOrder: 25,
    rawName: 'Mobile app dev.',
    cleanName: 'Mobile Application Development',
    category: 'systems',
    shortDescription: 'Native and cross-platform mobile architectures, mobile lifecycle management, touch gestures, offline storage, sensor integration, and push notifications.',
    academicYear: null,
    semester: null,
    topics: ['Mobile Application Lifecycle & State Preservation', 'Declarative UI Layouts & Responsive Views', 'Local SQLite & Secure Storage on Device', 'Background Workers & Push Notifications', 'Hardware Sensor Access: GPS, Camera, Accelerometer'],
    learningOutcomes: [
      'Build performant mobile apps with offline persistence and responsive layouts',
      'Manage background tasks and push notification channels without draining battery',
      'Package and release signed application binaries to mobile distribution channels'
    ],
    prerequisites: ['OOP', 'web-design-and-development'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'software-requirements-engineering',
    curriculumOrder: 26,
    rawName: 'Software requirements engineering',
    cleanName: 'Software Requirements Engineering',
    category: 'software_eng',
    shortDescription: 'Requirements elicitation, specification writing (SRS), requirements validation, traceability matrices, and change management.',
    academicYear: null,
    semester: null,
    topics: ['Stakeholder Interviews & Elicitation Methods', 'User Stories & Acceptance Criteria Writing', 'Software Requirements Specification (IEEE 830 / ISO 29148)', 'Requirements Traceability & Impact Analysis'],
    learningOutcomes: [
      'Draft formal, unambiguous software requirement specifications',
      'Establish bi-directional traceability between user requirements and test artifacts'
    ],
    prerequisites: ['software-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'human-computer-interaction',
    curriculumOrder: 27,
    rawName: 'Human computer interaction',
    cleanName: 'Human-Computer Interaction (HCI)',
    category: 'specialized',
    shortDescription: 'Cognitive models of interaction, user-centered design, usability testing, prototyping, heuristics evaluation (Nielsen), and accessibility (WCAG).',
    academicYear: null,
    semester: null,
    topics: ['Nielsen Usability Heuristics', 'User Centered Design & Persona Building', 'Low-Fidelity & High-Fidelity Wireframing', 'Quantitative Usability Testing & A/B Experiments', 'Accessibility Standards (WCAG 2.2 AA)'],
    learningOutcomes: [
      'Conduct rigorous heuristic evaluations identifying UX friction and accessibility violations',
      'Design and iterate interactive UI prototypes grounded in user testing feedback'
    ],
    prerequisites: ['web-design-and-development'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'parallel-programming',
    curriculumOrder: 28,
    rawName: 'Parallel programming',
    cleanName: 'Parallel Programming',
    category: 'systems',
    shortDescription: 'Shared memory multiprocessing (OpenMP), message passing (MPI), GPU programming (CUDA), synchronization hazards, and Amdahl\'s law.',
    academicYear: null,
    semester: null,
    topics: ['Amdahl\'s Law & Gustafson\'s Law', 'Shared Memory Threading with OpenMP', 'Distributed Memory Message Passing (MPI)', 'GPU Massively Parallel Computing (CUDA)', 'Race Conditions, Locks & Lock-Free Data Structures'],
    learningOutcomes: [
      'Analyze parallel speedup and identify memory bandwidth and serialization bottlenecks',
      'Implement multi-threaded and message-passing parallel algorithms in C/C++',
      'Write GPU compute kernels utilizing shared memory and warp divergence minimization'
    ],
    prerequisites: ['operating-systems', 'programming-principles-cpp'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'microprocessors-and-assembly-language',
    curriculumOrder: 29,
    rawName: 'microprocessors and assembly language',
    cleanName: 'Microprocessors and Assembly Language',
    category: 'systems',
    shortDescription: 'Microprocessor architectures (x86/ARM), registers, addressing modes, assembly programming, stack frames, calling conventions, and BIOS/device interrupts.',
    academicYear: null,
    semester: null,
    topics: ['x86-64 / ARM Register Sets', 'Memory Addressing Modes & Instruction Formats', 'Calling Conventions, Stack Frames & Local Variables', 'BIOS/OS Interrupts & Low-Level Device Interfacing', 'Bitwise Manipulation & Optimization'],
    learningOutcomes: [
      'Read and author assembly routines conforming strictly to System V / Windows calling conventions',
      'Reverse-engineer compiled binaries and analyze stack frame allocations',
      'Interact with microprocessor peripheral ports and interrupt service routines'
    ],
    prerequisites: ['computer-organization-and-architecture'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'theory-of-computation',
    curriculumOrder: 30,
    rawName: 'theory of computation',
    cleanName: 'Theory of Computation',
    category: 'theory',
    shortDescription: 'Finite automata (DFA/NFA), regular languages, context-free grammars, pushdown automata, Turing machines, decidability, and the Halting Problem.',
    academicYear: null,
    semester: null,
    topics: ['Deterministic & Nondeterministic Finite Automata', 'Regular Expressions & Pumping Lemma for Regular Languages', 'Context-Free Grammars & Pushdown Automata', 'Turing Machines & Church-Turing Thesis', 'Decidability & The Halting Problem', 'Time Complexity Classes: P, NP, NP-Complete'],
    learningOutcomes: [
      'Design DFAs, NFAs, and regular expressions, proving language equivalence',
      'Apply the pumping lemma to establish non-regularity of specific languages',
      'Prove computational undecidability using Turing machine reduction proofs'
    ],
    prerequisites: ['discrete-maths', 'algorithms-analysis-and-design'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-mit-18404-theory', 'res-book-sipser-toc']
  },
  {
    id: 'embedded-systems',
    curriculumOrder: 31,
    rawName: 'Embedded systems',
    cleanName: 'Embedded Systems',
    category: 'systems',
    shortDescription: 'Microcontroller programming (ARM Cortex-M), real-time operating systems (RTOS), timers, GPIO, communication buses (I2C, SPI, UART), and power management.',
    academicYear: null,
    semester: null,
    topics: ['Microcontroller Architectures (ARM Cortex)', 'General Purpose I/O (GPIO), Timers & PWM', 'Serial Bus Protocols: UART, SPI, I2C', 'Real-Time Operating Systems (FreeRTOS)', 'Interrupt Handling & Low-Power Sleep States'],
    learningOutcomes: [
      'Develop embedded C firmware controlling external sensors over I2C/SPI buses',
      'Architect real-time multithreaded task schedules utilizing FreeRTOS',
      'Debug low-level hardware timing issues using digital logic analyzers'
    ],
    prerequisites: ['computer-organization-and-architecture', 'programming-principles-cpp'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'computer-graphics',
    curriculumOrder: 32,
    rawName: 'computer graphics',
    cleanName: 'Computer Graphics',
    category: 'specialized',
    shortDescription: 'Graphics rendering pipeline, 3D transformations, illumination models (Phong), ray tracing, shaders (GLSL), rasterization, and textures.',
    academicYear: null,
    semester: null,
    topics: ['3D Coordinate Transformations & Homogeneous Coordinates', 'The OpenGL / WebGL Programmable Pipeline', 'Vertex & Fragment Shaders (GLSL)', 'Lighting & Shading: Phong, Blinn-Phong, PBR', 'Ray Tracing & Global Illumination', 'Texture Mapping & Clipping Algorithms'],
    learningOutcomes: [
      'Implement custom vertex and fragment shaders for real-time 3D rendering',
      'Construct a software rasterizer and ray tracer calculating surface reflections and refractions',
      'Apply 3D matrix transformations for camera view, perspective, and mesh positioning'
    ],
    prerequisites: ['linear-algebra', 'programming-principles-cpp'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'advanced-database-systems',
    curriculumOrder: 33,
    rawName: 'advanced database systems',
    cleanName: 'Advanced Database Systems',
    category: 'systems',
    shortDescription: 'Query optimization algorithms, columnar storage, distributed consensus (Raft/Paxos), multi-version concurrency control (MVCC), and NoSQL engines.',
    academicYear: null,
    semester: null,
    topics: ['Query Compilation & Cost-Based Optimizers', 'Columnar Storage & Vectorized Execution', 'Multi-Version Concurrency Control (MVCC)', 'Distributed Transactions & Two-Phase Commit', 'Log-Structured Merge-Trees (LSM-Trees) in NoSQL'],
    learningOutcomes: [
      'Design query execution plans utilizing cost-based optimization heuristics',
      'Implement an LSM-Tree storage engine with memtables and SSTables',
      'Analyze consistency guarantees across Paxos and Raft distributed clusters'
    ],
    prerequisites: ['database-systems'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'software-verification-and-validation',
    curriculumOrder: 34,
    rawName: 'software verification and validation',
    cleanName: 'Software Verification and Validation',
    category: 'software_eng',
    shortDescription: 'Static analysis, automated unit/integration testing, mutation testing, formal invariant checks, boundary testing, and code coverage metrics.',
    academicYear: null,
    semester: null,
    topics: ['Static Analysis & Linter Rules', 'Code Coverage Metrics (Statement, Branch, MC/DC)', 'Mutation Testing & Fault Injection', 'Automated Test Generation & Fuzzing', 'Invariant Specification & Assertions'],
    learningOutcomes: [
      'Construct rigorous test suites achieving modified condition/decision coverage (MC/DC)',
      'Deploy fuzzing tools to detect memory vulnerabilities and crash states',
      'Formalize software contracts using preconditions, postconditions, and class invariants'
    ],
    prerequisites: ['software-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'software-quality-assurance',
    curriculumOrder: 35,
    rawName: 'software quality assurance',
    cleanName: 'Software Quality Assurance',
    category: 'software_eng',
    shortDescription: 'QA frameworks, automated test suites (Selenium, Playwright), performance profiling, load testing, security auditing, and defect tracking.',
    academicYear: null,
    semester: null,
    topics: ['Quality Management Systems (ISO 9001/IEC 25010)', 'End-to-End Automated Browser Testing', 'Performance & Load Testing (JMeter, k6)', 'Defect Lifecycle Management & Root Cause Analysis'],
    learningOutcomes: [
      'Implement automated end-to-end regression pipelines in continuous deployment environments',
      'Execute load testing simulations identifying server capacity limits and memory bottlenecks'
    ],
    prerequisites: ['software-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'object-oriented-software-engineering',
    curriculumOrder: 36,
    rawName: 'object-oriented software engineering',
    cleanName: 'Object-Oriented Software Engineering',
    category: 'software_eng',
    shortDescription: 'Advanced domain-driven design (DDD), enterprise design patterns, dependency injection frameworks, and large-scale object architectures.',
    academicYear: null,
    semester: null,
    topics: ['Domain-Driven Design (Entities, Value Objects, Aggregates)', 'Dependency Injection & Inversion of Control', 'Enterprise Application Architecture Patterns', 'Refactoring Monolithic Object Hierarchies'],
    learningOutcomes: [
      'Model complex business domains applying aggregates, repositories, and domain events',
      'Decouple enterprise applications using dependency injection and modular interfaces'
    ],
    prerequisites: ['OOP', 'software-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'software-design-and-development',
    curriculumOrder: 37,
    rawName: 'software design and development',
    cleanName: 'Software Design and Development',
    category: 'software_eng',
    shortDescription: 'Practical application development, API contracts, software modularization, build systems, and cross-platform deployment.',
    academicYear: null,
    semester: null,
    topics: ['API Contract Design (OpenAPI / Protocol Buffers)', 'Software Modularity & Package Boundaries', 'Modern Build Systems & Dependency Resolvers', 'Cross-Platform Deployment Strategies'],
    learningOutcomes: [
      'Design clean, backwards-compatible API contracts for distributed client applications',
      'Structure complex software solutions with strict module boundary encapsulation'
    ],
    prerequisites: ['software-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'software-architecture-engineering',
    curriculumOrder: 38,
    rawName: 'software architecture engineering',
    cleanName: 'Software Architecture Engineering',
    category: 'software_eng',
    shortDescription: 'Architectural styles (Microservices, Event-Driven, Hexagonal), quality attributes (availability, scalability, modifiability), and ATAM evaluations.',
    academicYear: null,
    semester: null,
    topics: ['Architectural Styles: Layered, Hexagonal, Event-Driven, Microservices', 'Non-Functional Quality Attributes & Trade-offs', 'Architecture Trade-off Analysis Method (ATAM)', 'Event Streaming & CQRS Patterns'],
    learningOutcomes: [
      'Evaluate software systems against strict availability and latency quality attributes',
      'Architect event-driven decoupled systems utilizing messaging brokers and CQRS',
      'Conduct ATAM reviews resolving architectural risk and engineering compromises'
    ],
    prerequisites: ['software-engineering', 'database-systems'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'software-components-and-design-patterns',
    curriculumOrder: 39,
    rawName: 'Software components and design patterns',
    cleanName: 'Software Components & Design Patterns',
    category: 'software_eng',
    shortDescription: 'Gang of Four design patterns (Creational, Structural, Behavioral), component-based software engineering, and inversion of control.',
    academicYear: null,
    semester: null,
    topics: ['Creational Patterns: Abstract Factory, Builder, Singleton', 'Structural Patterns: Adapter, Composite, Proxy, Decorator', 'Behavioral Patterns: Command, Observer, State, Strategy', 'Component Reusability & Interface Contracts'],
    learningOutcomes: [
      'Implement all 23 GoF design patterns in practical real-world scenarios',
      'Diagnose and remediate anti-patterns in existing production codebases'
    ],
    prerequisites: ['OOP'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'optimization-techniques',
    curriculumOrder: 40,
    rawName: 'Optimization techniques',
    cleanName: 'Optimization Techniques',
    category: 'foundations',
    shortDescription: 'Linear programming, simplex method, convex optimization, gradient descent, integer programming, and dynamic optimization.',
    academicYear: null,
    semester: null,
    topics: ['Linear Programming & Simplex Algorithm', 'Duality Theory & Sensitivity Analysis', 'Convex Sets & Convex Functions', 'Unconstrained & Constrained Optimization (KKT Conditions)', 'Gradient Descent, Newton-Raphson & Stochastic Methods'],
    learningOutcomes: [
      'Formulate real-world scheduling and resource allocation problems as linear programs',
      'Solve convex optimization tasks using numerical gradient and Newton methods',
      'Derive and interpret dual optimization problems for economic and computational bounds'
    ],
    prerequisites: ['linear-algebra', 'algorithms-analysis-and-design'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'distributed-systems',
    curriculumOrder: 41,
    rawName: 'Distributed Systems',
    cleanName: 'Distributed Systems',
    category: 'systems',
    shortDescription: 'CAP theorem, distributed consensus (Raft/Paxos), clock synchronization (Lamport/Vector clocks), RPC, fault tolerance, and replication.',
    academicYear: null,
    semester: null,
    topics: ['Distributed Time & Logical Clocks (Lamport, Vector)', 'Consensus Protocols: Paxos & Raft', 'CAP Theorem & PACELC Trade-offs', 'Remote Procedure Calls (gRPC) & Serialization', 'Data Replication & Eventual Consistency', 'Fault Tolerance & Distributed Snapshots'],
    learningOutcomes: [
      'Implement a functional distributed consensus cluster using the Raft algorithm',
      'Design fault-tolerant distributed services handling network partitions gracefully',
      'Evaluate consistency vs availability trade-offs across distributed data stores'
    ],
    prerequisites: ['operating-systems', 'computer-networks'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-mit-6824-distributed', 'res-book-kleppmann-ddia']
  },
  {
    id: 'machine-learning',
    curriculumOrder: 42,
    rawName: 'Machine Learning',
    cleanName: 'Machine Learning',
    category: 'applied_ai',
    shortDescription: 'Supervised learning (regression, SVM, trees), unsupervised learning (clustering, PCA), deep learning basics, regularization, and model validation.',
    academicYear: null,
    semester: null,
    topics: ['Linear & Logistic Regression with Gradient Descent', 'Regularization (L1 Lasso, L2 Ridge)', 'Decision Trees, Random Forests & Gradient Boosting', 'Support Vector Machines & Kernel Tricks', 'Neural Networks & Backpropagation', 'Dimensionality Reduction (PCA) & Clustering (k-Means)'],
    learningOutcomes: [
      'Derive and implement core ML algorithms from scratch using vector math',
      'Train, validate, and tune predictive models preventing overfitting via cross-validation',
      'Deploy production machine learning pipelines with quantitative evaluation metrics'
    ],
    prerequisites: ['linear-algebra', 'prob-and-stat', 'algorithms-analysis-and-design'],
    hasCuratedResources: true,
    curatedResourceIds: ['res-stanford-cs229-ml', 'res-book-geron-hands-on-ml']
  },
  {
    id: 'big-data-and-cloud-computing',
    curriculumOrder: 43,
    rawName: 'Big data and cloud computing',
    cleanName: 'Big Data and Cloud Computing',
    category: 'systems',
    shortDescription: 'Cloud infrastructure (IaaS, PaaS), MapReduce, Apache Spark, distributed file systems (HDFS/S3), stream processing, and container orchestration.',
    academicYear: null,
    semester: null,
    topics: ['Cloud Service Models (IaaS, PaaS, Serverless)', 'Distributed File Systems (HDFS, Object Storage)', 'MapReduce Paradigm & Apache Spark RDDs/DataFrames', 'Stream Processing (Kafka, Flink)', 'Containerization (Docker) & Orchestration (Kubernetes)'],
    learningOutcomes: [
      'Author distributed data transformation pipelines utilizing Apache Spark and SQL',
      'Containerize microservices and orchestrate multi-node deployments with Docker and Kubernetes',
      'Architect cost-efficient, elastic cloud pipelines for multi-terabyte data streams'
    ],
    prerequisites: ['distributed-systems', 'database-systems'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'soft-computing',
    curriculumOrder: 44,
    rawName: 'Soft computing',
    cleanName: 'Soft Computing',
    category: 'applied_ai',
    shortDescription: 'Fuzzy logic systems, genetic algorithms, evolutionary computation, rough sets, and hybrid neuro-fuzzy intelligent architectures.',
    academicYear: null,
    semester: null,
    topics: ['Fuzzy Sets & Membership Functions', 'Fuzzy Rule-Based Inference (Mamdani & Sugeno)', 'Genetic Algorithms: Selection, Crossover & Mutation', 'Swarm Intelligence & Particle Swarm Optimization', 'Adaptive Neuro-Fuzzy Inference Systems (ANFIS)'],
    learningOutcomes: [
      'Construct fuzzy inference controllers for non-linear, imprecise control problems',
      'Implement genetic algorithms to solve NP-hard combinatorial optimization problems'
    ],
    prerequisites: ['ai'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'image-processing',
    curriculumOrder: 45,
    rawName: 'image processing',
    cleanName: 'Digital Image Processing',
    category: 'specialized',
    shortDescription: 'Spatial filtering, Fourier transform, image enhancement, edge detection (Sobel, Canny), morphological operations, segmentation, and feature extraction.',
    academicYear: null,
    semester: null,
    topics: ['Pixel Transformations & Histogram Equalization', 'Spatial Filtering: Smoothing, Sharpening, Convolution', 'Frequency Domain Filtering (2D Fourier Transform)', 'Edge Detection: Sobel, Prewitt & Canny Detectors', 'Morphological Image Processing (Dilation, Erosion)', 'Image Segmentation & Feature Descriptors'],
    learningOutcomes: [
      'Implement spatial and frequency-domain 2D convolution filters from scratch',
      'Construct automated image segmentation and edge detection computer vision pipelines',
      'Extract invariant geometric features for object identification and tracking'
    ],
    prerequisites: ['linear-algebra', 'programming-principles-cpp'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'software-agents-concepts-and-design',
    curriculumOrder: 46,
    rawName: 'software agents concepts and design',
    cleanName: 'Software Agents: Concepts & Design',
    category: 'applied_ai',
    shortDescription: 'Multi-agent systems, autonomous agent architectures (BDI), communication protocols (FIPA-ACL), agent negotiation, and collective intelligence.',
    academicYear: null,
    semester: null,
    topics: ['Belief-Desire-Intention (BDI) Agent Architecture', 'Agent Communication Languages (KQML, FIPA-ACL)', 'Distributed Coordination & Game-Theoretic Negotiation', 'Multi-Agent Consensus & Task Allocation', 'Autonomous Learning Agents'],
    learningOutcomes: [
      'Model intelligent autonomous software entities using the BDI architecture',
      'Implement inter-agent messaging and contract-net negotiation protocols'
    ],
    prerequisites: ['ai'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'service-oriented-computing',
    curriculumOrder: 47,
    rawName: 'service oriented computing',
    cleanName: 'Service Oriented Computing',
    category: 'software_eng',
    shortDescription: 'SOA principles, web services (SOAP, REST, GraphQL), microservices choreography, API gateways, enterprise service buses, and service discovery.',
    academicYear: null,
    semester: null,
    topics: ['Service-Oriented Architecture (SOA) Fundamentals', 'REST vs SOAP vs GraphQL Service Paradigms', 'Microservices Choreography vs Orchestration', 'API Gateways, Rate Limiting & Service Meshes', 'Service Discovery & Circuit Breaker Patterns'],
    learningOutcomes: [
      'Architect resilient microservice ecosystems applying circuit breaker and gateway patterns',
      'Design schema-governed GraphQL and RESTful APIs for federated data access'
    ],
    prerequisites: ['web-design-and-development', 'distributed-systems'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'formal-methods-in-software-engineering',
    curriculumOrder: 48,
    rawName: 'formal methods in software engineering',
    cleanName: 'Formal Methods in Software Engineering',
    category: 'software_eng',
    shortDescription: 'Formal specification languages (Z, TLA+, Alloy), model checking, temporal logic (LTL/CTL), automated theorem proving, and critical safety verification.',
    academicYear: null,
    semester: null,
    topics: ['First-Order Logic Specification & Set-Theoretic Modeling', 'Model Checking with Temporal Logic (LTL & CTL)', 'State Space Exploration with TLA+ and Alloy', 'Formal Proof Assistants (Coq, Lean)', 'Verification of Concurrent Algorithms'],
    learningOutcomes: [
      'Formalize distributed and concurrent system specifications using TLA+',
      'Model-check state machines to exhaustively identify deadlocks and race conditions',
      'Prove safety and liveness invariants for mission-critical software protocols'
    ],
    prerequisites: ['discrete-maths', 'software-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'security-in-software-engineering',
    curriculumOrder: 49,
    rawName: 'security in software engineering',
    cleanName: 'Security in Software Engineering',
    category: 'software_eng',
    shortDescription: 'Secure Software Development Lifecycle (SSDLC), threat modeling (STRIDE), OWASP Top 10 mitigation, memory safety, dynamic testing, and DevSecOps.',
    academicYear: null,
    semester: null,
    topics: ['Secure Software Lifecycle & DevSecOps Pipelines', 'STRIDE Threat Modeling Methodology', 'Mitigating OWASP Top 10 Web Vulnerabilities', 'Memory Corruption Defenses (ASLR, Stack Canaries, Rust safety)', 'Software Supply Chain Security (SBOM, Signature Verification)'],
    learningOutcomes: [
      'Conduct STRIDE threat modeling on distributed system architectures',
      'Audit codebases for injection, broken authentication, and cryptographic flaws',
      'Configure automated SAST and DAST security gates in CI/CD pipelines'
    ],
    prerequisites: ['security-and-cryptography', 'software-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'game-programming',
    curriculumOrder: 50,
    rawName: 'game programming',
    cleanName: 'Game Programming',
    category: 'specialized',
    shortDescription: 'Game loop architectures, 2D/3D physics simulation, collision detection (AABB, SAT), scene graphs, entity-component systems (ECS), and game AI.',
    academicYear: null,
    semester: null,
    topics: ['Fixed Timestep Game Loop Architecture', 'Entity-Component-System (ECS) Architecture', 'Collision Detection (AABB, Separating Axis Theorem)', 'Rigid Body 2D/3D Physics & Numerical Integration', 'Game AI: Pathfinding (A*), Behavior Trees, State Machines'],
    learningOutcomes: [
      'Implement an interactive 2D/3D game engine using the Entity Component System paradigm',
      'Write collision detection algorithms with realistic impulse resolution and restitution',
      'Program responsive non-player character AI utilizing hierarchical behavior trees'
    ],
    prerequisites: ['computer-graphics', 'data-structures'],
    hasCuratedResources: false,
    curatedResourceIds: []
  },
  {
    id: 'software-mainenance-and-evolution',
    curriculumOrder: 51,
    rawName: 'software mainenance and evolution',
    cleanName: 'Software Maintenance and Evolution',
    category: 'software_eng',
    shortDescription: 'Legacy code refactoring, software metrics, Lehman\'s laws of software evolution, reverse engineering, dependency analysis, and technical debt reduction.',
    academicYear: null,
    semester: null,
    topics: ['Lehman\'s Laws of Software Evolution', 'Code Smells & Martin Fowler Refactoring Catalog', 'Static Analysis & Maintainability Index Calculation', 'Legacy System Modernization & Strangler Fig Pattern', 'Dependency Inversion & Monolith Decomposition'],
    learningOutcomes: [
      'Decompose and refactor legacy codebases without altering observable system behaviors',
      'Formulate migration plans using the Strangler Fig pattern for mission-critical software',
      'Quantify software erosion and technical debt using automated static metrics'
    ],
    prerequisites: ['software-engineering', 'software-architecture-engineering'],
    hasCuratedResources: false,
    curatedResourceIds: []
  }
];
