import { z } from 'zod';
import { GoogleGenAI } from '@google/genai';

// Google AI client'ı oluştur
const genAI = new GoogleGenAI({ 
  apiKey: 'AIzaSyBeJ1ZnxnZkgt6kfBP3wOoIioCBz8QobPk' 
});

// API Ninjas Animals API'den hayvan bilgilerini almak için tool
export const getAnimalInfo = {
  id: 'getAnimalInfo',
  name: 'getAnimalInfo',
  description: 'Get information about an animal from API Ninjas',
  parameters: z.object({
    name: z.string().describe('Name of the animal to get information about'),
  }),
  execute: async ({ name }: { name: string }) => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(name)}`, {
        headers: {
          'X-Api-Key': 'MO4Qd0JdxtRIQ9cj5murew==stsMfqD9V4LHGnuM'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching animal info:', error);
      throw error;
    }
  },
};

// Gemini API'yi kullanarak hayvan beslenme alışkanlıklarını analiz etmek için tool
export const getAnimalDiet = {
  id: 'getAnimalDiet',
  name: 'getAnimalDiet',
  description: 'Get detailed diet information for an animal using Gemini AI',
  parameters: z.object({
    animalName: z.string().describe('Name of the animal'),
    animalInfo: z.any().optional().describe('Additional animal information from API'),
  }),
  execute: async ({ animalName, animalInfo }: { animalName: string; animalInfo?: any }) => {
    try {
      const prompt = `
        ${animalName} adlı hayvanın beslenme alışkanlıkları hakkında detaylı bilgi ver.
        ${animalInfo ? `Ek bilgi: ${JSON.stringify(animalInfo)}` : ''}
        
        Lütfen şu formatta yanıtla:
        1. Bu hayvanın doğal habitatında neler yediğini 3-5 örnek vererek açıkla
        2. Her besin için kısa bir açıklama yap
        3. Beslenme şeklini (etçil, otçul, hepçil) belirt
        
        Türkçe yanıt ver ve bilimsel ama anlaşılır bir dil kullan.
      `;

      const result = await genAI.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
      });

      return {
        animal: animalName,
        dietInfo: result.text,
        source: 'Gemini AI + API Ninjas'
      };
    } catch (error) {
      console.error('Error generating diet info:', error);
      throw error;
    }
  },
};

// Kombine tool - hayvan bilgisini alıp beslenme alışkanlıklarını döndürür
export const getAnimalNutrition = {
  id: 'getAnimalNutrition',
  name: 'getAnimalNutrition',
  description: 'Get comprehensive nutrition and diet information for any animal',
  parameters: z.object({
    animalName: z.string().describe('Name of the animal to get nutrition information about'),
  }),
  execute: async ({ animalName }: { animalName: string }) => {
    try {
      // Önce API Ninjas'dan hayvan bilgisini al
      let animalInfo = null;
      try {
        animalInfo = await getAnimalInfo.execute({ name: animalName });
      } catch (error) {
        console.log('Could not fetch from API Ninjas, proceeding with Gemini only');
      }

      // Gemini ile beslenme bilgisini al
      const dietInfo = await getAnimalDiet.execute({ animalName, animalInfo });
      
      return {
        success: true,
        animal: animalName,
        apiNinjasData: animalInfo,
        dietInformation: dietInfo.dietInfo,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error in getAnimalNutrition:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        animal: animalName
      };
    }
  },
}; 