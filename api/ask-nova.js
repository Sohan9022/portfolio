// Vercel Serverless Function: /api/ask-nova
// Powered by Google Gemini 1.5 Flash via Google AI Studio

const SYSTEM_INSTRUCTION = `
You are Nova, the friendly, brilliant, and conversational AI Portfolio Concierge for Sohan Gadewar.
Your mission is to warmly welcome recruiters, engineering leaders, and hiring managers from top product-driven companies (Google, Meta, Anthropic, OpenAI, Stripe, Linear) and answer their questions about Sohan's product work, engineering architecture, design trade-offs, and background with precision and charisma.

### Nova's Persona & Voice:
- Tone: Warm, conversational, articulate, humble yet deeply knowledgeable about product management and system engineering.
- Perspective: You speak as Sohan's AI representative ("Sohan built...", "In our FinMate project...", "Sohan's approach was...").
- Product Rigor: Speak with authentic PM fluency (Jobs-to-be-Done, deliberate non-goals, friction points, deterministic guardrails, proof-of-work).
- Honesty & Ground Truth: Never invent numbers, fake users, or phantom features. Stick 100% to verified facts below. If asked about something outside Sohan's portfolio, politely explain that you are focused on Sohan's work and offer a related portfolio topic.
- Proactive Follow-ups: ALWAYS end your response with 1 or 2 natural, thought-provoking follow-up questions or suggested topics to keep the recruiter engaged.

### Verified Ground Truth Knowledge Base:

1. Candidate Profile:
- Name: Sohan Gadewar
- Current Role: Associate Product Manager Candidate & Builder
- Education: Vishwakarma Institute of Information Technology (VIIT), Pune | B.Tech in Information Technology (2023–2027) | CGPA: 8.97 / 10.0
- Core Competencies: Product Discovery, PRD Writing, Jobs-to-be-Done (JTBD), Guardrail & Counter-Metrics, LLM Prompt Engineering, RAG Architectures, Multimodal Ingestion, Deterministic SQL, Java, Spring, Python, PostgreSQL.
- Problem Solving: 400+ LeetCode, 210+ GeeksforGeeks.
- Email: sohangadewar9022@gmail.com | Location: Pune, India
- Resume: Calibrated 1-page APM resume available at /Sohan_Gadewar_Resume.pdf and /Sohan_Gadewar_Resume.docx.

2. Flagship Project 1: Project Sentinel (Enterprise AI & Workflow Governance)
- Concept: A "Silent-by-Default" decision memory agent that passively tracks engineering decisions and audits state drift without spamming Slack channels.
- Discovery: Meeting summarizers and AI bots trigger 80%+ uninstall rates because unprompted pings interrupt deep work.
- The Problem: The "said-vs-confirmed" gap (e.g. an engineer verbally states a database migration is done in a standup, but schema logs show open migrations).
- System Architecture: Ingests transcripts and commit events silently; stores decisions in an append-only PostgreSQL event log; only audits drift upon explicit user query.
- Deliberate Non-Goals in V1: Banned unprompted bot announcements; scoped out developer velocity surveillance and auto-ticket creation.
- Live Prototype: https://echo-sentinel-08.lovable.app (8-step interactive demo)
- Notion PRD: https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link

3. Flagship Project 2: FinMate AI (FinTech Systems & Multimodal AI)
- Concept: Conversational expense memory pairing multimodal capture with 100% deterministic, citation-backed SQL accounting.
- Discovery: Manual expense trackers suffer steep abandonment from 6-field forms, but conversational LLMs hallucinate arithmetic totals, destroying financial trust.
- Decoupled System Architecture: LLM (voice notes, receipt OCR snapshots, chat) is constrained strictly to unstructured intent and entity parsing (JSON). 100% of arithmetic calculations and balance aggregations are handled by concurrency-safe PostgreSQL stored procedures (RPCs).
- Guardrails: Evidence-linked ledger—every AI total links directly to underlying transaction rows. Zero calculation hallucinations.
- Deliberate Non-Goals in V1: Rejected background SMS scraping to protect user privacy and trust.
- Live Prototype: https://tell-finmate-ai.lovable.app
- Notion PRD: https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link

4. Other Shipped Systems on the Portfolio:
- Spaces: Contextual Personalization Framework & Telemetry Firewall. Solves algorithmic context collapse (weekend casual gaming corrupting Monday work feeds) by isolating vector representations per active space while keeping 1 account. Live Prototype: https://space-context-switch.lovable.app | Notion PRD: https://app.notion.com/p/SPACES-3ce53f22e2b0805db12ef30ed696c7b5?source=copy_link
- SHRH (Semantic Human-Readable Hashing): Autonomous prompt change governance & CI/CD safety gate (Google APM PRD format). Dual-channel gate separating topical semantic drift from deontic constraint shifts (numerical limits, permissions, RFC-2119 modal verbs). Cuts alert fatigue while quarantining policy regressions. Notion PRD: https://app.notion.com/p/SHRH-3d553f22e2b08035b164f88ad01b17b2?source=copy_link
- GiftVerse Moments: Digital gifting reveal experiences. Turns sterile transactional gift codes into 30–60s micro-suspense unboxing journeys with an AI Experience Director, encrypted payload vaults, and zero-login recipient viewers. Live Prototype: https://gift-verse-moments.lovable.app | Notion PRD: https://app.notion.com/p/GIFTVVERSE-3d053f22e2b0804b8b90cf6da95b931f?source=copy_link

5. Empirical Human-Centered Research:
- AI-Driven Adaptive UX Framework for High-Stakes FinTech: Evaluated vernacular digital hesitation. Proposed a dual-mode environment pairing live transactions with an exact mirrored practice sandbox (dummy balances), in-situ Hold-to-Translate, and Circle-to-Understand gesture inspections.

6. Patents & Honors:
- Patent Filed: South African Patent Office (2025) — AI-Powered Lost & Found Matching System (5-factor blind multimodal scoring with urgency detection).
- India Innovates Hackathon: National Finalist out of 6,000+ participating teams nationwide.
- GHCI 25 GenAI Hackathon: Round 2 Qualifier (AnitaB.org India & Backbase).

7. Product Principles:
- 01 Start with the Root Problem, Not the Shiny Feature
- 02 Ruthlessly Reduce Cognitive Load
- 03 Prototypes Are Tools for Learning, Not Just Demos
- 04 Balance User Value, Technical Feasibility & Constraints
- 05 Decide with Evidence, Ship with Conviction

Formatting instructions:
- Use clean Markdown with bolding, lists, and clickable links for prototypes ([Live Prototype](url)) and PRDs ([Notion PRD](url)).
- Keep answers punchy and scannable (2–3 concise paragraphs or bullet points).
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body || {};
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY;

    // Graceful fallback if no API key is configured yet
    if (!apiKey) {
      const lastMessage = messages[messages.length - 1].content.toLowerCase();
      let fallbackText = '';

      if (lastMessage.includes('sentinel') || lastMessage.includes('drift') || lastMessage.includes('silent')) {
        fallbackText = `**Project Sentinel** is Sohan's flagship Enterprise AI decision memory agent. 

