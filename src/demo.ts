import { getAnimalNutrition } from './mastra/tools/animal-nutrition';

async function demo() {
  console.log('🐾 Animal Nutrition MCP Server Demo');
  console.log('=====================================\n');

  const animals = [
    { name: 'aslan', emoji: '🦁' },
    { name: 'fil', emoji: '🐘' },
    { name: 'kartal', emoji: '🦅' },
    { name: 'köpek', emoji: '🐕' },
    { name: 'kedi', emoji: '🐱' }
  ];

  for (const animal of animals) {
    try {
      console.log(`${animal.emoji} ${animal.name.toUpperCase()} için beslenme bilgisi:`);
      console.log('-'.repeat(40));
      
      const result = await getAnimalNutrition.execute({ animalName: animal.name });
      
      if (result.success) {
        console.log(`✅ Başarılı!`);
        console.log(`📊 API Ninjas: ${(result as any).apiNinjasData && (result as any).apiNinjasData.length > 0 ? 'Veri bulundu' : 'Veri bulunamadı'}`);
        console.log(`🤖 Gemini AI: Analiz tamamlandı`);
        console.log(`⏰ Zaman: ${(result as any).timestamp}`);
        console.log(`\n📝 Beslenme Bilgisi:`);
        console.log((result as any).dietInformation);
      } else {
        console.log(`❌ Hata: ${(result as any).error}`);
      }
      
      console.log('\n' + '='.repeat(60) + '\n');
      
      // Rate limiting için bekleme
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (error) {
      console.error(`❌ ${animal.name} için hata:`, error);
    }
  }

  console.log('🎉 Demo tamamlandı!');
  console.log('\n📚 MCP Server kullanımı:');
  console.log('1. npm run mcp-server - Server\'ı başlat');
  console.log('2. MCP client\'ınızda get_animal_nutrition tool\'unu kullanın');
  console.log('3. animalName parametresi ile hayvan adını gönderin');
}

demo(); 