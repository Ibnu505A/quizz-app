// Script helper untuk quick setup PostgreSQL
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🚀 PostgreSQL Quick Setup\n');
console.log('Panduan setup PostgreSQL lokal:\n');
console.log('1. Download PostgreSQL: https://www.postgresql.org/download/windows/');
console.log('2. Install dengan default settings');
console.log('3. Catat password untuk user "postgres"\n');

rl.question('Sudah install PostgreSQL? (y/n): ', (answer) => {
    if (answer.toLowerCase() !== 'y') {
        console.log('\n📝 Silakan install PostgreSQL terlebih dahulu.');
        console.log('Lihat panduan di: SETUP_POSTGRESQL_WINDOWS.md\n');
        rl.close();
        return;
    }

    rl.question('Masukkan password PostgreSQL: ', (password) => {
        if (!password) {
            console.log('\n❌ Password tidak boleh kosong!');
            rl.close();
            return;
        }

        // Update .env file
        const envPath = path.join(__dirname, '.env');
        let envContent = `DB_HOST=localhost
DB_PORT=5432
DB_NAME=quiz_app
DB_USER=postgres
DB_PASSWORD=${password}
JWT_SECRET=${generateRandomString(32)}
PORT=3000
NODE_ENV=development
`;

        fs.writeFileSync(envPath, envContent);
        console.log('\n✅ File .env sudah diupdate!\n');

        console.log('📋 Langkah selanjutnya:');
        console.log('1. Buat database: psql -U postgres');
        console.log('   Lalu jalankan: CREATE DATABASE quiz_app;');
        console.log('2. Buat tabel: node config/createTables.js');
        console.log('3. Test koneksi: node test-connection.js\n');

        rl.close();
    });
});

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

