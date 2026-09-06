import React from 'react';
import { Project } from '../types';
import {
  Clock,
  DollarSign,
  Layers,
  ChevronRight,
  Sparkles,
  Cpu,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const getDifficultyColor = (diff: Project['difficulty']) => {
    switch (diff) {
      case 'Beginner':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
      case 'Intermediate':
        return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
      case 'Advanced':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-400';
      case 'Expert':
        return 'border-red-500/30 bg-red-500/10 text-red-400';
      default:
        return 'border-neutral-700 bg-neutral-800 text-neutral-300';
    }
  };

  return (
    <div
      id={`project-card-${project.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5"
    >
      {/* Card Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0a0a0c]">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="rounded-md border border-white/10 bg-slate-900/90 px-2.5 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur-md">
            {project.categoryLabel}
          </span>
          {project.featured && (
            <span className="flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/20 px-2 py-1 text-[11px] font-medium text-amber-300 backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>Featured Build</span>
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className={`rounded-md border px-2 py-0.5 text-[11px] font-mono-code uppercase font-semibold ${getDifficultyColor(project.difficulty)}`}>
            {project.difficulty}
          </span>
        </div>

        {/* Bottom Image Overlay Strip with Build Meta */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-mono-code">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            {project.buildTimeHours}h Build Time
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
            {project.estimatedCost}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-amber-500 font-medium">
          {project.tagline}
        </p>
        <p className="mt-2.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {project.summary}
        </p>

        {/* Specs Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-2.5 text-[11px]">
          {project.specs.slice(0, 4).map((spec, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-slate-500 text-[10px] uppercase tracking-wider">{spec.label}</span>
              <span className="font-mono-code text-slate-200 font-medium truncate">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Components Counter & Build Steps Tag */}
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-amber-400" />
            <span>{project.components.length} Components</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>{project.buildProcess.length} Steps</span>
          </span>
        </div>

        {/* Action Button */}
        <button
          id={`btn-view-blueprint-${project.id}`}
          onClick={() => onSelect(project)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-sm border border-slate-700 bg-slate-800/80 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all group-hover:border-amber-500 group-hover:bg-amber-600 group-hover:text-white active:scale-98 cursor-pointer shadow-sm"
        >
          <span>View Build Blueprint</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
