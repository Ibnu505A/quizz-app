# 🌐 Setup Production - Aplikasi Live untuk Semua Orang

## 🎯 Tujuan
Membuat aplikasi bisa digunakan semua orang secara live & real-time dengan:
- ✅ Backend di cloud (Railway)
- ✅ Database di cloud
- ✅ APK di Play Store
- ✅ Real-time features bekerja

---

## 📋 Step-by-Step Setup

### 1️⃣ Deploy Backend ke Railway

#### 1.1 Setup Railway
1. Buka https://railway.app
2. Sign up dengan GitHub
3. Klik "New Project"

#### 1.2 Deploy Database
1. Klik "New" → "Database" → "Add PostgreSQL"
2. Tunggu sampai ready
3. Copy connection details dari Variables tab

#### 1.3 Deploy Backend
1. Klik "New" → "GitHub Repo"
2. Pilih repository Anda
3. Set **Root Directory**: `backend`
4. Set **Start Command**: `npm start`

#### 1.4 Set Environment Variables
Di Backend Service → Variables:
```
DB_HOST=[dari database]
DB_PORT=[dari database]
DB_NAME=[dari database]
DB_USER=[dari database]
DB_PASSWORD=[dari database]
JWT_SECRET=[random 32 karakter]
PORT=3000
NODE_ENV=production
CORS_ORIGIN=*
```

#### 1.5 Dapatkan URL
1. Klik service → Settings → Generate Domain
2. Copy URL (contoh: `https://quiz-app.up.railway.app`)
3. **SIMPAN URL INI!** Akan dipakai di frontend

---

### 2️⃣ Update Frontend untuk Production

#### 2.1 Update API URL
Edit `services/api.js` baris 10:

```javascript
const API_BASE_URL = __DEV__ 
    ? 'http://192.168.2.2:3000/api' // Development
    : 'https://your-app.up.railway.app/api'; // ← GANTI DENGAN URL RAILWAY ANDA
```

**PENTING:** Ganti `your-app.up.railway.app` dengan URL Railway Anda!

#### 2.2 Test Backend Connection
```bash
# Test dari browser atau curl
curl https://your-app.up.railway.app/api/health

# Harus return:
# {"success":true,"message":"Server is running!"}
```

#### 2.3 Test dari Aplikasi
1. Pastikan device terhubung ke internet (bukan WiFi lokal)
2. Buka aplikasi
3. Test register/login → Harus berhasil
4. Test buat kuis → Harus berhasil
5. Test semua fitur → Semua harus bekerja

---

### 3️⃣ Setup untuk Build APK

#### 3.1 Install EAS CLI
```bash
npm install -g eas-cli
```

#### 3.2 Login Expo
```bash
eas login
# Atau buat account baru: eas register
```

#### 3.3 Configure EAS Build
```bash
eas build:configure
```

Ini akan membuat `eas.json`.

#### 3.4 Update app.json (Jika Ada)
Pastikan ada:
```json
{
  "expo": {
    "name": "Quiz App",
    "slug": "quiz-app",
    "version": "1.0.0",
    "android": {
      "package": "com.yourname.quizapp",
      "versionCode": 1
    }
  }
}
```

**PENTING:** 
- Ganti `com.yourname.quizapp` dengan package name unik
- Contoh: `com.david.quizapp` atau `com.yourcompany.quizapp`

---

### 4️⃣ Build APK

#### 4.1 Build untuk Testing
```bash
eas build --platform android --profile production
```

Ini akan:
- Build di cloud (10-20 menit)
- Hasilnya bisa di-download dari https://expo.dev

#### 4.2 Download & Test APK
1. Buka https://expo.dev
2. Klik project → Builds
3. Download APK yang sudah selesai
4. Install di device Android
5. **Test dengan backend cloud:**
   - Register/login → Harus berhasil
   - Buat kuis → Harus berhasil
   - Akses kuis dengan kode → Harus berhasil
   - Semua fitur → Harus bekerja

---

### 5️⃣ Upload ke Play Store

