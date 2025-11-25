import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const initializeChat = () => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found. Chat functionality will be limited.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster response
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    if (!chat) {
      return "申し訳ありません。現在AIコンシェルジュはメンテナンス中です。（APIキーが設定されていません）";
    }

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });
    
    return result.text || "申し訳ありません。うまく回答できませんでした。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "申し訳ありません。エラーが発生しました。もう一度お試しください。";
  }
};