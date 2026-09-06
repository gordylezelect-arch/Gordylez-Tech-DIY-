import React, { useState } from 'react';
import { BRAND_CONTACT_PLACEHOLDERS } from '../data/projectsData';
import { useGallery } from '../context/GalleryContext';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  Github,
  Copy,
  ExternalLink,
  ShieldCheck,
  Zap,
  Camera
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { getPhotoForSlot } = useGallery();
  const contactPhoto = getPhotoForSlot('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectCategory: 'solar-generator',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setSubmitting(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectCategory: formData.projectCategory,
          message: formData.message.trim()
        })
      });
    } catch (err) {
      console.error('Failed to submit inquiry to server:', err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const projectCategories = [
    { value: 'solar-generator', label: 'Solar Generator / Power Station' },
    { value: 'lifepo4-battery', label: 'Custom LiFePO4 / Battery Build' },
    { value: 'inverter-repair', label: 'Inverter Modification or Repair' },
    { value: 'solar-sizing', label: 'Solar Array & Sizing Consultation' },
    { value: 'electronics-diy', label: 'Electronics & Bench Project' },
    { value: 'collaboration', label: 'Brand Collaboration / Tutorial Request' },
  ];

  return (
    <section id="contact-section" className="py-12 sm:py-16 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-500 mb-3">
            <Zap className="h-3.5 w-3.5" />
            <span>DIRECT WORKSHOP INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Get In Touch With <span className="text-amber-500">Gordylez Tech DIY</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Have questions about custom solar generators, LiFePO4 battery pack builds, inverter repairs, or collaboration opportunities? Reach out via WhatsApp, phone, email, or our direct inquiry form.
          </p>
        </div>

        {/* Notice & Direct Workshop Contact Highlights */}
        <div className="mb-10 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 sm:p-5 text-xs text-slate-300 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/30 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                Official Workshop Contact • Abiriba, Abia State, Nigeria
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Reach Gordylez Tech DIY directly for off-grid power consultation, LiFePO4 battery builds, and inverter repairs.
              </p>
            </div>
          </div>
          <a
            href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shadow-emerald-600/20 shrink-0 cursor-pointer"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Direct Channels & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-3 flex items-center justify-between">
                <span>Direct Channels</span>
                <span className="text-[11px] font-normal text-amber-400 font-mono-code">Fastest Response</span>
              </h3>

              <div className="space-y-4">
                {/* WhatsApp */}
                <div className="group rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 transition-all hover:border-emerald-500/60">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/40">
                        <MessageCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono-code uppercase tracking-wider text-emerald-400 font-semibold">
                          WhatsApp Direct Chat
                        </span>
                        <a
                          href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono-code text-sm font-bold text-white hover:text-emerald-300 transition-colors"
                        >
                          {BRAND_CONTACT_PLACEHOLDERS.whatsapp}
                        </a>
                        <span className="block text-[10px] text-slate-400 font-mono-code">
                          {BRAND_CONTACT_PLACEHOLDERS.whatsappFormatted}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyToClipboard(BRAND_CONTACT_PLACEHOLDERS.whatsapp, 'whatsapp')}
                        className="p-1.5 rounded text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                        title="Copy WhatsApp number"
                      >
                        {copiedField === 'whatsapp' ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-emerald-500/20 flex justify-end">
                    <a
                      href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>Open WhatsApp Chat</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="group rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-4 transition-all hover:border-amber-500/40">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/30">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-500">
                          Phone Call / Direct Line
                        </span>
                        <a
                          href={BRAND_CONTACT_PLACEHOLDERS.phoneTelLink}
                          className="font-mono-code text-sm font-bold text-slate-200 hover:text-amber-400 transition-colors"
                        >
                          {BRAND_CONTACT_PLACEHOLDERS.phone}
                        </a>
                        <span className="block text-[10px] text-slate-400 font-mono-code">
                          {BRAND_CONTACT_PLACEHOLDERS.phoneFormatted}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => copyToClipboard(BRAND_CONTACT_PLACEHOLDERS.phone, 'phone')}
                        className="p-1.5 rounded text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                        title="Copy Phone number"
                      >
                        {copiedField === 'phone' ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/5 flex justify-end">
                    <a
                      href={BRAND_CONTACT_PLACEHOLDERS.phoneTelLink}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      <span>Call {BRAND_CONTACT_PLACEHOLDERS.phone}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="group rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-4 transition-all hover:border-blue-500/40">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-500">
                          Official Email
                        </span>
                        <a
                          href={`mailto:${BRAND_CONTACT_PLACEHOLDERS.email}`}
                          className="font-mono-code text-xs sm:text-sm font-semibold text-slate-200 hover:text-blue-400 transition-colors break-all"
                        >
                          {BRAND_CONTACT_PLACEHOLDERS.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(BRAND_CONTACT_PLACEHOLDERS.email, 'email')}
                      className="p-1.5 rounded text-slate-400 hover:text-blue-400 transition-colors cursor-pointer"
                      title="Copy email"
                    >
                      {copiedField === 'email' ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/30">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono-code uppercase tracking-wider text-purple-400 font-semibold">
                        Workshop Headquarters & Location
                      </span>
                      <span className="font-semibold text-sm text-white">
                        {BRAND_CONTACT_PLACEHOLDERS.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-white/5">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  YouTube & Social Media
                </span>
                <div className="space-y-2">
                  <a
                    href={BRAND_CONTACT_PLACEHOLDERS.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-sm border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300 hover:bg-red-500/20 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Youtube className="h-4 w-4 text-red-500" />
                      <span className="font-semibold">YouTube: {BRAND_CONTACT_PLACEHOLDERS.youtube}</span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`https://facebook.com/${BRAND_CONTACT_PLACEHOLDERS.facebook}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#0a0a0c] p-2 text-xs text-slate-300 hover:border-blue-500/40 hover:text-blue-400 transition-colors"
                    >
                      <Facebook className="h-4 w-4 text-blue-500" />
                      <span className="truncate">Facebook</span>
                    </a>
                    <a
                      href={`https://instagram.com/${BRAND_CONTACT_PLACEHOLDERS.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#0a0a0c] p-2 text-xs text-slate-300 hover:border-pink-500/40 hover:text-pink-400 transition-colors"
                    >
                      <Instagram className="h-4 w-4 text-pink-500" />
                      <span className="truncate">Instagram</span>
                    </a>
                    <a
                      href={`https://x.com/${BRAND_CONTACT_PLACEHOLDERS.xTwitter}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#0a0a0c] p-2 text-xs text-slate-300 hover:border-white/30 hover:text-white transition-colors"
                    >
                      <Twitter className="h-4 w-4 text-slate-300" />
                      <span className="truncate">X (Twitter)</span>
                    </a>
                    <a
                      href={`https://github.com/${BRAND_CONTACT_PLACEHOLDERS.github}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-sm border border-white/10 bg-[#0a0a0c] p-2 text-xs text-slate-300 hover:border-white/30 hover:text-white transition-colors"
                    >
                      <Github className="h-4 w-4 text-slate-300" />
                      <span className="truncate">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Workshop & Bench Photo Card */}
            <div className="rounded-xl border border-amber-500/30 bg-slate-900/70 p-3 shadow-xl backdrop-blur-sm group">
              <div className="flex items-center justify-between px-2 py-1 bg-black/50 rounded-t-lg border-b border-white/5 text-[10px] font-mono-code mb-2">
                <span className="text-amber-400 font-bold uppercase">Gordylez Tech DIY Workshop</span>
                <span className="text-emerald-400">● ABIRIBA HQ</span>
              </div>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-950">
                <img
                  src={contactPhoto?.url || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'}
                  alt={contactPhoto?.altText || 'Gordylez Tech DIY Workshop and Engineering Lab'}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="block text-[10px] font-mono-code font-bold text-amber-400 uppercase">
                    Gordylez Tech DIY
                  </span>
                  <span className="text-xs font-bold text-white line-clamp-1">
                    Solar & Electrical DIY Projects
                  </span>
                </div>
              </div>
              <p className="mt-2 text-[11px] font-mono-code text-slate-400 text-center">
                Engineering lab, battery assembly & technical consultations.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-1">
                Send a Message or Project Request
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in your project details and our workshop will review your request.
              </p>

              {submitted ? (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      Inquiry Received!
                    </h4>
                    <p className="mt-1 text-xs text-slate-300 max-w-md mx-auto">
                      Thank you, <strong className="text-emerald-400">{formData.name}</strong>. Your project inquiry regarding{' '}
                      <span className="text-amber-400">{projectCategories.find(c => c.value === formData.projectCategory)?.label}</span> has been simulated and prepared.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <a
                      href={`https://wa.me/2348067465492?text=${encodeURIComponent(
                        `Hello Gordylez Tech DIY, my name is ${formData.name} (${formData.email}). Regarding ${
                          projectCategories.find((c) => c.value === formData.projectCategory)?.label || 'project'
                        }: ${formData.message}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Send to WhatsApp (08067465492)</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', projectCategory: 'solar-generator', message: '' });
                      }}
                      className="rounded-sm bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-sm border border-white/10 bg-[#0a0a0c] px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. alex@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-sm border border-white/10 bg-[#0a0a0c] px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-1">
                      Project Category
                    </label>
                    <select
                      value={formData.projectCategory}
                      onChange={(e) => setFormData({ ...formData, projectCategory: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-[#0a0a0c] px-3.5 py-2.5 text-slate-100 focus:border-amber-500 focus:outline-none transition-colors cursor-pointer"
                    >
                      {projectCategories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-1">
                      Message / Project Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your project, specs required, questions, or components you're trying to integrate..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-sm border border-white/10 bg-[#0a0a0c] px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-amber-600 hover:bg-amber-700 py-3 text-xs font-bold uppercase tracking-wider text-white active:scale-98 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    {submitting ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Transmit Message to Workshop</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
