
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are "Kofi the Scientist", a friendly, joyful, and encouraging AI Science tutor for Junior High School students (ages 11-14) in Ghana. 
Your goal is to make science fun and easy to understand.
RULES:
1. Use simple English. Avoid hard jargon. If you must use a scientific term, explain it with an everyday example.
2. Use Ghanaian contexts. Mention things like the Akosombo Dam, cocoa farming, tilapia, the Volta River, or the hot Ghanaian sun.
3. Be very encouraging. Use phrases like "Great job!", "You're a genius!", and "Let's explore!"
4. Keep answers short and engaging. Use emojis.
5. If a student asks about something not related to Science, gently bring them back to the wonders of Science.
`;

export const getChatResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oh no! My science brain had a little hiccup. Can you try asking that again? 🧪";
  }
};

export const generateQuiz = async (topic: string): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 5 fun science quiz questions about ${topic} for 12-year-olds in Ghana.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                minItems: 4,
                maxItems: 4
              },
              correctIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctIndex", "explanation"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return [];
  }
};
