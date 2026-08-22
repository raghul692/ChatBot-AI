import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { StudyArtifact } from '../../types';

interface FlashcardsViewerProps {
  artifact?: StudyArtifact;
}

export const FlashcardsViewer: React.FC<FlashcardsViewerProps> = ({ artifact }) => {
  const cards = artifact?.flashcards || [
    {
      id: 'fc-1',
      question: 'What is the formula for Scaled Dot-Product Attention?',
      answer: 'Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V',
      difficulty: 'medium' as const
    },
    {
      id: 'fc-2',
      question: 'Why do we scale by 1 / sqrt(d_k) in dot-product attention?',
      answer: 'For large values of d_k, the dot products grow large in magnitude, pushing softmax into regions with vanishing gradients.',
      difficulty: 'hard' as const
    },
    {
      id: 'fc-3',
      question: 'What is Key-Value (KV) Caching during LLM inference?',
      answer: 'KV Caching stores previously computed Key and Value vectors for past tokens in memory so they do not need to be recomputed at each step.',
      difficulty: 'easy' as const
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);

  const activeCard = cards[currentIndex];

  const handleFlip = () => setFlipped(!flipped);

  const handleNext = () => {
    setFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-low text-xs text-on-surface">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-border bg-surface flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-amber-400">school</span>
          <span className="font-semibold text-on-surface text-xs">{artifact?.topic || 'Interactive Study Deck'}</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span>Card {currentIndex + 1} of {cards.length}</span>
        </div>
      </div>

      {/* Main 3D Card Area */}
      <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center space-y-6 bg-background">
        <div 
          onClick={handleFlip}
          className="w-full max-w-md h-56 perspective-1000 cursor-pointer group select-none"
        >
          <div 
            className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}
          >
            {/* Front Side */}
            <div className="absolute inset-0 w-full h-full bg-surface border-2 border-border group-hover:border-primary-container/60 rounded-2xl p-6 flex flex-col justify-between shadow-xl backface-hidden">
              <div className="flex items-center justify-between text-[10px] text-muted">
                <span className="font-mono uppercase tracking-wider">QUESTION CARD</span>
                <span className="flex items-center gap-1 text-primary-container">
                  <span className="material-symbols-outlined text-[14px] animate-spin-slow">sync</span>
                  <span>Click to Flip</span>
                </span>
              </div>

              <div className="text-center my-auto">
                <h3 className="text-sm md:text-base font-bold text-on-surface leading-snug">
                  {activeCard.question}
                </h3>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted">
                <span>Difficulty:</span>
                <span className="capitalize font-semibold text-amber-400">{activeCard.difficulty}</span>
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 w-full h-full bg-surface-container-high border-2 border-primary-container rounded-2xl p-6 flex flex-col justify-between shadow-xl rotate-y-180 backface-hidden">
              <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  <span>VERIFIED ANSWER</span>
                </span>
                <span className="text-muted font-mono">BACK</span>
              </div>

              <div className="text-center my-auto">
                <p className="text-xs font-medium text-indigo-100 leading-relaxed font-mono">
                  {activeCard.answer}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="px-3 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-medium transition-all cursor-pointer"
                >
                  Easy
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="px-3 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-medium transition-all cursor-pointer"
                >
                  Medium
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="px-3 py-1 rounded-md bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 font-medium transition-all cursor-pointer"
                >
                  Hard
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center gap-4 select-none">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 rounded-xl bg-surface border border-border hover:bg-surface-container-high text-muted hover:text-on-surface disabled:opacity-30 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>

          <button
            onClick={handleFlip}
            className="px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
          >
            {flipped ? 'Show Question' : 'Reveal Answer'}
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-surface border border-border hover:bg-surface-container-high text-muted hover:text-on-surface transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};
