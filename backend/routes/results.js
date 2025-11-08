const express = require('express');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Submit hasil kuis (untuk siswa, tidak perlu login)
router.post('/', async (req, res) => {
    try {
        const { quizId, studentName, score, maxScore, answers, timeUsed } = req.body;

        // Validasi
        if (!quizId || !studentName || score === undefined || !answers) {
            return res.status(400).json({
                success: false,
                message: 'Data tidak lengkap.'
            });
        }

        // Cek apakah kuis ada
        const quizCheck = await pool.query(
            'SELECT id FROM quizzes WHERE id = $1',
            [quizId]
        );

        if (quizCheck.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Kuis tidak ditemukan.'
            });
        }

        // Insert hasil
        const result = await pool.query(
            `INSERT INTO results (quiz_id, student_name, score, max_score, answers, time_used) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING id, student_name, score, max_score, submitted_at`,
            [quizId, studentName, score, maxScore, JSON.stringify(answers), timeUsed || null]
        );

        res.status(201).json({
            success: true,
            message: 'Hasil kuis berhasil disimpan!',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Submit result error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat menyimpan hasil kuis.'
        });
    }
});

// Get semua hasil kuis (hanya untuk guru yang membuat kuis)
router.get('/quiz/:quizId', authenticateToken, async (req, res) => {
    try {
        const { quizId } = req.params;

        // Cek apakah kuis milik user yang login
        const quizCheck = await pool.query(
            'SELECT id FROM quizzes WHERE id = $1 AND created_by = $2',
            [quizId, req.user.id]
        );

        if (quizCheck.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Kuis tidak ditemukan atau Anda tidak memiliki akses.'
            });
        }

        // Get semua hasil
        const result = await pool.query(
            `SELECT id, student_name, score, max_score, answers, time_used, submitted_at 
             FROM results 
             WHERE quiz_id = $1 
             ORDER BY score DESC, time_used ASC NULLS LAST`,
            [quizId]
        );

        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Get results error:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengambil data hasil kuis.'
        });
    }
});

module.exports = router;

