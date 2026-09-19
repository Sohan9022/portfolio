import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projectsData';
import { ArrowUpRight, ExternalLink, Play, CheckCircle2, ShieldCheck, Terminal, Database, Sparkles, Cpu, Layers } from 'lucide-react';

const iconMap = {
  shrh: ShieldCheck,
  sentinel: Terminal,
  finmate: Database,
  'dynamic-forms': Sparkles,
  spaces: Layers,
  giftverse: Play,
};

export default function InteractiveShowcase() {
  const [selectedId, setSelectedId] = useState('shrh');
  const project = PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];
  const Icon = iconMap[project.id] || Sparkles;

  return (
    <div className="mb-14 rounded-2xl bg-[#111115] border border-zinc-800 p-6 sm:p-8 shadow-xl overflow-hidden relative">
      
      {/* Top Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
            6 Products
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            The friction I found · The decisions I made
          </h3>
        </div>

        {/* Project Selector Pills with animated active pill indicator */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
          {PROJECTS.map((p) => {
            const isSelected = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isSelected ? 'text-zinc-950 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeShowcaseTab"
                    className="absolute inset-0 bg-zinc-100 rounded-lg shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="space-y-6"
        >
          
          {/* Header & Badges */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className="w-5 h-5 text-zinc-300" />
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {project.title}
                </h4>
                <span className="text-zinc-500 text-xs">·</span>
                <span className="text-xs text-zinc-400 font-medium">
                  {project.subtitle}
                </span>
              </div>
              <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                {project.domain}
              </span>
              <span className={`px-2.5 py-1 rounded border flex items-center gap-1.5 ${
                project.hasLiveDemo
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800'
              }`}>
                {project.hasLiveDemo && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                <span>{project.badge}</span>
              </span>
            </div>
          </div>

          {/* System Architecture */}
          <div className="p-5 rounded-xl bg-zinc-950/70 border border-zinc-800/80">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-3">
              How it works under the hood
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {project.architecture.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.08, duration: 0.2 }}
                  className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 flex items-start gap-2.5 hover:border-zinc-700 transition-colors"
                >
                  <div className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="text-xs text-zinc-300 leading-snug">
                    {step}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Product Insight & Trade-off */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <span className="font-mono text-zinc-400 font-semibold block mb-1">
                The insight
              </span>
              <p className="text-zinc-300 leading-relaxed">
                {project.keyInsight}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <span className="font-mono text-zinc-400 font-semibold block mb-1">
                What I chose not to build
              </span>
              <p className="text-zinc-300 leading-relaxed">
                {project.tradeoffs}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 text-xs">
            <div className="text-zinc-400 font-mono text-[11px]">
              {project.specDetails}
            </div>

            <div className="flex items-center gap-3">
              {project.hasLiveDemo && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Launch Live App</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-700" />
                </a>
              )}

              <a
                href={project.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>Open Notion PRD</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
