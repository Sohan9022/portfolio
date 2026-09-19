export const PROJECTS = [
  {
    id: 'giftverse',
    number: '01',
    title: 'GiftVerse AI',
    subtitle: 'Digital Gifting Reveal Experiences',
    category: 'Consumer AI · Interactive UX',
    badges: ['Live Prototype', 'Notion PRD'],
    status: 'Live Working App',
    hasLiveDemo: true,
    liveUrl: 'https://gift-verse-moments.lovable.app',
    notionUrl: 'https://app.notion.com/p/GIFTVVERSE-3d053f22e2b0804b8b90cf6da95b931f?source=copy_link',
    summary: 'Restores the emotional joy of unboxing by turning transactional gift card codes into 30–60 second interactive reveal journeys.',
    thesis: 'Digital gifting has become completely transactional—a code sent over chat lacks emotional anticipation. A short, interactive suspense reveal restores the visceral delight of physical unboxing without user fatigue.',
    problem: 'Digital gift cards are friction-free to send, but sterile to receive. Recipients simply copy an alphanumeric string, stripping away the emotional connection, surprise, and delight of gift-giving.',
    insight: '30–60 second time-boxed suspense journeys maximize emotional payoff. Long games cause recipient impatience; instant codes cause indifference. The sweet spot is micro-suspense with dynamic clues.',
    architecture: [
      'AI Experience Director: Choreographs reveal pacing, customized clues, and ambient visual moods from sender prompts',
      'Encrypted Payload Isolation: Gift codes remain securely encrypted in the database until the reveal climax triggers',
      'Zero-Friction Mobile Viewer: Universal lightweight web client requiring zero account registration for recipients',
    ],
    tradeoffs: 'Excluded physical logistics and third-party vendor checkouts in V1 to focus entirely on instant, frictionless digital reveal delight.',
    specDetails: 'Lovable MVP with interactive reveal flow, creator studio dashboard, and complete Notion PRD with user journeys.',
    diagramType: 'reveal-flow',
    diagramData: {
      steps: [
        { label: 'Sender Prompt', desc: 'Tone & Clue Context' },
        { label: 'Micro-Suspense', desc: '30s Dynamic Clues' },
        { label: 'Encrypted Vault', desc: 'Decrypt at Climax' },
        { label: 'Delight Moment', desc: 'Verified Claim' }
      ]
    }
  },
  {
    id: 'spaces',
    number: '02',
    title: 'Spaces',
    subtitle: 'Contextual Personalization Framework',
    category: 'Social Systems · AI Personalization',
    badges: ['Live Prototype', 'Notion PRD'],
    status: 'Live Working App',
    hasLiveDemo: true,
    liveUrl: 'https://space-context-switch.lovable.app',
    notionUrl: 'https://app.notion.com/p/SPACES-3ce53f22e2b0805db12ef30ed696c7b5?source=copy_link',
    summary: 'Solves algorithmic context collapse by isolating behavioral telemetry across distinct focus modes within a single user account.',
    thesis: 'Recommendation algorithms suffer from "context collapse"—casual weekend gaming videos pollute Monday engineering feeds. Users need distinct contextual firewalls without the friction of juggling multiple burner accounts.',
    problem: 'Modern feed algorithms assume a single monolithic user persona. Watching gaming clips on Friday night destroys professional machine learning recommendations on Monday morning.',
    insight: 'Users don\'t want separate logins; they want isolated vector contexts. A Context Firewall middleware isolates behavioral telemetry per space while keeping identity and billing consolidated.',
    architecture: [
      'Context Firewall: Middleware interceptor isolating behavioral signals and telemetry per active space',
      'Isolated Vector Spaces: Independent embedding representations and assistant memory partitions per context',
      'Pluggable Client SDK: Middleware abstraction designed for drop-in integration into multi-feed platforms',
    ],
    tradeoffs: 'Enforced zero cross-space behavioral bleed by default. Cross-pollination was rejected in V1 to preserve mathematical context purity.',
    specDetails: 'Interactive Lovable prototype with 4 pre-configured contextual spaces, Space AI, and detailed Notion PRD.',
    diagramType: 'firewall',
    diagramData: {
      spaces: [
        { name: 'Engineering Space', tag: 'Vector Store A', color: 'emerald' },
        { name: 'Gaming / Weekend', tag: 'Vector Store B', color: 'indigo' },
        { name: 'Learning & Research', tag: 'Vector Store C', color: 'amber' }
      ]
    }
  },
  {
    id: 'finmate',
    number: '03',
    title: 'FinMate AI',
    subtitle: 'Personal Finance Memory',
    category: 'FinTech · Multimodal AI',
    badges: ['Live Prototype', 'Notion PRD'],
    status: 'Live Working App',
    hasLiveDemo: true,
    liveUrl: 'https://tell-finmate-ai.lovable.app',
    notionUrl: 'https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link',
    summary: 'Conversational expense memory pairing frictionless multimodal capture with 100% deterministic, citation-backed SQL accounting.',
    thesis: 'Users abandon manual expense apps due to 6-field forms, but conversational LLMs hallucinate math. The winning architecture uses AI solely for unstructured intent extraction while delegating arithmetic to deterministic database RPCs.',
    problem: 'Manual expense logging demands tedious data entry per transaction, causing steep drop-off. Conversely, pure LLM conversational finance agents hallucinate numbers, making them unacceptable for real financial trust.',
    insight: 'Separate parsing from calculation. The LLM extracts entities (amount, category, vendor, informal loans); deterministic PostgreSQL Stored Procedures perform 100% of arithmetic and balance aggregations.',
    architecture: [
      'Multimodal Ingestion: Fast capture via voice notes, receipt OCR snapshots, and natural chat messages',
      'Deterministic SQL Engine: Concurrency-safe PostgreSQL RPCs for all running balances and loan reconciliations',
      'Evidence-Linked Ledger: Every AI answer provides clickable citations to the exact underlying transaction rows',
    ],
    tradeoffs: 'Rejected automatic background SMS scraping in V1 to maintain strict user privacy and build transparent customer trust.',
    specDetails: 'Production-ready Lovable MVP with voice transcription, informal debt tracker, and comprehensive Notion PRD.',
    diagramType: 'dual-pipeline',
    diagramData: {
      steps: [
        { channel: 'Multimodal Input', role: 'Voice / Receipt / Text' },
        { channel: 'LLM Parser', role: 'Intent & Entity Extraction' },
        { channel: 'PostgreSQL RPC', role: 'Deterministic Arithmetic' },
        { channel: 'Auditable Output', role: '100% Citation-Backed Total' }
      ]
    }
  },
  {
    id: 'sentinel',
    number: '04',
    title: 'Project Sentinel',
    subtitle: 'AI Project Memory & Decision Agent',
    category: 'Enterprise AI · Workflow Governance',
    badges: ['Live Working App', 'Notion PRD'],
    status: 'Live Prototype',
    hasLiveDemo: true,
    liveUrl: 'https://echo-sentinel-08.lovable.app',
    notionUrl: 'https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link',
    summary: 'A "Silent by Default" team memory agent that passively tracks decisions and catches system drift without spamming Slack channels.',
    thesis: 'Unsolicited AI bot notifications are the primary source of engineering team fatigue. An effective team memory agent must listen passively and remain completely silent until a human explicitly queries it.',
    problem: 'Engineering decisions made across standups, Slack threads, and Jira are quickly forgotten. Existing AI bots exacerbate fatigue by posting unprompted meeting summaries that interrupt deep work.',
    insight: 'The "said-vs-confirmed" gap is where delivery breaks down—for example, when a developer verbally reports a migration complete, but database schema logs still show open migrations.',
    architecture: [
      'Silent Ingestion Engine: Listens to meeting transcripts and commit events without posting unprompted messages',
      'Structured Decision Store: Immutable append-only log capturing rationale, ownership, and target timelines',
      'On-Demand Drift Auditor: Surfaces discrepancies between spoken intent and recorded tool state only when asked',
    ],
    tradeoffs: 'Banned all autonomous bot notifications in V1. Sentinel is strictly query-driven to protect team trust and preserve attention.',
    specDetails: 'Interactive 8-step live demo on Lovable, Notion PRD with data schemas, state transition matrices, and user stories.',
    diagramType: 'silent-listener',
    diagramData: {
      left: 'Passive Stream (Slack / Standup / Jira)',
      center: 'Immutable Decision Store (Silent)',
      right: 'On-Demand Drift Query (Only When Asked)'
    }
  },
  {
    id: 'shrh',
    number: '05',
    title: 'SHRH',
    subtitle: 'Semantic Human-Readable Hashing',
    category: 'AI Governance · Developer Tools',
    badges: ['Google APM PRD Spec'],
    status: 'PRD & Architecture Spec',
    hasLiveDemo: false,
    liveUrl: null,
    notionUrl: 'https://app.notion.com/p/SHRH-3d553f22e2b08035b164f88ad01b17b2?source=copy_link',
    summary: 'Autonomous change governance for production AI prompts, decoupling cosmetic formatting from critical policy regressions.',
    thesis: 'Cryptographic SHA-256 hashes treat harmless indentation edits and critical policy regressions as identical binary alarms. Enterprises need orthogonal 2D risk evaluation in CI/CD.',
    problem: 'Teams managing 50–500 production system prompts suffer alert fatigue. SHA-256 triggers the same alarm for fixing a typo as changing "MUST enforce MFA" to "MAY enforce MFA", leading reviewers to rubber-stamp changes.',
    insight: 'Cosine semantic similarity remains 98%+ identical when "$500" shifts to "$5,000" or modal verbs invert. Catching discrete constraint shifts requires decoupling topical drift from operational deontic rules.',
    architecture: [
      'Dual-Channel Gate: SHA-256 cryptographic bitwise authority + Semantic Triage Channel',
      'Constraint Parser: Evaluates numerical limits, permissions, negations, and RFC-2119 modal verbs',
      '4-Quadrant Autonomous Gate: Auto-merges ~70% of safe PRs while quarantining policy regressions in CI/CD',
    ],
    tradeoffs: 'Excluded automated LLM self-fixing in V1 to eliminate recursive hallucination loops; kept human review on flagged policy diffs.',
    specDetails: '500-line comprehensive PRD formatted for Google APM standards, benchmarked across 2,744 revision pairs with 92.6% defect escape reduction.',
    diagramType: 'triage-matrix',
    diagramData: {
      quadrants: [
        { q: 'Quadrant A', action: 'Auto-Approve', rule: 'Low Drift · No Constraint Shift (~70%)' },
        { q: 'Quadrant B', action: 'Quarantine', rule: 'Operational Constraint Downgrade (~5%)' },
        { q: 'Quadrant C', action: 'Triage Review', rule: 'High Topical Semantic Shift (~25%)' },
        { q: 'Quadrant D', action: 'Quarantine', rule: 'High Drift + Constraint Shift' }
      ]
    }
  }
];

