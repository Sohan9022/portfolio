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
    product: 'ElevenLabs & Conversational Voice AI',
    category: 'Multimodal Audio · Conversational HCI',
    title: 'ElevenLabs: Why Asynchronous Dubbing Fails in Live Conversational Turn-Taking',
    observation: 'ElevenLabs set the gold standard for expressive voice cloning in asynchronous media (podcasts, video dubbing), but applying horizontal audio infrastructure to live 1-on-1 client conversations exposes severe architectural and latency trade-offs.',
    whatWorks: "Acoustic Fidelity & Voice Cloning in Batch: Industry-leading preservation of vocal timbre, cross-lingual identity retention, and emotional prosody when processing pre-recorded audio where multi-second generation buffers are acceptable.",
    whatIWouldChange: "Three Real-Time Conversational Bottlenecks: (1) Latency Budget: Full-sentence buffering introduces a 1.5–3.0s delay, collapsing natural dialogue into awkward walkie-talkie pauses. (2) Standardized Diction: Models default to formal textbook grammar, missing the colloquial regional dialects, idioms, and informal rapport necessary for client negotiation. (3) Full-Duplex Interruption: Lack of sub-second streaming tokenization leads to 'ghost-speaking' when a listener interjects mid-sentence.",
    sohansNotes: {
      incentive: "ElevenLabs is horizontally positioned as an infrastructure API for content creators and developer platforms, optimizing for acoustic fidelity and actor licensing rather than the sub-300ms latency and packet ergonomics required for live enterprise sales calls.",
      mentalModel: "Human trust in high-stakes negotiations is 80% about timing, mutual interjections, and dialect empathy. A textbook-perfect accent with a 2-second delay feels robotic and suspicious compared to instant, culturally resonant speech.",
      experiment: "Deploy a chunked streaming speech-to-speech pipeline with speculative token prediction on live cross-regional sales calls. Measure conversational turn-taking latency, natural interjection recovery, and perceived speaker warmth versus standard ElevenLabs batch dubbing."
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
    id: 'teardown-asana-analyst',
    product: 'AI Asana Analyst (Full PRD & System Architecture)',
    category: 'Computer Vision · Edge AI Systems',
    title: 'Edge Computer Vision vs. Asynchronous GenAI: Real-Time Posture Feedback',
    observation: 'In real-time computer vision applications (25 FPS live yoga pose evaluation), coupling cloud LLM generation directly into the per-frame processing loop destroys the 40ms frame budget. A robust product architecture must strictly isolate real-time heuristic angle evaluation from asynchronous background GenAI synthesis.',
    whatWorks: "Two-Stage Decoupled Pipeline: MediaPipe BlazePose extracts 33 3D skeletal landmarks while NumPy computes joint arctangents against a deterministic PoseRules constraint table locally on CPU (<40ms). Offline audio alerts (pyttsx3) deliver instant spoken corrections with a 3-second cooldown to preserve practitioner flow.",
    whatIWouldChange: "Non-Blocking Background Threading for GenAI: On detected violations, a background worker formats violation payloads for post-session PDF diagnostic reports with silent fallback to rule-based strings if cloud APIs time out (>5s), ensuring the live camera feed is never blocked.",
    sohansNotes: {
      incentive: "Why not pass webcam video directly to multimodal LLMs? Cloud vision inference introduces 800ms–2000ms latency and high recurring API costs. Running edge geometry handles 25 FPS at zero compute cost, reserving GenAI solely for reflective post-session narrative advice.",
      mentalModel: "A yoga practitioner holding Warrior II cannot read fine text on a laptop screen 6 feet away. Real-time feedback must be ambient and minimal: high-contrast limb color overlays (green/red) and concise spoken audio cues ('Bend knee deeper') with a cooldown to prevent cognitive overload.",
      experiment: "Evaluate audio-visual cooldown intervals (3s vs. continuous) on live practitioners. Measure pose correction speed, session completion rate, and subjective user fatigue."
    }
  }
];

