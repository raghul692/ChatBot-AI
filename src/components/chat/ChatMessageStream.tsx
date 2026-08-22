import React, { useState } from 'react';
import type { Message } from '../../types';
import { useWorkspace } from '../../context/useWorkspace';

interface ChatMessageStreamProps {
  messages: Message[];
}

const FormattedContent: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');

  return (
    <div className="space-y-2 text-on-surface leading-relaxed break-words overflow-hidden">
      {lines.map((line, idx) => {
        let trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Clean out raw comment tags or symbols like */ or /* or ---
        trimmed = trimmed.replace(/\*\//g, '').replace(/\/\*/g, '').replace(/^---$/, '');
        if (!trimmed) return null;

        // Heading lines (# or ## or ###)
        if (trimmed.startsWith('#')) {
          const headingText = trimmed.replace(/^#+\s*/, '');
          return (
            <div key={idx} className="font-bold text-sm md:text-base text-primary-container mt-2 mb-1 flex items-center gap-2">
              {parseInlineStyles(headingText)}
            </div>
          );
        }

        // List item lines (* or - or 1.)
        if (/^[\*\-]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
          const listText = trimmed.replace(/^([\*\-]|^\d+\.)\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2 ml-1">
              <span className="text-primary-container text-xs mt-1 shrink-0">•</span>
              <div>{parseInlineStyles(listText)}</div>
            </div>
          );
        }

        // Regular paragraph
        return (
          <div key={idx}>
            {parseInlineStyles(trimmed)}
          </div>
        );
      })}
    </div>
  );
};

