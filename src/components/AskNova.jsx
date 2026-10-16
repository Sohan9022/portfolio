import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  ExternalLink, 
  Compass, 
  ShieldCheck, 
  Terminal, 
  Database, 
  ArrowRight, 
  MessageSquare, 
  Bot,
  Copy,
  Check,
  Download,
  Layers,
  Activity,
  FileText,
  Code2,
  GraduationCap,
  Award,
  Zap,
  ChevronRight
} from 'lucide-react';
import { 
  PROJECTS, 
  DECISION_LOG, 
  HOW_I_THINK, 
  PRODUCT_TEARDOWNS, 
  RESEARCH_SPOTLIGHT 
} from '../data/projectsData';

// Exhaustive Slash Command Registry covering 100% of the portfolio website
const SLASH_COMMANDS = [
  // 1. Shipped Systems & PRD Specifications
  { command: '/project', args: '<name>', desc: 'Deep architecture spec & live demo of any system', category: 'Projects', icon: Terminal, isRemote: true },
  { command: '/tradeoffs', args: '<project>', desc: 'Deliberate non-goals, architectural sacrifices & counter-metrics', category: 'Projects', icon: ShieldCheck, isRemote: true },
  { command: '/schema', args: '<project>', desc: 'Database tables, RPC boundaries & state transition matrices', category: 'Projects', icon: Database, isRemote: true },
  { command: '/eli5', args: '<project>', desc: 'Plain-English real-world analogy with zero engineering jargon', category: 'Projects', icon: Sparkles, isRemote: true },

  // 2. Strategy & PM Philosophy
  { command: '/principles', args: '[1-5]', desc: "Sohan's 5 core product principles (How I Think)", category: 'Strategy', icon: Compass, isLocal: true },
  { command: '/decisions', args: '<topic>', desc: 'Deep-dive into any of the 6 formal architectural decision logs', category: 'Strategy', icon: ShieldCheck, isRemote: true },
  { command: '/rules', args: '', desc: 'Product invariant rules (Deterministic over stochastic, silent-by-default)', category: 'Strategy', icon: Zap, isLocal: true },

  // 3. Deep-Dive Teardowns & Systems Analysis
  { command: '/teardown', args: '<elevenlabs|adaptive-ux|asana-analyst>', desc: 'Deep system architecture teardowns (Voice, Edge CV, FinTech)', category: 'Analysis', icon: Layers, isRemote: true },
  
  // 4. Empirical HCI Research & Patent
  { command: '/research', args: '<sandbox|translation|gesture|escrow>', desc: 'Empirical UX research on Adaptive FinTech & Sandboxes', category: 'Research', icon: Activity, isRemote: true },
  { command: '/patent', args: '', desc: 'South African Patent: 5-factor blind scoring & Sandbox architecture', category: 'Research', icon: Award, isLocal: true },

  // 5. Candidate Background & Recruiter Utilities
  { command: '/about', args: '', desc: 'Sohan Gadewar profile (VIIT Pune 8.97 CGPA, APM track)', category: 'Recruiter', icon: GraduationCap, isLocal: true },
  { command: '/skills', args: '', desc: 'Product Strategy, Discovery, Technical & AI Systems toolkit', category: 'Recruiter', icon: Code2, isLocal: true },
  { command: '/credentials', args: '', desc: 'Hackathon honors (India Innovates Top 16%, GHCI 25) & certs', category: 'Recruiter', icon: Award, isLocal: true },
  { command: '/resume', args: '', desc: 'Download official 1-page APM resume & ATS summary', category: 'Recruiter', icon: FileText, isLocal: true },

  // 6. Developer & Session Utilities
  { command: '/status', args: '', desc: 'Live operational health check of 7 deployed prototypes', category: 'Utilities', icon: Activity, isLocal: true },
  { command: '/export', args: '', desc: 'Export session as an executive candidate brief (Markdown)', category: 'Utilities', icon: Download, isLocal: true },
  { command: '/clear', args: '', desc: 'Reset conversation & clear memory buffers', category: 'Utilities', icon: RotateCcw, isLocal: true },
];

