import { GoogleGenAI } from '@google/genai';

const DEFAULT_USER_GEMINI_KEY = 'AQ.Ab8RN6Lk1KGxWwEsG7yo-3mA7uJnMAp2jhKMAPZTS5m7-DV2Tw';

export const getStoredGeminiApiKey = (): string => {
  const stored = localStorage.getItem('gemini_api_key');
  if (stored && stored.trim() !== '') {
    return stored.trim();
  }
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim() !== '') {
    return envKey.trim();
  }
  return DEFAULT_USER_GEMINI_KEY;
};

export const setStoredGeminiApiKey = (key: string): void => {
  localStorage.setItem('gemini_api_key', key.trim());
};

export interface GeminiResponse {
  text: string;
  isFromApi: boolean;
}

export async function callGeminiApi(prompt: string, apiKey?: string): Promise<GeminiResponse | null> {
  const activeKey = apiKey || getStoredGeminiApiKey();
  if (!activeKey) {
    return null;
  }

  // 1. Try SDK call with gemini-2.5-flash
  try {
    const ai = new GoogleGenAI({ apiKey: activeKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are Aetheris AI, a friendly, intelligent, highly capable AI assistant like ChatGPT, Gemini, and Claude. Respond to the user's prompt naturally with high precision, clear formatting, concise paragraphs, bullet points, and helpful emojis where appropriate. Never include raw comment syntax like `*/` or markdown header symbols clutter. If asked in Tamil or Tanglish, respond fluently in Tamil / Tanglish.",
      }
    });

    if (response && response.text) {
      return {
        text: response.text,
        isFromApi: true,
      };
    }
  } catch (err) {
    console.warn("Gemini SDK gemini-2.5-flash failed, trying REST fallbacks...", err);
  }

  // 2. Try REST API with gemini-1.5-flash
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });
    const data = await res.json();
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return {
        text: data.candidates[0].content.parts[0].text,
        isFromApi: true,
      };
    }
  } catch (fetchErr) {
    console.warn("Direct Gemini REST 1.5-flash failed, trying 2.0-flash...", fetchErr);
  }

  // 3. Try REST API with gemini-2.0-flash
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${activeKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });
    const data = await res.json();
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return {
        text: data.candidates[0].content.parts[0].text,
        isFromApi: true,
      };
    }
  } catch (err2) {
    console.error("All Gemini API endpoints failed:", err2);
  }

  return null;
}
