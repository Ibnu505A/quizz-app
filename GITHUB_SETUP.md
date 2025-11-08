# 📦 Setup GitHub untuk Deployment

## 🎯 Tujuan
Upload project ke GitHub agar bisa di-deploy ke Railway

---

## 📋 Opsi: Repository Baru atau Existing?

### Opsi 1: Buat Repository Baru (Recommended)
✅ Lebih bersih
✅ Bisa mulai dari awal
✅ Tidak ada konflik

### Opsi 2: Pakai Repository Existing
✅ Jika sudah punya repo
✅ Tinggal push code baru

---

## 🚀 Step-by-Step: Buat Repository Baru

### Step 1: Buat Repository di GitHub

1. **Buka GitHub**
   - Buka https://github.com
   - Login (atau sign up jika belum punya account)

2. **Buat Repository Baru**
   - Klik tombol "+" di pojok kanan atas
   - Pilih "New repository"

3. **Isi Informasi Repository**
   - **Repository name**: `quiz-app` (atau nama lain)
   - **Description**: "Quiz App - React Native dengan Backend Node.js"
   - **Visibility**: 
     - ✅ **Public** (gratis, bisa dilihat semua orang)
     - ⚠️ **Private** (perlu GitHub Pro, tapi lebih aman)
   - **JANGAN centang** "Initialize with README" (kita sudah punya code)
   - **JANGAN centang** "Add .gitignore" (kita sudah punya)
   - **JANGAN centang** "Choose a license"

4. **Klik "Create repository"**

5. **Copy URL Repository**
   - Setelah repository dibuat, GitHub akan kasih URL
   - Contoh: `https://github.com/username/quiz-app.git`
   - **SIMPAN URL INI!**

---

### Step 2: Setup Git di Project Lokal

#### 2.1 Cek Apakah Sudah Ada Git
```bash
# Di folder project (C:\Users\nuib6\OneDrive\Desktop\kuis)
git status
```

**Jika muncul error "not a git repository":**
- Belum ada Git, lanjut ke Step 2.2

**Jika sudah ada Git:**
- Skip ke Step 3

#### 2.2 Initialize Git (Jika Belum Ada)
```bash
# Di folder project
git init
```

#### 2.3 Buat .gitignore (Jika Belum Ada)
Buat file `.gitignore` di root project:

```
# Dependencies
node_modules/
backend/node_modules/

# Environment variables
.env
backend/.env
*.env

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Build
dist/
build/
.expo/
.expo-shared/

# Database
*.db
*.sqlite
```

#### 2.4 Add Files ke Git
```bash
# Add semua file
git add .

# Commit pertama
git commit -m "Initial commit - Quiz App"
```

---

### Step 3: Connect ke GitHub Repository

#### 3.1 Add Remote Repository
```bash
# Ganti dengan URL repository Anda
git remote add origin https://github.com/username/quiz-app.git
```

**Contoh:**
```bash
git remote add origin https://github.com/david/quiz-app.git
```

#### 3.2 Cek Remote (Optional)
```bash
git remote -v
```

Harus muncul:
```
origin  https://github.com/username/quiz-app.git (fetch)
origin  https://github.com/username/quiz-app.git (push)
```

---

### Step 4: Push ke GitHub

#### 4.1 Push Code
```bash
git branch -M main
git push -u origin main
```

**Jika diminta login:**
- Username: GitHub username Anda
- Password: **JANGAN pakai password biasa!**
- Pakai **Personal Access Token** (lihat Step 5)

---

### Step 5: Setup Personal Access Token (Jika Perlu)

Jika Git meminta password, perlu Personal Access Token:

1. **Buat Token**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Klik "Generate new token (classic)"
   - Note: "Quiz App Deployment"
   - Expiration: 90 days (atau No expiration)
   - Scopes: Centang **repo** (semua)
   - Klik "Generate token"
   - **COPY TOKEN INI!** (hanya muncul sekali)

2. **Pakai Token sebagai Password**
   - Saat Git push meminta password
   - Paste token (bukan password GitHub)

---

## ✅ Verifikasi

Setelah push berhasil:

1. **Buka GitHub Repository**
   - Buka https://github.com/username/quiz-app
   - Harus muncul semua file project

2. **Cek File Penting**
   - ✅ `backend/` folder ada
   - ✅ `services/` folder ada
   - ✅ `components/` folder ada
   - ✅ `App.js` ada
   - ✅ `package.json` ada
   - ✅ `.gitignore` ada

3. **Pastikan .env TIDAK Ter-upload**
   - File `.env` dan `backend/.env` **TIDAK BOLEH** ada di GitHub
   - Cek di repository, harus tidak ada

---

## 🔧 Troubleshooting

### Error: "remote origin already exists"
```bash
# Hapus remote yang lama
git remote remove origin

# Tambah lagi
git remote add origin https://github.com/username/quiz-app.git
```

### Error: "failed to push"
- Cek koneksi internet
- Cek username/password benar
- Pastikan pakai Personal Access Token (bukan password)

### File .env Ter-upload
```bash
# Hapus dari Git (tapi tetap di local)
git rm --cached .env
git rm --cached backend/.env

# Commit
git commit -m "Remove .env files"

# Push lagi
git push
```

---

## 📝 Checklist

Sebelum deploy ke Railway:

- [ ] GitHub account sudah dibuat
- [ ] Repository baru sudah dibuat di GitHub
- [ ] Git sudah di-initialize di project lokal
- [ ] `.gitignore` sudah dibuat dan benar
- [ ] Semua file sudah di-add dan commit
- [ ] Code sudah di-push ke GitHub
- [ ] File `.env` **TIDAK** ter-upload ke GitHub
- [ ] Repository bisa diakses di GitHub

---

## 🎯 Setelah Push ke GitHub

Setelah code sudah di GitHub, lanjut ke:

1. **Deploy ke Railway** (lihat `QUICK_DEPLOY.md`)
   - Railway bisa connect ke GitHub
   - Auto-deploy dari GitHub

2. **Update API URL** di `services/api.js`
   - Setelah Railway deploy, dapatkan URL
   - Update frontend dengan URL tersebut

---

## 💡 Tips

1. **Commit Message yang Jelas**
   ```bash
   git commit -m "Add authentication feature"
   git commit -m "Fix bug in quiz creation"
   ```

2. **Push Secara Berkala**
   - Jangan tunggu sampai selesai semua
   - Push setiap kali ada perubahan penting

3. **Branch untuk Development**
   ```bash
   # Buat branch baru
   git checkout -b development
   
   # Work di branch ini
   # Setelah selesai, merge ke main
   git checkout main
   git merge development
   ```

---

**Setelah code sudah di GitHub, lanjut deploy ke Railway! 🚀**

