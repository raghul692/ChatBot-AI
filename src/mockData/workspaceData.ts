import type { KnowledgeFile, KnowledgeBaseCollection, IngestionQueueItem } from '../types';

export const mockFiles: KnowledgeFile[] = [
  {
    id: 'f-1',
    name: 'Aetheris System Architecture Whitepaper.pdf',
    size: '4.2 MB',
    type: 'pdf',
    category: 'Architecture',
    uploadedAt: '2026-08-19 14:30',
    status: 'indexed',
    tokensCount: 124500
  },
  {
    id: 'f-2',
    name: 'Q3 Regional Sales Financial Performance.csv',
    size: '1.8 MB',
    type: 'csv',
    category: 'Finance & Sales',
    uploadedAt: '2026-08-18 09:15',
    status: 'indexed',
    tokensCount: 45200
  },
  {
    id: 'f-3',
    name: 'Transformer Attention Scaled Math Model.pdf',
    size: '8.1 MB',
    type: 'pdf',
    category: 'Research',
    uploadedAt: '2026-08-17 18:40',
    status: 'indexed',
    tokensCount: 310000
  }
];

export const mockCollections: KnowledgeBaseCollection[] = [
  {
    id: 'col-1',
    name: 'Core System Architecture',
    description: 'High-level whitepapers and technical spec docs for Aetheris engine.',
    fileCount: 12,
    totalSize: '48.5 MB',
    lastUpdated: '2 hours ago',
    tags: ['Architecture', 'System', 'Spec']
  },
  {
    id: 'col-2',
    name: 'Financial & Sales Analytics',
    description: 'Quarterly tabular data, revenue metrics, and growth forecasts.',
    fileCount: 8,
    totalSize: '24.1 MB',
    lastUpdated: 'Yesterday',
    tags: ['Finance', 'Data', 'CSV']
  },
  {
    id: 'col-3',
    name: 'LLM & Machine Learning Papers',
    description: 'Attention mechanisms, quantization specs, and model evaluations.',
    fileCount: 24,
    totalSize: '142.0 MB',
    lastUpdated: '3 days ago',
    tags: ['AI', 'Research', 'Embeddings']
  }
];

export const mockIngestionQueue: IngestionQueueItem[] = [
  {
    id: 'iq-1',
    fileName: 'Neural_Network_Quantization_4bit.pdf',
    fileSize: '12.4 MB',
    status: 'processing',
    progress: 68,
    chunksProcessed: '340 / 500',
    eta: '12s'
  },
  {
    id: 'iq-2',
    fileName: 'Global_User_Demographics_2026.csv',
    fileSize: '3.1 MB',
    status: 'completed',
    progress: 100,
    chunksProcessed: '150 / 150',
    eta: 'Completed'
  },
  {
    id: 'iq-3',
    fileName: 'React_Custom_Hook_Patterns.json',
    fileSize: '840 KB',
    status: 'queued',
    progress: 0,
    chunksProcessed: '0 / 45',
    eta: 'Waiting...'
  }
];
