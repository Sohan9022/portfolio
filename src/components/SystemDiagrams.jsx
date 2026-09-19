import React from 'react';
import { Shield, Sparkles, Database, Layers, GitBranch, ArrowRight, Lock, CheckCircle2, AlertTriangle, Eye, EyeOff } from 'lucide-react';

export default function SystemDiagram({ projectId }) {
  switch (projectId) {
    case 'giftverse':
      return (
        <div className="rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span>SYSTEM LOGIC: REVEAL PACING & PAYLOAD ISOLATION</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3" /> Encrypted Vault
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded bg-white border border-[#EAEAE7]">
              <span className="text-[10px] text-[#9E9E96] block mb-1">01. PROMPT</span>
              <div className="text-[11px] font-semibold text-[#121214]">Sender Intent</div>
              <div className="text-[10px] text-[#666663] mt-0.5">Clues & Ambient Tone</div>
            </div>
            <div className="p-2.5 rounded bg-white border border-[#EAEAE7]">
              <span className="text-[10px] text-[#9E9E96] block mb-1">02. PACING</span>
              <div className="text-[11px] font-semibold text-[#121214]">30s Suspense</div>
              <div className="text-[10px] text-[#666663] mt-0.5">Dynamic Reveal Journey</div>
            </div>
            <div className="p-2.5 rounded bg-white border border-amber-300/80 bg-amber-50/40">
              <span className="text-[10px] text-amber-700 block mb-1">03. CLIMAX</span>
              <div className="text-[11px] font-semibold text-amber-900">Decryption Gate</div>
              <div className="text-[10px] text-amber-700 mt-0.5">Key Released on Solve</div>
            </div>
            <div className="p-2.5 rounded bg-white border border-emerald-300/80 bg-emerald-50/40">
              <span className="text-[10px] text-emerald-700 block mb-1">04. PAYOFF</span>
              <div className="text-[11px] font-semibold text-emerald-900">Gift Unboxed</div>
              <div className="text-[10px] text-emerald-700 mt-0.5">1-Click Instant Redeem</div>
            </div>
          </div>
        </div>
      );

    case 'spaces':
      return (
        <div className="rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span>SYSTEM LOGIC: CONTEXTUAL TELEMETRY FIREWALL</span>
            <span className="text-blue-700 font-semibold">1 Account · 3 Vector Spaces</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="p-2.5 rounded bg-white border border-[#EAEAE7]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-[#121214]">Engineering</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Space A</span>
              </div>
              <p className="text-[10px] text-[#666663]">Vector Store: Code, LLM papers, system design telemetry</p>
            </div>
            <div className="p-2.5 rounded bg-white border border-[#EAEAE7]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-[#121214]">Entertainment</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">Space B</span>
              </div>
              <p className="text-[10px] text-[#666663]">Vector Store: Gaming, music, cultural channels (Zero bleed to A)</p>
            </div>
            <div className="p-2.5 rounded bg-white border border-[#EAEAE7]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-[#121214]">Finance & Tax</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">Space C</span>
              </div>
              <p className="text-[10px] text-[#666663]">Vector Store: Audited ledgers, tax filings, sensitive records</p>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-center text-[#666663] pt-2 border-t border-[#EAEAE7]">
            ⚡ Context Firewall intercepts and tags telemetry tokens before recommendation stores update.
          </div>
        </div>
      );

    case 'finmate':
      return (
        <div className="rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span>SYSTEM ARCHITECTURE: DUAL-PIPELINE CONSTRAINTS</span>
            <span className="text-blue-700 font-semibold">Zero Math Hallucinations</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded bg-white border border-[#EAEAE7]">
              <span className="text-[10px] text-blue-700 font-bold block mb-1">UNSTRUCTURED CAPTURE</span>
              <div className="text-[11px] font-semibold text-[#121214]">Voice & OCR Input</div>
              <p className="text-[10px] text-[#666663] mt-0.5">"Lent $40 to Sarah for dinner"</p>
            </div>
            <div className="p-2.5 rounded bg-white border border-[#EAEAE7]">
              <span className="text-[10px] text-purple-700 font-bold block mb-1">LLM EXTRACTOR ONLY</span>
              <div className="text-[11px] font-semibold text-[#121214]">Entity Parser (JSON)</div>
              <p className="text-[10px] text-[#666663] mt-0.5">amount: 40, to: 'Sarah', type: 'loan'</p>
            </div>
            <div className="p-2.5 rounded bg-white border border-emerald-300/80 bg-emerald-50/40">
              <span className="text-[10px] text-emerald-700 font-bold block mb-1">DETERMINISTIC SQL</span>
              <div className="text-[11px] font-semibold text-emerald-900">PostgreSQL RPC Ledger</div>
              <p className="text-[10px] text-emerald-700 mt-0.5">100% Citation-backed balance</p>
            </div>
          </div>
        </div>
      );

    case 'sentinel':
      return (
        <div className="rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span>INTERACTION ARCHITECTURE: SILENT BY DEFAULT</span>
            <span className="text-slate-700 font-semibold flex items-center gap-1">
              <EyeOff className="w-3 h-3 text-slate-500" /> Query-Driven Only
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded bg-white border border-[#EAEAE7]">
              <span className="text-[10px] text-[#9E9E96] font-bold block mb-1">01. PASSIVE STREAM</span>
              <div className="text-[11px] font-semibold text-[#121214]">Standups & Jira</div>
              <p className="text-[10px] text-[#666663] mt-0.5">Listens without sending unprompted pings</p>
            </div>
            <div className="p-2.5 rounded bg-white border border-[#EAEAE7]">
              <span className="text-[10px] text-[#9E9E96] font-bold block mb-1">02. MEMORY LOG</span>
              <div className="text-[11px] font-semibold text-[#121214]">Immutable Store</div>
              <p className="text-[10px] text-[#666663] mt-0.5">Records stated commitments and timelines</p>
            </div>
            <div className="p-2.5 rounded bg-white border border-blue-300/80 bg-blue-50/40">
              <span className="text-[10px] text-blue-700 font-bold block mb-1">03. ON-DEMAND CHECK</span>
              <div className="text-[11px] font-semibold text-blue-900">"Said vs Confirmed"</div>
              <p className="text-[10px] text-blue-700 mt-0.5">Surfaces drift only when a human asks</p>
            </div>
          </div>
        </div>
      );

    case 'shrh':
      return (
        <div className="rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] p-4 text-xs font-mono">
          <div className="flex items-center justify-between text-[11px] text-[#666663] mb-3 pb-2 border-b border-[#EAEAE7]">
            <span>GOVERNANCE ENGINE: 4-QUADRANT TRIAGE GATE</span>
            <span className="text-emerald-700 font-semibold">92.6% Defect Escape Reduction</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2 rounded bg-emerald-50/60 border border-emerald-200">
              <div className="text-[10px] font-bold text-emerald-800">QUADRANT A</div>
              <div className="text-[11px] font-semibold text-emerald-950 mt-0.5">Auto-Approve</div>
              <div className="text-[9px] text-emerald-700 mt-1">~70% routine PRs (zero human wait)</div>
            </div>
            <div className="p-2 rounded bg-amber-50/60 border border-amber-200">
              <div className="text-[10px] font-bold text-amber-800">QUADRANT C</div>
              <div className="text-[11px] font-semibold text-amber-950 mt-0.5">Triage Review</div>
              <div className="text-[9px] text-amber-700 mt-1">~25% topical drift (re-route to reviewer)</div>
            </div>
            <div className="p-2 rounded bg-rose-50/60 border border-rose-200">
              <div className="text-[10px] font-bold text-rose-800">QUADRANT B</div>
              <div className="text-[11px] font-semibold text-rose-950 mt-0.5">Quarantine</div>
              <div className="text-[9px] text-rose-700 mt-1">Constraint regressions (halt merge)</div>
            </div>
            <div className="p-2 rounded bg-rose-50/60 border border-rose-200">
              <div className="text-[10px] font-bold text-rose-800">QUADRANT D</div>
              <div className="text-[11px] font-semibold text-rose-950 mt-0.5">Quarantine</div>
              <div className="text-[9px] text-rose-700 mt-1">High drift + security regressions</div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
