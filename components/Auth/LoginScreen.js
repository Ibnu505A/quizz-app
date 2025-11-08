import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { loginGuru, registerGuru } from '../../services/api';
import { saveAuthData } from '../../services/authStorage';

export default function LoginScreen({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Email dan password harus diisi');
            return;
        }

        if (!isLogin && !name.trim()) {
            Alert.alert('Error', 'Nama harus diisi');
            return;
        }

        setLoading(true);
        try {
            let response;
            if (isLogin) {
                response = await loginGuru(email.trim(), password);
            } else {
                response = await registerGuru(email.trim(), password, name.trim());
            }

            if (response.success) {
                // Simpan auth data
                await saveAuthData(response.data.token, response.data.user);

                Alert.alert(
                    'Berhasil',
                    isLogin ? 'Login berhasil!' : 'Registrasi berhasil!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                onLoginSuccess(response.data.user);
                            },
                        },
                    ]
                );
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.logoWrapper}>
                            <LinearGradient
                                colors={['#4A90E2', '#357ABD']}
                                style={styles.logoCircle}
                            >
                                <Text style={styles.logoText}>Q</Text>
                            </LinearGradient>
                        </View>
                        <Text style={styles.title}>
                            {isLogin ? 'Login Guru' : 'Daftar Guru'}
                        </Text>
                        <Text style={styles.subtitle}>
                            {isLogin
                                ? 'Masuk untuk membuat dan mengelola kuis'
                                : 'Buat akun baru untuk mulai membuat kuis'}
                        </Text>
                    </View>

                    <View style={styles.form}>
                        {!isLogin && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Nama Lengkap</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Masukkan nama lengkap"
                                    placeholderTextColor="#BDC3C7"
                                    value={name}
                                    onChangeText={setName}
                                    editable={!loading}
                                />
                            </View>
                        )}

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="contoh@email.com"
                                placeholderTextColor="#BDC3C7"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                editable={!loading}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan password"
                                placeholderTextColor="#BDC3C7"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                editable={!loading}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={handleSubmit}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={
                                    loading
                                        ? ['#BDC3C7', '#95A5A6']
                                        : ['#4A90E2', '#357ABD']
                                }
                                style={styles.submitButtonGradient}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitButtonText}>
                                        {isLogin ? 'Login' : 'Daftar'}
                                    </Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.switchButton}
                            onPress={() => setIsLogin(!isLogin)}
                            disabled={loading}
                        >
                            <Text style={styles.switchButtonText}>
                                {isLogin
                                    ? 'Belum punya akun? Daftar di sini'
                                    : 'Sudah punya akun? Login di sini'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoWrapper: {
        marginBottom: 20,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    logoText: {
        fontSize: 40,
        fontWeight: '800',
        color: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
        lineHeight: 20,
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1.5,
        borderColor: '#E1E8ED',
        borderRadius: 10,
        padding: 14,
        fontSize: 15,
        color: '#2C3E50',
    },
    submitButton: {
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 8,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    submitButtonGradient: {
        padding: 16,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    switchButton: {
        padding: 12,
        alignItems: 'center',
    },
    switchButtonText: {
        fontSize: 14,
        color: '#4A90E2',
        fontWeight: '600',
    },
});

