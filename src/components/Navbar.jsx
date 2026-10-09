import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X, FileText, Download, Search, Sparkles } from 'lucide-react';
import CommandMenu from './CommandMenu';
import Logo from './Logo';

export default function Navbar({ onOpenNova }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const email = 'sohangadewar9022@gmail.com';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Case Study', href: '#case-study' },
    { label: 'Thinking', href: '#thinking' },
    { label: 'Decisions', href: '#decisions' },
    { label: 'Teardowns', href: '#teardowns' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      {/* Editorial Reading Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400 z-[100] origin-left pointer-events-none"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#FBFBFA]/92 backdrop-blur-md border-b border-[#EAEAE7] py-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Brand & Status */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              className="text-sm font-semibold tracking-tight text-[#121214] hover:text-black transition-colors flex items-center gap-3 group"
            >
              <Logo size={40} className="w-9 h-9 sm:w-10 sm:h-10" />
              <span className="font-bold tracking-tight text-sm sm:text-[15px]">SOHAN GADEWAR</span>
            </a>
            
            {/* Status badge: visible only on extra-large screens to prevent any mid-screen collision */}
            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#F1F1EE] text-[#666663] border border-[#E5E5E0]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span>Available for Product Roles</span>
            </span>
          </div>

          {/* Desktop Nav Links - Only displayed at lg (1024px+) to prevent tablet collision */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[13px] text-[#666663] shrink-0">
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

          {/* Actions Area */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Search Trigger (⌘K) - full button on sm+, compact icon on mobile */}
            <button
              onClick={() => setCommandMenuOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-[#666663] bg-[#F1F1EE] hover:bg-[#EAEAE7] hover:text-[#121214] border border-[#E5E5E0] transition-colors"
              title="Search & Quick Jump (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-[#9E9E96]" />
              <span className="text-[11px]">Jump</span>
              <kbd className="px-1 py-0.5 rounded bg-white text-[10px] text-[#4A4A46] border border-[#D5D5CE] font-sans">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setCommandMenuOpen(true)}
              className="sm:hidden p-2 rounded-lg text-[#666663] hover:text-[#121214] hover:bg-[#F1F1EE] transition-colors"
              title="Quick Search"
              aria-label="Quick Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Ask Nova AI Trigger */}
            <button
              onClick={() => onOpenNova && onOpenNova()}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-blue-700 bg-blue-50/80 hover:bg-blue-100/90 border border-blue-200/80 transition-colors shadow-2xs group"
              title="Ask Nova · AI Portfolio Concierge (Alt+N)"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span className="font-semibold text-blue-800">Ask Nova</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-amber-100 text-amber-800 border border-amber-200/80 rounded font-bold uppercase tracking-wider">BETA</span>
            </button>

            {/* Resume Button: opens verified 1-page PDF in new tab */}
            <a
              href="/Sohan_Gadewar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#4A4A46] hover:text-[#121214] bg-[#FFFFFF] border border-[#EAEAE7] hover:border-[#D5D5CE] shadow-2xs transition-all active:scale-95"
              title="View calibrated 1-page APM resume (PDF)"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-[#9E9E96]" />
            </a>

            {/* CTA Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#121214] text-white hover:bg-black shadow-2xs transition-all active:scale-95"
            >
              <span>Let's Talk</span>
            </a>

            {/* Mobile / Tablet Hamburger Button (visible below 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#666663] hover:text-[#121214] hover:bg-[#F1F1EE] transition-colors ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Drawer (below lg: 1024px) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-b border-[#EAEAE7] bg-[#FFFFFF]/98 backdrop-blur-xl px-6 py-5 space-y-4 shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EC]">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#F6F6F3] text-[#666663] border border-[#E5E5E0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Available for Product Roles</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCommandMenuOpen(true);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#666663] hover:text-[#121214]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search (⌘K)</span>
                </button>
              </div>

              {/* Quick AI Trigger inside Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenNova) onOpenNova();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs font-mono font-semibold hover:bg-blue-100 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                  <span>Chat with Nova</span>
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  BETA
                </span>
              </button>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-1 text-sm text-[#4A4A46]">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-2 rounded-lg hover:bg-[#F6F6F3] hover:text-[#121214] font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Actions Footer inside Drawer */}
              <div className="pt-3 border-t border-[#EAEAE7] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <a
                  href="/Sohan_Gadewar_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#121214] bg-[#F6F6F3] border border-[#EAEAE7] hover:bg-[#EAEAE7]"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>View Resume (PDF)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#9E9E96]" />
                </a>
                <a
                  href="/Sohan_Gadewar_Resume.docx"
                  download
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#4A4A46] bg-white border border-[#EAEAE7] hover:bg-[#F6F6F3]"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Download (.docx)</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Animated Toast for Email Copy */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 bg-[#121214] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-mono border border-slate-700"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Copied to clipboard: {email}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Menu Modal */}
      <CommandMenu isOpen={commandMenuOpen} onClose={setCommandMenuOpen} onOpenNova={onOpenNova} />
    </>
  );
}
