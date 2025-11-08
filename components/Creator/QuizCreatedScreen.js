import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function QuizCreatedScreen({ quiz, onBack }) {
    const handleShare = async () => {
        try {
            await Share.share({
                message: `Kuis: ${quiz.title}\nKode: ${quiz.code}\nGunakan kode ini untuk mengakses kuis!`,
                title: quiz.title,
            });
        } catch (error) {
            Alert.alert('Error', 'Gagal membagikan kuis');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.successContainer}>
                    <View style={styles.checkmarkContainer}>
                        <Text style={styles.checkmark}>✓</Text>
                    </View>
                    <Text style={styles.title}>Kuis Berhasil Dibuat!</Text>
                </View>

                <View style={styles.quizCard}>
                    <Text style={styles.quizTitle}>{quiz.title}</Text>
                    {quiz.description && (
                        <Text style={styles.quizDescription}>{quiz.description}</Text>
                    )}
                </View>

                <View style={styles.codeSection}>
                    <Text style={styles.codeLabel}>Kode Kuis</Text>
                    <View style={styles.codeContainer}>
                        <Text style={styles.codeText}>{quiz.code}</Text>
                    </View>
                    <Text style={styles.codeHint}>
                        Bagikan kode ini kepada siswa untuk mengisi kuis
                    </Text>
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBadge}>
                        <Text style={styles.infoText}>
                            {quiz.questions?.length || 0} Pertanyaan
                        </Text>
                    </View>
                    {quiz.timeLimit > 0 && (
                        <View style={styles.infoBadge}>
                            <Text style={styles.infoText}>{quiz.timeLimit} menit</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.shareButton}
                    onPress={handleShare}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#4A90E2', '#357ABD']}
                        style={styles.shareButtonGradient}
                    >
                        <Text style={styles.shareButtonText}>Bagikan Kode</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                    activeOpacity={0.8}
                >
                    <Text style={styles.backButtonText}>Kembali ke Daftar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
    },
    successContainer: {
        alignItems: 'center',
        marginBottom: 28,
    },
    checkmarkContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    checkmark: {
        fontSize: 36,
        color: '#fff',
        fontWeight: '700',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2C3E50',
        textAlign: 'center',
    },
    quizCard: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 12,
        marginBottom: 20,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    quizTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 6,
    },
    quizDescription: {
        fontSize: 14,
        color: '#7F8C8D',
        lineHeight: 20,
    },
    codeSection: {
        marginBottom: 20,
    },
    codeLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 10,
        textAlign: 'center',
    },
    codeContainer: {
        backgroundColor: '#4A90E2',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    codeText: {
        fontSize: 36,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 3,
    },
    codeHint: {
        fontSize: 13,
        color: '#7F8C8D',
        textAlign: 'center',
        lineHeight: 18,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
    infoBadge: {
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    infoText: {
        fontSize: 13,
        color: '#5D6D7E',
        fontWeight: '600',
    },
    buttonContainer: {
        padding: 24,
        gap: 10,
    },
    shareButton: {
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    shareButtonGradient: {
        padding: 14,
        alignItems: 'center',
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    backButton: {
        backgroundColor: '#F8F9FA',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E1E8ED',
    },
    backButtonText: {
        color: '#5D6D7E',
        fontSize: 15,
        fontWeight: '600',
    },
});
