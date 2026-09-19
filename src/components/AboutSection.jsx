import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';

export default function AboutSection() {
  const [copied, setCopied] = useState(false);
  const email = 'sohangadewar9022@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skills = [
    { category: 'Product Strategy & Discovery', items: ['User Problem Discovery', 'PRD Writing', 'Jobs-to-be-Done (JTBD)', 'Trade-off Analysis', 'Feature Prioritization', 'North Star Metrics'] },
    { category: 'Technical Foundations', items: ['DSA (400+ LeetCode, 210+ GFG)', 'Java', 'Spring Framework', 'Python', 'PostgreSQL / RPCs', 'System Design'] },
    { category: 'AI Prototyping & Architecture', items: ['LangChain', 'Advanced RAG', 'n8n Workflows', 'Prompt Engineering', 'Lovable.dev MVPs', 'Supabase'] },
  ];

  return (
    <section id="about" className="py-20 border-b border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Bio */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              About Me
            </h2>

            <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
              <p>
                I'm <strong>Sohan Gadewar</strong>, an Information Technology undergraduate at <strong>VIIT Pune</strong> (Current CGPA: 8.97 / 10.0) targeting <strong>Associate Product Manager (APM)</strong> roles.
              </p>
              <p>
                With strong computer science fundamentals (400+ LeetCode, 210+ GeeksforGeeks, Java/Spring, and Python), I understand engineering trade-offs and backend realities. But my real passion is product sense: observing how workflows break down in the wild, identifying non-obvious root causes, and designing systems that solve them with clear constraints.
              </p>
              <p>
                I move quickly from problem formulation to comprehensive PRDs and functional, clickable prototypes — testing assumptions early with real software rather than staying trapped in theoretical slide decks.
              </p>
            </div>

            <div className="pt-3">
              <div className="inline-flex items-center gap-2 p-1.5 pr-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-200">Email</span>
                <span>{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  title="Copy email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                </button>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="md:col-span-5 p-6 rounded-xl bg-[#111115] border border-zinc-800 space-y-4">
            <h3 className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider">
              Core Competencies
            </h3>

            <div className="space-y-4 text-xs">
              {skills.map((group, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-zinc-300 font-medium block">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 text-[11px] font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Credentials & Recognition */}
        <div className="mt-14 pt-10 border-t border-zinc-800/60">
          <h3 className="text-xs font-mono uppercase text-zinc-400 font-semibold tracking-wider mb-6">
            Honors & Certifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* India Innovates Hackathon — Finalist */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#111115] border border-zinc-700 hover:border-zinc-600 transition-colors">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-base">🏅</div>
              <div>
                <div className="text-sm font-semibold text-white">India Innovates Hackathon — Finalist</div>
                <div className="text-xs text-zinc-400 mt-0.5">Top ~1,000 teams selected nationwide out of ~6,000+ participating teams</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">National Finalist</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">Top ~16%</span>
                </div>
              </div>
            </div>

            {/* GHCI 25 — Round 2 */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#111115] border border-zinc-700 hover:border-zinc-600 transition-colors">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-base">🏆</div>
              <div>
                <div className="text-sm font-semibold text-white">GHCI 25 Hackathon — Round 2 Qualifier</div>
                <div className="text-xs text-zinc-400 mt-0.5">Unbound with GenAI: Breaking Barriers, Creating Impact</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-500/10 text-violet-300 border border-violet-500/20">AnitaB.org India</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">Backbase</span>
                </div>
              </div>
            </div>

            {/* Patent */}
            <div className="sm:col-span-2 flex items-start gap-4 p-4 rounded-xl bg-[#111115] border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 text-base">💡</div>
              <div>
                <div className="text-sm font-medium text-zinc-200">Patent Filed — Multimodal AI Lost & Found Matching System</div>
                <div className="text-xs text-zinc-400 mt-0.5">Design-thinking based privacy-first matching architecture utilizing 5-factor scoring (image, text, location, timestamp, context) · South African Patent Filing</div>
              </div>
            </div>

            {[
              { icon: '🎯', title: 'Product Management Masterclass', issuer: 'GeeksforGeeks', date: 'Certified' },
              { icon: '🤖', title: 'AI Agents & Automation using n8n', issuer: 'CampusX', date: 'Dec 2025' },
              { icon: '🧠', title: 'Advanced RAG Systems Architecture', issuer: 'CampusX', date: 'In Progress' },
              { icon: '✍️', title: 'Prompt Engineering & Docker for ML', issuer: 'CampusX', date: 'Jun 2026' },
            ].map((cert, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#111115] border border-zinc-800 hover:border-zinc-700 transition-colors">
                <div className="mt-0.5 w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 text-sm">{cert.icon}</div>
                <div>
                  <div className="text-xs font-medium text-zinc-200">{cert.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">{cert.issuer}</span>
                    <span className="text-[10px] text-zinc-500">{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
