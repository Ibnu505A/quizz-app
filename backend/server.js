const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const pool = require('./config/database');
const createTables = require('./config/createTables');

// Import routes
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');
const resultRoutes = require('./routes/results');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT || 3000;

// Middleware
// CORS: Allow all origins untuk development, bisa di-restrict untuk production
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/results', resultRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running!',
        timestamp: new Date().toISOString()
    });
});

// Socket.io untuk real-time updates
io.on('connection', (socket) => {
    console.log('✅ Client connected:', socket.id);

    // Join room berdasarkan quizId untuk real-time updates
    socket.on('join-quiz', (quizId) => {
        socket.join(`quiz-${quizId}`);
        console.log(`Client ${socket.id} joined quiz-${quizId}`);
    });

    // Leave room
    socket.on('leave-quiz', (quizId) => {
        socket.leave(`quiz-${quizId}`);
        console.log(`Client ${socket.id} left quiz-${quizId}`);
    });

    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
    });
});

// Helper function untuk emit real-time update
const emitQuizResult = (quizId, result) => {
    io.to(`quiz-${quizId}`).emit('new-result', result);
};

// Export untuk digunakan di routes
app.locals.io = io;
app.locals.emitQuizResult = emitQuizResult;

// Initialize database tables
createTables()
    .then(() => {
        // Start server
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📡 API available at http://localhost:${PORT}/api`);
            console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
            console.log(`🌐 Network access: http://192.168.2.2:${PORT}/api`);
        });
    })
    .catch((error) => {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    });

module.exports = { app, server, io };

