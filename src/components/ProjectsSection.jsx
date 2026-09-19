import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projectsData';
import SpotlightCard from './SpotlightCard';
import InteractiveShowcase from './InteractiveShowcase';
import { ExternalLink, ArrowUpRight, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

export default function ProjectsSection() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="py-20 border-b border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
            Selected Work
          </h2>
          <p className="text-sm text-zinc-400">
            6 product case studies spanning AI governance, developer tooling, fintech, and consumer systems.
          </p>
        </div>

        {/* Interactive Showcase Stage */}
        <InteractiveShowcase />

        {/* Detailed Case Studies List */}
        <div className="space-y-8">
          {PROJECTS.map((project, index) => {
            const isExpanded = expandedId === project.id;

            return (
              <SpotlightCard key={project.id}>
                <div className="p-6 sm:p-8">
                  
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-zinc-500">
                        0{index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <span className="text-zinc-500 text-xs">·</span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {project.subtitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                        {project.domain}
                      </span>
                      <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${
                        project.hasLiveDemo 
                          ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/50' 
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                      }`}>
                        {project.badge}
                      </span>
                    </div>
                  </div>

                  {/* Core Thesis Callout */}
                  <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 mb-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold mb-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Product Thesis & Core Insight:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                      {project.myIdeation}
                    </p>
                  </div>

                  {/* Problem & Solution 2-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-4">
                    <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300/90 font-semibold block mb-1">
                        The Problem
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                        Product Decision & Solution
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Insight Accent Callout */}
                  <div className="border-l-2 border-amber-500/80 bg-amber-500/5 px-4 py-2.5 rounded-r-lg text-xs text-zinc-300 leading-relaxed mb-4">
                    <span className="font-mono text-amber-400/90 text-[11px] font-semibold block mb-0.5">
                      Key Product Insight
                    </span>
                    {project.keyInsight}
                  </div>

                  {/* Smooth Expandable Architecture Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-2 border-t border-zinc-800/80 mt-5 space-y-4 text-xs text-zinc-300">
                          <div>
                            <span className="font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-semibold">
                              System Architecture & Constraints
                            </span>
                            <ul className="space-y-1.5 pl-1">
                              {project.architecture.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-zinc-500 mt-0.5">▹</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800">
                            <span className="font-mono text-zinc-400 font-semibold block mb-1">
                              Key Trade-off Made
                            </span>
                            <p className="text-zinc-300">{project.tradeoffs}</p>
                          </div>

                          <div className="text-zinc-400 font-mono text-[11px]">
                            <strong>Documentation:</strong> {project.specDetails}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Links Bar */}
                  <div className="pt-4 mt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-3">
                      {project.hasLiveDemo && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 font-semibold flex items-center gap-2 transition-colors shadow-sm"
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
                        className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <span>Notion PRD & Specs</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400" />
                      </a>
                    </div>

                    {/* Smooth Accordion Trigger */}
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="text-zinc-400 hover:text-zinc-200 font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Architecture' : 'View Architecture & Trade-offs'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </div>
              </SpotlightCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
