import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowDown, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Play, 
  Layers, 
  Database, 
  Terminal, 
  ShieldCheck, 
  ExternalLink,
  ArrowUpRight,
  Activity,
  Code2,
  Award
} from 'lucide-react';
import Logo from './Logo';

const PM_STAGES = [
  {
    id: 'problem',
    name: 'Problem',
    short: '01',
    mindset: 'Observe friction where people stop trying. Ask "What job is the user trying to hire this product to do?"',
    example: 'Identified that git hashes treat typo fixes and security breaches as identical alarms, inducing alert fatigue.'
  },
  {
    id: 'insight',
    name: 'Insight',
    short: '02',
    mindset: 'Find the non-obvious truth that previous solutions missed or ignored.',
    example: 'Semantic drift and operational constraints are orthogonal dimensions that cannot be blended into one score.'
  },
  {
    id: 'constraints',
    name: 'Constraints',
    short: '03',
    mindset: 'Establish mathematical boundaries, trade-offs, and what we explicitly choose NOT to build.',
    example: 'In FinMate, restricted LLMs strictly to intent parsing; delegated all arithmetic to deterministic PostgreSQL stored procedures.'
  },
  {
    id: 'prototype',
    name: 'Prototype',
    short: '04',
    mindset: 'Build clickable, functional software in days to test user assumptions with real friction.',
    example: 'Shipped working Lovable prototypes to test interaction latency and user trust with zero slide decks.'
  },
  {
    id: 'test',
    name: 'Test',
    short: '05',
    mindset: 'Evaluate with objective evidence against a defined North Star and guardrail counter-metrics.',
    example: 'Evaluated SHRH CI/CD gate: autonomous triage separating safe prompt edits from critical operational regressions.'
  },
  {
    id: 'iterate',
    name: 'Iterate',
    short: '06',
    mindset: 'Refine the model based on observed edge cases and prepare cross-functional rollout.',
    example: 'Formulated 500-line Google APM PRD with Maya Lin persona, risk matrix, and phased GTM roadmap.'
  }
];

const PROTOTYPE_PREVIEWS = [
  {
    id: 'sentinel',
    title: 'Project Sentinel',
    subtitle: 'Silent-by-Default Decision Agent',
    domain: 'Enterprise AI · Governance',
    url: 'https://echo-sentinel-08.lovable.app',
    icon: Terminal,
    status: 'Live on Lovable',
    metric: 'Zero Unprompted Interruptions'
  },
  {
    id: 'finmate',
    title: 'FinMate AI',
    subtitle: 'Multimodal Expense Memory',
    domain: 'FinTech · Deterministic SQL',
    url: 'https://tell-finmate-ai.lovable.app',
    icon: Database,
    status: 'Live on Lovable',
    metric: '100% Citation-Backed Math'
  },
  {
    id: 'spaces',
    title: 'Spaces',
    subtitle: 'Contextual Personalization Firewall',
    domain: 'Social Systems · Recommendation',
    url: 'https://space-context-switch.lovable.app',
    icon: Layers,
    status: 'Live on Lovable',
    metric: 'Isolated Vector Stores'
  },
  {
    id: 'giftverse',
    title: 'GiftVerse Moments',
    subtitle: 'Suspense Reveal Engine',
    domain: 'Consumer AI · Interactive UX',
    url: 'https://gift-verse-moments.lovable.app',
    icon: Play,
    status: 'Live on Lovable',
    metric: '30–60s Emotional Payoff'
  },
  {
    id: 'truststate',
    title: 'TrustState',
    subtitle: 'Zero-Trust Agent Runtime',
    domain: 'AI Security · Control Plane',
    url: 'https://trust-state-qnkc9zvwy-sun-6b0b.vercel.app',
    icon: ShieldCheck,
    status: 'Live on Vercel',
    metric: '<25ms P95 Enforcement SLA'
  }
];

