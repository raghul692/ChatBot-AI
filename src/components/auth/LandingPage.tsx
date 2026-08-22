import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';

export const LandingPage: React.FC = () => {
  const { navigateToScreen } = useWorkspace();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState<string>('raghul.raja@aetheris.ai');
  const [password, setPassword] = useState<string>('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToScreen('chat-welcome');
  };

  return (
    <div className="min-h-screen bg-root text-primary flex flex-col justify-between p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Logo */}
      <header className="flex items-center justify-between z-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-primary block">AETHERIS</span>
            <span className="text-[10px] text-muted font-mono block -mt-1">Multimodal AI Workspace v2.4</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <button 
            onClick={() => setAuthMode('login')}
            className={`px-4 py-2 rounded-xl transition-all ${authMode === 'login' ? 'bg-surface border border-subtle text-primary' : 'text-muted hover:text-primary'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setAuthMode('signup')}
            className={`px-4 py-2 rounded-xl bg-accent-primary hover:bg-accent-hover text-white shadow-md transition-all`}
          >
            Create Account
          </button>
        </div>
      </header>

      {/* Main Content Hero & Card Grid */}
      <main className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12 z-10">
        {/* Left Hero Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-semibold">
            <Sparkles className="w-4 h-4" /> Next-Gen Three-Zone Architecture
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary leading-tight">
            The Production-Grade Multimodal Workspace for AI-Driven Research.
          </h1>

          <p className="text-sm text-secondary leading-relaxed max-w-xl">
            Seamlessly synthesize whitepapers, execute TypeScript code in real-time, generate SQL analytical queries, and practice active recall study decks—all within one unified workspace canvas.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2 max-w-lg text-xs">
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Deep Citation Page Tracking</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real-Time Code AST Diffing</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Recharts SQL Grid Integration</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>3D Flashcards & MCQ Quiz</span>
            </div>
          </div>
        </div>

        {/* Right Auth Card */}
        <div className="lg:col-span-5 bg-surface/80 backdrop-blur-xl border border-subtle rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-primary">
              {authMode === 'login' ? 'Welcome Back to Aetheris' : 'Start your Workspace Today'}
            </h2>
            <p className="text-xs text-muted">
              {authMode === 'login' ? 'Enter your credentials to access your vector store.' : 'Join Lead Architects using multimodal AI.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-primary">Work Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-surface-elevated border border-subtle text-primary focus:outline-none focus:border-accent-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-primary">Workspace Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-surface-elevated border border-subtle text-primary focus:outline-none focus:border-accent-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-accent-primary hover:bg-accent-hover text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{authMode === 'login' ? 'Enter Workspace' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-subtle flex items-center justify-center gap-2 text-[11px] text-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SOC2 Type II & Vector Encryption Compliant</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-[11px] text-muted font-mono z-10 pt-6 border-t border-subtle/40">
        © 2026 Aetheris AI Labs Inc. All rights reserved. Multimodal Architecture v2.4.
      </footer>
    </div>
  );
};
