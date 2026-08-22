import React, { useState } from 'react';
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
import { initialConversation } from '../mockData/initialConversation';
import { WorkspaceContext } from './WorkspaceContextInstance';
import { generateAIResponse } from '../services/aiEngine';

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('landing');
  const [activeMode, setActiveMode] = useState<AIMode>('general');
  const [language, setLanguage] = useState<LanguageMode>('en');
  const [theme, setTheme] = useState<ThemeMode>('dark');

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState<boolean>(true);
  const [isPanelExpanded, setIsPanelExpanded] = useState<boolean>(false);
  const [activeDocPage, setActiveDocPage] = useState<number>(14);

  const [conversations, setConversations] = useState<Conversation[]>([initialConversation]);
  const [activeConversationId, setActiveConversationIdState] = useState<string>(initialConversation.id);
  const [messages, setMessages] = useState<Message[]>(initialConversation.messages);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const [activeArtifact, setActiveArtifactState] = useState<ActiveArtifact | null>({
    type: 'document',
    data: {
      title: 'Aetheris System Architecture Whitepaper.pdf',
      page: 14
    }
  });

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const setActiveArtifact = (artifact: ActiveArtifact | null) => {
    setActiveArtifactState(artifact);
    if (artifact) {
      setIsRightPanelOpen(true);
      if (['document', 'data', 'code', 'study', 'research', 'vision'].includes(artifact.type)) {
        setActiveMode(artifact.type as AIMode);
      }
    }
  };

  const navigateToScreen = (screen: ScreenId) => {
    setCurrentScreen(screen);
    setIsMobileSidebarOpen(false);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  };

  const toggleRightPanel = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
  };

  const togglePanelExpand = () => {
    setIsPanelExpanded(!isPanelExpanded);
  };

  const openModal = (modal: ModalType) => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Select existing conversation
  const setActiveConversationId = (id: string) => {
    setActiveConversationIdState(id);
    const target = conversations.find(c => c.id === id);
    if (target) {
      setMessages(target.messages || []);
    }
    setIsMobileSidebarOpen(false);
  };

  // Create a brand new fresh chat like ChatGPT / Gemini
  const createNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      title: 'New Conversation',
      mode: 'general',
      updatedAt: 'Just now',
      messages: []
    };
    setConversations(prev => [newConv, ...prev]);
    setActiveConversationIdState(newId);
    setMessages([]);
    setActiveArtifactState(null);
    setActiveMode('general');
    setCurrentScreen('chat-active');
    setIsMobileSidebarOpen(false);
  };

  // Keyboard Shortcuts (Cmd+K for search, Escape to close modals)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActiveModal('search');
      } else if (e.key === 'Escape') {
        setActiveModal(null);
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sendMessage = async (text: string, attachments?: any[]) => {
    if (!text.trim() && (!attachments || attachments.length === 0)) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsStreaming(true);

    // Update conversation title if first message
    if (messages.length === 0) {
      const shortTitle = text.length > 28 ? text.slice(0, 28) + '...' : text;
      setConversations(prev => prev.map(c => c.id === activeConversationId ? { ...c, title: shortTitle, messages: updatedMessages } : c));
    }

    try {
      const responseData = await generateAIResponse({
        text,
        mode: activeMode,
        language,
        activeDocPage,
        attachments
      });

      const assistantMsg: Message = {
        id: `msg-asst-${Date.now()}`,
        role: 'assistant',
        content: responseData.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidenceScore: responseData.confidenceScore,
        citations: responseData.citations,
        codeArtifact: responseData.codeArtifact,
        dataArtifact: responseData.dataArtifact,
        studyArtifact: responseData.studyArtifact
      };

      // Automatically set active artifact if generated by prompt
      if (responseData.codeArtifact) {
        setActiveArtifact({ type: 'code', data: responseData.codeArtifact });
      } else if (responseData.dataArtifact) {
        setActiveArtifact({ type: 'data', data: responseData.dataArtifact });
      } else if (responseData.studyArtifact) {
        setActiveArtifact({ type: 'study', data: responseData.studyArtifact });
      }

      const finalMessages = [...updatedMessages, assistantMsg];
      setMessages(finalMessages);

      // Persist to current conversation
      setConversations(prev => prev.map(c => c.id === activeConversationId ? { ...c, messages: finalMessages } : c));
    } catch (err) {
      console.error("Error generating AI response:", err);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentScreen,
        navigateToScreen,
        isMobileSidebarOpen,
        toggleMobileSidebar,
        closeMobileSidebar,
        activeMode,
        setActiveMode,
        language,
        setLanguage,
        theme,
        toggleTheme,
        isRightPanelOpen,
        toggleRightPanel,
        isPanelExpanded,
        togglePanelExpand,
        activeArtifact,
        setActiveArtifact,
        activeDocPage,
        setActiveDocPage,
        conversations,
        activeConversationId,
        setActiveConversationId,
        messages,
        sendMessage,
        createNewChat,
        isStreaming,
        activeModal,
        openModal,
        closeModal
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
