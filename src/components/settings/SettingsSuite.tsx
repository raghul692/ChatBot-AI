import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  HardDrive, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Trash2,
  Check,
  Camera,
  Mail,
  Phone,
  Briefcase,
  Building,
  MapPin,
  User,
  Award,
  Lock,
  Download,
  Upload,
  RefreshCw,
  Key
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { getStoredGeminiApiKey, setStoredGeminiApiKey } from '../../services/geminiApi';

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  avatarUrl: string;
  plan: string;
  twoFactorEnabled: boolean;
}

const defaultProfile: UserProfileData = {
  name: 'Raghul Raja M',
  email: 'raghul.raja@aetheris.ai',
  phone: '+91 98765 43210',
  title: 'Lead AI System Architect',
  company: 'Aetheris Intelligence Labs',
  location: 'Chennai, TN / San Francisco, CA',
  bio: 'Pioneering multimodal AI agent architectures, autonomous coding workflows, and real-time LLM streaming interfaces.',
  avatarUrl: '',
  plan: 'Enterprise Pro (Unlimited)',
  twoFactorEnabled: true
};

export const SettingsSuite: React.FC = () => {
  const { currentScreen, theme, toggleTheme, language, setLanguage, openModal } = useWorkspace();
  const [temperature, setTemperature] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(4096);
  const [apiKey, setApiKey] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // User Profile State
  const [profile, setProfile] = useState<UserProfileData>(defaultProfile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setApiKey(getStoredGeminiApiKey());
    
    // Load stored profile from localStorage
    const savedProfile = localStorage.getItem('aetheris_user_profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }
  }, []);

  const handleProfileChange = (field: keyof UserProfileData, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setProfile(prev => ({ ...prev, avatarUrl: '' }));
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('aetheris_user_profile', JSON.stringify(profile));
      setStoredGeminiApiKey(apiKey);
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }, 400);
  };

  const handleExportProfile = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aetheris_profile_${profile.name.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-4xl mx-auto w-full">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-primary flex items-center gap-2">
            <User className="w-5 h-5 text-accent-primary" />
            <span>Executive Settings & User Profile</span>
          </h1>
          <p className="text-xs text-secondary mt-1">
            Manage your personal identity, contact details, profile photo, security authentication, and AI model parameters.
          </p>
        </div>

        {/* Global Save Indicator */}
        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold animate-pulse shrink-0">
            <Check className="w-4 h-4" />
            <span>Profile Saved & Updated</span>
          </div>
        )}
      </div>

      {/* Screen 20: User Profile */}
      {currentScreen === 'user-profile' && (
        <div className="space-y-6">
          {/* Main Profile Header Card */}
          <div className="bg-surface border border-subtle rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
              {/* Avatar Uploader */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl border-2 border-accent-primary/40 relative">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'US'}</span>
                  )}
                </div>

                {/* Upload Camera Overlay Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-2xl flex flex-col items-center justify-center text-white text-[10px] font-semibold cursor-pointer gap-1"
                  title="Upload profile picture"
                >
                  <Camera className="w-5 h-5 text-accent-primary" />
                  <span>Change Photo</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />

                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-surface shadow-xs" title="Online & Active" />
              </div>

              {/* Identity & Badges */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-primary">{profile.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-[10px] font-bold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {profile.plan}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    2FA Verified
                  </span>
                </div>

                <p className="text-xs text-secondary font-mono flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-accent-primary" /> {profile.title}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-purple-400" /> {profile.company}</span>
                </p>

                <p className="text-xs text-muted leading-relaxed pt-1">
                  {profile.bio}
                </p>

                {/* Avatar Action Buttons */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-surface-elevated hover:bg-surface-elevated/80 border border-subtle text-xs text-primary font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-accent-primary" />
                    Upload Image
                  </button>
                  {profile.avatarUrl && (
                    <button
                      onClick={handleRemoveAvatar}
                      className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs text-rose-400 font-semibold cursor-pointer transition-colors"
                    >
                      Remove Photo
                    </button>
                  )}
                  <button
                    onClick={handleExportProfile}
                    className="px-3 py-1.5 rounded-xl bg-surface-elevated hover:bg-surface-elevated/80 border border-subtle text-xs text-secondary font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ml-auto"
                    title="Export profile schema as JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="bg-surface border border-subtle rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl">
            <h3 className="text-sm font-bold text-primary border-b border-subtle pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-accent-primary" />
              <span>Personal & Professional Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Display Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-accent-primary" />
                  <span>Full Display Name</span>
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  placeholder="e.g. Raghul Raja M"
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-subtle text-xs text-primary focus:outline-none focus:border-accent-primary font-medium"
                />
              </div>

              {/* Work Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  <span>Work Email Address</span>
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  placeholder="e.g. raghul.raja@aetheris.ai"
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-subtle text-xs text-primary focus:outline-none focus:border-accent-primary font-medium"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-subtle text-xs text-primary focus:outline-none focus:border-accent-primary font-medium"
                />
              </div>

              {/* Job Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                  <span>Professional Job Title</span>
                </label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => handleProfileChange('title', e.target.value)}
                  placeholder="e.g. Lead AI Architect"
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-subtle text-xs text-primary focus:outline-none focus:border-accent-primary font-medium"
                />
              </div>

              {/* Organization */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  <span>Organization / Company</span>
                </label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => handleProfileChange('company', e.target.value)}
                  placeholder="e.g. Aetheris Intelligence Labs"
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-subtle text-xs text-primary focus:outline-none focus:border-accent-primary font-medium"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Location / Office Region</span>
                </label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                  placeholder="e.g. San Francisco, CA / Chennai, TN"
                  className="w-full p-2.5 rounded-xl bg-surface-elevated border border-subtle text-xs text-primary focus:outline-none focus:border-accent-primary font-medium"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-primary">Executive Summary / Bio</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                placeholder="Write a brief professional summary..."
                className="w-full p-2.5 rounded-xl bg-surface-elevated border border-subtle text-xs text-primary focus:outline-none focus:border-accent-primary resize-none leading-relaxed font-normal"
              />
            </div>
          </div>
        </div>
      )}

      {/* Screen 21: AI Model Preferences */}
      {currentScreen === 'ai-preferences' && (
        <div className="bg-surface border border-subtle rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 text-accent-primary font-bold text-sm">
            <Sparkles className="w-4 h-4" /> AI Model & Synthesis Hyperparameters
          </div>

          {/* Gemini API Key Configuration Section */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-primary-container/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
              <Key className="w-4 h-4 text-primary-container" />
              <span>Google Gemini API Key (Live Chat Stream Integration)</span>
            </div>
            <p className="text-[11px] text-muted leading-relaxed">
              Enter your Gemini API key below to stream real-time answers from Google Gemini 2.5 Flash / 2.0 Flash for any prompt you type.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-surface border border-border text-xs font-mono text-on-surface focus:outline-none focus:border-primary-container"
              />
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white font-semibold text-xs transition-all shrink-0 cursor-pointer"
              >
                Save Key
              </button>
            </div>
            {apiKey && (
              <span className="text-[10px] text-emerald-400 font-mono block">
                ✓ Gemini API Key configured and active in localStorage
              </span>
            )}
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-primary">Temperature (Creativity): {temperature}</label>
                <span className="text-muted font-mono text-[10px]">0.0 (Deterministic) - 1.0 (Creative)</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-accent-primary cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-primary">Max Response Tokens: {maxTokens}</label>
                <span className="text-muted font-mono text-[10px]">Context Limit: 8,192</span>
              </div>
              <input
                type="range"
                min="1024"
                max="8192"
                step="512"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full accent-accent-primary cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Screen 22: Appearance & Language */}
      {currentScreen === 'appearance-language' && (
        <div className="bg-surface border border-subtle rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-primary">Interface Theme Mode</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={toggleTheme}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${theme === 'dark' ? 'border-accent-primary bg-accent-primary/10' : 'border-subtle bg-surface-elevated'}`}
              >
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-xs text-primary">Dark Mode</span>
                </div>
                {theme === 'dark' && <Check className="w-4 h-4 text-accent-primary" />}
              </button>

              <button
                onClick={toggleTheme}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${theme === 'light' ? 'border-accent-primary bg-accent-primary/10' : 'border-subtle bg-surface-elevated'}`}
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-xs text-primary">Light Mode</span>
                </div>
                {theme === 'light' && <Check className="w-4 h-4 text-accent-primary" />}
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-subtle">
            <h3 className="text-sm font-bold text-primary">Multilingual Intelligence Preference</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setLanguage('en')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${language === 'en' ? 'border-accent-primary bg-accent-primary/10 text-primary font-bold' : 'border-subtle bg-surface-elevated text-muted'}`}
              >
                English (EN)
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${language === 'ta' ? 'border-accent-primary bg-accent-primary/10 text-primary font-bold' : 'border-subtle bg-surface-elevated text-muted'}`}
              >
                தமிழ் (Tamil)
              </button>
              <button
                onClick={() => setLanguage('thanglish')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${language === 'thanglish' ? 'border-accent-primary bg-accent-primary/10 text-primary font-bold' : 'border-subtle bg-surface-elevated text-muted'}`}
              >
                Tanglish (Mix)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 23: Storage Management */}
      {currentScreen === 'storage-management' && (
        <div className="bg-surface border border-subtle rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <HardDrive className="w-4 h-4" /> Vector Index Storage Quota
            </div>
            <span className="font-mono text-xs text-muted">14.2 GB / 50 GB Used</span>
          </div>

          <div className="w-full h-3 bg-surface-elevated rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 w-[28.4%]" />
          </div>
        </div>
      )}

      {/* Screen 24: Security & Danger Zone */}
      {currentScreen === 'security-privacy' && (
        <div className="bg-surface border border-rose-500/30 rounded-2xl p-4 sm:p-6 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" /> Danger Zone & Account Deletion
          </div>

          <p className="text-xs text-muted">
            Permanently wipe all ingested documents, local vector embeddings, and conversation histories.
          </p>

          <button 
            onClick={() => openModal('delete-account')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Delete Account & Purge Vectors
          </button>
        </div>
      )}

      {/* Persistent Save Profile Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-subtle">
        <div className="text-xs text-muted font-mono text-center sm:text-left">
          Last synchronized: {new Date().toLocaleTimeString()}
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-accent-primary hover:bg-accent-hover text-white font-semibold text-xs shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : savedSuccess ? (
            <Check className="w-4 h-4 text-emerald-300" />
          ) : null}
          <span>{isSaving ? 'Saving Profile...' : savedSuccess ? 'Profile Saved!' : 'Save Profile Changes'}</span>
        </button>
      </div>
    </div>
  );
};
