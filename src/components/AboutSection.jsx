import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Award, GraduationCap, Code2, Sparkles, Compass, Lightbulb, FileText, ArrowUpRight } from 'lucide-react';

export default function AboutSection() {
  const [copied, setCopied] = useState(false);
  const email = 'sohangadewar9022@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toolkit = [
    {
      category: 'Product Sense & Strategy',
      skills: [
        'PRD Writing',
        'Problem Framing',
        'Jobs-to-be-Done (JTBD)',
        'RICE Prioritization',
        'Trade-off Analysis',
        'North Star & Counter-Metrics',
        'Go-to-Market (GTM)'
      ]
    },
    {
      category: 'Customer Discovery & Design',
      skills: [
        'User Interviews',
        'Customer Journey Mapping',
        'Figma Prototyping',
        'Rapid Wireframing',
        'Usability Testing',
        'Behavioral Loops'
      ]
    },
    {
      category: 'Technical Fluency',
      skills: [
        'Java',
        'Spring Framework',
        'Python',
        'SQL & PostgreSQL RPCs',
        'REST APIs',
        'System Architecture',
        'DSA (400+ LeetCode, 210+ GFG)'
      ]
    },
    {
      category: 'AI Systems & Prototyping',
      skills: [
        'LLM Prompt Engineering',
        'Advanced RAG Architectures',
        'Multimodal Ingestion',
        'AI Governance (SHRH)',
        'Lovable.dev Rapid MVPs',
        'Supabase / RLS'
      ]
    }
  ];

  const credentials = [
    {
      title: 'India Innovates Hackathon — Finalist',
      issuer: 'National Hackathon',
      date: 'Top ~1,000 of ~6,000+ teams nationwide (Top ~16%)',
      badge: 'National Finalist',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      title: 'GHCI 25 Hackathon — Round 2 Qualifier',
      issuer: 'AnitaB.org India & Backbase',
      date: 'National GenAI Hackathon: Unbound with GenAI',
      badge: 'Round 2 Qualifier',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200'
    },
    {
      title: 'Patent Filed — Multimodal AI Lost & Found System',
      issuer: 'South African Patent Office (2025)',
      date: '5-factor matching algorithm (image, text, geo, timestamp, context)',
      badge: 'Patent Filed',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200'
    },
    {
      title: 'Product Management Masterclass Certified',
      issuer: 'GeeksforGeeks',
      date: 'Product lifecycle, discovery, roadmap prioritization, and PRD metrics',
      badge: 'Certified',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    }
  ];

  return (
    <section id="about" className="py-24 border-b border-[#EAEAE7] bg-[#FBFBFA]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-[#EAEAE7]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono tracking-wider uppercase text-blue-700 font-semibold bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded">
                07 · ABOUT & TOOLKIT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121214]">
              Engineer by training. Product thinker by curiosity.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#666663]">
            <span>Based in Pune, India</span>
            <span>·</span>
            <span className="text-[#121214] font-medium">B.Tech IT (2023–2027)</span>
          </div>
        </div>

        {/* 2-Column Editorial Grid: Narrative & Toolkit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Bio Story (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base text-[#4A4A46] leading-relaxed font-normal">
              <p>
                I'm <strong>Sohan Gadewar</strong>. I study Information Technology at <strong>VIIT Pune</strong> (CGPA: 8.97 / 10.0), but my center of gravity is Product Management.
              </p>
              <p>
                My technical foundations—solving 400+ LeetCode problems, building backend systems with Java and Spring, and exploring vector search—give me strong architectural empathy. I know what engineering trade-offs feel like because I've written the code.
              </p>
              <p>
                However, I discovered early on that writing code is only half the battle. The harder and more exhilarating challenge is deciding <em>what</em> to build, <em>why</em> to build it, and <em>what to leave out</em> to protect user attention.
              </p>
              <p>
                I thrive in 0-to-1 ambiguity: identifying where existing tools frustrate users, synthesizing qualitative insights into actionable PRDs, and using modern AI tooling to ship functional, testable prototypes in days rather than waiting quarters.
              </p>
            </div>

            {/* Quick Education Callout */}
            <div className="p-5 rounded-xl bg-white border border-[#EAEAE7] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#121214]">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Vishwakarma Institute of Information Technology (VIIT), Pune</span>
                </div>
                <span className="font-mono text-[11px] text-[#666663]">2023 – 2027</span>
              </div>
              <div className="text-xs text-[#666663]">
                Bachelor of Technology in Information Technology · <strong className="text-[#121214]">CGPA: 8.97 / 10.0</strong>
              </div>
              <div className="text-[11px] text-[#9E9E96] pt-1 border-t border-[#F0F0EC]">
                Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, System Design
              </div>
            </div>

            {/* Contact widget */}
            <div className="flex items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#EAEAE7] text-xs font-mono text-[#121214]">
                <span>{email}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopyEmail}
                  className="p-1 hover:text-black transition-colors"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#9E9E96]" />}
                </motion.button>
              </div>
              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                href={`mailto:${email}`}
                className="px-3.5 py-1.5 rounded-lg bg-[#121214] text-white text-xs font-medium hover:bg-black transition-all shadow-sm"
              >
                Send Email
              </motion.a>
            </div>
          </div>

          {/* Product Toolkit Pills (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-4 p-6 sm:p-7 rounded-2xl bg-white border border-[#EAEAE7] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <span className="font-mono text-xs uppercase tracking-wider text-[#121214] font-bold block pb-3 border-b border-[#F0F0EC]">
              Product Manager Toolkit
            </span>

            <div className="space-y-5 text-xs">
              {toolkit.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="font-semibold text-[#121214] block">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill, sIdx) => (
                      <motion.span
                        key={sIdx}
                        whileHover={{ y: -1.5, scale: 1.04 }}
                        transition={{ duration: 0.15 }}
                        className="cursor-default px-2.5 py-1 rounded-md bg-[#F6F6F3] hover:bg-white hover:border-[#D5D5CE] hover:shadow-xs text-[#4A4A46] hover:text-[#121214] border border-[#EAEAE7] text-[11px] font-medium transition-colors inline-block"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Credentials & Honors Grid */}
        <div className="pt-10 border-t border-[#EAEAE7]">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#666663] font-semibold mb-6">
            Honors, Recognitions & Certifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {credentials.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-4 rounded-xl bg-white border border-[#EAEAE7] hover:border-[#D5D5CE] hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2 flex flex-col justify-between transition-all"
              >
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${c.badgeColor} mb-2`}>
                    {c.badge}
                  </span>
                  <h4 className="text-xs font-bold text-[#121214] leading-snug">
                    {c.title}
                  </h4>
                  <div className="text-[11px] text-[#666663] mt-1">
                    {c.issuer}
                  </div>
                </div>
                <div className="text-[10px] text-[#9E9E96] pt-2 border-t border-[#F0F0EC]">
                  {c.date}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
