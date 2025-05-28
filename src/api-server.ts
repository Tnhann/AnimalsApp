import { createServer } from 'http';
import { URL } from 'url';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getAnimalNutrition } from './mastra/tools/animal-nutrition';

const server = createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url!, `http://${req.headers.host}`);

  // Static file serving
  if (url.pathname === '/' || url.pathname === '/index.html') {
    try {
      const htmlPath = join(process.cwd(), 'public', 'index.html');
      const html = readFileSync(htmlPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
      return;
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('HTML dosyası bulunamadı');
      return;
    }
  }

  if (url.pathname === '/animal-nutrition' && req.method === 'GET') {
    try {
      const animalName = url.searchParams.get('animal');
      
      if (!animalName) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false, 
          error: 'animal parametresi gereklidir' 
        }));
        return;
      }

      console.log(`🐾 ${animalName} için beslenme bilgisi alınıyor...`);
      
      const result = await getAnimalNutrition.execute({ animalName });
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result, null, 2));
      
    } catch (error) {
      console.error('API Error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Bilinmeyen hata' 
      }));
    }
  } else if (url.pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'OK', service: 'Animal Nutrition API' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint bulunamadı' }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Animal Nutrition API Server çalışıyor: http://localhost:${PORT}`);
  console.log(`🌐 Web Interface: http://localhost:${PORT}`);
  console.log(`📋 API Endpoint: http://localhost:${PORT}/animal-nutrition?animal=aslan`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

export default server; 