import React from 'react';
import { useWorkspace } from '../../context/useWorkspace';

export const LeftSidebar: React.FC = () => {
  const { 
    currentScreen, 
    navigateToScreen, 
    conversations, 
    activeConversationId, 
    setActiveConversationId,
    setActiveMode,
    createNewChat,
    isMobileSidebarOpen,
    closeMobileSidebar
  } = useWorkspace();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div 
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn cursor-pointer"
        />
      )}

      {/* Responsive Navigation Drawer */}
      <nav 
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col h-full p-4 space-y-4 bg-surface border-r border-border w-[280px] shrink-0 transition-transform duration-300 ease-in-out select-none shadow-2xl lg:shadow-none ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Workspace Header */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-container text-white flex items-center justify-center font-bold text-base shadow-sm">
              A
            </div>
            <div className="overflow-hidden">
              <h1 className="font-semibold text-on-surface text-sm truncate">
                Project Alpha
              </h1>
              <p className="text-[11px] text-muted truncate">
                Multi-agent Workspace
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button 
            onClick={closeMobileSidebar} 
            className="lg:hidden p-1 rounded-lg text-muted hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Primary CTA - New Chat */}
        <button
          onClick={() => {
            createNewChat();
          }}
          className="w-full bg-primary-container hover:bg-primary-container/90 text-white font-medium text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>New Chat</span>
        </button>

        {/* Navigation Scrollable Container */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1">
          {/* Workspace Views */}
          <div>
            <h3 className="px-3 text-[10px] font-mono text-muted uppercase tracking-wider mb-2">
              Workspace Views
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => navigateToScreen('chat-active')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  currentScreen.startsWith('chat')
                    ? 'bg-surface-container-high text-on-surface border border-border shadow-xs'
                    : 'text-muted hover:bg-surface-container-high/60 hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-primary-container">
                  space_dashboard
                </span>
                <span>Active Workspace</span>
              </button>

              <button
                onClick={() => navigateToScreen('files-library')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  currentScreen === 'files-library'
                    ? 'bg-surface-container-high text-on-surface border border-border shadow-xs'
                    : 'text-muted hover:bg-surface-container-high/60 hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-blue-400">
                  folder_open
                </span>
                <span>Library</span>
              </button>

              <button
                onClick={() => navigateToScreen('knowledge-base')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  currentScreen.startsWith('knowledge')
                    ? 'bg-surface-container-high text-on-surface border border-border shadow-xs'
                    : 'text-muted hover:bg-surface-container-high/60 hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-purple-400">
                  description
                </span>
                <span>Artifacts</span>
              </button>

              <button
                onClick={() => navigateToScreen('processing-queue')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  currentScreen === 'processing-queue'
                    ? 'bg-surface-container-high text-on-surface border border-border shadow-xs'
                    : 'text-muted hover:bg-surface-container-high/60 hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-400">
                  insights
                </span>
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {/* Workspace Modes */}
          <div>
            <h3 className="px-3 text-[10px] font-mono text-muted uppercase tracking-wider mb-2">
              Modes
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveMode('study');
                  navigateToScreen('chat-active');
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 text-muted hover:bg-surface-container-high/60 hover:text-on-surface text-xs font-medium rounded-xl transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-amber-400">
                  school
                </span>
                <span>Study Mode</span>
              </button>

              <button
                onClick={() => {
                  setActiveMode('data');
                  navigateToScreen('chat-active');
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 text-muted hover:bg-surface-container-high/60 hover:text-on-surface text-xs font-medium rounded-xl transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-teal-400">
                  database
                </span>
                <span>Data Mode</span>
              </button>

              <button
                onClick={() => {
                  setActiveMode('code');
                  navigateToScreen('chat-active');
                }}
                className="w-full flex items-center gap-3 px-3 py-1.5 text-muted hover:bg-surface-container-high/60 hover:text-on-surface text-xs font-medium rounded-xl transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-indigo-400">
                  code
                </span>
                <span>Code Mode</span>
              </button>
            </div>
          </div>

          {/* Recent Threads */}
          <div>
            <h3 className="px-3 text-[10px] font-mono text-muted uppercase tracking-wider mb-2">
              Recent Threads
            </h3>
            <div className="space-y-1">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setActiveConversationId(conv.id);
                    navigateToScreen('chat-active');
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                    activeConversationId === conv.id
                      ? 'bg-surface-container-high text-on-surface font-semibold'
                      : 'text-muted hover:text-on-surface hover:bg-surface-container-high/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] text-muted shrink-0">
                    chat_bubble_outline
                  </span>
                  <span className="truncate text-left">{conv.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Suite Footer */}
        <div className="pt-3 border-t border-border space-y-1">
          <h3 className="px-3 text-[10px] font-mono text-muted uppercase tracking-wider mb-1">
            Settings Suite
          </h3>
          <button
            onClick={() => navigateToScreen('user-profile')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentScreen === 'user-profile' ? 'bg-primary-container text-white font-bold' : 'text-muted hover:text-on-surface hover:bg-surface-container-high/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">account_circle</span>
            <span>User Profile</span>
          </button>

          <button
            onClick={() => navigateToScreen('ai-preferences')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentScreen === 'ai-preferences' ? 'bg-primary-container text-white font-bold' : 'text-muted hover:text-on-surface hover:bg-surface-container-high/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-amber-400">tune</span>
            <span>AI Preferences</span>
          </button>

          <button
            onClick={() => navigateToScreen('appearance-language')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentScreen === 'appearance-language' ? 'bg-primary-container text-white font-bold' : 'text-muted hover:text-on-surface hover:bg-surface-container-high/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-purple-400">palette</span>
            <span>Appearance & Lang</span>
          </button>

          <button
            onClick={() => navigateToScreen('storage-management')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentScreen === 'storage-management' ? 'bg-primary-container text-white font-bold' : 'text-muted hover:text-on-surface hover:bg-surface-container-high/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-emerald-400">hard_drive</span>
            <span>Storage</span>
          </button>

          <button
            onClick={() => navigateToScreen('security-privacy')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              currentScreen === 'security-privacy' ? 'bg-primary-container text-white font-bold' : 'text-muted hover:text-on-surface hover:bg-surface-container-high/60'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-rose-400">shield</span>
            <span>Security & Danger</span>
          </button>
        </div>
      </nav>
    </>
  );
};
