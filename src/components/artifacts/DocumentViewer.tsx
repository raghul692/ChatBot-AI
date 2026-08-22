import React from 'react';
import { useWorkspace } from '../../context/useWorkspace';

export const DocumentViewer: React.FC = () => {
  const { activeDocPage, setActiveDocPage } = useWorkspace();

  return (
    <div className="flex flex-col h-full bg-surface-container-low text-xs">
      {/* Document Header Controls */}
      <div className="px-4 py-2.5 border-b border-border bg-surface flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary-container">
            description
          </span>
          <span className="font-semibold text-on-surface text-xs">Aetheris System Architecture Whitepaper.pdf</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-mono text-[11px] text-muted">
            <button
              onClick={() => setActiveDocPage(Math.max(1, activeDocPage - 1))}
              disabled={activeDocPage <= 1}
              className="p-1 rounded hover:bg-surface-container-high disabled:opacity-30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>

            <span>Page {activeDocPage} of 24</span>

            <button
              onClick={() => setActiveDocPage(activeDocPage + 1)}
              className="p-1 rounded hover:bg-surface-container-high cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div className="h-4 w-[1px] bg-border" />

          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-surface-container-high text-muted hover:text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">zoom_out</span>
            </button>
            <button className="p-1 rounded hover:bg-surface-container-high text-muted hover:text-on-surface cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">zoom_in</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Page Render Box */}
      <div className="flex-1 overflow-auto p-6 flex justify-center bg-background">
        <div className="w-full max-w-xl bg-surface border border-border rounded-2xl p-8 space-y-6 shadow-xl relative">
          <div className="flex justify-between text-[10px] text-muted font-mono border-b border-border pb-2">
            <span>SECTION 4: ATTENTION ENGINE & SCALING</span>
            <span>AETHERIS LABS</span>
          </div>

          <div className="space-y-4 text-on-surface leading-relaxed">
            <h2 className="text-base font-bold text-on-surface">
              4.1 Scaled Dot-Product Attention Optimization
            </h2>

            <p className="text-xs text-muted">
              We define attention over query <span className="font-mono text-amber-400">Q</span>, key <span className="font-mono text-amber-400">K</span>, and value <span className="font-mono text-amber-400">V</span> matrices. The dot products of queries with all keys are calculated, divided by <span className="font-mono text-amber-400">sqrt(d_k)</span>, and a softmax function is applied to obtain the weights on the values.
            </p>

            {/* Simulated Highlight Citation on Page 14 */}
            <div className="p-4 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-amber-200 text-xs space-y-2.5 my-4 shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-[11px] text-amber-400">
                <span className="material-symbols-outlined text-[16px]">bookmark</span> 
                <span>VERIFIED CITATION MATCH (PAGE {activeDocPage})</span>
              </div>
              <p className="font-mono text-[11px] italic leading-relaxed text-amber-100">
                "Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V. The scaling factor prevents vanishing gradients in large vector spaces."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
