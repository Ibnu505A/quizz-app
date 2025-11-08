import axios from 'axios';

// Base URL untuk API backend
// Untuk development: gunakan IP address komputer Anda (bukan localhost)
// Untuk production: ganti dengan URL Railway/Heroku Anda
// 
// CATATAN PENTING:
// - Setelah deploy ke Railway, ganti 'your-production-url.com' dengan URL Railway Anda
// - Contoh: 'https://quiz-app.up.railway.app/api'
// - Pastikan menggunakan HTTPS (bukan HTTP)
// - Test backend URL dulu sebelum build APK
const API_BASE_URL = __DEV__
    ? 'http://192.168.2.2:3000/api' // Development: IP address WiFi untuk device fisik
    : 'https://your-production-url.com/api'; // Production: GANTI DENGAN URL RAILWAY ANDA!

// Buat instance axios
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        // Ambil token dari AsyncStorage
        const token = getStoredToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Helper untuk mendapatkan token dari storage
let storedToken = null;
export const setStoredToken = (token) => {
    storedToken = token;
};

export const getStoredToken = () => {
    return storedToken;
};

export const clearStoredToken = () => {
    storedToken = null;
};

// ==================== AUTHENTICATION ====================

/**
 * Register guru baru
 * @param {string} email - Email guru
 * @param {string} password - Password
 * @param {string} name - Nama guru
 * @returns {Promise} Response dengan user data dan token
 */
export const registerGuru = async (email, password, name) => {
    try {
        const response = await api.post('/auth/register', {
            email,
            password,
            name,
        });

        if (response.data.success) {
            setStoredToken(response.data.data.token);
        }

        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Login guru
 * @param {string} email - Email guru
 * @param {string} password - Password
 * @returns {Promise} Response dengan user data dan token
 */
export const loginGuru = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email,
            password,
        });

        if (response.data.success) {
            setStoredToken(response.data.data.token);
        }

        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Get current user (verifikasi token masih valid)
 * @returns {Promise} Response dengan user data
 */
export const getCurrentUser = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// ==================== QUIZZES ====================

/**
 * Get semua kuis milik guru yang login
 * @returns {Promise} Array of quizzes
 */
export const getAllQuizzes = async () => {
    try {
        const response = await api.get('/quizzes');
        return response.data.data || [];
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Buat kuis baru
 * @param {Object} quizData - Data kuis (title, description, timeLimit, questions)
 * @returns {Promise} Response dengan quiz data
 */
export const createQuiz = async (quizData) => {
    try {
        const response = await api.post('/quizzes', quizData);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Get kuis berdasarkan kode (untuk siswa, tidak perlu login)
 * @param {string} code - Kode kuis (6 karakter)
 * @returns {Promise} Quiz data
 */
export const getQuizByCode = async (code) => {
    try {
        const response = await api.get(`/quizzes/code/${code}`);
        return response.data.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Hapus kuis
 * @param {string} quizId - ID kuis
 * @returns {Promise} Success response
 */
export const deleteQuiz = async (quizId) => {
    try {
        const response = await api.delete(`/quizzes/${quizId}`);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

// ==================== RESULTS ====================

/**
 * Submit hasil kuis (untuk siswa, tidak perlu login)
 * @param {Object} resultData - Data hasil (quizId, studentName, score, maxScore, answers, timeUsed)
 * @returns {Promise} Response dengan result data
 */
export const submitQuizResult = async (resultData) => {
    try {
        const response = await api.post('/results', resultData);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

/**
 * Get semua hasil kuis (untuk guru)
 * @param {string} quizId - ID kuis
 * @returns {Promise} Array of results
 */
export const getQuizResults = async (quizId) => {
    try {
        const response = await api.get(`/results/quiz/${quizId}`);
        return response.data.data || [];
    } catch (error) {
        throw handleApiError(error);
    }
};

// ==================== ERROR HANDLING ====================

/**
 * Handle API error dan return user-friendly message
 * @param {Error} error - Axios error object
 * @returns {Error} Error dengan message yang user-friendly
 */
const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error status
        const message = error.response.data?.message || 'Terjadi kesalahan pada server';
        const customError = new Error(message);
        customError.status = error.response.status;
        return customError;
    } else if (error.request) {
        // Request dibuat tapi tidak ada response
        return new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan di http://localhost:3000');
    } else {
        // Error saat setup request
        return new Error('Terjadi kesalahan: ' + error.message);
    }
};

export default api;

