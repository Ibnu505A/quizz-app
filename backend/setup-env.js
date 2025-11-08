// Script helper untuk setup .env file
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const templatePath = path.join(__dirname, 'env.template');

console.log('📝 Setting up .env file...\n');

// Cek apakah .env sudah ada
if (fs.existsSync(envPath)) {
    console.log('⚠️  File .env sudah ada!');
    console.log('Jika ingin membuat ulang, hapus file .env terlebih dahulu.\n');
    process.exit(0);
}

// Baca template
if (!fs.existsSync(templatePath)) {
    console.error('❌ File env.template tidak ditemukan!');
    process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

// Buat .env dari template
fs.writeFileSync(envPath, template);

console.log('✅ File .env berhasil dibuat!\n');
console.log('📋 Langkah selanjutnya:');
console.log('1. Buka file backend/.env');
console.log('2. Isi dengan konfigurasi database Anda:');
console.log('   - DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD');
console.log('   - JWT_SECRET (ubah dengan string random yang kuat)');
console.log('\n💡 Tips:');
console.log('- Untuk Supabase: gunakan connection string dari dashboard');
console.log('- Untuk lokal: gunakan localhost dengan password PostgreSQL Anda');
console.log('\nSetelah .env diisi, jalankan: node config/createTables.js');