function parseInlineStyles(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const raw = match[0];
    if (raw.startsWith('**') && raw.endsWith('**')) {
      const boldText = raw.slice(2, -2);
      parts.push(
        <strong key={match.index} className="font-semibold text-on-surface">
          {boldText}
        </strong>
      );
    } else if (raw.startsWith('`') && raw.endsWith('`')) {
      const codeText = raw.slice(1, -1);
      parts.push(
        <code key={match.index} className="px-1.5 py-0.5 rounded bg-surface-container-high font-mono text-xs text-primary-container border border-border break-all">
          {codeText}
        </code>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export const ChatMessageStream: React.FC<ChatMessageStreamProps> = ({ messages }) => {
  const { isStreaming, setActiveDocPage, openModal, language, setActiveArtifact, sendMessage } = useWorkspace();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (language === 'ta') utterance.lang = 'ta-IN';
        utterance.onend = () => setSpeakingId(null);
        window.speechSynthesis.speak(utterance);
        setSpeakingId(id);
      }
    }
  };

  // Welcome Hero screen when chat is fresh and empty
  if (messages.length === 0) {
    const suggestions = [
      {
        icon: 'code',
        color: 'text-purple-400',
        title: 'Write a Python Script',
        desc: 'Generate clean Python code for data processing or fibonacci sequence',
        prompt: 'write python fibonacci'
      },
      {
        icon: 'psychology',
        color: 'text-sky-400',
        title: 'Explain Quantum Computing',
        desc: 'Understand superposition, entanglement, and quantum qubits simply',
        prompt: 'explain quantum computing in simple terms'
      },
      {
        icon: 'database',
        color: 'text-emerald-400',
        title: 'Data & SQL Analytics',
        desc: 'Generate interactive SQL queries and visual data charts',
        prompt: 'analyze quarterly revenue sql chart'
      },
      {
        icon: 'school',
        color: 'text-amber-400',
        title: 'Study & 3D Flashcards',
        desc: 'Create interactive 3D flashcards and multiple-choice quizzes',
        prompt: 'generate study flashcards for artificial intelligence'
      }
    ];

    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center max-w-3xl mx-auto w-full text-center animate-fadeIn">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-primary-container to-purple-600 flex items-center justify-center text-white shadow-lg mb-4">
          <span className="material-symbols-outlined text-[28px] sm:text-[32px]">psychology</span>
        </div>

        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-on-surface mb-2">
          What would you like to explore today?
        </h1>
        <p className="text-xs md:text-sm text-muted max-w-md mb-6 sm:mb-8">
          Aetheris AI is powered by Google Gemini live models. Select a suggestion below or type your prompt to start a new thread.
        </p>

        {/* Suggestion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          {suggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(item.prompt)}
              className="p-3.5 sm:p-4 rounded-2xl bg-surface border border-border hover:border-primary-container/60 hover:bg-surface-container-high transition-all text-left flex items-start gap-3 group cursor-pointer shadow-xs"
            >
              <div className={`p-2 sm:p-2.5 rounded-xl bg-surface-container-low border border-border group-hover:scale-105 transition-transform shrink-0 ${item.color}`}>
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">{item.icon}</span>
              </div>
              <div className="overflow-hidden">
                <h3 className="font-semibold text-xs text-on-surface group-hover:text-primary-container transition-colors mb-0.5">
                  {item.title}
                </h3>
                <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-5 md:space-y-6 max-w-3xl mx-auto w-full">
      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        const isCopied = copiedId === msg.id;

        return (
          <div
            key={msg.id}
            className={`flex gap-2.5 sm:gap-3 text-xs md:text-sm animate-fadeIn ${
              isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            {!isUser && (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-primary-container/20 border border-primary-container/30 flex items-center justify-center text-primary-container shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">psychology</span>
              </div>
            )}

            <div className={`space-y-1.5 max-w-[92%] sm:max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
              {/* Sender Name & Timestamp */}
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-muted font-mono px-1 flex-wrap">
                <span className="font-semibold text-on-surface">
                  {isUser ? 'You' : 'Aetheris Intelligence'}
                </span>
                <span>•</span>
                <span>{msg.timestamp}</span>
                {msg.confidenceScore && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[9px] sm:text-[10px] border border-emerald-500/20">
                    {(msg.confidenceScore * 100).toFixed(0)}% confidence
                  </span>
                )}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`p-3.5 sm:p-4 rounded-2xl leading-relaxed relative group overflow-hidden ${
                  isUser
                    ? 'bg-primary-container text-white font-medium rounded-tr-xs shadow-sm'
                    : 'bg-surface border border-border text-on-surface rounded-tl-xs shadow-md space-y-3'
                }`}
              >
                <FormattedContent content={msg.content} />

                {/* Citations section */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-3 border-t border-border space-y-2">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                      VERIFIED RETRIEVAL SOURCES
                    </span>
                    {msg.citations.map((cit) => (
                      <div
                        key={cit.id}
                        onClick={() => {
                          if (cit.pageNumber) setActiveDocPage(cit.pageNumber);
                          setActiveArtifact({
                            type: 'document',
                            data: { title: cit.sourceTitle, page: cit.pageNumber || 1 }
                          });
                        }}
                        className="p-2.5 sm:p-3 rounded-xl bg-surface-container-low border border-border hover:border-amber-400/60 transition-all cursor-pointer group/cit flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-amber-400 shrink-0">
                            bookmark
                          </span>
                          <div className="overflow-hidden">
                            <span className="font-semibold text-on-surface group-hover/cit:text-amber-400 transition-colors truncate block">
                              {cit.sourceTitle}
                            </span>
                            <span className="text-[10px] sm:text-[11px] text-muted block font-mono">
                              Page {cit.pageNumber || 1} • {(cit.confidence * 100).toFixed(0)}% match
                            </span>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-[16px] text-muted group-hover/cit:text-amber-400 transition-colors shrink-0">
                          open_in_new
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Code Artifact trigger card with inline Copy Code button */}
                {msg.codeArtifact && (
                  <div className="mt-3 p-3 rounded-xl bg-surface-container-low border border-purple-500/30 hover:border-purple-500/60 transition-all flex items-center justify-between group/code flex-wrap gap-2">
                    <div 
                      onClick={() => setActiveArtifact({ type: 'code', data: msg.codeArtifact })}
                      className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-[160px]"
                    >
                      <span className="material-symbols-outlined text-[20px] text-purple-400 shrink-0">code</span>
                      <div className="overflow-hidden">
                        <span className="font-mono font-bold text-on-surface group-hover/code:text-purple-400 transition-colors truncate block">
                          {msg.codeArtifact.fileName}
                        </span>
                        <span className="text-[10px] text-muted block truncate">Click to open IDE in Panel</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(`code-${msg.id}`, msg.codeArtifact?.code || '');
                      }}
                      className="px-2 py-1 rounded-lg bg-surface border border-border hover:bg-surface-container-high text-xs text-muted hover:text-on-surface flex items-center gap-1 transition-all cursor-pointer shrink-0"
                      title="Copy Code"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {copiedId === `code-${msg.id}` ? 'check' : 'content_copy'}
                      </span>
                      <span className="text-[10px] font-mono">
                        {copiedId === `code-${msg.id}` ? 'Copied!' : 'Copy Code'}
                      </span>
                    </button>
                  </div>
                )}

                {/* Data Artifact trigger card */}
                {msg.dataArtifact && (
                  <div 
                    onClick={() => setActiveArtifact({ type: 'data', data: msg.dataArtifact })}
                    className="p-3 rounded-xl bg-surface-container-low border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer group flex items-center justify-between mt-2"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="material-symbols-outlined text-[20px] text-emerald-400 shrink-0">table_chart</span>
                      <div className="overflow-hidden">
                        <span className="font-bold text-on-surface group-hover:text-emerald-400 transition-colors truncate block">
                          {msg.dataArtifact.title}
                        </span>
                        <span className="text-[10px] text-muted block truncate">Click to view Data Grid & Charts</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-muted group-hover:text-emerald-400 shrink-0">chevron_right</span>
                  </div>
                )}

                {/* Study Artifact trigger card */}
                {msg.studyArtifact && (
                  <div 
                    onClick={() => setActiveArtifact({ type: 'study', data: msg.studyArtifact })}
                    className="p-3 rounded-xl bg-surface-container-low border border-amber-500/30 hover:border-amber-500/60 transition-all cursor-pointer group flex items-center justify-between mt-2"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="material-symbols-outlined text-[20px] text-amber-400 shrink-0">school</span>
                      <div className="overflow-hidden">
                        <span className="font-bold text-on-surface group-hover:text-amber-400 transition-colors truncate block">
                          {msg.studyArtifact.topic}
                        </span>
                        <span className="text-[10px] text-muted block truncate">Click to practice 3D Flashcards & Quiz</span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-muted group-hover:text-amber-400 shrink-0">chevron_right</span>
                  </div>
                )}
              </div>

              {/* Message Toolbar Actions for User & Assistant */}
              <div className="flex items-center gap-1.5 pt-1 text-muted px-1">
                <button
                  onClick={() => handleCopy(msg.id, msg.content)}
                  className="px-2 py-0.5 rounded hover:text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy Text"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isCopied ? 'check' : 'content_copy'}
                  </span>
                  <span className="text-[10px] font-mono">
                    {isCopied ? 'Copied!' : 'Copy'}
                  </span>
                </button>

                {!isUser && (
                  <>
                    <button
                      onClick={() => handleSpeak(msg.id, msg.content)}
                      className={`p-1 rounded hover:text-on-surface hover:bg-surface-container-high transition-colors ${speakingId === msg.id ? 'text-primary-container animate-pulse' : ''}`}
                      title="Read Aloud Text-to-Speech"
                    >
                      <span className="material-symbols-outlined text-[14px]">volume_up</span>
                    </button>

                    <button
                      onClick={() => openModal('share')}
                      className="p-1 rounded hover:text-on-surface hover:bg-surface-container-high transition-colors"
                      title="Share Message"
                    >
                      <span className="material-symbols-outlined text-[14px]">share</span>
                    </button>

                    <div className="h-3 w-[1px] bg-border mx-0.5" />

                    <button className="p-1 rounded hover:text-emerald-400 hover:bg-surface-container-high transition-colors" title="Good Response">
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                    </button>
                    <button className="p-1 rounded hover:text-rose-400 hover:bg-surface-container-high transition-colors" title="Poor Response">
                      <span className="material-symbols-outlined text-[14px]">thumb_down</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Streaming cursor indicator */}
      {isStreaming && (
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-surface border border-border text-xs text-muted animate-pulse">
          <span className="material-symbols-outlined text-[18px] text-primary-container animate-spin shrink-0">
            psychology
          </span>
          <span className="typing-cursor">Aetheris AI is synthesizing answers & live Google Gemini stream...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
