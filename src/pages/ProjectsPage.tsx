import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectCard } from '../components/ProjectCard';
import { useGallery } from '../context/GalleryContext';
import {
  Layers,
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
  Info,
  Camera,
  ArrowRight
} from 'lucide-react';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const { getPhotoForSlot } = useGallery();
  const projectsPhoto = getPhotoForSlot('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'solar', label: 'Solar Generators' },
    { id: 'battery', label: 'LiFePO4 Batteries' },
    { id: 'inverter', label: 'Inverter Mods' },
    { id: 'electronics', label: 'Bench Electronics' },
    { id: 'repairs', label: 'DIY Repairs' },
  ];

  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    // Category match
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;

    // Difficulty match
    const difficultyMatch = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;

    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const queryMatch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.tagline.toLowerCase().includes(q) ||
      project.summary.toLowerCase().includes(q) ||
      project.components.some((c) => c.name.toLowerCase().includes(q) || c.specOrRating.toLowerCase().includes(q)) ||
      project.specs.some((s) => s.value.toLowerCase().includes(q));

    return categoryMatch && difficultyMatch && queryMatch;
  });

  return (
    <div className="space-y-12 py-10 sm:py-16 text-slate-200">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-500">
              <Layers className="h-3.5 w-3.5" />
              <span>OPEN ENGINEERING BLUEPRINTS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              DIY Project <span className="text-amber-500">Blueprints & Builds</span>
            </h1>
            <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
              Every project below includes a complete breakdown of bill-of-materials, exact component ratings, safety-critical assembly steps, and calibrated bench load test results.
            </p>

            {/* Builder Note */}
            <div className="mt-4 rounded-lg border border-white/5 bg-slate-900/40 p-3.5 text-xs text-slate-400 flex items-center gap-3">
              <Info className="h-4 w-4 text-amber-500 shrink-0" />
              <span>
                <strong className="text-slate-200">Gordylez Tech DIY Catalog:</strong> Select any project card to inspect the full interactive blueprint. All hardware builds are tested in the Abiriba workshop.
              </span>
            </div>
          </div>

          {/* Photo Frame */}
          <div className="lg:col-span-4">
            <div className="relative rounded-xl border border-amber-500/30 bg-slate-900/80 p-2 shadow-xl backdrop-blur-sm group">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-950">
                <img
                  src={projectsPhoto?.url || 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80'}
                  alt={projectsPhoto?.altText || 'Gordylez Tech DIY - Solar and Electrical Builds'}
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
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by component (e.g. BMS, MOSFET, LiFePO4, 24V, Class T)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm border border-white/10 bg-[#0a0a0c] pl-10 pr-10 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-code text-slate-400 uppercase tracking-wider hidden sm:inline">
              Difficulty:
            </span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="rounded-sm border border-white/10 bg-[#0a0a0c] px-3 py-2 text-xs font-mono-code text-slate-200 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              {difficulties.map((diff) => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Skill Levels' : diff}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-sm px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white font-semibold shadow-sm'
                  : 'border border-white/10 bg-slate-900/60 text-slate-300 hover:border-amber-500/40 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400 font-mono-code">
          <span>Showing {filteredProjects.length} of {PROJECTS_DATA.length} Blueprints</span>
          {(searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/5 bg-slate-900/40 p-12 text-center space-y-4">
            <Layers className="mx-auto h-12 w-12 text-slate-600" />
            <h3 className="text-lg font-bold text-slate-300">
              No matching blueprints found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search terms or selecting &quot;All Projects&quot; to see all builds in our workshop library.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="rounded-sm bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
