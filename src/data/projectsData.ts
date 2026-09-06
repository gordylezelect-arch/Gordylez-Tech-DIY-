import { Project, ContactInfoPlaceholders } from '../types';

export const BRAND_CONTACT_PLACEHOLDERS: ContactInfoPlaceholders = {
  whatsapp: '08067465492',
  whatsappFormatted: '+234 806 746 5492',
  whatsappLink: 'https://wa.me/2348067465492?text=Hello%20Gordylez%20Tech%20DIY%2C%20I%20would%20like%20to%20inquire%20about%20a%20project',
  phone: '08067465492',
  phoneFormatted: '+234 806 746 5492',
  phoneTelLink: 'tel:+2348067465492',
  email: 'godwinomeh090@gmail.com',
  location: 'Abiriba, Abia State, Nigeria',
  youtube: 'Gordylez Tech DIY',
  youtubeUrl: 'https://www.youtube.com/@GordylezTechDIY',
  facebook: 'GordylezTechDIY',
  instagram: 'gordylez_tech_diy',
  tiktok: 'gordyleztechdiy',
  xTwitter: 'gordyleztech',
  github: 'gordylez-tech',
};

export const BRAND_INFO = {
  name: 'Gordylez Tech DIY',
  tagline: 'Engineering Hands-On Off-Grid Energy & Hardware Solutions',
  shortBio: 'A hands-on technology & DIY engineering brand focused on custom solar generators, LiFePO4 battery systems, high-power pure sine inverters, bench electronics, and practical electrical repairs.',
  fullBio: 'Gordylez Tech DIY was founded to demystify complex electrical engineering, solar power conversion, and lithium battery chemistry through transparent, step-by-step DIY project builds. From assembling custom 24V/48V LiFePO4 battery banks with active balancers to diagnosing blown inverter MOSFET stages, our mission is to empower makers, off-grid enthusiasts, and DIYers with real-world testing, verified schematics, and rigorous bench data.',
  stats: [
    { label: 'DIY Project Builds', value: '45+' },
    { label: 'LiFePO4 Capacity Built', value: '38 kWh+' },
    { label: 'Solar Arrays Commissioned', value: '18 kW+' },
    { label: 'Electronics Bench Hours', value: '1,200+' }
  ],
  corePillars: [
    {
      title: 'Solar Generators & Arrays',
      description: 'Custom portable power stations, MPPT solar charge controller integration, high-yield panel arrays, and weatherized outdoor power boxes.',
      iconName: 'Sun'
    },
    {
      title: 'LiFePO4 & Lithium Chemistry',
      description: 'Cell compression fixtures, active balancing harnesses, smart Bluetooth BMS calibration, and high-discharge capacity load testing.',
      iconName: 'BatteryCharging'
    },
    {
      title: 'Inverters & Power Electronics',
      description: 'Pure sine wave inverter modifications, transformer rewinds, low-frequency vs high-frequency analysis, and surge protection.',
      iconName: 'Zap'
    },
    {
      title: 'Diagnostics & Component Repair',
      description: 'Oscilloscope signal tracing, switching power supply troubleshooting, PCB trace rebuilding, and thermal imaging diagnostics.',
      iconName: 'Wrench'
    }
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-01',
    title: 'Custom 24V 200Ah LiFePO4 Off-Grid Power Station',
    slug: '24v-200ah-lifepo4-power-station',
    category: 'battery',
    categoryLabel: 'LiFePO4 Battery Build',
    tagline: '5.12kWh DIY energy storage bank with 200A Smart BMS and active balancing',
    summary: 'A rugged 8S Grade-A 3.2V 200Ah LiFePO4 build featuring laser-cut compression plates, integrated 200A JK Smart BMS with 2A active balancer, Class T fuse protection, and RS485 communication.',
    fullDescription: 'Designed as the primary battery bank for off-grid solar workshops. The pack uses 8 matched Eve 200Ah prismatic cells assembled under 12psi spring compression to prevent cell expansion and maximize cycle life beyond 4,000 cycles. Custom busbars were machined from C11000 electrolytic copper and nickel-plated to minimize internal resistance.',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    difficulty: 'Advanced',
    buildTimeHours: 18,
    estimatedCost: '$950 - $1,150',
    specs: [
      { label: 'Nominal Voltage', value: '25.6 V' },
      { label: 'Storage Capacity', value: '5.12 kWh (200 Ah)' },
      { label: 'Continuous Current', value: '200 A (5.12 kW)' },
      { label: 'Peak Discharge (10s)', value: '350 A' },
      { label: 'Cell Configuration', value: '8S1P Prismatic' },
      { label: 'BMS Protection', value: 'JK 200A w/ 2A Active Balancer' }
    ],
    components: [
      { name: 'Grade-A 3.2V 200Ah Prismatic Cells', specOrRating: '8 pcs, QR verified, matched IR < 0.28mΩ', purpose: 'Core energy storage chemistry' },
      { name: 'JK Smart BMS (PB2A16S20P)', specOrRating: '200A continuous, 2A active balance, Bluetooth', purpose: 'Over/under voltage, temp & overcurrent cutoffs' },
      { name: 'Class T Fuse & Heavy Duty Block', specOrRating: '250A / 125VDC, 20,000A AIC rating', purpose: 'Catastrophic short-circuit arc protection' },
      { name: 'Nickel-Plated Pure Copper Busbars', specOrRating: '3mm x 25mm C11000 pure copper', purpose: 'Inter-cell connections with minimal resistance' },
      { name: 'Insulation & Compression Rig', specOrRating: '1mm FR4 fiberglass sheets & 6mm steel end plates', purpose: 'Uniform cell compression & physical isolation' },
      { name: 'Heavy Duty Welding Cable', specOrRating: '2/0 AWG fine-strand pure tinned copper', purpose: 'Main battery output leads to disconnect switch' }
    ],
    buildProcess: [
      {
        stepNumber: 1,
        title: 'Initial Cell Inspection & Top Balancing',
        description: 'Cleaned terminals with isopropyl alcohol, verified internal resistance using an RC3563 milliohm meter, and parallel wired all 8 cells to top-balance with a bench PSU set to 3.650V at 0.05A cutoff.',
        safetyTip: 'Never leave top balancing unattended when approaching 3.65V to prevent severe cell overcharging.',
        checkpoints: ['All cells match within 0.02mΩ', 'Resting voltage post-balance = 3.60V - 3.62V']
      },
      {
        stepNumber: 2,
        title: 'Compression Fixture & FR4 Sheet Assembly',
        description: 'Separated every adjacent cell with 1mm yellow FR4 epoxy fiberglass sheets to eliminate mechanical abrasion. Clamped the stack into heavy-duty threaded steel rods with Belleville spring washers calibrated to 10-12 psi.',
        checkpoints: ['Spring deflection measured with calipers to guarantee uniform tension across all 8 cells']
      },
      {
        stepNumber: 3,
        title: 'BMS Wiring, Active Balancer & Sense Leads',
        description: 'Soldered and heat-shrinked each ring terminal on the 9-pin voltage sensing harness. Torqued cell terminal bolts to 4.5 Nm using blue threadlocker and non-conductive torque wrench.',
        safetyTip: 'Cover all active cells with a silicone insulating mat while working on live terminals.'
      },
      {
        stepNumber: 4,
        title: 'Class T Fuse & Main Isolation Switch Integration',
        description: 'Bolted the 250A Class T fuse directly to the positive battery post adapter to eliminate unprotected wire runs. Mounted a 300A Blue Sea disconnect switch on the external enclosure face.',
        checkpoints: ['Zero voltage drop across main contacts at 100A test draw']
      }
    ],
    results: {
      continuousLoad: '180A steady load for 45 minutes without exceeding 38°C on busbars',
      peakCapacity: 'Measured 206.4 Ah (103.2% rated capacity) on 0.2C discharge test',
      efficiency: '97.2% round-trip coulombic efficiency',
      thermalPerformance: 'Cell delta temp < 2.5°C across the entire pack under continuous 2,500W draw',
      voltageSag: 'Total drop only 0.42V from no-load to 150A output',
      summary: 'The 24V 200Ah battery pack exceeded factory specifications, delivering clean uninterrupted power to an inverter load bank. The active balancing system maintained inter-cell deviation under 8mV during both high-rate discharge and absorption charging.',
      takeaways: [
        'Spring compression prevented prismatic bulge entirely during high-current cycling',
        'Direct Class-T fuse mounting eliminated potential catastrophic short paths',
        'JK Bluetooth BMS provides real-time millivolt resolution monitoring on mobile phone'
      ]
    },
    schematicNote: 'Complete single-line electrical schematic with wiring gauges, fuse ratings, and BMS pinouts is available in our detailed project blueprint files.',
    date: '2025-11-14'
  },
  {
    id: 'proj-02',
    title: 'Compact 12V 100Ah Ammo Can Solar Generator',
    slug: 'ammo-can-solar-generator',
    category: 'solar',
    categoryLabel: 'Solar Generator',
    tagline: 'All-in-one portable power box with 500W Pure Sine Inverter & MPPT charging',
    summary: 'A heavy-duty portable solar generator housed in a waterproof .50 caliber steel ammo can. Incorporates a 12.8V 100Ah LiFePO4 battery, 30A MPPT solar charge controller, 500W inverter, 100W USB-C PD, and Anderson Powerpole ports.',
    fullDescription: 'Built for job site power, mobile camping, and emergency backup during power outages. It packs 1,280Wh of energy into a military-style ammo container with laser-engraved acrylic front panel, illuminated digital battery coulometer, waterproof aviation quick-connectors, and forced air ventilation with dust filters.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    difficulty: 'Intermediate',
    buildTimeHours: 14,
    estimatedCost: '$480 - $580',
    specs: [
      { label: 'Battery Capacity', value: '12.8V 100Ah (1,280 Wh)' },
      { label: 'AC Output', value: '500W Pure Sine (1,000W Surge)' },
      { label: 'Solar Input (MPPT)', value: '12V-35V DC up to 300W Max' },
      { label: 'DC Outputs', value: '100W USB-C PD, 2x USB-A QC3.0, 12V Cig Socket' },
      { label: 'Auxiliary Connectors', value: 'Anderson SB50 50A High Current' },
      { label: 'Weight & Enclosure', value: '11.8 kg in Mil-Spec Steel Can' }
    ],
    components: [
      { name: '12.8V 100Ah LiFePO4 Drop-In or DIY 4S Cell Pack', specOrRating: '100A BMS internal protection', purpose: 'Primary power reservoir' },
      { name: 'Victron SmartSolar or EPEVER 20A MPPT', specOrRating: '100V / 20A Solar Input', purpose: 'High-efficiency solar harvest from portable panels' },
      { name: '500W 12V Pure Sine Wave Inverter Board', specOrRating: '12V DC to 120V/230V AC pure sine wave', purpose: 'Powering laptops, lights, routers & CPAP machines' },
      { name: 'Digital Shunt Coulometer Gauge', specOrRating: 'TF03K 100A Hall effect or precision shunt', purpose: 'Accurate State of Charge (SOC) tracking' },
      { name: 'Dual USB-C 100W PD + QC3.0 Fast Charger', specOrRating: 'Buck-Boost 12-24V input, 5V-20V 5A PD', purpose: 'Fast charging modern laptops and phones' },
      { name: 'Magnetic Bearing 80mm IP67 Cooling Fans', specOrRating: '12V PWM thermal-triggered fans with wire grilles', purpose: 'Internal heat dissipation when inverter is loaded' }
    ],
    buildProcess: [
      {
        stepNumber: 1,
        title: 'Ammo Can Prep, CNC Drilling & Powder Touch-up',
        description: 'Marked the front panel cutout for AC receptacles, digital meter, and Anderson sockets. Drilled cooling vents with bi-metal hole saws and de-burred edges before applying zinc anti-corrosion primer.',
        checkpoints: ['Edges sealed with rubber edge trim to prevent wire chafing']
      },
      {
        stepNumber: 2,
        title: 'Thermal Management & Air Duct Fabrication',
        description: 'Installed push-pull 80mm silent ball-bearing fans. Designed an internal baffle that isolates the AC inverter exhaust heat away from the lithium battery cells.',
        safetyTip: 'LiFePO4 battery cells should not be exposed to temperatures exceeding 55°C during continuous heavy inverter operation.'
      },
      {
        stepNumber: 3,
        title: 'DC Busbar Routing, Fusing & Shunt Wiring',
        description: 'Wired all high-current paths with 4 AWG ultra-flexible silicone wire. Placed a 60A inline MRBF fuse directly on the positive battery terminal post.',
        checkpoints: ['All crimps hydraulic-pressed with copper lugs and heat-shrink sealed']
      },
      {
        stepNumber: 4,
        title: 'Full Load Testing & Calibration',
        description: 'Calibrated the shunt monitor to 100% full capacity. Connected a 450W halogen load to test sustained inverter output and thermal equilibrium for 2 consecutive hours.',
        checkpoints: ['Case outer temperature stayed below 32°C at ambient 22°C']
      }
    ],
    results: {
      continuousLoad: '480W continuous AC draw for 2.2 hours without tripping thermal protection',
      efficiency: 'MPPT tracker delivered 98.4% efficiency on 200W solar input',
      thermalPerformance: 'Max internal heatsink temperature stabilized at 54°C with dual fans active',
      summary: 'A rock-solid portable field generator that outperforms commercial retail units at half the price, with completely field-repairable, modular standard components.',
      takeaways: [
        'Steel ammo box provides superior EMI shielding and impact resistance',
        'Standard Anderson connectors enable seamless daisy-chaining of external battery expansion packs'
      ]
    },
    date: '2025-10-02'
  },
  {
    id: 'proj-03',
    title: '3000W Pure Sine Inverter Teardown, MOSFET Upgrade & Mod',
    slug: '3000w-inverter-mosfet-upgrade',
    category: 'inverter',
    categoryLabel: 'Inverter Engineering',
    tagline: 'Transforming a budget high-frequency inverter into an industrial workhorse',
    summary: 'Complete engineering teardown of an off-the-shelf 3000W pure sine wave inverter. Replaced low-spec generic MOSFETs with genuine IRFB4110 low RDS(on) transistors, beefed up DC bus traces, added active snubber circuits, and replaced the noisy fans with silent Noctua PWM cooling.',
    fullDescription: 'Budget inverters often fail prematurely because manufacturers use counterfeit or undersized switching FETs, inadequate thermal pads, and thin PCB copper traces. In this project, we rebuilt the low-voltage DC-DC push-pull stage and high-voltage H-bridge output, lowering internal heat by 42% under 2,400W continuous inductive motor loads.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    difficulty: 'Expert',
    buildTimeHours: 22,
    estimatedCost: '$160 in upgrade components',
    specs: [
      { label: 'Original Rating', value: '3,000W Surge / 1,500W True Continuous' },
      { label: 'Upgraded Rating', value: '2,800W Sustained Continuous / 6,000W Surge' },
      { label: 'Primary Switching FETs', value: '16x IRFB4110PBF (100V, 180A, 3.7mΩ RDSon)' },
      { label: 'High Voltage H-Bridge', value: '4x IXYS 600V 40A Fast IGBTs' },
      { label: 'THD (Total Harmonic Distortion)', value: '< 2.1% under inductive motor loads' },
      { label: 'Thermal Improvement', value: '-24°C on primary heatsinks under 2kW load' }
    ],
    components: [
      { name: 'IRFB4110PBF Power MOSFETs', specOrRating: '16 matched genuine transistors, TO-220 package', purpose: 'Primary DC-DC push-pull primary switching stage' },
      { name: 'Bergquist Sil-Pad 2000 Thermal Interface', specOrRating: '0.45 W/m-K high dielectric strength', purpose: 'Eliminate mica washer shorts and improve heat transfer' },
      { name: '10AWG Solid Copper Bus Reinforcement Wire', specOrRating: 'Tinned copper solder-bridged along high-current traces', purpose: 'Overcome PCB copper 2oz trace current limitations' },
      { name: 'Fast Recovery Snubber Diodes & Metalized Film Caps', specOrRating: 'Murata 1000V high-frequency polypropylene', purpose: 'Absorb high-voltage inductive spikes on transformer primaries' },
      { name: 'Microcontroller PWM Fan Controller Board', specOrRating: 'ATtiny85 with NTC thermistor input', purpose: 'Proportional fan curve based on real-time heatsink temp' }
    ],
    buildProcess: [
      {
        stepNumber: 1,
        title: 'Oscilloscope Waveform Baseline Analysis',
        description: 'Connected a 100MHz Siglent oscilloscope to examine gate drive signals and output sine wave ringing at 500W, 1000W, and 2000W loads. Discovered significant overshoot on the primary switching ringing.',
        checkpoints: ['Recorded baseline gate rise time = 85ns with excessive ringing on switch-off']
      },
      {
        stepNumber: 2,
        title: 'De-soldering & Heatsink Extraction',
        description: 'Extracted 16 budget MOSFETs using a desoldering gun and flux. Cleaned the PCB ground planes and verified no thermal stress cracks existed in the double-sided PCB vias.',
        safetyTip: 'Always discharge high-voltage 400V capacitors through a 1kΩ 10W cement resistor before touching the board!'
      },
      {
        stepNumber: 3,
        title: 'PCB Trace Reinforcement & MOSFET Installation',
        description: 'Solder-braided heavy solid copper wire along the positive and negative 12V rails to triple current capacity. Installed matched IRFB4110 MOSFETs with high-performance thermal insulation pads.',
        checkpoints: ['Verified gate resistor values (10Ω) and drive diodes to guarantee clean gate transitions']
      },
      {
        stepNumber: 4,
        title: 'Load Bank Stress Test & Sine Wave Certification',
        description: 'Ran 2.5kW continuous compressor and heat gun loads for 1 hour. Waveform remained undistorted, clean pure sine wave with less than 2.1% THD.',
        checkpoints: ['Peak heatsink temperature reduced from 86°C (stock) to 58°C (upgraded)']
      }
    ],
    results: {
      continuousLoad: 'Successfully powered a 1.5HP air compressor without tripping overcurrent protect',
      thermalPerformance: 'Heatsink dropped by 28°C under 2,000W continuous bench test',
      efficiency: 'Increased overall conversion efficiency from 88.5% to 93.8%',
      summary: 'By replacing budget transistors and beefing up PCB traces, this modified inverter now handles tough inductive motor startup surges with ease and runs completely silent at idle.',
      takeaways: [
        'Stock thermal pads are often poorly installed in cheap inverters; upgrading pads makes a massive difference',
        'Gate drive wave-shaping prevents catastrophic shoot-through failures'
      ]
    },
    date: '2025-08-20'
  },
  {
    id: 'proj-04',
    title: 'Dual-Axis MPPT Solar Array Combiner Box with Surge Arrestor',
    slug: 'solar-combiner-box-surge-arrestor',
    category: 'solar',
    categoryLabel: 'Solar Engineering',
    tagline: 'Weatherproof 600V DC 4-string combiner box with lightning protection',
    summary: 'Custom built outdoor solar combiner box designed to merge 4 parallel strings of high-voltage photovoltaic panels into dual MPPT inputs with individual DC breakers, reverse blocking diodes, and Type II surge protection.',
    fullDescription: 'High-voltage solar PV strings are vulnerable to lightning-induced surges and backfeeding faults. This project details how to construct an IP66 rated outdoor combiner box conforming to NEC standards with DIN rail mounted components, cable glands, and an isolated equipment grounding busbar.',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    difficulty: 'Intermediate',
    buildTimeHours: 10,
    estimatedCost: '$210 - $260',
    specs: [
      { label: 'Max PV Array Voltage', value: '600V DC Nominal' },
      { label: 'String Inputs', value: '4 String Inputs (Dual MPPT 2x2)' },
      { label: 'Breaker Ratings', value: '16A 500VDC 2-Pole MCBs' },
      { label: 'Surge Protection', value: 'Type II SPD, 500VDC, 40kA Imax' },
      { label: 'Enclosure Rating', value: 'IP66 UV-Stabilized Polycarbonate' },
      { label: 'Lightning Grounding', value: '6 AWG Solid Copper Ground Bus' }
    ],
    components: [
      { name: 'Fibox IP66 Polycarbonate Enclosure', specOrRating: '300 x 400 x 180mm with clear hinged door', purpose: 'Weather and UV protection' },
      { name: 'DIN Rail DC Circuit Breakers', specOrRating: '4x 16A 2-Pole 500V DC polarized', purpose: 'Independent string disconnect & overcurrent safety' },
      { name: 'Solar Surge Protective Device (SPD)', specOrRating: 'Type II, Uc 500VDC, In 20kA, Imax 40kA', purpose: 'Diverts atmospheric electrical surges to earth ground' },
      { name: 'Anti-Backfeed Blocking Diodes', specOrRating: '30A 1000V Schottky diodes in aluminum heatsinks', purpose: 'Prevents shaded strings from drawing reverse current' },
      { name: 'Genuine MC4 Bulkhead Connectors', specOrRating: 'IP68 rated with heavy rubber O-rings', purpose: 'Tool-less waterproof connection to roof solar arrays' }
    ],
    buildProcess: [
      {
        stepNumber: 1,
        title: 'DIN Rail Layout & Punching Cable Ports',
        description: 'Laid out the symmetrical spacing for 4 double-pole breakers, 2 SPDs, and the heavy ground bar. Punched precision knockouts using hydraulic chassis punches for 8x MC4 bulkheads.',
        checkpoints: ['Maintained minimum 25mm clearance between DC positive and negative bus rails']
      },
      {
        stepNumber: 2,
        title: 'Wiring High-Voltage DC Strings',
        description: 'Used double-insulated 10 AWG solar PV wire with halogen-free jackets. Crimped insulated ferrules on every stranded conductor before torquing into screw clamp terminals.',
        safetyTip: 'Never connect solar panel leads while working inside the box in daylight!'
      },
      {
        stepNumber: 3,
        title: 'Earth Grounding & Surge Diverter Verification',
        description: 'Bonded the SPD ground leads directly to an 8-foot copper ground rod using a continuous 6 AWG copper ground run to minimize impedance.',
        checkpoints: ['Ground loop impedance measured under 5 ohms']
      }
    ],
    results: {
      voltageSag: 'Less than 0.15% voltage loss across internal switchgear at 30A cumulative current',
      thermalPerformance: 'Internal temperature remained within 3°C of ambient under full solar generation',
      summary: 'The custom combiner box provides complete isolation and protection for off-grid PV arrays, protecting expensive MPPT charge controllers and inverters from lightning transients.',
      takeaways: [
        'Dedicated DC rated circuit breakers are mandatory; standard AC breakers will sustain destructive arcs in DC circuits',
        'Individual string disconnects make troubleshooting shaded or damaged solar panels effortless'
      ]
    },
    date: '2025-07-11'
  },
  {
    id: 'proj-05',
    title: 'Precision Bench Power Supply & Active Dummy Load DIY',
    slug: 'bench-power-supply-active-dummy-load',
    category: 'electronics',
    categoryLabel: 'Electronics Engineering',
    tagline: '0-30V 10A Programmable Lab PSU with 150W Electronic Constant Current Load',
    summary: 'A dual-purpose electronics workbench powerhouse: a linear regulated low-noise bench power supply combined with a precision constant-current active load for testing lithium batteries, power supplies, and solar modules.',
    fullDescription: 'Essential for testing battery capacity curves and solar panel V-I characteristics. Built around heavy toroidal transformers, multi-turn Bourns wirewound potentiometers, four paralleled IRFP250N power MOSFETs on a CPU cooler, and a microcontrolled logging module.',
    imageUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    difficulty: 'Advanced',
    buildTimeHours: 16,
    estimatedCost: '$140 - $180',
    specs: [
      { label: 'Voltage Range', value: '0.00 V - 32.00 V (0.01V Resolution)' },
      { label: 'Current Output', value: '0.00 A - 10.00 A Adjustable Limit' },
      { label: 'Ripple & Noise', value: '< 1.8 mV RMS at 5A load' },
      { label: 'Active Load Dissipation', value: '150W Continuous (300W Peak)' },
      { label: 'Load Modes', value: 'Constant Current (CC), Constant Voltage (CV), Battery Cutoff' },
      { label: 'Display & Logging', value: 'IPS Color TFT with USB Serial Telemetry' }
    ],
    components: [
      { name: '300VA Toroidal Power Transformer', specOrRating: 'Dual 0-18V 8A secondaries with tap switching', purpose: 'Low noise, high efficiency primary AC power supply' },
      { name: 'IRFP250N High-Power MOSFETs', specOrRating: '4 matched TO-247 packages mounted on copper heatsink', purpose: 'Active load variable resistance dissipation stage' },
      { name: '0.01Ω 50W Dale Precision Shunt Resistor', specOrRating: '1% tolerance, 15ppm temperature coefficient', purpose: 'Accurate current sensing with zero thermal drift' },
      { name: 'Dual OP-07 Ultra Low Offset Op-Amps', specOrRating: 'Precision low-drift operational amplifiers', purpose: 'Differential amplification of sense voltages' },
      { name: 'Aluminum Bench Chassis with Digital Panel Meters', specOrRating: 'Laser-cut 1.5mm brushed anodized aluminum', purpose: 'Physical casing, shielding, and user controls' }
    ],
    buildProcess: [
      {
        stepNumber: 1,
        title: 'Toroidal Power Supply & Tap Switching Circuit',
        description: 'Wired relays for automatic secondary tap switching at 15V to prevent excessive voltage drops across pass transistors and reduce thermal dissipation by 60%.',
        checkpoints: ['Confirmed relay chatter-free switching with hysteresis loop']
      },
      {
        stepNumber: 2,
        title: 'Active Load Heatsink & Heatpipe Cooler Mod',
        description: 'Repurposed an AMD AM4 4-heatpipe tower cooler to draw heat away from the 4 IRFP250N transistors. Applied Arctic MX-4 thermal paste and measured thermal resistance.',
        safetyTip: 'Transistors must have matched source degeneration resistors to avoid current hogging.'
      },
      {
        stepNumber: 3,
        title: 'Calibration & Battery Cutoff Programming',
        description: 'Programmed an Arduino Nano to monitor cell cutoff voltage during battery discharge tests, automatically disconnecting the load when a preset threshold (e.g. 2.50V) is hit.',
        checkpoints: ['Calibrated voltage reading against a Keithley 6.5 digit bench multimeter']
      }
    ],
    results: {
      continuousLoad: 'Dissipated 145W continuously for 3 hours with heatsink temp under 62°C',
      efficiency: 'Voltage regulation tighter than 0.05% across 0 to 10A load transitions',
      summary: 'An indispensable piece of DIY lab equipment that enabled precise discharge testing for every single battery build on Gordylez Tech DIY.',
      takeaways: [
        'Using CPU tower coolers is far superior to flat aluminum extrusions for high-wattage active loads',
        'Automatic transformer tap switching cuts heatsink size in half'
      ]
    },
    date: '2025-05-18'
  },
  {
    id: 'proj-06',
    title: 'Blown High-Frequency Inverter Diagnostic & Repair',
    slug: 'inverter-repair-igbt-gate-drive-fix',
    category: 'repairs',
    categoryLabel: 'DIY Repairs',
    tagline: 'Step-by-step diagnostic of a dead 2000W inverter with dead shorted power stage',
    summary: 'A detailed diagnostic walkthrough of an inverter that emitted smoke under a refrigerator startup surge. Shows how to safely locate shorted MOSFETs, test bootstrap diodes, repair burned PCB traces, and verify gate signals before applying full battery voltage.',
    fullDescription: 'Inverter failure is one of the most common issues DIY off-grid builders face. Most people throw them away, but in 85% of cases, the fault is isolated to shorted low-side MOSFETs and blown gate drive resistors. This project teaches the exact diagnostic sequence to revive them without blowing replacement parts.',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    difficulty: 'Intermediate',
    buildTimeHours: 8,
    estimatedCost: '$35 in replacement transistors & resistors',
    specs: [
      { label: 'Device Repaired', value: '2000W / 4000W Peak Pure Sine Inverter' },
      { label: 'Fault Symptoms', value: 'Zero AC output, dead short on 12V DC input, sparks' },
      { label: 'Root Cause', value: 'Low-side MOSFET punch-through + blown 10Ω gate resistors' },
      { label: 'Oscilloscope Diagnosis', value: 'SG3525 PWM IC & IR2110 High/Low Gate Drivers' },
      { label: 'Diagnostic Tools Used', value: 'DMM Diode Test, Current-Limited PSU, Scope' },
      { label: 'Post-Repair Load Test', value: '1,800W continuous resistive load tested successfully' }
    ],
    components: [
      { name: 'Replacement MOSFETs (IRFB3206)', specOrRating: '60V 210A 3.0mΩ low RDS(on) genuine parts', purpose: 'Replace shorted DC-DC primary switching bank' },
      { name: '10 Ohm 1/4W Metal Film Resistors', specOrRating: '1% tolerance flameproof resistors', purpose: 'Replace vaporized gate drive resistors' },
      { name: 'IR2110 Gate Driver ICs', specOrRating: 'High and Low Side Driver DIP-14', purpose: 'Replaced damaged gate driver chip' },
      { name: 'Fast Recovery Diodes (UF4007)', specOrRating: '1000V 1A ultra-fast switching diodes', purpose: 'Bootstrap charge pump circuit' }
    ],
    buildProcess: [
      {
        stepNumber: 1,
        title: 'Safety Discharge & Visual PCB Inspection',
        description: 'Discharged all primary and secondary filter capacitors. Conducted thorough visual inspection under magnification to identify burned copper traces and discolored gate resistors.',
        safetyTip: 'Always check DC input capacitors for residual charge before placing multimeter leads.'
      },
      {
        stepNumber: 2,
        title: 'In-Circuit Diode Testing of Power Transistors',
        description: 'Measured Gate-to-Drain, Gate-to-Source, and Drain-to-Source with DMM in diode mode. Identified 4 out of 12 MOSFETs reading a dead short (0.001V) in both directions.',
        checkpoints: ['Extracted all 4 shorted FETs and cleaned PCB solder pads with wick']
      },
      {
        stepNumber: 3,
        title: 'Gate Drive Waveform Verification on Scope (No High Voltage)',
        description: 'Powered only the low-voltage control board via a current-limited 12V 1A bench supply. Observed complementary square waves with crisp 40ns edges on the gate pads before installing new FETs.',
        checkpoints: ['Verified 50kHz switching frequency on PWM controller outputs']
      },
      {
        stepNumber: 4,
        title: 'Installing New Transistors & Soft-Start Test',
        description: 'Soldered new matched MOSFETs with fresh thermal pads. Brought up voltage gradually with an incandescent 12V 55W headlight bulb in series with the battery to act as an automatic current limiter.',
        checkpoints: ['Bulb flashed once then went dark — indicating healthy capacitor charging with zero short']
      }
    ],
    results: {
      continuousLoad: 'Successfully powered 1,500W electric kettle and 500W halogen lamp simultaneously',
      efficiency: 'No anomalous heating detected on thermal camera after 45 minutes of run time',
      summary: 'A simple $35 component repair saved a $300 high-end inverter from the landfill and restored reliable off-grid power to the shop.',
      takeaways: [
        'Never install new MOSFETs without testing the gate driver IC; a damaged driver will immediately destroy new transistors',
        'A 12V car headlight bulb in series is the ultimate low-cost protection during initial power-up'
      ]
    },
    date: '2025-04-09'
  }
];