export const RESEARCH_SPOTLIGHT = {
  institution: 'Vishwakarma Institute of Technology (VIT), Pune',
  lab: 'Department of Computer Engineering / UX Research Lab',
  publicationStatus: 'Patent Application Draft & Academic Concept Report',
  patentTitle: 'AI-Driven Multilingual Adaptive User Interface System & Risk-Free Financial Sandbox',
  title: 'AI-Driven Adaptive UX Framework for High-Stakes FinTech',
  tagline: 'Why We Proposed an Adaptive Interface & Zero-Risk Practice Sandbox to Eliminate Operational Anxiety in Financial Systems',
  context: 'Digital payment applications enforce a rigid, one-size-fits-all interface across all demographics. In high-stakes financial applications where any mistake incurs irreversible monetary loss, low-literacy and vernacular users experience acute operational apprehension, search hesitation, and crisis paralysis. In our UX research work at VIT Pune, we designed a patent-pending AI-driven adaptive framework where the interface dynamically simplifies and protects the user rather than forcing the user to adapt to the machine.',
  
  whyWeSuggested: [
    { 
      label: 'Zero-Risk Practice Sandbox', 
      headline: 'Eliminating the Fear of Monetary Loss', 
      friction: 'First-time users are paralyzed by the fear that pressing an unfamiliar button will immediately deduct real money from their bank balance.',
      whySuggested: 'We proposed an exact mirrored application replica populated with simulated dummy balances and dummy billers. Users build tactile muscle memory and confidence by scanning dummy QR codes and practicing transfers with zero financial liability before committing real funds.'
    },
    { 
      label: 'Dynamic Visual Layer over Text Search', 
      headline: 'Recognition Over Query Recall', 
      friction: 'Conventional apps rely on text-input search boxes requiring English keywords, which vernacular users actively avoid due to non-native keyboard fatigue.',
      whySuggested: 'The adaptive system dynamically replaces query-dependent text inputs with high-contrast, category-anchored pictorial navigation, shifting user cognitive effort from textual recall to visual recognition.'
    },
    { 
      label: 'In-Situ "Hold-to-Translate" Micro-Analogies', 
      headline: 'Overcoming Superficial Code-Mixing', 
      friction: 'Apps translate simple button labels but leave regulatory loanwords ("Mandate", "Beneficiary", "Autopay") in English, causing users to suspect hidden debt contracts.',
      whySuggested: 'A touch-activated micro-translation layer that dynamically injects plain-language vernacular definitions and real-world analogies directly over confusing jargon without page reloads.'
    },
    { 
      label: 'Gesture-Anchored "Circle-to-Understand"', 
      headline: 'Screen Continuity & In-Context Guidance', 
      friction: 'When stuck on unfamiliar icons, users refuse to leave the active screen for external help centers because they fear the active payment session will drop or disconnect.',
      whySuggested: 'Allows users to draw a circle or touch any confusing graphic element to summon contextual, conversational assistance anchored directly to that active UI component.'
    },
    { 
      label: 'Crisis De-escalation & Escrow Visualizer', 
      headline: 'Transparency in Transaction Limbo', 
      friction: 'In failure or bank-timeout states, apps show cryptic technical error codes and commercial ads, triggering acute panic and repetitive, erroneous tapping.',
      whySuggested: 'Suppresses commercial clutter and presents a transparent escrow status visualizer with plain-language explanations and a guaranteed refund countdown timeline.'
    }
  ],

  patentArchitecture: {
    title: 'Patent System Architecture: The Adaptive UX Framework Modules',
    components: [
      { name: 'Dual-Mode Environment Controller', desc: 'Dynamically toggles between Live Production and a Mirrored Sandbox Replica populated with simulated balances and dummy billers.' },
      { name: 'Risk-Free Practice Sandbox', desc: 'Allows users to build tactile muscle memory scanning QR codes and sending payments with zero financial liability, eliminating transactional fear.' },
      { name: 'In-Situ Micro-Translation ("Hold-to-Translate")', desc: 'Injects contextual vernacular explanations for loanwords (e.g. Mandate, Autopay) on touch without app switching or screen reloads.' },
      { name: 'Gesture-Anchored Visual Inspection ("Circle-to-Understand")', desc: 'Attaches contextual conversational explanations directly to unfamiliar screen icons or UI elements.' }
    ]
  },

  figures: [
    { title: 'Patent Architecture Blueprint', image: '/research/fig17_solution_architecture_patent.png', caption: 'Full technical system diagram for the AI-Driven Adaptive UX Framework and Risk-Free Financial Sandbox' },
    { title: 'System Triangulation Architecture', image: '/research/fig16_cross_triangulation_framework.png', caption: 'Synthesizing qualitative user attitudes with screen-level interaction friction to guide adaptive interface design' }
  ]
};

