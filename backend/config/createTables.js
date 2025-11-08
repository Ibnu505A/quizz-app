const pool = require('./database');

// Script untuk membuat tabel-tabel di database
const createTables = async () => {
    try {
        // Tabel Users (Guru)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabel Quizzes
        await pool.query(`
            CREATE TABLE IF NOT EXISTS quizzes (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                code VARCHAR(6) UNIQUE NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                time_limit INTEGER DEFAULT 0,
                questions JSONB NOT NULL,
                created_by UUID REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabel Results (Hasil Kuis)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS results (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
                student_name VARCHAR(255) NOT NULL,
                score INTEGER NOT NULL,
                max_score INTEGER NOT NULL,
                answers JSONB NOT NULL,
                time_used INTEGER,
                submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Index untuk performa query
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_quizzes_code ON quizzes(code);
            CREATE INDEX IF NOT EXISTS idx_quizzes_created_by ON quizzes(created_by);
            CREATE INDEX IF NOT EXISTS idx_results_quiz_id ON results(quiz_id);
        `);

        console.log('✅ Tables created successfully');
    } catch (error) {
        console.error('❌ Error creating tables:', error);
        throw error;
    }
};

// Jalankan jika file ini dijalankan langsung
if (require.main === module) {
    createTables()
        .then(() => {
            console.log('✅ Database setup completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Database setup failed:', error);
            process.exit(1);
        });
}

module.exports = createTables;

