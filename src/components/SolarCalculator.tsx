import React, { useState } from 'react';
import {
  Calculator,
  Sun,
  Battery,
  Zap,
  RotateCcw,
  CheckCircle2,
  Info,
  Sliders,
  Plus,
  Trash2
} from 'lucide-react';

interface AppliancePreset {
  id: string;
  name: string;
  watts: number;
  hoursPerDay: number;
  icon?: string;
}

const DEFAULT_APPLIANCES: AppliancePreset[] = [
  { id: 'app-1', name: '12V/24V Efficient DC Fridge', watts: 45, hoursPerDay: 12 },
  { id: 'app-2', name: 'LED Lighting (Shop/Cabin)', watts: 30, hoursPerDay: 6 },
  { id: 'app-3', name: 'Laptop Charging (65W-100W)', watts: 65, hoursPerDay: 4 },
  { id: 'app-4', name: 'Starlink / Wi-Fi Router', watts: 40, hoursPerDay: 10 },
  { id: 'app-5', name: 'Smartphone / Tablet Charging', watts: 20, hoursPerDay: 3 },
  { id: 'app-6', name: 'Power Tool Battery Charger', watts: 120, hoursPerDay: 1.5 },
];

export const SolarCalculator: React.FC = () => {
  const [systemVoltage, setSystemVoltage] = useState<12 | 24 | 48>(24);
  const [sunHours, setSunHours] = useState<number>(4.5);
  const [daysOfAutonomy, setDaysOfAutonomy] = useState<number>(1.5);
  const [inverterEfficiency, setInverterEfficiency] = useState<number>(90);
  const [batteryDoD, setBatteryDoD] = useState<number>(85); // 85% recommended for LiFePO4
  const [appliances, setAppliances] = useState<AppliancePreset[]>(DEFAULT_APPLIANCES);

  // New appliance input state
  const [customName, setCustomName] = useState('');
  const [customWatts, setCustomWatts] = useState<number>(50);
  const [customHours, setCustomHours] = useState<number>(2);

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || customWatts <= 0) return;
    const newApp: AppliancePreset = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      watts: customWatts,
      hoursPerDay: customHours,
    };
    setAppliances([...appliances, newApp]);
    setCustomName('');
    setCustomWatts(50);
    setCustomHours(2);
  };

  const handleRemoveAppliance = (id: string) => {
    setAppliances(appliances.filter((a) => a.id !== id));
  };

  const handleUpdateHours = (id: string, hours: number) => {
    setAppliances(
      appliances.map((a) => (a.id === id ? { ...a, hoursPerDay: Math.max(0, Math.min(24, hours)) } : a))
    );
  };

  // Computations
  const totalDailyWh = appliances.reduce((sum, item) => sum + item.watts * item.hoursPerDay, 0);
  const maxSimultaneousWatts = appliances.reduce((sum, item) => sum + item.watts, 0);

  // Inverter loss compensation
  const adjustedDailyWh = totalDailyWh / (inverterEfficiency / 100);

  // Battery Storage Requirement (Wh and Ah) considering Depth of Discharge and Autonomy days
  const requiredBatteryWh = (adjustedDailyWh * daysOfAutonomy) / (batteryDoD / 100);
  const requiredBatteryAh = requiredBatteryWh / systemVoltage;

  // Solar Array Sizing (incorporating 1.25 safety/losses factor)
  const solarFactor = 1.25;
  const recommendedSolarWatts = (adjustedDailyWh / sunHours) * solarFactor;

  // MPPT Charge Controller sizing (Amps) = SolarWatts / BatteryVoltage
  const recommendedMpptAmps = Math.ceil((recommendedSolarWatts / systemVoltage) * 1.15);

  // Recommended Inverter: Max watts + 25% overhead
  const recommendedInverterContinuous = Math.ceil(maxSimultaneousWatts * 1.3 / 100) * 100;
  const recommendedInverterSurge = recommendedInverterContinuous * 2;

  const handleReset = () => {
    setAppliances(DEFAULT_APPLIANCES);
    setSystemVoltage(24);
    setSunHours(4.5);
    setDaysOfAutonomy(1.5);
  };

  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/40 p-5 sm:p-8 backdrop-blur-sm shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Calculator className="h-4 w-4" />
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Interactive Solar & LiFePO4 Sizing Calculator
            </h3>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-2xl">
            Custom built for DIY off-grid builders: configure your daily electrical loads to calculate required battery capacity, solar array wattage, and MPPT sizing with verified engineering safety margins.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 self-start md:self-auto rounded-sm border border-white/10 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Global System Parameters Bar */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-4">
        {/* System Voltage */}
        <div>
          <label className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-1.5">
            System Voltage
          </label>
          <div className="grid grid-cols-3 gap-1">
            {([12, 24, 48] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSystemVoltage(v)}
                className={`py-1.5 text-xs font-mono-code rounded-sm font-semibold transition-colors cursor-pointer ${
                  systemVoltage === v
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {v}V
              </button>
            ))}
          </div>
        </div>

        {/* Peak Sun Hours */}
        <div>
          <label className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-1.5">
            Peak Sun Hours: <strong className="text-amber-400 font-mono-code">{sunHours} hrs/day</strong>
          </label>
          <input
            type="range"
            min="2.5"
            max="7.0"
            step="0.5"
            value={sunHours}
            onChange={(e) => setSunHours(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* Days of Autonomy */}
        <div>
          <label className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-1.5">
            Autonomy (Cloud Cover): <strong className="text-amber-400 font-mono-code">{daysOfAutonomy} days</strong>
          </label>
          <input
            type="range"
            min="1.0"
            max="3.0"
            step="0.5"
            value={daysOfAutonomy}
            onChange={(e) => setDaysOfAutonomy(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>

        {/* LiFePO4 DoD % */}
        <div>
          <label className="block text-[11px] font-mono-code uppercase tracking-wider text-slate-400 mb-1.5">
            LiFePO4 DoD (Max 90%): <strong className="text-amber-400 font-mono-code">{batteryDoD}%</strong>
          </label>
          <input
            type="range"
            min="70"
            max="90"
            step="5"
            value={batteryDoD}
            onChange={(e) => setBatteryDoD(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Main Content Grid: Loads on Left, Engineering Results on Right */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Load List & Add Load */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Active Electrical Loads ({appliances.length})
            </h4>
            <span className="font-mono-code text-xs text-amber-400 font-semibold">
              Total: {totalDailyWh.toLocaleString()} Wh / day
            </span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {appliances.map((app) => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-900 border border-white/10 text-slate-300 font-mono-code text-[11px]">
                    {app.watts}W
                  </div>
                  <div>
                    <span className="font-medium text-slate-200 block">{app.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono-code">
                      Daily: {(app.watts * app.hoursPerDay).toFixed(0)} Wh
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400">Daily:</span>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      value={app.hoursPerDay}
                      onChange={(e) => handleUpdateHours(app.id, parseFloat(e.target.value) || 0)}
                      className="w-14 rounded-sm border border-white/10 bg-slate-900 px-1.5 py-1 text-center font-mono-code text-xs text-slate-200"
                    />
                    <span className="text-[11px] text-slate-400">hrs</span>
                  </div>

                  <button
                    onClick={() => handleRemoveAppliance(app.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                    title="Remove load"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Custom Appliance */}
          <form
            onSubmit={handleAddCustom}
            className="flex flex-wrap items-center gap-2 rounded-lg border border-white/5 bg-[#0a0a0c]/40 p-3 text-xs"
          >
            <input
              type="text"
              placeholder="Custom device (e.g. Soldering Iron)"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="flex-1 min-w-[150px] rounded-sm border border-white/10 bg-slate-900 px-3 py-1.5 text-slate-200 placeholder-slate-500 text-xs focus:border-amber-500 focus:outline-none"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                placeholder="Watts"
                min="1"
                value={customWatts}
                onChange={(e) => setCustomWatts(parseInt(e.target.value) || 0)}
                className="w-16 rounded-sm border border-white/10 bg-slate-900 px-2 py-1.5 text-center text-xs font-mono-code text-slate-200 focus:border-amber-500 focus:outline-none"
              />
              <span className="text-slate-500">W</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                placeholder="Hrs"
                min="0.1"
                max="24"
                step="0.5"
                value={customHours}
                onChange={(e) => setCustomHours(parseFloat(e.target.value) || 0)}
                className="w-14 rounded-sm border border-white/10 bg-slate-900 px-2 py-1.5 text-center text-xs font-mono-code text-slate-200 focus:border-amber-500 focus:outline-none"
              />
              <span className="text-slate-500">h</span>
            </div>
            <button
              type="submit"
              className="flex items-center gap-1 rounded-sm bg-amber-600 hover:bg-amber-700 px-3 py-1.5 font-bold uppercase tracking-wider text-white transition-colors cursor-pointer text-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* Right: Engineering Results Dashboard */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 via-slate-900/50 to-[#0a0a0c] p-5">
          <div>
            <span className="font-mono-code text-[11px] font-semibold text-amber-500 uppercase tracking-widest block mb-1">
              System Engineering Specifications
            </span>
            <h4 className="text-lg font-bold text-white tracking-tight">
              Recommended Hardware Configuration
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Battery Sizing */}
            <div className="rounded-lg border border-white/5 bg-[#0a0a0c]/80 p-3">
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <Battery className="h-4 w-4" />
                <span>LiFePO4 Battery Bank</span>
              </div>
              <p className="mt-2 font-mono-code text-lg font-bold text-white">
                {Math.ceil(requiredBatteryAh)} Ah <span className="text-xs font-normal text-slate-400">@ {systemVoltage}V</span>
              </p>
              <span className="block text-[11px] text-slate-400 font-mono-code mt-0.5">
                {(requiredBatteryWh / 1000).toFixed(2)} kWh Gross Storage
              </span>
            </div>

            {/* Solar Array Watts */}
            <div className="rounded-lg border border-white/5 bg-[#0a0a0c]/80 p-3">
              <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                <Sun className="h-4 w-4" />
                <span>Solar Array Wattage</span>
              </div>
              <p className="mt-2 font-mono-code text-lg font-bold text-white">
                {Math.ceil(recommendedSolarWatts)} W
              </p>
              <span className="block text-[11px] text-slate-400 font-mono-code mt-0.5">
                e.g. {Math.ceil(recommendedSolarWatts / 400)}x 400W PV Panels
              </span>
            </div>

            {/* MPPT Controller */}
            <div className="rounded-lg border border-white/5 bg-[#0a0a0c]/80 p-3">
              <div className="flex items-center gap-1.5 text-blue-400 font-medium">
                <Sliders className="h-4 w-4" />
                <span>MPPT Solar Controller</span>
              </div>
              <p className="mt-2 font-mono-code text-lg font-bold text-white">
                {recommendedMpptAmps} A
              </p>
              <span className="block text-[11px] text-slate-400 font-mono-code mt-0.5">
                Min. rating with 15% safety
              </span>
            </div>

            {/* Inverter Sizing */}
            <div className="rounded-lg border border-white/5 bg-[#0a0a0c]/80 p-3">
              <div className="flex items-center gap-1.5 text-purple-400 font-medium">
                <Zap className="h-4 w-4" />
                <span>Pure Sine Inverter</span>
              </div>
              <p className="mt-2 font-mono-code text-lg font-bold text-white">
                {Math.max(500, recommendedInverterContinuous)} W
              </p>
              <span className="block text-[11px] text-slate-400 font-mono-code mt-0.5">
                Surge: {Math.max(1000, recommendedInverterSurge)}W
              </span>
            </div>
          </div>

          {/* Quick Design Summary Alert */}
          <div className="rounded-lg border border-white/5 bg-[#0a0a0c] p-3 text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Gordylez Engineering Note</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Calculations include 10% inverter tare/efficiency loss and standard {systemVoltage}V {batteryDoD}% usable cycle life. Always pair with a calibrated 20,000A AIC Class T fuse on the primary positive terminal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
