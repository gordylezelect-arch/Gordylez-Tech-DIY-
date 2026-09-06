/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Project } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SolarBatteryPage } from './pages/SolarBatteryPage';
import { InverterElectronicsPage } from './pages/InverterElectronicsPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { VideosPage } from './pages/VideosPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';
import { VisitorAuthPage } from './pages/VisitorAuthPage';
import { AdminPage } from './pages/AdminPage';
import { GalleryProvider } from './context/GalleryContext';
import { ArrowUp, MessageCircle, Zap } from 'lucide-react';
import { BRAND_CONTACT_PLACEHOLDERS } from './data/projectsData';

function AppContent() {
  const { isVisitorAuthenticated, isAdminAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sync with URL hash and pathname for persistent deep linking (including private /admin or #admin route)
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();

      // Check if user is navigating to admin via path (/admin) or hash (#admin)
      if (path === 'admin' || hash === 'admin') {
        setCurrentPage('admin');
        return;
      }

      const validPages: PageId[] = [
        'home',
        'about',
        'projects',
        'solar-battery',
        'inverter-electronics',
        'tutorials',
        'videos',
        'gallery',
        'contact',
        'admin'
      ];
      
      const matched = (hash || path) as PageId;
      if (validPages.includes(matched)) {
        setCurrentPage(matched);
      }
    };

    handleRouteChange();

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Track scroll position for Back-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Loading State Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center text-slate-200">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 mb-4 animate-pulse">
          <Zap className="h-6 w-6" />
        </div>
        <p className="font-tech text-base font-bold tracking-wider text-white">
          GORDYLEZ <span className="text-amber-500">TECH DIY</span>
        </p>
        <p className="text-xs text-slate-500 font-mono-code mt-1">
          Authenticating security credentials...
        </p>
      </div>
    );
  }

  // 2. Private Admin Route (Isolated from normal visitors)
  if (currentPage === 'admin') {
    return <AdminPage onNavigate={handleNavigate} />;
  }

  // 3. Visitor Authentication Gateway:
  // Visitors must create an account or log in before accessing the main website/app
  if (!isVisitorAuthenticated && !isAdminAuthenticated) {
    return <VisitorAuthPage onNavigate={handleNavigate} />;
  }

  // 4. Authenticated Public Website
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sticky Header Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'projects' && (
          <ProjectsPage onSelectProject={(proj) => setSelectedProject(proj)} />
        )}
        {currentPage === 'solar-battery' && (
          <SolarBatteryPage onSelectProject={(proj) => setSelectedProject(proj)} />
        )}
        {currentPage === 'inverter-electronics' && (
          <InverterElectronicsPage onSelectProject={(proj) => setSelectedProject(proj)} />
        )}
        {currentPage === 'tutorials' && <TutorialsPage />}
        {currentPage === 'videos' && <VideosPage />}
        {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Project Detail Blueprint Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Quick Action Floating Controls */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {/* Floating WhatsApp quick chat trigger */}
        <a
          href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
          target="_blank"
          rel="noreferrer"
          title="Open WhatsApp Chat (08067465492)"
          className="group flex items-center gap-2 rounded-full border border-emerald-500/40 bg-[#0a0a0c]/95 py-2.5 px-3.5 shadow-xl shadow-black/80 backdrop-blur-md hover:border-emerald-400 hover:bg-emerald-950/40 transition-all cursor-pointer"
        >
          <MessageCircle className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="font-mono-code text-[11px] font-semibold text-slate-200 group-hover:text-emerald-300 hidden sm:inline">
            WhatsApp: {BRAND_CONTACT_PLACEHOLDERS.whatsapp}
          </span>
        </a>

        {/* Scroll To Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0c]/90 text-slate-300 shadow-xl backdrop-blur-md hover:border-amber-500 hover:text-amber-400 transition-all cursor-pointer"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Professional Brand Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <GalleryProvider>
        <AppContent />
      </GalleryProvider>
    </AuthProvider>
  );
}
