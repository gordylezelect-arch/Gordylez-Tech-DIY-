import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { GalleryCategory, GalleryPhoto, PageId } from '../types';
import {
  Camera,
  Image as ImageIcon,
  ZoomIn,
  X,
  ExternalLink,
  MessageCircle,
  Tag,
  Calendar,
  Sparkles,
  Zap,
  Filter
} from 'lucide-react';
import { BRAND_CONTACT_PLACEHOLDERS } from '../data/projectsData';

interface GalleryPageProps {
  onNavigate?: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { photos, loading } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories: { id: GalleryCategory; label: string }[] = [
    { id: 'all', label: 'All Showcase' },
    { id: 'workshop', label: 'Workshop Bench' },
    { id: 'solar-battery', label: 'Solar & Battery' },
    { id: 'inverters', label: 'Inverters & Power' },
    { id: 'field-builds', label: 'Field Deployments' },
    { id: 'youtube', label: 'YouTube Studio' }
  ];

  const filteredPhotos = photos.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="space-y-12 py-10 sm:py-16 text-slate-200">
      {/* Page Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-500">
              <Camera className="h-3.5 w-3.5" />
              <span>GORDYLEZ TECH DIY GALLERY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Workshop & Field <span className="text-amber-500">Photo Archive</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Authentic visual documentation of custom LiFePO4 battery builds, high-power solar generators, pure sine inverter bench tests, and field deployments. Real projects, verified engineering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Consult on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono-code mr-2">
            <Filter className="h-3.5 w-3.5 text-amber-500" />
            <span>Filter:</span>
          </span>
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? photos.length
                : photos.filter((p) => p.category === cat.id).length;
            const active = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 rounded-sm px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                  active
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-300 border border-white/5 hover:border-amber-500/30 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    active ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent mb-3" />
            <p className="text-xs font-mono-code">Loading Gordylez Tech DIY photo gallery...</p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-slate-900/30 p-12 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-slate-600 mb-3" />
            <h3 className="text-base font-bold text-white">No photos found in this category</h3>
            <p className="text-xs text-slate-400 mt-1">
              Select another category or upload new photos from the Admin Dashboard.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => {
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhoto(photo)}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer"
                >
                  {/* Image Container with responsive natural aspect ratio */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                    <img
                      src={photo.url}
                      alt={photo.altText || photo.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Protection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Hover Zoom Icon */}
                    <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="h-4 w-4 text-amber-400" />
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 rounded bg-black/70 px-2.5 py-1 text-[10px] font-mono-code font-bold uppercase tracking-wider text-amber-400 backdrop-blur-sm border border-amber-500/30">
                        <Tag className="h-3 w-3" />
                        <span>{photo.category.replace('-', ' ')}</span>
                      </span>
                    </div>

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[11px] font-mono-code font-bold text-amber-300 tracking-wider">
                        Gordylez Tech DIY
                      </span>
                      {photo.slot && photo.slot !== 'gallery' && (
                        <span className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[9px] font-mono-code uppercase font-bold text-amber-400">
                          Slot: {photo.slot}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Caption & Title Footer */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {photo.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed font-mono-code">
                        {photo.caption}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono-code">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-600" />
                        <span>
                          {photo.dateAdded
                            ? new Date(photo.dateAdded).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short'
                              })
                            : 'Verified Build'}
                        </span>
                      </span>

                      <span className="text-amber-500 font-semibold flex items-center gap-1">
                        <span>Enlarge</span>
                        <ZoomIn className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col rounded-2xl border border-white/10 bg-[#0d0d12] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-slate-900/80">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-ping" />
                <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-amber-400">
                  GORDYLEZ TECH DIY • PHOTOGRAPHIC ARCHIVE
                </span>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="rounded-full bg-white/10 p-1.5 text-slate-300 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Image in full fidelity */}
            <div className="relative flex-1 bg-black flex items-center justify-center p-2 min-h-[300px] max-h-[65vh] overflow-hidden">
              <img
                src={activePhoto.url}
                alt={activePhoto.altText || activePhoto.title}
                className="max-h-[62vh] max-w-full object-contain rounded-lg"
              />
            </div>

            {/* Footer with Captions & Actions */}
            <div className="border-t border-white/10 bg-[#0d0d12] p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">
                    {activePhoto.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-400 font-mono-code mt-0.5">
                    {activePhoto.caption}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono-code pt-2 border-t border-white/5">
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5 text-amber-500" />
                  <span>Category: {activePhoto.category}</span>
                </span>
                {activePhoto.slot && (
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    <span>Site Placement: {activePhoto.slot}</span>
                  </span>
                )}
                <span>Abiriba, Abia State, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
