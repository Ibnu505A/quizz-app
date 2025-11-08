# 📱 Panduan Build APK & Upload ke Play Store

## 🎯 Tujuan
Membuat aplikasi bisa di-download dari Play Store dan digunakan semua orang secara live & real-time

---

## 📋 Checklist Sebelum Mulai

- [ ] Backend sudah di-deploy ke Railway
- [ ] Backend URL sudah di-test dan berfungsi
- [ ] Frontend API URL sudah di-update ke production
- [ ] Expo account sudah dibuat (gratis)
- [ ] Google Play Developer account ($25 one-time)

---

## 🚀 Step 1: Deploy Backend ke Railway

### 1.1 Setup Railway (Jika Belum)
1. Buka https://railway.app
2. Sign up dengan GitHub
3. Deploy PostgreSQL database
4. Deploy backend dari GitHub repo
5. Set environment variables
6. Dapatkan URL (contoh: `https://quiz-app.up.railway.app`)

### 1.2 Test Backend
```bash
# Test health check
curl https://your-app.up.railway.app/api/health

# Harus return:
# {"success":true,"message":"Server is running!"}
```

---

## 📱 Step 2: Update Frontend untuk Production

### 2.1 Update API URL
Edit `services/api.js`:

```javascript
// Ganti dengan URL Railway Anda
const API_BASE_URL = __DEV__ 
    ? 'http://192.168.2.2:3000/api' // Development (local)
    : 'https://your-app.up.railway.app/api'; // Production (Railway)
```

**PENTING:** Ganti `your-app.up.railway.app` dengan URL Railway Anda!

### 2.2 Test dari Aplikasi
1. Pastikan device terhubung ke internet (bukan WiFi lokal)
2. Buka aplikasi
3. Test register/login
4. Test buat kuis
5. Test akses kuis dengan kode
6. Pastikan semua fitur bekerja dengan backend cloud

---

## 🔨 Step 3: Setup EAS Build (Expo Application Services)

### 3.1 Install EAS CLI
```bash
npm install -g eas-cli
```

### 3.2 Login ke Expo
```bash
eas login
```

### 3.3 Setup EAS Build
```bash
eas build:configure
```

Ini akan membuat file `eas.json` di root project.

### 3.4 Update eas.json
Pastikan ada konfigurasi untuk Android production:

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk"
      }
    },
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./path/to/api-key.json",
        "track": "internal"
      }
    }
  }
}
```

---

## 📦 Step 4: Build APK

### 4.1 Build APK untuk Testing
```bash
eas build --platform android --profile production
```

Ini akan:
- Build APK di cloud (Expo servers)
- Butuh waktu 10-20 menit
- Hasilnya bisa di-download dari Expo dashboard

### 4.2 Download APK
1. Setelah build selesai, buka https://expo.dev
2. Klik project Anda
3. Klik build yang baru selesai
4. Download APK

### 4.3 Test APK
1. Install APK di device Android
2. Test semua fitur dengan backend cloud
3. Pastikan login/register bekerja
4. Pastikan semua fitur real-time bekerja

---

## 🏪 Step 5: Setup Google Play Console

### 5.1 Buat Google Play Developer Account
1. Buka https://play.google.com/console
2. Bayar $25 (one-time payment)
3. Lengkapi informasi developer
4. Tunggu approval (biasanya 1-2 hari)

### 5.2 Buat App di Play Console
1. Klik "Create app"
2. Isi:
   - App name: "Quiz App" (atau nama Anda)
   - Default language: Indonesian
   - App or game: App
   - Free or paid: Free
3. Klik "Create"

### 5.3 Setup App Information
1. **Store listing:**
   - Short description (80 karakter)
   - Full description
   - Screenshots (min 2, max 8)
   - Feature graphic (1024x500)
   - App icon (512x512)

2. **Content rating:**
   - Isi questionnaire
   - Dapatkan rating

3. **Pricing & distribution:**
   - Free
   - Pilih negara distribusi

---

## 📤 Step 6: Upload ke Play Store

### 6.1 Build Release APK/AAB
Untuk Play Store, lebih baik pakai AAB (Android App Bundle):

```bash
# Update eas.json untuk AAB
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"  // Ganti dari "apk"
      }
    }
  }
}

# Build AAB
eas build --platform android --profile production
```

### 6.2 Upload ke Play Console
1. Di Play Console, klik "Production" → "Create new release"
2. Upload AAB file
3. Isi release notes
4. Klik "Review release"

### 6.3 Submit untuk Review
1. Lengkapi semua informasi yang diperlukan
2. Klik "Submit for review"
3. Tunggu approval (biasanya 1-7 hari)

---

## ✅ Step 7: Verifikasi Semua Fitur

Setelah aplikasi live di Play Store, test:

- [ ] Register guru baru
- [ ] Login guru
- [ ] Buat kuis baru
- [ ] Lihat daftar kuis
- [ ] Hapus kuis
- [ ] Akses kuis dengan kode (siswa)
- [ ] Submit hasil kuis
- [ ] Lihat hasil kuis (guru)
- [ ] Real-time updates (jika sudah diimplementasi)

---

## 🔧 Konfigurasi Tambahan

### Update app.json untuk Production
```json
{
  "expo": {
    "name": "Quiz App",
    "slug": "quiz-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "android": {
      "package": "com.yourname.quizapp",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    }
  }
}
```

**PENTING:** 
- Ganti `com.yourname.quizapp` dengan package name unik Anda
- Buat icon dan splash screen

---

## 🎯 Real-Time Features

Untuk fitur real-time (Socket.io), pastikan:

1. **Backend sudah setup Socket.io** ✅ (sudah ada)
2. **Frontend connect ke Socket.io:**
   ```javascript
   import io from 'socket.io-client';
   
   const socket = io('https://your-app.up.railway.app');
   ```

3. **Update API URL di Socket.io:**
   - Pastikan URL sama dengan API URL
   - Gunakan HTTPS (Railway otomatis)

---

## 📝 Checklist Final

Sebelum upload ke Play Store:

- [ ] Backend sudah di-deploy ke Railway
- [ ] Backend URL sudah di-test dan berfungsi
- [ ] Frontend API URL sudah di-update
- [ ] Semua fitur sudah di-test dengan backend cloud
- [ ] APK sudah di-build dan di-test
- [ ] App icon dan splash screen sudah dibuat
- [ ] app.json sudah di-update
- [ ] Package name sudah unik
- [ ] Google Play Developer account sudah dibuat
- [ ] Store listing sudah lengkap

---

## 🆘 Troubleshooting

### Build Error
- Cek `app.json` sudah benar
- Pastikan semua dependencies terinstall
- Cek logs di Expo dashboard

### Backend tidak bisa diakses dari APK
- Pastikan API URL menggunakan HTTPS
- Cek CORS di backend sudah allow semua origin
- Test backend URL dari browser

### Real-time tidak bekerja
- Pastikan Socket.io URL sama dengan API URL
- Cek backend Socket.io sudah running
- Test connection dari browser console

---

## 🎉 Setelah Live di Play Store

1. ✅ Aplikasi bisa di-download semua orang
2. ✅ Backend di cloud (Railway) - accessible 24/7
3. ✅ Data tersimpan di database cloud
4. ✅ Real-time features bekerja
5. ✅ Semua fitur accessible dari manapun

**Selamat! Aplikasi Anda sudah live dan bisa digunakan semua orang! 🚀**

---

## 📚 Resources

- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Play Console: https://play.google.com/console
- Railway Docs: https://docs.railway.app

