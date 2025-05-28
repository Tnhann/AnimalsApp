# 🐾 Animal Nutrition API & MCP Server + Mobil Uygulama

Hayvanların beslenme alışkanlıkları hakkında detaylı bilgi sağlayan çok amaçlı servis. Web API, MCP server ve mobil uygulama desteği sunar.

## 🌟 Özellikler

- **API Ninjas Integration**: Hayvan bilgilerini API Ninjas Animals API'den alır
- **Gemini AI Integration**: Google Gemini AI kullanarak beslenme alışkanlıklarını analiz eder
- **Türkçe Destek**: Türkçe hayvan isimleri ve açıklamalar
- **Detaylı Bilgi**: 3-5 besin örneği ve beslenme türü (etçil, otçul, hepçil) bilgisi
- **Web Interface**: Kullanıcı dostu web arayüzü
- **REST API**: HTTP GET endpoint'i
- **MCP Uyumlu**: Model Context Protocol standardına uygun
- **📱 Mobil Uygulama**: Expo Go ile çalışan React Native uygulaması

## 🚀 Kurulum

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **API Anahtarları:**
   - API Ninjas API Key: `MO4Qd0JdxtRIQ9cj5murew==stsMfqD9V4LHGnuM`
   - Gemini API Key: `AIzaSyBeJ1ZnxnZkgt6kfBP3wOoIioCBz8QobPk`

## 🔧 Kullanım

### 🌐 Web Interface (Önerilen)

```bash
npm run api-server
```

Tarayıcınızda `http://localhost:3000` adresini açın. Güzel bir web arayüzü ile hayvan beslenme bilgilerini sorgulayabilirsiniz.

### 📱 Mobil Uygulama (YENİ!)

```bash
cd mobile-app
npm install
npm start
```

Expo Go uygulaması ile QR kodu tarayarak mobil uygulamayı kullanabilirsiniz.

**Mobil Uygulama Özellikleri:**
- 💬 WhatsApp benzeri chat arayüzü
- 🚀 Hızlı soru butonları
- 📱 iOS ve Android desteği
- 🔄 Gerçek zamanlı API iletişimi

### 📊 Demo Çalıştırma

```bash
npm run demo
```

Bu komut 5 farklı hayvan (aslan, fil, kartal, köpek, kedi) için beslenme bilgilerini gösterir.

### 🔌 MCP Server

```bash
npm run mcp-server
```

### 🧪 Test Etme

```bash
npm run test-nutrition
```

## 📋 API Kullanımı

### REST API Endpoint

**GET** `/animal-nutrition?animal={hayvan_adı}`

**Örnek:**
```bash
curl "http://localhost:3000/animal-nutrition?animal=aslan"
```

### MCP Tool: `get_animal_nutrition`

**Parametreler:**
- `animalName` (string): Beslenme bilgisi istenen hayvanın adı (Türkçe veya İngilizce)

**Örnek Kullanım:**
```json
{
  "name": "get_animal_nutrition",
  "arguments": {
    "animalName": "aslan"
  }
}
```

**Örnek Yanıt:**
```json
{
  "success": true,
  "animal": "aslan",
  "apiNinjasData": [...],
  "dietInformation": "Aslan adı verilen bir hayvan türü yok. Muhtemelen aslan (Panthera leo) kastediliyor...",
  "timestamp": "2025-05-28T12:00:28.274Z"
}
```

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler

- **Node.js**: Runtime environment
- **TypeScript**: Type-safe development
- **Google GenAI SDK**: Gemini AI integration
- **API Ninjas**: Animal data source
- **MCP SDK**: Model Context Protocol implementation
- **Native HTTP**: Lightweight web server
- **React Native**: Mobil uygulama framework
- **Expo**: Mobil geliştirme platformu

### Proje Yapısı

```
AnimalApp/
├── src/
│   ├── mastra/
│   │   ├── tools/
│   │   │   └── animal-nutrition.ts    # API tools
│   │   └── index.ts                   # Mastra configuration
│   ├── api-server.ts                  # HTTP API server
│   ├── mcp-server.ts                  # MCP server implementation
│   ├── demo.ts                        # Demo script
│   └── test-animal-nutrition.ts       # Test file
├── public/
│   └── index.html                     # Web interface
├── mobile-app/                        # 📱 Mobil uygulama
│   ├── App.js                         # Ana mobil uygulama
│   ├── package.json                   # Mobil bağımlılıklar
│   └── README.md                      # Mobil uygulama kılavuzu
├── package.json
└── README.md
```

## 🔍 Örnekler

### Web Interface

1. `npm run api-server` ile server'ı başlatın
2. `http://localhost:3000` adresini açın
3. Hayvan adını girin veya örneklerden birini seçin
4. Sonuçları görüntüleyin

### Mobil Uygulama

1. `cd mobile-app && npm install` ile bağımlılıkları yükleyin
2. `npm start` ile Expo dev server'ı başlatın
3. Expo Go ile QR kodu tarayın
4. Chat arayüzünde hayvan sorularınızı sorun

### Demo Çalıştırma

```bash
npm run demo
```

Bu komut şu hayvanlar için beslenme bilgilerini gösterir:
- 🦁 Aslan
- 🐘 Fil  
- 🦅 Kartal
- 🐕 Köpek
- 🐱 Kedi

### REST API Kullanımı

```bash
# Aslan için
curl "http://localhost:3000/animal-nutrition?animal=aslan"

# Fil için
curl "http://localhost:3000/animal-nutrition?animal=fil"

# Health check
curl "http://localhost:3000/health"
```

### MCP Client ile Kullanım

MCP client'ınızda bu server'ı kullanmak için:

1. Server'ı başlatın: `npm run mcp-server`
2. MCP client'ınızda `get_animal_nutrition` tool'unu kullanın
3. Hayvan adını parametre olarak gönderin

## 🎯 Desteklenen Hayvanlar

Sistem herhangi bir hayvan adını kabul eder. Örnekler:
- **Türkçe**: aslan, kaplan, fil, kartal, köpek, kedi, balık, yılan, vb.
- **İngilizce**: lion, tiger, elephant, eagle, dog, cat, fish, snake, vb.

## 📜 Mevcut Script'ler

```bash
npm run api-server      # Web interface + REST API
npm run mcp-server      # MCP server
npm run demo           # Demo çalıştırma
npm run test-nutrition # Test etme
npm run dev            # Mastra development
npm run build          # Mastra build

# Mobil uygulama (mobile-app/ dizininde)
cd mobile-app
npm start              # Expo dev server
npm run android        # Android emulator
npm run ios            # iOS simulator
```

## 📱 Mobil Uygulama Kurulumu

1. **Expo CLI yükleyin:**
```bash
npm install -g expo-cli
```

2. **Mobil uygulamayı başlatın:**
```bash
cd mobile-app
npm install
npm start
```

3. **Telefonunuzda test edin:**
   - Expo Go uygulamasını indirin
   - QR kodu tarayın
   - Chat arayüzünü kullanın

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje ISC lisansı altında lisanslanmıştır.

## 🔗 Bağlantılar

- [API Ninjas](https://api-ninjas.com)
- [Google Gemini AI](https://ai.google.dev)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)

---

**Not**: Bu proje eğitim amaçlı geliştirilmiştir. Production kullanımı için API anahtarlarını environment variables olarak ayarlamanız önerilir. 