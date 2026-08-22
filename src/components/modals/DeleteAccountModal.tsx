import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';

export const DeleteAccountModal: React.FC = () => {
  const { activeModal, closeModal, navigateToScreen } = useWorkspace();

  if (activeModal !== 'delete-account') return null;

  const handleDelete = () => {
    closeModal();
    navigateToScreen('landing');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface border border-rose-500/30 rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5" />
            <h2>Purge Workspace & Delete Account</h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-muted hover:text-primary hover:bg-surface-hover">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-secondary leading-relaxed">
          This action is irreversible. All vectorized embeddings, uploaded PDF documents, and chat threads will be permanently wiped from the local store.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl bg-surface-elevated hover:bg-surface-hover text-secondary font-semibold text-xs transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-md transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Confirm Deletion</span>
          </button>
        </div>
      </div>
    </div>
  );
};
