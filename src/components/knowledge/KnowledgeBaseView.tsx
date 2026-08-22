import React, { useState } from 'react';
import { Database, Plus, ChevronRight } from 'lucide-react';
import { mockCollections } from '../../mockData/workspaceData';

export const KnowledgeBaseView: React.FC = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const activeCol = mockCollections.find(c => c.id === selectedCollection);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">Knowledge Base Collections</h1>
          <p className="text-xs text-secondary">
            Structured vector indices grouping whitepapers, datasets, and multilingual knowledge.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-primary hover:bg-accent-hover text-white font-semibold text-xs shadow-md transition-all">
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Main Grid View */}
      {!selectedCollection ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockCollections.map((col) => (
            <div
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              className="p-5 rounded-2xl bg-surface border border-subtle hover:border-accent-primary/50 transition-all cursor-pointer group space-y-4 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-accent-primary border border-indigo-500/20">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-muted">{col.fileCount} Documents</span>
                </div>

                <h3 className="text-sm font-bold text-primary group-hover:text-accent-primary transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="pt-3 border-t border-subtle flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {col.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-surface-elevated text-[10px] text-secondary font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>
                <ChevronRight className="w-4 h-4 text-muted group-hover:text-accent-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* COLLECTION DETAIL VIEW (Screen 17) */
        <div className="space-y-6 animate-fadeIn">
          <button
            onClick={() => setSelectedCollection(null)}
            className="text-xs text-accent-primary font-semibold hover:underline flex items-center gap-1"
          >
            ← Back to All Knowledge Bases
          </button>

          <div className="bg-surface border border-subtle rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-primary">{activeCol?.name}</h2>
                <p className="text-xs text-muted">{activeCol?.description}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/30">
                Active Index (Fully Vectorized)
              </span>
            </div>

            <div className="pt-4 border-t border-subtle grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-muted block">Files Count</span>
                <span className="text-primary font-bold">{activeCol?.fileCount} files</span>
              </div>
              <div>
                <span className="text-muted block">Total Size</span>
                <span className="text-primary font-bold">{activeCol?.totalSize}</span>
              </div>
              <div>
                <span className="text-muted block">Last Updated</span>
                <span className="text-primary font-bold">{activeCol?.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
