import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowUpRight, ExternalLink, CheckCircle2, AlertCircle, ShieldAlert, Zap, Layers, Sparkles } from 'lucide-react';

const SENTINEL_STEPS = [
  {
    step: '01',
    title: 'The Problem Observation',
    subtitle: 'Where the human workflow broke down',
    badge: 'Discovery',
    content: `In fast-moving engineering teams, critical architectural decisions are made verbally during 15-minute daily standups or buried in 40-message Slack threads. Weeks later, when a regression occurs, no one remembers why a decision was made, who approved it, or what constraints were accepted.`,
    artifactLabel: 'Observed Failure Mode',
    artifact: '“The Said-vs-Confirmed Gap”: An engineer verbally reports “migration is completed” in standup, but database telemetry still shows open pending migrations.',
    visualType: 'conflict',
    visualData: {
      said: '"Auth migration completed in staging."',
      telemetry: 'PostgreSQL PR #142: 2 schema locks still pending.',
      consequence: 'Silent delivery drift goes undetected until prod deployment.'
    }
  },
  {
    step: '02',
    title: 'User Research & Pain Points',
    subtitle: 'Why existing AI bots fail engineers',
    badge: 'User Research',
    content: `I spoke with developers and engineering leads who had installed popular Slack summary bots. The unanimous feedback was negative: bots posted unsolicited paragraph summaries after every meeting, filling channels with noise, misattributing ownership, and prompting teams to mute or uninstall them within 2 weeks.`,
    artifactLabel: 'Direct User Insight',
    artifact: '“We don’t need another bot talking in our channel. We need an infallible memory we can interrogate when something doesn’t add up.”',
    visualType: 'quote',
    visualData: {
      speaker: 'Staff Infrastructure Engineer (User Interview)',
      quote: '“We muted our AI summary bot within 48 hours because it posted 3-paragraph essays after every standup. It created noise without truth.”',
      insightTag: 'Notification Fatigue = 100% Churn Driver'
    }
  },
  {
    step: '03',
    title: 'Key Behavioral Insight',
    subtitle: 'The "Silent by Default" thesis',
    badge: 'Product Thesis',
    content: `Proactive AI bot interruptions are themselves the UX failure. An effective team memory agent must adhere to the "Silent by Default" principle: passively ingest context without ever speaking unprompted, earning team trust by strictly remaining a query-driven oracle.`,
    artifactLabel: 'Product Rule #1',
    artifact: 'Zero unprompted messages. Sentinel never posts to a channel unless directly mentioned or queried via a dedicated slash command.',
    visualType: 'rule',
    visualData: {
      ruleName: 'RULE #1: SILENT BY DEFAULT',
      status: 'Enforced via Architecture Gate',
      prohibited: '❌ Zero unprompted channel pings',
      permitted: '✓ Answers only when explicitly queried (/sentinel audit)'
    }
  },
  {
    step: '04',
    title: 'Product Strategy & Scope',
    subtitle: 'What we explicitly chose NOT to build in V1',
    badge: 'Scope & Non-Goals',
    content: `To ship a focused MVP and de-risk the product, I defined explicit non-goals. We refused to build automated Jira ticket creators, autonomous code commit reversers, or predictive schedule estimators. V1 focused purely on immutable decision logging and state-drift detection.`,
    artifactLabel: 'Explicit Non-Goals (V1)',
    artifact: '❌ No automatic task assignment · ❌ No proactive status reports · ❌ No sentiment analysis on team members.',
    visualType: 'scope',
    visualData: {
      inScope: ['Append-Only Decision Log', 'Said-vs-Confirmed Drift Auditor', 'Scoped Sprint Channel Ingestion'],
      outScope: ['Auto-Generated Jira Tickets', 'Predictive Schedule AI', 'Team Sentiment Analysis']
    }
  },
  {
    step: '05',
    title: 'System & Interaction Architecture',
    subtitle: 'Passive ingestion vs. on-demand drift check',
    badge: 'System Design',
    content: `Designed an append-only PostgreSQL event schema capturing { timestamp, speaker, stated_intent, verified_tool_state, drift_flag }. When queried, Sentinel compares the latest spoken commitments against actual Git commit SHAs and Jira issue states to highlight discrepancies.`,
    artifactLabel: 'Schema Decision',
    artifact: 'Deterministic event log ensuring all detected drift is tied directly to timestamped transcript IDs.',
    visualType: 'schema',
    visualData: {
      tableName: 'sentinel_decision_ledger',
      columns: [
        { col: 'event_id', type: 'UUID PK' },
        { col: 'timestamp', type: 'TIMESTAMPTZ' },
        { col: 'speaker_id', type: 'VARCHAR(64)' },
        { col: 'stated_intent', type: 'TEXT' },
        { col: 'telemetry_sha', type: 'CHAR(40)' },
        { col: 'drift_status', type: 'BOOLEAN' }
      ]
    }
  },
  {
    step: '06',
    title: 'Functional Prototype on Lovable',
    subtitle: 'Clickable software to test latency & ergonomics',
    badge: 'Prototyping',
    content: `Instead of presenting static Figma screens, I directed Lovable to build an interactive 8-step working MVP (echo-sentinel-08.lovable.app). Users can trigger mock standups, watch Sentinel passively log commitments, and run drift queries to inspect conflicting states.`,
    artifactLabel: 'Working MVP Scope',
    artifact: '8-step interactive simulation featuring live event timelines, filterable drift views, and transcript audits.',
    visualType: 'prototype',
    visualData: {
      url: 'https://echo-sentinel-08.lovable.app',
      demoHighlights: ['Interactive Mock Standup Stream', 'On-Demand Drift Query Console', 'Audit Verification Timeline']
    }
  },
  {
    step: '07',
    title: 'Trade-offs & Guardrails',
    subtitle: 'Protecting team psychological safety',
    badge: 'Ethics & Safety',
    content: `A memory agent can easily feel like managerial surveillance. I instituted a privacy guardrail: Sentinel only audits technical delivery drift (said vs deployed), never individual engineer velocity or bathroom breaks. Transcripts are scoped exclusively to designated sprint channels.`,
    artifactLabel: 'Trust Guardrail',
    artifact: 'Public team visibility: Every team member can see exactly what context Sentinel has indexed; zero covert recording.',
    visualType: 'guardrail',
    visualData: {
      allowedAudit: 'Technical Delivery Drift (Said vs Deployed Code)',
      bannedAudit: 'Zero Developer Productivity Surveillance',
      privacyStandard: 'Public team visibility: All indexed memory visible to entire team'
    }
  },
  {
    step: '08',
    title: 'Outcome & APM Learnings',
    subtitle: 'Validating the passive paradigm',
    badge: 'Outcomes',
    content: `The prototype validated that engineering teams welcome AI when it respects attentional boundaries. This project solidified my conviction that the best AI PMs design for restraint: knowing when an AI system should remain completely silent is just as critical as knowing what it should say.`,
    artifactLabel: 'Core PM Takeaway',
    artifact: 'Restraint is a competitive moat. In high-stakes developer tools, respecting user attention builds lasting product adoption.',
    visualType: 'takeaway',
    visualData: {
      headline: 'Restraint is a Competitive Moat',
      metric: '100% Attentional Boundary Compliance',
      learning: 'Great AI PMs design for user attention, knowing when to stay completely silent.'
    }
  }
];

