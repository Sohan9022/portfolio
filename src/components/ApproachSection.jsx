import React from 'react';
import SpotlightCard from './SpotlightCard';

export default function ApproachSection() {
  const principles = [
    {
      number: '01',
      title: 'Workflow Friction & Problem Discovery',
      role: 'User Sense',
      description: 'Breakdowns rarely happen where tools expect them. It takes deliberate user empathy to notice that Git commit hashes cause alert fatigue, that multi-field finance forms cause 60%+ drop-off, or that noisy AI bots interrupt engineering flow.',
    },
    {
      number: '02',
      title: 'Architectural Constraints & PRDs',
      role: 'System Thinking',
      description: 'Good PMs don\'t just describe features; they define trade-offs and edge cases. I formulate comprehensive PRDs, establish mathematical guardrails (e.g. deterministic PostgreSQL RPCs over hallucinating LLMs), and isolate failure modes.',
    },
    {
      number: '03',
      title: 'Rapid Prototyping & Real Feedback',
      role: 'Validation Loop',
      description: 'Ideas stay abstract until users can click them. Using modern generative tools and Lovable, I turn complex specs into functional, testable MVPs in days — validating product intuition with interactive software instead of theoretical slide decks.',
    },
  ];

  return (
    <section id="approach" className="py-20 border-b border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
            Product Philosophy & Approach
          </h2>
          <p className="text-sm text-zinc-400">
            Bridging technical feasibility, user psychology, and rapid execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((item, idx) => (
            <SpotlightCard key={idx}>
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-zinc-500 font-bold">
                      {item.number}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {item.role}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Grounded PM Principle */}
        <div className="mt-8 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
          <strong className="text-zinc-100">Core Conviction: </strong>
          Great product work isn't about chasing technology for its own sake — it's about deeply understanding who suffers from the friction, making defensible architectural trade-offs, and shipping working solutions that respect user trust.
        </div>

      </div>
    </section>
  );
}