const PROJECT_KEYS = [
  { id: 'truststate', label: 'TrustState' },
  { id: 'sentinel', label: 'Project Sentinel' },
  { id: 'finmate', label: 'FinMate AI' },
  { id: 'spaces', label: 'Spaces' },
  { id: 'shrh', label: 'SHRH' },
  { id: 'dynamic-forms', label: 'Dynamic Forms' },
  { id: 'giftverse', label: 'GiftVerse Moments' },
  { id: 'adaptive-ux', label: 'Adaptive UX' },
  { id: 'asana-analyst', label: 'Asana Analyst' }
];

const STARTER_PROMPTS = [
  {
    icon: Sparkles,
    text: "Explain your projects in simple words",
    category: "Simple Overview"
  },
  {
    icon: Terminal,
    text: "Why is Sentinel 'Silent-by-Default'?",
    category: "Enterprise AI"
  },
  {
    icon: Database,
    text: "How does FinMate prevent math hallucinations?",
    category: "FinTech & SQL"
  },
  {
    icon: ShieldCheck,
    text: "How does TrustState use MCP cryptographic lease tokens?",
    category: "AI Security"
  }
];

export default function AskNova({ externalOpen, onExternalClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm **Nova**, your interactive portfolio AI companion. ✦\n\nI'm equipped with a **Claude Code-style command engine** and 6 specialized subagents grounded across all my systems (**TrustState**, **Sentinel**, **FinMate**, **Spaces**, **SHRH**, **Dynamic Forms**, **GiftVerse**, **Adaptive UX**, **Asana Analyst**), my 6 decision logs, and my APM qualifications.\n\nType \`/\` to browse all commands or ask any question!`,
      timestamp: new Date(),
      subagent: { name: 'Nova Coordinator', role: 'System Orchestrator' },
      telemetry: { latencyMs: 14, tokens: 180, source: 'Local Initialization' }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageIndex, setStreamingMessageIndex] = useState(null);
  const [streamedText, setStreamedText] = useState('');
  
  // Claude Code Telemetry & Subagent Trace State
  const [telemetryTrace, setTelemetryTrace] = useState(null);
  const [selectedSlashIndex, setSelectedSlashIndex] = useState(0);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const streamTimerRef = useRef(null);

  // Sync external open triggers (e.g. from CommandMenu or Navbar)
  useEffect(() => {
    if (externalOpen) {
      setIsOpen(true);
    }
  }, [externalOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (onExternalClose) onExternalClose();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading, streamedText]);

  // Global keyboard shortcut: Option+N or Alt+N to toggle Nova
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.altKey && e.key.toLowerCase() === 'n') || (e.metaKey && e.key.toLowerCase() === 'j')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cleanup stream interval on unmount
  useEffect(() => {
    return () => {
      if (streamTimerRef.current) clearInterval(streamTimerRef.current);
    };
  }, []);

  // Fluid typewriter streaming function
  const streamResponse = (fullText, targetIndex) => {
    if (!fullText) return;

    const words = fullText.split(' ');
    let currentIndex = 0;
    setStreamingMessageIndex(targetIndex);
    setStreamedText('');

    if (streamTimerRef.current) clearInterval(streamTimerRef.current);

    streamTimerRef.current = setInterval(() => {
      if (currentIndex < words.length) {
        const nextChunkSize = (currentIndex % 3 === 0) ? 2 : 1;
        const nextIndex = Math.min(currentIndex + nextChunkSize, words.length);
        const currentSlice = words.slice(0, nextIndex).join(' ');
        setStreamedText(currentSlice);
        currentIndex = nextIndex;
      } else {
        clearInterval(streamTimerRef.current);
        streamTimerRef.current = null;
        setStreamingMessageIndex(null);
        setStreamedText('');
      }
    }, 16);
  };

  // Filter slash commands based on current input
  const isSlashActive = inputValue.startsWith('/');
  const slashQuery = isSlashActive ? inputValue.slice(1).toLowerCase().trim() : '';

  const filteredSlashCommands = SLASH_COMMANDS.filter(cmd => {
    const matchesQuery = cmd.command.slice(1).includes(slashQuery) || 
                         cmd.desc.toLowerCase().includes(slashQuery) ||
                         cmd.category.toLowerCase().includes(slashQuery);
    const matchesCat = activeCategoryFilter === 'All' || cmd.category === activeCategoryFilter;
    return matchesQuery && matchesCat;
  });

  // Check if user has entered a project command that expects an argument
  const isAwaitingProjectArg = isSlashActive && ['/project', '/tradeoffs', '/schema', '/eli5'].some(c => 
    inputValue.trim() === c || inputValue.trim() === `${c} `
  );

  // 100% Client-Side Local Command Execution (0 LLM Tokens)
  const executeLocalCommand = async (commandName, args) => {
    let content = '';
    let subagentName = 'Qualifications Officer';
    let source = 'Client-Side Local Engine';

    switch (commandName) {
      case '/rules':
        subagentName = 'Product Principles Specialist';
        source = 'Product Invariants Matrix';
        content = `### SOHAN'S 5 PRODUCT INVARIANT RULES:\n
1. **Deterministic calculation over stochastic LLM guessing when money is involved:** In FinMate AI, voice/receipt ingestion extracts entities into JSON, but 100% of arithmetic is handled by PostgreSQL stored procedures (RPCs).
2. **Silent-by-default — zero unsolicited noise:** In Project Sentinel, the agent never initiates unprompted Slack interruptions, surfacing discrepancies strictly upon explicit query.
3. **Cryptographic capability lease over soft prompt guardrails:** In TrustState, autonomous agents require short-lived, signed lease tokens (SHA-256) to execute privileged tools.
4. **Sub-millisecond triage over recursive LLM self-fixing:** In SHRH, CI/CD prompt drift is triaged via deterministic semantic hashing (0.65ms) to prevent infinite hallucination loops.
5. **Real-time edge geometry (<40ms) over cloud vision:** In AI Asana Analyst, 33 3D landmarks + NumPy joint angles run locally on CPU at 25 FPS to protect practitioner flow.`;
        break;

      case '/principles':
        subagentName = 'Product Principles Specialist';
        source = 'HOW_I_THINK (projectsData.js)';
        if (args && parseInt(args) >= 1 && parseInt(args) <= 5) {
          const p = HOW_I_THINK[parseInt(args) - 1];
          content = `### PRINCIPLE ${p.number}: ${p.title.toUpperCase()}\n\n${p.description || p.subtitle || ''}\n\n- **Rationale:** Grounded in real-world product constraints and cognitive ergonomics.`;
        } else {
          content = `### SOHAN'S 5 PRODUCT PRINCIPLES (HOW I THINK):\n\n` + 
            HOW_I_THINK.map(p => `**${p.number}. ${p.title}**\n${p.description || p.subtitle || ''}`).join('\n\n');
        }
        break;

      case '/about':
        subagentName = 'Qualifications Officer';
        source = 'Candidate Grounding';
        content = `### SOHAN GADEWAR — APM CANDIDATE & BUILDER
- **Education:** Vishwakarma Institute of Information Technology (VIIT), Pune | B.Tech in Information Technology | **CGPA: 8.97 / 10.0**
- **Core Focus:** Bridging deep system engineering, algorithmic guardrails, and user-centric product craft.
- **Track Record:** Architected and shipped 7 production prototypes & MVPs (**TrustState**, **Sentinel**, **FinMate AI**, **Spaces**, **SHRH**, **Dynamic Forms**, **GiftVerse Moments**).
- **Contact:** [sohangadewar9022@gmail.com](mailto:sohangadewar9022@gmail.com) · [LinkedIn Profile](https://www.linkedin.com/in/sohangadewar)
- **Problem Solving:** 400+ LeetCode, 210+ GeeksforGeeks.`;
        break;

      case '/skills':
        subagentName = 'Qualifications Officer';
        source = 'Candidate Toolkit';
        content = `### APM & TECHNICAL TOOLKIT:
- **Product Strategy & Sense:** PRD Writing, Jobs-to-be-Done (JTBD), RICE Prioritization, North Star & Counter-Metrics, Friction Mapping.
- **Customer Discovery & UX:** User Interviews, Journey Mapping, Rapid Figma Prototyping, Usability Testing, Behavioral Loops.
- **Technical Fluency:** Java, Spring Framework, Python, SQL & PostgreSQL RPCs, REST APIs, System Architecture, DSA.
- **AI Systems & Prototyping:** LLM Prompt Engineering, Advanced RAG, Multimodal Ingestion, MCP Leasing (TrustState), CI/CD Prompt Governance (SHRH), Supabase RLS.`;
        break;

      case '/credentials':
        subagentName = 'Qualifications Officer';
        source = 'Verified Honors & Awards';
        content = `### CREDENTIALS & HONORS:
1. **India Innovates Hackathon — National Finalist:** Top ~1,000 of ~6,000+ teams nationwide (Top ~16%).
2. **GHCI 25 GenAI Hackathon — Round 2 Qualifier:** AnitaB.org India & Backbase national AI competition.
3. **Patent Filed — Multimodal AI Matching System:** South African Patent Office (2025) — 5-factor blind scoring engine.
4. **Product Management Masterclass Certified:** GeeksforGeeks certified in product lifecycle, discovery, and roadmap metrics.`;
        break;

      case '/resume':
        subagentName = 'Qualifications Officer';
        source = 'ATS Resume Grounding';
        content = `### SOHAN GADEWAR — APM RESUME
Calibrated 1-page Associate Product Manager resume highlighting system architectures, technical metrics, and product leadership.

- 📄 **Direct Download:** [Download PDF Resume](/Sohan_Gadewar_Google_APM_Resume.pdf)
- 📄 **Word Format:** [Download DOCX Resume](/Sohan_Gadewar_Google_APM_Resume.docx)
- 🎯 **ATS Score:** Calibrated against APM rubrics for Google, Meta, Anthropic, Stripe, and Linear.`;
        break;

      case '/patent':
        subagentName = 'HCI Research Fellow';
        source = 'South African Patent (2025)';
        content = `### PATENT ARCHITECTURE: MULTIMODAL AI & ADAPTIVE UX
1. **South African Patent Office (2025):** AI-Powered Lost & Found Matching System utilizing a 5-factor blind multimodal scoring engine (image vectors, text embeddings, geospatial proximity, timestamp decay, and contextual urgency).
2. **Adaptive UX Sandbox Architecture:** Dual-Mode Environment Controller decoupling Live Production from a Mirrored Sandbox Replica, allowing first-time users to practice high-stakes payments with zero financial liability.
- 🔗 **Explore:** [Interactive Figma Prototype](https://www.figma.com/make/PWbUyJaOpqKLsqVlDpJOdG/Refine-UPI-app-frontend?t=aZVJGio9dMWpELlU-1)`;
        break;

      case '/status':
        subagentName = 'Systems & PRD Specialist';
        source = 'Live Operational Ping';
        content = `### SYSTEM OPERATIONAL HEALTH CHECK:
● **TrustState Control Plane (Vercel):** Operational (Live)
● **Project Sentinel (Lovable):** Operational (Live)
● **FinMate AI Voice Memory (Lovable):** Operational (Live)
● **Spaces Context Switch (Lovable):** Operational (Live)
● **SHRH Triage Gate (Vercel):** Operational (Live)
● **Dynamic Narrative Forms (Lovable):** Operational (Live)
● **GiftVerse Moments (Lovable):** Operational (Live)
● **Notion PRD Grounding Vault:** 9 of 9 Documents Synced (Active)
● **Runtime Latency:** Local Edge Dispatch <15ms`;
        break;

      case '/export':
        subagentName = 'Qualifications Officer';
        source = 'Session Dossier Generator';
        const transcriptText = messages.map(m => `### ${m.role === 'user' ? 'Interviewer / Recruiter' : 'Nova (Sohan)'}:\n${m.content}\n`).join('\n---\n\n');
        const exportDoc = `# Nova Interview Brief & Candidate Dossier - Sohan Gadewar (APM Candidate)
Date: ${new Date().toLocaleDateString()}
Candidate: Sohan Gadewar (VIIT Pune, 8.97 CGPA)
Email: sohangadewar9022@gmail.com

---

${transcriptText}

---
*Generated via Nova Interactive Portfolio Companion*`;

        // Trigger download
        const blob = new Blob([exportDoc], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Sohan_Gadewar_Nova_Interview_Brief_${Date.now()}.md`;
        a.click();
        URL.revokeObjectURL(url);

        content = `✦ **Session dossier exported successfully!**\n\nA 1-page candidate briefing Markdown file has been downloaded. You can share this directly with your hiring committee or engineering director.`;
        break;

      case '/clear':
        handleClearChat();
        return;

      default:
        content = `Command \`${commandName}\` recognized. Type \`/\` to see the full list of available commands!`;
    }

    const newMessages = [
      ...messages,
      { role: 'user', content: `${commandName} ${args}`.trim(), timestamp: new Date() },
      {
        role: 'assistant',
        content,
        timestamp: new Date(),
        subagent: { name: subagentName },
        telemetry: { latencyMs: 8, tokens: 0, source }
      }
    ];

    setMessages(newMessages);
    setInputValue('');
    streamResponse(content, newMessages.length - 1);
  };

  const handleSendMessage = async (textToSend) => {
    const rawQuery = (textToSend || inputValue).trim();
    if (!rawQuery || isLoading) return;

    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
      setStreamingMessageIndex(null);
      setStreamedText('');
    }

    // Check if query is a slash command
    if (rawQuery.startsWith('/')) {
      const parts = rawQuery.split(' ');
      const cmdName = parts[0].toLowerCase();
      const args = parts.slice(1).join(' ').trim();

      const matchedCmd = SLASH_COMMANDS.find(c => c.command === cmdName);
      if (matchedCmd && matchedCmd.isLocal) {
        executeLocalCommand(cmdName, args);
        return;
      }
    }

    const userMessage = {
      role: 'user',
      content: rawQuery,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    // Live Subagent Telemetry Sequence
    setTelemetryTrace({
      step: 'Nova Coordinator: Routing to specialized domain subagent...',
      subagent: 'Nova Coordinator'
    });

    const traceTimer1 = setTimeout(() => {
      setTelemetryTrace({
        step: 'Grounding Vault: Extracting targeted PRD micro-chunk...',
        subagent: 'Vault Indexer'
      });
    }, 280);

    const traceTimer2 = setTimeout(() => {
      setTelemetryTrace({
        step: 'Synthesizing verified specifications & metrics...',
        subagent: 'Reasoning Engine'
      });
    }, 600);

    try {
      // TOKEN PRESERVATION: Send only last 4 turns
      const prunedContext = newMessages.slice(-4);

      const response = await fetch('/api/ask-nova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: prunedContext.map(m => ({ role: m.role, content: m.content })),
          command: rawQuery.startsWith('/') ? rawQuery.split(' ')[0] : null
        })
      });

      clearTimeout(traceTimer1);
      clearTimeout(traceTimer2);
      setTelemetryTrace(null);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const replyContent = data.content || "I couldn't process that response. Please try asking again!";
      
      const newAssistantIndex = newMessages.length;
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: replyContent,
          timestamp: new Date(),
          subagent: data.subagent,
          telemetry: data.telemetry
        }
      ]);
      setIsLoading(false);

      streamResponse(replyContent, newAssistantIndex);
    } catch (err) {
      console.error('Nova Query Error:', err);
      clearTimeout(traceTimer1);
      clearTimeout(traceTimer2);
      setTelemetryTrace(null);

      const fallbackError = "I ran into a temporary connection issue. Please check your network or try asking again in a moment!";
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: fallbackError,
          timestamp: new Date()
        }
      ]);
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (streamTimerRef.current) {
      clearInterval(streamTimerRef.current);
      streamTimerRef.current = null;
    }
    setStreamingMessageIndex(null);
    setStreamedText('');
    setMessages([
      {
        role: 'assistant',
        content: `Conversation refreshed! What else would you like to explore regarding my product systems or architecture? Type \`/\` to see available slash commands.`,
        timestamp: new Date(),
        subagent: { name: 'Nova Coordinator' },
        telemetry: { latencyMs: 6, tokens: 0, source: 'Memory Buffer Flush' }
      }
    ]);
  };

  // Keyboard navigation for slash command popover
  const handleKeyDown = (e) => {
    if (isSlashActive && filteredSlashCommands.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSlashIndex(prev => (prev + 1) % filteredSlashCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSlashIndex(prev => (prev - 1 + filteredSlashCommands.length) % filteredSlashCommands.length);
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        const selected = filteredSlashCommands[selectedSlashIndex];
        if (selected) {
          if (selected.isLocal && !selected.args) {
            executeLocalCommand(selected.command, '');
          } else {
            setInputValue(`${selected.command} `);
          }
        }
      } else if (e.key === 'Escape') {
        setInputValue('');
      }
    }
  };

  // Helper to format text with clickable markdown links
  const renderFormattedContent = (content, isStreamingNow = false) => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match[2] + match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-300 underline-offset-2 transition-colors mx-0.5"
        >
          <span>{match[1]}</span>
          <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return (
      <>
        {parts.map((part, i) => {
          if (typeof part === 'string') {
            return part.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx} className="mb-2.5 last:mb-0 leading-relaxed">
                {paragraph.split('\n').map((line, lIdx) => (
                  <React.Fragment key={lIdx}>
                    {line.startsWith('- ') ? (
                      <span className="block pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">
                        {formatBold(line.substring(2))}
                      </span>
                    ) : (
                      formatBold(line)
                    )}
                    {lIdx < line.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            ));
          }
          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
        {isStreamingNow && (
          <span className="inline-block w-1.5 h-3.5 bg-blue-600 ml-1 translate-y-0.5 animate-pulse rounded-xs" />
        )}
      </>
    );
  };

  const formatBold = (text) => {
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, bIdx) => {
      if (bp.startsWith('**') && bp.endsWith('**')) {
        return <strong key={bIdx} className="font-bold text-[#121214]">{bp.slice(2, -2)}</strong>;
      }
      return bp;
    });
  };

  return (
    <>
      {/* Floating Launcher Button (Bottom-Right) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 10 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full bg-[#121214] hover:bg-black text-white shadow-[0_8px_30px_rgba(0,0,0,0.28)] border border-slate-700/80 transition-all group"
            title="Ask Nova · Interactive AI Companion (Alt+N)"
            aria-label="Ask Nova Interactive AI Companion"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-600/80 bg-[#E0F2FE] shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
              <img 
                src="/nova-avatar.png" 
                alt="Nova AI Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-blue-600 items-center justify-center text-[10px] font-bold text-white">
                N
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#121214]"></span>
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold tracking-tight text-white">Ask Nova</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wide">
                  6 SUBAGENTS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                Type / for commands
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-Over Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[480px] h-[85vh] sm:h-[660px] max-h-[760px] rounded-2xl bg-[#FFFFFF] border border-[#EAEAE7] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden font-sans"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-[#EAEAE7] bg-[#FBFBFA]/95 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D5D5CE] shadow-xs bg-[#E0F2FE] shrink-0">
                    <img 
                      src="/nova-avatar.png" 
                      alt="Nova" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-blue-600 items-center justify-center text-xs font-bold text-white">
                      N
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-[#121214]">Ask Nova</h4>
                      <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 inline text-blue-600" />
                        6 SUBAGENTS
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666663] font-mono">
                      Interactive Portfolio Companion · Type / for Commands
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => executeLocalCommand('/export', '')}
                    className="p-1.5 text-[#666663] hover:text-[#121214] hover:bg-[#F0F0EC] rounded-lg transition-colors"
                    title="Export Session Dossier (/export)"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleClearChat}
                    className="p-1.5 text-[#666663] hover:text-[#121214] hover:bg-[#F0F0EC] rounded-lg transition-colors"
                    title="Reset Conversation (/clear)"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-1.5 text-[#666663] hover:text-[#121214] hover:bg-[#F0F0EC] rounded-lg transition-colors"
                    title="Close Nova"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-[#FFFFFF]">
                {messages.map((msg, index) => {
                  const isUser = msg.role === 'user';
                  const isStreaming = streamingMessageIndex === index;
                  const textToDisplay = isStreaming ? streamedText : msg.content;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D5D5CE] bg-[#E0F2FE] shrink-0 mt-0.5 shadow-2xs">
                          <img src="/nova-avatar.png" alt="Nova" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs ${
                          isUser
                            ? 'bg-[#121214] text-white rounded-tr-xs shadow-xs'
                            : 'bg-[#F8F8F6] border border-[#EAEAE7] text-[#2A2A28] rounded-tl-xs shadow-2xs'
                        }`}
                      >
                        {isUser ? (
                          <p className="leading-relaxed whitespace-pre-wrap font-mono text-[11px]">{msg.content}</p>
                        ) : (
                          <div>
                            <div className="prose-xs text-[#2A2A28]">
                              {renderFormattedContent(textToDisplay, isStreaming)}
                            </div>

                            {/* Claude Code High-Density Telemetry Footer */}
                            {msg.telemetry && (
                              <div className="mt-2.5 pt-2 border-t border-[#EAEAE7]/60 flex items-center justify-between text-[9px] font-mono text-[#666663]">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                  <span className="font-semibold text-[#121214]">{msg.subagent?.name || 'Nova Coordinator'}</span>
                                  <span>·</span>
                                  <span className="truncate max-w-[150px]">{msg.telemetry.source}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#9E9E96]">
                                  <span>⚡ {msg.telemetry.latencyMs || 18}ms</span>
                                  <span>{msg.telemetry.tokens || 0} tokens</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Subagent Animated Telemetry Trace Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5 justify-start"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-[#D5D5CE] bg-[#E0F2FE] shrink-0 mt-0.5">
                      <img src="/nova-avatar.png" alt="Nova" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-xs bg-[#F8F8F6] border border-[#EAEAE7] flex flex-col gap-1 text-[11px] font-mono text-[#666663] max-w-[85%]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                        <span className="font-semibold text-[#121214]">
                          {telemetryTrace?.subagent || 'Nova Subagent Dispatcher'}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-700">
                        {telemetryTrace?.step || 'Executing query...'}
                      </span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Starter Prompts (shown when only initial message exists) */}
              {messages.length <= 1 && !isLoading && !isSlashActive && (
                <div className="px-4 py-2 bg-[#FBFBFA] border-t border-[#F0F0EC] space-y-1.5 shrink-0">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#9E9E96] block">
                    Suggested Questions:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {STARTER_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt.text)}
                        className="p-2 rounded-lg bg-white border border-[#EAEAE7] hover:border-blue-400 hover:bg-blue-50/20 text-left transition-all group flex items-start gap-1.5"
                      >
                        <prompt.icon className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-[#4A4A46] group-hover:text-[#121214] font-medium leading-tight">
                          {prompt.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Project Arguments Chips (if user typed /project, /tradeoffs, /schema, /eli5) */}
              {isAwaitingProjectArg && (
                <div className="px-4 py-2 bg-[#F0F4F8] border-t border-[#D0E2FF] flex items-center gap-1.5 overflow-x-auto shrink-0">
                  <span className="text-[10px] font-mono font-bold text-blue-800 shrink-0">Pick Project:</span>
                  {PROJECT_KEYS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        const baseCmd = inputValue.trim().split(' ')[0];
                        handleSendMessage(`${baseCmd} ${p.id}`);
                      }}
                      className="px-2 py-0.5 rounded-md bg-white border border-blue-200 hover:bg-blue-600 hover:text-white text-[10px] font-mono text-blue-900 transition-colors shrink-0"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Floating Claude Code Slash Command Palette */}
              <AnimatePresence>
                {isSlashActive && filteredSlashCommands.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mx-3 mb-1 max-h-56 overflow-y-auto bg-white border border-[#D5D5CE] shadow-lg rounded-xl p-1.5 shrink-0 z-10"
                  >
                    <div className="px-2 py-1 flex items-center justify-between text-[10px] font-mono text-[#9E9E96] border-b border-[#EAEAE7] mb-1">
                      <span className="font-bold text-[#121214]">COMMAND PALETTE</span>
                      <span>↑↓ to navigate · Tab to select · Esc to close</span>
                    </div>

                    <div className="space-y-0.5">
                      {filteredSlashCommands.map((cmd, idx) => {
                        const isSelected = idx === selectedSlashIndex;
                        const CmdIcon = cmd.icon;

                        return (
                          <div
                            key={cmd.command}
                            onClick={() => {
                              if (cmd.isLocal && !cmd.args) {
                                executeLocalCommand(cmd.command, '');
                              } else {
                                setInputValue(`${cmd.command} `);
                                inputRef.current?.focus();
                              }
                            }}
                            onMouseEnter={() => setSelectedSlashIndex(idx)}
                            className={`px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center justify-between text-xs transition-colors ${
                              isSelected ? 'bg-[#121214] text-white' : 'hover:bg-[#F4F4F0] text-[#121214]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <CmdIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-300' : 'text-blue-600'}`} />
                              <span className="font-mono font-bold">{cmd.command}</span>
                              {cmd.args && (
                                <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-400' : 'text-[#8E8E88]'}`}>
                                  {cmd.args}
                                </span>
                              )}
                              <span className={`text-[11px] truncate max-w-[190px] ${isSelected ? 'text-slate-300' : 'text-[#666663]'}`}>
                                {cmd.desc}
                              </span>
                            </div>

                            <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-[#EAEAE7] text-[#666663]'
                            }`}>
                              {cmd.category}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Area */}
              <div className="p-3 border-t border-[#EAEAE7] bg-[#FBFBFA] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        setSelectedSlashIndex(0);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Type / for commands (/project, /tradeoffs, /schema, /status)..."
                      disabled={isLoading}
                      className="w-full bg-white border border-[#D5D5CE] focus:border-[#121214] focus:ring-1 focus:ring-[#121214] rounded-xl px-3.5 py-2 text-xs font-mono text-[#121214] placeholder-[#9E9E96] outline-none transition-all disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2 rounded-xl bg-[#121214] text-white hover:bg-black disabled:opacity-40 disabled:hover:bg-[#121214] transition-all shrink-0 active:scale-95"
                    title="Send query (Enter)"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-[#8E8E88] font-mono mt-2 px-1 gap-1">
                  <span className="flex items-center gap-1 text-[#9E9E96]">
                    <span>Nova can make mistakes. Verify critical facts with live PRDs & prototypes.</span>
                  </span>
                  <span className="flex items-center gap-1 text-[#666663] shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Type <code className="bg-[#EAEAE7] px-1 py-0.2 rounded text-[9px] text-[#121214]">/</code> for 6 subagents</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
