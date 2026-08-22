import React, { useEffect } from 'react';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { useWorkspace } from './context/useWorkspace';
import { LandingPage } from './components/auth/LandingPage';
import { AppHeader } from './components/layout/AppHeader';
import { LeftSidebar } from './components/layout/LeftSidebar';
import { RightArtifactPanel } from './components/layout/RightArtifactPanel';
import { ChatMessageStream } from './components/chat/ChatMessageStream';
import { ChatComposer } from './components/chat/ChatComposer';
import { PromptSuggestions } from './components/chat/PromptSuggestions';
import { FilesLibrary } from './components/knowledge/FilesLibrary';
import { ProcessingQueue } from './components/knowledge/ProcessingQueue';
import { KnowledgeBaseView } from './components/knowledge/KnowledgeBaseView';
import { SettingsSuite } from './components/settings/SettingsSuite';
import { AIModeSelectModal } from './components/modals/AIModeSelectModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { UploadCenterModal } from './components/modals/UploadCenterModal';
import { ShareExportModals } from './components/modals/ShareExportModals';
import { DeleteAccountModal } from './components/modals/DeleteAccountModal';

export const AppContent: React.FC = () => {
  const { currentScreen, messages, openModal } = useWorkspace();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openModal('search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openModal]);

  if (currentScreen === 'landing') {
    return <LandingPage />;
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-root text-primary font-sans overflow-hidden select-none">
      {/* Top Application Header */}
      <AppHeader />

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Navigation Sidebar */}
        <LeftSidebar />

        {/* Center Primary Workspace Canvas */}
        <main className="flex-1 flex flex-col h-full bg-root overflow-hidden relative">
          {currentScreen === 'chat-welcome' || currentScreen === 'chat-active' ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {messages.length <= 1 ? (
                <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
                  <PromptSuggestions />
                </div>
              ) : (
                <ChatMessageStream messages={messages} />
              )}
              <ChatComposer />
            </div>
          ) : currentScreen === 'files-library' ? (
            <FilesLibrary />
          ) : currentScreen === 'processing-queue' ? (
            <ProcessingQueue />
          ) : currentScreen === 'knowledge-base' || currentScreen === 'knowledge-base-detail' ? (
            <KnowledgeBaseView />
          ) : (
            <SettingsSuite />
          )}
        </main>

        {/* Right Artifact Panel */}
        <RightArtifactPanel />
      </div>

      {/* Global Modals Layer */}
      <AIModeSelectModal />
      <GlobalSearchModal />
      <UploadCenterModal />
      <ShareExportModals />
      <DeleteAccountModal />
    </div>
  );
};

export default function App() {
  return (
    <WorkspaceProvider>
      <AppContent />
    </WorkspaceProvider>
  );
}

