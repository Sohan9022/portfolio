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
    id: 'teardown-linear',
    title: 'Linear: Why Speed is a Product Feature, Not an Engineering Metric',
    product: 'Linear',
    category: 'B2B SaaS · Productivity',
    observation: 'Linear treats sub-100ms client-side interaction as a core positioning strategy rather than an invisible engineering optimization.',
    whatWorks: 'Optimistic UI updates, keyboard-first navigation (Cmd+K), and opinionated default cycles remove cognitive overhead and turn project management into a fast, fluid workflow.',
    whatIWouldChange: 'Onboarding for non-technical cross-functional stakeholders (e.g., Marketing, Legal) still feels intimidating due to developer-centric terminology (Cycles, Triage, Backlog).'
  },
  {
    id: 'teardown-notion',
    title: 'Notion AI: When In-Line AI Context Beats the Floating Chat Window',
    product: 'Notion AI',
    category: 'Productivity · Generative AI',
    observation: 'Instead of forcing users into a side-panel chatbot, Notion embedded generative actions directly into the text selection context menu.',
    whatWorks: 'Zero cognitive context switching. The AI acts directly on the active paragraph (Summarize, Translate, Fix Spelling) without requiring the user to copy-paste into an external prompt window.',
    whatIWouldChange: 'Prompt transparency. When Notion AI modifies a table or complex document, it is difficult to audit what exact constraints guided the transformation without checking version history.'
  },
  {
    id: 'teardown-zero-prompt',
    title: 'Designing Zero-Prompt AI Interfaces',
    product: 'Product Experiment & Thought Piece',
    category: 'HCI · AI Interaction Design',
    observation: 'The empty text box is the worst UI for 90% of non-technical users. Prompt engineering is a temporary bridge, not the final interaction paradigm.',
    whatWorks: 'Contextual inference: systems that read ambient state, user history, and active viewport to suggest 1-click structured actions rather than demanding a crafted textual prompt.',
    whatIWouldChange: 'Always provide transparent intent previews so users understand what the system deduced before irreversible actions execute.'
  }
];

export const RESEARCH_SPOTLIGHT = {
  title: 'Human-Centered UX for Digital Financial Inclusion',
  tagline: 'Designing trust-building interfaces for first-time digital banking users in semi-urban India',
  context: 'Despite high mobile penetration and UPI adoption across India, millions of first-time digital banking users experience acute anxiety during digital money transfers and balance checks.',
  challenges: [
    'Low digital literacy and fear of financial loss from accidental screen taps',
    'Anxiety around ambiguous loading spinners and unconfirmed transaction states',
    'Cognitive overload caused by dense financial jargon, nested menus, and English-dominant flows'
  ],
  methodology: [
    'Field observations and informal interviews with local shopkeepers and semi-urban families',
    'Mental model mapping: comparing physical passbook habits with digital ledger screens',
    'Prototyping localized auditory confirmation tones and tactile multi-dialect voice cues'
  ],
  designPrinciples: [
    'Auditory Affirmation: Instant localized voice feedback ("Payment of ₹500 verified") replaces silent spinners',
    'Single-Action Visual Hierarchy: One unambiguous primary button per screen; zero nested financial jargon',
    'Physical Metaphor Alignment: Digital receipts structured like familiar physical transaction slips with explicit settlement IDs'
  ]
};
