# Setup Database PostgreSQL

## Opsi 1: Menggunakan Supabase (RECOMMENDED - Paling Mudah)

### Langkah-langkah:

1. **Buat Akun Supabase**
   - Kunjungi: https://supabase.com
   - Klik "Start your project"
   - Sign up dengan GitHub atau Email

2. **Buat Project Baru**
   - Klik "New Project"
   - Isi:
     - Project Name: `quiz-app`
     - Database Password: (buat password yang kuat, simpan baik-baik!)
     - Region: pilih yang terdekat (Singapore)
   - Klik "Create new project"
   - Tunggu beberapa menit sampai project siap

3. **Dapatkan Connection String**
   - Setelah project siap, klik "Settings" (icon gear) di sidebar kiri
   - Pilih "Database"
   - Scroll ke bagian "Connection string"
   - Pilih tab "URI"
   - Copy connection string, contoh:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
     ```

4. **Update file .env**
   - Buka file `backend/.env` (atau buat baru jika belum ada)
   - Parse connection string ke format berikut:
     ```
     DB_HOST=db.xxxxx.supabase.co
     DB_PORT=5432
     DB_NAME=postgres
     DB_USER=postgres
     DB_PASSWORD=[YOUR-PASSWORD]
     JWT_SECRET=your_super_secret_jwt_key_change_this
     PORT=3000
     NODE_ENV=development
     ```

5. **Buat Tabel**
   ```bash
   cd backend
   node config/createTables.js
   ```

---

## Opsi 2: Install PostgreSQL Lokal (Windows)

### Langkah-langkah:

1. **Download PostgreSQL**
   - Kunjungi: https://www.postgresql.org/download/windows/
   - Download installer dari "Download the installer"
   - Pilih versi terbaru (PostgreSQL 16)

2. **Install PostgreSQL**
   - Jalankan installer
   - Ikuti wizard instalasi
   - **PENTING**: Catat password untuk user `postgres` (akan digunakan nanti)
   - Port default: 5432 (biarkan default)
   - Lokasi data: biarkan default

3. **Buat Database**
   - Buka "pgAdmin" (GUI tool yang terinstall bersama PostgreSQL)
   - Atau gunakan Command Prompt:
     ```bash
     # Masuk ke PostgreSQL
     psql -U postgres
     
     # Masukkan password yang dibuat saat instalasi
     
     # Buat database
     CREATE DATABASE quiz_app;
     
     # Keluar
     \q
     ```

4. **Update file .env**
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=quiz_app
   DB_USER=postgres
   DB_PASSWORD=[password_yang_dibuat_saat_install]
   JWT_SECRET=your_super_secret_jwt_key_change_this
   PORT=3000
   NODE_ENV=development
   ```

5. **Buat Tabel**
   ```bash
   cd backend
   node config/createTables.js
   ```

---

## Opsi 3: Menggunakan Docker

Jika Anda sudah install Docker Desktop:

```bash
# Jalankan PostgreSQL container
docker run --name quiz-postgres \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=quiz_app \
  -p 5432:5432 \
  -d postgres:16

# Update file .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quiz_app
DB_USER=postgres
DB_PASSWORD=password123
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=3000
NODE_ENV=development

# Buat tabel
cd backend
node config/createTables.js
```

---

## Verifikasi Setup

Setelah setup selesai, test koneksi:

```bash
cd backend
node -e "const pool = require('./config/database'); pool.query('SELECT NOW()', (err, res) => { if(err) console.error('Error:', err.message); else console.log('✅ Database connected!', res.rows[0]); process.exit(); });"
```

Jika berhasil, akan muncul: `✅ Database connected!`

---

## Troubleshooting

### Error: "password authentication failed"
- Pastikan password di `.env` sesuai dengan password database
- Untuk Supabase: gunakan password yang dibuat saat membuat project

### Error: "connection refused"
- Pastikan PostgreSQL service berjalan
- Cek port 5432 tidak digunakan aplikasi lain
- Untuk Supabase: pastikan connection string benar

### Error: "database does not exist"
- Buat database terlebih dahulu (lihat langkah di atas)
- Untuk Supabase: gunakan database `postgres` (default)

