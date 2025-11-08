# 🚀 Cara Push Project ke GitHub

## ✅ Status Project Anda

- ✅ Git sudah di-initialize
- ✅ .gitignore sudah ada
- ⚠️ Perlu setup remote repository

---

## 📋 Langkah-Langkah

### Step 1: Buat Repository di GitHub

1. **Buka https://github.com**
2. **Login** (atau sign up jika belum punya)
3. **Klik tombol "+"** di pojok kanan atas
4. **Pilih "New repository"**
5. **Isi form:**
   - **Repository name**: `quiz-app` (atau nama lain)
   - **Description**: "Quiz App - React Native dengan Backend"
   - **Visibility**: Pilih **Public** (gratis)
   - **JANGAN centang** apapun (README, .gitignore, license)
6. **Klik "Create repository"**
7. **Copy URL repository** yang muncul
   - Contoh: `https://github.com/username/quiz-app.git`

---

### Step 2: Connect Project ke GitHub

Buka terminal di folder project (`C:\Users\nuib6\OneDrive\Desktop\kuis`) dan jalankan:

```bash
# Ganti dengan URL repository Anda
git remote add origin https://github.com/username/quiz-app.git
```

**Contoh:**
```bash
git remote add origin https://github.com/david/quiz-app.git
```

---

### Step 3: Add & Commit Files

```bash
# Add semua file
git add .

# Commit
git commit -m "Initial commit - Quiz App dengan Backend"
```

---

### Step 4: Push ke GitHub

```bash
# Set branch ke main
git branch -M main

# Push ke GitHub
git push -u origin main
```

**Jika diminta username/password:**
- **Username**: GitHub username Anda
- **Password**: **JANGAN pakai password biasa!**
- Pakai **Personal Access Token** (lihat Step 5)

---

### Step 5: Buat Personal Access Token (Jika Perlu)

Jika Git meminta password:

1. **Buka GitHub → Settings**
2. **Scroll ke bawah → Developer settings**
3. **Personal access tokens → Tokens (classic)**
4. **Generate new token (classic)**
5. **Isi:**
   - Note: "Quiz App"
   - Expiration: 90 days
   - Scopes: Centang **repo** (semua)
6. **Generate token**
7. **COPY TOKEN** (hanya muncul sekali!)
8. **Pakai token sebagai password** saat Git push

---

## ✅ Verifikasi

Setelah push berhasil:

1. **Buka repository di GitHub**
   - https://github.com/username/quiz-app
   - Harus muncul semua file

2. **Cek file penting:**
   - ✅ `backend/` folder ada
   - ✅ `services/` folder ada
   - ✅ `components/` folder ada
   - ✅ `App.js` ada
   - ✅ `.gitignore` ada

3. **Pastikan .env TIDAK ter-upload:**
   - File `.env` dan `backend/.env` **TIDAK BOLEH** ada di GitHub

---

## 🆘 Troubleshooting

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/username/quiz-app.git
```

### Error: "failed to push"
- Cek koneksi internet
- Pastikan pakai Personal Access Token (bukan password)

### File .env ter-upload
```bash
git rm --cached .env
git rm --cached backend/.env
git commit -m "Remove .env files"
git push
```

---

## 🎯 Setelah Push Berhasil

Setelah code sudah di GitHub:

1. ✅ **Lanjut deploy ke Railway** (lihat `QUICK_DEPLOY.md`)
2. ✅ Railway bisa connect ke GitHub repository Anda
3. ✅ Auto-deploy dari GitHub

---

**Ikuti langkah-langkah di atas untuk push project ke GitHub! 🚀**

