import React, { useState } from 'react';
import { Search, X, Command, FileText, MessageSquare, Database } from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';

export const GlobalSearchModal: React.FC = () => {
  const { activeModal, closeModal, navigateToScreen } = useWorkspace();
  const [query, setQuery] = useState<string>('');

  if (activeModal !== 'search') return null;

  const allItems = [
    {
      id: 'files',
      title: 'Open Ingested Files Library',
      tag: 'Jump to Library',
      icon: FileText,
      color: 'text-blue-400',
      action: () => navigateToScreen('files-library')
    },
    {
      id: 'vectors',
      title: 'View Vector Knowledge Collections',
      tag: 'Jump to Vectors',
      icon: Database,
      color: 'text-purple-400',
      action: () => navigateToScreen('knowledge-base')
    },
    {
      id: 'chat',
      title: 'Active Architecture Synthesis Thread',
      tag: 'Active Thread',
      icon: MessageSquare,
      color: 'text-emerald-400',
      action: () => navigateToScreen('chat-active')
    },
    {
      id: 'queue',
      title: 'View Ingestion & Vector Processing Queue',
      tag: 'Live Queue',
      icon: Database,
      color: 'text-amber-400',
      action: () => navigateToScreen('processing-queue')
    }
  ];

  const filtered = allItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface border border-subtle rounded-2xl w-full max-w-xl p-4 space-y-4 shadow-2xl">
        <div className="flex items-center gap-3 px-3 py-2 bg-surface-elevated rounded-xl border border-subtle">
          <Search className="w-4 h-4 text-accent-primary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search conversations, files, vectors... (Cmd+K)"
            className="w-full bg-transparent border-0 text-xs text-primary focus:outline-none placeholder:text-muted"
            autoFocus
          />
          <button onClick={closeModal} className="p-1 text-muted hover:text-primary">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Filter Results */}
        <div className="space-y-2 max-h-72 overflow-y-auto font-mono text-xs">
          <div className="text-[10px] text-muted uppercase tracking-wider font-semibold px-2">
            Suggested Navigation & Commands ({filtered.length})
          </div>

          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    closeModal();
                  }}
                  className="w-full p-2.5 rounded-lg bg-surface-elevated/40 hover:bg-surface-hover flex items-center justify-between text-left text-secondary hover:text-primary transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    <span>{item.title}</span>
                  </div>
                  <span className="text-[10px] text-muted">{item.tag}</span>
                </button>
              );
            })
          ) : (
            <div className="p-4 text-center text-xs text-muted">
              No matching commands or destinations found for "{query}".
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-subtle flex items-center justify-between text-[10px] text-muted font-mono">
          <div className="flex items-center gap-2">
            <Command className="w-3 h-3" /> Navigation Command Palette
          </div>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};

