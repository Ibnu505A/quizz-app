# Cara Melihat Data User yang Terdaftar

Ada beberapa cara untuk melihat data user yang terdaftar:

## 1. Menggunakan Script (Terminal)

Jalankan script yang sudah dibuat:

```bash
cd backend
node scripts/view-users.js
```

Script ini akan menampilkan:
- Nama user
- Email
- ID user
- Tanggal registrasi
- Total jumlah user

## 2. Menggunakan API Endpoint

Endpoint: `GET /api/auth/users`

**Contoh menggunakan PowerShell:**
```powershell
# Login dulu untuk mendapatkan token
$body = @{ email = "testguru@example.com"; password = "test123" } | ConvertTo-Json
$response = Invoke-WebRequest -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
$token = ($response.Content | ConvertFrom-Json).data.token

# Get semua user
$headers = @{ Authorization = "Bearer $token" }
Invoke-WebRequest -Uri "http://localhost:3000/api/auth/users" -Method GET -Headers $headers | Select-Object -ExpandProperty Content
```

**Contoh menggunakan curl:**
```bash
# Login dulu
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testguru@example.com","password":"test123"}'

# Ambil token dari response, lalu:
curl -X GET http://localhost:3000/api/auth/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 3. Langsung Query Database PostgreSQL

```bash
# Masuk ke psql
cd backend
.\access-psql.bat

# Atau langsung:
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d quiz_app

# Query untuk melihat semua user
SELECT id, name, email, created_at FROM users ORDER BY created_at DESC;

# Query untuk melihat jumlah user
SELECT COUNT(*) as total_users FROM users;
```

## 4. Melihat Data Lengkap (termasuk kuis yang dibuat)

```sql
-- Lihat user beserta jumlah kuis yang dibuat
SELECT 
    u.id,
    u.name,
    u.email,
    u.created_at,
    COUNT(q.id) as total_quizzes
FROM users u
LEFT JOIN quizzes q ON q.created_by = u.id
GROUP BY u.id, u.name, u.email, u.created_at
ORDER BY u.created_at DESC;
```

## Catatan Penting

⚠️ **KEAMANAN:**
- Endpoint `/api/auth/users` memerlukan authentication token
- Password tidak pernah di-expose (tidak dikembalikan dalam response)
- Hanya admin atau user yang sudah login yang bisa melihat daftar user

🔒 **Untuk Production:**
- Pertimbangkan untuk menambahkan role-based access control
- Hanya admin yang bisa melihat semua user
- Atau hapus endpoint ini jika tidak diperlukan

