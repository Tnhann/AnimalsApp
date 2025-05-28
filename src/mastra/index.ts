import { Mastra } from '@mastra/core';
import { animalNutritionAgent } from './agents/animal-nutrition-agent';

export const mastra = new Mastra({
  agents: {
    animalNutritionAgent,
  },
});
        