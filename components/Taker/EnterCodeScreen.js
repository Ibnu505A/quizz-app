import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getQuizByCode } from '../../services/api';

export default function EnterCodeScreen({ onQuizFound, onBack }) {
    const [code, setCode] = useState('');
    const [studentName, setStudentName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const showError = (message) => {
        setErrorMessage(message);
        setErrorModalVisible(true);
    };

    const handleSubmit = async () => {
        const trimmedCode = code.trim().toUpperCase();
        const trimmedName = studentName.trim();

        if (!trimmedName) {
            showError('Masukkan nama Anda terlebih dahulu');
            return;
        }

        if (!trimmedCode) {
            showError('Masukkan kode kuis');
            return;
        }

        if (trimmedCode.length !== 6) {
            showError('Kode kuis harus 6 karakter');
            return;
        }

        setLoading(true);
        try {
            const quiz = await getQuizByCode(trimmedCode);
            if (quiz) {
                onQuizFound(quiz, trimmedName);
            } else {
                showError('Kuis tidak ditemukan. Pastikan kode yang Anda masukkan benar.');
            }
        } catch (error) {
            showError(error.message || 'Kuis tidak ditemukan. Pastikan kode yang Anda masukkan benar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {onBack && (
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <View style={styles.backButtonContainer}>
                        <Text style={styles.backButtonText}>←</Text>
                    </View>
                </TouchableOpacity>
            )}

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Masukkan Kode Kuis</Text>
                    <Text style={styles.subtitle}>
                        Masukkan kode 6 karakter yang diberikan oleh pembuat kuis
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.nameInputWrapper}>
                        <Text style={styles.inputLabel}>Nama Anda</Text>
                        <TextInput
                            style={styles.nameInput}
                            placeholder="Masukkan nama lengkap"
                            placeholderTextColor="#BDC3C7"
                            value={studentName}
                            onChangeText={setStudentName}
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.codeInputWrapper}>
                        <Text style={styles.inputLabel}>Kode Kuis</Text>
                        <TextInput
                            style={styles.codeInput}
                            placeholder="ABCD12"
                            placeholderTextColor="#BDC3C7"
                            value={code}
                            onChangeText={(text) => setCode(text.toUpperCase())}
                            maxLength={6}
                            autoCapitalize="characters"
                            autoCorrect={false}
                            editable={!loading}
                        />
                        <View style={styles.codeIndicator}>
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.codeDot,
                                        code.length > index && styles.codeDotFilled,
                                    ]}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={loading || code.length !== 6 || !studentName.trim()}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={
                            loading || code.length !== 6 || !studentName.trim()
                                ? ['#BDC3C7', '#95A5A6']
                                : ['#4A90E2', '#357ABD']
                        }
                        style={styles.submitButtonGradient}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.submitButtonText}>Mulai Kuis</Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        Kode kuis biasanya terdiri dari 6 karakter (huruf dan angka)
                    </Text>
                </View>
            </View>

            {/* Custom Error Modal */}
            <Modal
                visible={errorModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setErrorModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.errorIconContainer}>
                                <View style={styles.errorIconCircle}>
                                    <Text style={styles.errorIcon}>!</Text>
                                </View>
                            </View>
                            <Text style={styles.modalTitle}>Oops!</Text>
                            <Text style={styles.modalMessage}>{errorMessage}</Text>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setErrorModalVisible(false)}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#4A90E2', '#357ABD']}
                                    style={styles.modalButtonGradient}
                                >
                                    <Text style={styles.modalButtonText}>Mengerti</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
    },
    backButtonContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    backButtonText: {
        fontSize: 20,
        color: '#4A90E2',
        fontWeight: '600',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#7F8C8D',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 28,
    },
    nameInputWrapper: {
        marginBottom: 20,
    },
    codeInputWrapper: {
        marginBottom: 0,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 8,
    },
    nameInput: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#E1E8ED',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#2C3E50',
    },
    codeInput: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#E1E8ED',
        borderRadius: 12,
        padding: 18,
        fontSize: 32,
        fontWeight: '700',
        letterSpacing: 6,
        textAlign: 'center',
        color: '#2C3E50',
        marginBottom: 12,
    },
    codeIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    codeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#E1E8ED',
    },
    codeDotFilled: {
        backgroundColor: '#4A90E2',
    },
    submitButton: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    submitButtonGradient: {
        padding: 14,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    infoContainer: {
        backgroundColor: '#EBF5FB',
        padding: 14,
        borderRadius: 10,
        borderLeftWidth: 3,
        borderLeftColor: '#4A90E2',
    },
    infoText: {
        fontSize: 13,
        color: '#5D6D7E',
        lineHeight: 18,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 400,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 28,
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },
    errorIconContainer: {
        marginBottom: 16,
    },
    errorIconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FEF5F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#E74C3C',
    },
    errorIcon: {
        fontSize: 36,
        fontWeight: '700',
        color: '#E74C3C',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 15,
        color: '#7F8C8D',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    modalButton: {
        borderRadius: 12,
        overflow: 'hidden',
        width: '100%',
        elevation: 3,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    modalButtonGradient: {
        padding: 14,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
