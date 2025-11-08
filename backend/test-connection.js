// Script untuk test koneksi database
const pool = require('./config/database');

console.log('🔄 Testing database connection...');

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Database connection failed!');
        console.error('Error:', err.message);
        console.log('\n📝 Checklist:');
        console.log('1. Pastikan PostgreSQL sudah terinstall dan running');
        console.log('2. Pastikan file .env sudah dibuat dengan konfigurasi yang benar');
        console.log('3. Pastikan database sudah dibuat');
        console.log('4. Cek username dan password di .env');
        process.exit(1);
    } else {
        console.log('✅ Database connected successfully!');
        console.log('Current time:', res.rows[0].now);
        process.exit(0);
    }
});

