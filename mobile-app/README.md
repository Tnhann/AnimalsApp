# 🐾 Hayvan Beslenme Mobil Uygulaması

React Native ve Expo ile geliştirilmiş, hayvanların beslenme alışkanlıkları hakkında bilgi veren mobil uygulama.

## 🚀 Özellikler

- 💬 WhatsApp benzeri sohbet arayüzü
- 🐾 Farklı hayvan kategorileri
- 💾 Favori hayvanları kaydetme özelliği
- 🔍 Hayvan arama fonksiyonu
- 🎨 Modern ve kullanıcı dostu arayüz
- 📱 iOS ve Android desteği
- 🌈 Hamburger menü ve gezinme seçenekleri
- ⌨️ Klavye ile uyumlu tasarım

## 📱 Ekran Görüntüleri

- Ana Ekran (Sohbet)
- Arama Ekranı
- Favoriler Ekranı
- Hayvan Detay Ekranı
- Açılış Ekranı

## 🚀 Kurulum

1. **Bağımlılıkları yükleyin:**

```bash
npm install
# veya
yarn install
```

2. **API URL Ayarları:**

Uygulama varsayılan olarak `https://animal-nutrition-api.vercel.app` API'sini kullanır. Kendi API URL'nizi ayarlamak için:

- `.env.example` dosyasını `.env` olarak kopyalayın
- `API_URL` değişkenini kendi API sunucunuza göre düzenleyin

```
API_URL=https://your-api-url.com
```

3. **Uygulamayı başlatın:**

```bash
npm start
# veya
yarn start
```

4. **Expo Go ile test edin:**
   - iOS/Android cihazınızda Expo Go uygulamasını açın
   - QR kodu taratın veya projeyi Expo hesabınız üzerinden bulun

## 🛠️ Yapı ve Klasörler

```
mobile-app/
├── screens/             # Uygulama ekranları
│   ├── home/            # Ana sohbet ekranı
│   ├── search/          # Arama ekranı
│   ├── favorites/       # Favoriler ekranı
│   ├── details/         # Hayvan detay ekranı
│   └── splash/          # Açılış ekranı
├── assets/              # Görseller ve fontlar
├── App.js               # Ana uygulama bileşeni
├── app.config.js        # Expo yapılandırması
├── .env.example         # Örnek çevre değişkenleri
└── package.json         # Bağımlılıklar
```

## 📋 Kullanılan Teknolojiler

- **React Native**: Mobil uygulama framework'ü
- **Expo**: Geliştirme platformu
- **Expo Image**: Performanslı görsel yükleme
- **React Navigation**: Ekranlar arası geçiş
- **Async Storage**: Lokal veri depolama (favoriler için)
- **KeyboardAvoidingView**: Klavye uyumlu tasarım

## 🔧 API Entegrasyonu

Uygulama, hayvan beslenme bilgilerini almak için bir REST API kullanır. API endpoint'i:

```
GET /animal-nutrition?animal={hayvan_adı}
```

Örnek yanıt:

```json
{
  "success": true,
  "animal": "aslan",
  "dietInformation": "Aslan, etçil (karnivor) bir hayvandır. Temel beslenme şekli avlanmaktır. Başlıca besinleri arasında: zebra, antilop, bufalo, yaban domuzu ve diğer büyük memeliler bulunur."
}
```

## 🔍 Arama Yapısı

Uygulama, aşağıdaki hayvan kategorilerini içerir:

- **Memeliler**: aslan, fil, köpek, kedi, kurt, maymun, zürafa
- **Kuşlar**: kartal, papağan, güvercin, baykuş, flamingo
- **Sürüngenler**: timsah, yılan, kertenkele, kaplumbağa
- **Balıklar**: somon, köpekbalığı, palyaço balığı, ahtapot
- **Böcekler**: örümcek, arı, kelebek, karınca

## 📝 Notlar

- Uygulama internet bağlantısı gerektirir
- API sunucusunun çalışır durumda olması gerekir
- Splash screen üzerinden rastgele hayvan bilgileri gösterilir
- Hamburger menü her ekrandan erişilebilir
- Klavye açıldığında input alanı otomatik olarak yukarı kayar

## 👨‍💻 Geliştirme

1. **Yeni hayvan kategorisi eklemek için:**
   - `HomeScreen.js` dosyasında `categories` dizisine yeni kategori ekleyin
   - `animalsByCategory` nesnesine kategoriye ait hayvanları ekleyin

2. **Yeni bir ekran eklemek için:**
   - `screens/` dizininde yeni bir klasör oluşturun
   - `App.js` içinde navigator'a yeni ekranı ekleyin 