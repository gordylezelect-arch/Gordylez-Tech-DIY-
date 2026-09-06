import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PageId, InquiryRecord, AdminStats } from '../types';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  User,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  ExternalLink,
  Users,
  Inbox,
  CheckCircle2,
  Clock,
  Trash2,
  MessageCircle,
  Phone,
  RefreshCw,
  KeyRound,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  MapPin,
  Search,
  Activity,
  Calendar,
  Layers,
  Camera
} from 'lucide-react';
import { BRAND_CONTACT_PLACEHOLDERS } from '../data/projectsData';
import { AdminGalleryTab } from '../components/admin/AdminGalleryTab';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const {
    adminUser,
    isAdminAuthenticated,
    adminExists,
    adminLogin,
    adminSetup,
    adminLogout,
    adminToken,
    visitorUser
  } = useAuth();

  // Navigation tab inside Admin Dashboard
  const [adminTab, setAdminTab] = useState<'overview' | 'inquiries' | 'visitors' | 'gallery' | 'security'>('overview');

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Setup Form State (First-time Admin Setup)
  const [setupUsername, setSetupUsername] = useState('gordylez');
  const [setupEmail, setSetupEmail] = useState('godwinomeh090@gmail.com');
  const [setupPassword, setSetupPassword] = useState('');
  const [setupConfirmPassword, setSetupConfirmPassword] = useState('');
  const [showSetupPassword, setShowSetupPassword] = useState(false);
  const [setupError, setSetupError] = useState('');
  const [setupSuccess, setSetupSuccess] = useState('');
  const [setupLoading, setSetupLoading] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [inquiriesFilter, setInquiriesFilter] = useState<'all' | 'new' | 'in-progress' | 'completed'>('all');
  const [visitors, setVisitors] = useState<Array<{ id: string; email: string; name: string; createdAt: string; lastLogin: string }>>([]);
  const [visitorSearch, setVisitorSearch] = useState('');
  const [dataLoading, setDataLoading] = useState(false);

  // Security Credentials Update Form State
  const [currPassword, setCurrPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [credError, setCredError] = useState('');
  const [credSuccess, setCredSuccess] = useState('');
  const [credLoading, setCredLoading] = useState(false);

  // Load Admin Data when authenticated
  const loadAdminData = async () => {
    if (!adminToken) return;
    setDataLoading(true);
    try {
      const headers = { Authorization: `Bearer ${adminToken}` };

      const [statsRes, inqRes, visRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/inquiries', { headers }),
        fetch('/api/admin/visitors', { headers })
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData.inquiries || []);
      }
      if (visRes.ok) {
        const visData = await visRes.json();
        setVisitors(visData.visitors || []);
      }
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      loadAdminData();
    }
  }, [isAdminAuthenticated, adminToken]);

  // Handle Admin Login
  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim() || !loginPassword) {
      setLoginError('Please enter both your administrator username/email and password.');
      return;
    }

    setLoginLoading(true);
    const result = await adminLogin(loginIdentifier.trim(), loginPassword);
    setLoginLoading(false);

    if (!result.success) {
      setLoginError(result.error || 'Authentication rejected. Incorrect administrator credentials.');
    }
  };

  // Handle Initial Admin Setup
  const handleAdminSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetupError('');
    setSetupSuccess('');

    if (!setupUsername.trim() || !setupEmail.trim() || !setupPassword) {
      setSetupError('Please fill in all setup fields.');
      return;
    }

    if (setupUsername.trim().length < 3) {
      setSetupError('Administrator username must be at least 3 characters.');
      return;
    }

    if (setupPassword.length < 8) {
      setSetupError('Administrator password must be at least 8 characters long for high security.');
      return;
    }

    if (setupPassword !== setupConfirmPassword) {
      setSetupError('Password confirmation does not match. Please re-enter.');
      return;
    }

    setSetupLoading(true);
    const result = await adminSetup(setupUsername.trim(), setupEmail.trim(), setupPassword);
    setSetupLoading(false);

    if (!result.success) {
      setSetupError(result.error || 'Failed to initialize administrator account.');
    } else {
      setSetupSuccess('Administrator account created! Loading your dashboard...');
    }
  };

  // Handle Inquiry Status Change
  const handleUpdateInquiryStatus = async (id: string, newStatus: 'new' | 'in-progress' | 'completed') => {
    if (!adminToken) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      }
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    }
  };

  // Handle Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!adminToken) return;
    if (!window.confirm('Are you sure you want to permanently delete this inquiry?')) return;

    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  // Handle Delete Visitor
  const handleDeleteVisitor = async (id: string, name: string) => {
    if (!adminToken) return;
    if (!window.confirm(`Are you sure you want to remove visitor account "${name}"? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/visitors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        setVisitors(prev => prev.filter(v => v.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete visitor:', err);
    }
  };

  // Handle Change Credentials
  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredError('');
    setCredSuccess('');

    if (!currPassword) {
      setCredError('Current password is required to verify your administrator identity.');
      return;
    }

    if (newPassword && newPassword.length < 8) {
      setCredError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword && newPassword !== confirmNewPassword) {
      setCredError('New passwords do not match.');
      return;
    }

    setCredLoading(true);
    try {
      const res = await fetch('/api/admin/change-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          currentPassword: currPassword,
          newUsername: newUsername.trim() || undefined,
          newEmail: newEmail.trim() || undefined,
          newPassword: newPassword || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setCredError(data.error || 'Failed to update credentials.');
      } else {
        setCredSuccess('Administrator credentials successfully updated!');
        setCurrPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setNewUsername('');
        setNewEmail('');
      }
    } catch (err) {
      setCredError('Network error updating administrator credentials.');
    } finally {
      setCredLoading(false);
    }
  };

  // =========================================================================
  // VIEW 1: FIRST-TIME ADMINISTRATOR SETUP FLOW (If no admin exists yet)
  // =========================================================================
  if (!adminExists && !isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07070a] text-slate-200 flex flex-col justify-between py-8 px-4 sm:px-6">
        <div className="max-w-md w-full mx-auto my-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono-code font-bold text-amber-400">
              <Shield className="h-4 w-4" />
              <span>INITIAL ADMINISTRATOR SETUP</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Gordylez Tech DIY
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              No administrator has been configured yet. Set up your private Master Admin account credentials to take control of your workshop portal.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-[#0d0d12]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/80">
            {setupError && (
              <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{setupError}</span>
              </div>
            )}
            {setupSuccess && (
              <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{setupSuccess}</span>
              </div>
            )}

            <form onSubmit={handleAdminSetupSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Administrator Username
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    id="admin-setup-username"
                    type="text"
                    required
                    value={setupUsername}
                    onChange={(e) => setSetupUsername(e.target.value)}
                    placeholder="gordylez"
                    className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Administrator Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="admin-setup-email"
                    type="email"
                    required
                    value={setupEmail}
                    onChange={(e) => setSetupEmail(e.target.value)}
                    placeholder="godwinomeh090@gmail.com"
                    className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Master Password (Min. 8 characters)
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="admin-setup-password"
                    type={showSetupPassword ? 'text' : 'password'}
                    required
                    value={setupPassword}
                    onChange={(e) => setSetupPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSetupPassword(!showSetupPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showSetupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Confirm Master Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="admin-setup-confirm-password"
                    type={showSetupPassword ? 'text' : 'password'}
                    required
                    value={setupConfirmPassword}
                    onChange={(e) => setSetupConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-300 flex items-start gap-2">
                <KeyRound className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>One-Time Setup:</strong> Once configured, the setup endpoint locks permanently and cannot be re-executed. Passwords are saved with salted scrypt hashing.
                </span>
              </div>

              <button
                type="submit"
                id="admin-setup-submit"
                disabled={setupLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-500 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-amber-600/20 disabled:opacity-50 cursor-pointer"
              >
                {setupLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    <span>Create Administrator Account</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: PRIVATE ADMINISTRATOR LOGIN GATEWAY (If admin exists, but not logged in)
  // =========================================================================
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07070a] text-slate-200 flex flex-col justify-between py-8 px-4 sm:px-6">
        <div className="max-w-md w-full mx-auto my-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs font-mono-code font-bold text-red-400">
              <Lock className="h-4 w-4" />
              <span>RESTRICTED ACCESS • PRIVATE ADMIN GATEWAY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Administrator Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              This area is restricted to authorized Gordylez Tech DIY workshop administrators.
            </p>
          </div>

          {visitorUser && (
            <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-3.5 text-xs text-purple-200 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-white">Currently logged in as Visitor:</p>
                <p className="text-[11px] text-purple-300 font-mono-code">{visitorUser.name} ({visitorUser.email})</p>
              </div>
              <button
                onClick={() => onNavigate('home')}
                className="rounded bg-purple-600/60 hover:bg-purple-600 px-3 py-1.5 text-[11px] font-bold text-white transition-colors shrink-0 cursor-pointer"
              >
                Back to Site
              </button>
            </div>
          )}

          <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/80">
            {loginError && (
              <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Username or Email
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    id="admin-login-identifier"
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Admin username or email"
                    className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Master Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="admin-login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="admin-login-submit"
                  disabled={loginLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-500 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all shadow-lg shadow-amber-600/20 disabled:opacity-50 cursor-pointer"
                >
                  {loginLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Unlock Admin Console</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: PRIVATE ADMINISTRATOR DASHBOARD (Full Access)
  // =========================================================================
  const filteredInquiries = inquiries.filter(inq => {
    if (inquiriesFilter === 'all') return true;
    return inq.status === inquiriesFilter;
  });

  const filteredVisitors = visitors.filter(v => {
    if (!visitorSearch.trim()) return true;
    const query = visitorSearch.toLowerCase();
    return v.name.toLowerCase().includes(query) || v.email.toLowerCase().includes(query);
  });

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-200 flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0e0e13]/95 backdrop-blur-md px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-500">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-tech text-base font-bold text-white tracking-wide">
                GORDYLEZ <span className="text-amber-500">ADMIN CONSOLE</span>
              </span>
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono-code font-bold text-amber-400 border border-amber-500/30">
                MASTER
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono-code">
              Administrator: <strong className="text-slate-200">{adminUser?.username}</strong> ({adminUser?.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 rounded-sm border border-white/10 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-white/30 hover:text-white transition-colors cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5 text-amber-500" />
            <span className="hidden sm:inline">View Public Website</span>
            <span className="sm:hidden">Site</span>
          </button>

          <button
            onClick={adminLogout}
            id="admin-logout-btn"
            className="flex items-center gap-1.5 rounded-sm bg-red-600/20 border border-red-500/30 hover:bg-red-600 px-3 py-1.5 text-xs font-bold text-red-300 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setAdminTab('overview')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                adminTab === 'overview'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setAdminTab('inquiries')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer relative ${
                adminTab === 'inquiries'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Inbox className="h-4 w-4" />
              <span>Inquiries & Quotes</span>
              {stats && stats.newInquiries > 0 && (
                <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.2 text-[10px] font-bold text-white">
                  {stats.newInquiries}
                </span>
              )}
            </button>
            <button
              onClick={() => setAdminTab('visitors')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                adminTab === 'visitors'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Registered Visitors ({visitors.length})</span>
            </button>
            <button
              onClick={() => setAdminTab('gallery')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                adminTab === 'gallery'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Camera className="h-4 w-4" />
              <span>Personal Photos & Gallery</span>
            </button>
            <button
              onClick={() => setAdminTab('security')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                adminTab === 'security'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <KeyRound className="h-4 w-4" />
              <span>Security & Password</span>
            </button>
          </div>

          <button
            onClick={loadAdminData}
            disabled={dataLoading}
            className="flex items-center gap-1.5 rounded bg-slate-900 px-3 py-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${dataLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {adminTab === 'overview' && (
          <div className="space-y-6">
            {/* Metric Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#0e0e13] p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono-code uppercase tracking-wider">Total Inquiries</span>
                  <Inbox className="h-5 w-5 text-amber-500" />
                </div>
                <div className="text-3xl font-bold text-white font-tech">
                  {stats?.totalInquiries || inquiries.length}
                </div>
                <p className="text-[11px] text-slate-500">
                  {stats?.newInquiries || 0} unread / waiting for response
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0e0e13] p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono-code uppercase tracking-wider">Community Visitors</span>
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white font-tech">
                  {stats?.totalVisitors || visitors.length}
                </div>
                <p className="text-[11px] text-slate-500">
                  Registered accounts accessing blueprints
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0e0e13] p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono-code uppercase tracking-wider">Active Sessions</span>
                  <Activity className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-bold text-white font-tech">
                  {stats?.activeSessions || 1}
                </div>
                <p className="text-[11px] text-slate-500">
                  Live authenticated visitor & admin sessions
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0e0e13] p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono-code uppercase tracking-wider">Security State</span>
                  <ShieldCheck className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="text-xl font-bold text-emerald-400 font-tech">
                  Strict Separation
                </div>
                <p className="text-[11px] text-slate-500 font-mono-code">
                  scrypt Salted Hashes • Role Guarded
                </p>
              </div>
            </div>

            {/* Workshop Headquarters Info Banner */}
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/30 shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Workshop Headquarters & Direct WhatsApp</h4>
                  <p className="text-xs text-slate-400">
                    Location: <strong className="text-slate-200">Abiriba, Abia State, Nigeria</strong> • WhatsApp Line: <strong className="text-emerald-400">08067465492</strong>
                  </p>
                </div>
              </div>
              <a
                href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Test WhatsApp Link</span>
              </a>
            </div>

            {/* Recent Inquiries Preview */}
            <div className="rounded-xl border border-white/10 bg-[#0e0e13] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-amber-500" />
                  <span>Recent Workshop Inquiries</span>
                </h3>
                <button
                  onClick={() => setAdminTab('inquiries')}
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <span>View All Inquiries</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs font-mono-code">
                  No inquiries received yet. Submissions from the contact form will appear here.
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div
                      key={inq.id}
                      className="rounded-lg border border-white/5 bg-[#121218] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{inq.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono-code">({inq.email})</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              inq.status === 'new'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : inq.status === 'in-progress'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2">{inq.message}</p>
                      </div>
                      <button
                        onClick={() => setAdminTab('inquiries')}
                        className="self-start sm:self-center text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-white/5 border border-white/10 shrink-0"
                      >
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES & QUOTE REQUESTS */}
        {adminTab === 'inquiries' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0e0e13] border border-white/10 p-3 rounded-xl">
              <div className="flex items-center gap-1.5">
                {(['all', 'new', 'in-progress', 'completed'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setInquiriesFilter(filter)}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      inquiriesFilter === filter
                        ? 'bg-amber-600 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-400 font-mono-code">
                Showing {filteredInquiries.length} of {inquiries.length} Inquiries
              </span>
            </div>

            {/* Inquiries List */}
            {filteredInquiries.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#0e0e13] p-12 text-center text-slate-500 text-xs font-mono-code">
                No inquiries matching selected filter.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="rounded-xl border border-white/10 bg-[#0e0e13] p-5 space-y-4 shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{inq.name}</h4>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              inq.status === 'new'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : inq.status === 'in-progress'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-mono-code">
                          <span>Email: {inq.email}</span>
                          {inq.phone && <span>• Phone: {inq.phone}</span>}
                          <span>• Date: {new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Status Update Control */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-mono-code">Status:</span>
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleUpdateInquiryStatus(
                              inq.id,
                              e.target.value as 'new' | 'in-progress' | 'completed'
                            )
                          }
                          className="rounded border border-white/10 bg-[#16161d] px-2 py-1 text-xs text-white focus:border-amber-500 focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded bg-slate-900 border border-white/5 px-2.5 py-1 text-slate-300 font-mono-code">
                        Category: <strong className="text-amber-400">{inq.projectCategory}</strong>
                      </span>
                      {inq.systemVoltage && (
                        <span className="rounded bg-slate-900 border border-white/5 px-2.5 py-1 text-slate-300 font-mono-code">
                          Voltage: <strong className="text-white">{inq.systemVoltage}</strong>
                        </span>
                      )}
                      {inq.estimatedBudget && (
                        <span className="rounded bg-slate-900 border border-white/5 px-2.5 py-1 text-slate-300 font-mono-code">
                          Budget: <strong className="text-white">{inq.estimatedBudget}</strong>
                        </span>
                      )}
                    </div>

                    {/* Message Body */}
                    <div className="rounded-lg bg-[#141419] p-4 text-xs sm:text-sm text-slate-200 leading-relaxed border border-white/5 whitespace-pre-wrap">
                      {inq.message}
                    </div>

                    {/* Direct Contact Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${inq.name}, this is Gordylez Tech DIY replying to your project inquiry.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition-colors"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            <span>WhatsApp Client</span>
                          </a>
                        )}
                        <a
                          href={`mailto:${inq.email}?subject=${encodeURIComponent(
                            `Gordylez Tech DIY - Response to your ${inq.projectCategory} inquiry`
                          )}`}
                          className="inline-flex items-center gap-1.5 rounded bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs font-bold text-white transition-colors"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Email Client</span>
                        </a>
                      </div>

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-500/10 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: REGISTERED VISITORS */}
        {adminTab === 'visitors' && (
          <div className="space-y-4">
            {/* Search and stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0e0e13] border border-white/10 p-3 rounded-xl">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={visitorSearch}
                  onChange={(e) => setVisitorSearch(e.target.value)}
                  placeholder="Search visitors by name or email..."
                  className="w-full rounded-lg border border-white/10 bg-[#141419] py-1.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <span className="text-xs text-slate-400 font-mono-code">
                Total Visitors: <strong className="text-white">{visitors.length}</strong>
              </span>
            </div>

            {/* Visitors Table / List */}
            {filteredVisitors.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#0e0e13] p-12 text-center text-slate-500 text-xs font-mono-code">
                No registered visitors found matching search query.
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-[#0e0e13] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-white/10 bg-[#121218] text-slate-400 font-mono-code uppercase">
                      <tr>
                        <th className="py-3 px-4">Visitor Name</th>
                        <th className="py-3 px-4">Email Address</th>
                        <th className="py-3 px-4">Registered Date</th>
                        <th className="py-3 px-4">Last Login</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      {filteredVisitors.map((v) => (
                        <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4 font-semibold text-white">
                            {v.name}
                          </td>
                          <td className="py-3 px-4 font-mono-code text-slate-400">
                            {v.email}
                          </td>
                          <td className="py-3 px-4 font-mono-code text-slate-400">
                            {new Date(v.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 font-mono-code text-slate-400">
                            {v.lastLogin ? new Date(v.lastLogin).toLocaleDateString() : '—'}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteVisitor(v.id, v.name)}
                              className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                              title="Delete visitor"
                            >
                              <Trash2 className="h-3.5 w-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PERSONAL PHOTOS & GALLERY MANAGEMENT */}
        {adminTab === 'gallery' && <AdminGalleryTab />}

        {/* TAB 5: SECURITY & CREDENTIALS */}
        {adminTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl border border-white/10 bg-[#0e0e13] p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-amber-500" />
                  <span>Update Administrator Credentials</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Change your administrator username, contact email, or update your master password.
                </p>
              </div>

              {credError && (
                <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{credError}</span>
                </div>
              )}
              {credSuccess && (
                <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{credSuccess}</span>
                </div>
              )}

              <form onSubmit={handleChangeCredentials} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-amber-400">
                    Current Password (Required to Authorize Changes)
                  </label>
                  <input
                    type="password"
                    required
                    value={currPassword}
                    onChange={(e) => setCurrPassword(e.target.value)}
                    placeholder="Enter current master password"
                    className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                      New Username (Optional)
                    </label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder={`Current: ${adminUser?.username}`}
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                      New Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder={`Current: ${adminUser?.email}`}
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                    New Master Password (Leave blank to keep unchanged)
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-3 pr-10 text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {newPassword && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                      Confirm New Master Password
                    </label>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 px-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={credLoading}
                  className="rounded-lg bg-amber-600 hover:bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md shadow-amber-600/20 disabled:opacity-50 cursor-pointer"
                >
                  {credLoading ? 'Saving...' : 'Save Updated Credentials'}
                </button>
              </form>
            </div>

            {/* Security Architecture Audit Box */}
            <div className="rounded-xl border border-white/10 bg-[#0e0e13] p-6 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Security Enforcement Status</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="rounded bg-[#141419] p-3 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono-code">Password Storage</span>
                  <p className="font-semibold text-white">scrypt Key Derivation + Random Salt</p>
                  <p className="text-[10px] text-slate-400">Hardware-bruteforce resistant with timing-safe comparison.</p>
                </div>

                <div className="rounded bg-[#141419] p-3 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono-code">Authorization Separation</span>
                  <p className="font-semibold text-white">Strict Role Verification</p>
                  <p className="text-[10px] text-slate-400">Visitors receive role: 'visitor'. Admin requires verified role: 'admin'.</p>
                </div>

                <div className="rounded bg-[#141419] p-3 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-mono-code">Admin Discovery Protection</span>
                  <p className="font-semibold text-white">Hidden from Public View</p>
                  <p className="text-[10px] text-slate-400">No public navigation links or controls exposed to normal visitors.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
