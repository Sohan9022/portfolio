import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight, FileText, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

const PM_STAGES = [
  {
    id: 'problem',
    name: 'Problem',
    short: '01',
    mindset: 'Observe friction where people stop trying. Ask "What job is the user trying to hire this product to do?"',
    example: 'Identified that git hashes treat typo fixes and security breaches as identical alarms.'
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
    example: 'In FinMate, restricted LLMs strictly to intent parsing; delegated all math to deterministic SQL.'
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
    example: 'Benchmarked SHRH on 2,744 pairs: achieved 70% auto-triage with 0.0% false alarms on benign edits.'
  },
  {
    id: 'iterate',
    name: 'Iterate',
    short: '06',
    mindset: 'Refine the model based on observed edge cases and prepare cross-functional rollout.',
    example: 'Formulated 500-line Google APM PRD with Maya Lin persona, risk matrix, and phased GTM roadmap.'
  }
];

export default function HeroSection() {
  const [activeStage, setActiveStage] = useState(PM_STAGES[0]);

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#EAEAE7] bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Eyebrow & Status */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#666663] font-semibold bg-[#F1F1EE] border border-[#E5E5E0] px-2.5 py-1 rounded-md">
            Product Manager · Builder · Systems Thinker
          </span>
          <div className="inline-flex items-center gap-2 text-xs text-[#666663]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            <span>VIIT Pune · B.Tech IT (CGPA: 8.97)</span>
          </div>
        </div>

        {/* Big Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#121214] leading-[1.08] mb-6 max-w-4xl"
        >
          Building products around real human problems.
        </motion.h1>

        {/* Supporting Bio Statement */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-lg sm:text-xl text-[#4A4A46] leading-relaxed max-w-3xl mb-8 font-normal"
        >
          I'm Sohan — an engineering student who turns ambiguous problems into thoughtful, validated product experiences through customer discovery, constraint mapping, design, and technology.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="flex flex-wrap items-center gap-3 mb-14"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#121214] text-white hover:bg-black shadow-sm transition-all active:scale-95"
          >
            <span>Explore Selected Work</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="/Sohan_Gadewar_Resume.docx"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[#121214] bg-white border border-[#EAEAE7] hover:border-[#D5D5CE] shadow-sm transition-all active:scale-95"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Download Resume (.docx)</span>
          </a>

          <a
            href="#thinking"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-[#666663] hover:text-[#121214] hover:bg-[#F1F1EE] transition-colors"
          >
            <span>How I Think</span>
            <ArrowRight className="w-4 h-4 text-[#9E9E96]" />
          </a>
        </motion.div>

        {/* Currently Exploring Indicator */}
        <div className="py-3 px-4 rounded-lg bg-[#FFFFFF] border border-[#EAEAE7] mb-12 flex items-start sm:items-center gap-3 text-xs text-[#666663]">
          <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
            CURRENT FOCUS
          </span>
          <span className="text-[#4A4A46] font-medium">
            Exploring AI Governance & Prompt Safety × Contextual Personalization × Human-Centered Financial Inclusion
          </span>
        </div>

        {/* Hero Interactive PM Pipeline: Problem → Insight → Constraints → Prototype → Test → Iterate */}
        <div className="rounded-xl bg-[#FFFFFF] border border-[#EAEAE7] p-5 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[#F0F0EC]">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#121214] font-semibold">
                The Product Thinking Loop
              </span>
            </div>
            <span className="text-xs text-[#666663]">
              Hover or click a stage to inspect the PM mindset
            </span>
          </div>

          {/* Stepper Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-5">
            {PM_STAGES.map((stage) => {
              const isActive = activeStage.id === stage.id;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(stage)}
                  onMouseEnter={() => setActiveStage(stage)}
                  className={`relative text-left p-3 rounded-lg border transition-all ${
                    isActive
                      ? 'bg-[#FBFBFA] border-[#121214] shadow-sm'
                      : 'bg-white border-[#EAEAE7] hover:border-[#D5D5CE]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-[#9E9E96]">
                      {stage.short}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    )}
                  </div>
                  <div className={`text-xs font-semibold ${isActive ? 'text-[#121214]' : 'text-[#666663]'}`}>
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
              className="p-4 rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] text-xs space-y-2"
            >
              <div className="flex items-center gap-2 font-mono text-[11px] text-blue-700 font-semibold">
                <span>Stage {activeStage.short} Mindset:</span>
                <span className="text-[#121214] font-bold">{activeStage.name}</span>
              </div>
              <p className="text-sm text-[#121214] leading-relaxed font-medium">
                "{activeStage.mindset}"
              </p>
              <div className="pt-2 border-t border-[#EAEAE7] text-[#666663] text-[11px] flex items-start gap-1.5">
                <strong className="text-[#4A4A46] font-semibold shrink-0">In my work:</strong>
                <span>{activeStage.example}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
