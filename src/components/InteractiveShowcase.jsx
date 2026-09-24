import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projectsData';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Database, 
  Sparkles, 
  Cpu, 
  Layers,
  Activity,
  AlertTriangle,
  RotateCcw,
  Check,
  Radio,
  Lock
} from 'lucide-react';

const iconMap = {
  sentinel: Terminal,
  finmate: Database,
  spaces: Layers,
  giftverse: Play,
  shrh: ShieldCheck,
};

export default function InteractiveShowcase() {
  const [selectedId, setSelectedId] = useState('sentinel');
  const project = PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];
  const Icon = iconMap[project.id] || Sparkles;

  // Simulator States
  // Sentinel State
  const [sentinelQueried, setSentinelQueried] = useState(false);

  // FinMate State
  const [finmateMode, setFinmateMode] = useState('dinner'); // 'dinner' | 'coffee'

  // Spaces State
  const [activeSpace, setActiveSpace] = useState('eng'); // 'eng' | 'gaming' | 'tax'

  // GiftVerse State
  const [giftStage, setGiftStage] = useState(1); // 1, 2, 3 (unboxed)

  // SHRH State
  const [shrhDiff, setShrhDiff] = useState('benign'); // 'benign' | 'regression'

  return (
    <section className="py-12 border-b border-[#EAEAE7] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Container Card */}
        <div className="rounded-2xl bg-[#FBFBFA] border border-[#EAEAE7] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EAEAE7]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                  Interactive PM Lab
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono text-[#666663]">Hands-On Product Simulation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#121214] tracking-tight">
                Test my product decisions in real time.
              </h3>
              <p className="text-xs sm:text-sm text-[#666663] mt-1 max-w-xl">
                Select any product to inspect the root user friction, interact with simulated telemetry, and see why each architectural trade-off was made.
              </p>
            </div>

            {/* Product Switcher Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#F0F0EC] border border-[#EAEAE7] max-w-fit">
              {PROJECTS.map((p) => {
                const isSelected = p.id === selectedId;
                const TabIcon = iconMap[p.id] || Sparkles;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedId(p.id);
                      setSentinelQueried(false);
                      setGiftStage(1);
                    }}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 ${
                      isSelected ? 'text-[#121214] font-semibold' : 'text-[#666663] hover:text-[#121214]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeShowcaseTab"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm border border-[#D5D5CE]"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <TabIcon className="w-3.5 h-3.5 relative z-10 shrink-0" />
                    <span className="relative z-10">{p.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Animated Showcase Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              
              {/* Product Identity & Quick Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F0F0EC]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#EAEAE7] shadow-sm flex items-center justify-center text-[#121214]">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#121214] tracking-tight flex items-center gap-2">
                      <span>{project.title}</span>
                      <span className="text-xs font-normal text-[#9E9E96]">·</span>
                      <span className="text-xs font-normal text-[#666663]">{project.subtitle}</span>
                    </h4>
                    <span className="text-[11px] font-mono text-[#9E9E96]">{project.category}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  {project.hasLiveDemo ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121214] text-white hover:bg-black font-medium shadow-sm transition-all active:scale-95"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Launch Live App</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  ) : (
                    <span className="px-3 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                      Google APM Spec
                    </span>
                  )}

                  <a
                    href={project.notionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EAEAE7] text-[#121214] hover:bg-[#F6F6F3] font-medium transition-colors"
                  >
                    <span>Notion PRD</span>
                    <ExternalLink className="w-3 h-3 text-[#666663]" />
                  </a>
                </div>
              </div>

              {/* 2-Column Bento: Left (Problem & Insight) / Right (Live Interactive Simulator) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Column: Problem & Behavioral Insight */}
                <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                  
                  {/* The Friction */}
                  <div className="p-4 rounded-xl bg-white border border-[#EAEAE7] space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-rose-700 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      The Friction Observed (Before)
                    </span>
                    <p className="text-xs text-[#4A4A46] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  {/* The Insight */}
                  <div className="p-4 rounded-xl bg-blue-50/30 border border-blue-200/80 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-blue-700 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      The Behavioral Breakthrough (After)
                    </span>
                    <p className="text-xs text-[#2A2A28] leading-relaxed font-medium">
                      {project.insight}
                    </p>
                  </div>

                  {/* Core Trade-off Accepted */}
                  <div className="p-3.5 rounded-xl bg-[#F6F6F3] border border-[#EAEAE7] text-xs font-mono text-[#666663]">
                    <strong className="text-[#121214] block mb-1">Key Trade-off Accepted:</strong>
                    <span>{project.tradeoffs}</span>
                  </div>

                </div>

                {/* Right Column: High-Fidelity Interactive Simulator Canvas */}
                <div className="lg:col-span-7 p-5 rounded-xl bg-white border border-[#EAEAE7] shadow-sm space-y-4">
                  
                  {/* SIMULATOR: PROJECT SENTINEL */}
                  {project.id === 'sentinel' && (
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0F0EC] text-xs font-mono">
                        <span className="text-[#666663]">Mock Channel: #team-standup</span>
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Silent Listener Active
                        </span>
                      </div>

                      {/* Mock Standup Event */}
                      <div className="p-3 rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <strong className="text-[#121214]">Lead Engineer (Alex)</strong>
                          <span className="font-mono text-[10px] text-[#9E9E96]">10:02 AM Standup</span>
                        </div>
                        <p className="text-[#4A4A46]">"Database migration v2 is complete. Merged to staging, zero blockers."</p>
                      </div>

                      {/* Actual Telemetry Ground Truth */}
                      <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/80 text-xs font-mono space-y-1">
                        <div className="text-amber-900 font-bold text-[11px] flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          <span>Actual Git & DB Telemetry State:</span>
                        </div>
                        <p className="text-amber-800 text-[11px]">
                          PostgreSQL PR #142: 2 schema migration locks still pending execution.
                        </p>
                      </div>

                      {/* Interactive Trigger Button */}
                      <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
                        <button
                          onClick={() => setSentinelQueried(true)}
                          className="px-3.5 py-2 rounded-lg bg-[#121214] hover:bg-black text-white text-xs font-mono font-semibold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Simulate Query: /sentinel audit auth-v2</span>
                        </button>

                        {sentinelQueried && (
                          <button
                            onClick={() => setSentinelQueried(false)}
                            className="text-xs text-[#666663] hover:text-[#121214] flex items-center gap-1 font-mono"
                          >
                            <RotateCcw className="w-3 h-3" /> Reset
                          </button>
                        )}
                      </div>

                      {/* Sentinel Response Card */}
                      {sentinelQueried ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="p-3.5 rounded-lg bg-blue-50/80 border border-blue-200 text-xs space-y-1.5 text-blue-950 font-mono"
                        >
                          <div className="flex items-center gap-1.5 text-blue-700 font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>DRIFT DETECTED BY SENTINEL AUDITOR:</span>
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            <strong>Said:</strong> "Auth migration v2 complete"<br />
                            <strong>Observed Telemetry:</strong> 2 schema locks pending in Git commit #8f21a<br />
                            <strong>Principle Enforced:</strong> Sentinel sent zero unprompted pings to Slack; conflict surfaced only when queried.
                          </p>
                        </motion.div>
                      ) : (
                        <p className="text-[11px] font-mono text-[#9E9E96] italic">
                          Click the button above to simulate how an engineer or PM interrogates Sentinel on-demand.
                        </p>
                      )}
                    </div>
                  )}

                  {/* SIMULATOR: FINMATE AI */}
                  {project.id === 'finmate' && (
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0F0EC] text-xs font-mono">
                        <span className="text-[#666663]">Multimodal Dual Pipeline</span>
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          100% Deterministic SQL
                        </span>
                      </div>

                      {/* Input Mode Selector */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <button
                          onClick={() => setFinmateMode('dinner')}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            finmateMode === 'dinner'
                              ? 'bg-blue-50/60 border-blue-300 text-blue-900 font-semibold'
                              : 'bg-white border-[#EAEAE7] text-[#666663] hover:bg-[#F8F8F6]'
                          }`}
                        >
                          🎙️ Voice Memo: Dinner Split
                        </button>
                        <button
                          onClick={() => setFinmateMode('coffee')}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            finmateMode === 'coffee'
                              ? 'bg-blue-50/60 border-blue-300 text-blue-900 font-semibold'
                              : 'bg-white border-[#EAEAE7] text-[#666663] hover:bg-[#F8F8F6]'
                          }`}
                        >
                          🧾 Receipt Snapshot: Coffee
                        </button>
                      </div>

                      {/* Processing Flow */}
                      <div className="p-3 rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] space-y-2 text-xs font-mono">
                        <div className="text-[10px] text-[#9E9E96] uppercase font-bold">1. Raw Input:</div>
                        <p className="text-xs text-[#121214] font-medium font-sans">
                          {finmateMode === 'dinner'
                            ? '"Paid $120 for team dinner at Olive Garden, Rahul owes $30"'
                            : '"Receipt #041: Blue Tokai Coffee $8.50 paid via Debit Card"'}
                        </p>
                        
                        <div className="pt-2 border-t border-[#EAEAE7]">
                          <span className="text-[10px] text-blue-700 font-bold uppercase block mb-1">
                            2. LLM Intent & Entity Extraction:
                          </span>
                          <pre className="text-[11px] text-blue-900 bg-white p-2 rounded border border-[#EAEAE7] overflow-x-auto">
                            {finmateMode === 'dinner'
                              ? JSON.stringify({ action: "split_bill", amount: 120, debtor: "Rahul", debt_amount: 30 }, null, 2)
                              : JSON.stringify({ action: "log_expense", amount: 8.5, category: "Coffee", payment: "Debit" }, null, 2)}
                          </pre>
                        </div>

                        <div className="pt-2 border-t border-[#EAEAE7]">
                          <span className="text-[10px] text-emerald-800 font-bold uppercase block mb-0.5">
                            3. PostgreSQL Stored Procedure (Zero LLM Hallucination):
                          </span>
                          <div className="text-[11px] text-emerald-900 font-semibold bg-emerald-50/60 p-2 rounded border border-emerald-200">
                            {finmateMode === 'dinner'
                              ? '✓ SELECT reconcile_debt("Rahul", 30.00); -> Net balance updated with citation [row_#9182]'
                              : '✓ INSERT INTO ledger (amount, cat) VALUES (8.50, "Coffee"); -> Total monthly coffee: $42.50'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SIMULATOR: SPACES */}
                  {project.id === 'spaces' && (
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0F0EC] text-xs font-mono">
                        <span className="text-[#666663]">Context Firewall Middleware</span>
                        <span className="text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          3 Isolated Vector Stores
                        </span>
                      </div>

                      {/* Space Switcher */}
                      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                        <button
                          onClick={() => setActiveSpace('eng')}
                          className={`p-2 rounded-lg border text-left transition-all ${
                            activeSpace === 'eng'
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold shadow-xs'
                              : 'bg-white text-[#666663] border-[#EAEAE7]'
                          }`}
                        >
                          💻 Engineering
                        </button>
                        <button
                          onClick={() => setActiveSpace('gaming')}
                          className={`p-2 rounded-lg border text-left transition-all ${
                            activeSpace === 'gaming'
                              ? 'bg-indigo-50 text-indigo-900 border-indigo-300 font-semibold shadow-xs'
                              : 'bg-white text-[#666663] border-[#EAEAE7]'
                          }`}
                        >
                          🎮 Gaming / Weekend
                        </button>
                        <button
                          onClick={() => setActiveSpace('tax')}
                          className={`p-2 rounded-lg border text-left transition-all ${
                            activeSpace === 'tax'
                              ? 'bg-amber-50 text-amber-900 border-amber-300 font-semibold shadow-xs'
                              : 'bg-white text-[#666663] border-[#EAEAE7]'
                          }`}
                        >
                          📊 Finance / Tax
                        </button>
                      </div>

                      {/* Simulated Feed */}
                      <div className="p-3.5 rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between text-[11px] pb-1 border-b border-[#EAEAE7]">
                          <span className="text-[#121214] font-semibold">Active Feed Telemetry</span>
                          <span className="text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-[#EAEAE7]">
                            Partition: {activeSpace.toUpperCase()}
                          </span>
                        </div>
                        <ul className="space-y-1.5 text-[#4A4A46] text-[11px]">
                          {activeSpace === 'eng' && (
                            <>
                              <li>▹ "Attention Is All You Need — Paper Breakdown"</li>
                              <li>▹ "PostgreSQL RPC Concurrency Benchmarks"</li>
                              <li>▹ "Distributed Vector Search Latency Architecture"</li>
                            </>
                          )}
                          {activeSpace === 'gaming' && (
                            <>
                              <li>▹ "Elden Ring DLC Boss Speedrun Analysis (4K)"</li>
                              <li>▹ "Lo-Fi Beats for Late Night Coding Sessions"</li>
                              <li>▹ "Mechanical Keyboard Switch Sound Test"</li>
                            </>
                          )}
                          {activeSpace === 'tax' && (
                            <>
                              <li>▹ "FY2026 Section 80C Deduction Worksheet"</li>
                              <li>▹ "HSA Contribution Limit Guidelines & Strategy"</li>
                              <li>▹ "Quarterly Invoicing Reconciliation Ledger"</li>
                            </>
                          )}
                        </ul>
                        <div className="pt-2 border-t border-[#EAEAE7] text-[10px] text-emerald-700 font-semibold flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Firewall Guarantee: Weekend gaming behavior never pollutes Monday engineering feed.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SIMULATOR: GIFTVERSE AI */}
                  {project.id === 'giftverse' && (
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0F0EC] text-xs font-mono">
                        <span className="text-[#666663]">30-Second Micro-Suspense Engine</span>
                        <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Zero-Friction Mobile Viewer
                        </span>
                      </div>

                      {/* Interactive Reveal Card */}
                      <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50/30 via-white to-purple-50/30 border border-[#EAEAE7] text-center space-y-3">
                        <div className="text-3xl animate-bounce">
                          {giftStage === 1 && '🎁'}
                          {giftStage === 2 && '🔍'}
                          {giftStage === 3 && '☕✨'}
                        </div>

                        <div>
                          <h5 className="text-sm font-bold text-[#121214]">
                            {giftStage === 1 && 'Mystery Gift Card from Sarah'}
                            {giftStage === 2 && 'Clue 2: Warming Up...'}
                            {giftStage === 3 && 'Unboxed: $25 Starbucks Gift Card!'}
                          </h5>
                          <p className="text-xs text-[#666663] italic font-mono mt-1">
                            {giftStage === 1 && '"Clue 1: Something warm for cold morning code sprints..."'}
                            {giftStage === 2 && '"Clue 2: It has green sirens and smells like roasted dark beans..."'}
                            {giftStage === 3 && 'Decrypted Claim Code: SBX-9482-DELIGHT'}
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-center gap-2">
                          {giftStage < 3 ? (
                            <button
                              onClick={() => setGiftStage(giftStage + 1)}
                              className="px-4 py-2 rounded-lg bg-[#121214] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm"
                            >
                              {giftStage === 1 ? 'Reveal Clue 2 →' : 'Solve & Unbox Code →'}
                            </button>
                          ) : (
                            <button
                              onClick={() => setGiftStage(1)}
                              className="px-3.5 py-1.5 rounded-lg bg-white border border-[#EAEAE7] text-xs font-mono font-medium hover:bg-[#F8F8F6] text-[#4A4A46] transition-colors"
                            >
                              ↺ Replay Reveal Journey
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SIMULATOR: SHRH */}
                  {project.id === 'shrh' && (
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center justify-between pb-2 border-b border-[#F0F0EC] text-xs font-mono">
                        <span className="text-[#666663]">2D CI/CD Risk Evaluation Gate</span>
                        <span className="text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          92.6% Defect Escape Reduction
                        </span>
                      </div>

                      {/* Diff Selector */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <button
                          onClick={() => setShrhDiff('benign')}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            shrhDiff === 'benign'
                              ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900 font-semibold'
                              : 'bg-white border-[#EAEAE7] text-[#666663] hover:bg-[#F8F8F6]'
                          }`}
                        >
                          <span className="text-emerald-700 font-bold block">Diff A: Benign Typo</span>
                          <span className="text-[10px] text-[#666663]">Fixed markdown spacing in prompt</span>
                        </button>
                        <button
                          onClick={() => setShrhDiff('regression')}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            shrhDiff === 'regression'
                              ? 'bg-rose-50/60 border-rose-300 text-rose-900 font-semibold'
                              : 'bg-white border-[#EAEAE7] text-[#666663] hover:bg-[#F8F8F6]'
                          }`}
                        >
                          <span className="text-rose-700 font-bold block">Diff B: Policy Downgrade</span>
                          <span className="text-[10px] text-[#666663]">Changed "MUST" to "MAY"</span>
                        </button>
                      </div>

                      {/* SHRH Gate Decision */}
                      <div className="p-3.5 rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] space-y-2 text-xs font-mono">
                        <div className="text-[10px] text-[#9E9E96] uppercase font-bold">
                          Autonomous CI/CD Gate Decision:
                        </div>
                        {shrhDiff === 'benign' ? (
                          <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                            <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Quadrant A: AUTO-APPROVED (0 Drift / No Constraint Shift)</span>
                            </div>
                            <p className="text-[11px] text-emerald-800 leading-relaxed font-sans">
                              Deontic constraint parser detected 0 rule shifts. PR auto-merged to production branch without engineer review (~70% of PR volume).
                            </p>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
                            <div className="font-bold flex items-center gap-1.5 text-rose-800">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                              <span>Quadrant B: QUARANTINED (Operational Constraint Downgrade)</span>
                            </div>
                            <p className="text-[11px] text-rose-800 leading-relaxed font-sans">
                              RFC-2119 modal verb downgraded from MUST to MAY. Automated merge halted. Flagged for mandatory review by Prompt Governance Board.
                            </p>
                          </div>
                        )}
                        <div className="text-[10px] text-[#666663] pt-1">
                          Note: Traditional SHA-256 would sound the exact same binary alarm for both diffs.
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
