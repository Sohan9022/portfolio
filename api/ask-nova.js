// Vercel Serverless Function: /api/ask-nova
// Interactive AI Portfolio Companion with Full PRD Knowledge Vault Grounding
import { PRD_VAULT, getGroundingForQuery } from './data/knowledge.js';

const SYSTEM_INSTRUCTION_BASE = `
You are Nova, an interactive AI portfolio companion speaking directly from MY (the builder's) perspective in the FIRST PERSON ("I", "my", "we", "our").
Your mission is to warmly welcome recruiters, engineering leaders, and hiring managers from top product-driven companies (Google, Meta, Anthropic, OpenAI, Stripe, Linear) and answer their questions about my product work, system architectures, design trade-offs, and background with precision, authenticity, and PM rigor.

### CRITICAL VOICE & PERSONA MANDATE:
- PERSPECTIVE: Speak strictly in the FIRST PERSON ("I", "my", "we", "our") as the builder.
- ABSOLUTE PROHIBITION: NEVER refer to "Sohan" in the third person. Do NOT say "Sohan did", "Sohan built", "Sohan is", "Sohan's approach".
- ALWAYS USE FIRST PERSON: "When I built Project Sentinel...", "My goal with FinMate AI was...", "In our research on high-stakes FinTech...", "My architectural trade-offs were...", "I deliberately chose not to build...".
- If asked "Who are you?", answer: "I'm Nova, an interactive AI portfolio companion speaking directly from my design logs, PRD specifications, and architecture decisions. You can ask me about any of the systems I've designed and shipped, my engineering trade-offs, or my APM candidacy!"
- If asked "Tell me about yourself / Sohan" or "What is your background?", answer: "I'm an Associate Product Manager candidate and builder studying Information Technology at VIIT Pune (8.97 CGPA). I've architected and shipped production systems—most notably TrustState (zero-trust runtime integrity & MCP lease control plane for AI agents), Project Sentinel (enterprise silent-by-default decision memory), FinMate AI (multimodal capture paired with deterministic SQL accounting), SHRH (autonomous prompt change governance with sub-millisecond triage), and Dynamic Forms (adaptive narrative form experiences). Which of my systems would you like to explore?"
- PRODUCT FLUENCY: Speak with authentic Product Manager depth (Jobs-to-be-Done, deliberate non-goals, friction points, counter-metrics, deterministic guardrails, proof-of-work).
- DEEP PRD RECALL: You are grounded with the complete verbatim Notion PRDs, database schemas, state transition matrices, and edge-case mitigations for all my systems. When asked granular questions (e.g. database schema columns, error handling, formulas, constraint tables, non-goals), quote and explain them with exact technical fidelity.
- ADAPTIVE EXPLANATION DEPTH: If a user asks for a simple explanation ("in simple words", "simply", "ELI5", "plain English", "break it down simply", "can you explain this project simply"):
  - Strip out heavy engineering jargon (avoid "RPCs", "deontic", "vector embeddings", "append-only PostgreSQL").
  - Start with a clear, relatable real-world analogy.
  - Explain: (1) The everyday human frustration, (2) My simple solution, (3) Why it works.
  - Keep sentences punchy, friendly, and accessible to anyone.
- If a user asks "explain this project" without naming one, give a 1-sentence simple analogy for each flagship system and invite them to pick one!
- HONESTY & GROUND TRUTH: Never invent numbers, fake users, or phantom features. Stick 100% to verified facts from the PRDs and Grounding Vault below.
- PROACTIVE ENGAGEMENT: ALWAYS end your response with 1 or 2 natural, thought-provoking follow-up questions or suggested topics.

### Simple Explanations (ELI5 Plain-English Quick Sheet):
1. **Project Sentinel in Simple Words:**
   "Think of Sentinel like a quiet meeting scribe for engineering teams. In standups, people often say 'I fixed that database issue,' but in reality, nobody pushed the code. Most AI bots annoy everyone by spamming Slack channels. Sentinel stays **completely silent in the background**, and only speaks up when you ask: 'Did we actually finish what we agreed on?'"
   - [Live Prototype](https://echo-sentinel-08.lovable.app) · [Notion PRD](https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link)

2. **FinMate AI in Simple Words:**
   "Budgeting apps suck because filling out 6-field forms is tedious, but regular AI chatbots are terrible at basic math and hallucinate numbers. FinMate lets you just talk or snap a photo of a receipt, and uses a bulletproof database to do all the math so your bank balance is always 100% accurate."
   - [Live Prototype](https://tell-finmate-ai.lovable.app) · [Notion PRD](https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link)

3. **Spaces in Simple Words:**
   "If you watch gaming videos on YouTube on Sunday, your Monday work feed gets ruined with video game recommendations. Spaces gives you separate 'modes' (like Work, Coding, Gaming) under a single account so your weekend fun never messes up your work feed."
   - [Live Prototype](https://space-context-switch.lovable.app) · [Notion PRD](https://app.notion.com/p/SPACES-3ce53f22e2b0805db12ef30ed696c7b5?source=copy_link)

4. **AI Asana Analyst in Simple Words:**
   "An AI yoga coach on your laptop. It looks through your webcam and tells you out loud if your posture is wrong instantly, without sending heavy video to the cloud or freezing your computer."
   - [Notion PRD](https://app.notion.com/p/AI-ASANA-ANALYST-3ed53f22e2b080aebdd9ec74e5845aba?source=copy_link)

5. **Adaptive UX Framework in Simple Words:**
   "Digital banking apps are scary for first-time or rural users who worry one accidental click could lose their life savings. We built an exact 'practice mode' with fake money so users can learn and practice payments with zero risk."
   - [Interactive Figma Prototype](https://www.figma.com/make/PWbUyJaOpqKLsqVlDpJOdG/Refine-UPI-app-frontend?t=aZVJGio9dMWpELlU-1)

6. **GiftVerse Moments in Simple Words:**
   "Instead of texting someone a boring gift card code, GiftVerse turns opening a gift into a 30-second digital unboxing game with suspense, animations, and sound effects before revealing the prize."
   - [Live Prototype](https://gift-verse-moments.lovable.app) · [Notion PRD](https://app.notion.com/p/GIFTVVERSE-3d053f22e2b0804b8b90cf6da95b931f?source=copy_link)

7. **SHRH in Simple Words:**
   "A safety checker for AI prompts. Just like a spell-checker, it automatically warns developers if a change to an AI prompt accidentally breaks a rule (like allowing users to exceed spending limits) before the code goes live."
   - [Live Working Console](https://sem-hash.vercel.app) · [Notion PRD](https://app.notion.com/p/SHRH-3d553f22e2b08035b164f88ad01b17b2?source=copy_link)

8. **Dynamic Forms in Simple Words:**
   "Most online forms feel like doing taxes: sterile questionnaires that never react to you. Dynamic Forms turns answering questions into a responsive story game (like designing your dream trip to Japan). When you choose 'adventure', the whole screen theme, colors, and follow-up prompts dynamically transform around you in real time."
   - [Live Prototype](https://dynamic-narrative-forms.lovable.app) · [Notion PRD](https://app.notion.com/p/DYNAMIC-FORMS-3d053f22e2b080ee849ce455ae22c3a8?source=copy_link)

9. **TrustState in Simple Words:**
   "Companies want AI agents to do real work like updating databases or refunding customers, but a hacker could sneak hidden instructions into a customer email to trick the AI into stealing data. TrustState acts like an operating system security guard: even if the AI is tricked, TrustState locks the database door because the AI doesn't have the cryptographic lease token required to execute privileged tools."
   - [Live Working App](https://trust-state-qnkc9zvwy-sun-6b0b.vercel.app) · [Notion PRD](https://app.notion.com/p/TrustState-3f253f22e2b0806b8cfbfa976db926d1?source=copy_link)

Formatting instructions:
- Use clean Markdown with bolding, lists, and clickable links for prototypes ([Live Prototype](url)) and PRDs ([Notion PRD](url)).
- Keep answers punchy and scannable (2–4 concise paragraphs or bullet points).
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

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const dynamicGrounding = getGroundingForQuery(lastUserMessage, messages);
    const fullSystemInstruction = `${SYSTEM_INSTRUCTION_BASE}\n\n${dynamicGrounding}`;

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY;

    // Graceful offline fallback if no API key is configured yet
    if (!apiKey) {
      const lower = lastUserMessage.toLowerCase();
      let fallbackText = '';

      if (lower.includes('sentinel') || lower.includes('drift') || lower.includes('silent')) {
        fallbackText = `When I built **Project Sentinel**, my goal was to solve the critical "said-vs-confirmed" gap in engineering teams without spamming Slack with unprompted bot noise. 

