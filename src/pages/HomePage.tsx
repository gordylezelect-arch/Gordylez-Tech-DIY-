import React from 'react';
import { PageId, Project } from '../types';
import { PROJECTS_DATA, BRAND_INFO, BRAND_CONTACT_PLACEHOLDERS } from '../data/projectsData';
import { TUTORIALS_DATA } from '../data/tutorialsData';
import { VIDEOS_DATA } from '../data/videosData';
import { ProjectCard } from '../components/ProjectCard';
import { SolarCalculator } from '../components/SolarCalculator';
import { ContactSection } from '../components/ContactSection';
import { useGallery } from '../context/GalleryContext';
import {
  Zap,
  ArrowRight,
  Sun,
  BatteryCharging,
  Cpu,
  Wrench,
  Sparkles,
  BookOpen,
  Video,
  Play,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Phone,
  MapPin,
  Youtube,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: Project) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectProject }) => {
  const { getPhotoForSlot, photos } = useGallery();
  const heroPhoto = getPhotoForSlot('hero');
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featured);
  const latestTutorials = TUTORIALS_DATA.slice(0, 3);
  const showcaseVideos = VIDEOS_DATA.slice(0, 3);
  const galleryPreviews = photos.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section with Integrated Personal Photo Showcase */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 lg:pt-20 pb-12 sm:pb-20 border-b border-white/5">
        {/* Ambient Tech Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Top Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-[10px] sm:text-xs uppercase tracking-widest font-bold text-amber-500 mb-6">
                <Zap className="h-3.5 w-3.5 animate-pulse" />
                <span>Next-Gen Energy Solutions • DIY Power Systems</span>
              </div>

              {/* Main Brand Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tighter text-white leading-[1.08]">
                Powering Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  DIY Evolution.
                </span>
              </h1>

              {/* Tagline */}
              <p className="mt-4 text-base sm:text-xl font-semibold text-slate-200">
                GORDYLEZ TECH DIY — {BRAND_INFO.tagline}
              </p>

              {/* Short Description */}
              <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                Professional grade technology tutorials and project demonstrations. From LiFePO4 battery builds to advanced solar arrays, pure sine inverters, and precision electrical repairs.
              </p>

              {/* Hero CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <a
                  id="hero-whatsapp-btn"
                  href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-600/25 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp: {BRAND_CONTACT_PLACEHOLDERS.whatsapp}</span>
                </a>

                <button
                  id="hero-explore-projects-btn"
                  onClick={() => onNavigate('projects')}
                  className="flex items-center gap-2 rounded-sm bg-amber-600 hover:bg-amber-700 text-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-600/20 cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  id="hero-gallery-btn"
                  onClick={() => onNavigate('gallery')}
                  className="flex items-center gap-2 rounded-sm border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 px-5 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  <Camera className="h-4 w-4 text-amber-400" />
                  <span>Photo Archive</span>
                </button>

                <button
                  id="hero-contact-me-btn"
                  onClick={() => onNavigate('contact')}
                  className="flex items-center gap-2 rounded-sm border border-slate-700 hover:border-slate-500 text-white px-5 py-3.5 text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/5 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  <span>Contact Me</span>
                </button>
              </div>

              {/* Location and Phone Tag */}
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-slate-300 font-mono-code bg-slate-900/60 py-2 px-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-purple-300">
                  <MapPin className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                  <span>Location: <strong className="text-white font-semibold">{BRAND_CONTACT_PLACEHOLDERS.location}</strong></span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-2 text-emerald-300">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>WhatsApp: <strong className="text-white font-semibold">{BRAND_CONTACT_PLACEHOLDERS.whatsapp}</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Featured Hero Photo Frame */}
            <div className="lg:col-span-5 w-full max-w-lg mx-auto">
              <div className="relative rounded-2xl border border-amber-500/30 bg-slate-900/90 p-2.5 shadow-2xl shadow-amber-500/10 backdrop-blur-md group">
                {/* Tech corner brackets */}
                <div className="absolute -top-1 -left-1 h-4 w-4 border-t-2 border-l-2 border-amber-500 pointer-events-none" />
                <div className="absolute -top-1 -right-1 h-4 w-4 border-t-2 border-r-2 border-amber-500 pointer-events-none" />
                <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-amber-500 pointer-events-none" />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-amber-500 pointer-events-none" />

                {/* Top Status Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-black/60 rounded-t-xl border-b border-white/5 text-[11px] font-mono-code mb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>WORKSHOP BENCH ACTIVE</span>
                  </span>
                  <span className="text-slate-400">
                    GORDYLEZ TECH DIY
                  </span>
                </div>

                {/* Photo with natural responsive aspect ratio */}
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950 cursor-pointer"
                  onClick={() => onNavigate('gallery')}
                >
                  <img
                    src={heroPhoto?.url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'}
                    alt={heroPhoto?.altText || 'Gordylez Tech DIY Workbench and Solar Systems'}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="inline-block rounded bg-amber-500 px-2.5 py-0.5 text-[10px] font-mono-code font-bold uppercase tracking-wider text-black mb-1.5 shadow-sm">
                      Gordylez Tech DIY
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                      {heroPhoto?.title || 'Electronics Workshop & Power Systems'}
                    </h3>
                    <p className="text-xs text-amber-300/90 font-mono-code line-clamp-1 mt-0.5">
                      {heroPhoto?.caption || 'Solar & Electrical DIY Projects'}
                    </p>
                  </div>
                </div>

                {/* Footer caption strip with direct gallery navigation */}
                <div className="mt-2.5 flex items-center justify-between px-2 pt-1 text-[11px] font-mono-code text-slate-400">
                  <span className="text-slate-500">Abiriba, Abia State</span>
                  <button
                    onClick={() => onNavigate('gallery')}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
                  >
                    <span>Open Photo Archive</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Ticker */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/5">
            {BRAND_INFO.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-bold text-amber-500">
                  {stat.value}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 font-mono-code uppercase tracking-wider mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Engineering Disciplines Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Solar Generators',
              desc: 'Custom-engineered portable solar generators with MPPT charging and Class T safety.',
              icon: Sun,
              targetPage: 'solar-battery' as PageId
            },
            {
              title: 'LiFePO4 Battery Packs',
              desc: 'Prismatic cell builds, mechanical compression fixtures, and smart active BMS harnesses.',
              icon: BatteryCharging,
              targetPage: 'solar-battery' as PageId
            },
            {
              title: 'Inverters & Electronics',
              desc: 'Pure sine wave power stages, MOSFET low RDS(on) upgrades, and oscilloscope tuning.',
              icon: Cpu,
              targetPage: 'inverter-electronics' as PageId
            },
            {
              title: 'DIY Diagnostics & Repairs',
              desc: 'Component-level troubleshooting for blown power electronics, PCB tracing, and testing.',
              icon: Wrench,
              targetPage: 'projects' as PageId
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                onClick={() => onNavigate(item.targetPage)}
                className="group relative rounded-xl border border-white/5 bg-slate-900/50 p-6 transition-all hover:border-amber-500/40 hover:bg-slate-900/80 cursor-pointer"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 group-hover:scale-110 transition-transform mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold text-amber-500 group-hover:text-amber-400">
                  <span>Explore builds</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured DIY Projects Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-500 uppercase tracking-widest mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>HANDS-ON BENCH BLUEPRINTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Featured DIY Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Thoroughly verified builds complete with components BOM, step-by-step assembly logs, and measured bench test data.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All {PROJECTS_DATA.length} Projects</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </section>

      {/* Solar and Battery Section with Interactive Sizing Calculator */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-[10px] uppercase tracking-widest font-bold text-amber-500 mb-3">
            <Sun className="h-3.5 w-3.5" />
            <span>SOLAR GENERATORS & BATTERY CHEMISTRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Off-Grid Solar & LiFePO4 Engineering
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
            From individual prismatic cell assembly and active balancer calibration to high-efficiency MPPT array integration. Use our engineering sizing tool to calculate your system requirements.
          </p>
        </div>

        {/* Embedded Calculator */}
        <SolarCalculator />
      </section>

      {/* Latest Tutorials Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-500 uppercase tracking-widest mb-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>MAKER KNOWLEDGE BASE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Latest Technical Tutorials
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Practical guides on electrical safety, cold weather Voc calculations, Class T fusing, and cell balancing.
            </p>
          </div>

          <button
            onClick={() => onNavigate('tutorials')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Tutorials</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestTutorials.map((tut) => (
            <div
              key={tut.id}
              onClick={() => onNavigate('tutorials')}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-slate-900/50 p-5 transition-all hover:border-amber-500/40 hover:bg-slate-900/80 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-400 mb-3">
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-amber-400 font-medium">{tut.category}</span>
                  <span>{tut.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                  {tut.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {tut.summary}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-amber-500 font-bold">
                <span>Read Full Guide</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop & Field Photo Archive Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-500 uppercase tracking-widest mb-1">
              <Camera className="h-3.5 w-3.5" />
              <span>GORDYLEZ TECH DIY PHOTOGRAPHIC ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Workshop & Field Build Archive
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Authentic visual documentation of actual workbench testing, LiFePO4 battery pack builds, and solar hardware setups.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Explore All Photos ({photos.length})</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryPreviews.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onNavigate('gallery')}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 transition-all hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={photo.url}
                  alt={photo.altText || photo.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="rounded bg-black/80 px-2 py-0.5 text-[10px] font-mono-code font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30">
                    {photo.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="block text-[10px] font-mono-code font-bold text-amber-400 uppercase">
                    Gordylez Tech DIY
                  </span>
                  <span className="text-xs font-bold text-white line-clamp-1">
                    {photo.title}
                  </span>
                </div>
              </div>
              <div className="p-3.5 flex items-center justify-between text-[11px] font-mono-code text-slate-400 border-t border-white/5">
                <span className="line-clamp-1">{photo.caption}</span>
                <ChevronRight className="h-3.5 w-3.5 text-amber-500 shrink-0 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Demonstrations Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-500 uppercase tracking-widest mb-1">
              <Video className="h-3.5 w-3.5" />
              <span>SHOP RECORDINGS & TEARDOWNS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Video Project Demonstrations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Watch step-by-step builds, oscilloscope diagnostics, and high-current stress tests recorded in real time.
            </p>
          </div>

          <button
            onClick={() => onNavigate('videos')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Browse Video Library</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => onNavigate('videos')}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-slate-900/50 transition-all hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/5 cursor-pointer"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0c]">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 fill-black ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 font-mono-code text-[10px] text-slate-200 backdrop-blur-sm">
                  {vid.duration}
                </span>
                <span className="absolute top-2 left-2 rounded bg-slate-900/90 px-2 py-0.5 text-[10px] font-mono-code text-amber-400">
                  {vid.category}
                </span>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {vid.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {vid.summary}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-2.5 text-[11px] text-slate-500 font-mono-code">
                  <span>Channel: @{BRAND_CONTACT_PLACEHOLDERS.youtube}</span>
                  <span className="text-amber-500 font-medium">Watch Video</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Contact Callout Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-amber-600/20 via-slate-900/80 to-[#0a0a0c] p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="font-mono-code text-[11px] uppercase font-bold text-amber-500 tracking-widest">
              HAVE A CUSTOM BUILD OR REPAIR PROJECT?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Need Engineering Advice or Custom DIY Consultation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Reach out directly on WhatsApp ({BRAND_CONTACT_PLACEHOLDERS.whatsapp}) or via our contact form below for assistance with cell top balancing, BMS programming, solar sizing, or inverter fault troubleshooting.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="rounded-sm bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-lg shadow-amber-600/20 cursor-pointer"
            >
              Contact Gordylez
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="rounded-sm border border-slate-700 hover:border-slate-500 text-white px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors hover:bg-white/5 cursor-pointer"
            >
              Browse All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Embedded Clear 'Contact Me' Section on Home Page */}
      <section id="contact-me-section" className="border-t border-white/5 pt-12">
        <ContactSection />
      </section>
    </div>
  );
};
