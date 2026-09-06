import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PageId } from '../types';
import {
  Zap,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BatteryCharging,
  Wrench,
  CheckCircle2,
  AlertCircle,
  MapPin,
  MessageCircle
} from 'lucide-react';
import { BRAND_CONTACT_PLACEHOLDERS } from '../data/projectsData';

interface VisitorAuthPageProps {
  onNavigate?: (page: PageId) => void;
}

export const VisitorAuthPage: React.FC<VisitorAuthPageProps> = ({ onNavigate }) => {
  const { visitorLogin, visitorSignup } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword) {
      setLoginError('Please enter both your email address and password.');
      return;
    }

    setLoginLoading(true);
    const result = await visitorLogin(loginEmail, loginPassword);
    setLoginLoading(false);

    if (!result.success) {
      setLoginError(result.error || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setSignupError('Please complete all required registration fields.');
      return;
    }

    if (signupName.trim().length < 2) {
      setSignupError('Please provide your name (at least 2 characters).');
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters long.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match. Please re-enter.');
      return;
    }

    setSignupLoading(true);
    const result = await visitorSignup(signupName.trim(), signupEmail.trim(), signupPassword);
    setSignupLoading(false);

    if (!result.success) {
      setSignupError(result.error || 'Failed to register account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header Bar */}
      <header className="border-b border-white/5 bg-[#0e0e12]/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-500 shadow-md shadow-amber-500/10">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="font-tech text-base font-bold tracking-wider text-white">
              GORDYLEZ <span className="text-amber-500">TECH DIY</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono-code hidden sm:block">
              ENGINEERING WORKSHOP & SOLAR BLUEPRINTS PORTAL
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-purple-300 font-mono-code bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
            <MapPin className="h-3.5 w-3.5 text-purple-400" />
            <span className="hidden sm:inline">Workshop:</span>
            <span>Abiriba, Abia State</span>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('admin')}
              id="visitor-header-owner-login-btn"
              className="flex items-center gap-1.5 text-xs font-mono-code text-slate-300 hover:text-white bg-slate-900/90 border border-white/10 hover:border-amber-500/50 px-3 py-1 rounded-full transition-all shadow-sm cursor-pointer"
              title="Site Owner & Administrator Login"
            >
              <Lock className="h-3 w-3 text-amber-500" />
              <span>Owner Portal</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Authentication Card Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          {/* Brand Intro Badge */}
          <div className="text-center mb-6 space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1 text-xs font-mono-code font-semibold text-amber-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>COMMUNITY VISITOR ACCESS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {activeTab === 'login' ? 'Welcome Back' : 'Join Gordylez Tech DIY'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              {activeTab === 'login'
                ? 'Sign in to access complete off-grid solar schematics, LiFePO4 battery builds, and engineering calculators.'
                : 'Create your free visitor account to view our technical project blueprints, wiring tutorials, and component specs.'}
            </p>
          </div>

          {/* Form Container */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/80">
            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-1.5 rounded-lg border border-white/5 bg-[#070709] p-1 mb-6">
              <button
                type="button"
                id="visitor-tab-login"
                onClick={() => {
                  setActiveTab('login');
                  setLoginError('');
                }}
                className={`flex items-center justify-center gap-2 rounded-md py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Sign In</span>
              </button>
              <button
                type="button"
                id="visitor-tab-signup"
                onClick={() => {
                  setActiveTab('signup');
                  setSignupError('');
                }}
                className={`flex items-center justify-center gap-2 rounded-md py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'signup'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Sign Up</span>
              </button>
            </div>

            {/* LOGIN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="visitor-login-email"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="engineer@example.com"
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="visitor-login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-600 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="visitor-login-submit"
                    disabled={loginLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-500 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:shadow-lg hover:shadow-amber-600/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loginLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <span>Sign In to Workshop</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('signup');
                      setSignupError('');
                    }}
                    className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Don't have an account yet?{' '}
                    <span className="text-amber-500 font-semibold underline underline-offset-2">
                      Sign Up Here
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* SIGNUP FORM */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                {signupError && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{signupError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                    Full Name / Display Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      id="visitor-signup-name"
                      type="text"
                      required
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="e.g. Engr. Michael"
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      id="visitor-signup-email"
                      type="email"
                      required
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="engineer@example.com"
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                    Password (Min. 6 Characters)
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="visitor-signup-password"
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-600 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-400">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      id="visitor-signup-confirm-password"
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-white/10 bg-[#141419] py-2.5 pl-10 pr-3 text-sm text-white placeholder-slate-600 transition-all focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-white/5 bg-[#0a0a0c]/60 p-3 text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Instant access to off-grid solar tools, tutorials, and calculators.</span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="visitor-signup-submit"
                    disabled={signupLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-600 hover:bg-amber-500 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:shadow-lg hover:shadow-amber-600/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {signupLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <span>Create Visitor Account</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('login');
                      setLoginError('');
                    }}
                    className="text-xs text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Already have an account?{' '}
                    <span className="text-amber-500 font-semibold underline underline-offset-2">
                      Sign In
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* Discreet Site Owner Link */}
            {onNavigate && (
              <div className="mt-4 pt-3 border-t border-white/5 text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('admin')}
                  id="visitor-form-owner-link"
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono-code text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <Lock className="h-3 w-3 text-amber-500/70" />
                  <span>Site Owner / Administrator Login &rarr;</span>
                </button>
              </div>
            )}
          </div>

          {/* Workshop Feature Highlights */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3 space-y-1">
              <BatteryCharging className="h-5 w-5 text-amber-500 mx-auto" />
              <p className="text-[11px] font-bold text-slate-200">LiFePO4 Packs</p>
              <p className="text-[10px] text-slate-500 font-mono-code">12V / 24V / 48V</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3 space-y-1">
              <Cpu className="h-5 w-5 text-purple-400 mx-auto" />
              <p className="text-[11px] font-bold text-slate-200">Inverter Tech</p>
              <p className="text-[10px] text-slate-500 font-mono-code">Pure Sine Waves</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-slate-900/40 p-3 space-y-1">
              <Wrench className="h-5 w-5 text-emerald-400 mx-auto" />
              <p className="text-[11px] font-bold text-slate-200">Solar Sizing</p>
              <p className="text-[10px] text-slate-500 font-mono-code">Load Estimators</p>
            </div>
          </div>

          {/* Direct WhatsApp Assistance */}
          <div className="mt-6 text-center">
            <a
              href={BRAND_CONTACT_PLACEHOLDERS.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors font-mono-code"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>Questions? WhatsApp workshop: {BRAND_CONTACT_PLACEHOLDERS.whatsapp}</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-mono-code">
          <span>© {new Date().getFullYear()} Gordylez Tech DIY • Abiriba, Abia State, Nigeria</span>
          {onNavigate && (
            <button
              onClick={() => onNavigate('admin')}
              id="visitor-footer-owner-login-btn"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer py-1 px-2 rounded hover:bg-white/5"
              title="Private Owner & Administrator Login"
            >
              <Lock className="h-3 w-3 text-amber-500" />
              <span>Owner / Admin Portal</span>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
