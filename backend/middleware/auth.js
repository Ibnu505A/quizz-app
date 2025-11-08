const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Middleware untuk verifikasi JWT token
const authenticateToken = async (req, res, next) => {
    try {
        // Ambil token dari header Authorization
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token tidak ditemukan. Silakan login terlebih dahulu.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ambil data user dari database
        const result = await pool.query(
            'SELECT id, email, name FROM users WHERE id = $1',
            [decoded.userId]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'User tidak ditemukan.'
            });
        }

        // Simpan user data ke request untuk digunakan di route handler
        req.user = result.rows[0];
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token tidak valid.'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token sudah kadaluarsa. Silakan login kembali.'
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Error saat verifikasi token.'
        });
    }
};

module.exports = { authenticateToken };

