import React from 'react';
import { PageId } from '../types';
import { BRAND_INFO, BRAND_CONTACT_PLACEHOLDERS } from '../data/projectsData';
import { useGallery } from '../context/GalleryContext';
import {
  Zap,
  ShieldCheck,
  Cpu,
  Wrench,
  Sun,
  Battery,
  Activity,
  Award,
  CheckCircle2,
  Terminal,
  ArrowRight,
  MessageCircle,
  MapPin,
  Camera
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { getPhotoForSlot } = useGallery();
  const aboutPhoto = getPhotoForSlot('about');

  return (
    <div className="space-y-16 py-10 sm:py-16 text-slate-200">
      {/* Header Banner & Engineer Profile */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Bio & Mission */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-500">
              <Zap className="h-3.5 w-3.5" />
              <span>THE BUILDER & ENGINEER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Engineering Hands-On <span className="text-amber-500">Off-Grid Energy</span> & Hardware
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {BRAND_INFO.fullBio}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat with Gordylez</span>
              </a>

              <button
                onClick={() => onNavigate('gallery')}
                className="flex items-center gap-2 rounded-sm border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Camera className="h-4 w-4 text-amber-400" />
                <span>View Workshop Photos</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-code text-slate-400">
              <span className="flex items-center gap-1.5 text-purple-300">
                <MapPin className="h-3.5 w-3.5 text-purple-400" />
                <span>{BRAND_CONTACT_PLACEHOLDERS.location}</span>
              </span>
              <span>•</span>
              <span className="text-slate-400">Hardware & Power Specialist</span>
            </div>
          </div>

          {/* Right: Personal Photo Card */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="relative rounded-2xl border border-amber-500/40 bg-slate-900/90 p-3 shadow-2xl shadow-amber-500/10 backdrop-blur-md group">
              {/* Corner Tech Accents */}
              <div className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-amber-500" />
              <div className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-amber-500" />
              <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-amber-500" />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-amber-500" />

              {/* Top Banner */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-black/60 rounded-t-xl border-b border-white/5 text-[11px] font-mono-code mb-2">
                <span className="text-amber-400 font-bold">GORDYLEZ TECH DIY</span>
                <span className="text-emerald-400">● VERIFIED ENGINEER</span>
              </div>

              {/* Authentic Photo */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950 cursor-pointer"
                onClick={() => onNavigate('gallery')}
              >
                <img
                  src={aboutPhoto?.url || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80'}
                  alt={aboutPhoto?.altText || 'Gordylez Tech DIY - Engineer and Hardware Specialist'}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                {/* Overlaid Captions */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block rounded bg-amber-500 px-2 py-0.5 text-[10px] font-mono-code font-bold uppercase tracking-wider text-black mb-1">
                    Gordylez Tech DIY
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {aboutPhoto?.title || 'Solar & Electrical DIY Projects'}
                  </h3>
                  <p className="text-xs text-amber-300 font-mono-code line-clamp-1">
                    {aboutPhoto?.caption || 'Solar & Electrical DIY Projects'}
                  </p>
                </div>
              </div>

              {/* Sub-strip */}
              <div className="mt-2.5 flex items-center justify-between px-2 pt-1 text-[11px] font-mono-code text-slate-400">
                <span>Direct Engineering Bench</span>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="text-amber-400 hover:text-amber-300 font-semibold"
                >
                  Full Photo Archive →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Mission & Philosophy */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why We Build: The DIY Engineering Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Off-the-shelf power stations and commercial lithium systems are often overpriced, sealed against repair, and built with questionable component choices. At <strong>Gordylez Tech DIY</strong>, we believe true energy independence comes from understanding every connection, every fuse rating, and every transistor.
            </p>
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Zero Guesswork, 100% Verified Bench Data:</strong> We measure actual capacity, thermal rise under load, and oscilloscope harmonic distortion for every build.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Modular & Field-Repairable:</strong> Using standardized Anderson connectors, DIN rail breakers, and off-the-shelf BMS modules ensures our builds can be serviced anywhere in the field.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Uncompromising Safety Standards:</strong> From Class T fuses rated for 20,000A AIC to spring-calibrated cell compression fixtures, safety is engineered into every blueprint.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="text-lg font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="h-5 w-5" />
              <span>Workshop Bench Equipment</span>
            </h3>
            <ul className="space-y-3 text-xs text-slate-300 font-mono-code divide-y divide-white/5">
              <li className="pt-2 flex justify-between">
                <span className="text-slate-400">Internal Resistance Testing:</span>
                <span className="text-amber-400 font-semibold">RC3563 4-Wire AC Milliohm Meter</span>
              </li>
              <li className="pt-2 flex justify-between">
                <span className="text-slate-400">Signal Tracing & Waveform:</span>
                <span className="text-amber-400 font-semibold">100MHz 4-Ch Digital Storage Scope</span>
              </li>
              <li className="pt-2 flex justify-between">
                <span className="text-slate-400">Load Bank Capacity Analysis:</span>
                <span className="text-amber-400 font-semibold">150A Precision DC Electronic Load</span>
              </li>
              <li className="pt-2 flex justify-between">
                <span className="text-slate-400">Thermal Imaging & Hotspots:</span>
                <span className="text-amber-400 font-semibold">FLIR High-Resolution Thermal Imager</span>
              </li>
              <li className="pt-2 flex justify-between">
                <span className="text-slate-400">High-Current Cable Crimp:</span>
                <span className="text-amber-400 font-semibold">10-Ton Hydraulic Hex Die Press</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          Our Primary Focus Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRAND_INFO.corePillars.map((pillar, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 space-y-3 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Build Your Own Off-Grid System?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore our complete project blueprints, read through technical tutorials, or connect directly with Gordylez Tech DIY for personalized advice.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center gap-2 rounded-sm bg-amber-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-amber-700 transition-colors cursor-pointer"
            >
              <span>Explore DIY Projects</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="rounded-sm border border-white/10 bg-slate-900 px-6 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:border-amber-500/40 hover:text-white transition-colors cursor-pointer"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
