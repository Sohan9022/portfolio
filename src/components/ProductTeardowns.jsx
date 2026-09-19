import React from 'react';
import { PRODUCT_TEARDOWNS } from '../data/projectsData';
import { Layers, Sparkles, Check, AlertCircle, Eye, ArrowUpRight } from 'lucide-react';

export default function ProductTeardowns() {
  return (
    <section id="teardowns" className="py-24 border-b border-[#EAEAE7] bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#EAEAE7]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                05 · PM LAB & TEARDOWNS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214]">
              Product teardowns & design observations.
            </h2>
          </div>
          <p className="text-sm text-[#666663] max-w-md">
            Active product curiosity: studying opinionated software architectures, interaction paradigms, and UX choices.
          </p>
        </div>

        {/* Teardowns 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PRODUCT_TEARDOWNS.map((item, idx) => (
            <article
              key={item.id}
              className="rounded-2xl bg-white border border-[#EAEAE7] hover:border-[#D5D5CE] p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all"
            >
              <div className="space-y-4">
                
                {/* Meta */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#F0F0EC] text-xs font-mono">
                  <span className="font-semibold text-[#121214]">{item.product}</span>
                  <span className="text-[#9E9E96]">{item.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#121214] tracking-tight leading-snug">
                  {item.title}
                </h3>

                {/* Core UX Observation */}
                <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] text-xs text-[#4A4A46] leading-relaxed">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#666663] font-semibold block mb-1">
                    Core UX Observation
                  </span>
                  {item.observation}
                </div>

                {/* What Works */}
                <div className="space-y-1 text-xs">
                  <span className="font-mono text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    What Works Exceptionally Well
                  </span>
                  <p className="text-[#4A4A46] leading-relaxed pl-5">
                    {item.whatWorks}
                  </p>
                </div>

                {/* What I Would Change */}
                <div className="space-y-1 text-xs pt-1">
                  <span className="font-mono text-[11px] font-semibold text-amber-800 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    What I Would Experiment With
                  </span>
                  <p className="text-[#4A4A46] leading-relaxed pl-5">
                    {item.whatIWouldChange}
                  </p>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-[#F0F0EC] text-[11px] font-mono text-[#9E9E96] flex items-center justify-between">
                <span>LAB ESSAY 0{idx + 1}</span>
                <span className="text-blue-600 font-medium">Sohan's Product Notes</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
