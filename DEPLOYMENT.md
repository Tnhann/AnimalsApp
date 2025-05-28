# 🚀 Hayvan Beslenme Uzmanı - Deployment Rehberi

## 📋 Desteklenen Platformlar

### 1. **Railway** (Önerilen)
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

### 2. **Vercel**
```bash
# 1. Vercel CLI yükle
npm install -g vercel

# 2. Deploy et
vercel --prod
```

### 3. **Heroku**
```bash
# 1. Heroku CLI yükle ve login
heroku login

# 2. App oluştur
heroku create hayvan-beslenme-uzmani

# 3. Deploy et
git push heroku main
```

### 4. **Docker**
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
const API_URL = 'https://your-deployed-url.com';
```

## ✅ Test

Deploy sonrası test edin:
```bash
curl https://your-deployed-url.com/health
curl "https://your-deployed-url.com/animal-nutrition?animal=aslan"
``` 