import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { mockFiles } from '../../mockData/workspaceData';
import { useWorkspace } from '../../context/useWorkspace';

export const FilesLibrary: React.FC = () => {
  const { openModal, setActiveDocPage, toggleRightPanel } = useWorkspace();
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredFiles = mockFiles.filter(f => {
    const matchesType = filterType === 'all' || f.type === filterType;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-primary">Workspace Files Library</h1>
          <p className="text-xs text-secondary">
            Manage all ingested documents, datasets, PDFs, and multimodal artifacts across your AI workspace.
          </p>
        </div>

        <button
          onClick={() => openModal('upload')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-primary hover:bg-accent-hover text-white font-semibold text-xs shadow-md transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Files</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-surface border border-subtle p-3 rounded-xl">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-surface-elevated px-3 py-1.5 rounded-lg border border-subtle">
          <Search className="w-4 h-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter files by title, category, or tokens..."
            className="w-full bg-transparent border-0 text-xs text-primary focus:outline-none placeholder:text-muted"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterType === 'all' ? 'bg-accent-primary text-white' : 'text-muted hover:text-primary'}`}
          >
            All Files ({mockFiles.length})
          </button>
          <button
            onClick={() => setFilterType('pdf')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterType === 'pdf' ? 'bg-accent-primary text-white' : 'text-muted hover:text-primary'}`}
          >
            PDF Documents
          </button>
          <button
            onClick={() => setFilterType('csv')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterType === 'csv' ? 'bg-accent-primary text-white' : 'text-muted hover:text-primary'}`}
          >
            Data CSVs
          </button>
        </div>
      </div>

      {/* Files Table */}
      <div className="bg-surface border border-subtle rounded-xl overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-elevated border-b border-subtle text-muted text-[11px]">
              <th className="p-3 font-semibold">Document Title</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 font-semibold">File Size</th>
              <th className="p-3 font-semibold">Token Count</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle text-xs">
            {filteredFiles.map((file) => (
              <tr key={file.id} className="hover:bg-surface-hover/50 transition-colors">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    {file.type === 'pdf' ? (
                      <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                    ) : file.type === 'csv' ? (
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-purple-400 shrink-0" />
                    )}
                    <div>
                      <span className="font-semibold text-primary block">{file.name}</span>
                      <span className="text-[10px] text-muted font-mono">{file.uploadedAt}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-surface-elevated text-[10px] font-medium text-secondary">
                    {file.category}
                  </span>
                </td>
                <td className="p-3 font-mono text-muted">{file.size}</td>
                <td className="p-3 font-mono text-secondary">{file.tokensCount.toLocaleString()} tokens</td>
                <td className="p-3">
                  {file.status === 'indexed' ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Indexed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-400 font-medium text-[11px]">
                      <Clock className="w-3.5 h-3.5 animate-spin" /> Vectorizing...
                    </span>
                  )}
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setActiveDocPage(1);
                        toggleRightPanel();
                      }}
                      className="px-2.5 py-1 rounded bg-surface-elevated hover:bg-surface-hover text-secondary hover:text-primary text-[11px] font-medium transition-all"
                    >
                      Inspect
                    </button>
                    <button className="p-1 rounded text-muted hover:text-rose-400 transition-colors" title="Delete file">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
