import AsyncStorage from '@react-native-async-storage/async-storage';

const QUIZ_STORAGE_KEY = '@quizzes';
const QUIZ_CODE_INDEX_KEY = '@quiz_codes';
const QUIZ_RESULTS_KEY = '@quiz_results';

// Simpan kuis baru
export const saveQuiz = async (quiz) => {
    try {
        const quizzes = await getAllQuizzes();
        const updatedQuizzes = [...quizzes, quiz];
        await AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(updatedQuizzes));

        // Simpan mapping kode ke quiz ID
        const codeIndex = await getCodeIndex();
        codeIndex[quiz.code] = quiz.id;
        await AsyncStorage.setItem(QUIZ_CODE_INDEX_KEY, JSON.stringify(codeIndex));

        return true;
    } catch (error) {
        console.error('Error saving quiz:', error);
        return false;
    }
};

// Ambil semua kuis
export const getAllQuizzes = async () => {
    try {
        const data = await AsyncStorage.getItem(QUIZ_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting quizzes:', error);
        return [];
    }
};

// Ambil kuis berdasarkan ID
export const getQuizById = async (id) => {
    try {
        const quizzes = await getAllQuizzes();
        return quizzes.find(q => q.id === id) || null;
    } catch (error) {
        console.error('Error getting quiz by ID:', error);
        return null;
    }
};

// Ambil kuis berdasarkan kode
export const getQuizByCode = async (code) => {
    try {
        const codeIndex = await getCodeIndex();
        const quizId = codeIndex[code];
        if (!quizId) return null;
        return await getQuizById(quizId);
    } catch (error) {
        console.error('Error getting quiz by code:', error);
        return null;
    }
};

// Hapus kuis
export const deleteQuiz = async (id) => {
    try {
        const quizzes = await getAllQuizzes();
        const filtered = quizzes.filter(q => q.id !== id);
        await AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(filtered));

        // Hapus dari code index
        const codeIndex = await getCodeIndex();
        const quiz = quizzes.find(q => q.id === id);
        if (quiz && codeIndex[quiz.code]) {
            delete codeIndex[quiz.code];
            await AsyncStorage.setItem(QUIZ_CODE_INDEX_KEY, JSON.stringify(codeIndex));
        }

        return true;
    } catch (error) {
        console.error('Error deleting quiz:', error);
        return false;
    }
};

// Ambil code index
const getCodeIndex = async () => {
    try {
        const data = await AsyncStorage.getItem(QUIZ_CODE_INDEX_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        return {};
    }
};

// Simpan hasil quiz
export const saveQuizResult = async (result) => {
    try {
        const results = await getAllQuizResults();
        const newResult = {
            ...result,
            id: Date.now(),
            submittedAt: new Date().toISOString(),
        };
        const updatedResults = [...results, newResult];
        await AsyncStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(updatedResults));
        return true;
    } catch (error) {
        console.error('Error saving quiz result:', error);
        return false;
    }
};

// Ambil semua hasil quiz
export const getAllQuizResults = async () => {
    try {
        const data = await AsyncStorage.getItem(QUIZ_RESULTS_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error getting quiz results:', error);
        return [];
    }
};

// Ambil hasil quiz berdasarkan quiz ID
export const getQuizResultsByQuizId = async (quizId) => {
    try {
        const results = await getAllQuizResults();
        return results.filter(r => r.quizId === quizId);
    } catch (error) {
        console.error('Error getting quiz results by quiz ID:', error);
        return [];
    }
};

