import React, { useState } from 'react';
import { RESEARCH_SPOTLIGHT } from '../data/projectsData';
import { 
  Compass, 
  Users, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink,
  BookOpen,
  Cpu,
  Eye,
  Sparkles
} from 'lucide-react';

export default function ResearchSpotlight() {
  const data = RESEARCH_SPOTLIGHT;
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'patent' | 'figures'
  const [selectedFigure, setSelectedFigure] = useState(0);

  return (
    <section id="research" className="py-24 border-b border-[#EAEAE7] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-[#EAEAE7]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                06 · USER RESEARCH & PATENT CONCEPT
              </span>
              <span className="text-xs font-mono text-[#666663] bg-[#F4F4F0] px-2 py-0.5 rounded border border-[#EAEAE7]">
                {data.institution}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214]">
              {data.title}
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-1">
            <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {data.publicationStatus}
            </span>
            <span className="text-[11px] font-mono text-[#9E9E96]">
              {data.lab}
            </span>
          </div>
        </div>

        {/* Narrative & Context Card */}
        <div className="rounded-2xl bg-[#FBFBFA] border border-[#EAEAE7] p-6 sm:p-8 mb-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                The Problem Space & Field Observations
              </span>
              <p className="text-sm sm:text-base text-[#121214] leading-relaxed">
                {data.context}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#EAEAE7] shrink-0 text-xs font-mono space-y-1.5 min-w-[240px]">
              <span className="text-[10px] uppercase text-[#9E9E96] font-bold block">Methodological Focus</span>
              <div className="text-[#121214] font-medium">Qualitative Usability Diagnostics</div>
              <div className="text-[#121214] font-medium">Vernacular & Low-Literacy Cohorts</div>
              <div className="text-blue-700 font-semibold pt-1 border-t border-[#F0F0EC]">
                Human-Centered Discovery
              </div>
            </div>
          </div>

          {/* 4 Qualitative Insight Cards (No Biased Numbers) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#EAEAE7]">
            {data.qualitativeInsights.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#EAEAE7] space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold">
                      {m.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#9E9E96]">0{idx + 1}</span>
                  </div>
                  <div className="text-sm font-bold text-[#121214] tracking-tight">
                    {m.headline}
                  </div>
                </div>
                <p className="text-xs text-[#555552] leading-relaxed">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Deep-Dive View Tabs */}
        <div className="flex items-center gap-2 border-b border-[#EAEAE7] pb-3 mb-8 text-xs font-mono">
          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-3.5 py-1.5 rounded-lg transition-all font-semibold ${
              activeTab === 'pillars'
                ? 'bg-[#121214] text-white shadow-sm'
                : 'text-[#666663] hover:text-[#121214] hover:bg-[#F4F4F0]'
            }`}
          >
            5 Core Usability Pillars
          </button>
          <button
            onClick={() => setActiveTab('patent')}
            className={`px-3.5 py-1.5 rounded-lg transition-all font-semibold ${
              activeTab === 'patent'
                ? 'bg-[#121214] text-white shadow-sm'
                : 'text-[#666663] hover:text-[#121214] hover:bg-[#F4F4F0]'
            }`}
          >
            Patent Concept & Sandbox
          </button>
          <button
            onClick={() => setActiveTab('figures')}
            className={`px-3.5 py-1.5 rounded-lg transition-all font-semibold ${
              activeTab === 'figures'
                ? 'bg-[#121214] text-white shadow-sm'
                : 'text-[#666663] hover:text-[#121214] hover:bg-[#F4F4F0]'
            }`}
          >
            System Blueprints & Diagrams ({data.figures.length})
          </button>
        </div>

        {/* TAB 1: 5 CORE USABILITY PILLARS */}
        {activeTab === 'pillars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-200">
            {data.fivePillars.map((p, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl border bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1 border-blue-200 bg-blue-50/20' : 'border-[#EAEAE7]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#9E9E96]">
                    <span>PILLAR 0{p.number}</span>
                    <span className="text-blue-700 font-semibold text-[10px] bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                      Behavioral Insight
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#121214] leading-snug">
                    {p.pillar}
                  </h3>

                  <div className="space-y-1 text-xs">
                    <span className="font-mono text-[10px] uppercase text-[#666663] font-bold block">
                      Screen-Level Observation
                    </span>
                    <p className="text-[#4A4A46] leading-relaxed">
                      {p.finding}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0F0EC] space-y-1">
                  <span className="font-mono text-[10px] uppercase text-emerald-800 font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Human-Centered Intervention
                  </span>
                  <p className="text-xs text-[#2A2A28] font-medium leading-relaxed">
                    {p.designImpact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PATENT CONCEPT & SANDBOX */}
        {activeTab === 'patent' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-2xl bg-[#FBFBFA] border border-[#EAEAE7] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#EAEAE7]">
                <div>
                  <span className="text-[11px] font-mono text-blue-700 font-bold uppercase tracking-wider block mb-1">
                    Invention Concept & Patent Specification
                  </span>
                  <h3 className="text-lg font-bold text-[#121214]">
                    {data.patentArchitecture.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#666663] bg-white border border-[#EAEAE7] px-3 py-1.5 rounded-lg shrink-0">
                  Ref: VIT UX IP / Concept Report
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {data.patentArchitecture.components.map((c, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-[#EAEAE7] space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#121214]">
                      <span className="w-5 h-5 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center text-[10px]">
                        0{idx + 1}
                      </span>
                      <span>{c.name}</span>
                    </div>
                    <p className="text-xs text-[#4A4A46] leading-relaxed pl-7">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Patent Figure Visual Callout */}
            <div className="rounded-2xl border border-[#EAEAE7] bg-white p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-[#EAEAE7] bg-[#F8F8F6]">
                <img 
                  src="/research/fig17_solution_architecture_patent.png" 
                  alt="Patent Solution Architecture" 
                  className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                  onClick={() => {
                    setActiveTab('figures');
                    setSelectedFigure(0);
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-bold">
                  System Architecture Highlight
                </span>
                <h4 className="text-base font-bold text-[#121214]">
                  Zero-Risk Financial Practice Sandbox
                </h4>
                <p className="text-xs text-[#666663] leading-relaxed">
                  The primary driver of digital hesitation is that mistakes in live financial applications carry irreversible monetary loss. By mirroring the live interface with simulated dummy balances, users build tactile muscle memory with zero financial risk before committing real transactions.
                </p>
                <button
                  onClick={() => {
                    setActiveTab('figures');
                    setSelectedFigure(0);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-700 font-semibold hover:underline pt-2"
                >
                  Inspect Full Architecture Blueprint
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM BLUEPRINTS & DIAGRAMS */}
        {activeTab === 'figures' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Figure Selection Tabs */}
            <div className="flex flex-wrap gap-2">
              {data.figures.map((fig, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFigure(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    selectedFigure === idx
                      ? 'bg-blue-50 text-blue-800 font-bold border border-blue-300'
                      : 'bg-white text-[#666663] border border-[#EAEAE7] hover:bg-[#F8F8F6]'
                  }`}
                >
                  Fig 0{idx + 1}: {fig.title}
                </button>
              ))}
            </div>

            {/* Active Figure Display */}
            <div className="rounded-2xl border border-[#EAEAE7] bg-white p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0F0EC]">
                <h3 className="text-sm font-bold text-[#121214] font-mono">
                  {data.figures[selectedFigure].title}
                </h3>
                <span className="text-[11px] font-mono text-[#9E9E96]">
                  Conceptual Research Asset · VIT Pune
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-[#EAEAE7] bg-[#FBFBFA] flex items-center justify-center p-2 max-h-[540px]">
                <img 
                  src={data.figures[selectedFigure].image} 
                  alt={data.figures[selectedFigure].title} 
                  className="max-h-[500px] w-auto max-w-full object-contain rounded-lg shadow-sm"
                />
              </div>

              <p className="text-xs text-[#666663] font-mono leading-relaxed pt-1">
                <span className="font-semibold text-[#121214]">Description: </span>
                {data.figures[selectedFigure].caption}
              </p>
            </div>

          </div>
        )}

        {/* Footer Attribution Banner */}
        <div className="mt-8 p-4 rounded-xl bg-[#FBFBFA] border border-[#EAEAE7] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#666663]">
            <BookOpen className="w-4 h-4 text-blue-700 shrink-0" />
            <span>
              Academic UX Research & Patent Concept: Human-Centered Design for Vernacular Inclusivity & Adaptive HCI
            </span>
          </div>
          <div className="shrink-0 text-blue-700 bg-white px-3 py-1 rounded border border-[#EAEAE7] font-semibold">
            Ready for APM Technical Review
          </div>
        </div>

      </div>
    </section>
  );
}