export const HOW_I_THINK = [
  {
    number: '01',
    title: 'Start with the Root Problem, Not the Shiny Feature',
    principle: 'User friction is rarely about missing technology; it is about misaligned assumptions.',
    detail: 'Before proposing solutions, I dig into the behavioral friction: What is the user actually trying to accomplish (JTBD)? Where does the current mental model break down? Why did previous attempts fail?'
  },
  {
    number: '02',
    title: 'Ruthlessly Reduce Cognitive Load',
    principle: 'Every form field, notification ping, and modal choice is a tax on user attention.',
    detail: 'In FinMate, this meant eliminating 6-field forms in favor of voice and receipt capture. In Project Sentinel, it meant enforcing "Silent by Default"—refusing to build an AI bot that spams Slack channels.'
  },
  {
    number: '03',
    title: 'Prototypes Are Tools for Learning, Not Just Demos',
    principle: 'A clickable artifact answers questions in 5 minutes that take 5 weeks of discussion.',
    detail: 'I build interactive prototypes on Lovable not to show off frontend styling, but to test user latency tolerance, interaction friction, and edge-case clarity with real software.'
  },
  {
    number: '04',
    title: 'Balance User Value, Technical Feasibility & Constraints',
    principle: 'Great PMs define what not to build and set clear system boundaries.',
    detail: 'In FinMate, I restricted the LLM solely to intent parsing, routing all math to deterministic PostgreSQL RPCs. In SHRH, I chose local CPU inference over cloud LLMs to eliminate $15k/mo cost and privacy egress.'
  },
  {
    number: '05',
    title: 'Decide with Evidence, Ship with Conviction',
    principle: 'Measure the North Star, but protect user trust with guardrail counter-metrics.',
    detail: 'In SHRH, the North Star was 70% Autonomous Safe Triage Rate (ASTR), paired with a zero-tolerance counter-metric: 0.0% false alarms on benign diffs to prevent developer distrust.'
  }
];

