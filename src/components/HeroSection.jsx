import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ArrowDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const email = 'sohangadewar9022@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-20 pb-16 border-b border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Availability tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>APM Intern Candidate · Pune, India</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
        >
          I find the friction nobody else notices — then build the product to fix it.
        </motion.h1>

        {/* Narrative Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6 font-normal"
        >
          I'm Sohan — a PM candidate who gets bothered by broken things.
          SHA-256 hashes that can't tell a typo from a security breach.
          Finance apps that make you fill six fields every time you buy coffee.
          Recommendation feeds that collapse when you watch the wrong thing on a Friday night.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8"
        >
          I define the product thesis and the user story. I use AI to stress-test constraints, 
          draft PRDs, and map edge cases. Then I ship a working prototype on Lovable — 
          so the idea stops being a slide deck and becomes something real you can click.
        </motion.p>

        {/* Contact & Links Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 pt-2 text-xs"
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">
            <span>{email}</span>
            <button
              onClick={handleCopyEmail}
              className="p-1 hover:text-white transition-colors"
              title="Copy email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
            </button>
          </div>

          <a
            href="/Sohan_Gadewar_Resume.docx"
            download
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium transition-colors shadow-sm active:scale-95 flex items-center gap-1.5"
          >
            <span>Resume (.docx)</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href={`mailto:${email}`}
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium transition-colors active:scale-95"
          >
            Send Email
          </a>

          <a
            href="#projects"
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <span>Explore 6 Products</span>
            <ArrowDown className="w-3 h-3 text-zinc-500" />
          </a>
        </motion.div>


      </div>
    </section>
  );
}
