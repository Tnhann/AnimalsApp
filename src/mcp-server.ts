#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { getAnimalNutrition } from './mastra/tools/animal-nutrition.js';

class AnimalNutritionMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'animal-nutrition-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'get_animal_nutrition',
            description: 'Hayvanların beslenme alışkanlıkları hakkında detaylı bilgi alın. API Ninjas ve Gemini AI kullanarak 3-5 besin örneği ve beslenme türü bilgisi döndürür.',
            inputSchema: {
              type: 'object',
              properties: {
                animalName: {
                  type: 'string',
                  description: 'Beslenme bilgisi istenen hayvanın adı (Türkçe veya İngilizce)',
                },
              },
              required: ['animalName'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (name === 'get_animal_nutrition') {
        try {
          const { animalName } = args as { animalName: string };
          
          if (!animalName) {
            throw new Error('animalName parametresi gereklidir');
          }

          console.error(`[MCP] ${animalName} için beslenme bilgisi alınıyor...`);
          
          const result = await getAnimalNutrition.execute({ animalName });
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        } catch (error) {
          console.error('[MCP] Tool execution error:', error);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  success: false,
                  error: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu',
                  animal: args?.animalName || 'unknown'
                }, null, 2),
              },
            ],
            isError: true,
          };
        }
      }

      throw new Error(`Bilinmeyen tool: ${name}`);
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Animal Nutrition MCP Server başlatıldı');
  }
}

const server = new AnimalNutritionMCPServer();
server.run().catch(console.error); 