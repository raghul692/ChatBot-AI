import React from 'react';
import { Cpu, CheckCircle2, Clock, PauseCircle } from 'lucide-react';
import { mockIngestionQueue } from '../../mockData/workspaceData';

export const ProcessingQueue: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">Ingestion & Vector Processing Queue</h1>
          <p className="text-xs text-secondary">
            Real-time status of document chunking, embeddings extraction, and semantic vector indexing.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-subtle font-mono text-xs text-emerald-400">
          <Cpu className="w-4 h-4 animate-spin text-emerald-400" />
          <span>Vector Pipeline Active</span>
        </div>
      </div>

      {/* Queue Items List */}
      <div className="space-y-4">
        {mockIngestionQueue.map((item) => {
          const isDone = item.status === 'completed';
          const isProcessing = item.status === 'processing';

          return (
            <div
              key={item.id}
              className="bg-surface border border-subtle rounded-2xl p-5 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : isProcessing ? (
                    <Clock className="w-5 h-5 text-accent-primary animate-spin shrink-0" />
                  ) : (
                    <PauseCircle className="w-5 h-5 text-muted shrink-0" />
                  )}

                  <div>
                    <h3 className="font-bold text-primary">{item.fileName}</h3>
                    <span className="text-[10px] text-muted font-mono">{item.fileSize}</span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className={isDone ? 'text-emerald-400 font-bold' : isProcessing ? 'text-accent-primary font-bold' : 'text-muted'}>
                    {item.progress}%
                  </span>
                  <span className="text-[10px] text-muted block capitalize">{item.status}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${isDone ? 'bg-emerald-400' : isProcessing ? 'bg-accent-primary' : 'bg-subtle'}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted font-mono">
                <span>Chunks Processed: {item.chunksProcessed}</span>
                <span>Est. Time Remaining: {item.eta}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
