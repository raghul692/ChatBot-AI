import React, { useState, useRef } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
import { useWorkspace } from '../../context/useWorkspace';

export interface FileAttachment {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'pdf' | 'csv' | 'document' | 'code' | 'other';
  previewUrl?: string;
  rawFile?: File;
}

export const ChatComposer: React.FC = () => {
  const { sendMessage, isStreaming, activeMode, openModal, language } = useWorkspace();
  const [text, setText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const detectFileType = (file: File): FileAttachment['type'] => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.includes('pdf')) return 'pdf';
    if (file.type.includes('csv') || file.name.endsWith('.csv')) return 'csv';
    if (file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.type.includes('word')) return 'document';
    if (file.name.endsWith('.js') || file.name.endsWith('.py') || file.name.endsWith('.json') || file.name.endsWith('.ts') || file.name.endsWith('.html')) return 'code';
    return 'other';
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newAttachments: FileAttachment[] = files.map(file => {
      const type = detectFileType(file);
      let previewUrl: string | undefined = undefined;

      if (type === 'image') {
        previewUrl = URL.createObjectURL(file);
      }

      return {
        id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name: file.name,
        size: formatFileSize(file.size),
        type,
        previewUrl,
        rawFile: file
      };
    });

    setAttachments(prev => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if ((!text.trim() && attachments.length === 0) || isStreaming) return;
    
    // Construct rich message text if user didn't type text but attached files
    let messageText = text;
    if (!messageText.trim() && attachments.length > 0) {
      const names = attachments.map(a => a.name).join(', ');
      messageText = `Please analyze the attached file(s): ${names}. Provide a detailed content analysis, breakdown of findings, and summary.`;
    }

    sendMessage(messageText, attachments);
    setText('');
    setAttachments([]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setText('Summarize the core technical findings and page-14 citation of Aetheris System Whitepaper.');
        setIsRecording(false);
      }, 2000);
    }
  };

  const modeMaterialIcons = {
    general: 'psychology',
    document: 'description',
    data: 'database',
    code: 'code',
    study: 'school',
    research: 'compass_calibration',
    vision: 'visibility'
  };

  const currentIcon = modeMaterialIcons[activeMode] || 'psychology';

  const getTypeIcon = (type: FileAttachment['type']) => {
    switch (type) {
      case 'image': return 'image';
      case 'pdf': return 'picture_as_pdf';
      case 'csv': return 'table_chart';
      case 'document': return 'description';
      case 'code': return 'code';
      default: return 'folder_open';
    }
  };

  const getTypeBadgeColor = (type: FileAttachment['type']) => {
    switch (type) {
      case 'image': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'pdf': return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'csv': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'document': return 'text-sky-400 border-sky-500/30 bg-sky-500/10';
      case 'code': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      default: return 'text-slate-400 border-slate-500/30 bg-slate-500/10';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-4 shrink-0">
      <div className="bg-surface border border-border focus-within:border-primary-container/70 rounded-2xl p-2.5 sm:p-3 shadow-xl transition-all space-y-2">
        
        {/* Hidden File Input Picker */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.csv,.doc,.docx,.txt,.json,.xls,.xlsx,.js,.py,.ts,.html,.css,.sql"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Attachments preview tray */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pb-2.5 border-b border-border max-h-36 overflow-y-auto">
            {attachments.map((att) => (
              <div 
                key={att.id} 
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${getTypeBadgeColor(att.type)}`}
              >
                {att.previewUrl ? (
                  <img src={att.previewUrl} alt={att.name} className="w-6 h-6 object-cover rounded-md border border-white/20 shrink-0" />
                ) : (
                  <span className="material-symbols-outlined text-[16px] shrink-0">
                    {getTypeIcon(att.type)}
                  </span>
                )}
                
                <div className="flex flex-col truncate max-w-[120px] sm:max-w-[160px]">
                  <span className="truncate text-[11px] font-bold leading-tight">{att.name}</span>
                  <span className="text-[9px] opacity-70 font-mono">{att.size} • {att.type.toUpperCase()}</span>
                </div>

                <button 
                  onClick={() => removeAttachment(att.id)} 
                  className="ml-1 p-0.5 rounded-md hover:bg-black/20 text-muted hover:text-rose-400 transition-colors cursor-pointer"
                  title="Remove file attachment"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Text Area Input */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            language === 'ta' 
              ? 'உங்கள் கேள்வியை அல்லது ஆவணத்தை உள்ளிடவும்...'
              : language === 'thanglish'
              ? 'File, image or prompt type பண்ணுங்க...'
              : 'Attach images, PDFs, CSVs, or ask anything...'
          }
          className={`w-full bg-transparent border-0 resize-none text-xs md:text-sm text-on-surface focus:outline-none placeholder:text-muted min-h-[40px] max-h-28 leading-relaxed ${language === 'ta' ? 'font-tamil text-sm' : ''}`}
          rows={1}
        />

        {/* Composer Action Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-border flex-wrap gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            
            {/* Direct Attach File Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high border border-border text-xs font-semibold text-primary-container hover:text-on-surface transition-all cursor-pointer"
              title="Upload Image, PDF, CSV, Word, or Document file"
            >
              <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
              <span className="text-[11px] hidden sm:inline">Attach File</span>
            </button>

            {/* Ingestion Modal Trigger */}
            <button
              onClick={() => openModal('upload')}
              className="p-1.5 rounded-lg text-muted hover:text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer"
              title="Vector Ingestion Pipeline Modal"
            >
              <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            </button>

            {/* Mode Chip Dropdown trigger */}
            <button
              onClick={() => openModal('mode-select')}
              className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high border border-border text-[11px] font-medium text-muted hover:text-on-surface transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px] text-primary-container">
                {currentIcon}
              </span>
              <span className="capitalize">{activeMode}</span>
            </button>

            {/* Voice Input Trigger */}
            <button
              onClick={toggleRecording}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${isRecording ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' : 'text-muted hover:text-on-surface hover:bg-surface-container-high'}`}
              title="Voice Input (Speech-to-Text)"
            >
              <span className="material-symbols-outlined text-[18px]">mic</span>
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={(!text.trim() && attachments.length === 0) || isStreaming}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-container hover:bg-primary-container/90 disabled:opacity-30 text-white font-medium text-xs shadow-sm transition-all active:scale-95 cursor-pointer ml-auto"
          >
            <span>Send</span>
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
