import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { StudyArtifact } from '../../types';

interface QuizViewerProps {
  artifact?: StudyArtifact;
}

export const QuizViewer: React.FC<QuizViewerProps> = ({ artifact }) => {
  const quiz = artifact?.quiz || [
    {
      id: 'qz-1',
      question: 'In self-attention, what matrix operational shape does Query (Q) multiplied by Key transposed (K^T) produce?',
      options: [
        'Batch Size × Sequence Length × Sequence Length',
        'Batch Size × Hidden Dimension × Hidden Dimension',
        'Sequence Length × Vocabulary Size',
        'Hidden Dimension × Head Count'
      ],
      correctIndex: 0,
      explanation: 'Q (SeqLen × d_k) multiplied by K^T (d_k × SeqLen) yields an attention matrix of size (SeqLen × SeqLen), representing token-to-token similarity weights.'
    },
    {
      id: 'qz-2',
      question: 'Which positional encoding method uses rotary transformations (RoPE)?',
      options: [
        'Absolute Sinusoidal Embeddings',
        'Rotary Position Embedding (RoPE)',
        'Learned Absolute Embeddings',
        'Relative Bias Matrix'
      ],
      correctIndex: 1,
      explanation: 'RoPE encodes positional information by multiplying key and query vectors with a rotation matrix, allowing relative distance attention scaling.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const activeQuestion = quiz[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (submitted) return;
    setSelectedIndex(idx);
  };

  const handleSubmit = () => {
    if (selectedIndex === null || submitted) return;
    setSubmitted(true);

    if (selectedIndex === activeQuestion.correctIndex) {
      setScore(prev => prev + 1);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    setSelectedIndex(null);
    setSubmitted(false);
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-low text-xs text-on-surface">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-border bg-surface flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">help</span>
          <span className="font-semibold text-on-surface text-xs">Interactive MCQ Quiz Test</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-muted">Score:</span>
          <span className="font-bold text-emerald-400">{score} / {quiz.length}</span>
        </div>
      </div>

      {/* Main Test Canvas */}
      <div className="flex-1 overflow-auto p-6 space-y-6 max-w-lg mx-auto w-full bg-background">
        <div className="flex items-center justify-between text-[11px] text-muted select-none">
          <span>Question {currentIndex + 1} of {quiz.length}</span>
          <span className="font-mono text-primary-container font-semibold">Multiple Choice</span>
        </div>

        <h3 className="text-sm font-bold text-on-surface leading-snug">
          {activeQuestion.question}
        </h3>

        {/* Options List */}
        <div className="space-y-2.5">
          {activeQuestion.options.map((opt, idx) => {
            const isSelected = selectedIndex === idx;
            const isCorrect = idx === activeQuestion.correctIndex;

            let btnStyle = 'border-border bg-surface hover:bg-surface-container-high text-muted hover:text-on-surface';
            if (isSelected) {
              btnStyle = 'border-primary-container bg-primary-container/10 text-on-surface font-semibold';
            }
            if (submitted) {
              if (isCorrect) {
                btnStyle = 'border-emerald-400 bg-emerald-500/20 text-emerald-300 font-bold';
              } else if (isSelected) {
                btnStyle = 'border-rose-400 bg-rose-500/20 text-rose-300 font-bold';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-surface-container-low border border-border flex items-center justify-center font-mono text-[10px] text-muted shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-xs leading-tight">{opt}</span>
                </div>

                {submitted && isCorrect && <span className="material-symbols-outlined text-[18px] text-emerald-400 shrink-0">check_circle</span>}
                {submitted && isSelected && !isCorrect && <span className="material-symbols-outlined text-[18px] text-rose-400 shrink-0">cancel</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation Card */}
        {submitted && (
          <div className="p-4 rounded-xl bg-surface border border-primary-container/40 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary-container">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>AI EXPLANATION</span>
            </div>
            <p className="text-xs text-muted leading-relaxed font-mono">
              {activeQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 flex items-center justify-end gap-3 select-none">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedIndex === null}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-30 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
            >
              Submit Answer
            </button>
          ) : (
            currentIndex < quiz.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-container hover:bg-primary-container/90 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
              >
                <span>Next Question</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            ) : (
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface border border-border hover:bg-surface-container-high text-on-surface font-semibold text-xs shadow-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Restart Quiz</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
