import React, { useState, useRef } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { SitePhotoSlots, GalleryPhoto, PhotoSlotId, GalleryCategory } from '../../types';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Camera,
  RefreshCw,
  Sliders,
  X,
  ShieldCheck,
  FolderOpen
} from 'lucide-react';

export const AdminGalleryTab: React.FC = () => {
  const {
    photos,
    siteSlots,
    loading,
    uploadPersonalPhoto,
    deletePhoto,
    assignSlotPhoto,
    updatePhoto,
    refreshGallery
  } = useGallery();

  // Upload Form State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCaption, setUploadCaption] = useState('Gordylez Tech DIY — Solar & Electrical DIY Projects');
  const [uploadCategory, setUploadCategory] = useState<GalleryCategory>('workshop');
  const [uploadSlot, setUploadSlot] = useState<PhotoSlotId | ''>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Slot Management Feedback
  const [slotStatusMsg, setSlotStatusMsg] = useState<string | null>(null);

  // Gallery Filter State
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle File Select
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setUploadError(null);
    setUploadSuccess(null);

    // Default title from file name without extension
    if (!uploadTitle) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
      setUploadTitle(cleanName);
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Submit Upload
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadError('Please select a photo from your device first.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      await uploadPersonalPhoto(selectedFile, {
        title: uploadTitle.trim() || 'Gordylez Tech DIY Workshop Build',
        caption: uploadCaption.trim(),
        category: uploadCategory,
        slot: uploadSlot ? (uploadSlot as PhotoSlotId) : undefined
      });

      setUploadSuccess(`Photo "${uploadTitle}" uploaded successfully to your workshop archive!`);
      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setUploadTitle('');
      setUploadSlot('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload photo. Please check file size and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Assign photo to a specific site slot
  const handleAssignSlot = async (slotKey: keyof SitePhotoSlots, photoId: string) => {
    try {
      await assignSlotPhoto(slotKey, photoId);
      setSlotStatusMsg(`Updated "${slotKey.toUpperCase()}" section photo.`);
      setTimeout(() => setSlotStatusMsg(null), 3000);
    } catch (err: any) {
      setSlotStatusMsg(`Failed to update slot: ${err.message}`);
    }
  };

  // Delete photo
  const handleDelete = async (photo: GalleryPhoto) => {
    if (window.confirm(`Are you sure you want to delete "${photo.title}"?`)) {
      try {
        await deletePhoto(photo.id);
        setUploadSuccess(`Photo "${photo.title}" removed.`);
        setTimeout(() => setUploadSuccess(null), 3000);
      } catch (err: any) {
        setUploadError(`Failed to delete photo: ${err.message}`);
      }
    }
  };

  // Filtered photos
  const filteredPhotos = photos.filter((p) => {
    const catMatch = categoryFilter === 'all' || p.category === categoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const queryMatch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.caption && p.caption.toLowerCase().includes(q)) ||
      (p.slot && p.slot.toLowerCase().includes(q));
    return catMatch && queryMatch;
  });

  const slotDefinitions: Array<{ key: keyof SitePhotoSlots; label: string; desc: string }> = [
    { key: 'hero', label: 'Hero / Home Section', desc: 'Main brand photo on the front page workbench frame' },
    { key: 'about', label: 'About Me Section', desc: 'Engineer bio and credentials profile photo' },
    { key: 'projects', label: 'Projects / DIY Section', desc: 'Hardware workshop header in blueprints catalog' },
    { key: 'youtube', label: 'YouTube / Video Section', desc: 'Workbench recording setup on demonstrations page' },
    { key: 'contact', label: 'Contact Section', desc: 'Workshop laboratory card on inquiries section' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner Notice */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Camera className="h-4 w-4" />
            <span>Personal Photos & Workshop Gallery Management</span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl">
            Upload your real personal photos directly into your workshop archive. Photos are preserved in their original resolution and natural appearance with zero AI face generation or artificial alteration.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refreshGallery()}
            className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Archive</span>
          </button>
        </div>
      </div>

      {/* Two Column Section: 1) Upload Form, 2) Slot Mapping Controller */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Upload Real Photo Card */}
        <div className="lg:col-span-6 rounded-xl border border-white/10 bg-[#0e0e13] p-5 sm:p-6 space-y-5">
          <div className="border-b border-white/5 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="h-4 w-4 text-amber-500" />
              <span>Upload Personal Photo</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select or drop any photo from your phone or computer.
            </p>
          </div>

          {uploadSuccess && (
            <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {uploadError && (
            <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
              <span>{uploadError}</span>
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-4">
            {/* Drag and Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                selectedFile
                  ? 'border-amber-500 bg-amber-500/5'
                  : 'border-white/10 hover:border-amber-500/50 hover:bg-slate-900/40 bg-[#141419]'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              {previewUrl ? (
                <div className="w-full space-y-3 text-center">
                  <div className="relative aspect-[16/10] max-h-48 mx-auto overflow-hidden rounded-lg border border-white/10 bg-black">
                    <img
                      src={previewUrl}
                      alt="Upload Preview"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="text-xs font-mono-code text-amber-400">
                    {selectedFile?.name} ({((selectedFile?.size || 0) / 1024 / 1024).toFixed(2)} MB)
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="inline-block text-[11px] text-slate-400 hover:text-white underline"
                  >
                    Click to choose a different photo
                  </button>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Camera className="h-6 w-6" />
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    Click to browse or drag & drop photo here
                  </div>
                  <p className="text-[11px] text-slate-500">
                    JPG, PNG, WebP or HEIC supported
                  </p>
                </div>
              )}
            </div>

            {/* Photo Metadata Inputs */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Gordylez Tech DIY Workbench & Solar Setup"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#141419] py-2 px-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Caption / Description
                </label>
                <input
                  type="text"
                  placeholder="e.g., Solar & Electrical DIY Projects"
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#141419] py-2 px-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                    Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as GalleryCategory)}
                    className="w-full rounded-lg border border-white/10 bg-[#141419] py-2 px-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="workshop">Workshop & Bench</option>
                    <option value="solar-battery">Solar & Battery Packs</option>
                    <option value="inverters">Inverters & Electronics</option>
                    <option value="field-builds">Field Deployments</option>
                    <option value="youtube">YouTube Demonstrations</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-amber-400">
                    Assign Directly to Slot
                  </label>
                  <select
                    value={uploadSlot}
                    onChange={(e) => setUploadSlot(e.target.value as PhotoSlotId | '')}
                    className="w-full rounded-lg border border-amber-500/30 bg-[#141419] py-2 px-3 text-xs sm:text-sm text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="">None (Gallery Only)</option>
                    <option value="hero">Hero / Home Section</option>
                    <option value="about">About Me Section</option>
                    <option value="projects">Projects / DIY Section</option>
                    <option value="youtube">YouTube / Video Section</option>
                    <option value="contact">Contact Section</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-500 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white transition-all shadow-md shadow-amber-600/20 disabled:opacity-50 cursor-pointer"
            >
              {isUploading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Uploading to Workshop Archive...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Save Photo to Workshop Archive</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Slot Assignment Controller Card */}
        <div className="lg:col-span-6 rounded-xl border border-white/10 bg-[#0e0e13] p-5 sm:p-6 space-y-5">
          <div className="border-b border-white/5 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-amber-500" />
                <span>Website Slot Placements</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose which photo appears in each key area of the website.
              </p>
            </div>
            {slotStatusMsg && (
              <span className="text-[11px] font-mono-code text-emerald-400 animate-fade-in">
                {slotStatusMsg}
              </span>
            )}
          </div>

          <div className="space-y-3.5">
            {slotDefinitions.map((slot) => {
              const assignedPhotoId = siteSlots[slot.key];
              const assignedPhoto = photos.find((p) => p.id === assignedPhotoId);

              return (
                <div
                  key={slot.key}
                  className="rounded-lg border border-white/5 bg-[#141419] p-3 transition-colors hover:border-white/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Photo Thumbnail */}
                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded border border-white/10 bg-slate-950">
                        {assignedPhoto ? (
                          <img
                            src={assignedPhoto.url}
                            alt={assignedPhoto.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-600 font-mono-code">
                            Default
                          </div>
                        )}
                      </div>

                      {/* Slot Description */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white uppercase tracking-wide">
                            {slot.label}
                          </span>
                          <span className="rounded bg-amber-500/10 px-1.5 py-0.2 text-[9px] font-mono-code text-amber-400 border border-amber-500/20">
                            {slot.key}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                          {assignedPhoto ? assignedPhoto.title : slot.desc}
                        </p>
                      </div>
                    </div>

                    {/* Selector */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <select
                        value={assignedPhotoId || ''}
                        onChange={(e) => handleAssignSlot(slot.key, e.target.value)}
                        className="rounded border border-white/10 bg-[#0e0e13] py-1.5 px-2.5 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="">-- Select Photo --</option>
                        {photos.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} ({p.category})
                          </option>
                        ))}
                      </select>
                      {assignedPhotoId && (
                        <button
                          onClick={() => handleAssignSlot(slot.key, '')}
                          className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                          title="Clear slot"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>Slot changes apply instantly across public pages (Hero, About, Projects, YouTube, Contact).</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Full Workshop Photo Library Archive */}
      <div className="rounded-xl border border-white/10 bg-[#0e0e13] p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-amber-500" />
              <span>Workshop Photo Archive Library ({photos.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              All stored photos from your workshop builds, lithium testing, and inverter electronics.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search photo title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#141419] py-1.5 px-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-white/10 bg-[#141419] py-1.5 px-3 text-xs text-slate-300 focus:border-amber-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="workshop">Workshop & Bench</option>
              <option value="solar-battery">Solar & Battery Packs</option>
              <option value="inverters">Inverters & Electronics</option>
              <option value="field-builds">Field Deployments</option>
              <option value="youtube">YouTube Demonstrations</option>
            </select>
          </div>
        </div>

        {/* Photo Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No photos found matching criteria. Upload a photo above to populate the archive.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#141419] transition-all hover:border-amber-500/40"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={photo.url}
                    alt={photo.altText || photo.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="rounded bg-black/80 px-2 py-0.5 text-[9px] font-mono-code font-bold uppercase tracking-wider text-amber-400 border border-amber-500/30 backdrop-blur-sm">
                      {photo.category}
                    </span>
                    {photo.slot && (
                      <span className="rounded bg-emerald-600 px-2 py-0.5 text-[9px] font-mono-code font-bold uppercase text-white shadow-sm">
                        {photo.slot} slot
                      </span>
                    )}
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {photo.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {photo.caption || 'Gordylez Tech DIY'}
                    </p>
                  </div>

                  {/* Actions Strip */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                    {/* Slot quick assignment */}
                    <select
                      value={photo.slot || ''}
                      onChange={(e) => {
                        const newSlot = e.target.value as PhotoSlotId | '';
                        if (newSlot) {
                          updatePhoto(photo.id, { slot: newSlot });
                          if (['hero', 'about', 'projects', 'youtube', 'contact'].includes(newSlot)) {
                            assignSlotPhoto(newSlot as keyof SitePhotoSlots, photo.id);
                          }
                        } else {
                          updatePhoto(photo.id, { slot: undefined });
                        }
                      }}
                      className="rounded border border-white/10 bg-[#0e0e13] py-1 px-1.5 text-[10px] text-slate-300"
                    >
                      <option value="">Slot: None</option>
                      <option value="hero">Slot: Hero</option>
                      <option value="about">Slot: About</option>
                      <option value="projects">Slot: Projects</option>
                      <option value="youtube">Slot: YouTube</option>
                      <option value="contact">Slot: Contact</option>
                    </select>

                    <button
                      onClick={() => handleDelete(photo)}
                      className="p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
