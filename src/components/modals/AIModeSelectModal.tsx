import React from 'react';
import { 
  X, 
  Sparkles, 
  FileText, 
  FileSpreadsheet, 
  Code, 
  GraduationCap, 
  Compass, 
  Eye, 
  Check 
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import type { AIMode } from '../../types';

export const AIModeSelectModal: React.FC = () => {
  const { activeModal, closeModal, activeMode, setActiveMode } = useWorkspace();

  if (activeModal !== 'mode-select') return null;

  const modes: { id: AIMode; title: string; desc: string; icon: any; color: string }[] = [
    {
      id: 'general',
      title: 'General Assistant',
      desc: 'Versatile multi-turn conversational AI for open-ended queries.',
      icon: Sparkles,
      color: 'text-indigo-400'
    },
    {
      id: 'document',
      title: 'Document Analysis',
      desc: 'Ingest PDFs/Docx with precise page citations & highlight matching.',
      icon: FileText,
      color: 'text-blue-400'
    },
    {
      id: 'data',
      title: 'Data Analyst & SQL',
      desc: 'Parse CSVs, generate SQL aggregations, and render Recharts.',
      icon: FileSpreadsheet,
      color: 'text-emerald-400'
    },
    {
      id: 'code',
      title: 'Code Engineer & IDE',
      desc: 'Syntax compilation, diff comparison, and synthetic execution stdout.',
      icon: Code,
      color: 'text-purple-400'
    },
    {
      id: 'study',
      title: 'Study & Active Recall',
      desc: 'Generate 3D-flippable flashcards & self-testing MCQ quizzes.',
      icon: GraduationCap,
      color: 'text-amber-400'
    },
    {
      id: 'research',
      title: 'Deep Research Engine',
      desc: 'Multi-source synthesis canvas across vector database indices.',
      icon: Compass,
      color: 'text-cyan-400'
    },
    {
      id: 'vision',
      title: 'Vision & Diagram QA',
      desc: 'Multi-modal image analysis for architecture diagrams & OCR.',
      icon: Eye,
      color: 'text-rose-400'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface border border-subtle rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent-primary" />
            <h2 className="text-base font-bold text-primary">Switch AI Workspace Mode</h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-hover">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
          {modes.map((m) => {
            const Icon = m.icon;
            const isSelected = activeMode === m.id;

            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMode(m.id);
                  closeModal();
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${isSelected ? 'border-accent-primary bg-accent-primary/10' : 'border-subtle bg-surface-elevated/40 hover:bg-surface-hover'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-surface border border-subtle ${m.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-primary">{m.title}</h3>
                    <p className="text-[11px] text-muted line-clamp-1">{m.desc}</p>
                  </div>
                </div>

                {isSelected && <Check className="w-4 h-4 text-accent-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