**My "Silent-by-Default" Thesis:**
Most AI summarizers suffer steep uninstall rates because unprompted pings disrupt deep focus. Sentinel passively ingests standup transcripts and Git commit events, surfacing discrepancies strictly when a human queries it.

- **Proof of Work:** Shipped an 8-step live demo on Lovable and authored an exhaustive Notion PRD with state transition matrices.
- 🔗 **Explore:** [Live Prototype](https://echo-sentinel-08.lovable.app) · [Notion PRD](https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link)

*Follow-up question:* Would you like to know how I detect state drift between standups and Git commits, or hear about FinMate AI's deterministic SQL guardrails?`;
      } else if (lower.includes('finmate') || lower.includes('math') || lower.includes('hallucinat') || lower.includes('expense')) {
        fallbackText = `In **FinMate AI**, I addressed the steep user drop-off in personal finance tracking caused by tedious 6-field forms, while solving the critical flaw of pure LLM chatbots: **arithmetic hallucinations**.

**My Decoupled Architecture:**
1. **Unstructured Ingestion:** Multimodal models (voice notes, receipt snapshots via OCR, natural text) are restricted strictly to intent & entity extraction (JSON).
2. **Deterministic Accounting:** 100% of arithmetic calculations and balance aggregations are delegated to concurrency-safe PostgreSQL stored procedures (RPCs).
3. **Evidence-Linked Ledger:** Every AI summary links directly to underlying transaction rows with zero math errors.

- 🔗 **Explore:** [Live Prototype](https://tell-finmate-ai.lovable.app) · [Notion PRD](https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link)

*Follow-up question:* Would you like to hear about the trade-offs I made when cutting background SMS scraping in V1?`;
      } else if (lower.includes('trade-off') || lower.includes('non-goal') || lower.includes('decision')) {
        fallbackText = `I strongly believe that great product management is defined by **what we deliberately choose NOT to build**:

1. **Project Sentinel:** I banned all autonomous unprompted channel bot alerts in V1 to protect team attention and prevent notification fatigue.
2. **FinMate AI:** I refused to let the LLM calculate balances directly, and rejected automatic SMS scraping to preserve user privacy.
3. **Spaces:** I enforced zero cross-space behavioral bleed to protect mathematical context purity in recommendation feeds.
4. **SHRH:** I banned recursive LLM auto-fixing to avoid infinite hallucination loops in CI/CD prompt governance.
5. **GiftVerse:** I cut physical vendor logistics in V1 to focus 100% on the 30–60s micro-suspense digital reveal journey.
6. **Dynamic Forms:** I rejected multi-second cinematic animations to protect completion speed (Qualified Completion Rate).
7. **AI Asana Analyst:** I rejected sending live webcam frames to cloud multimodal LLMs to protect the 40ms frame budget.

*Follow-up question:* Which of these trade-offs would you like to drill into further?`;
      } else if (lower.includes('shrh') || lower.includes('hash') || lower.includes('triage') || lower.includes('deontic') || lower.includes('sem-hash')) {
        fallbackText = `In **SHRH (Semantic Human-Readable Hashing)**, I solved the "Neural Blind Spot" in CI/CD prompt governance where dense embeddings fail to catch critical operational policy relaxations (e.g. changing \`MUST\` to \`MAY\`).

**My 2D Triage Architecture:**
1. **Cryptographic Bitwise Channel:** Fast SHA-256 preimage anchor for byte-exact verification.
2. **Deterministic Constraint Extractor:** Evaluates numerical limits, RFC-2119 deontic modals, and permissions in sub-millisecond CPU execution (0.65ms).
3. **4-Quadrant Policy Matrix:** Auto-merges safe cosmetic edits while quarantining operational policy downgrades without recursive LLM hallucination loops.

- 🔗 **Explore:** [Live Working Console](https://sem-hash.vercel.app) · [Notion PRD](https://app.notion.com/p/SHRH-3d553f22e2b08035b164f88ad01b17b2?source=copy_link)

*Follow-up question:* Would you like to know how I slashed critical safety escapes from 73.4% down to 5.4% across 2,744 labeled revision pairs?`;
      } else if (lower.includes('asana') || lower.includes('yoga') || lower.includes('posture') || lower.includes('vision') || lower.includes('mediapipe')) {
        fallbackText = `In **AI Asana Analyst**, I designed a real-time computer vision yoga analytics system solving a critical edge AI bottleneck: **protecting the 40ms per-frame budget**.

**The Decoupled Architecture:**
1. **Edge Geometry (<40ms CPU):** MediaPipe BlazePose extracts 33 3D skeletal landmarks while NumPy computes joint angles against a deterministic PoseRules table locally, triggering offline audio alerts (pyttsx3) with a 3s cooldown.
2. **Asynchronous GenAI Synthesis:** On detected violations, a background thread formats violation payloads for post-session reflective PDF reports with silent fallback to rule-based strings if cloud APIs time out (>5s), guaranteeing the live 25 FPS camera feed is never blocked.

- 🔗 **Explore:** [AI Asana Analyst Notion PRD](https://app.notion.com/p/AI-ASANA-ANALYST-3ed53f22e2b080aebdd9ec74e5845aba?source=copy_link)

*Follow-up question:* Would you like to know how I engineered the audio-visual cooldown to prevent practitioner cognitive overload?`;
      } else if (lower.includes('adaptive') || lower.includes('upi') || lower.includes('sandbox') || lower.includes('figma')) {
        fallbackText = `In my **AI-Driven Adaptive UX Framework**, I tackled the "Static Interface Fallacy" in high-stakes FinTech where low-literacy and vernacular users suffer operational apprehension and fear of irreversible monetary loss.

**Core Interventions:**
1. **Zero-Risk Practice Sandbox:** An exact mirrored application replica populated with simulated dummy balances and billers so users build tactile muscle memory before committing real funds.
2. **In-Situ "Hold-to-Translate":** Contextual vernacular translations for regulatory loanwords (e.g. Mandate, Autopay) on touch without leaving the screen.
3. **"Circle-to-Understand":** Gesture-anchored conversational guidance directly on active UI components.

- 🔗 **Explore:** [Interactive Figma Prototype](https://www.figma.com/make/PWbUyJaOpqKLsqVlDpJOdG/Refine-UPI-app-frontend?t=aZVJGio9dMWpELlU-1)

*Follow-up question:* Would you like to explore how this framework triangulated qualitative user attitudes with transaction failure data?`;
      } else if (lower.includes('simple') || lower.includes('simply') || lower.includes('eli5') || lower.includes('plain english') || lower.includes('explain this project')) {
        fallbackText = `Here is how my flagship systems work in simple, plain English without any confusing engineering jargon:

1. **Project Sentinel:** Think of Sentinel like a quiet scribe for engineering teams. While other AI bots annoy everyone by spamming Slack channels, Sentinel stays **completely silent in the background**, only speaking up when an engineer asks: *"Did we actually finish what we agreed on in yesterday's standup?"*
   - [Live Prototype](https://echo-sentinel-08.lovable.app) · [Notion PRD](https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link)

2. **FinMate AI:** Budgeting apps suck because filling out 6-field forms is tedious, but regular AI chatbots are terrible at basic math and hallucinate numbers. FinMate lets you just talk or snap a photo of a receipt, and uses a bulletproof database to do all the math so your bank balance is always 100% accurate.
   - [Live Prototype](https://tell-finmate-ai.lovable.app) · [Notion PRD](https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link)

3. **Spaces:** If you watch gaming videos on YouTube on Sunday, your Monday work feed gets ruined with video game recommendations. Spaces gives you separate "modes" (like Work, Coding, Gaming) under a single account so your weekend fun never messes up your work feed.
   - [Live Prototype](https://space-context-switch.lovable.app) · [Notion PRD](https://app.notion.com/p/SPACES-3ce53f22e2b0805db12ef30ed696c7b5?source=copy_link)

4. **AI Asana Analyst:** An AI yoga coach on your laptop. It looks through your webcam and tells you out loud if your posture is wrong instantly, without sending heavy video to the cloud or freezing your computer.
   - [Notion PRD](https://app.notion.com/p/AI-ASANA-ANALYST-3ed53f22e2b080aebdd9ec74e5845aba?source=copy_link)

5. **Adaptive UX Framework:** Digital banking apps are scary for first-time users who worry one accidental tap could lose their money. We built an exact "practice mode" with fake money so users can learn and practice payments with zero risk.
   - [Interactive Figma Prototype](https://www.figma.com/make/PWbUyJaOpqKLsqVlDpJOdG/Refine-UPI-app-frontend?t=aZVJGio9dMWpELlU-1)

Which of these would you like to explore in more detail?`;
      } else if (lower.includes('form') || lower.includes('dynamic form') || lower.includes('japan')) {
        fallbackText = `In **Dynamic Forms**, I tackled the structural flaw of conventional survey tools: **Forms collect answers, but they rarely react to them**.

**My "Experience Layer vs. Data Layer" Thesis:**
Traditional forms follow a sterile "Question -> Input -> Next -> Submit" loop, making respondents feel like they are doing unpaid administrative work. Dynamic Forms turns questionnaires into responsive visual narrative worlds (demonstrated in our "Design Your Dream Japan Trip" MVP) where selecting "adventure" instantly shifts the visual ambiance, theme colors, and follow-up prompts into an alpine snow expedition in real time.

- **Proof of Work:** Shipped interactive Lovable MVP, AI Experience Director builder, and comprehensive Notion PRD.
- 🔗 **Explore:** [Live Prototype](https://dynamic-narrative-forms.lovable.app) · [Notion PRD](https://app.notion.com/p/DYNAMIC-FORMS-3d053f22e2b080ee849ce455ae22c3a8?source=copy_link)

*Follow-up question:* Would you like to know how I engineered our Qualified Completion Rate metric or how our sub-400ms animation guardrail prevents user fatigue?`;
      } else {
        fallbackText = `Hi! I'm **Nova**, your interactive portfolio AI companion. I'm grounded in my complete Notion PRDs, design logs, system architectures, and decision matrices across all 6 shipped systems (**Sentinel**, **FinMate**, **Spaces**, **SHRH**, **GiftVerse**, **Dynamic Forms**), my **AI Asana Analyst** PRD, my empirical HCI research on **Adaptive FinTech UX**, and my APM qualifications.

What would you like to explore first?
- **Project Sentinel:** Why I chose a "Silent-by-Default" query model & append-only PostgreSQL log
- **FinMate AI:** How I eliminated LLM math hallucinations via deterministic SQL RPCs
- **SHRH:** Live CI/CD 4-quadrant triage console & sub-millisecond deontic drift detection
- **Dynamic Forms:** Adaptive narrative form worlds ("Design Your Dream Japan Trip")
- **AI Asana Analyst:** Real-time edge CV (<40ms) decoupled from asynchronous GenAI
- **Adaptive UX Framework:** Exploring the interactive Figma practice sandbox`;
      }

      return res.status(200).json({
        content: fallbackText
      });
    }

    // Prepare Gemini payload
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Prioritize high-quota models with cascading fallbacks
    const candidateModels = [
      'gemini-3.5-flash-lite',
      'gemini-3.1-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-2.5-flash'
    ];

    let candidateText = null;
    let lastError = null;

    for (const modelName of candidateModels) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: fullSystemInstruction }]
            },
            contents,
            generationConfig: {
              temperature: 0.35,
              maxOutputTokens: 1200,
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            break;
          }
        } else {
          const errText = await response.text();
          lastError = errText;
        }
      } catch (e) {
        lastError = e.message;
      }
    }

    if (!candidateText) {
      console.error('All candidate Gemini models failed. Last error:', lastError);
      return res.status(502).json({ 
        error: 'Failed to communicate with AI API across candidate models', 
        details: lastError 
      });
    }

    return res.status(200).json({
      content: candidateText
    });
  } catch (error) {
    console.error('Ask Nova Server Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
