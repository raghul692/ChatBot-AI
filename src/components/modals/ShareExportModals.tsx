import React, { useState } from 'react';
import { X, Share2, Download, Copy, Check, FileText, Code, Globe } from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';

export const ShareExportModals: React.FC = () => {
  const { activeModal, closeModal } = useWorkspace();
  const [copied, setCopied] = useState<boolean>(false);

  if (activeModal !== 'share' && activeModal !== 'export') return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://aetheris.ai/share/workspace-thread-98f2a');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface border border-subtle rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeModal === 'share' ? (
              <Share2 className="w-5 h-5 text-accent-primary" />
            ) : (
              <Download className="w-5 h-5 text-emerald-400" />
            )}
            <h2 className="text-base font-bold text-primary capitalize">
              {activeModal === 'share' ? 'Share Conversation & Canvas' : 'Export Multimodal Artifacts'}
            </h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-hover">
            <X className="w-4 h-4" />
          </button>
        </div>

        {activeModal === 'share' ? (
          <div className="space-y-4">
            <p className="text-xs text-secondary">
              Generate a secure read-only public URL link for your active workspace thread, including live interactive artifacts.
            </p>

            <div className="flex items-center gap-2 p-2 bg-surface-elevated rounded-xl border border-subtle">
              <Globe className="w-4 h-4 text-muted shrink-0" />
              <input
                type="text"
                readOnly
                value="https://aetheris.ai/share/workspace-thread-98f2a"
                className="w-full bg-transparent border-0 font-mono text-xs text-primary focus:outline-none select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-accent-primary hover:bg-accent-hover text-white text-xs font-semibold shrink-0 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-secondary">
              Download your current active workspace thread and generated artifacts in your preferred format.
            </p>

            <button className="w-full p-3 rounded-xl bg-surface-elevated/40 hover:bg-surface-hover border border-subtle flex items-center gap-3 text-left">
              <FileText className="w-4 h-4 text-blue-400" />
              <div>
                <span className="font-bold text-xs text-primary block">Markdown (.md)</span>
                <span className="text-[10px] text-muted">Formatted clean transcript with code blocks</span>
              </div>
            </button>

            <button className="w-full p-3 rounded-xl bg-surface-elevated/40 hover:bg-surface-hover border border-subtle flex items-center gap-3 text-left">
              <Code className="w-4 h-4 text-purple-400" />
              <div>
                <span className="font-bold text-xs text-primary block">JSON Bundle (.json)</span>
                <span className="text-[10px] text-muted">Raw structured payload including citations & vectors</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
