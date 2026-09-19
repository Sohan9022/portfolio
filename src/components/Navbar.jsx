import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, FileText, Mail, Check, Copy } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = 'sohangadewar9022@gmail.com';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Case Study', href: '#case-study' },
    { label: 'Thinking', href: '#thinking' },
    { label: 'Decisions', href: '#decisions' },
    { label: 'Teardowns', href: '#teardowns' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#EAEAE7] py-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-semibold tracking-tight text-[#121214] hover:text-black transition-colors flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span>SOHAN GADEWAR</span>
          </a>
          <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#F1F1EE] text-[#666663] border border-[#E5E5E0]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Exploring APM Roles · 2026–2027</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-[13px] text-[#666663]">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-[#121214] font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions (Resume & CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/Sohan_Gadewar_Resume.docx"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#4A4A46] hover:text-[#121214] bg-[#FFFFFF] border border-[#EAEAE7] hover:border-[#D5D5CE] shadow-sm transition-all active:scale-95"
            title="Download calibrated 1-page APM resume"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 text-[#9E9E96]" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-[#121214] text-white hover:bg-black shadow-sm transition-all active:scale-95"
          >
            <span>Let's Talk</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-md text-[#666663] hover:text-[#121214] hover:bg-[#F1F1EE] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-[#EAEAE7] bg-[#FFFFFF]/98 backdrop-blur-xl px-6 py-4 space-y-3 shadow-lg"
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#F6F6F3] text-[#666663] border border-[#E5E5E0] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Exploring APM Roles · 2026–2027</span>
            </div>

            <div className="flex flex-col space-y-2 text-sm text-[#4A4A46]">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#121214] font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#EAEAE7] flex items-center justify-between gap-3">
              <a
                href="/Sohan_Gadewar_Resume.docx"
                download
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium text-[#121214] bg-[#F6F6F3] border border-[#EAEAE7]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (.docx)</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-[#121214] text-white"
              >
                <span>Let's Talk</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