export default function CaseStudyDeepDive() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = SENTINEL_STEPS[activeStepIndex];

  return (
    <section id="case-study" className="py-24 border-b border-[#EAEAE7] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#EAEAE7]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                02 · CASE STUDY DEEP DIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214]">
              The 8-step PM journey behind Project Sentinel.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://echo-sentinel-08.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121214] text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              <span>Launch Live Prototype</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
            <a
              href="https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F6F6F3] text-[#121214] border border-[#EAEAE7] text-xs font-medium hover:bg-[#EAEAE7] transition-colors"
            >
              <span>Notion PRD</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#666663]" />
            </a>
          </div>
        </div>

        {/* Step Navigation Bar */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 p-1.5 rounded-xl bg-[#F6F6F3] border border-[#EAEAE7] mb-10">
          {SENTINEL_STEPS.map((s, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative p-2 sm:p-2.5 rounded-lg text-center transition-colors ${
                  isActive
                    ? 'text-[#121214] font-semibold'
                    : 'text-[#666663] hover:text-[#121214]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSentinelStep"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm border border-[#D5D5CE]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 font-mono text-[10px] block text-[#9E9E96]">
                  {s.step}
                </span>
                <span className="relative z-10 text-[11px] font-semibold hidden md:inline truncate">
                  {s.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl bg-[#FBFBFA] border border-[#EAEAE7] p-6 sm:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Narrative */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Step {currentStep.step} of 08
                  </span>
                  <span className="text-xs font-mono text-[#666663]">·</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#666663]">
                    {currentStep.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#121214] tracking-tight">
                  {currentStep.title}
                </h3>
                <p className="text-sm font-medium text-[#666663]">
                  {currentStep.subtitle}
                </p>

                <div className="pt-2 text-sm text-[#4A4A46] leading-relaxed">
                  {currentStep.content}
                </div>

                {/* Step Controls */}
                <div className="pt-4 flex items-center gap-3 text-xs">
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                    disabled={activeStepIndex === 0}
                    className="px-3 py-1.5 rounded bg-white border border-[#EAEAE7] text-[#4A4A46] disabled:opacity-40 hover:bg-[#F6F6F3] shadow-sm transition-all"
                  >
                    ← Previous Step
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStepIndex(Math.min(SENTINEL_STEPS.length - 1, activeStepIndex + 1))}
                    disabled={activeStepIndex === SENTINEL_STEPS.length - 1}
                    className="px-3 py-1.5 rounded bg-[#121214] text-white disabled:opacity-40 hover:bg-black font-medium shadow-sm transition-all"
                  >
                    Next Step →
                  </motion.button>
                </div>
              </div>

              {/* Right Column: Dynamic Visual PM Artifact Callout */}
              <div className="lg:col-span-5 p-5 sm:p-6 rounded-xl bg-white border border-[#EAEAE7] space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0F0EC]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-blue-700 font-bold">
                    {currentStep.artifactLabel}
                  </span>
                  <span className="text-[10px] font-mono text-[#9E9E96]">Step 0{currentStep.step}</span>
                </div>

                {/* Conflict Visualizer (Step 01) */}
                {currentStep.visualType === 'conflict' && (
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="text-[10px] text-emerald-800 font-bold block mb-0.5">Spoken Verbal Intent:</span>
                      <span className="text-emerald-950 font-sans">{currentStep.visualData.said}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                      <span className="text-[10px] text-rose-800 font-bold block mb-0.5">Ground Truth Telemetry:</span>
                      <span className="text-rose-950 font-sans">{currentStep.visualData.telemetry}</span>
                    </div>
                    <div className="p-2 rounded bg-[#F8F8F6] border border-[#EAEAE7] text-[11px] text-[#666663]">
                      ⚠️ {currentStep.visualData.consequence}
                    </div>
                  </div>
                )}

                {/* User Quote Visualizer (Step 02) */}
                {currentStep.visualType === 'quote' && (
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] relative">
                      <span className="text-2xl text-blue-600/30 font-serif absolute top-1 left-2">“</span>
                      <p className="text-xs text-[#121214] font-medium italic pl-4 leading-relaxed">
                        {currentStep.visualData.quote}
                      </p>
                      <span className="text-[10px] text-[#666663] font-mono block mt-2 pl-4">
                        — {currentStep.visualData.speaker}
                      </span>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-rose-50 border border-rose-200 text-rose-800 text-[10px] font-mono font-semibold">
                      {currentStep.visualData.insightTag}
                    </div>
                  </div>
                )}

                {/* Product Rule #1 Visualizer (Step 03) */}
                {currentStep.visualType === 'rule' && (
                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2 text-xs font-mono">
                    <div className="font-bold text-blue-900 text-xs">{currentStep.visualData.ruleName}</div>
                    <div className="text-[11px] text-rose-700 bg-white p-2 rounded border border-rose-200">
                      {currentStep.visualData.prohibited}
                    </div>
                    <div className="text-[11px] text-emerald-800 bg-white p-2 rounded border border-emerald-200 font-semibold">
                      {currentStep.visualData.permitted}
                    </div>
                  </div>
                )}

                {/* Scope & Non-Goals Visualizer (Step 04) */}
                {currentStep.visualType === 'scope' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                      <span className="text-[10px] text-emerald-800 font-bold block mb-1">IN V1 SCOPE:</span>
                      <ul className="space-y-1 text-[10px] text-emerald-950">
                        {currentStep.visualData.inScope.map((s, i) => (
                          <li key={i}>✓ {s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200">
                      <span className="text-[10px] text-rose-800 font-bold block mb-1">EXPLICIT NON-GOALS:</span>
                      <ul className="space-y-1 text-[10px] text-rose-950">
                        {currentStep.visualData.outScope.map((s, i) => (
                          <li key={i}>❌ {s}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Schema Visualizer (Step 05) */}
                {currentStep.visualType === 'schema' && (
                  <div className="p-3 rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] space-y-2 text-xs font-mono">
                    <div className="text-[10px] text-blue-700 font-bold uppercase">
                      TABLE: {currentStep.visualData.tableName}
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[10px] bg-white p-2 rounded border border-[#EAEAE7]">
                      {currentStep.visualData.columns.map((c, i) => (
                        <div key={i} className="flex justify-between py-0.5 border-b border-[#F0F0EC] last:border-none">
                          <span className="text-[#121214] font-semibold">{c.col}</span>
                          <span className="text-[#666663]">{c.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prototype Visualizer (Step 06) */}
                {currentStep.visualType === 'prototype' && (
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-blue-50/30 to-purple-50/30 border border-[#EAEAE7] space-y-2.5 text-xs">
                    <div className="text-[11px] font-bold text-[#121214] font-mono">Clickable 8-Step Interactive Prototype</div>
                    <ul className="space-y-1 text-[11px] text-[#4A4A46] font-mono">
                      {currentStep.visualData.demoHighlights.map((h, i) => (
                        <li key={i}>▹ {h}</li>
                      ))}
                    </ul>
                    <a
                      href={currentStep.visualData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121214] text-white text-xs font-semibold hover:bg-black transition-colors"
                    >
                      <span>Open Lovable Prototype</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  </div>
                )}

                {/* Guardrail Visualizer (Step 07) */}
                {currentStep.visualType === 'guardrail' && (
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
                      <span className="text-[10px] text-emerald-800 font-bold block">PERMITTED AUDIT BOUNDARY:</span>
                      <span className="text-[11px]">{currentStep.visualData.allowedAudit}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950">
                      <span className="text-[10px] text-rose-800 font-bold block">STRICTLY PROHIBITED:</span>
                      <span className="text-[11px]">{currentStep.visualData.bannedAudit}</span>
                    </div>
                  </div>
                )}

                {/* Takeaway Visualizer (Step 08) */}
                {currentStep.visualType === 'takeaway' && (
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/40 to-blue-50/40 border border-emerald-200/80 space-y-2 text-xs">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-800 font-bold block">
                      Executive Leadership Takeaway
                    </span>
                    <h5 className="text-sm font-bold text-[#121214]">
                      "{currentStep.visualData.headline}"
                    </h5>
                    <p className="text-xs text-[#4A4A46] leading-relaxed">
                      {currentStep.visualData.learning}
                    </p>
                  </div>
                )}

                {/* Source attribution */}
                <div className="text-[10px] text-[#9E9E96] font-mono pt-1">
                  Source: Project Sentinel PRD & Architectural Execution Log
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
