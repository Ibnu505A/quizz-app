# Aplikasi Kuis React Native Expo

Aplikasi kuis lengkap dengan fitur Creator dan Taker mode. Guru dapat membuat kuis dengan berbagai jenis pertanyaan, dan siswa dapat mengisi kuis menggunakan kode unik.

## Fitur Utama

### 🎯 Creator Mode (Pembuat Kuis)
- **Buat Kuis Baru**: Buat kuis dengan judul, deskripsi, dan waktu pengerjaan
- **3 Jenis Pertanyaan**:
  - 🔘 **Pilihan Ganda** (Multiple Choice) - 4 opsi dengan 1 jawaban benar
  - ✍️ **Isian Singkat** (Short Answer) - Jawaban teks bebas
  - ✓✗ **Benar/Salah** (True/False) - Pilihan benar atau salah
- **Pengaturan Skor**: Setiap pertanyaan dapat memiliki skor berbeda
- **Kode Unik**: Setiap kuis mendapat kode 6 karakter untuk dibagikan
- **Daftar Kuis**: Lihat semua kuis yang telah dibuat
- **Hapus Kuis**: Hapus kuis yang tidak diperlukan lagi

### ✏️ Taker Mode (Pengisi Kuis)
- **Masukkan Kode**: Input kode 6 karakter untuk mengakses kuis
- **Timer**: Countdown timer jika kuis memiliki batas waktu
- **Progress Bar**: Indikator progress pengerjaan kuis
- **Navigasi**: Tombol sebelumnya/selanjutnya untuk navigasi pertanyaan
- **Review Hasil**: Lihat skor, persentase, dan review semua jawaban setelah selesai

### 💾 Penyimpanan Data
- Data kuis disimpan lokal menggunakan AsyncStorage
- Kuis tersimpan secara permanen di perangkat
- Index kode untuk pencarian cepat

## Instalasi

1. Pastikan Anda sudah menginstal Node.js dan npm
2. Install dependencies:
```bash
npm install
```

## Menjalankan Aplikasi

### Development Server
```bash
npm start
```
Kemudian scan QR code dengan Expo Go app di smartphone Anda.

### Platform Spesifik
```bash
# Android
npm run android

# iOS (hanya di macOS)
npm run ios

# Web
npm run web
```

## Struktur Proyek

```
kuis/
├── App.js                          # Komponen utama dengan navigasi
├── components/
│   ├── MainHomeScreen.js           # Layar utama dengan pilihan mode
│   ├── Creator/
│   │   ├── QuizListScreen.js      # Daftar kuis yang dibuat
│   │   ├── CreateQuizScreen.js    # Form pembuatan kuis
│   │   ├── AddQuestionScreen.js   # Form tambah pertanyaan
│   │   └── QuizCreatedScreen.js   # Tampilan setelah kuis dibuat
│   └── Taker/
│       ├── EnterCodeScreen.js     # Input kode kuis
│       ├── TakeQuizScreen.js      # Tampilan kuis untuk diisi
│       └── QuizResultScreen.js    # Hasil dan review jawaban
├── services/
│   └── quizStorage.js              # Service untuk penyimpanan data
├── utils/
│   └── quizCodeGenerator.js        # Generator kode unik
└── package.json
```

## Cara Menggunakan

### Untuk Guru (Creator)

1. **Buat Kuis Baru**:
   - Pilih "Buat Kuis" di home screen
   - Isi judul, deskripsi (opsional), dan waktu pengerjaan (opsional)
   - Klik tombol untuk menambah pertanyaan (Pilihan Ganda, Isian Singkat, atau Benar/Salah)
   - Isi pertanyaan, opsi jawaban, dan tentukan jawaban yang benar
   - Set skor untuk setiap pertanyaan
   - Simpan kuis

2. **Bagikan Kode**:
   - Setelah kuis dibuat, Anda akan mendapat kode unik 6 karakter
   - Bagikan kode ini kepada siswa
   - Gunakan tombol "Bagikan Kode" untuk membagikan via aplikasi

3. **Kelola Kuis**:
   - Lihat semua kuis di "Kuis Saya"
   - Hapus kuis yang tidak diperlukan

### Untuk Siswa (Taker)

1. **Akses Kuis**:
   - Pilih "Isi Kuis" di home screen
   - Masukkan kode 6 karakter yang diberikan guru
   - Klik "Mulai Kuis"

2. **Mengerjakan Kuis**:
   - Baca pertanyaan dengan teliti
   - Pilih atau tulis jawaban
   - Gunakan tombol navigasi untuk berpindah pertanyaan
   - Perhatikan timer jika ada batas waktu

3. **Lihat Hasil**:
   - Setelah selesai, lihat skor dan persentase
   - Review semua jawaban (benar/salah)
   - Lihat jawaban yang benar untuk pertanyaan yang salah

## Teknologi yang Digunakan

- **React Native** - Framework untuk aplikasi mobile
- **Expo** - Platform untuk development React Native
- **AsyncStorage** - Penyimpanan data lokal
- **React Hooks** - State management

## Fitur Teknis

- ✅ Validasi form lengkap
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive UI
- ✅ Case-insensitive matching untuk jawaban isian singkat
- ✅ Timer countdown dengan auto-submit
- ✅ Progress tracking
- ✅ Review jawaban dengan indikator benar/salah

## Catatan

- Data kuis disimpan lokal di perangkat
- Kode kuis bersifat case-insensitive (ABCD12 = abcd12)
- Jawaban isian singkat dibandingkan secara case-insensitive
- Timer otomatis submit ketika waktu habis

## Lisensi

MIT
