# Setup PostgreSQL Lokal di Windows

## Langkah 1: Download PostgreSQL

1. Kunjungi: https://www.postgresql.org/download/windows/
2. Klik "Download the installer"
3. Pilih versi terbaru (PostgreSQL 16)
4. Download installer untuk Windows x86-64

## Langkah 2: Install PostgreSQL

1. **Jalankan installer** yang sudah didownload
2. **Ikuti wizard instalasi:**
   - Klik "Next" di welcome screen
   - Pilih lokasi instalasi (biarkan default: `C:\Program Files\PostgreSQL\16`)
   - Pilih komponen yang diinstall (biarkan semua tercentang)
   - Pilih lokasi data (biarkan default: `C:\Program Files\PostgreSQL\16\data`)
   - **PENTING**: Masukkan password untuk user `postgres`
     - Buat password yang kuat (minimal 8 karakter)
     - **CATAT PASSWORD INI** - akan digunakan untuk koneksi database
   - Port: biarkan default `5432`
   - Advanced Options: biarkan default (locale: Default locale)
   - Pre Installation Summary: klik "Next"
   - Ready to Install: klik "Next"
   - Tunggu sampai instalasi selesai

3. **Selesai instalasi:**
   - Jangan centang "Launch Stack Builder" (tidak perlu)
   - Klik "Finish"

## Langkah 3: Verifikasi Instalasi

1. **Buka Command Prompt atau PowerShell**
2. **Test apakah PostgreSQL sudah terinstall:**
   ```bash
   psql --version
   ```
   Jika muncul versi (contoh: `psql (PostgreSQL) 16.x`), berarti sudah terinstall!

3. **Jika error "psql is not recognized":**
   - PostgreSQL belum ditambahkan ke PATH
   - Gunakan full path: `"C:\Program Files\PostgreSQL\16\bin\psql.exe" --version`
   - Atau restart Command Prompt/PowerShell

## Langkah 4: Buat Database

### Cara 1: Menggunakan Command Prompt/PowerShell

```bash
# Masuk ke PostgreSQL (ganti password dengan password yang dibuat saat install)
psql -U postgres

# Atau jika psql tidak dikenali, gunakan full path:
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
```

Masukkan password yang dibuat saat instalasi.

Setelah masuk ke psql, jalankan:

```sql
-- Buat database baru
CREATE DATABASE quiz_app;

-- Verifikasi database sudah dibuat
\l

-- Keluar dari psql
\q
```

### Cara 2: Menggunakan pgAdmin (GUI)

1. **Buka pgAdmin** (ada di Start Menu setelah install PostgreSQL)
2. **Masukkan password** untuk user postgres (password yang dibuat saat install)
3. **Expand "Servers" > "PostgreSQL 16" > "Databases"**
4. **Klik kanan "Databases" > "Create" > "Database..."**
5. **Isi:**
   - Database: `quiz_app`
   - Owner: `postgres`
6. **Klik "Save"**

## Langkah 5: Update File .env

Buka file `backend/.env` dan isi dengan:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quiz_app
DB_USER=postgres
DB_PASSWORD=[MASUKKAN_PASSWORD_YANG_DIBUAT_SAAT_INSTALL]
JWT_SECRET=ubah_dengan_string_random_yang_kuat_minimal_32_karakter_123456789
PORT=3000
NODE_ENV=development
```

**PENTING:**
- Ganti `[MASUKKAN_PASSWORD_YANG_DIBUAT_SAAT_INSTALL]` dengan password yang dibuat saat install PostgreSQL
- Ganti `JWT_SECRET` dengan string random yang kuat (minimal 32 karakter)

## Langkah 6: Buat Tabel Database

Setelah `.env` diisi dengan benar, jalankan:

```bash
cd backend
node config/createTables.js
```

Jika berhasil, akan muncul:
```
✅ Database connected successfully
✅ Tables created successfully
✅ Database setup completed
```

## Langkah 7: Test Koneksi

```bash
node test-connection.js
```

Jika berhasil, akan muncul:
```
✅ Database connected successfully!
Current time: [timestamp]
```

## Troubleshooting

### Error: "password authentication failed"
- Pastikan password di `.env` sesuai dengan password PostgreSQL
- Coba reset password di pgAdmin atau via command line

### Error: "psql is not recognized"
- PostgreSQL belum di PATH
- Gunakan full path: `"C:\Program Files\PostgreSQL\16\bin\psql.exe"`
- Atau tambahkan ke PATH:
  1. Buka System Properties > Environment Variables
  2. Edit PATH
  3. Tambahkan: `C:\Program Files\PostgreSQL\16\bin`

### Error: "connection refused" atau "could not connect"
- Pastikan PostgreSQL service berjalan:
  - Buka Services (Win+R, ketik `services.msc`)
  - Cari "postgresql-x64-16" atau "PostgreSQL"
  - Pastikan status "Running"
  - Jika tidak running, klik kanan > Start

### Error: "database does not exist"
- Pastikan database `quiz_app` sudah dibuat (lihat Langkah 4)

### Port 5432 sudah digunakan
- Cek aplikasi lain yang menggunakan port 5432
- Atau ubah port di `.env` dan konfigurasi PostgreSQL

## Next Steps

Setelah database setup selesai:
1. ✅ Database `quiz_app` sudah dibuat
2. ✅ Tabel-tabel sudah dibuat
3. ✅ Koneksi sudah terverifikasi
4. 🚀 Siap untuk menjalankan server backend!

Jalankan server:
```bash
cd backend
npm run dev
```

