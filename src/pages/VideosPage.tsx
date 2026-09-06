import React, { useState } from 'react';
import { VideoItem } from '../types';
import { VIDEOS_DATA } from '../data/videosData';
import { BRAND_CONTACT_PLACEHOLDERS } from '../data/projectsData';
import { useGallery } from '../context/GalleryContext';
import {
  Video,
  Play,
  X,
  ExternalLink,
  Youtube,
  Clock,
  Sparkles,
  Search,
  Filter,
  Camera,
  MessageCircle
} from 'lucide-react';

export const VideosPage: React.FC = () => {
  const { getPhotoForSlot } = useGallery();
  const youtubePhoto = getPhotoForSlot('youtube');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Videos' },
    { id: 'Solar Builds', label: 'Solar Builds' },
    { id: 'Battery Tests', label: 'Battery Tests' },
    { id: 'Inverter Mods', label: 'Inverter Mods' },
    { id: 'Electronics Teardowns', label: 'Electronics Teardowns' },
    { id: 'DIY Repairs', label: 'DIY Repairs' },
  ];

  const filteredVideos = VIDEOS_DATA.filter((vid) => {
    const catMatch = selectedCategory === 'all' || vid.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const queryMatch =
      !q ||
      vid.title.toLowerCase().includes(q) ||
      vid.summary.toLowerCase().includes(q) ||
      vid.topics.some((t) => t.toLowerCase().includes(q));

    return catMatch && queryMatch;
  });

  return (
    <div className="space-y-12 py-10 sm:py-16 text-slate-200">
      {/* Header with YouTube Workshop Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-500">
              <Video className="h-3.5 w-3.5" />
              <span>SHOP VIDEO DEMONSTRATIONS & TEARDOWNS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Gordylez Tech DIY <span className="text-red-500">Video Demonstrations</span>
            </h1>
            <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
              Watch step-by-step builds, oscilloscope diagnostics, and high-current stress tests recorded live on the workbench. Real lithium chemistry, actual circuit analysis, and verified performance.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={BRAND_CONTACT_PLACEHOLDERS.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-red-600 hover:bg-red-500 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-red-600/20 cursor-pointer"
              >
                <Youtube className="h-4 w-4" />
                <span>YouTube: @{BRAND_CONTACT_PLACEHOLDERS.youtube}</span>
              </a>

              <a
                href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp Workshop</span>
              </a>
            </div>
          </div>

          {/* YouTube & Workshop Photo Card */}
          <div className="lg:col-span-4">
            <div className="relative rounded-xl border border-red-500/30 bg-slate-900/90 p-2.5 shadow-xl group">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-950">
                <img
                  src={youtubePhoto?.url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'}
                  alt={youtubePhoto?.altText || 'Gordylez Tech DIY Video Recording and Testing'}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div className="absolute top-2.5 left-2.5">
                  <span className="flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-mono-code font-bold uppercase text-white shadow-sm">
                    <Youtube className="h-3 w-3" />
                    <span>ON AIR BENCH</span>
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="block text-[10px] font-mono-code font-bold text-amber-400 uppercase">
                    Gordylez Tech DIY
                  </span>
                  <span className="text-xs font-bold text-white line-clamp-1">
                    Solar & Electrical DIY Projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search videos by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm border border-white/10 bg-[#0a0a0c] pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-sm px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'border border-white/10 bg-slate-900/60 text-slate-300 hover:text-white hover:border-amber-500/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm transition-all hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-neutral-950 shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 fill-neutral-950 ml-0.5" />
                  </div>
                </div>

                <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                  <span className="rounded-sm bg-slate-950/90 px-2 py-0.5 text-[10px] font-mono-code text-amber-400 border border-white/10 backdrop-blur-sm">
                    {vid.category}
                  </span>
                </div>

                <div className="absolute bottom-2 right-2.5 flex items-center gap-1 rounded-sm bg-slate-950/90 px-2 py-0.5 text-[10px] font-mono-code text-slate-200 backdrop-blur-sm">
                  <Clock className="h-3 w-3 text-amber-500" />
                  <span>{vid.duration}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {vid.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {vid.summary}
                  </p>

                  {/* Topics Tags */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {vid.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-sm bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono-code text-slate-400 border border-white/5"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] font-mono-code text-slate-400">
                  <span>{vid.viewsPlaceholder}</span>
                  <span className="text-amber-500 font-medium">Watch Preview</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal Preview */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0c]/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative flex flex-col w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-slate-950 px-6 py-4">
              <div className="flex items-center gap-2">
                <Youtube className="h-5 w-5 text-red-500" />
                <span className="text-base font-bold text-white">
                  Gordylez Tech DIY • Video Demonstration
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="rounded-sm p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Simulated Video Player Screen */}
            <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-8 text-center border-b border-white/5 overflow-hidden">
              <img
                src={activeVideo.thumbnailUrl}
                alt={activeVideo.title}
                className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm"
              />
              <div className="relative z-10 space-y-4 max-w-lg">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-neutral-950 shadow-2xl">
                  <Play className="h-8 w-8 fill-neutral-950 ml-1" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-slate-300">
                  Duration: {activeVideo.duration} • Category: {activeVideo.category}
                </p>
                <a
                  href={`https://youtube.com/@${BRAND_CONTACT_PLACEHOLDERS.youtube}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-red-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-red-500 transition-colors cursor-pointer"
                >
                  <Youtube className="h-4 w-4" />
                  <span>Watch on YouTube @{BRAND_CONTACT_PLACEHOLDERS.youtube}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Modal Info */}
            <div className="p-6 space-y-3 bg-slate-900">
              <h4 className="text-sm font-bold text-slate-200">
                Demonstration Overview & Topics Covered:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeVideo.summary}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {activeVideo.topics.map((top, idx) => (
                  <span
                    key={idx}
                    className="rounded-sm border border-white/10 bg-slate-950 px-2.5 py-1 text-xs font-mono-code text-amber-400"
                  >
                    #{top}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