#### 5.1 Buat Google Play Developer Account
1. Buka https://play.google.com/console
2. Bayar $25 (one-time)
3. Lengkapi informasi
4. Tunggu approval (1-2 hari)

#### 5.2 Buat App di Play Console
1. Klik "Create app"
2. Isi informasi dasar
3. Klik "Create"

#### 5.3 Lengkapi Store Listing
- App name
- Short description (80 karakter)
- Full description
- Screenshots (min 2)
- App icon (512x512)
- Feature graphic (1024x500)

#### 5.4 Build AAB untuk Play Store
```bash
# Update eas.json untuk AAB
# Ganti "buildType": "apk" menjadi "app-bundle"

eas build --platform android --profile production
```

#### 5.5 Upload AAB ke Play Console
1. Play Console → Production → Create release
2. Upload AAB file
3. Isi release notes
4. Submit for review

---

## ✅ Checklist Production

Sebelum aplikasi live:

- [ ] Backend sudah di-deploy ke Railway
- [ ] Backend URL sudah di-test (health check)
- [ ] Frontend API URL sudah di-update ke production
- [ ] Semua fitur sudah di-test dengan backend cloud
- [ ] APK sudah di-build dan di-test
- [ ] APK sudah di-test dengan backend cloud
- [ ] App icon dan assets sudah dibuat
- [ ] Package name sudah unik
- [ ] Google Play Developer account sudah dibuat
- [ ] Store listing sudah lengkap
- [ ] AAB sudah di-upload ke Play Console

---

## 🔧 Real-Time Features

Untuk Socket.io real-time:

### Backend (Sudah Ada ✅)
- Socket.io sudah setup di `backend/server.js`
- Sudah support CORS

### Frontend (Jika Perlu)
```javascript
import io from 'socket.io-client';

const socket = io('https://your-app.up.railway.app', {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('new-result', (data) => {
  // Handle real-time updates
});
```

**PENTING:** Gunakan URL yang sama dengan API URL (Railway URL)

---

## 🎯 Setelah Live

Setelah aplikasi di Play Store:

1. ✅ **Semua orang bisa download** dari Play Store
2. ✅ **Backend di cloud** - accessible 24/7
3. ✅ **Database di cloud** - data tersimpan aman
4. ✅ **Real-time features** - update langsung
5. ✅ **Tidak perlu WiFi lokal** - pakai internet biasa

---

## 📝 Catatan Penting

1. **Railway Free Tier:**
   - $5 credit gratis per bulan
   - Cukup untuk development/testing
   - Untuk production banyak user, pertimbangkan upgrade

2. **Backend URL:**
   - Jangan lupa update di `services/api.js`
   - Test dulu sebelum build APK
   - Pastikan menggunakan HTTPS

3. **Package Name:**
   - Harus unik di seluruh Play Store
   - Tidak bisa diubah setelah publish
   - Format: `com.yourname.appname`

4. **Version:**
   - Update `versionCode` setiap kali upload baru
   - Update `version` di app.json

---

## 🆘 Troubleshooting

### Backend tidak bisa diakses dari APK
- Pastikan API URL menggunakan HTTPS (bukan HTTP)
- Cek CORS di backend sudah allow semua origin
- Test backend URL dari browser

### Build error
- Cek `app.json` sudah benar
- Pastikan package name unik
- Cek logs di Expo dashboard

### Real-time tidak bekerja
- Pastikan Socket.io URL sama dengan API URL
- Cek backend Socket.io sudah running
- Test dari browser console

---

## 🎉 Hasil Akhir

Setelah semua step selesai:

✅ **Aplikasi live di Play Store**
✅ **Bisa di-download semua orang**
✅ **Backend di cloud (Railway)**
✅ **Database di cloud**
✅ **Real-time features bekerja**
✅ **Tidak perlu setup lokal**

**Aplikasi Anda sudah production-ready! 🚀**

---

## 📚 Resources

- Railway: https://railway.app
- EAS Build: https://docs.expo.dev/build/introduction/
- Play Console: https://play.google.com/console
- Expo Docs: https://docs.expo.dev

