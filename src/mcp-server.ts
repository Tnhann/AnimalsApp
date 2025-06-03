#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  CallToolRequest,
  ListToolsRequest,
} from '@modelcontextprotocol/sdk/types.js';
import { getAnimalNutrition, getAnimalInfo } from './mastra/tools/animal-nutrition.js';

class AnimalNutritionMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'Animal Nutrition Expert',
        version: '1.0.0',
        description: 'Hayvanların beslenme alışkanlıkları hakkında detaylı bilgi sağlayan MCP server - Smithery uyumlu'
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

  private setupToolHandlers(): void {
    // List available tools
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
          {
            name: 'get_animal_info',
            description: 'API Ninjas\'dan hayvan bilgilerini alır',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Bilgi alınacak hayvanın adı',
                },
              },
              required: ['name'],
            },
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
      const { name, arguments: args } = request.params;

      try {
        if (name === 'get_animal_nutrition') {
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
        }

        if (name === 'get_animal_info') {
          const { name: animalName } = args as { name: string };
          
          if (!animalName) {
            throw new Error('name parametresi gereklidir');
          }

          console.error(`[MCP] ${animalName} için API Ninjas bilgisi alınıyor...`);
          
          const result = await getAnimalInfo.execute({ name: animalName });
          
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
          };
        }

        throw new Error(`Bilinmeyen tool: ${name}`);
        
      } catch (error) {
        console.error('[MCP] Tool execution error:', error);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Bilinmeyen hata oluştu',
                tool: name,
                arguments: args
              }, null, 2),
            },
          ],
          isError: true,
        };
      }
    });
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error('[MCP] Server error:', error);
    };

    process.on('SIGINT', async () => {
      console.log('\n[MCP] Server kapatılıyor...');
      await this.server.close();
      process.exit(0);
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('[MCP] Animal Nutrition MCP Server başlatıldı - Smithery uyumlu');
    console.error('[MCP] Mevcut tools: get_animal_nutrition, get_animal_info');
    console.error('[MCP] Server URL: https://smithery.ai/server/@Tnhann/animalsapp');
  }
}

// Start the server
const server = new AnimalNutritionMCPServer();
server.run().catch((error) => {
  console.error('[MCP] Server başlatma hatası:', error);
  process.exit(1);
});

export default server; 