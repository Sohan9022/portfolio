import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projectsData';
import SystemDiagram from './SystemDiagrams';
import { ArrowUpRight, ExternalLink, ChevronDown, ChevronUp, Sparkles, Layers, ShieldCheck, Database, Terminal, Play } from 'lucide-react';

const iconMap = {
  giftverse: Play,
  spaces: Layers,
  finmate: Database,
  sentinel: Terminal,
  shrh: ShieldCheck,
};

export default function ProjectsSection() {
  const [expandedIds, setExpandedIds] = useState({ 'giftverse': true, 'sentinel': true });

  const toggleExpand = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="work" className="py-24 border-b border-[#EAEAE7] bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#EAEAE7]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                01 · SELECTED WORK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214]">
              Five systems built to solve real friction.
            </h2>
          </div>
          <p className="text-sm text-[#666663] max-w-md">
            Each project represents an end-to-end PM cycle: problem discovery, behavioral insights, architectural trade-offs, and validated prototypes.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="space-y-12">
          {PROJECTS.map((project) => {
            const isExpanded = !!expandedIds[project.id];
            const IconComponent = iconMap[project.id] || Sparkles;

            return (
              <article
                key={project.id}
                className="rounded-2xl bg-white border border-[#EAEAE7] hover:border-[#D5D5CE] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all overflow-hidden"
              >
                <div className="p-6 sm:p-9 space-y-6">
                  
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#F0F0EC]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#9E9E96] font-semibold">
                        {project.number}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-[#F6F6F3] border border-[#EAEAE7] flex items-center justify-center text-[#121214]">
                        <IconComponent className="w-3.5 h-3.5 text-[#4A4A46]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#121214] tracking-tight flex items-center gap-2">
                          <span>{project.title}</span>
                          <span className="text-[#9E9E96] text-xs font-normal">·</span>
                          <span className="text-xs text-[#666663] font-normal">{project.subtitle}</span>
                        </h3>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                      <span className="px-2.5 py-1 rounded bg-[#F6F6F3] text-[#4A4A46] border border-[#EAEAE7]">
                        {project.category}
                      </span>
                      {project.hasLiveDemo ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Live Prototype</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200">
                          Google APM Spec
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Core Thesis Statement */}
                  <div className="text-sm sm:text-base text-[#121214] font-medium leading-relaxed">
                    {project.thesis}
                  </div>

                  {/* Problem vs Insight (2-Column Editorial Grid) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* The Problem */}
                    <div className="p-4 rounded-xl bg-[#FBFBFA] border border-[#EAEAE7] space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        The Friction Observed
                      </span>
                      <p className="text-xs text-[#4A4A46] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* The Insight */}
                    <div className="p-4 rounded-xl bg-[#FBFBFA] border border-[#EAEAE7] space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        The Behavioral Insight
                      </span>
                      <p className="text-xs text-[#4A4A46] leading-relaxed">
                        {project.insight}
                      </p>
                    </div>
                  </div>

                  {/* Abstract System UI Diagram */}
                  <div className="pt-2">
                    <SystemDiagram projectId={project.id} />
                  </div>

                  {/* Expandable Architecture & Trade-offs Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden pt-2"
                      >
                        <div className="p-4 rounded-xl bg-[#F6F6F3] border border-[#EAEAE7] space-y-4 text-xs">
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#121214] font-semibold block mb-2">
                              System Architecture & Constraints
                            </span>
                            <ul className="space-y-1.5 pl-1">
                              {project.architecture.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-[#4A4A46]">
                                  <span className="text-blue-600 mt-0.5">▹</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-3 border-t border-[#EAEAE7]">
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#121214] font-semibold block mb-1">
                              Key Trade-off Accepted
                            </span>
                            <p className="text-[#4A4A46] leading-relaxed">
                              {project.tradeoffs}
                            </p>
                          </div>

                          <div className="text-[#666663] font-mono text-[11px]">
                            <strong>Artifacts:</strong> {project.specDetails}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Card Action Bar */}
                  <div className="pt-3 border-t border-[#F0F0EC] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-3">
                      {project.hasLiveDemo && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#121214] hover:bg-black text-white font-medium shadow-sm transition-all active:scale-95"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>Launch Live Prototype</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                        </a>
                      )}

                      <a
                        href={project.notionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#F6F6F3] text-[#121214] border border-[#EAEAE7] hover:border-[#D5D5CE] font-medium transition-all"
                      >
                        <span>Notion PRD & Specs</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#666663]" />
                      </a>
                    </div>

                    {/* Toggle Drawer */}
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="text-[#666663] hover:text-[#121214] font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Architecture' : 'View Architecture & Trade-offs'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