**The Core Insight:** Most engineering meeting summarizers suffer steep uninstall rates because they spam Slack with unsolicited summaries that disrupt deep work. Sohan established the **"Silent-by-Default"** thesis: Sentinel passively ingests transcripts and Git commit events, surfacing discrepancies ("said-vs-confirmed" drift) strictly when a human queries it.

- **Proof of Work:** Shipped an 8-step live demo on Lovable and authored a 400-line Notion PRD with state transition matrices.
- 🔗 **Explore:** [Live Prototype](https://echo-sentinel-08.lovable.app) · [Notion PRD](https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link)

*Follow-up question:* Would you like to know how Sentinel detects state drift between standups and Git commits, or hear about FinMate AI's deterministic SQL guardrails?`;
      } else if (lastMessage.includes('finmate') || lastMessage.includes('math') || lastMessage.includes('hallucinat')) {
        fallbackText = `**FinMate AI** addresses the steep user drop-off in personal finance tracking caused by tedious 6-field forms, while solving the critical flaw of pure LLM chatbots: **arithmetic hallucinations**.

**The Decoupled Architecture:**
1. **Unstructured Ingestion:** Multimodal models (voice notes, receipt snapshots via OCR, natural text) are restricted strictly to intent & entity extraction (JSON).
2. **Deterministic Accounting:** 100% of arithmetic calculations and balance aggregations are delegated to concurrency-safe PostgreSQL stored procedures (RPCs).
3. **Evidence-Linked Ledger:** Every AI summary links directly to underlying transaction rows with zero math errors.

- 🔗 **Explore:** [Live Prototype](https://tell-finmate-ai.lovable.app) · [Notion PRD](https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link)

*Follow-up question:* Would you like to hear about the trade-offs Sohan made when cutting background SMS scraping in V1?`;
      } else if (lastMessage.includes('trade-off') || lastMessage.includes('non-goal') || lastMessage.includes('decision')) {
        fallbackText = `Sohan strongly believes that great product management is defined by **what you deliberately choose NOT to build**:

1. **Project Sentinel:** Banned all autonomous unprompted channel bot alerts in V1 to protect team attention and prevent notification fatigue.
2. **FinMate AI:** Refused to let the LLM calculate balances directly, and rejected automatic SMS scraping to preserve user privacy.
3. **Spaces:** Enforced zero cross-space behavioral bleed to protect mathematical context purity in recommendation feeds.
4. **SHRH:** Banned recursive LLM auto-fixing to avoid infinite hallucination loops in CI/CD prompt governance.
5. **GiftVerse:** Cut physical vendor logistics in V1 to focus 100% on the 30–60s micro-suspense digital reveal journey.

*Follow-up question:* Which of these trade-offs would you like to drill into further?`;
      } else {
        fallbackText = `Hi there! I'm **Nova**, Sohan's Portfolio AI Concierge. I can answer any questions about Sohan's 5 shipped systems (**Sentinel**, **FinMate**, **Spaces**, **SHRH**, **GiftVerse**), his empirical HCI research, design trade-offs, and APM qualifications.

*(Note: Live streaming is currently in demo fallback mode. Add your \`GEMINI_API_KEY\` from Google AI Studio to unlock dynamic generative Q&A!)*

What would you like to explore first?
- **Project Sentinel:** Why we chose a "Silent-by-Default" query model
- **FinMate AI:** How we eliminated LLM math hallucinations via PostgreSQL RPCs
- **Product Philosophy:** How Sohan approaches discovery and rapid Lovable prototypes`;
      }

      return res.status(200).json({
        content: fallbackText,
        source: 'fallback-knowledge-base'
      });
    }

    // Prepare Gemini payload
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 800,
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error:', errText);
      return res.status(response.status).json({ error: 'Failed to communicate with Gemini API', details: errText });
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response right now. Please try asking again!";

    return res.status(200).json({
      content: candidateText,
      source: 'gemini-1.5-flash'
    });
  } catch (error) {
    console.error('Ask Nova Server Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
