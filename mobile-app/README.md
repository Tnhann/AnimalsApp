# 🐾 Hayvan Beslenme Uzmanı - Mobil Uygulama

Expo Go ile çalışan React Native mobil uygulaması. Kullanıcılar hayvan beslenme uzmanı ile chat yapabilir.

## 🚀 Kurulum ve Çalıştırma

### 1. Bağımlılıkları Yükleyin
```bash
cd mobile-app
npm install
```

### 2. Expo CLI'yi Yükleyin (Eğer yoksa)
```bash
npm install -g expo-cli
```

### 3. API Server'ı Başlatın
Önce ana dizinde API server'ınızı başlatın:
```bash
cd ..
npm run api-server
```

### 4. IP Adresini Güncelleyin
`App.js` dosyasında `API_URL` değişkenini kendi bilgisayarınızın IP adresi ile güncelleyin:

```javascript
const API_URL = 'http://192.168.1.100:3000'; // Kendi IP'nizi yazın
```

**IP Adresinizi Öğrenmek İçin:**
- Windows: `ipconfig` komutu
- Mac/Linux: `ifconfig` komutu

### 5. Uygulamayı Başlatın
```bash
npm start
```

### 6. Expo Go ile Test Edin
1. Telefonunuza **Expo Go** uygulamasını indirin
2. QR kodu tarayın
3. Uygulamayı test edin

## 📱 Özellikler

- ✅ **Chat Arayüzü**: WhatsApp benzeri modern chat
- ✅ **Hızlı Sorular**: Popüler hayvanlar için hızlı butonlar
- ✅ **Gerçek Zamanlı**: API server ile canlı iletişim
- ✅ **Responsive**: Tüm ekran boyutlarında çalışır
- ✅ **Loading States**: Kullanıcı dostu yükleme animasyonları
- ✅ **Error Handling**: Hata durumları için uyarılar

## 🎯 Kullanım

1. Uygulamayı açın
2. Hayvan adını yazın (örn: "aslan", "fil", "kartal")
3. Gönder butonuna basın
4. AI uzmanından detaylı beslenme bilgisi alın

## 🔧 Sorun Giderme

### Bağlantı Hatası
- API server'ın çalıştığından emin olun (`npm run api-server`)
- IP adresinin doğru olduğunu kontrol edin
- Telefon ve bilgisayarın aynı WiFi ağında olduğunu kontrol edin

### Expo Go Sorunları
- Expo Go uygulamasını güncelleyin
- QR kodu yeniden tarayın
- Metro bundler'ı yeniden başlatın

## 📂 Proje Yapısı

```
mobile-app/
├── App.js              # Ana uygulama dosyası
├── package.json        # Bağımlılıklar
├── app.json           # Expo konfigürasyonu
├── babel.config.js    # Babel konfigürasyonu
└── README.md          # Bu dosya
```

## 🎨 Tasarım

- **Renk Paleti**: Yeşil tonları (#4CAF50)
- **Tipografi**: System fonts
- **İkonlar**: Expo Vector Icons
- **Layout**: Modern chat arayüzü

## 📱 Desteklenen Platformlar

- ✅ iOS (iPhone/iPad)
- ✅ Android
- ✅ Expo Go

---

**Not**: Bu uygulama API server'a bağımlıdır. Kullanmadan önce API server'ın çalıştığından emin olun. 