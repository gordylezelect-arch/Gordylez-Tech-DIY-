import React, { useState } from 'react';
import { Tutorial } from '../types';
import { TUTORIALS_DATA } from '../data/tutorialsData';
import {
  BookOpen,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  Share2,
  Check,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const TutorialsPage: React.FC = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'Solar Systems', label: 'Solar Systems' },
    { id: 'Batteries & BMS', label: 'Batteries & BMS' },
    { id: 'Inverters', label: 'Inverters' },
    { id: 'Tools & Safety', label: 'Tools & Safety' },
  ];

  const filteredTutorials = TUTORIALS_DATA.filter((tut) => {
    const categoryMatch = selectedCategory === 'all' || tut.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const queryMatch =
      !q ||
      tut.title.toLowerCase().includes(q) ||
      tut.summary.toLowerCase().includes(q) ||
      tut.steps.some((s) => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q));

    return categoryMatch && queryMatch;
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If a tutorial is selected for full reading
  if (selectedTutorial) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16 text-slate-200">
        {/* Back navigation */}
        <button
          onClick={() => {
            setSelectedTutorial(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mb-6 inline-flex items-center gap-2 rounded-sm border border-white/10 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:border-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Tutorials</span>
        </button>

        {/* Tutorial Header */}
        <article className="space-y-8">
          <div className="space-y-3 border-b border-white/5 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-sm border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono-code text-xs font-semibold text-amber-500">
                {selectedTutorial.category}
              </span>
              <span className="flex items-center gap-1 font-mono-code text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5" />
                {selectedTutorial.readTime}
              </span>
              <span className="rounded-sm bg-slate-800 px-2 py-0.5 font-mono-code text-xs text-slate-300">
                Level: {selectedTutorial.level}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {selectedTutorial.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {selectedTutorial.summary}
            </p>

            <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-mono-code">
              <span>Published: {selectedTutorial.date} • Gordylez Tech DIY Labs</span>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share Tutorial'}</span>
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 bg-slate-950">
            <img
              src={selectedTutorial.heroImage}
              alt={selectedTutorial.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Tutorial Steps */}
          <div className="space-y-8 pt-4">
            {selectedTutorial.steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 space-y-4"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded bg-amber-600 text-white font-bold text-base">
                    {idx + 1}
                  </span>
                  <span>{step.heading}</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line pl-0 sm:pl-11">
                  {step.content}
                </p>

                {step.proTip && (
                  <div className="sm:ml-11 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-300">
                    <Lightbulb className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <strong className="text-white">Pro Tip from the Workbench:</strong> {step.proTip}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <span>Core Takeaways & Golden Rules</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {selectedTutorial.keyTakeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    );
  }

  // Tutorials List View
  return (
    <div className="space-y-12 py-10 sm:py-16 text-slate-200">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-500">
            <BookOpen className="h-3.5 w-3.5" />
            <span>KNOWLEDGE BASE & GUIDES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            DIY Technology <span className="text-amber-500">Tutorials</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
            In-depth technical guides authored for DIY off-grid builders, makers, and electronics enthusiasts. Read comprehensive walkthroughs on top-balancing cells, fuse sizing, inverter diagnostics, and solar array engineering.
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search tutorials by keyword (e.g. BMS, Voc, Fusing)..."
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

      {/* Tutorials Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTutorials.map((tut) => (
            <div
              key={tut.id}
              onClick={() => {
                setSelectedTutorial(tut);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm transition-all hover:border-amber-500/40 hover:bg-slate-900/80 cursor-pointer shadow-lg hover:shadow-amber-500/5"
            >
              <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={tut.heroImage}
                  alt={tut.title}
                  className="h-full w-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="rounded-sm bg-slate-900/90 px-2 py-0.5 text-[11px] font-mono-code text-amber-400 border border-white/10">
                    {tut.category}
                  </span>
                </div>
                <span className="absolute bottom-2 right-3 font-mono-code text-[11px] text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded-sm">
                  {tut.readTime}
                </span>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                    {tut.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {tut.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-amber-500 font-semibold">
                  <span>Read Full Tutorial</span>
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
