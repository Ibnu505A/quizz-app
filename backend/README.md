# Quiz App Backend API

Backend API untuk aplikasi Quiz App menggunakan Node.js, Express, dan PostgreSQL.

## 📋 Prerequisites

- Node.js (v16 atau lebih baru)
- PostgreSQL (v12 atau lebih baru)
- npm atau yarn

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database PostgreSQL

1. Install PostgreSQL jika belum ada
2. Buat database baru:
```sql
CREATE DATABASE quiz_app;
```

### 3. Konfigurasi Environment

Copy file `.env.example` menjadi `.env` dan isi dengan konfigurasi Anda:

```bash
cp .env.example .env
```

Edit file `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quiz_app
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=3000
```

### 4. Buat Tabel Database

```bash
node config/createTables.js
```

### 5. Jalankan Server

**Development mode (dengan auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register guru baru
- `POST /api/auth/login` - Login guru
- `GET /api/auth/me` - Get current user (perlu token)

### Quizzes

- `GET /api/quizzes` - Get semua kuis milik guru (perlu token)
- `POST /api/quizzes` - Buat kuis baru (perlu token)
- `GET /api/quizzes/code/:code` - Get kuis by code (untuk siswa, tidak perlu token)
- `DELETE /api/quizzes/:id` - Hapus kuis (perlu token)

### Results

- `POST /api/results` - Submit hasil kuis (untuk siswa, tidak perlu token)
- `GET /api/results/quiz/:quizId` - Get semua hasil kuis (perlu token)

## 🔐 Authentication

Gunakan JWT token di header Authorization:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## 📝 Contoh Request

### Register
```json
POST /api/auth/register
{
  "email": "guru@example.com",
  "password": "password123",
  "name": "Guru Budi"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "guru@example.com",
  "password": "password123"
}
```

### Create Quiz
```json
POST /api/quizzes
Authorization: Bearer YOUR_TOKEN
{
  "title": "Kuis Matematika",
  "description": "Kuis tentang aljabar",
  "timeLimit": 30,
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "Berapa hasil 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correctAnswer": 1,
      "score": 10
    }
  ]
}
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Real-time**: Socket.io
- **CORS**: cors

## 📦 Dependencies

- express - Web framework
- pg - PostgreSQL client
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - CORS middleware
- dotenv - Environment variables
- socket.io - Real-time communication
- uuid - UUID generation

## 🔄 Next Steps

1. Setup React Native app untuk connect ke API ini
2. Implement real-time updates dengan Socket.io
3. Deploy ke production (Railway, Render, atau VPS)

