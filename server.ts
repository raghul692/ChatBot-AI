import express, { type Request, type Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

app.use(express.json({ limit: '10mb' }));

app.post('/api/gemini', async (req: Request, res: Response) => {
  const { prompt, model, systemInstruction } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'GEMINI_API_KEY is not configured on server' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const targetModel = model || 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
      model: targetModel,
      contents: prompt,
      config: {
        systemInstruction:
          systemInstruction ||
          "You are Aetheris AI, a friendly, intelligent, highly capable AI assistant like ChatGPT, Gemini, and Claude. Respond to the user's prompt naturally with high precision, clear formatting, concise paragraphs, bullet points, and helpful emojis where appropriate. Never include raw comment syntax like `*/` or markdown header symbols clutter. If asked in Tamil or Tanglish, respond fluently in Tamil / Tanglish.",
      },
    });

    return res.json({
      text: response?.text || '',
      isFromApi: true,
    });
  } catch (err: any) {
    console.error('Gemini API call failed:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Failed to generate response' });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';
  const distPath = path.resolve(__dirname, 'dist');

  if (isProduction && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
