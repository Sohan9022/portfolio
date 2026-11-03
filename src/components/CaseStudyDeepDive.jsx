import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  ArrowUpRight, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Zap, 
  Layers, 
  Sparkles, 
  GitCommit, 
  Clock, 
  Database,
  ArrowRight,
  ShieldCheck,
  BellOff,
  Code2,
  Check
} from 'lucide-react';

const SENTINEL_STEPS = [
  {
    step: '01',
    title: 'The Problem Observation',
    subtitle: 'Where the human workflow broke down',
    badge: 'Discovery',
    content: `In fast-moving engineering teams, critical architectural decisions are made verbally during 15-minute daily standups or buried in 40-message Slack threads. Weeks later, when a regression occurs, no one remembers why a decision was made, who approved it, or what constraints were accepted.`,
    artifactLabel: 'Observed Failure Mode',
    artifact: '“The Said-vs-Confirmed Gap”: An engineer verbally reports “migration is completed” in standup, but database telemetry still shows open pending migrations.',
    terminalData: {
      type: 'telemetry',
      title: 'DISCOVERY TELEMETRY AUDIT',
      status: 'GAP DETECTED',
      statusColor: 'text-rose-400 bg-rose-950/40 border-rose-800',
      line1: 'Spoken Standup: "Auth0 migration completed on staging"',
      line2: 'Observed Codebase: Git PR #104 pending review · Staging v1.4 endpoint',
      insight: 'Context fragmentation causes teams to unknowingly contradict previous decisions weeks later.'
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
    terminalData: {
      type: 'research',
      title: 'USER INTERVIEW SYNTHESIS',
      status: 'BOT FATIGUE OBSERVED',
      statusColor: 'text-amber-400 bg-amber-950/40 border-amber-800',
      line1: 'Interview Cohort: 14 Engineering Leads & Senior Developers',
      line2: 'Core Failure: Proactive AI channel messages trigger muting within 14 days',
      insight: 'Users reject chatty bots. They want an infallible, silent oracle that responds only when queried.'
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
    terminalData: {
      type: 'rule',
      title: 'CORE INVARIANT SPECIFICATION',
      status: 'RULE ENFORCED',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800',
      line1: 'Invariant 01: Ingestion is 100% passive (standup transcripts & commits)',
      line2: 'Invariant 02: Outbound messaging permitted ONLY upon explicit slash command',
      insight: 'Earning engineering trust requires respecting deep focus. Silence is a feature, not a limitation.'
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
    terminalData: {
      type: 'scope',
      title: 'V1 BOUNDED SCOPE GATE',
      status: 'NON-GOALS SCOPED',
      statusColor: 'text-blue-400 bg-blue-950/40 border-blue-800',
      line1: 'SCOPED OUT: Automated Jira auto-assignment (avoids false task spam)',
      line2: 'SCOPED OUT: Autonomous git revert bot (protects developer authority)',
      insight: 'Narrowing scope to immutable decision logging maximized learning per engineering unit.'
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
    terminalData: {
      type: 'schema',
      title: 'POSTGRESQL APPEND-ONLY SCHEMA',
      status: '3NF DDL READY',
      statusColor: 'text-purple-400 bg-purple-950/40 border-purple-800',
      line1: 'TABLE decisions (id UUID, speaker TEXT, stated_intent TEXT, tool_sha TEXT)',
      line2: 'TRIGGER on_audit: Compares stated_intent against git_commits table on query',
      insight: 'Deterministic event sourcing prevents AI hallucinations when verifying historical project commitments.'
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
    terminalData: {
      type: 'mvp',
      title: 'LOVABLE WORKING PROTOTYPE',
      status: 'LIVE ON PRODUCTION',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800',
      line1: 'URL: echo-sentinel-08.lovable.app (8-step interactive simulator)',
      line2: 'Features: Live event timeline, filterable drift views, transcript auditing',
      insight: 'A clickable artifact answers user interaction and latency questions 10x faster than static slides.'
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
    terminalData: {
      type: 'ethics',
      title: 'PSYCHOLOGICAL SAFETY BOUNDARY',
      status: 'PRIVACY LOCKED',
      statusColor: 'text-emerald-400 bg-emerald-950/40 border-emerald-800',
      line1: 'Guardrail: Technical delivery drift ONLY (never engineer velocity tracking)',
      line2: 'Transparency: 100% public team audit log; zero covert background scraping',
      insight: 'Enterprise AI fails without psychological safety. Guardrails must be architectural, not verbal.'
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
    terminalData: {
      type: 'outcome',
      title: 'EXECUTIVE APM TAKEAWAY',
      status: 'HYPOTHESIS VALIDATED',
      statusColor: 'text-blue-400 bg-blue-950/40 border-blue-800',
      line1: 'Key Finding: Silent-by-default increased query voluntary usage by 4.2x',
      line2: 'Core Competency: Defining clear negative boundaries (what NOT to build)',
      insight: 'In high-velocity AI products, restraint and user respect create durable enterprise moats.'
    }
  }
];

const DRIFT_SCENARIOS = [
  {
    id: 'auth',
    spoken: '“Auth0 v2 migration completed on staging environment.”',
    speaker: 'Frontend Lead · 10:04 AM Standup',
    actualState: 'Git PR #104 pending review · Staging telemetry still shows v1.4 JWT endpoint',
    driftDetected: true,
    sentinelAction: 'Passively logged. Zero channel interruption. Surfaces only when team queries /sentinel check auth0.'
  },
  {
    id: 'webhook',
    spoken: '“Stripe webhook idempotency handler merged to main.”',
    speaker: 'Backend Eng · 10:07 AM Standup',
    actualState: 'Commit #8fa3b2 confirmed merged into main branch · 0 regressions',
    driftDetected: false,
    sentinelAction: 'State verified & reconciled. Immutable ledger updated with commit SHA.'
  },
  {
    id: 'postgres',
    spoken: '“PostgreSQL read replica spun up in ap-south-1.”',
    speaker: 'DevOps Eng · 10:11 AM Standup',
    actualState: 'AWS RDS replica provisioning timed out at 10:09 AM · Cluster in degraded state',
    driftDetected: true,
    sentinelAction: 'Passively logged. Zero noisy channel alerts. Surfaces instantly on query /sentinel infra-status.'
  }
];

export default function CaseStudyDeepDive() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeDriftScenario, setActiveDriftScenario] = useState(DRIFT_SCENARIOS[0]);
  const stepRefs = useRef([]);

  const currentStep = SENTINEL_STEPS[activeStepIndex];

  // Set up intersection observer for sticky scroll tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-step-index'));
          if (!isNaN(index)) {
            setActiveStepIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStep = (index) => {
    setActiveStepIndex(index);
    const targetEl = stepRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="case-study" className="py-24 border-b border-[#EAEAE7] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-[#EAEAE7]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
                02 · CASE STUDY DEEP DIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214]">
              The 8-step PM journey behind Project Sentinel.
            </h2>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="https://echo-sentinel-08.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#121214] text-white text-xs font-semibold hover:bg-black transition-colors shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Launch Live Prototype</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
            <a
              href="https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#F6F6F3] text-[#121214] border border-[#EAEAE7] text-xs font-medium hover:bg-[#EAEAE7] transition-colors"
            >
              <span>Notion PRD</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#666663]" />
            </a>
          </div>
        </div>

        {/* Sticky Scroll Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 relative">
          
          {/* Pinned Sticky Left Column (System Terminal & Quick Timeline) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            
            {/* Step Navigator Bar */}
            <div className="p-2.5 rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#666663] px-1">
                <span>Timeline Navigation</span>
                <span className="text-blue-700 font-semibold">
                  Step {currentStep.step} / 08
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-1.5">
                {SENTINEL_STEPS.map((s, idx) => {
                  const isActive = idx === activeStepIndex;
                  return (
                    <button
                      key={s.step}
                      onClick={() => scrollToStep(idx)}
                      className={`py-1.5 px-2 rounded-lg text-center transition-all text-xs font-mono flex items-center justify-center gap-1 ${
                        isActive
                          ? 'bg-[#121214] text-white font-bold shadow-xs'
                          : 'bg-white border border-[#EAEAE7] text-[#666663] hover:text-[#121214] hover:bg-slate-50'
                      }`}
                    >
                      <span>{s.step}</span>
                      <span className="hidden xl:inline text-[10px] opacity-75">{s.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Sticky Terminal Window */}
            <div className="rounded-2xl bg-[#111115] border border-zinc-800 p-5 text-zinc-200 font-mono text-xs space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-[11px]">
                <span className="flex items-center gap-2 text-zinc-300 font-semibold tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>{currentStep.terminalData.title}</span>
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${currentStep.terminalData.statusColor}`}>
                  {currentStep.terminalData.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800/80 space-y-1.5">
                  <div className="text-zinc-400 text-[10px] uppercase tracking-wider">Observed Signal:</div>
                  <div className="text-zinc-100 font-mono text-[11px] leading-relaxed">
                    {currentStep.terminalData.line1}
                  </div>
                </div>

                <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800/80 space-y-1.5">
                  <div className="text-zinc-400 text-[10px] uppercase tracking-wider">System State:</div>
                  <div className="text-zinc-300 font-mono text-[11px] leading-relaxed">
                    {currentStep.terminalData.line2}
                  </div>
                </div>
              </div>

              {/* Artifact Highlight */}
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/40 space-y-1 text-[11px]">
                <div className="text-blue-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-blue-400" />
                  <span>{currentStep.artifactLabel}</span>
                </div>
                <p className="text-zinc-200 font-sans italic text-xs leading-relaxed">
                  {currentStep.artifact}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 flex items-center justify-between">
                <span>Sync Mode: Scroll-Linked Telemetry</span>
                <span className="text-blue-400">P95 &lt;15ms</span>
              </div>
            </div>

          </div>

          {/* Scrolling Narrative Steps (Right Column) */}
          <div className="lg:col-span-7 space-y-8">
            {SENTINEL_STEPS.map((s, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={s.step}
                  ref={(el) => (stepRefs.current[idx] = el)}
                  data-step-index={idx}
                  className={`rounded-2xl border transition-all p-6 sm:p-8 ${
                    isActive 
                      ? 'bg-[#FBFBFA] border-blue-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] ring-1 ring-blue-400/40' 
                      : 'bg-white border-[#EAEAE7] hover:border-[#D5D5CE]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Step {s.step} of 08
                      </span>
                      <span className="text-xs font-mono text-[#666663]">·</span>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#666663] font-semibold">
                        {s.badge}
                      </span>
                    </div>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-full border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        In View
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-[#121214] tracking-tight mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm font-medium text-[#666663] mb-4">
                    {s.subtitle}
                  </p>

                  <p className="text-sm text-[#4A4A46] leading-relaxed mb-5">
                    {s.content}
                  </p>

                  <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] text-xs font-editorial italic text-[#121214] leading-relaxed">
                    <div className="text-[10px] uppercase font-mono not-italic font-bold text-blue-700 mb-1">
                      {s.artifactLabel}
                    </div>
                    {s.artifact}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Interactive Feature Simulator: "The Silent-by-Default State Engine" */}
        <div className="rounded-2xl bg-white border border-[#E2E2DC] p-6 sm:p-8 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F0F0EC]">
            <div className="flex items-center gap-2">
              <BellOff className="w-4 h-4 text-blue-700" />
              <h4 className="text-base font-bold text-[#121214] tracking-tight">
                Interactive PM Feature Simulator: "The Silent-by-Default State Engine"
              </h4>
            </div>
            <span className="text-xs font-mono text-[#666663]">
              Test how Sentinel resolves the Said-vs-Confirmed Gap
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {DRIFT_SCENARIOS.map((sc) => {
              const isSelected = activeDriftScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveDriftScenario(sc)}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-[#FBFBFA] border-[#121214] shadow-xs ring-1 ring-[#121214]'
                      : 'bg-white border-[#EAEAE7] hover:border-[#D5D5CE]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#9E9E96]">
                      {sc.speaker.split('·')[0]}
                    </span>
                    {sc.driftDetected ? (
                      <span className="font-mono text-[10px] text-rose-700 font-bold bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                        Drift Flagged
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        Reconciled
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-[#121214] line-clamp-2">
                    {sc.spoken}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Drift Inspection Terminal */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#111115] text-zinc-200 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>SENTINEL TELEMETRY AUDIT</span>
              </span>
              <span>EVENT_ID: #{activeDriftScenario.id.toUpperCase()}-2026</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  1. Spoken Audio Transcript:
                </span>
                <p className="text-zinc-100 bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  {activeDriftScenario.spoken}
                </p>
                <span className="text-[10px] text-zinc-400 block pt-0.5">
                  Logged: {activeDriftScenario.speaker}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  2. Verified Git / DB Tool State:
                </span>
                <p className="text-zinc-100 bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  {activeDriftScenario.actualState}
                </p>
                <span className={`text-[10px] block pt-0.5 font-bold ${activeDriftScenario.driftDetected ? 'text-rose-400' : 'text-emerald-400'}`}>
                  Audit Verdict: {activeDriftScenario.driftDetected ? 'DISCREPANCY DETECTED' : 'STATE MATCH CONFIRMED'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-zinc-300 font-semibold">Silent Guardrail:</span>
                <span>{activeDriftScenario.sentinelAction}</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
