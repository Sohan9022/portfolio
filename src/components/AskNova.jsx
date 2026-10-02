import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  ExternalLink, 
  Compass, 
  ShieldCheck, 
  Terminal, 
  Database,
  ArrowRight,
  MessageSquare,
  Bot
} from 'lucide-react';

const STARTER_PROMPTS = [
  {
    icon: Terminal,
    text: "Why is Sentinel 'Silent-by-Default'?",
    category: "Enterprise AI"
  },
  {
    icon: Database,
    text: "How does FinMate prevent math hallucinations?",
    category: "FinTech & SQL"
  },
  {
    icon: Compass,
    text: "What trade-offs did Sohan make across his projects?",
    category: "Product Strategy"
  },
  {
    icon: ShieldCheck,
    text: "Summarize Sohan's engineering background & hackathons",
    category: "Candidate Deep-Dive"
  }
];

export default function AskNova({ externalOpen, onExternalClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm **Nova**, Sohan's Portfolio AI Concierge. ✦\n\nI'm grounded in all of Sohan's product work, engineering architectures, and PRD specifications. Ask me anything about his 5 systems (**Sentinel**, **FinMate**, **Spaces**, **SHRH**, **GiftVerse**), his design trade-offs, or his APM candidacy!`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sync external open triggers (e.g. from CommandMenu or Navbar)
  useEffect(() => {
    if (externalOpen) {
      setIsOpen(true);
    }
  }, [externalOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (onExternalClose) onExternalClose();
  };

  // Scroll to bottom of message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Global keyboard shortcut: Press Option+N or Alt+N to toggle Nova
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.altKey && e.key.toLowerCase() === 'n') || (e.metaKey && e.key.toLowerCase() === 'j')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage = {
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask-nova', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.content || "I couldn't process that response. Please try asking again!",
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error('Nova Query Error:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I ran into a temporary connection issue. Please check your network or try asking again in a moment!`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: `Conversation refreshed! What else would you like to explore regarding Sohan's product systems or architecture?`,
        timestamp: new Date()
      }
    ]);
  };

  // Helper to format text with clickable markdown links
  const renderFormattedContent = (content) => {
    // Regex to detect [label](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match[2] + match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 underline decoration-blue-300 underline-offset-2 transition-colors mx-0.5"
        >
          <span>{match[1]}</span>
          <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.map((part, i) => {
      if (typeof part === 'string') {
        // Simple paragraph split
        return part.split('\n\n').map((paragraph, pIdx) => (
          <p key={pIdx} className="mb-2.5 last:mb-0 leading-relaxed">
            {paragraph.split('\n').map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {line.startsWith('- ') ? (
                  <span className="block pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-blue-600">
                    {formatBold(line.substring(2))}
                  </span>
                ) : (
                  formatBold(line)
                )}
                {lIdx < line.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        ));
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  const formatBold = (text) => {
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, bIdx) => {
      if (bp.startsWith('**') && bp.endsWith('**')) {
        return <strong key={bIdx} className="font-bold text-[#121214]">{bp.slice(2, -2)}</strong>;
      }
      return bp;
    });
  };

  return (
    <>
      {/* Floating Launcher Button (Bottom-Right) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 10 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 pl-2.5 pr-4 py-2.5 rounded-full bg-[#121214] hover:bg-black text-white shadow-[0_8px_30px_rgba(0,0,0,0.24)] border border-slate-700/80 transition-all group"
            title="Ask Nova · AI Portfolio Concierge (Alt+N)"
            aria-label="Ask Nova AI Portfolio Concierge"
          >
            {/* Custom Nova Glowing Avatar */}
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-blue-400/40 shrink-0 shadow-xs">
              <img 
                src="/nova-avatar.jpg" 
                alt="Nova AI Avatar" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-500 items-center justify-center text-[10px] font-bold text-white">
                N
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-[#121214] animate-pulse"></span>
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold tracking-tight text-white">Ask Nova</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                Portfolio Concierge
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-Over Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 sm:hidden"
            />

            {/* Main Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[440px] h-[82vh] sm:h-[620px] max-h-[720px] rounded-2xl bg-[#FFFFFF] border border-[#EAEAE7] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden font-sans"
            >
              {/* Header */}
              <div className="px-4 py-3.5 border-b border-[#EAEAE7] bg-[#FBFBFA]/95 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-400/50 shadow-xs">
                    <img 
                      src="/nova-avatar.jpg" 
                      alt="Nova" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-tr from-blue-600 to-indigo-500 items-center justify-center text-xs font-bold text-white">
                      N
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white"></span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-[#121214]">Nova</h4>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-medium">
                        Gemini 3.5 Flash Lite
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666663] font-mono">
                      Sohan's Portfolio AI Concierge
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClearChat}
                    className="p-1.5 text-[#666663] hover:text-[#121214] hover:bg-[#F0F0EC] rounded-lg transition-colors"
                    title="Reset Conversation"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-1.5 text-[#666663] hover:text-[#121214] hover:bg-[#F0F0EC] rounded-lg transition-colors"
                    title="Close Nova"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 bg-[#FFFFFF]">
                {messages.map((msg, index) => {
                  const isUser = msg.role === 'user';
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-blue-200 shrink-0 mt-0.5">
                          <img src="/nova-avatar.jpg" alt="Nova" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs ${
                          isUser
                            ? 'bg-[#121214] text-white rounded-tr-xs shadow-xs'
                            : 'bg-[#F8F8F6] border border-[#EAEAE7] text-[#2A2A28] rounded-tl-xs shadow-2xs'
                        }`}
                      >
                        {isUser ? (
                          <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                        ) : (
                          <div className="prose-xs text-[#2A2A28]">
                            {renderFormattedContent(msg.content)}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Loading / Thinking Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2.5 justify-start"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-blue-200 shrink-0 mt-0.5">
                      <img src="/nova-avatar.jpg" alt="Nova" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-xs bg-[#F8F8F6] border border-[#EAEAE7] flex items-center gap-2 text-xs font-mono text-[#666663]">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                      <span>Nova is thinking...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Starter Prompts (shown when only 1-2 messages exist) */}
              {messages.length <= 2 && !isLoading && (
                <div className="px-4 py-2 bg-[#FBFBFA] border-t border-[#F0F0EC] space-y-1.5 shrink-0">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#9E9E96] block">
                    Suggested Questions:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {STARTER_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt.text)}
                        className="p-2 rounded-lg bg-white border border-[#EAEAE7] hover:border-blue-400 hover:bg-blue-50/20 text-left transition-all group flex items-start gap-1.5"
                      >
                        <prompt.icon className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-[#4A4A46] group-hover:text-[#121214] font-medium leading-tight">
                          {prompt.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 border-t border-[#EAEAE7] bg-[#FBFBFA] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Nova about Sentinel, FinMate, trade-offs..."
                    disabled={isLoading}
                    className="flex-1 bg-white border border-[#D5D5CE] focus:border-[#121214] focus:ring-1 focus:ring-[#121214] rounded-xl px-3.5 py-2 text-xs text-[#121214] placeholder-[#9E9E96] outline-none transition-all disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="p-2 rounded-xl bg-[#121214] text-white hover:bg-black disabled:opacity-40 disabled:hover:bg-[#121214] transition-all shrink-0 active:scale-95"
                    title="Send query"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                <div className="flex items-center justify-between text-[10px] text-[#9E9E96] font-mono mt-1.5 px-1">
                  <span>Press Enter to send</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Grounded in portfolio work</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
