import React from 'react';
import { RESEARCH_SPOTLIGHT } from '../data/projectsData';
import { Compass, Users, HeartHandshake, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ResearchSpotlight() {
  const data = RESEARCH_SPOTLIGHT;

  return (
    <section className="py-24 border-b border-[#EAEAE7] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-[#EAEAE7]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                06 · USER RESEARCH SPOTLIGHT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214]">
              {data.title}
            </h2>
          </div>
          <p className="text-sm text-[#666663] max-w-md">
            {data.tagline}
          </p>
        </div>

        {/* Featured Research Card */}
        <div className="rounded-2xl bg-[#FBFBFA] border border-[#EAEAE7] p-6 sm:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-8">
          
          {/* Narrative Introduction */}
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#9E9E96] font-semibold">
              The Problem Space & Field Context
            </span>
            <p className="text-base sm:text-lg text-[#121214] leading-relaxed font-normal">
              {data.context}
            </p>
          </div>

          {/* 3 Pillars: Challenges, Methodology, Design Directions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#EAEAE7]">
            
            {/* 1. UX Challenges */}
            <div className="p-5 rounded-xl bg-white border border-[#EAEAE7] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-rose-800">
                <Users className="w-4 h-4 text-rose-600" />
                <span>Observed UX Challenges</span>
              </div>
              <ul className="space-y-2 text-xs text-[#4A4A46] leading-relaxed">
                {data.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Methodology */}
            <div className="p-5 rounded-xl bg-white border border-[#EAEAE7] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-blue-800">
                <Compass className="w-4 h-4 text-blue-600" />
                <span>Field Methodology</span>
              </div>
              <ul className="space-y-2 text-xs text-[#4A4A46] leading-relaxed">
                {data.methodology.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Design Direction */}
            <div className="p-5 rounded-xl bg-white border border-[#EAEAE7] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-emerald-800">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Human-Centered Direction</span>
              </div>
              <ul className="space-y-2 text-xs text-[#4A4A46] leading-relaxed">
                {data.designPrinciples.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Research Takeaway Callout */}
          <div className="p-4 rounded-xl bg-white border border-[#EAEAE7] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-mono text-[11px] font-semibold text-[#121214]">
                Key PM Takeaway for Emerging Markets:
              </span>
              <p className="text-[#666663]">
                Trust is an acoustic and physical sensation, not just a green checkmark on a screen.
              </p>
            </div>
            <div className="shrink-0 font-mono text-[11px] text-blue-700 bg-blue-50 px-3 py-1 rounded border border-blue-200">
              Field Study Synthesis · 2026
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
