# 🚀 Hayvan Beslenme Uzmanı - Deployment Rehberi

## 📋 Desteklenen Platformlar

### 1. **Smithery** (YENİ - Önerilen)
```bash
# 1. Smithery CLI yükle
npm install -g @smithery/cli

# 2. Login (API Key ile)
smithery auth login --api-key "YOUR_API_KEY"

# 3. Deploy et
smithery deploy

# 4. Status kontrol et
smithery status

# 5. Logs görüntüle
smithery logs --follow
```

**Smithery Özellikleri:**
- ✅ Otomatik scaling
- ✅ Health monitoring
- ✅ SSL sertifikası
- ✅ Custom domain desteği
- ✅ Real-time logs
- ✅ Zero-downtime deployment

### 2. **Railway**
```bash
# 1. Railway CLI yükle
npm install -g @railway/cli

# 2. Login
railway login

# 3. Proje oluştur
railway init

# 4. Deploy et
railway up
```

### 3. **Vercel**
```bash
# 1. Vercel CLI yükle
npm install -g vercel

# 2. Deploy et
vercel --prod
```

### 4. **Heroku**
```bash
# 1. Heroku CLI yükle ve login
heroku login

# 2. App oluştur
heroku create hayvan-beslenme-uzmani

# 3. Deploy et
git push heroku main
```

### 5. **Docker**
```bash
# 1. Build
docker build -t animal-nutrition-app .

# 2. Run
docker run -p 3000:3000 animal-nutrition-app
```

## 🔧 Environment Variables

Deployment sırasında şu environment variable'ları ayarlayın:

```env
NODE_ENV=production
PORT=3000
```

## 🌐 API Endpoints

Deploy edildikten sonra şu endpoint'ler kullanılabilir:

- `GET /` - Ana sayfa
- `GET /animal-nutrition?animal=aslan` - Hayvan beslenme bilgisi
- `GET /health` - Health check

## 📱 Mobile App Güncelleme

Deploy edildikten sonra mobile app'teki API URL'ini güncelleyin:

```javascript
// Smithery deployment için
const API_URL = 'https://animal-nutrition-api.smithery.app';

// Diğer platformlar için
const API_URL = 'https://your-deployed-url.com';
```

## ✅ Test

Deploy sonrası test edin:
```bash
# Smithery deployment test
curl https://animal-nutrition-api.smithery.app/health
curl "https://animal-nutrition-api.smithery.app/animal-nutrition?animal=aslan"

# Diğer platformlar test
curl https://your-deployed-url.com/health
curl "https://your-deployed-url.com/animal-nutrition?animal=aslan"
```

## 🔍 Smithery Monitoring

Smithery dashboard'da şunları izleyebilirsiniz:
- CPU ve Memory kullanımı
- Request/Response metrikleri
- Error rates
- Response times
- Uptime statistics

## 🚀 Smithery Deployment Komutları

```bash
# Hızlı deployment
smithery deploy --auto-confirm

# Production deployment
smithery deploy --env production

# Rollback
smithery rollback --version previous

# Scale up/down
smithery scale --instances 3

# Environment variables set
smithery env set NODE_ENV=production
smithery env set PORT=3000
``` 