export default function HeroSection() {
  const [activeStage, setActiveStage] = useState(PM_STAGES[0]);
  const [selectedPreview, setSelectedPreview] = useState(PROTOTYPE_PREVIEWS[0]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#EAEAE7] bg-[#FBFBFA] overflow-hidden">
      
      {/* Subtle ambient light accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-blue-50/50 via-slate-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Top 2-Column Hero Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
          
          {/* Left Column: Narrative, Positioning & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow & Status */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-[#121214] font-semibold bg-white border border-[#E0E0DB] px-3 py-1 rounded-full shadow-xs">
                <Logo size={18} />
                <span>Product Manager · Builder · Systems Thinker</span>
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for APM Roles 2026–2027</span>
              </div>
            </div>

            {/* Big Editorial Headline with Italic Serif Accent */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-6xl md:text-[68px] font-bold tracking-[-0.035em] text-[#121214] leading-[1.05]"
            >
              Building products around <span className="font-editorial italic font-normal text-slate-700">real human problems.</span>
            </motion.h1>

            {/* Supporting Bio Statement */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08 }}
              className="text-base sm:text-lg text-[#4A4A46] leading-relaxed max-w-xl font-normal"
            >
              I'm <strong className="text-[#121214] font-semibold">Sohan Gadewar</strong> — an engineering student at <strong className="text-[#121214]">VIIT Pune (CGPA: 8.97)</strong> who turns ambiguous friction into thoughtful, validated software experiences through customer discovery, constraint mapping, and rapid functional prototyping.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.14 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <motion.a
                href="#work"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#121214] text-white hover:bg-black shadow-sm transition-all"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                href="/Sohan_Gadewar_Resume.docx"
                download
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[#121214] bg-white border border-[#EAEAE7] hover:border-[#D5D5CE] shadow-sm transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Resume (.docx)</span>
              </motion.a>

              <motion.a
                href="#case-study"
                whileHover={{ x: 2 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#666663] hover:text-[#121214] hover:bg-white/80 transition-colors"
              >
                <span>Read Sentinel Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9E9E96]" />
              </motion.a>
            </motion.div>

            {/* Quick Candidate Signal Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#666663]">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                <span>400+ LeetCode · Java/Spring/SQL</span>
              </span>
              <span className="text-[#D0D0CB]">·</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>India Innovates Finalist (Top 16%)</span>
              </span>
            </div>

          </div>

          {/* Right Column: Interactive APM Signal Dashboard */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-2xl bg-white border border-[#E2E2DC] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5 relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F0EC]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-[#121214] uppercase tracking-wider">
                    APM Signal Dashboard
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#9E9E96] bg-[#F6F6F3] px-2 py-0.5 rounded border border-[#EAEAE7]">
                  V1 Clickable MVPs
                </span>
              </div>

              {/* 4 Clickable Prototype Previews */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-[#666663] uppercase tracking-wider flex items-center justify-between">
                  <span>Interactive Shipped Systems</span>
                  <span className="text-[10px] text-blue-700">Select to inspect</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {PROTOTYPE_PREVIEWS.map((proto) => {
                    const isSelected = selectedPreview.id === proto.id;
                    const Icon = proto.icon;
                    return (
                      <button
                        key={proto.id}
                        onClick={() => setSelectedPreview(proto)}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#FBFBFA] border-[#121214] shadow-xs'
                            : 'bg-white border-[#EAEAE7] hover:border-[#D5D5CE]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-700' : 'text-[#666663]'}`} />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="text-xs font-bold text-[#121214] truncate">
                          {proto.title}
                        </div>
                        <div className="text-[10px] text-[#666663] truncate">
                          {proto.domain}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Prototype Detail Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPreview.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="p-4 rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#121214]">
                      {selectedPreview.subtitle}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {selectedPreview.metric}
                    </span>
                  </div>

                  <p className="text-xs text-[#4A4A46] leading-relaxed">
                    Tested as a functional MVP on Lovable with live telemetry to validate user assumptions and friction before production engineering.
                  </p>

                  <div className="pt-2 border-t border-[#EAEAE7] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#666663]">
                      Status: <strong className="text-emerald-700">{selectedPreview.status}</strong>
                    </span>
                    <a
                      href={selectedPreview.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#121214] text-white text-xs font-semibold hover:bg-black transition-colors shadow-xs"
                    >
                      <span>Launch App</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 3 Metric Counts */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#F0F0EC] text-center font-mono">
                <div className="p-2 rounded-lg bg-[#FBFBFA] border border-[#EAEAE7]">
                  <div className="text-base font-bold text-[#121214]">5</div>
                  <div className="text-[10px] text-[#666663] uppercase">Systems</div>
                </div>
                <div className="p-2 rounded-lg bg-[#FBFBFA] border border-[#EAEAE7]">
                  <div className="text-base font-bold text-[#121214]">4</div>
                  <div className="text-[10px] text-[#666663] uppercase">Notion PRDs</div>
                </div>
                <div className="p-2 rounded-lg bg-[#FBFBFA] border border-[#EAEAE7]">
                  <div className="text-base font-bold text-[#121214]">8.97</div>
                  <div className="text-[10px] text-[#666663] uppercase">CGPA (IT)</div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>

        {/* Hero Interactive PM Pipeline: Problem → Insight → Constraints → Prototype → Test → Iterate */}
        <div className="rounded-2xl bg-white border border-[#E2E2DC] p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#F0F0EC]">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#121214] font-bold">
                The Product Thinking Loop
              </span>
            </div>
            <span className="text-xs text-[#666663] font-mono">
              Hover or click a stage to inspect the PM mindset
            </span>
          </div>

          {/* Stepper Pipeline with Spring Layout Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-5">
            {PM_STAGES.map((stage) => {
              const isActive = activeStage.id === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage)}
                  onMouseEnter={() => setActiveStage(stage)}
                  className={`relative text-left p-3 rounded-xl border transition-all ${
                    isActive
                      ? 'border-[#121214] shadow-xs'
                      : 'border-[#EAEAE7] hover:border-[#D5D5CE] bg-[#FBFBFA]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeStageHighlight"
                      className="absolute inset-0 bg-white rounded-xl -z-10 shadow-xs border border-[#121214]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-[#9E9E96]">
                      {stage.short}
                    </span>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                    )}
                  </div>
                  <div className={`text-xs font-bold ${isActive ? 'text-[#121214]' : 'text-[#666663]'}`}>
                    {stage.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Callout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="p-4 rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] text-xs space-y-2"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] text-blue-700 font-semibold">
                <span>Stage {activeStage.short} Mindset:</span>
                <span className="text-[#121214] font-bold">{activeStage.name}</span>
              </div>
              <p className="font-editorial italic text-base sm:text-lg text-[#121214] leading-relaxed font-normal">
                "{activeStage.mindset}"
              </p>
              <div className="pt-2 border-t border-[#EAEAE7] text-[#666663] text-[11px] flex items-start gap-1.5">
                <strong className="text-[#4A4A46] font-semibold shrink-0 font-mono">In my work:</strong>
                <span>{activeStage.example}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
