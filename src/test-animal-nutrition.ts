import { getAnimalNutrition } from './mastra/tools/animal-nutrition';

async function testAnimalNutrition() {
  const animals = ['fil', 'kartal', 'köpek', 'balık'];
  
  for (const animal of animals) {
    try {
      console.log(`\n🐾 ${animal.toUpperCase()} için beslenme bilgisi alınıyor...`);
      console.log('='.repeat(50));
      
      const result = await getAnimalNutrition.execute({ animalName: animal });
      
      if (result.success) {
        console.log(`✅ Başarılı! ${animal} için bilgi alındı`);
        console.log(`📊 API Ninjas Data: ${result.apiNinjasData ? 'Mevcut' : 'Mevcut değil'}`);
        console.log(`📝 Beslenme Bilgisi:\n${result.dietInformation}`);
      } else {
        console.log(`❌ Hata: ${result.error}`);
      }
      
      // Bir sonraki istek için kısa bekleme
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ ${animal} için hata:`, error);
    }
  }
}

// Test fonksiyonunu çalıştır
testAnimalNutrition(); 