export const DECISION_LOG = [
  {
    id: 'decision-spaces',
    project: 'Spaces',
    tag: 'Social Systems & Personalization',
    decision: 'Isolated Context Firewalls vs. Unified Recommendation Model',
    context: 'Users felt their professional feeds (coding, machine learning) were corrupted after casual weekend gaming or entertainment browsing on platforms like YouTube and Reddit.',
    tradeoff: 'Rejected a single global recommendation model with blended weights. Accepted the architectural overhead of separate vector spaces per user.',
    rationale: 'Blended models dilute topical relevance. By establishing isolated telemetry firewalls, activity in one space never corrupts recommendations in another, protecting trust at zero switching friction.'
  },
  {
    id: 'decision-finmate',
    project: 'FinMate AI',
    tag: 'FinTech Architecture & LLMs',
    decision: 'Deterministic SQL Math vs. LLM-Generated Totals',
    context: 'Conversational LLMs provide natural speech input but consistently hallucinate arithmetic totals and multi-currency conversions over long conversation histories.',
    tradeoff: 'Refused to let the LLM generate financial answers directly. Constrained the model strictly to structured intent & entity extraction (JSON).',
    rationale: 'In consumer finance, a single arithmetic hallucination destroys product trust permanently. Delegating math to PostgreSQL RPCs guarantees 100% accurate, citation-backed totals every time.'
  },
  {
    id: 'decision-sentinel',
    project: 'Project Sentinel',
    tag: 'Enterprise AI & Workflow Governance',
    decision: 'Silent-by-Default Query Model vs. Proactive Slack Bot Summaries',
    context: 'Most enterprise AI assistants post unsolicited channel summaries and action item alerts, quickly triggering notification fatigue and channel muting.',
    tradeoff: 'Banned all autonomous unprompted messages in V1. Sacrificed initial "visibility" to guarantee team attention was never interrupted.',
    rationale: 'The highest-value team memory is one that stays out of the way until asked. Sentinel earns adoption by being an infallible reference point rather than an annoying chatty bot.'
  },
  {
    id: 'decision-shrh',
    project: 'SHRH',
    tag: 'AI Safety & Enterprise CI/CD',
    decision: 'Human Review Quarantine vs. Autonomous LLM Auto-Fixing',
    context: 'When a pull request introduces an operational constraint regression (e.g., "$500" changing to "$5,000"), should an AI agent attempt to automatically rewrite the prompt to match policy?',
    tradeoff: 'Deliberately rejected automated self-healing prompts in V1. Chose a deterministic quarantine gate that halts CI and assigns review to the prompt owner.',
    rationale: 'Recursive LLM auto-fixing introduces unpredictable secondary regressions. In enterprise governance, deterministic safety and clear human accountability always trump automated convenience.'
  }
];

