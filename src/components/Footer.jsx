import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#09090b] text-zinc-500 text-xs">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div>
          <span>© {new Date().getFullYear()} Sohan Gadewar · </span>
          <a
            href="mailto:sohangadewar9022@gmail.com"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            sohangadewar9022@gmail.com
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
