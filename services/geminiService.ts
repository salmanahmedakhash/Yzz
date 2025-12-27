
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBookDescription = async (title: string, author: string, category: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling 2-3 sentence description for a book titled "${title}" by "${author}" in the category "${category}". Response should be helpful for a book listing.`,
    });
    return response.text || "Failed to generate description.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please check your API key.";
  }
};