export const PRODUCT_TEARDOWNS = [
  {
    id: 'teardown-expressive-voice',
    product: 'Expressive Voice AI (Concept)',
    category: 'Multimodal AI · Conversational HCI',
    title: 'Cross-Dialect Voice Twin: Preserving Human Warmth Across Languages',
    observation: 'Standard speech translation converts spoken words into robotic text-to-speech, stripping away the speaker’s vocal timbre, humor, and emotional inflection. In client or business conversations, emotional warmth and cadence build 80% of rapport—not just literal vocabulary.',
    whatWorks: "Expressive Vocal Cloning in Stream: The speaker talks naturally in their local dialect. The AI recognizes speech, captures vocal timbre, pitch, and emotional cadence, and streams the message into the recipient’s target dialect using the speaker’s own cloned voice and expressions.",
    whatIWouldChange: "Conversational Turn-Taking Latency. Human conversation breaks down when translation delay exceeds 300ms. I would prioritize streaming chunked audio synthesis over full-sentence buffering to preserve natural dialogue cadence and prevent awkward speaker collisions.",
    sohansNotes: {
      incentive: "Legacy translation pipelines decouple speech-to-text, LLM translation, and TTS into separate sequential steps. This architectural separation flattens emotional prosody and introduces fatal latency in live calls.",
      mentalModel: "Communication with a client or partner is not a data packet transfer—it is an emotional connection. When a client hears their own regional dialect spoken in your authentic warm voice, linguistic hesitation disappears.",
      experiment: "Pilot on cross-regional client negotiations. Measure conversational flow, subjective trust ratings, and deal turnaround time versus standard robotic translation bots."
    }
  },
  {
    id: 'teardown-adaptive-framework',
    product: 'AI-Driven Adaptive UX Framework',
    category: 'HCI Systems · Patent Concept',
    title: 'The Static Interface Fallacy: Why High-Stakes FinTech Needs Adaptive UI',
    observation: 'Digital payment apps enforce a single, rigid interface layout regardless of user comfort. Serving the same dense, text-query interface to first-time vernacular users creates severe operational apprehension and feature abandonment.',
    whatWorks: "Dual-Mode Sandbox Architecture: Coupling the live transactional environment with an exact mirrored practice sandbox using simulated balances. Users build tactile muscle memory and explore workflows without fear of irreversible financial loss.",
    whatIWouldChange: "In-Situ Micro-Guidance: External chatbots and FAQ links break user focus. Assistance must be embedded in-situ via gesture-anchored explanations and touch-based micro-translations directly on the active canvas.",
    sohansNotes: {
      incentive: "Apps remain static because maintaining a single one-size-fits-all client is easier for engineering teams, shifting the entire cognitive burden onto users with lower digital literacy.",
      mentalModel: "In digital finance, fear is the primary usability blocker. Users do not abandon apps due to aesthetics; they abandon because they worry a single mistaken tap will deduct their hard-earned money.",
      experiment: "Enable a Practice Sandbox toggle during onboarding. Observe whether users who practice transfers with dummy balances complete live utility payments with less hesitation."
    }
  },
  {
    id: 'teardown-generative-prototyping',
    product: 'Lovable & Generative Dev Tools',
    category: 'Product Process · Rapid Validation',
    title: 'The Death of the Static PRD: Prototyping as Product Discovery',
    observation: 'Writing speculative, text-heavy PRDs in isolation delays learning. Building clickable, stateful prototypes within hours is becoming the fastest way to discover edge cases and validate interaction ergonomics.',
    whatWorks: "Tactile Ergonomics Validation: Interacting with a working prototype immediately exposes confusing hierarchies, latency frustrations, and unexpected edge cases that static wireframes consistently hide.",
    whatIWouldChange: "The UI Illusion Trap: High-fidelity prototypes can trick non-technical stakeholders into assuming backend complexities (concurrency, distributed locks, security) are solved. Clear system boundary specs must accompany every prototype.",
    sohansNotes: {
      incentive: "Traditional PMs wrote lengthy requirement documents because developer time was the primary bottleneck. Generative dev tools invert this by making UI scaffolding instant, moving the PM focus toward system constraints and user ergonomics.",
      mentalModel: "Stakeholders and users cannot evaluate abstract bullet points. A live, clickable interface invites genuine, visceral critique, whereas written documents receive passive nods.",
      experiment: "Run parallel feature discovery: Compare feedback quality and engineering rework between a static specification sprint and a 48-hour interactive prototype sprint."
    }
  }
];

