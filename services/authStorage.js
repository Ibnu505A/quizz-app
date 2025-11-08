import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStoredToken, getStoredToken, clearStoredToken } from './api';

const AUTH_TOKEN_KEY = '@auth_token';
const USER_DATA_KEY = '@user_data';

/**
 * Simpan token dan user data ke storage
 */
export const saveAuthData = async (token, userData) => {
    try {
        await AsyncStorage.multiSet([
            [AUTH_TOKEN_KEY, token],
            [USER_DATA_KEY, JSON.stringify(userData)],
        ]);
        setStoredToken(token);
    } catch (error) {
        console.error('Error saving auth data:', error);
    }
};

/**
 * Ambil token dari storage
 */
export const getAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
        if (token) {
            setStoredToken(token);
        }
        return token;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

/**
 * Ambil user data dari storage
 */
export const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem(USER_DATA_KEY);
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

/**
 * Hapus semua auth data dari storage
 */
export const clearAuthData = async () => {
    try {
        await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA_KEY]);
        clearStoredToken();
    } catch (error) {
        console.error('Error clearing auth data:', error);
    }
};

/**
 * Cek apakah user sudah login
 */
export const isAuthenticated = async () => {
    const token = await getAuthToken();
    return !!token;
};

