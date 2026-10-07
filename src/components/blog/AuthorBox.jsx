import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const AuthorBox = ({ compact = false }) => (
  <div className="flex items-center gap-4 border-2 border-black rounded-2xl bg-canvas p-4 md:p-5 my-8">
    <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl bg-coral border-2 border-black flex items-center justify-center font-display font-black text-white text-xl">
      S
    </div>
    <div className="min-w-0">
      <p className="font-display font-black text-ink text-sm md:text-base">Saswata S. Sengupta</p>
      <p className="text-xs md:text-sm text-ink/60 font-medium leading-snug">
        {compact
          ? 'Product Manager shipping AI agents and growth products in production.'
          : 'PM at Upcore Technologies. Cut checkout abandonment 73.1% to 53.9%. IIT Jodhpur MBA. Writing about delivered work, product decisions and experiments.'}
      </p>
      <div className="flex items-center gap-3 mt-2">
        <a href="https://www.linkedin.com/in/sss99/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-bold text-purple hover:text-ink transition-colors">
          <Linkedin className="w-3.5 h-3.5" /> LinkedIn
        </a>
        <a href="https://github.com/saswatasg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-bold text-purple hover:text-ink transition-colors">
          <Github className="w-3.5 h-3.5" /> GitHub
        </a>
      </div>
    </div>
  </div>
);

export default AuthorBox;
