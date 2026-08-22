import React, { useState, useEffect } from 'react';
import { useWorkspace } from '../../context/useWorkspace';
import { getStoredGeminiApiKey } from '../../services/geminiApi';

export const AppHeader: React.FC = () => {
  const { 
    activeMode, 
    openModal, 
    toggleRightPanel, 
    theme, 
    toggleTheme,
    language,
    setLanguage,
    navigateToScreen,
    toggleMobileSidebar,
    isMobileSidebarOpen
  } = useWorkspace();

  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    setHasApiKey(Boolean(getStoredGeminiApiKey()));
  }, []);

  const modeMaterialIcons = {
    general: 'psychology',
    document: 'description',
    data: 'database',
    code: 'code',
    study: 'school',
    research: 'compass_calibration',
    vision: 'visibility'
  };

  const currentIcon = modeMaterialIcons[activeMode] || 'psychology';

  return (
    <header className="h-14 flex items-center justify-between px-3 md:px-6 border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-30 shrink-0 select-none">
      {/* Left section: Mobile Hamburger + Workspace Title + Mode */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg text-muted hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isMobileSidebarOpen ? 'close' : 'menu'}
          </span>
        </button>

        <h2 className="text-xs md:text-sm font-semibold text-on-surface truncate max-w-[120px] sm:max-w-xs md:max-w-md">
          Multimodal Strategy & Analysis
        </h2>

        {/* Mode Pill */}
        <button
          onClick={() => openModal('mode-select')}
          className="hidden sm:flex px-2.5 py-1 rounded-full bg-surface-container-high text-muted text-[11px] border border-border items-center gap-1.5 hover:text-on-surface hover:border-primary-container transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[14px] text-primary-container">
            {currentIcon}
          </span>
          <span className="capitalize font-medium">{activeMode} Mode</span>
        </button>

        {/* Gemini API Badge */}
        <button
          onClick={() => navigateToScreen('ai-preferences')}
          className={`hidden xs:flex px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] font-mono border items-center gap-1 transition-all cursor-pointer ${
            hasApiKey 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
          }`}
          title="Configure Gemini API Key in Settings"
        >
          <span className="material-symbols-outlined text-[12px]">key</span>
          <span className="hidden sm:inline">{hasApiKey ? 'Gemini Live' : 'Set Gemini Key'}</span>
        </button>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md mx-2 md:mx-6 hidden md:block">
        <button
          onClick={() => openModal('search')}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-surface-container-low border border-border hover:border-primary-container/60 text-xs text-muted transition-all shadow-xs cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-muted">search</span>
            <span>Search whitepapers, code diffs, datasets...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-[10px] text-muted">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Action Tools */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="bg-surface-container-low border border-border text-[11px] md:text-xs font-medium text-on-surface px-1.5 md:px-2.5 py-1 md:py-1.5 rounded-lg focus:outline-none cursor-pointer hover:bg-surface-container-high transition-colors"
        >
          <option value="en">EN</option>
          <option value="ta">தமிழ்</option>
          <option value="thanglish">Tanglish</option>
        </select>

        {/* Share Button */}
        <button 
          onClick={() => openModal('share')}
          className="p-1.5 text-muted hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer hidden sm:block"
          title="Share Workspace"
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 text-muted hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
          title="Toggle Dark/Light Mode"
        >
          <span className="material-symbols-outlined text-[18px]">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        <div className="h-4 w-[1px] bg-border mx-0.5 md:mx-1" />

        {/* Toggle Right Panel */}
        <button
          onClick={toggleRightPanel}
          className="p-1.5 text-muted hover:text-on-surface rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer"
          title="Toggle Artifact Canvas"
        >
          <span className="material-symbols-outlined text-[18px] text-primary-container">
            dock_to_right
          </span>
        </button>
      </div>
    </header>
  );
};
