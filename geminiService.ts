
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// DO: Use process.env.API_KEY directly for initialization as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeHomeRisk = async (imageBase64: string): Promise<string> => {
  const ai = getAI();
  const prompt = `
    Analyze this photo of a home environment (e.g., kitchen, utility room, basement). 
    Identify potential fire hazards (exposed wiring, flammable materials near heat) 
    and water leak risks (rusted pipes, moisture spots). 
    Provide a clear, bulleted list of hazards and actionable safety recommendations.
    Format your response in Markdown.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
        { text: prompt }
      ]
    }
  });

  // DO: Access .text as a property, not a method
  return response.text || "No analysis available.";
};

export const editSafetyImage = async (imageBase64: string, instruction: string): Promise<string | null> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
        { text: instruction }
      ]
    }
  });

  // DO: Iterate through parts to find the image part as it may not be the first part
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
