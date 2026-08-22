import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle2, Cpu, FileSpreadsheet, Image as ImageIcon, Code2 } from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';

export const UploadCenterModal: React.FC = () => {
  const { activeModal, closeModal, navigateToScreen } = useWorkspace();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string; status: 'ready' | 'vectorizing' }[]>([]);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  if (activeModal !== 'upload') return null;

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleRealFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles = files.map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type || file.name.split('.').pop() || 'document',
      status: 'vectorizing' as const
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate vectorization pipeline
    setTimeout(() => {
      setUploadedFiles(prev =>
        prev.map(f => ({ ...f, status: 'ready' as const }))
      );
    }, 1200);

    if (modalFileInputRef.current) modalFileInputRef.current.value = '';
  };

  const handleSimulateDrop = () => {
    modalFileInputRef.current?.click();
  };

  const getFileIcon = (file: { name: string; type: string }) => {
    const name = file.name.toLowerCase();
    if (name.endsWith('.csv') || name.endsWith('.xlsx') || name.endsWith('.xls')) {
      return <FileSpreadsheet className="w-4 h-4 text-emerald-400" />;
    }
    if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.webp')) {
      return <ImageIcon className="w-4 h-4 text-purple-400" />;
    }
    if (name.endsWith('.js') || name.endsWith('.py') || name.endsWith('.json') || name.endsWith('.ts') || name.endsWith('.html')) {
      return <Code2 className="w-4 h-4 text-amber-400" />;
    }
    return <FileText className="w-4 h-4 text-sky-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface border border-subtle rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-accent-primary" />
            <h2 className="text-base font-bold text-primary">Ingest Files to Vector Index</h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-hover">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hidden Input Picker */}
        <input
          ref={modalFileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.csv,.doc,.docx,.txt,.json,.xls,.xlsx,.js,.py,.ts,.html,.css,.sql"
          onChange={handleRealFileUpload}
          className="hidden"
        />

        {/* Drag and Drop Zone */}
        <div
          onClick={handleSimulateDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              const dtFiles = Array.from(e.dataTransfer.files);
              const newFiles = dtFiles.map(file => ({
                name: file.name,
                size: formatFileSize(file.size),
                type: file.type || file.name.split('.').pop() || 'document',
                status: 'vectorizing' as const
              }));
              setUploadedFiles(prev => [...prev, ...newFiles]);
              setTimeout(() => {
                setUploadedFiles(prev => prev.map(f => ({ ...f, status: 'ready' as const })));
              }, 1200);
            }
          }}
          className={`p-8 border-2 border-dashed rounded-2xl text-center space-y-3 cursor-pointer transition-all ${isDragging ? 'border-accent-primary bg-accent-primary/10' : 'border-subtle bg-surface-elevated/40 hover:bg-surface-hover'}`}
        >
          <div className="w-12 h-12 rounded-full bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center mx-auto text-accent-primary">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-primary">Click or drag documents to upload</h3>
            <p className="text-[11px] text-muted font-mono mt-0.5">
              Supports PNG, JPG, PDF, CSV, DOC, TXT, JSON, XLS (Max 50MB)
            </p>
          </div>
        </div>

        {/* Ingested List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto pr-1">
            <div className="text-[10px] text-muted uppercase tracking-wider font-semibold">
              INGESTION PIPELINE STATUS ({uploadedFiles.length})
            </div>
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-surface-elevated border border-subtle flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {getFileIcon(file)}
                  <div>
                    <span className="font-bold text-primary block text-xs truncate max-w-[220px]">{file.name}</span>
                    <span className="text-[10px] text-muted">{file.size}</span>
                  </div>
                </div>

                {file.status === 'vectorizing' ? (
                  <span className="flex items-center gap-1.5 text-accent-primary text-[10px]">
                    <Cpu className="w-3.5 h-3.5 animate-spin" /> Chunking...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Vectorized
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => {
              navigateToScreen('processing-queue');
              closeModal();
            }}
            className="text-xs text-accent-primary font-semibold hover:underline"
          >
            View Live Processing Queue →
          </button>

          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl bg-accent-primary hover:bg-accent-hover text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
