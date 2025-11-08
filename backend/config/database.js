const { Pool } = require('pg');
require('dotenv').config();

// Konfigurasi koneksi database PostgreSQL
// Railway menggunakan DATABASE_URL atau individual variables
let poolConfig;

// Jika ada DATABASE_URL (Railway biasanya provide ini)
if (process.env.DATABASE_URL) {
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };
} else {
    // Fallback ke individual variables
    poolConfig = {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || 'quiz_app',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        // Untuk Railway internal connection
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };
}

const pool = new Pool(poolConfig);

// Test koneksi database
pool.on('connect', () => {
    console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
    console.error('❌ Database connection error:', err);
});

module.exports = pool;

