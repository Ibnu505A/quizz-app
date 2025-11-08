# 🚀 Panduan Deployment Quiz App ke Cloud

## 🎯 Tujuan
Membuat aplikasi bisa diakses dari manapun (tidak hanya WiFi lokal)

## 📋 Yang Perlu Di-Deploy

1. **Backend** → Railway/Heroku
2. **Database** → Railway PostgreSQL / Supabase
3. **Frontend** → Update API URL ke production

---

## 🚀 Opsi 1: Railway (Paling Mudah - Recommended)

### Step 1: Setup Railway Account
1. Buka https://railway.app
2. Klik "Start a New Project"
3. Sign up dengan GitHub (paling mudah)

### Step 2: Deploy Database
1. Di Railway dashboard, klik "New" → "Database" → "Add PostgreSQL"
2. Tunggu sampai database ready
3. Klik database → "Variables" tab
4. Copy semua connection details:
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

### Step 3: Deploy Backend
1. Di Railway dashboard, klik "New" → "GitHub Repo"
2. Pilih repository Anda (atau fork dulu)
3. Railway akan auto-detect Node.js
4. Set **Root Directory** ke: `backend`
5. Set **Start Command** ke: `npm start`

### Step 4: Setup Environment Variables
Di Railway → Backend Service → Variables, tambahkan:

```
DB_HOST=[dari database variables]
DB_PORT=[dari database variables]
DB_NAME=[dari database variables]
DB_USER=[dari database variables]
DB_PASSWORD=[dari database variables]
JWT_SECRET=[generate random string, contoh: openssl rand -hex 32]
PORT=3000
NODE_ENV=production
CORS_ORIGIN=*
```

**Cara generate JWT_SECRET:**
```bash
# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})

# Atau pakai online generator: https://randomkeygen.com/
```

### Step 5: Deploy
1. Railway akan auto-deploy dari GitHub
2. Atau klik "Deploy" manual
3. Tunggu sampai status "Deployed" (biasanya 2-3 menit)
4. Klik service → "Settings" → "Generate Domain"
5. Copy URL (contoh: `https://quiz-app-backend.up.railway.app`)

### Step 6: Test Backend
```bash
# Test health check
curl https://your-app.up.railway.app/api/health

# Harus return:
# {"success":true,"message":"Server is running!","timestamp":"..."}
```

---

## 📱 Update Frontend

### Step 1: Update API URL
Edit `services/api.js`:

```javascript
const API_BASE_URL = __DEV__ 
    ? 'http://192.168.2.2:3000/api' // Development (local)
    : 'https://your-app.up.railway.app/api'; // Production (Railway URL Anda)
```

### Step 2: Test dari Device
1. Pastikan device terhubung ke internet (bukan WiFi lokal)
2. Buka aplikasi
3. Test login/register
4. Test buat kuis
5. Test akses kuis dengan kode

---

## 🎯 Opsi 2: Heroku (Alternatif)

### Setup Heroku:

```bash
# 1. Install Heroku CLI
# Download dari: https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Create app
cd backend
heroku create quiz-app-backend

# 4. Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# 5. Set environment variables
heroku config:set JWT_SECRET=your-random-secret-here
heroku config:set NODE_ENV=production

# 6. Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# 7. Get URL
heroku info
```

---

## 🔧 File yang Sudah Disiapkan

✅ `backend/Procfile` - Untuk Heroku
✅ `backend/railway.json` - Untuk Railway
✅ `backend/server.js` - Sudah support CORS dan environment variables
✅ `backend/package.json` - Sudah ada script `start`

---

## ✅ Checklist Sebelum Deploy

- [ ] Backend code sudah di-push ke GitHub
- [ ] `.env` sudah di-ignore (tidak di-commit)
- [ ] `package.json` sudah ada script `start`
- [ ] Database connection sudah di-test lokal
- [ ] JWT_SECRET sudah di-generate

---

## 🧪 Test Setelah Deploy

### 1. Test Health Check
```bash
curl https://your-app.up.railway.app/api/health
```

### 2. Test Register
```bash
curl -X POST https://your-app.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

### 3. Test dari Frontend
- Update `services/api.js` dengan production URL
- Test login/register dari aplikasi
- Test buat kuis
- Test akses kuis dengan kode

---

## 🔒 Security untuk Production

1. **JWT_SECRET**: Gunakan random string yang kuat (min 32 karakter)
2. **CORS**: Bisa di-restrict ke domain spesifik:
   ```javascript
   CORS_ORIGIN=https://your-frontend-domain.com
   ```
3. **Database**: Jangan expose database credentials
4. **HTTPS**: Railway/Heroku otomatis provide HTTPS

---

## 📝 Catatan Penting

1. **Railway Free Tier**: 
   - $5 credit gratis per bulan
   - Cukup untuk development/testing
   - Untuk production, pertimbangkan upgrade

2. **Database**:
   - Railway PostgreSQL: Included dengan service
   - Supabase: Alternatif gratis (500MB)

3. **Frontend**:
   - Tetap bisa pakai Expo Go untuk development
   - Untuk distribusi, bisa build APK/IPA dengan EAS Build

4. **URL**:
   - Railway: `https://your-app.up.railway.app`
   - Heroku: `https://your-app.herokuapp.com`

---

## 🆘 Troubleshooting

### Backend tidak bisa connect ke database
- Cek environment variables di Railway
- Pastikan semua DB_* variables sudah di-set
- Test connection dengan script `test-connection.js`

### CORS error
- Pastikan `CORS_ORIGIN=*` di environment variables
- Atau set ke domain spesifik

### Build error
- Cek logs di Railway dashboard
- Pastikan `package.json` ada script `start`
- Pastikan root directory benar (`backend`)

---

## 🎉 Setelah Deploy

1. ✅ Backend sudah accessible dari internet
2. ✅ Database sudah di cloud
3. ✅ Frontend bisa connect ke production API
4. ✅ Aplikasi bisa digunakan dari manapun!

**Selamat! Aplikasi Anda sudah online! 🚀**

