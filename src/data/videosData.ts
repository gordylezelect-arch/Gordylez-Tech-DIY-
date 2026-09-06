import { VideoItem } from '../types';

export const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'vid-01',
    title: 'DIY 24V 200Ah LiFePO4 Battery Build: Step-by-Step Compression & BMS Wiring',
    category: 'Battery Tests',
    duration: '24:18',
    viewsPlaceholder: '14.2K views (Demo)',
    date: '2025-11-18',
    summary: 'Full bench build recording: assembling 8 Eve prismatic cells, torquing terminal studs to 4.5Nm, installing JK smart active balancer, and running full 180A load tests on our active dummy bank.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    topics: ['Top Balancing', 'Cell Compression', 'JK Smart BMS', 'Load Bank Testing'],
    youtubePlaceholderUrl: 'https://youtube.com/@[YOUR_YOUTUBE_HANDLE]'
  },
  {
    id: 'vid-02',
    title: 'Building a Mil-Spec 500W Solar Generator in a .50 Cal Ammo Can',
    category: 'Solar Builds',
    duration: '18:45',
    viewsPlaceholder: '28.9K views (Demo)',
    date: '2025-10-08',
    summary: 'Constructing an indestructible grab-and-go power station with 1,280Wh of lithium energy, internal MPPT charger, 100W USB-C PD, and Anderson SB50 high-output connectors.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    topics: ['Ammo Can Mod', 'MPPT Integration', '100W PD Wiring', 'Drop Testing'],
    youtubePlaceholderUrl: 'https://youtube.com/@[YOUR_YOUTUBE_HANDLE]'
  },
  {
    id: 'vid-03',
    title: 'Upgrading Cheap 3000W Inverter MOSFETs: How to Fix Blown Stages & Drop Temps',
    category: 'Inverter Mods',
    duration: '21:30',
    viewsPlaceholder: '35.1K views (Demo)',
    date: '2025-08-28',
    summary: 'We desoldered counterfeit transistors from a noisy 3000W pure sine inverter and replaced them with genuine IRFB4110 MOSFETs, beefed up copper traces, and eliminated thermal runaway.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    topics: ['Oscilloscope Diagnostics', 'MOSFET Matching', 'Thermal Pad Replacement', 'THD Waveform Analysis'],
    youtubePlaceholderUrl: 'https://youtube.com/@[YOUR_YOUTUBE_HANDLE]'
  },
  {
    id: 'vid-04',
    title: 'How to Build a 600V DC Solar Combiner Box with DIN Breakers & Lightning Arrestors',
    category: 'Solar Builds',
    duration: '16:12',
    viewsPlaceholder: '19.4K views (Demo)',
    date: '2025-07-16',
    summary: 'Wiring an IP66 weatherized combiner box for high-voltage residential solar strings. Covers DC arc suppression, Type II surge protection, and ground rod bonding.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1200&q=80',
    topics: ['DC Breakers vs AC', 'Surge Diverter Bonding', 'MC4 Waterproof Crimps'],
    youtubePlaceholderUrl: 'https://youtube.com/@[YOUR_YOUTUBE_HANDLE]'
  },
  {
    id: 'vid-05',
    title: 'Diagnosing a Dead Shorted Inverter: Finding Blown Gate Drivers & Shorted FETS',
    category: 'DIY Repairs',
    duration: '19:54',
    viewsPlaceholder: '22.8K views (Demo)',
    date: '2025-04-15',
    summary: 'Learn the safe bench troubleshooting procedure to revive blown inverters without risking sparks or blowing replacement components on first power-up.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    topics: ['Multimeter Diode Test', 'Headlight Current Limiter', 'IR2110 Gate Signals'],
    youtubePlaceholderUrl: 'https://youtube.com/@[YOUR_YOUTUBE_HANDLE]'
  },
  {
    id: 'vid-06',
    title: 'Building a 150W Active Electronic Dummy Load for Battery Capacity Testing',
    category: 'Electronics Teardowns',
    duration: '22:04',
    viewsPlaceholder: '17.3K views (Demo)',
    date: '2025-05-22',
    summary: 'Turn an AMD tower CPU cooler and four IRFP250N power MOSFETs into a precision constant-current load to stress-test your lithium packs with automated cutoff.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=1200&q=80',
    topics: ['Analog CC Loop', 'Op-Amp Sense Circuit', 'Thermal Heatsink Tuning'],
    youtubePlaceholderUrl: 'https://youtube.com/@[YOUR_YOUTUBE_HANDLE]'
  }
];
