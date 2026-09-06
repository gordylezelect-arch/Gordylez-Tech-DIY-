import { Tutorial } from '../types';

export const TUTORIALS_DATA: Tutorial[] = [
  {
    id: 'tut-01',
    title: 'How to Properly Top-Balance & Commission LiFePO4 Battery Cells',
    category: 'Batteries & BMS',
    readTime: '12 min read',
    level: 'Intermediate',
    summary: 'A step-by-step masterclass on why new LiFePO4 cells arrive at unequal states of charge, how to safely parallel balance them to 3.65V, and how to verify matching internal resistance before final pack assembly.',
    heroImage: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    date: '2025-10-18',
    steps: [
      {
        heading: '1. Why Factory Prismatic Cells Require Top-Balancing',
        content: 'New Grade-A or Grade-B LiFePO4 cells are shipped at approximately 30% to 50% State of Charge (SOC) to comply with international transport laws. Even matched batches will have minor variance. Due to the notoriously flat voltage curve of lithium iron phosphate (between 3.2V and 3.35V), an active BMS cannot effectively balance cells at mid-state. Balancing MUST occur at the top knee (3.55V - 3.65V).',
        proTip: 'Never attempt to balance cells by voltage below 3.40V; voltage differences below 3.40V correlate to less than 1% state of charge difference.'
      },
      {
        heading: '2. Cleaning Terminals & Internal Resistance (IR) Check',
        content: 'Use an abrasive Scotch-Brite pad followed by 99% isopropyl alcohol to scrub oxidation off the aluminum terminal pads. Using a four-wire AC milliohm meter (such as the RC3563), test each cell at 1kHz. Ensure cell resistances are tightly clustered within 5% of each other (typically 0.20mΩ - 0.30mΩ for 200Ah-300Ah cells).',
      },
      {
        heading: '3. Parallel Busbar Strapping & Bench PSU Setup',
        content: 'Arrange all cells in parallel (all positive terminals linked together, all negative terminals linked together). Connect your adjustable bench power supply with heavy short leads. Set voltage limit strictly to 3.650V with maximum current available. Once current drops below 0.02C (e.g. under 4A on a 200Ah pack), the cells are fully saturated and balanced.',
        proTip: 'Check lead connections with an infrared thermometer during the first 30 minutes to make sure no loose alligator clip is heating up.'
      },
      {
        heading: '4. Settling & Rest Voltage Verification',
        content: 'Disconnect the power supply and remove parallel busbars. Allow the cells to rest undisturbed for 12 to 24 hours. Measure resting open-circuit voltage (OCV) on each cell. High quality cells should settle to between 3.35V and 3.40V and match within 0.002V (2mV) of each other.',
      }
    ],
    keyTakeaways: [
      'Top balancing guarantees maximum usable capacity without premature BMS high-voltage disconnects',
      'Always use a four-wire Kelvin meter to measure true cell internal resistance',
      'Mechanical cell compression fixtures (10-12 psi) extend cycle life up to 40% by preventing pouch delamination'
    ]
  },
  {
    id: 'tut-02',
    title: 'DC Wire Sizing, Fuse Selection (Class T vs ANL) & High-Current Crimping',
    category: 'Tools & Safety',
    readTime: '15 min read',
    level: 'Beginner',
    summary: 'Learn how to calculate voltage drop over high-current low-voltage DC cables, why Class T fuses are mandatory for lithium battery banks, and how to execute cold-welded hydraulic hex crimps.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    date: '2025-09-24',
    steps: [
      {
        heading: '1. The 3% Voltage Drop Rule for DC Circuits',
        content: 'At 12V and 24V, even fractional resistance creates noticeable voltage sag. An inverter pulling 2000W from a 12V battery draws roughly 180 Amps! A mere 0.01 ohm resistance in wiring drops 1.8V and generates over 320 Watts of wasted heat inside your cables. Always size conductors for less than 2% to 3% round-trip voltage drop.',
        proTip: 'Use fine-strand SAE/ABYC marine tinned copper wire rather than stiff solid building Romex wire.'
      },
      {
        heading: '2. Why Standard ANL & Car Audio Fuses Fail on LiFePO4',
        content: 'LiFePO4 battery banks have extraordinarily low internal resistance, which means a catastrophic short can dump over 10,000 to 20,000 Amps in milliseconds. Cheap ANL or glass fuses have an Ampere Interrupting Capacity (AIC) of only 2,000A to 6,000A. When an ANL blows under a dead short, the metal can vaporize and sustain a continuous plasma arc! Always install a Class T fuse (20,000A AIC) directly at the positive battery terminal.',
      },
      {
        heading: '3. Executing a Gas-Tight Hydraulic Hex Crimp',
        content: 'Do not hammer punch battery lugs or fill them with solder alone. Use an 8-ton or 10-ton hydraulic hex crimper matched to heavy wall tinned copper lugs. A proper hex crimp crushes the copper strands into a solid gas-tight copper mass (cold weld) that prevents internal copper oxidation over years of vibration.',
        proTip: 'Finish every crimp with adhesive-lined dual-wall polyolefin heat shrink to completely seal out moisture and prevent oxygen ingress.'
      }
    ],
    keyTakeaways: [
      'Class T fuses are non-negotiable for lithium battery banks exceeding 100Ah capacity',
      'Hydraulic crimping with adhesive heat shrink creates lifetime durable connections',
      'Keep battery-to-inverter cable runs under 1.5 meters (5 feet) wherever possible'
    ]
  },
  {
    id: 'tut-03',
    title: 'Understanding High-Frequency vs Low-Frequency Off-Grid Inverters',
    category: 'Inverters',
    readTime: '10 min read',
    level: 'Intermediate',
    summary: 'A deep-dive technical comparison exploring the engineering tradeoffs between lightweight high-frequency switching inverters and heavy iron-core low-frequency toroidal transformer inverters.',
    heroImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    date: '2025-08-14',
    steps: [
      {
        heading: '1. High Frequency (HF) Inverter Architecture',
        content: 'HF inverters use high-speed PWM MOSFETs operating at 20kHz - 100kHz to boost low-voltage DC to roughly 380V DC via small ferrite transformers, followed by an H-bridge output filter. They are compact, lightweight, and cost-effective, but have modest surge capabilities (typically 2x for a split second) and are more vulnerable to motor back-EMF.',
      },
      {
        heading: '2. Low Frequency (LF) Toroidal Iron Core Architecture',
        content: 'LF inverters convert low-voltage DC directly to AC at 50Hz/60Hz using massive copper and laminated iron transformers. Weighing 3x to 4x more, they can sustain 300% surge capacity for 20 full seconds, making them impervious to well pumps, air compressors, and heavy inductive power tools.',
        proTip: 'If your system powers an off-grid air conditioner or refrigerator with high LRA (Locked Rotor Amps), an LF inverter or oversized HF inverter is required.'
      },
      {
        heading: '3. Idle Consumption Considerations',
        content: 'The major downside of large low-frequency transformers is idle power draw (no-load tare loss). An LF inverter might consume 30W to 60W just sitting switched on, draining up to 1.4 kWh per day in standby. Modern HF inverters typically draw under 8W to 15W at idle.',
      }
    ],
    keyTakeaways: [
      'Choose High Frequency for portable power stations, camping, laptops, and light home loads',
      'Choose Low Frequency for off-grid cabins, workshops with welders, air compressors, and heavy pumps',
      'Always inspect the no-load idle current when calculating solar generation balance'
    ]
  },
  {
    id: 'tut-04',
    title: 'Solar Panel Array Wiring: Series vs Parallel & Cold Weather Voc Calculation',
    category: 'Solar Systems',
    readTime: '14 min read',
    level: 'Advanced',
    summary: 'How to calculate temperature coefficients for solar panels in winter freezing temperatures so you never exceed your MPPT charge controller maximum input voltage limit.',
    heroImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1200&q=80',
    date: '2025-06-30',
    steps: [
      {
        heading: '1. How Cold Weather Spikes Solar Voltage',
        content: 'Solar panel Open Circuit Voltage (Voc) printed on the label is measured at standard test conditions (STC = 25°C / 77°F). As temperatures drop, semiconductor bandgaps expand and voltage INCREASES! On a crisp winter morning at -10°C, a 40V panel might produce 47V. If your series string exceeds your MPPT controller rating (e.g. 100V or 150V), the input transistors will fry instantly.',
        proTip: 'Check the panel spec sheet for Temperature Coefficient of Voc (typically around -0.28% to -0.35% per °C).'
      },
      {
        heading: '2. Step-by-Step Voc Cold Calculation Formula',
        content: 'Formula: Voc(cold) = Voc(STC) * [1 + (Temp Coeff in % / 100) * (Tmin - 25°C)]. For example: a 45V panel with -0.30%/°C in -15°C winter climate: ΔT = -15 - 25 = -40°C. Factor = 1 + (-0.0030 * -40) = 1 + 0.12 = 1.12. Adjusted Voc = 45V * 1.12 = 50.4V per panel. Three panels in series will reach 151.2V, which would destroy a 150V MPPT unit!',
      },
      {
        heading: '3. When to Wire in Parallel vs Series',
        content: 'Series wiring increases voltage and lowers current, permitting smaller gauge wire and longer runs. Parallel wiring maintains safe lower voltages and handles partial shading better, but requires thicker copper wire and individual string fuses.',
      }
    ],
    keyTakeaways: [
      'Always calculate cold Voc using historical local minimum record low temperatures',
      'Leave at least a 10% safety buffer under your MPPT maximum voltage limit',
      'Use inline blocking diodes or combiner boxes when running parallel strings of unequal shade'
    ]
  }
];
