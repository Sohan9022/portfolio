import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ExternalLink, 
  ArrowUpRight, 
  FileText, 
  Mail, 
  Check, 
  Layers, 
  Terminal, 
  Database, 
  Sparkles, 
  Play, 
  ShieldCheck, 
  BookOpen, 
  Scale, 
  Compass, 
  X,
  Command
} from 'lucide-react';
import { PROJECTS } from '../data/projectsData';

export default function CommandMenu({ isOpen, onClose, onOpenNova }) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const email = 'sohangadewar9022@gmail.com';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      } else if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose(false);
    }, 1200);
  };

  const actions = [
    {
      group: 'Interactive AI Companion',
      items: [
        { 
          label: 'Ask Nova (BETA)', 
          desc: 'Chat with Nova about my 5 systems, architectural trade-offs, and APM candidacy', 
          action: () => {
            onClose(false);
            if (onOpenNova) onOpenNova();
          }, 
          icon: Sparkles 
        }
      ]
    },
    {
      group: 'Live Interactive Prototypes & MVPs',
      items: [
        { label: 'GiftVerse Moments', desc: 'Interactive 30-60s suspense unboxing engine', url: 'https://gift-verse-moments.lovable.app', icon: Play, isExternal: true },
        { label: 'Adaptive UX Framework Prototype', desc: 'Refine UPI app frontend interactive Figma sandbox', url: 'https://www.figma.com/make/PWbUyJaOpqKLsqVlDpJOdG/Refine-UPI-app-frontend?t=aZVJGio9dMWpELlU-1', icon: Play, isExternal: true },
        { label: 'Spaces Context Switch', desc: 'Contextual telemetry firewall & isolated vector spaces', url: 'https://space-context-switch.lovable.app', icon: Layers, isExternal: true },
        { label: 'FinMate AI Voice Memory', desc: 'Multimodal capture + deterministic SQL stored procedures', url: 'https://tell-finmate-ai.lovable.app', icon: Database, isExternal: true },
        { label: 'Project Sentinel', desc: 'Silent-by-default decision & drift detection agent', url: 'https://echo-sentinel-08.lovable.app', icon: Terminal, isExternal: true }
      ]
    },
    {
      group: 'Notion PRDs & Specifications',
      items: [
        { label: 'Project Sentinel PRD', desc: 'Full Product Requirements & Decision Log', url: 'https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link', icon: FileText, isExternal: true },
        { label: 'AI Asana Analyst PRD', desc: 'Edge CV vs. Asynchronous GenAI for posture analytics', url: 'https://app.notion.com/p/AI-ASANA-ANALYST-3ed53f22e2b080aebdd9ec74e5845aba?source=copy_link', icon: FileText, isExternal: true },
        { label: 'GiftVerse PRD', desc: 'Experience Director & Encrypted Payload Spec', url: 'https://app.notion.com/p/GIFTVVERSE-3d053f22e2b0804b8b90cf6da95b931f?source=copy_link', icon: FileText, isExternal: true },
        { label: 'FinMate AI PRD', desc: 'Multimodal Parser & Deterministic SQL Architecture', url: 'https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link', icon: FileText, isExternal: true },
        { label: 'Spaces PRD', desc: 'Vector Context Separation & Middleware SDK', url: 'https://app.notion.com/p/SPACES-3ce53f22e2b0805db12ef30ed696c7b5?source=copy_link', icon: FileText, isExternal: true }
      ]
    },
    {
      group: 'Portfolio Deep Dives',
      items: [
        { label: 'Sentinel 8-Step PM Journey', desc: 'Step-by-step discovery to V1 execution breakdown', url: '#case-study', icon: Terminal, isExternal: false },
        { label: 'ElevenLabs Teardown', desc: 'Why async dubbing fails in conversational turn-taking', url: '#teardowns', icon: Sparkles, isExternal: false },
        { label: 'Adaptive UX Framework', desc: 'Zero-risk practice sandbox & vernacular visual affordances', url: '#research', icon: BookOpen, isExternal: false },
        { label: 'Decision Log & Trade-offs', desc: 'Why I chose what I chose across all products', url: '#decisions', icon: Scale, isExternal: false },
        { label: 'Product Thinking Principles', desc: '01 Problem to 05 Evidence-driven shipping', url: '#thinking', icon: Compass, isExternal: false }
      ]
    },
    {
      group: 'Candidate Actions',
      items: [
        { label: 'View / Download Resume (PDF)', desc: 'Calibrated 1-page APM resume (PDF format)', url: '/Sohan_Gadewar_Resume.pdf', icon: FileText, isExternal: true },
        { label: 'Download Resume (.docx)', desc: 'Calibrated 1-page APM resume (Word format)', url: '/Sohan_Gadewar_Resume.docx', icon: FileText, isDownload: true },
        { label: 'Copy Direct Email', desc: email, action: handleCopyEmail, icon: copied ? Check : Mail }
      ]
    }
  ];

  const filteredGroups = actions.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase()) || 
      item.desc.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 px-4 sm:px-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white border border-[#EAEAE7] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-[#F0F0EC] bg-[#FBFBFA]">
            <Search className="w-4 h-4 text-[#9E9E96] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Jump to prototype, PRD, case study, or research..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-[#121214] placeholder-[#9E9E96] focus:outline-none"
            />
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="font-mono text-[10px] text-[#9E9E96] bg-[#F1F1EE] border border-[#E5E5E0] px-1.5 py-0.5 rounded">
                ESC to close
              </span>
              <button 
                onClick={() => onClose(false)}
                className="p-1 rounded-md text-[#9E9E96] hover:text-[#121214] hover:bg-[#F1F1EE] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
            {filteredGroups.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#9E9E96] font-mono">
                No matching product artifacts found for "{query}"
              </div>
            ) : (
              filteredGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <div className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[#9E9E96] font-semibold">
                    {group.group}
                  </div>
                  <div className="space-y-0.5">
                    {group.items.map((item, iIdx) => {
                      const Icon = item.icon;

                      if (item.action) {
                        return (
                          <button
                            key={iIdx}
                            onClick={item.action}
                            className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F6F6F3] transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] flex items-center justify-center text-[#4A4A46] group-hover:text-blue-700 group-hover:bg-blue-50 transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-[#121214]">
                                  {item.label}
                                </div>
                                <div className="text-[11px] text-[#666663]">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                            <span className="font-mono text-[10px] text-blue-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                              {copied ? 'Copied!' : 'Click to copy'}
                            </span>
                          </button>
                        );
                      }

                      return (
                        <a
                          key={iIdx}
                          href={item.url}
                          target={item.isExternal ? '_blank' : undefined}
                          rel={item.isExternal ? 'noopener noreferrer' : undefined}
                          download={item.isDownload ? true : undefined}
                          onClick={() => {
                            if (!item.isExternal && !item.isDownload) {
                              onClose(false);
                            }
                          }}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F6F6F3] transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-[#F8F8F6] border border-[#EAEAE7] flex items-center justify-center text-[#4A4A46] group-hover:text-blue-700 group-hover:bg-blue-50 transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[#121214] flex items-center gap-1.5">
                                <span>{item.label}</span>
                                {item.isExternal && (
                                  <ArrowUpRight className="w-3 h-3 text-[#9E9E96] group-hover:text-[#121214] transition-colors" />
                                )}
                              </div>
                              <div className="text-[11px] text-[#666663]">
                                {item.desc}
                              </div>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-[#9E9E96] group-hover:text-[#121214] transition-colors">
                            Jump →
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-2.5 bg-[#FBFBFA] border-t border-[#F0F0EC] flex items-center justify-between text-[11px] font-mono text-[#9E9E96]">
            <span>Sohan Gadewar · APM Candidate Dossier</span>
            <div className="flex items-center gap-3">
              <span>Press <kbd className="px-1 py-0.5 rounded bg-[#F1F1EE] border border-[#E5E5E0] text-[10px] text-[#666663]">⌘K</kbd> anywhere</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
