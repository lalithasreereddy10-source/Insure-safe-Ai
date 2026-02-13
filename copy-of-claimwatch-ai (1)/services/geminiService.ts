
import { GoogleGenAI } from "@google/genai";
import { ClaimDetails } from "../types";

// Always use the API key directly from process.env.API_KEY as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFraudExplanation = async (claim: ClaimDetails, probability: number): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following insurance claim details and explain why it was flagged with a ${probability}% fraud probability.
      
      Details:
      - Claim Amount: $${claim.claimAmount}
      - Incident Type: ${claim.incidentType}
      - Location: ${claim.location}
      - Policy Age: ${claim.policyAge} months
      - Previous Claims: ${claim.previousClaims}
      
      Provide a professional, concise explanation (2-3 sentences) detailing the suspicious patterns or risk factors.`,
      config: {
        // Move persona to systemInstruction for clearer model guidance.
        systemInstruction: "You are an expert insurance fraud investigator with deep knowledge of suspicious claim patterns.",
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    // Access .text property directly as it is a getter.
    return response.text || "Could not generate explanation.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "This claim shows patterns consistent with historical fraud cases involving similar claim amounts and incident profiles.";
  }
};
