import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Mail, ArrowUpRight, Copy, Check } from 'lucide-react';

export default function Navbar() {
  const [copied, setCopied] = useState(false);
  const email = 'sohangadewar9022@gmail.com';

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80">
      {/* Subtle reading progress indicator at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-400 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Name & Role */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="font-semibold text-zinc-100 text-sm tracking-tight hover:text-zinc-300 transition-colors">
            Sohan Gadewar
          </span>
          <span className="text-zinc-500 text-xs font-mono">/</span>
          <span className="text-xs text-zinc-400 font-normal">
            Product Manager
          </span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <a href="#projects" className="hover:text-zinc-200 transition-colors">
            Projects
          </a>
          <a href="#approach" className="hover:text-zinc-200 transition-colors">
            Approach
          </a>
          <a href="#about" className="hover:text-zinc-200 transition-colors">
            About
          </a>

          {/* Direct Resume Download */}
          <a
            href="/Sohan_Gadewar_Resume.docx"
            download
            className="flex items-center gap-1 text-zinc-300 hover:text-white transition-colors"
            title="Download 1-Page APM Resume (.docx)"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </a>
          
          {/* Quick Copy Email */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 text-xs border border-zinc-700/60 transition-colors active:scale-95"
            title="Copy email to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5 text-zinc-400" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Email'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
