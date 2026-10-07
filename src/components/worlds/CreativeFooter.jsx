import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

const XIcon = (props) => (
  <svg {...props} viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1058.01 1148.81H895.408L569.165 687.854V687.828Z" fill="currentColor"/>
  </svg>
);

function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-ink text-white mt-auto border-t-4 border-coral">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/adda" className="font-display font-black text-xl tracking-tight text-white bg-coral px-2 py-0.5 rounded-lg border-2 border-white inline-block -rotate-1 hover:scale-105 hover:-rotate-2 transition-all duration-200">
              Saswata
            </Link>
            <p className="text-sm text-white/60 font-medium mt-2 max-w-[200px]">
              Pull up a chair. There’s always room for another story.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-3 border-b-2 border-white/20 pb-1">Pages</h4>
            <ul className="space-y-2">
              {[
                { to: '/adda', label: 'Home' },
                { to: '/adda/about', label: 'About' },
                { to: '/writing', label: 'Writing' },
                { to: '/photography', label: 'Stories' },
                { to: '/cinema', label: 'Cinema' },
                { to: '/contact?world=adda', label: 'Contact' },
                { to: '/', label: 'Split entrance' },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} onClick={() => trackEvent('footer', 'page_link', link.label)} className="text-sm text-white/60 hover:text-white font-medium transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-3 border-b-2 border-white/20 pb-1">Connect</h4>
            <ul className="space-y-2">
              {[
                { href: 'https://linkedin.com/in/sss99', label: 'LinkedIn' },
                { href: 'https://github.com/saswatasg', label: 'GitHub' },
                { href: 'https://twitter.com/saswatasg', label: 'Twitter' },
                { href: 'https://wa.me/919836312162', label: 'WhatsApp', handler: 'whatsapp' },
              ].map((link) => (
                <li key={link.label}>
                  {link.handler === 'whatsapp' ? (
                    <button
                      onClick={() => { trackEvent('footer', 'whatsapp'); window.dispatchEvent(new CustomEvent('openWhatsApp')); }}
                      className="text-sm text-white/60 hover:text-white font-medium transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('footer', 'connect_link', link.label)} className="text-sm text-white/60 hover:text-white font-medium transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-3 border-b-2 border-white/20 pb-1">Resources</h4>
            <ul className="space-y-2">
              {[
                { href: '/assets/resume.pdf', label: 'Resume' },
                { href: 'mailto:saswatasg@gmail.com', label: 'saswatasg@gmail.com' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('footer', 'resource_link', link.label)} className="text-sm text-white/60 hover:text-white font-medium transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t-2 border-white/10">
          <p className="text-xs font-bold text-white/40">© {currentYear} Saswata S. Sengupta. All rights reserved.</p>

          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: 'https://linkedin.com/in/sss99', label: 'LinkedIn' },
              { icon: Github, href: 'https://github.com/saswatasg', label: 'GitHub' },
              { icon: XIcon, href: 'https://twitter.com/saswatasg', label: 'X (Twitter)' },
            ].map((social) => (
              <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('footer', 'social_icon', social.label)} aria-label={`Visit my ${social.label} profile`} className="text-white/40 hover:text-coral transition-colors border-2 border-transparent hover:border-coral rounded-lg p-1.5">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
