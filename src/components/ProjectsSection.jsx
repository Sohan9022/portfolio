import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projectsData';
import SystemDiagram from './SystemDiagrams';
import { 
  ArrowUpRight, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Database, 
  Terminal, 
  Play, 
  LayoutGrid, 
  Rows, 
  Lock, 
  Globe, 
  FileCode2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const iconMap = {
  giftverse: Play,
  spaces: Layers,
  finmate: Database,
  sentinel: Terminal,
  shrh: ShieldCheck,
  'dynamic-forms': Sparkles,
  truststate: ShieldCheck,
};

const FILTERS = [
  { id: 'all', label: `All Projects (${PROJECTS.length})` },
  { id: 'governance', label: 'AI Security & Governance (TrustState, SHRH, Sentinel)' },
  { id: 'hci', label: 'Contextual HCI (Spaces, GiftVerse, Forms)' },
  { id: 'fintech', label: 'FinTech Systems (FinMate)' }
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('studio'); // 'studio' | 'sequential'
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);
  const [activeSpecTab, setActiveSpecTab] = useState('architecture'); // 'architecture' | 'tradeoffs' | 'scope'
  const [expandedIds, setExpandedIds] = useState({ 
    giftverse: true, 
    sentinel: true, 
    shrh: true, 
    finmate: true, 
    spaces: true, 
    'dynamic-forms': true, 
    truststate: true 
  });

  const toggleExpand = (id) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProjects = PROJECTS.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'governance') return project.id === 'truststate' || project.id === 'shrh' || project.id === 'sentinel';
    if (activeFilter === 'hci') return project.id === 'spaces' || project.id === 'giftverse' || project.id === 'dynamic-forms';
    if (activeFilter === 'fintech') return project.id === 'finmate';
    return true;
  });

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId) || filteredProjects[0] || PROJECTS[0];
  const SelectedIcon = iconMap[selectedProject.id] || Sparkles;

  return (
    <section id="work" className="py-24 border-b border-[#EAEAE7] bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#EAEAE7]">
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
          
          <div className="flex flex-col sm:items-end gap-3">
            <p className="text-sm text-[#666663] max-w-md">
              Each project represents an end-to-end PM cycle: problem discovery, behavioral insights, architectural trade-offs, and validated prototypes.
            </p>
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-white border border-[#E0E0DB] rounded-xl text-xs font-mono shadow-xs">
              <button
                onClick={() => setViewMode('studio')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'studio'
                    ? 'bg-[#121214] text-white shadow-xs font-semibold'
                    : 'text-[#666663] hover:text-[#121214] hover:bg-[#F6F6F3]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Studio Workbench</span>
              </button>
              <button
                onClick={() => setViewMode('sequential')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'sequential'
                    ? 'bg-[#121214] text-white shadow-xs font-semibold'
                    : 'text-[#666663] hover:text-[#121214] hover:bg-[#F6F6F3]'
                }`}
              >
                <Rows className="w-3.5 h-3.5" />
                <span>Sequential Dossier</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#F0F0EC]/80 border border-[#EAEAE7] max-w-fit mb-10">
          {FILTERS.map(f => {
            const isSelected = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  const matching = PROJECTS.filter(project => {
                    if (f.id === 'all') return true;
                    if (f.id === 'governance') return project.id === 'truststate' || project.id === 'shrh' || project.id === 'sentinel';
                    if (f.id === 'hci') return project.id === 'spaces' || project.id === 'giftverse' || project.id === 'dynamic-forms';
                    if (f.id === 'fintech') return project.id === 'finmate';
                    return true;
                  });
                  if (matching.length > 0 && !matching.some(m => m.id === selectedProjectId)) {
                    setSelectedProjectId(matching[0].id);
                  }
                }}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  isSelected ? 'text-[#121214]' : 'text-[#666663] hover:text-[#121214]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-white border border-[#D5D5CE] shadow-xs rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                {f.label}
              </button>
            );
          })}
        </div>

        {/* MODE 1: STUDIO WORKBENCH (SPLIT-SCREEN INTERACTIVE PM CANVAS) */}
        {viewMode === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 4 Cols: Project Selector Sidebar */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#9E9E96] font-semibold block px-1 mb-1">
                Select Product Specification ({filteredProjects.length})
              </span>

              {filteredProjects.map((p) => {
                const isSelected = selectedProject.id === p.id;
                const Icon = iconMap[p.id] || Sparkles;

                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectId(p.id);
                      setActiveSpecTab('architecture');
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-[#121214] shadow-sm ring-1 ring-[#121214]'
                        : 'bg-[#FFFFFF]/70 hover:bg-white border-[#EAEAE7] hover:border-[#D5D5CE]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#9E9E96] font-bold">
                          {p.number}
                        </span>
                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                          isSelected ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-[#F8F8F6] border-[#EAEAE7] text-[#666663]'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-[#121214]">
                          {p.title}
                        </span>
                      </div>

                      {p.hasLiveDemo ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Live App</span>
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          APM PRD
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#666663] line-clamp-2 leading-relaxed">
                      {p.subtitle} — {p.summary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right 8 Cols: Interactive Project Workbench Canvas */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-white border border-[#E2E2DC] shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden"
                >
                  
                  {/* Clean macOS / Browser Chrome Header */}
                  <div className="px-5 py-3.5 bg-[#FBFBFA] border-b border-[#EAEAE7] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0] border border-[#D5D5CE]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0] border border-[#D5D5CE]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0] border border-[#D5D5CE]" />
                      </div>
                      <span className="text-[#D0D0CB] text-xs">|</span>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-[#E5E5E0] font-mono text-[11px] text-[#666663]">
                        <Globe className="w-3 h-3 text-[#9E9E96]" />
                        <span>{selectedProject.liveUrl ? selectedProject.liveUrl.replace('https://', '') : 'notion.so/prd-spec'}</span>
                      </div>
                    </div>

                    {/* Launch CTAs */}
                    <div className="flex items-center gap-2">
                      {selectedProject.hasLiveDemo && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#121214] text-white text-xs font-semibold hover:bg-black transition-colors shadow-xs"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Launch Prototype</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300" />
                        </a>
                      )}

                      <a
                        href={selectedProject.notionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#EAEAE7] hover:border-[#D5D5CE] text-[#121214] text-xs font-medium hover:bg-[#F6F6F3] transition-colors"
                      >
                        <span>Notion PRD</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#666663]" />
                      </a>
                    </div>
                  </div>

                  {/* Main Project Details */}
                  <div className="p-6 sm:p-8 space-y-6">
                    
                    {/* Header Info */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="font-bold text-blue-700 uppercase tracking-wider">
                          SYSTEM {selectedProject.number}
                        </span>
                        <span className="text-[#9E9E96]">·</span>
                        <span className="text-[#666663]">{selectedProject.category}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#121214] tracking-tight">
                        {selectedProject.title}
                        <span className="text-slate-400 font-normal ml-2 text-xl hidden sm:inline">
                          — {selectedProject.subtitle}
                        </span>
                      </h3>
                    </div>

                    {/* Core PM Thesis Quote (Newsreader Editorial Serif) */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#FBFBFA] border-l-2 border-slate-900 border-[#EAEAE7] space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
                        Core PM Thesis
                      </span>
                      <p className="font-editorial italic text-base sm:text-lg text-[#121214] leading-relaxed">
                        "{selectedProject.thesis}"
                      </p>
                    </div>

                    {/* 2-Column Friction Observed vs Behavioral Insight */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* The Friction Observed */}
                      <div className="p-4 rounded-xl bg-rose-50/30 border border-rose-200/60 space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-rose-800 font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          The Friction Observed
                        </span>
                        <p className="text-xs text-[#4A4A46] leading-relaxed">
                          {selectedProject.problem}
                        </p>
                      </div>

                      {/* The Behavioral Insight */}
                      <div className="p-4 rounded-xl bg-blue-50/30 border border-blue-200/60 space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-blue-800 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          The Non-Obvious Insight
                        </span>
                        <p className="text-xs text-[#4A4A46] leading-relaxed">
                          {selectedProject.insight}
                        </p>
                      </div>

                    </div>

                    {/* Abstract System UI Diagram */}
                    <div className="pt-2">
                      <SystemDiagram projectId={selectedProject.id} />
                    </div>

                    {/* Interactive Tabbed PM Specification Drawer */}
                    <div className="pt-2 border-t border-[#F0F0EC]">
                      
                      {/* Drawer Tab Headers */}
                      <div className="flex items-center gap-2 mb-3 text-xs font-mono">
                        <button
                          onClick={() => setActiveSpecTab('architecture')}
                          className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                            activeSpecTab === 'architecture'
                              ? 'bg-[#121214] text-white font-semibold'
                              : 'text-[#666663] hover:text-[#121214] hover:bg-[#F4F4F0]'
                          }`}
                        >
                          System Constraints & Architecture
                        </button>
                        <button
                          onClick={() => setActiveSpecTab('tradeoffs')}
                          className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                            activeSpecTab === 'tradeoffs'
                              ? 'bg-[#121214] text-white font-semibold'
                              : 'text-[#666663] hover:text-[#121214] hover:bg-[#F4F4F0]'
                          }`}
                        >
                          Key Trade-off Accepted
                        </button>
                        <button
                          onClick={() => setActiveSpecTab('scope')}
                          className={`px-3 py-1 rounded-lg transition-colors font-medium ${
                            activeSpecTab === 'scope'
                              ? 'bg-[#121214] text-white font-semibold'
                              : 'text-[#666663] hover:text-[#121214] hover:bg-[#F4F4F0]'
                          }`}
                        >
                          PRD Scope & Artifacts
                        </button>
                      </div>

                      {/* Tab Content */}
                      <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] text-xs">
                        {activeSpecTab === 'architecture' && (
                          <div className="space-y-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#9E9E96] font-bold block">
                              Technical Constraints & Guardrails
                            </span>
                            <ul className="space-y-1.5 pl-1">
                              {selectedProject.architecture.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-[#4A4A46] leading-relaxed">
                                  <span className="text-blue-600 mt-0.5">▹</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {activeSpecTab === 'tradeoffs' && (
                          <div className="space-y-1.5">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-amber-800 font-bold block">
                              Defensible Compromise Made in V1
                            </span>
                            <p className="text-[#4A4A46] leading-relaxed">
                              {selectedProject.tradeoffs}
                            </p>
                          </div>
                        )}

                        {activeSpecTab === 'scope' && (
                          <div className="space-y-2">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-blue-800 font-bold block">
                              Execution Artifacts & Prototype Scope
                            </span>
                            <p className="text-[#4A4A46] leading-relaxed">
                              {selectedProject.specDetails}
                            </p>
                            <div className="pt-2 flex items-center gap-3 font-mono text-[11px]">
                              {selectedProject.hasLiveDemo && (
                                <a 
                                  href={selectedProject.liveUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-700 hover:underline flex items-center gap-1 font-semibold"
                                >
                                  Open Lovable Prototype <ArrowUpRight className="w-3 h-3" />
                                </a>
                              )}
                              <a 
                                href={selectedProject.notionUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#666663] hover:text-[#121214] flex items-center gap-1"
                              >
                                View Notion Document <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}

        {/* MODE 2: SEQUENTIAL DOSSIER (ALL 5 PROJECTS SCROLLABLE) */}
        {viewMode === 'sequential' && (
          <motion.div layout className="space-y-12">
            {filteredProjects.map((project) => {
              const isExpanded = !!expandedIds[project.id];
              const IconComponent = iconMap[project.id] || Sparkles;

              return (
                <motion.article
                  layout
                  key={project.id}
                  className="rounded-2xl bg-white border border-[#E2E2DC] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden"
                >
                  {/* Browser Chrome Header */}
                  <div className="px-5 py-3 bg-[#FBFBFA] border-b border-[#EAEAE7] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E5E5E0]" />
                      </div>
                      <span className="text-[#D0D0CB] text-xs">|</span>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white border border-[#E5E5E0] font-mono text-[11px] text-[#666663]">
                        <Globe className="w-3 h-3 text-[#9E9E96]" />
                        <span>{project.liveUrl ? project.liveUrl.replace('https://', '') : 'notion.so/prd-spec'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.hasLiveDemo ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Live Prototype</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200 text-xs font-mono">
                          Google APM Spec
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 sm:p-9 space-y-6">
                    {/* Title & Category */}
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

                      <span className="px-2.5 py-1 rounded bg-[#F6F6F3] text-[#4A4A46] border border-[#EAEAE7] font-mono text-[11px]">
                        {project.category}
                      </span>
                    </div>

                    {/* Thesis */}
                    <div className="p-4 rounded-xl bg-[#FBFBFA] border-l-2 border-slate-900 border-[#EAEAE7]">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">
                        Core PM Thesis
                      </span>
                      <p className="font-editorial italic text-base sm:text-lg text-[#121214] leading-relaxed">
                        "{project.thesis}"
                      </p>
                    </div>

                    {/* Problem vs Insight Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-rose-50/30 border border-rose-200/60 space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-rose-800 font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          The Friction Observed
                        </span>
                        <p className="text-xs text-[#4A4A46] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50/30 border border-blue-200/60 space-y-1.5">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-blue-800 font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          The Non-Obvious Insight
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
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#121214] hover:bg-black text-white font-medium shadow-xs transition-all active:scale-95"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                </motion.article>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}
