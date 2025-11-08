# 🚀 Panduan Deployment Quiz App

## 📋 Overview

Untuk membuat aplikasi bisa diakses dari manapun, kita perlu:
1. **Deploy Backend** ke cloud (Railway/Heroku)
2. **Deploy Database** ke cloud (Railway/Supabase)
3. **Update Frontend** dengan production API URL
4. **Deploy Frontend** ke Expo (optional, untuk distribusi)

---

## 🎯 Opsi 1: Railway (Recommended - Paling Mudah)

### Keuntungan Railway:
- ✅ Gratis untuk start ($5 credit gratis)
- ✅ Mudah setup
- ✅ Auto-deploy dari GitHub
- ✅ PostgreSQL included
- ✅ Custom domain gratis

### Langkah-langkah:

#### 1. Setup Railway Account
1. Buka https://railway.app
2. Sign up dengan GitHub
3. Klik "New Project"
4. Pilih "Deploy from GitHub repo"

#### 2. Setup Database di Railway
1. Di project Railway, klik "New" → "Database" → "Add PostgreSQL"
2. Railway akan otomatis buat database
3. Copy connection string (akan muncul di Variables)

#### 3. Setup Backend di Railway
1. Di project Railway, klik "New" → "GitHub Repo"
2. Pilih repository Anda
3. Railway akan auto-detect Node.js
4. Set root directory ke `backend`
5. Set start command: `npm start`

#### 4. Environment Variables di Railway
Tambahkan di Railway → Variables:
```
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=[dari Railway]
JWT_SECRET=[generate random string]
PORT=3000
NODE_ENV=production
```

#### 5. Deploy
- Railway akan auto-deploy setiap push ke GitHub
- Atau klik "Deploy" manual
- Tunggu sampai "Deployed" (biasanya 2-3 menit)

#### 6. Dapatkan URL Backend
- Railway akan kasih URL seperti: `https://your-app.up.railway.app`
- Update frontend dengan URL ini

---

## 🎯 Opsi 2: Heroku (Alternatif)

### Setup Heroku:

#### 1. Install Heroku CLI
```bash
# Download dari https://devcenter.heroku.com/articles/heroku-cli
```

#### 2. Login Heroku
```bash
heroku login
```

#### 3. Create Heroku App
```bash
cd backend
heroku create quiz-app-backend
```

#### 4. Add PostgreSQL Addon
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

#### 5. Setup Environment Variables
```bash
heroku config:set JWT_SECRET=your-secret-key-here
heroku config:set NODE_ENV=production
```

#### 6. Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

---

## 🎯 Opsi 3: Supabase (Database) + Railway (Backend)

### Keuntungan:
- ✅ Supabase PostgreSQL gratis (500MB)
- ✅ Railway untuk backend gratis

### Setup Supabase Database:

1. Buka https://supabase.com
2. Sign up dan create project baru
3. Copy connection string dari Settings → Database
4. Update Railway environment variables dengan Supabase connection string

---

## 📱 Update Frontend untuk Production

### 1. Update API URL

Edit `services/api.js`:

```javascript
const API_BASE_URL = __DEV__ 
    ? 'http://192.168.2.2:3000/api' // Development (local)
    : 'https://your-app.up.railway.app/api'; // Production (Railway)
```

### 2. Build untuk Production

```bash
# Build APK/AAB untuk Android
eas build --platform android --profile production

# Build IPA untuk iOS (perlu Apple Developer account)
eas build --platform ios --profile production
```

---

## 🔧 Setup Railway (Step by Step)

### File yang Perlu Ditambahkan:

#### 1. `backend/Procfile` (untuk Heroku, optional)
```
web: node server.js
```

#### 2. Update `backend/package.json`
Pastikan ada:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### 3. Update `backend/server.js`
Pastikan server listen di PORT dari environment:
```javascript
const PORT = process.env.PORT || 3000;
```

---

## ✅ Checklist Deployment

- [ ] Railway/Heroku account sudah dibuat
- [ ] Database PostgreSQL sudah di-setup
- [ ] Environment variables sudah di-set
- [ ] Backend sudah di-deploy
- [ ] Backend URL sudah di-test (health check)
- [ ] Frontend API URL sudah di-update
- [ ] CORS sudah allow semua origin (atau domain spesifik)
- [ ] JWT_SECRET sudah di-set dengan random string
- [ ] Database connection sudah berfungsi

---

## 🧪 Test Production Backend

Setelah deploy, test dengan:

```bash
# Health check
curl https://your-app.up.railway.app/api/health

# Test register
curl -X POST https://your-app.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

---

## 🔒 Security Checklist untuk Production

- [ ] JWT_SECRET menggunakan random string yang kuat
- [ ] CORS hanya allow domain yang diperlukan (atau "*" untuk development)
- [ ] Rate limiting (optional, bisa ditambahkan nanti)
- [ ] HTTPS enabled (Railway/Heroku otomatis)
- [ ] Environment variables tidak di-commit ke Git
- [ ] Database password kuat

---

## 📝 Catatan Penting

1. **Database**: Railway PostgreSQL gratis hanya untuk development. Untuk production, pertimbangkan upgrade atau pakai Supabase.

2. **Backend URL**: Setelah deploy, URL akan seperti:
   - Railway: `https://your-app.up.railway.app`
   - Heroku: `https://your-app.herokuapp.com`

3. **Frontend**: Update `services/api.js` dengan production URL

4. **CORS**: Pastikan backend allow requests dari frontend domain

5. **Environment Variables**: Jangan commit `.env` ke Git!

---

## 🆘 Troubleshooting

### Backend tidak bisa connect ke database
- Cek environment variables di Railway
- Pastikan connection string benar
- Test connection dengan script `test-connection.js`

### CORS error di frontend
- Update CORS di `backend/server.js`:
  ```javascript
  app.use(cors({
    origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
    credentials: true
  }));
  ```

### Build error di Railway
- Pastikan `package.json` ada script `start`
- Pastikan root directory benar (`backend`)
- Cek logs di Railway dashboard

---

## 🎉 Setelah Deploy

1. Test semua endpoint dari production URL
2. Update frontend dengan production API URL
3. Test aplikasi dari device fisik dengan internet
4. Share aplikasi ke pengguna!

