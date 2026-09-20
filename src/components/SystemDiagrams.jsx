import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Sparkles, 
  Database, 
  Layers, 
  ArrowRight, 
  Lock, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  Cpu, 
  Radio, 
  GitPullRequest,
  Check,
  Activity
} from 'lucide-react';

export default function SystemDiagram({ projectId }) {
  const [activeStep, setActiveStep] = useState(null);

  switch (projectId) {
    case 'giftverse':
      return (
        <div className="rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-blue-600 animate-pulse" />
              SYSTEM LOGIC: REVEAL PACING & PAYLOAD ISOLATION
            </span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              <Lock className="w-3 h-3" /> Encrypted Vault
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 relative">
            <motion.div 
              whileHover={{ y: -2 }}
              className="p-2.5 rounded-lg bg-white border border-[#EAEAE7] transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#9E9E96]">01. PROMPT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>
              </div>
              <div className="text-[11px] font-semibold text-[#121214]">Sender Intent</div>
              <div className="text-[10px] text-[#666663] mt-0.5">Clues & Ambient Tone</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="p-2.5 rounded-lg bg-white border border-[#EAEAE7] transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#9E9E96]">02. PACING</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              </div>
              <div className="text-[11px] font-semibold text-[#121214]">30s Suspense</div>
              <div className="text-[10px] text-[#666663] mt-0.5">Dynamic Reveal Journey</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="p-2.5 rounded-lg bg-amber-50/40 border border-amber-300/80 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-amber-700 font-bold">03. CLIMAX</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              </div>
              <div className="text-[11px] font-semibold text-amber-900">Decryption Gate</div>
              <div className="text-[10px] text-amber-700 mt-0.5">Key Released on Solve</div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="p-2.5 rounded-lg bg-emerald-50/40 border border-emerald-300/80 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-emerald-700 font-bold">04. PAYOFF</span>
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <div className="text-[11px] font-semibold text-emerald-900">Gift Unboxed</div>
              <div className="text-[10px] text-emerald-700 mt-0.5">1-Click Instant Claim</div>
            </motion.div>
          </div>
        </div>
      );

    case 'spaces':
      return (
        <div className="rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-blue-600 animate-pulse" />
              SYSTEM LOGIC: CONTEXTUAL TELEMETRY FIREWALL
            </span>
            <span className="text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
              1 Account · 3 Vector Spaces
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <motion.div 
              whileHover={{ y: -2 }}
              className="p-3 rounded-lg bg-white border border-[#EAEAE7] hover:border-emerald-300 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-[#121214]">Engineering Space</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  Vector Store A
                </span>
              </div>
              <p className="text-[10px] text-[#666663] leading-relaxed">
                Telemetry: Code commits, system design papers, technical feeds
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="p-3 rounded-lg bg-white border border-[#EAEAE7] hover:border-indigo-300 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-[#121214]">Weekend / Gaming</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                  Vector Store B
                </span>
              </div>
              <p className="text-[10px] text-[#666663] leading-relaxed">
                Telemetry: Gaming streams, music, casual media (Zero bleed to A)
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="p-3 rounded-lg bg-white border border-[#EAEAE7] hover:border-amber-300 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-[#121214]">Finance & Tax</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                  Vector Store C
                </span>
              </div>
              <p className="text-[10px] text-[#666663] leading-relaxed">
                Telemetry: Audited ledgers, tax filings, sensitive records
              </p>
            </motion.div>
          </div>

          <div className="mt-3 text-[10px] text-center text-[#666663] pt-2 border-t border-[#EAEAE7] flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Context Firewall intercepts and partitions telemetry tokens before recommendation models update.</span>
          </div>
        </div>
      );

    case 'finmate':
      return (
        <div className="rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span className="flex items-center gap-1.5">
              <Database className="w-3 h-3 text-emerald-600 animate-pulse" />
              SYSTEM ARCHITECTURE: DUAL-PIPELINE CONSTRAINTS
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              Zero Math Hallucinations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <motion.div 
              whileHover={{ y: -2 }}
              className="p-3 rounded-lg bg-white border border-[#EAEAE7]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-blue-700 font-bold uppercase">01. UNSTRUCTURED</span>
                <Radio className="w-3 h-3 text-blue-500 animate-pulse" />
              </div>
              <div className="text-[11px] font-semibold text-[#121214]">Voice & OCR Input</div>
              <p className="text-[10px] text-[#666663] mt-1 font-sans italic">"Lent $40 to Sarah for dinner"</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="p-3 rounded-lg bg-white border border-[#EAEAE7]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-purple-700 font-bold uppercase">02. LLM PARSER</span>
                <Cpu className="w-3 h-3 text-purple-500" />
              </div>
              <div className="text-[11px] font-semibold text-[#121214]">Entity Extraction (JSON)</div>
              <p className="text-[10px] text-[#666663] mt-1">amount: 40, to: 'Sarah', type: 'loan'</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="p-3 rounded-lg bg-emerald-50/40 border border-emerald-300/80"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-emerald-700 font-bold uppercase">03. DETERMINISTIC SQL</span>
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <div className="text-[11px] font-semibold text-emerald-900">PostgreSQL RPC Ledger</div>
              <p className="text-[10px] text-emerald-700 mt-1 font-semibold">100% Citation-backed total</p>
            </motion.div>
          </div>
        </div>
      );

    case 'sentinel':
      return (
        <div className="rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span className="flex items-center gap-1.5">
              <EyeOff className="w-3 h-3 text-slate-600" />
              INTERACTION ARCHITECTURE: SILENT BY DEFAULT
            </span>
            <span className="text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Query-Driven Only
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <motion.div 
              whileHover={{ y: -2 }}
              className="p-3 rounded-lg bg-white border border-[#EAEAE7]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#9E9E96] font-bold">01. PASSIVE STREAM</span>
                <span className="flex items-center gap-0.5">
                  <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse delay-75"></span>
                  <span className="w-1 h-1.5 bg-emerald-400 rounded-full animate-pulse delay-150"></span>
                </span>
              </div>
              <div className="text-[11px] font-semibold text-[#121214]">Standups & Commits</div>
              <p className="text-[10px] text-[#666663] mt-1">Listens without sending unprompted Slack messages</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="p-3 rounded-lg bg-white border border-[#EAEAE7]"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#9E9E96] font-bold">02. MEMORY LOG</span>
                <Lock className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[11px] font-semibold text-[#121214]">Immutable Store</div>
              <p className="text-[10px] text-[#666663] mt-1">Records stated commitments, timelines, and rationale</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -2 }}
              className="p-3 rounded-lg bg-blue-50/40 border border-blue-300/80"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-blue-700 font-bold">03. ON-DEMAND CHECK</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              </div>
              <div className="text-[11px] font-semibold text-blue-900">"Said vs Confirmed"</div>
              <p className="text-[10px] text-blue-700 mt-1 font-medium">Surfaces drift only when a human explicitly asks</p>
            </motion.div>
          </div>
        </div>
      );

    case 'shrh':
      return (
        <div className="rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span className="flex items-center gap-1.5">
              <GitPullRequest className="w-3 h-3 text-blue-600 animate-pulse" />
              GOVERNANCE ENGINE: 4-QUADRANT TRIAGE GATE
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
              92.6% Defect Escape Reduction
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 transition-all cursor-default"
            >
              <div className="text-[10px] font-bold text-emerald-800 flex items-center justify-between">
                <span>QUADRANT A</span>
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <div className="text-[11px] font-semibold text-emerald-950 mt-0.5">Auto-Approve</div>
              <div className="text-[9px] text-emerald-700 mt-1">~70% safe PRs (zero human review latency)</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 transition-all cursor-default"
            >
              <div className="text-[10px] font-bold text-amber-800 flex items-center justify-between">
                <span>QUADRANT C</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              </div>
              <div className="text-[11px] font-semibold text-amber-950 mt-0.5">Triage Review</div>
              <div className="text-[9px] text-amber-700 mt-1">~25% topical drift (assign to prompt owner)</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200 transition-all cursor-default"
            >
              <div className="text-[10px] font-bold text-rose-800 flex items-center justify-between">
                <span>QUADRANT B</span>
                <AlertTriangle className="w-3 h-3 text-rose-600" />
              </div>
              <div className="text-[11px] font-semibold text-rose-950 mt-0.5">Quarantine</div>
              <div className="text-[9px] text-rose-700 mt-1">Constraint regressions (halt merge)</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200 transition-all cursor-default"
            >
              <div className="text-[10px] font-bold text-rose-800 flex items-center justify-between">
                <span>QUADRANT D</span>
                <AlertTriangle className="w-3 h-3 text-rose-600" />
              </div>
              <div className="text-[11px] font-semibold text-rose-950 mt-0.5">Quarantine</div>
              <div className="text-[9px] text-rose-700 mt-1">High drift + security regressions</div>
            </motion.div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
