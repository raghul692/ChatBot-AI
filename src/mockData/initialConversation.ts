import type { Conversation } from '../types';

export const initialConversation: Conversation = {
  id: 'conv-1',
  title: 'Architecture & Scaled Attention Analysis',
  mode: 'general',
  updatedAt: 'Just now',
  isPinned: true,
  messages: [
    {
      id: 'msg-1',
      role: 'user',
      content: 'Summarize the core technical findings and page-14 citation of Aetheris System Whitepaper.',
      timestamp: '10:14 AM'
    },
    {
      id: 'msg-2',
      role: 'assistant',
      content: 'Based on the ingested whitepaper document, Scaled Dot-Product Attention scales query and key dot products by 1 / sqrt(d_k) to prevent vanishing gradients during softmax evaluation in high-dimensional vector spaces.\n\nKey citation verified on page 14.',
      timestamp: '10:15 AM',
      confidenceScore: 0.98,
      citations: [
        {
          id: 'cit-1',
          sourceTitle: 'Aetheris System Architecture Whitepaper.pdf',
          pageNumber: 14,
          snippet: 'Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V',
          confidence: 0.98
        }
      ]
    }
  ]
};
