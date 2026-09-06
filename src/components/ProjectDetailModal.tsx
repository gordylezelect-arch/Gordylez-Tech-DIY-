import React, { useState } from 'react';
import { Project } from '../types';
import {
  X,
  Clock,
  DollarSign,
  AlertTriangle,
  Cpu,
  Layers,
  Activity,
  ShieldAlert,
  CheckCircle,
  ExternalLink,
  Info,
  Sparkles
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

type TabType = 'overview' | 'components' | 'build-process' | 'results' | 'schematics';

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id={`modal-project-${project.id}`}
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0c] shadow-2xl shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/5 bg-[#0a0a0c]/90 px-6 py-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 font-mono-code text-[11px] font-semibold text-amber-400">
                {project.categoryLabel}
              </span>
              <span className="rounded-md border border-white/10 bg-slate-900 px-2 py-0.5 font-mono-code text-[11px] text-slate-300">
                Difficulty: {project.difficulty}
              </span>
              <span className="rounded-md border border-white/10 bg-slate-900 px-2 py-0.5 font-mono-code text-[11px] text-slate-300">
                {project.buildTimeHours} Hours Build
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs text-slate-400">
              {project.tagline}
            </p>
          </div>

          <button
            id="close-modal-btn"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-slate-400 hover:border-amber-500/40 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 border-b border-white/5 bg-[#0a0a0c] px-6 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & Specs', icon: Layers },
            { id: 'components', label: `Components (${project.components.length})`, icon: Cpu },
            { id: 'build-process', label: `Build Steps (${project.buildProcess.length})`, icon: CheckCircle },
            { id: 'results', label: 'Bench Test Results', icon: Activity },
            { id: 'schematics', label: 'Safety & Notes', icon: ShieldAlert },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-amber-500 text-amber-400 bg-slate-900/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Builder Notice Banner */}
          <div className="flex items-start gap-3 rounded-lg border border-white/5 bg-slate-900/30 p-3.5 text-xs text-slate-400">
            <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-200">Gordylez Tech DIY Blueprint:</strong> This project card structure includes dedicated sections for high-res project photos, technical specs, parts BOM, numbered step-by-step procedures, and measured bench test data.
            </p>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0c]">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-[#0a0a0c]/80 p-3 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Estimated Build Cost:</span>
                  <span className="font-mono-code text-emerald-400 font-bold">{project.estimatedCost}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2">
                  Project Description & Engineering Goals
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-3">
                  Technical Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-white/5 bg-slate-900/40 p-3"
                    >
                      <span className="block text-[11px] text-slate-500 uppercase tracking-wider">{spec.label}</span>
                      <span className="font-mono-code text-sm font-semibold text-amber-400">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Components Used */}
          {activeTab === 'components' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Bill of Materials (BOM) & Components Used
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  All hardware, wiring, protection modules, and active circuitry deployed in this build.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0c]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/5 bg-slate-900/80 text-slate-400 font-mono-code uppercase text-[10px]">
                    <tr>
                      <th className="p-3.5">Component / Part</th>
                      <th className="p-3.5">Rating & Specification</th>
                      <th className="p-3.5 hidden sm:table-cell">Engineering Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {project.components.map((comp, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5 font-medium text-slate-200">
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-500/10 text-amber-400 font-mono-code text-[10px]">
                              {idx + 1}
                            </span>
                            <span>{comp.name}</span>
                          </div>
                        </td>
                        <td className="p-3.5 font-mono-code text-amber-400">
                          {comp.specOrRating}
                        </td>
                        <td className="p-3.5 text-slate-400 hidden sm:table-cell">
                          {comp.purpose || 'System integration component'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Build Process */}
          {activeTab === 'build-process' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">
                  Step-by-Step Build Walkthrough
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Follow along the exact sequence recorded during our shop assembly and wiring tests.
                </p>
              </div>

              <div className="space-y-4">
                {project.buildProcess.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="rounded-xl border border-white/5 bg-slate-900/30 p-4 sm:p-5 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-sm font-bold text-white">
                        {step.stepNumber}
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {step.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-10">
                      {step.description}
                    </p>

                    {step.safetyTip && (
                      <div className="ml-10 flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-300">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                        <span><strong>Safety Note:</strong> {step.safetyTip}</span>
                      </div>
                    )}

                    {step.checkpoints && step.checkpoints.length > 0 && (
                      <div className="ml-10 space-y-1.5 pt-1">
                        <span className="text-[11px] font-mono-code uppercase text-slate-400">
                          Quality Checkpoints:
                        </span>
                        {step.checkpoints.map((cp, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2 text-xs text-emerald-400 font-mono-code">
                            <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{cp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Bench Results */}
          {activeTab === 'results' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">
                  Measured Bench & Field Test Results
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Empirical data verified on our lab instruments (active load bank, calibrated shunt, thermal camera).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.results.continuousLoad && (
                  <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
                    <span className="text-[11px] font-mono-code text-slate-500 uppercase">Sustained Continuous Load</span>
                    <p className="mt-1 font-mono-code text-sm font-semibold text-emerald-400">
                      {project.results.continuousLoad}
                    </p>
                  </div>
                )}
                {project.results.peakCapacity && (
                  <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
                    <span className="text-[11px] font-mono-code text-slate-500 uppercase">Measured Capacity</span>
                    <p className="mt-1 font-mono-code text-sm font-semibold text-amber-400">
                      {project.results.peakCapacity}
                    </p>
                  </div>
                )}
                {project.results.efficiency && (
                  <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
                    <span className="text-[11px] font-mono-code text-slate-500 uppercase">Conversion Efficiency</span>
                    <p className="mt-1 font-mono-code text-sm font-semibold text-blue-400">
                      {project.results.efficiency}
                    </p>
                  </div>
                )}
                {project.results.thermalPerformance && (
                  <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4">
                    <span className="text-[11px] font-mono-code text-slate-500 uppercase">Thermal Performance</span>
                    <p className="mt-1 font-mono-code text-sm font-semibold text-purple-400">
                      {project.results.thermalPerformance}
                    </p>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-900/30 p-4 space-y-2">
                <h4 className="text-sm font-bold text-white">
                  Bench Test Summary
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.results.summary}
                </p>
              </div>

              {project.results.takeaways && project.results.takeaways.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono-code uppercase text-slate-400 tracking-wider">
                    Key Builder Takeaways:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {project.results.takeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Schematics & Safety */}
          {activeTab === 'schematics' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">
                  Wiring Architecture & Safety Protocols
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Protection ratings, fuse coordination, and safety warnings for this project build.
                </p>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldAlert className="h-5 w-5" />
                  <span>Crucial Electrical Safety Instructions</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  LiFePO4 battery assemblies and inverter power stages store dangerous amounts of energy. Under short-circuit conditions, battery terminals can vaporize tools. Never work on live terminals without an insulating silicone pad and use non-conductive, insulated hand tools.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4 space-y-2">
                <span className="text-[11px] font-mono-code text-slate-500 uppercase">Schematic Reference Notes</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.schematicNote || 'Single-line schematics with wire gauges and torque specifications are provided for this system architecture.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-white/5 bg-[#0a0a0c]/90 px-6 py-3.5">
          <span className="font-mono-code text-xs text-slate-500">
            Project ID: <span className="text-slate-400">{project.id}</span>
          </span>
          <button
            onClick={onClose}
            className="rounded-sm bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
