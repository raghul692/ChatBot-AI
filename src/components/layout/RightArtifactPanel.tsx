import React from 'react';
import { useWorkspace } from '../../context/useWorkspace';
import { DocumentViewer } from '../artifacts/DocumentViewer';
import { DataWorkspace } from '../artifacts/DataWorkspace';
import { CodeWorkspace } from '../artifacts/CodeWorkspace';
import { FlashcardsViewer } from '../artifacts/FlashcardsViewer';
import { QuizViewer } from '../artifacts/QuizViewer';

export const RightArtifactPanel: React.FC = () => {
  const { 
    isRightPanelOpen, 
    toggleRightPanel, 
    activeMode,
    setActiveMode, 
    activeArtifact,
    isPanelExpanded,
    togglePanelExpand,
    openModal 
  } = useWorkspace();

  if (!isRightPanelOpen) return null;

  const renderArtifactWorkspace = () => {
    switch (activeMode) {
      case 'code':
        return <CodeWorkspace artifact={activeArtifact?.type === 'code' ? activeArtifact.data : undefined} />;
      case 'data':
        return <DataWorkspace artifact={activeArtifact?.type === 'data' ? activeArtifact.data : undefined} />;
      case 'study':
        return (
          <div className="flex flex-col h-full divide-y divide-border">
            <div className="h-1/2 overflow-hidden">
              <FlashcardsViewer artifact={activeArtifact?.type === 'study' ? activeArtifact.data : undefined} />
            </div>
            <div className="h-1/2 overflow-hidden">
              <QuizViewer artifact={activeArtifact?.type === 'study' ? activeArtifact.data : undefined} />
            </div>
          </div>
        );
      case 'document':
      case 'research':
      case 'vision':
      default:
        return <DocumentViewer />;
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay when Artifact Panel is opened on mobile */}
      <div 
        onClick={toggleRightPanel}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 md:hidden animate-fadeIn cursor-pointer"
      />

      <aside 
        className={`fixed md:relative inset-y-0 right-0 bg-surface border-l border-border flex flex-col transition-all duration-300 z-40 shrink-0 shadow-2xl md:shadow-none ${
          isPanelExpanded ? 'w-full md:w-[85vw]' : 'w-full md:w-[440px] lg:w-[500px] xl:w-[560px]'
        }`}
      >
        {/* Top Tab Header */}
        <header className="flex items-center justify-between px-3 pt-2 border-b border-border bg-surface-container-low select-none">
          <div className="flex space-x-1 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setActiveMode('document')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg font-medium text-xs transition-colors cursor-pointer shrink-0 ${
                activeMode === 'document' || activeMode === 'general'
                  ? 'bg-surface border-t border-l border-r border-border text-on-surface -mb-[1px] relative z-10'
                  : 'text-muted hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-primary-container">
                description
              </span>
              <span>Document</span>
            </button>

            <button
              onClick={() => setActiveMode('data')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg font-medium text-xs transition-colors cursor-pointer shrink-0 ${
                activeMode === 'data'
                  ? 'bg-surface border-t border-l border-r border-border text-on-surface -mb-[1px] relative z-10'
                  : 'text-muted hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-400">
                table_chart
              </span>
              <span>Data</span>
            </button>

            <button
              onClick={() => setActiveMode('code')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg font-medium text-xs transition-colors cursor-pointer shrink-0 ${
                activeMode === 'code'
                  ? 'bg-surface border-t border-l border-r border-border text-on-surface -mb-[1px] relative z-10'
                  : 'text-muted hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-purple-400">
                data_object
              </span>
              <span>Code</span>
            </button>

            <button
              onClick={() => setActiveMode('study')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg font-medium text-xs transition-colors cursor-pointer shrink-0 ${
                activeMode === 'study'
                  ? 'bg-surface border-t border-l border-r border-border text-on-surface -mb-[1px] relative z-10'
                  : 'text-muted hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-amber-400">
                school
              </span>
              <span>Study</span>
            </button>
          </div>

          {/* Panel Window Controls */}
          <div className="flex items-center gap-1 pl-2 mb-1 shrink-0">
            <button
              onClick={togglePanelExpand}
              className="hidden md:flex p-1 rounded text-muted hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              title={isPanelExpanded ? 'Standard View' : 'Fullscreen'}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isPanelExpanded ? 'fullscreen_exit' : 'fullscreen'}
              </span>
            </button>
            <button
              onClick={toggleRightPanel}
              className="p-1 rounded text-muted hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
              title="Close Panel"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
          </div>
        </header>

        {/* Artifact Sub-Header Action Bar */}
        <div className="flex items-center justify-between px-3 md:px-4 py-2 border-b border-border bg-surface select-none">
          <div className="flex items-center gap-2 font-medium text-xs text-on-surface truncate pr-2">
            <span className="material-symbols-outlined text-[16px] text-primary-container shrink-0">
              {activeMode === 'code' ? 'code' : activeMode === 'data' ? 'database' : activeMode === 'study' ? 'school' : 'description'}
            </span>
            <span className="truncate">
              {activeArtifact?.data?.title || activeArtifact?.data?.fileName || activeArtifact?.data?.topic || (activeMode === 'code' ? 'AgentPool.tsx' : activeMode === 'data' ? 'Employee_Performance_Q4.csv' : activeMode === 'study' ? 'Quantum Mechanics Fundamentals' : 'q2_market_report.pdf')}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              onClick={() => openModal('export')}
              className="flex items-center gap-1 px-2 py-1 rounded bg-surface-container-low border border-border text-muted hover:text-on-surface hover:bg-surface-container-high transition-colors text-[11px] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
              <span className="hidden sm:inline">Download</span>
            </button>
            <button 
              onClick={() => openModal('share')}
              className="flex items-center gap-1 px-2 py-1 rounded bg-surface-container-low border border-border text-muted hover:text-on-surface hover:bg-surface-container-high transition-colors text-[11px] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">ios_share</span>
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Main Workspace Body */}
        <div className="flex-1 overflow-hidden">
          {renderArtifactWorkspace()}
        </div>
      </aside>
    </>
  );
};
