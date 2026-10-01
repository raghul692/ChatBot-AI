export interface GeminiResponse {
  text: string;
  isFromApi: boolean;
}

export const getStoredGeminiApiKey = (): string => {
  return localStorage.getItem('gemini_api_key')?.trim() || '';
};

export const setStoredGeminiApiKey = (key: string): void => {
  if (key) {
    localStorage.setItem('gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('gemini_api_key');
  }
};

export async function callGeminiApi(prompt: string, _apiKey?: string): Promise<GeminiResponse | null> {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.text) {
        return {
          text: data.text,
          isFromApi: true,
        };
      }
    }
  } catch (err) {
    console.warn('Server-side Gemini call failed, using dynamic local synthesis:', err);
  }

  return null;
}
