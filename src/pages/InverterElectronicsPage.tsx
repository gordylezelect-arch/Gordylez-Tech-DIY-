import React from 'react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectCard } from '../components/ProjectCard';
import {
  Cpu,
  Zap,
  Activity,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface InverterElectronicsPageProps {
  onSelectProject: (project: Project) => void;
}

export const InverterElectronicsPage: React.FC<InverterElectronicsPageProps> = ({
  onSelectProject,
}) => {
  const inverterElectronicsProjects = PROJECTS_DATA.filter(
    (p) => p.category === 'inverter' || p.category === 'electronics' || p.category === 'repairs'
  );

  return (
    <div className="space-y-16 py-10 sm:py-16 text-slate-200">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-500">
            <Cpu className="h-3.5 w-3.5" />
            <span>POWER ELECTRONICS & INVERTERS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Inverters, Power Stages & <span className="text-amber-500">Bench Electronics</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
            Engineering pure sine wave inverters, MOSFET gate drive optimization, oscilloscope signal diagnostics, and custom laboratory bench gear.
          </p>
        </div>
      </section>

      {/* Interactive Inverter Diagnostic Sequence Guide */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono-code text-xs text-amber-500 uppercase tracking-widest block mb-1">
                BENCH DIAGNOSTIC PROTOCOL
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Gordylez Inverter Troubleshooting Sequence
              </h2>
            </div>
            <span className="hidden sm:inline rounded-sm border border-white/10 bg-slate-900 px-2.5 py-1 font-mono-code text-xs text-slate-300">
              Rev. 2.4 Diagnostic
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-4 space-y-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/20 text-amber-400 font-mono-code text-xs font-bold">
                1
              </span>
              <h4 className="text-sm font-bold text-white">Capacitor Discharge</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Discharge both high-voltage DC bus (380V) and low-voltage input caps through a 1kΩ 10W cement resistor. Never probe a charged board.
              </p>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-4 space-y-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/20 text-amber-400 font-mono-code text-xs font-bold">
                2
              </span>
              <h4 className="text-sm font-bold text-white">DMM Diode Test</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Test low-side and high-side MOSFETs across Drain-Source and Gate-Source. Any reading under 0.050V indicates shorted punch-through.
              </p>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-4 space-y-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/20 text-amber-400 font-mono-code text-xs font-bold">
                3
              </span>
              <h4 className="text-sm font-bold text-white">Gate Driver Test</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Remove shorted FETs. Power the PWM IC logic from a 12V 500mA bench supply and verify crisp square waves on an oscilloscope.
              </p>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-4 space-y-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/20 text-amber-400 font-mono-code text-xs font-bold">
                4
              </span>
              <h4 className="text-sm font-bold text-white">Bulb Current Limiter</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                After soldering new FETs, bring up primary power with a 12V 55W automotive headlight bulb in series with positive to safely absorb faults.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inverter & Electronics Project Showcase */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/5 pb-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Inverter & Electronics Project Blueprints
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse our complete teardowns, repairs, and bench equipment builds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inverterElectronicsProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </section>

      {/* Pure Sine Wave vs Modified Sine Comparison */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Pure Sine Wave (PSW) Inverters
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Produces identical or cleaner AC power than the commercial utility grid with smooth, harmonic-free sinusoidal transitions (THD &lt; 3%).
            </p>
            <ul className="space-y-2 text-xs text-slate-300 font-mono-code">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Runs inductive loads (fridges, fans, compressors) silently</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Zero audio hum or video interference on sensitive electronics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Prevents motor windings from overheating</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Modified Sine Wave (MSW) Risks
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Produces a crude stepped square wave with violent dv/dt voltage transitions. Often destroys modern brushless motor controllers and smart chargers.
            </p>
            <ul className="space-y-2 text-xs text-slate-400 font-mono-code">
              <li className="flex items-center gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Causes AC motors to draw 30% more current and overheat</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Produces loud acoustic buzz in ceiling fans and audio gear</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Unusable for medical devices (CPAP) and modern laser printers</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
