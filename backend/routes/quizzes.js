const express = require('express');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Generate random 6 character code
const generateQuizCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

// Get semua kuis milik guru yang login
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, code, title, description, time_limit, questions, created_at 
             FROM quizzes 
             WHERE created_by = $1 
             ORDER BY created_at DESC`,
            [req.user.id]
        );

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Get quizzes error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil data kuis.'
        });
    }
});

// Buat kuis baru
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, description, timeLimit, questions } = req.body;

        // Validasi
        if (!title || !questions || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Judul dan pertanyaan harus diisi.'
            });
        }

        // Generate unique code
        let code;
        let isUnique = false;
        while (!isUnique) {
            code = generateQuizCode();
            const check = await pool.query(
                'SELECT id FROM quizzes WHERE code = $1',
                [code]
            );
            if (check.rows.length === 0) {
                isUnique = true;
            }
        }

        // Insert kuis
        const result = await pool.query(
            `INSERT INTO quizzes (code, title, description, time_limit, questions, created_by) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING id, code, title, description, time_limit, questions, created_at`,
            [code, title, description || null, timeLimit || 0, JSON.stringify(questions), req.user.id]
        );

        res.status(201).json({
            success: true,
            message: 'Kuis berhasil dibuat!',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Create quiz error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat membuat kuis.'
        });
    }
});

// Get kuis by code (untuk siswa, tidak perlu login)
router.get('/code/:code', async (req, res) => {
    try {
        const { code } = req.params;

        const result = await pool.query(
            `SELECT id, code, title, description, time_limit, questions, created_at 
             FROM quizzes 
             WHERE code = $1`,
            [code.toUpperCase()]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Kuis tidak ditemukan.'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Get quiz by code error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil data kuis.'
        });
    }
});

// Hapus kuis
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Cek apakah kuis milik user yang login
        const check = await pool.query(
            'SELECT id FROM quizzes WHERE id = $1 AND created_by = $2',
            [id, req.user.id]
        );

        if (check.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Kuis tidak ditemukan atau Anda tidak memiliki akses.'
            });
        }

        // Hapus kuis (results akan terhapus otomatis karena CASCADE)
        await pool.query('DELETE FROM quizzes WHERE id = $1', [id]);

        res.json({
            success: true,
            message: 'Kuis berhasil dihapus.'
        });
    } catch (error) {
        console.error('Delete quiz error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat menghapus kuis.'
        });
    }
});

module.exports = router;

