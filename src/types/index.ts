export type AIMode = 
  | 'general' 
  | 'document' 
  | 'data' 
  | 'code' 
  | 'study' 
  | 'research' 
  | 'vision';

export type LanguageMode = 'en' | 'ta' | 'thanglish';

export type ThemeMode = 'dark' | 'light';

export type ScreenId = 
  | 'landing'
  | 'chat-welcome'
  | 'chat-active'
  | 'files-library'
  | 'upload-center'
  | 'processing-queue'
  | 'knowledge-base'
  | 'knowledge-base-detail'
  | 'user-profile'
  | 'ai-preferences'
  | 'appearance-language'
  | 'storage-management'
  | 'security-privacy';

export type ModalType = 
  | 'upload' 
  | 'search' 
  | 'share' 
  | 'export' 
  | 'delete-account' 
  | 'mode-select'
  | null;

export interface Citation {
  id: string;
  sourceTitle: string;
  pageNumber?: number;
  snippet: string;
  confidence: number;
}

export interface CodeArtifact {
  fileName: string;
  language: string;
  code: string;
  modifiedCode?: string;
  diffMode?: boolean;
  diff?: string;
  consoleOutput?: string;
}

export interface DataArtifact {
  title: string;
  columns: string[];
  rows: Record<string, any>[];
  sqlQuery?: string;
  chartType?: 'bar' | 'area' | 'line';
  chartData?: any[];
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudyArtifact {
  topic: string;
  flashcards?: Flashcard[];
  quiz?: QuizQuestion[];
}

export interface ActiveArtifact {
  type: 'code' | 'data' | 'study' | 'document';
  data: any;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: LanguageMode;
  citations?: Citation[];
  codeArtifact?: CodeArtifact;
  dataArtifact?: DataArtifact;
  studyArtifact?: StudyArtifact;
  confidenceScore?: number;
}

export interface Conversation {
  id: string;
  title: string;
  mode: AIMode;
  updatedAt: string;
  isPinned?: boolean;
  messages: Message[];
}

export interface KnowledgeFile {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'csv' | 'image' | 'json';
  category: string;
  uploadedAt: string;
  status: 'indexed' | 'processing';
  tokensCount: number;
}

export interface KnowledgeBaseCollection {
  id: string;
  name: string;
  description: string;
  fileCount: number;
  totalSize: string;
  lastUpdated: string;
  tags: string[];
}

export interface IngestionQueueItem {
  id: string;
  fileName: string;
  fileSize: string;
  status: 'completed' | 'processing' | 'queued';
  progress: number;
  chunksProcessed: string;
  eta: string;
}
