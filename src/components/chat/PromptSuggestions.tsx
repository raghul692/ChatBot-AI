import React from 'react';
import { 
  FileText, 
  FileSpreadsheet, 
  Code, 
  GraduationCap, 
  Compass, 
  Eye, 
  Sparkles 
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import type { AIMode } from '../../types';

export const PromptSuggestions: React.FC = () => {
  const { sendMessage, setActiveMode } = useWorkspace();

  const suggestions = [
    {
      title: 'Analyze Document',
      prompt: 'Summarize the core technical findings and page-14 citation of Aetheris System Whitepaper.',
      mode: 'document' as AIMode,
      icon: FileText,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Data Analyst Chart',
      prompt: 'Analyze Q3 regional sales dataset, aggregate revenue metrics, and plot a comparison bar chart.',
      mode: 'data' as AIMode,
      icon: FileSpreadsheet,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Write TypeScript Hook',
      prompt: 'Generate a production-ready React + TypeScript custom hook for real-time WebSocket streams.',
      mode: 'code' as AIMode,
      icon: Code,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Study & Flashcards',
      prompt: 'Create study 3D flashcards and a practice MCQ quiz on Transformer Attention mechanisms.',
      mode: 'study' as AIMode,
      icon: GraduationCap,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Deep Research Canvas',
      prompt: 'Perform deep research synthesis on GGUF 4-bit quantization and model compression techniques.',
      mode: 'research' as AIMode,
      icon: Compass,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Vision QA Analysis',
      prompt: 'Analyze uploaded Neural Network Schema diagram and extract layer parameters.',
      mode: 'vision' as AIMode,
      icon: Eye,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    }
  ];

  const handleClick = (prompt: string, mode: AIMode) => {
    setActiveMode(mode);
    sendMessage(prompt);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multimodal Discovery Canvas</span>
        </div>
        <h2 className="text-2xl font-bold text-primary tracking-tight">
          What would you like to explore today?
        </h2>
        <p className="text-xs text-secondary max-w-md mx-auto">
          Select an intent template below or attach documents to trigger adaptive multi-panel workspaces.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        {suggestions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => handleClick(item.prompt, item.mode)}
              className={`p-3.5 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] group flex flex-col justify-between h-32 bg-surface hover:bg-surface-hover ${item.bg}`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                  {item.mode}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-primary group-hover:text-accent-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-muted line-clamp-2 mt-1 font-sans">
                  {item.prompt}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
