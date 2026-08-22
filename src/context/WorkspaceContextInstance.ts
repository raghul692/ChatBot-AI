import { createContext } from 'react';
import type { 
  AIMode, 
  LanguageMode, 
  ThemeMode, 
  ScreenId, 
  ModalType, 
  Message, 
  Conversation,
  ActiveArtifact 
} from '../types';

export interface WorkspaceContextType {
  // Navigation & Screens
  currentScreen: ScreenId;
  navigateToScreen: (screen: ScreenId) => void;

  // Mobile Drawer State
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;

  // Active Modes
  activeMode: AIMode;
  setActiveMode: (mode: AIMode) => void;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  theme: ThemeMode;
  toggleTheme: () => void;

  // Artifact Panel State
  isRightPanelOpen: boolean;
  toggleRightPanel: () => void;
  isPanelExpanded: boolean;
  togglePanelExpand: () => void;
  activeArtifact: ActiveArtifact | null;
  setActiveArtifact: (artifact: ActiveArtifact | null) => void;
  activeDocPage: number;
  setActiveDocPage: (page: number) => void;

  // Conversations & Messages
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  messages: Message[];
  sendMessage: (text: string, attachments?: any[]) => void;
  createNewChat: () => void;
  isStreaming: boolean;

  // Modal Overlays
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);
