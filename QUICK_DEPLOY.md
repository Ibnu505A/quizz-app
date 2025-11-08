# ⚡ Quick Deploy ke Railway (5 Menit)

## 🎯 Langkah Cepat

### 1. Push Code ke GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Buka Railway
1. Buka https://railway.app
2. Klik "Start a New Project"
3. Login dengan GitHub

### 3. Deploy Database
1. Klik "New" → "Database" → "Add PostgreSQL"
2. Tunggu sampai ready (30 detik)
3. Klik database → "Variables" tab
4. **Screenshot atau copy** semua values:
   - `PGHOST`
   - `PGPORT` 
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

### 4. Deploy Backend
1. Klik "New" → "GitHub Repo"
2. Pilih repository Anda
3. Set **Root Directory**: `backend`
4. Railway akan auto-detect, klik "Deploy"

### 5. Set Environment Variables
Di Backend Service → Variables, klik "New Variable" dan tambahkan:

```
DB_HOST=[PGHOST dari database]
DB_PORT=[PGPORT dari database]
DB_NAME=[PGDATABASE dari database]
DB_USER=[PGUSER dari database]
DB_PASSWORD=[PGPASSWORD dari database]
JWT_SECRET=[random string 32 karakter]
PORT=3000
NODE_ENV=production
CORS_ORIGIN=*
```

**Generate JWT_SECRET:**
- Buka: https://randomkeygen.com/
- Copy "CodeIgniter Encryption Keys" (32 karakter)
- Atau pakai: `openssl rand -hex 32`

### 6. Tunggu Deploy
- Status akan jadi "Deployed" (2-3 menit)
- Klik service → "Settings" → "Generate Domain"
- Copy URL (contoh: `https://quiz-app.up.railway.app`)

### 7. Test
Buka browser, akses:
```
https://your-app.up.railway.app/api/health
```

Harus muncul:
```json
{"success":true,"message":"Server is running!"}
```

### 8. Update Frontend
Edit `services/api.js` baris 10:
```javascript
const API_BASE_URL = __DEV__ 
    ? 'http://192.168.2.2:3000/api'
    : 'https://your-app.up.railway.app/api'; // ← Ganti dengan URL Railway Anda
```

### 9. Test dari Aplikasi
1. Pastikan device terhubung ke internet
2. Buka aplikasi
3. Test login/register
4. Test buat kuis
5. Test akses kuis dengan kode

---

## ✅ Selesai!

Aplikasi Anda sekarang bisa diakses dari manapun! 🎉

---

## 🆘 Masalah?

### Backend tidak bisa connect database
- Cek semua DB_* variables sudah di-set
- Pastikan values benar (copy dari database variables)

### CORS error
- Pastikan `CORS_ORIGIN=*` di variables

### Build error
- Cek logs di Railway dashboard
- Pastikan root directory = `backend`

---

**Butuh bantuan lebih detail? Baca `DEPLOYMENT_GUIDE.md`**

