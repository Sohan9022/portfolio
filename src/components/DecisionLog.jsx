import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DECISION_LOG } from '../data/projectsData';
import { ChevronDown, ChevronUp, Scale, Check, X, ArrowRight } from 'lucide-react';

export default function DecisionLog() {
  const [openId, setOpenId] = useState('decision-spaces');

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="decisions" className="py-24 border-b border-[#EAEAE7] bg-[#FFFFFF]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#EAEAE7]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                04 · DECISION LOG
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214]">
              Why I chose what I chose.
            </h2>
          </div>
          <p className="text-sm text-[#666663] max-w-md">
            Great PMs are defined by the trade-offs they navigate and the features they explicitly say no to.
          </p>
        </div>

        {/* Decision Accordion List */}
        <div className="space-y-4">
          {DECISION_LOG.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-[#FBFBFA] border-[#D5D5CE] shadow-sm'
                    : 'bg-white border-[#EAEAE7] hover:border-[#D5D5CE]'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full text-left p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-[#666663]">
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {item.project}
                      </span>
                      <span>·</span>
                      <span>{item.tag}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#121214] tracking-tight">
                      {item.decision}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-medium text-[#666663] hidden md:inline">
                      {isOpen ? 'Collapse Rationale' : 'Inspect Trade-off'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F6F6F3] border border-[#EAEAE7] flex items-center justify-center text-[#4A4A46]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden border-t border-[#EAEAE7] px-6 pb-7 pt-5 sm:px-7 sm:pb-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        
                        {/* 1. Context */}
                        <div className="p-4 rounded-xl bg-white border border-[#EAEAE7] space-y-1.5">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#666663] font-semibold block">
                            The Context & Pressure
                          </span>
                          <p className="text-[#4A4A46] leading-relaxed">
                            {item.context}
                          </p>
                        </div>

                        {/* 2. Trade-off Accepted */}
                        <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/80 space-y-1.5">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-amber-800 font-semibold block flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-amber-600" />
                            Trade-off Accepted
                          </span>
                          <p className="text-[#4A4A46] leading-relaxed">
                            {item.tradeoff}
                          </p>
                        </div>

                        {/* 3. Product Rationale */}
                        <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/80 space-y-1.5">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-800 font-semibold block flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            Product Rationale
                          </span>
                          <p className="text-[#4A4A46] leading-relaxed">
                            {item.rationale}
                          </p>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
