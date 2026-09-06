import React from 'react';
import { PageId } from '../types';
import { BRAND_CONTACT_PLACEHOLDERS } from '../data/projectsData';
import {
  Zap,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Github,
  ShieldCheck,
  ChevronRight,
  Lock
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0c] text-slate-300">
      {/* Top Banner with Quick Contact Highlights */}
      <div className="border-b border-white/5 bg-slate-900/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">
                GORDYLEZ TECH DIY WORKSHOP
              </h4>
              <p className="text-xs text-slate-400 max-w-md mt-0.5">
                Verified high-current battery builds, pure sine inverter engineering, and off-grid solar solutions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp: <strong className="font-mono-code font-bold">{BRAND_CONTACT_PLACEHOLDERS.whatsapp}</strong></span>
            </a>
            <a
              href={BRAND_CONTACT_PLACEHOLDERS.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-sm border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
            >
              <Youtube className="h-4 w-4 text-red-500" />
              <span>YouTube: {BRAND_CONTACT_PLACEHOLDERS.youtube}</span>
            </a>
            <button
              onClick={() => handleNav('contact')}
              className="flex items-center gap-2 rounded-sm bg-amber-600 hover:bg-amber-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer shadow-sm"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Form</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-amber-500 rounded-md flex items-center justify-center font-bold text-black text-sm shadow-sm">
                G
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                GORDYLEZ <span className="text-amber-500">TECH DIY</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated to hands-on engineering tutorials, custom solar generators, LiFePO4 battery pack builds, pure sine inverter repairs, and electronics diagnostics.
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={`https://youtube.com/@${BRAND_CONTACT_PLACEHOLDERS.youtube}`}
                target="_blank"
                rel="noreferrer"
                title="YouTube Channel"
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 bg-slate-900/70 text-slate-400 hover:border-red-500/40 hover:text-red-400 transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                title="Facebook Page"
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 bg-slate-900/70 text-slate-400 hover:border-blue-500/40 hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                title="Instagram Profile"
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 bg-slate-900/70 text-slate-400 hover:border-pink-500/40 hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                title="X (Twitter)"
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 bg-slate-900/70 text-slate-400 hover:border-white/30 hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                title="GitHub Repositories"
                className="flex h-8 w-8 items-center justify-center rounded-sm border border-white/10 bg-slate-900/70 text-slate-400 hover:border-white/30 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Website Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Gordylez' },
                { id: 'projects', label: 'DIY Project Blueprints' },
                { id: 'solar-battery', label: 'Solar & Battery Builds' },
                { id: 'inverter-electronics', label: 'Inverters & Electronics' },
                { id: 'tutorials', label: 'Technical Tutorials' },
                { id: 'videos', label: 'Video Demonstrations' },
                { id: 'gallery', label: 'Photo Archive & Gallery' },
                { id: 'contact', label: 'Contact & Inquiries' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id as PageId)}
                    className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-3 w-3 text-slate-600" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tech Focus Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Engineering Disciplines
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Solar Generators',
                'LiFePO4 Chemistry',
                'JK / Daly Smart BMS',
                'Pure Sine Inverters',
                'MPPT Controllers',
                'MOSFET Upgrades',
                'Bench Power Supplies',
                'Class T Fusing',
                'Active Balancing',
                'DIY Repairs',
                'Oscilloscope Tracing',
                'Off-Grid Power',
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-white/5 bg-slate-900/60 px-2 py-1 text-[11px] text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Channels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">
              Direct Contact & Channels
            </h4>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">WhatsApp</span>
                  <a
                    href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono-code text-white hover:text-emerald-400 font-bold transition-colors"
                  >
                    {BRAND_CONTACT_PLACEHOLDERS.whatsapp}
                  </a>
                  <span className="block text-[10px] text-slate-400 font-mono-code">{BRAND_CONTACT_PLACEHOLDERS.whatsappFormatted}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Phone Line</span>
                  <a
                    href={BRAND_CONTACT_PLACEHOLDERS.phoneTelLink}
                    className="font-mono-code text-slate-200 hover:text-amber-400 font-semibold transition-colors"
                  >
                    {BRAND_CONTACT_PLACEHOLDERS.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Email</span>
                  <a
                    href={`mailto:${BRAND_CONTACT_PLACEHOLDERS.email}`}
                    className="font-mono-code text-slate-300 hover:text-blue-400 transition-colors break-all"
                  >
                    {BRAND_CONTACT_PLACEHOLDERS.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Location</span>
                  <span className="text-white font-medium">{BRAND_CONTACT_PLACEHOLDERS.location}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Youtube className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider">YouTube</span>
                  <a
                    href={BRAND_CONTACT_PLACEHOLDERS.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-400 hover:text-red-300 font-semibold transition-colors"
                  >
                    {BRAND_CONTACT_PLACEHOLDERS.youtube}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Safety Disclaimer & Copyright */}
        <div className="mt-12 border-t border-white/5 pt-6">
          <div className="flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} <strong className="text-slate-300">Gordylez Tech DIY</strong>. All rights reserved. Built for off-grid builders & electronics makers.
            </p>
            <p className="text-[11px] text-slate-500 max-w-xl">
              <strong className="text-amber-500">Safety Notice:</strong> High-voltage DC and lithium battery systems involve dangerous currents and stored chemical energy. Always employ proper fuses, insulated tools, and follow local electrical codes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
