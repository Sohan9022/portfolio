import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HOW_I_THINK } from '../data/projectsData';
import { Lightbulb, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export default function ProductPrinciples() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <section id="thinking" className="py-24 border-b border-[#EAEAE7] bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#EAEAE7]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                03 · PRODUCT PHILOSOPHY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214]">
              Good products start with better questions.
            </h2>
          </div>
          <p className="text-sm text-[#666663] max-w-md">
            Five principles that govern how I frame problems, assess technical trade-offs, and protect user attention.
          </p>
        </div>

        {/* 5 Principles Grid / Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-10">
          {HOW_I_THINK.map((item, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <motion.div
                key={item.number}
                onClick={() => setSelectedIdx(idx)}
                onMouseEnter={() => setSelectedIdx(idx)}
                whileHover={{ y: -2 }}
                className={`relative cursor-pointer p-5 rounded-xl border transition-colors flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#121214] shadow-sm'
                    : 'border-[#EAEAE7] hover:border-[#D5D5CE]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activePrincipleHighlight"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm border border-[#121214] -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#9E9E96]">
                      {item.number}
                    </span>
                    {isSelected ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent"></span>
                    )}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#121214] tracking-tight leading-snug mb-2">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[11px] text-[#666663] line-clamp-2 mt-2">
                  {item.principle}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Principle Deep Dive Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="rounded-2xl bg-white border border-[#EAEAE7] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-blue-700 font-bold mb-2">
              <span>Principle {HOW_I_THINK[selectedIdx].number} in Detail</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#121214] mb-3">
              "{HOW_I_THINK[selectedIdx].principle}"
            </h4>
            <p className="text-sm text-[#4A4A46] leading-relaxed max-w-3xl">
              {HOW_I_THINK[selectedIdx].detail}
            </p>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
