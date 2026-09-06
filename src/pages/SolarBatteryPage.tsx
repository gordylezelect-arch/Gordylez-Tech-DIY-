import React from 'react';
import { Project } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectCard } from '../components/ProjectCard';
import { SolarCalculator } from '../components/SolarCalculator';
import {
  Sun,
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

interface SolarBatteryPageProps {
  onSelectProject: (project: Project) => void;
}

export const SolarBatteryPage: React.FC<SolarBatteryPageProps> = ({ onSelectProject }) => {
  const solarAndBatteryProjects = PROJECTS_DATA.filter(
    (p) => p.category === 'solar' || p.category === 'battery'
  );

  return (
    <div className="space-y-16 py-10 sm:py-16 text-slate-200">
      {/* Header Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-500">
            <Sun className="h-3.5 w-3.5" />
            <span>SOLAR GENERATORS & BATTERY CHEMISTRY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Solar Panels, Generators & <span className="text-amber-500">LiFePO4 Chemistry</span>
          </h1>
          <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
            From precision top-balancing 3.2V prismatic cells and designing laser-cut spring compression fixtures to high-voltage MPPT solar array combiners and portable mil-spec ammo can generators.
          </p>
        </div>
      </section>

      {/* Interactive Sizing Calculator */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <span className="font-mono-code text-xs text-amber-500 uppercase tracking-widest block mb-1">
            ENGINEERING DESIGN SUITE
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Off-Grid System Sizing Tool
          </h2>
        </div>
        <SolarCalculator />
      </section>

      {/* Featured Solar & Battery Projects */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/5 pb-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Solar & Battery Project Blueprints
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Examine our step-by-step builds, component lists, and tested discharge curves.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solarAndBatteryProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </section>

      {/* LiFePO4 Chemistry vs Lead Acid Comparison */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 space-y-6">
          <div>
            <span className="font-mono-code text-xs text-amber-500 uppercase tracking-widest">
              CHEMISTRY ANALYSIS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Why LiFePO4 Outperforms Traditional Storage
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/5 bg-slate-900/80 font-mono-code text-[11px] text-slate-400 uppercase">
                <tr>
                  <th className="p-3.5">Metric / Spec</th>
                  <th className="p-3.5 text-amber-400">LiFePO4 Prismatic (Gordylez DIY)</th>
                  <th className="p-3.5 text-slate-400">AGM / Gel Lead Acid</th>
                  <th className="p-3.5 text-slate-400">NMC Lithium Ion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-semibold">Usable Depth of Discharge (DoD)</td>
                  <td className="p-3.5 font-mono-code text-emerald-400 font-bold">80% - 90% (No Degradation)</td>
                  <td className="p-3.5 font-mono-code text-slate-400">50% Max (Severe sulfation if deeper)</td>
                  <td className="p-3.5 font-mono-code text-slate-300">80% (Higher thermal risk)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-semibold">Cycle Life (to 80% Capacity)</td>
                  <td className="p-3.5 font-mono-code text-emerald-400 font-bold">3,500 - 6,000+ Cycles (10+ yrs)</td>
                  <td className="p-3.5 font-mono-code text-slate-400">300 - 500 Cycles (2-3 yrs)</td>
                  <td className="p-3.5 font-mono-code text-slate-300">800 - 1,200 Cycles</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-semibold">Thermal Runaway Point</td>
                  <td className="p-3.5 font-mono-code text-emerald-400 font-bold">~270°C (Inherent chemical safety)</td>
                  <td className="p-3.5 font-mono-code text-slate-400">Low (Produces explosive H2 gas)</td>
                  <td className="p-3.5 font-mono-code text-red-400">~150°C (Vulnerable to fires)</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-semibold">Weight per kWh</td>
                  <td className="p-3.5 font-mono-code text-emerald-400 font-bold">~8.5 kg / kWh</td>
                  <td className="p-3.5 font-mono-code text-slate-400">~30 kg / kWh (3.5x heavier)</td>
                  <td className="p-3.5 font-mono-code text-slate-300">~6.0 kg / kWh</td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-semibold">Voltage Sag under Heavy Inverter Load</td>
                  <td className="p-3.5 font-mono-code text-emerald-400 font-bold">Extremely Low (Flat curve at 3.2V)</td>
                  <td className="p-3.5 font-mono-code text-slate-400">High (Causes inverter early cutout)</td>
                  <td className="p-3.5 font-mono-code text-slate-300">Moderate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Critical Rules for DIY Battery Builders */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          Golden Engineering Rules for LiFePO4 Builders
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              Mandatory Class T Fusing
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lithium batteries dump tens of thousands of amps in a dead short. Only Class T fuses (20,000A AIC) can extinguish the high-current DC arc without exploding.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Layers className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              Physical Cell Compression
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prismatic LiFePO4 cells naturally expand and contract during charging. Applying 10 to 12 psi of spring-loaded compression prevents delamination and extends cycle life to 4,000+ cycles.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-900/50 backdrop-blur-sm p-5 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
              <Cpu className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-white">
              Active BMS & Low Temp Cutoff
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Charging LiFePO4 below 0°C (32°F) permanently plates metallic lithium on the anode, destroying the cell. Always install a BMS with calibrated low-temperature charge cutoff sensors.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
