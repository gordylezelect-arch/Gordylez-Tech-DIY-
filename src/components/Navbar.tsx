import React, { useState } from 'react';
import { PageId } from '../types';
import { BRAND_CONTACT_PLACEHOLDERS } from '../data/projectsData';
import { useAuth } from '../context/AuthContext';
import {
  Zap,
  Menu,
  X,
  Wrench,
  Sun,
  Cpu,
  BookOpen,
  Video,
  Mail,
  Info,
  Layers,
  Camera,
  PhoneCall,
  MessageCircle,
  MapPin,
  User,
  LogOut,
  Shield
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { visitorUser, visitorLogout, isAdminAuthenticated } = useAuth();

  const navItems: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Zap },
    { id: 'about', label: 'About', icon: Info },
    { id: 'projects', label: 'DIY Projects', icon: Layers },
    { id: 'solar-battery', label: 'Solar & Battery', icon: Sun },
    { id: 'inverter-electronics', label: 'Inverter & Electronics', icon: Cpu },
    { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md">
      {/* Top micro-bar showing DIY focus */}
      <div className="hidden border-b border-white/5 bg-[#0a0a0c]/90 py-1.5 px-4 text-xs text-slate-400 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-amber-500 font-mono-code text-[11px] font-semibold tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              LAB STATUS: ACTIVE BENCH TESTING
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 text-xs">Solar Generators • LiFePO4 Builds • Inverter Mods • Electronics</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-slate-300 font-mono-code text-[11px]">
              <MapPin className="h-3 w-3 text-purple-400" />
              <span>Abiriba, Abia State, Nigeria</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Direct WhatsApp:</span>
            <a
              href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono-code font-bold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{BRAND_CONTACT_PLACEHOLDERS.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-2.5 text-left transition-transform active:scale-95 cursor-pointer"
        >
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black text-base shadow-sm">
            G
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              GORDYLEZ <span className="text-amber-500 font-bold">TECH DIY</span>
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 xl:flex text-xs uppercase tracking-widest font-medium text-slate-400">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors cursor-pointer pb-1 ${
                  isActive
                    ? 'text-white border-b-2 border-amber-500 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden items-center gap-3 lg:flex xl:flex">
          {/* Only shown if Admin is ALREADY authenticated to easily return to console */}
          {isAdminAuthenticated && (
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1.5 rounded-sm bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-mono-code font-bold text-amber-300 hover:bg-amber-500/30 transition-colors cursor-pointer"
            >
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span>Admin Console</span>
            </button>
          )}

          {visitorUser && (
            <div className="flex items-center gap-2 border-r border-white/10 pr-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                <div className="h-6 w-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300">
                  <User className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <span className="max-w-[120px] truncate">{visitorUser.name}</span>
              </div>
              <button
                onClick={visitorLogout}
                title="Sign out of visitor account"
                className="flex items-center gap-1 rounded bg-slate-900 hover:bg-slate-800 border border-white/10 px-2 py-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <LogOut className="h-3 w-3 text-red-400" />
                <span>Exit</span>
              </button>
            </div>
          )}

          <button
            id="nav-cta-contact"
            onClick={() => handleNavClick('contact')}
            className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-amber-500 transition-colors rounded-sm cursor-pointer shadow-sm"
          >
            Connect
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-900/60 text-slate-300 hover:text-white xl:hidden cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-white/5 bg-[#0a0a0c]/98 px-4 py-4 xl:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-amber-500/15 text-white border border-amber-500/30 font-semibold'
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-white border border-transparent'
                  }`}
                >
                  <div className={`p-1.5 rounded-md ${isActive ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-300'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 border-t border-white/5 pt-4 flex flex-col gap-2.5">
            {visitorUser && (
              <div className="rounded-lg border border-white/5 bg-slate-900/60 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-amber-400">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">{visitorUser.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono-code leading-none mt-1">Community Visitor</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    visitorLogout();
                  }}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            {/* Only visible to Admin if already authenticated */}
            {isAdminAuthenticated && (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 rounded-sm bg-amber-500/20 border border-amber-500/40 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/30 transition-colors"
              >
                <Shield className="h-4 w-4 text-amber-400" />
                <span>Open Admin Console</span>
              </button>
            )}

            <a
              href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-sm bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp ({BRAND_CONTACT_PLACEHOLDERS.whatsapp})</span>
            </a>
            <button
              id="mobile-contact-cta"
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 rounded-sm border border-white/10 bg-slate-900 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-200 hover:border-amber-500/40 hover:text-amber-400 transition-colors"
            >
              <PhoneCall className="h-4 w-4 text-amber-500" />
              <span>Contact Page & Form</span>
            </button>
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px] font-mono-code pt-1">
              <MapPin className="h-3 w-3 text-purple-400" />
              <span>{BRAND_CONTACT_PLACEHOLDERS.location}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
