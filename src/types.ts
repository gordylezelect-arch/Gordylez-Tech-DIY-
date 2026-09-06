export type PageId =
  | 'home'
  | 'about'
  | 'projects'
  | 'solar-battery'
  | 'inverter-electronics'
  | 'tutorials'
  | 'videos'
  | 'gallery'
  | 'contact'
  | 'admin';

export type PhotoSlotId = 'hero' | 'about' | 'projects' | 'youtube' | 'contact' | 'gallery';

export type GalleryCategory =
  | 'all'
  | 'workshop'
  | 'solar-battery'
  | 'inverters'
  | 'field-builds'
  | 'youtube';

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  slot?: PhotoSlotId;
  dateAdded: string;
  isPersonalPhoto?: boolean;
  altText?: string;
  width?: number;
  height?: number;
}

export interface SitePhotoSlots {
  hero?: string;
  about?: string;
  projects?: string;
  youtube?: string;
  contact?: string;
}

export interface VisitorUser {
  id: string;
  email: string;
  name: string;
  role: 'visitor';
  createdAt?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin';
  createdAt?: string;
  lastLogin?: string;
}

export interface InquiryRecord {
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

export interface AdminStats {
  totalInquiries: number;
  newInquiries: number;
  totalVisitors: number;
  activeSessions: number;
  systemStatus: string;
  workshopLocation: string;
}

export type ProjectCategory =
  | 'solar'
  | 'battery'
  | 'inverter'
  | 'electronics'
  | 'repairs';

export interface ComponentItem {
  name: string;
  specOrRating: string;
  purpose?: string;
  approxCost?: string;
}

export interface BuildStep {
  stepNumber: number;
  title: string;
  description: string;
  safetyTip?: string;
  checkpoints?: string[];
}

export interface ProjectResults {
  continuousLoad?: string;
  peakCapacity?: string;
  efficiency?: string;
  thermalPerformance?: string;
  batteryRuntime?: string;
  voltageSag?: string;
  summary: string;
  takeaways?: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  tagline: string;
  summary: string;
  fullDescription: string;
  imageUrl: string;
  featured: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  buildTimeHours: number;
  estimatedCost: string;
  specs: { label: string; value: string }[];
  components: ComponentItem[];
  buildProcess: BuildStep[];
  results: ProjectResults;
  schematicNote?: string;
  safetyWarnings?: string[];
  date: string;
}

export interface Tutorial {
  id: string;
  title: string;
  category: 'Solar Systems' | 'Batteries & BMS' | 'Inverters' | 'Electronics & Diagnostics' | 'Tools & Safety';
  readTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  heroImage: string;
  date: string;
  steps: {
    heading: string;
    content: string;
    proTip?: string;
  }[];
  keyTakeaways: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'Solar Builds' | 'Battery Tests' | 'Inverter Mods' | 'Electronics Teardowns' | 'DIY Repairs';
  duration: string;
  viewsPlaceholder: string;
  date: string;
  summary: string;
  thumbnailUrl: string;
  topics: string[];
  youtubePlaceholderUrl: string;
}

export interface ContactInfoPlaceholders {
  whatsapp: string;
  whatsappFormatted: string;
  whatsappLink: string;
  phone: string;
  phoneFormatted: string;
  phoneTelLink: string;
  email: string;
  location: string;
  youtube: string;
  youtubeUrl: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  xTwitter: string;
  github: string;
}
