import fs from 'node:fs';
import path from 'node:path';

export interface VisitorUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
  lastLogin: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
  lastLogin: string;
}

export interface Session {
  token: string;
  userId: string;
  role: 'visitor' | 'admin';
  createdAt: string;
  expiresAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectCategory: string;
  systemVoltage?: string;
  estimatedBudget?: string;
  message: string;
  status: 'new' | 'in-progress' | 'completed';
  createdAt: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: 'all' | 'workshop' | 'solar-battery' | 'inverters' | 'field-builds' | 'youtube';
  slot?: 'hero' | 'about' | 'projects' | 'youtube' | 'contact' | 'gallery';
  dateAdded: string;
  isPersonalPhoto?: boolean;
  altText?: string;
}

export interface SitePhotoSlots {
  hero?: string;
  about?: string;
  projects?: string;
  youtube?: string;
  contact?: string;
}

export interface DatabaseSchema {
  admins: AdminUser[];
  visitors: VisitorUser[];
  sessions: Session[];
  inquiries: Inquiry[];
  gallery: GalleryPhoto[];
  siteSlots: SitePhotoSlots;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'photo-hero-01',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    title: 'Gordylez Tech DIY - Electronics Workshop Bench',
    caption: 'Gordylez Tech DIY — Solar & Electrical DIY Projects',
    category: 'workshop',
    slot: 'hero',
    dateAdded: '2026-09-01T10:00:00.000Z',
    isPersonalPhoto: true,
    altText: 'Gordylez Tech DIY engineer testing electronics at the workbench'
  },
  {
    id: 'photo-about-01',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    title: 'Gordylez Tech DIY - Solar Engineering & Bench Testing',
    caption: 'Gordylez Tech DIY — Hands-On Solar & Electrical Engineer',
    category: 'solar-battery',
    slot: 'about',
    dateAdded: '2026-09-01T10:05:00.000Z',
    isPersonalPhoto: true,
    altText: 'Gordylez Tech DIY engineer measuring circuit signals and battery voltages'
  },
  {
    id: 'photo-proj-01',
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    title: 'Solar & Electrical DIY Projects - LiFePO4 Battery Assembly',
    caption: 'Solar & Electrical DIY Projects — Built & Bench Tested by Gordylez Tech DIY',
    category: 'solar-battery',
    slot: 'projects',
    dateAdded: '2026-09-02T11:00:00.000Z',
    isPersonalPhoto: false,
    altText: 'Custom LiFePO4 battery pack and BMS busbar wiring'
  },
  {
    id: 'photo-yt-01',
    url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80',
    title: 'Gordylez Tech DIY - Studio Video Tutorials & Demonstrations',
    caption: 'Gordylez Tech DIY — YouTube Video Tutorials & Field Testing',
    category: 'youtube',
    slot: 'youtube',
    dateAdded: '2026-09-02T11:15:00.000Z',
    isPersonalPhoto: true,
    altText: 'Gordylez Tech DIY video recording setup at the workshop'
  },
  {
    id: 'photo-contact-01',
    url: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=80',
    title: 'Direct Workshop Consultation with Gordylez Tech DIY',
    caption: 'Gordylez Tech DIY — Direct Consultation & Custom Engineering',
    category: 'workshop',
    slot: 'contact',
    dateAdded: '2026-09-02T11:30:00.000Z',
    isPersonalPhoto: true,
    altText: 'Consulting on custom power systems and battery builds'
  },
  {
    id: 'photo-inv-01',
    url: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1200&q=80',
    title: 'Pure Sine Inverter Power Stage Diagnostic & Scope Analysis',
    caption: 'Solar & Electrical DIY Projects — Oscilloscope Signal Tracing',
    category: 'inverters',
    slot: 'gallery',
    dateAdded: '2026-09-03T14:00:00.000Z',
    isPersonalPhoto: false,
    altText: 'Oscilloscope testing pure sine wave inverter harmonic output'
  },
  {
    id: 'photo-field-01',
    url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    title: 'Off-Grid High-Yield Solar Array Field Commissioning',
    caption: 'Gordylez Tech DIY — Solar Array Field Deployment',
    category: 'field-builds',
    slot: 'gallery',
    dateAdded: '2026-09-03T14:30:00.000Z',
    isPersonalPhoto: false,
    altText: 'High efficiency solar panels installed on outdoor off-grid mounting structure'
  }
];

export const INITIAL_SLOTS: SitePhotoSlots = {
  hero: 'photo-hero-01',
  about: 'photo-about-01',
  projects: 'photo-proj-01',
  youtube: 'photo-yt-01',
  contact: 'photo-contact-01'
};

const INITIAL_DB: DatabaseSchema = {
  admins: [],
  visitors: [],
  sessions: [],
  gallery: INITIAL_GALLERY,
  siteSlots: INITIAL_SLOTS,
  inquiries: [
    {
      id: 'inq-001',
      name: 'Chinedu Eze',
      email: 'chinedu.eze@example.com',
      phone: '+234 803 123 4567',
      projectCategory: 'battery',
      systemVoltage: '48V',
      estimatedBudget: '850,000 NGN',
      message: 'Looking to build a 48V 16S 280Ah EVE LiFePO4 battery pack with JK Smart BMS 2A active balancer. Need guidance on compression jig design and busbar sizing.',
      status: 'new',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'inq-002',
      name: 'Dr. Michael Okafor',
      email: 'm.okafor@clinicenergy.ng',
      phone: '+234 802 987 6543',
      projectCategory: 'solar-gen',
      systemVoltage: '24V',
      estimatedBudget: '1,400,000 NGN',
      message: 'Need a mobile rugged 2.5kVA hybrid solar cart for our rural clinic laboratory to power vaccine fridges and centrifuges during grid outages.',
      status: 'in-progress',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

function ensureDbFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
  }
}

export function readDb(): DatabaseSchema {
  ensureDbFile();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as DatabaseSchema;
    let modified = false;
    if (!parsed.gallery || !Array.isArray(parsed.gallery) || parsed.gallery.length === 0) {
      parsed.gallery = INITIAL_GALLERY;
      modified = true;
    }
    if (!parsed.siteSlots) {
      parsed.siteSlots = INITIAL_SLOTS;
      modified = true;
    }
    if (modified) {
      writeDb(parsed);
    }
    return parsed;
  } catch (err) {
    console.error('Error reading database file, resetting to initial state:', err);
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    return INITIAL_DB;
  }
}

export function writeDb(data: DatabaseSchema): void {
  ensureDbFile();
  // Clean up expired sessions periodically on write
  const now = new Date().toISOString();
  data.sessions = data.sessions.filter(s => s.expiresAt > now);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}