export const RESEARCH_SPOTLIGHT = {
  institution: 'Vishwakarma Institute of Technology (VIT), Pune',
  lab: 'Department of Computer Engineering / UX Research Lab',
  publicationStatus: 'Patent Application Draft & Academic Concept Report',
  patentTitle: 'AI-Driven Multilingual Adaptive User Interface System & Risk-Free Financial Sandbox',
  title: 'Human-Centered UX for Vernacular Digital Inclusivity',
  tagline: 'Identifying Cognitive Friction, Code-Mixing Barriers, and Operational Apprehension in Digital Financial Applications',
  context: 'While digital payment systems continue rapid national expansion, millions of first-generation and vernacular users experience acute apprehension during everyday transactions. In our UX research work at VIT, we analyzed user behavior across demographic and linguistic cohorts to uncover screen-level cognitive barriers and design patent-pending human-centered interventions.',
  
  qualitativeInsights: [
    { 
      label: 'Search Bar Avoidance', 
      headline: 'Visual Over Query', 
      detail: 'Vernacular users naturally gravitate toward visual icon recognition and category browsing, actively avoiding text search boxes due to keyboard language barriers.' 
    },
    { 
      label: 'Fear of Monetary Loss', 
      headline: 'Accidental Tap Anxiety', 
      detail: 'Users experience intense hesitation around unfamiliar buttons, fearing that an unintended screen tap will commit an irreversible financial debit.' 
    },
    { 
      label: 'Code-Mixing Confusion', 
      headline: 'Jargon Disconnect', 
      detail: 'Translating generic navigation while leaving regulatory terms (e.g., Mandate, Beneficiary) in English triggers immediate comprehension breakdown.' 
    },
    { 
      label: 'In-Situ Guidance Need', 
      headline: 'Screen Continuity', 
      detail: 'Stuck users resist leaving the active screen for external help articles, fearing that switching apps will abort or corrupt their ongoing transaction.' 
    }
  ],

  fivePillars: [
    {
      number: '01',
      pillar: 'Visual Recognition vs. Text Recall',
      finding: 'Visual recognition offers lower cognitive friction than text queries. Users browsing in regional languages rely on distinct pictorial icons and category cues rather than typing search keywords.',
      designImpact: 'Dual-layer adaptive interface replacing text-heavy search queries with high-contrast, category-anchored pictorial navigation.'
    },
    {
      number: '02',
      pillar: 'Fear of Monetary Loss vs. Crisis Recovery',
      finding: 'In transaction delay or failure states, users experience severe disorientation. Generic error codes and technical alerts amplify panic rather than offering clear next steps.',
      designImpact: 'Plain-language escrow status tracking with transparent refund timelines, eliminating ambiguity when money is in transit.'
    },
    {
      number: '03',
      pillar: 'Financial Jargon & Incomplete Localization',
      finding: 'Superficial localization translates basic button labels but leaves financial loanwords in English, leaving users unsure of legal commitments or fee structures.',
      designImpact: 'In-situ "Hold-to-Translate" micro-definitions providing localized real-world analogies without leaving the active screen.'
    },
    {
      number: '04',
      pillar: 'Environmental Anxiety vs. In-Situ Guidance',
      finding: 'Users fear intermittent network drops mid-transaction and refuse to navigate away to external browsers or secondary help centers for guidance.',
      designImpact: 'In-situ contextual tooltips and gesture-anchored guides ("Circle-to-Understand") that never navigate away from the payment flow.'
    },
    {
      number: '05',
      pillar: 'Self-Service Confidence & Risk-Free Practice',
      finding: 'When digital anxiety peaks, users abandon self-service entirely and surrender device control to third parties because live mistakes carry real financial penalties.',
      designImpact: 'Risk-Free Financial Practice Sandbox: a mirrored application replica with simulated balances, enabling stress-free muscle memory building.'
    }
  ],

  patentArchitecture: {
    title: 'Patent Concept: AI-Driven Adaptive UX Framework & Sandbox',
    components: [
      { name: 'Dual-Mode Environment Controller', desc: 'Dynamically toggles between Live Production and a Mirrored Sandbox Replica populated with simulated balances and dummy billers.' },
      { name: 'Risk-Free Practice Sandbox', desc: 'Allows users to build tactile muscle memory scanning QR codes and sending payments with zero financial liability, eliminating transactional fear.' },
      { name: 'In-Situ Micro-Translation ("Hold-to-Translate")', desc: 'Injects contextual vernacular explanations for loanwords (e.g. Mandate, Autopay) on touch without app switching or screen reloads.' },
      { name: 'Gesture-Anchored Visual Inspection ("Circle-to-Understand")', desc: 'Attaches contextual conversational explanations directly to unfamiliar screen icons or UI elements.' }
    ]
  },

  figures: [
    { title: 'Patent Architecture Blueprint', image: '/research/fig17_solution_architecture_patent.png', caption: 'Full technical system diagram for the AI-Driven Adaptive UX Framework and Risk-Free Financial Sandbox' },
    { title: 'Cross-Disciplinary UX Framework', image: '/research/fig16_cross_triangulation_framework.png', caption: 'Synthesizing qualitative user attitudes with screen-level interaction friction to guide adaptive interface design' }
  ]
};

