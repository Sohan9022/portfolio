import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, FileText, ArrowUp, ArrowUpRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = 'sohangadewar9022@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#FFFFFF] text-[#121214]">
      
      {/* Resume Banner Block */}
      <div className="border-b border-[#EAEAE7] py-16 bg-[#FBFBFA]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="rounded-2xl bg-white border border-[#EAEAE7] p-8 sm:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="font-mono text-xs uppercase tracking-wider text-blue-700 font-semibold block">
                CANDIDATE DOSSIER
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121214]">
                Looking for the concise one-page overview?
              </h3>
              <p className="text-sm text-[#666663] leading-relaxed">
                Download my calibrated 1-page resume tailored for Associate Product Manager (APM) and 0-to-1 Product Builder roles at Google, Meta, Stripe, Linear, and high-signal teams.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="/Sohan_Gadewar_Resume.docx"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#121214] text-white hover:bg-black shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-zinc-400" />
                <span>Download Resume (.docx)</span>
              </motion.a>
              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="/Sohan_Gadewar_Resume.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-[#121214] bg-[#F6F6F3] hover:bg-[#EAEAE7] border border-[#EAEAE7] transition-colors"
              >
                <span>View Online</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#666663]" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="py-20 border-b border-[#EAEAE7]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-between">
            
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#9E9E96] font-semibold">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#121214]">
                Let's build something thoughtful.
              </h2>
              <p className="text-base text-[#4A4A46] leading-relaxed max-w-lg">
                Open to APM opportunities, product management internships, collaborative builds, and thoughtful conversations around systems architecture.
              </p>
            </div>

            <div className="md:col-span-5 space-y-4">
              {/* Interactive Email Copy Widget */}
              <div className="p-4 rounded-xl bg-[#F8F8F6] border border-[#EAEAE7] space-y-2">
                <span className="font-mono text-[11px] text-[#666663] block">Direct Email</span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-[#121214] select-all">
                    {email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-md hover:bg-white text-[#4A4A46] border border-transparent hover:border-[#EAEAE7] transition-all flex items-center gap-1 text-xs font-medium"
                    title="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#9E9E96]" />
                        <span className="text-[11px] text-[#666663]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons: Email + Profiles */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href={`mailto:${email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#121214] text-white hover:bg-black transition-colors shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </motion.a>
                
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#EAEAE7] hover:border-[#D5D5CE] bg-white text-[#4A4A46] hover:text-[#121214] transition-colors flex items-center justify-center"
                  title="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 1 0-.01 3.32 1.66 1.66 0 0 0 .01-3.32Z"/>
                  </svg>
                </motion.a>

                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg border border-[#EAEAE7] hover:border-[#D5D5CE] bg-white text-[#4A4A46] hover:text-[#121214] transition-colors flex items-center justify-center"
                  title="GitHub Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/>
                  </svg>
                </motion.a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Editorial Footer Bottom Bar */}
      <div className="py-8 bg-[#FBFBFA] text-xs text-[#666663]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Sohan Gadewar</span>
            <span>·</span>
            <span>Designed with restraint & product intentionality.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#4A4A46] hover:text-[#121214] font-medium transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
}
