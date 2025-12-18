
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getStyleAdvice(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `O usuário quer saber: "${query}". Como uma consultora de joias de luxo da Janmily Acessórios (especialista em Prata 925), sugira tipos de peças (brincos, colares, anéis, etc) para essa ocasião. Seja elegante e breve.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Erro ao consultar assistente de estilo:", error);
    return "Desculpe, tive um problema ao buscar dicas de estilo. Mas nossas peças em Prata 925 sempre ficam elegantes!";
  }
}
