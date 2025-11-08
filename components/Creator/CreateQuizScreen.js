import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createQuiz } from '../../services/api';

export default function CreateQuizScreen({
    onBack,
    onQuizCreated,
    onAddQuestion,
    quizData,
    setQuizData,
}) {
    const { title, description, timeLimit, questions } = quizData;

    const handleAddQuestion = (questionType) => {
        onAddQuestion(questionType);
    };

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Judul kuis harus diisi');
            return;
        }

        if (questions.length === 0) {
            Alert.alert('Error', 'Minimal harus ada 1 pertanyaan');
            return;
        }

        // Validasi semua pertanyaan sudah diisi
        const incompleteQuestions = questions.filter((q) => {
            if (!q.question.trim()) return true;
            if (q.type === 'multiple_choice') {
                if (q.options.some((opt) => !opt.trim())) return true;
            }
            if (q.type === 'true_false' && q.correctAnswer === '') return true;
            if (q.type === 'short_answer' && !q.correctAnswer.trim()) return true;
            return false;
        });

        if (incompleteQuestions.length > 0) {
            Alert.alert('Error', 'Semua pertanyaan harus diisi lengkap');
            return;
        }

        try {
            const response = await createQuiz({
                title: title.trim(),
                description: description.trim(),
                timeLimit: timeLimit ? parseInt(timeLimit) : 0,
                questions: questions,
            });

            if (response.success) {
                const quiz = response.data;
                Alert.alert('Berhasil', `Kuis berhasil dibuat! Kode: ${quiz.code}`, [
                    {
                        text: 'OK',
                        onPress: () => {
                            onQuizCreated(quiz);
                        },
                    },
                ]);
            } else {
                Alert.alert('Error', 'Gagal menyimpan kuis');
            }
        } catch (error) {
            Alert.alert('Error', error.message || 'Gagal menyimpan kuis');
        }
    };

    const getQuestionTypeIcon = (type) => {
        if (type === 'multiple_choice') return '○';
        if (type === 'short_answer') return '▢';
        return '◐';
    };

    const getQuestionTypeColor = (type) => {
        if (type === 'multiple_choice') return '#4A90E2';
        if (type === 'short_answer') return '#5B9BD5';
        return '#6BA3D1';
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <LinearGradient
                        colors={['#F8F9FA', '#E9ECEF']}
                        style={styles.backButtonGradient}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Buat Kuis Baru</Text>
                    <Text style={styles.headerSubtitle}>Lengkapi informasi kuis Anda</Text>
                </View>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    {/* Form Section */}
                    <View style={styles.formCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardIcon}>
                                <Text style={styles.cardIconText}>i</Text>
                            </View>
                            <Text style={styles.cardTitle}>Informasi Kuis</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>Judul Kuis</Text>
                                <Text style={styles.required}>*</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Contoh: Kuis Matematika Kelas 10"
                                    placeholderTextColor="#A0AEC0"
                                    value={title}
                                    onChangeText={(text) =>
                                        setQuizData({ ...quizData, title: text })
                                    }
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>Deskripsi</Text>
                                <Text style={styles.optional}>(Opsional)</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Tambahkan deskripsi untuk kuis Anda..."
                                    placeholderTextColor="#A0AEC0"
                                    value={description}
                                    onChangeText={(text) =>
                                        setQuizData({ ...quizData, description: text })
                                    }
                                    multiline
                                    numberOfLines={3}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <View style={styles.labelContainer}>
                                <Text style={styles.label}>Waktu Pengerjaan</Text>
                                <Text style={styles.optional}>(Menit)</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Kosongkan jika tidak ada batas waktu"
                                    placeholderTextColor="#A0AEC0"
                                    value={timeLimit}
                                    onChangeText={(text) =>
                                        setQuizData({ ...quizData, timeLimit: text })
                                    }
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Questions Section */}
                    <View style={styles.formCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardIcon}>
                                <Text style={styles.cardIconText}>?</Text>
                            </View>
                            <View style={styles.cardTitleContainer}>
                                <Text style={styles.cardTitle}>Pertanyaan</Text>
                                <View style={styles.countBadge}>
                                    <Text style={styles.countText}>{questions.length}</Text>
                                </View>
                            </View>
                        </View>

                        {questions.length === 0 ? (
                            <View style={styles.emptyQuestionContainer}>
                                <View style={styles.emptyIcon}>
                                    <Text style={styles.emptyIconText}>+</Text>
                                </View>
                                <Text style={styles.emptyQuestionText}>
                                    Belum ada pertanyaan
                                </Text>
                                <Text style={styles.emptyQuestionSubtext}>
                                    Tambahkan pertanyaan pertama Anda
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.questionsList}>
                                {questions.map((q, index) => (
                                    <View key={q.id} style={styles.questionCard}>
                                        <View style={styles.questionCardHeader}>
                                            <View style={styles.questionNumberBadge}>
                                                <Text style={styles.questionNumberText}>
                                                    {index + 1}
                                                </Text>
                                            </View>
                                            <View
                                                style={[
                                                    styles.questionTypeBadge,
                                                    { backgroundColor: getQuestionTypeColor(q.type) + '15' },
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.questionTypeIcon,
                                                        { color: getQuestionTypeColor(q.type) },
                                                    ]}
                                                >
                                                    {getQuestionTypeIcon(q.type)}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.questionTypeText,
                                                        { color: getQuestionTypeColor(q.type) },
                                                    ]}
                                                >
                                                    {q.type === 'multiple_choice'
                                                        ? 'Pilihan Ganda'
                                                        : q.type === 'short_answer'
                                                            ? 'Isian Singkat'
                                                            : 'Benar/Salah'}
                                                </Text>
                                            </View>
                                        </View>
                                        <Text style={styles.questionPreviewText} numberOfLines={2}>
                                            {q.question || '(Pertanyaan belum diisi)'}
                                        </Text>
                                        {q.image && (
                                            <View style={styles.questionImagePreview}>
                                                <Image
                                                    source={{ uri: q.image }}
                                                    style={styles.questionImagePreviewImage}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}

                        <View style={styles.addQuestionSection}>
                            <Text style={styles.addQuestionLabel}>Tambah Pertanyaan</Text>
                            <View style={styles.addQuestionButtons}>
                                <TouchableOpacity
                                    style={styles.addQuestionButton}
                                    onPress={() => handleAddQuestion('multiple_choice')}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={['#4A90E2', '#357ABD']}
                                        style={styles.addQuestionGradient}
                                    >
                                        <View style={styles.addQuestionIcon}>
                                            <Text style={styles.addQuestionIconText}>○</Text>
                                        </View>
                                        <Text style={styles.addQuestionText}>Pilihan Ganda</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.addQuestionButton}
                                    onPress={() => handleAddQuestion('short_answer')}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={['#5B9BD5', '#4472C4']}
                                        style={styles.addQuestionGradient}
                                    >
                                        <View style={styles.addQuestionIcon}>
                                            <Text style={styles.addQuestionIconText}>▢</Text>
                                        </View>
                                        <Text style={styles.addQuestionText}>Isian Singkat</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.addQuestionButton}
                                    onPress={() => handleAddQuestion('true_false')}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={['#6BA3D1', '#4A90E2']}
                                        style={styles.addQuestionGradient}
                                    >
                                        <View style={styles.addQuestionIcon}>
                                            <Text style={styles.addQuestionIconText}>◐</Text>
                                        </View>
                                        <Text style={styles.addQuestionText}>Benar/Salah</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Save Button */}
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#4A90E2', '#357ABD']}
                            style={styles.saveButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={styles.saveButtonContent}>
                                <Text style={styles.saveButtonIcon}>✓</Text>
                                <Text style={styles.saveButtonText}>Simpan Kuis</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    backButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    backButtonGradient: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 22,
        color: '#4A90E2',
        fontWeight: '700',
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#7F8C8D',
    },
    scrollView: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EBF5FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#4A90E2',
    },
    cardIconText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4A90E2',
    },
    cardTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        marginRight: 10,
    },
    countBadge: {
        backgroundColor: '#4A90E2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        minWidth: 32,
        alignItems: 'center',
    },
    countText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 13,
    },
    inputGroup: {
        marginBottom: 18,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C3E50',
        marginRight: 6,
    },
    required: {
        fontSize: 14,
        color: '#E74C3C',
        fontWeight: '700',
    },
    optional: {
        fontSize: 12,
        color: '#7F8C8D',
        fontWeight: '500',
    },
    inputWrapper: {
        borderRadius: 12,
        backgroundColor: '#F8F9FA',
        borderWidth: 1.5,
        borderColor: '#E1E8ED',
    },
    input: {
        padding: 16,
        fontSize: 15,
        color: '#2C3E50',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 16,
    },
    emptyQuestionContainer: {
        alignItems: 'center',
        padding: 32,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E1E8ED',
        borderStyle: 'dashed',
    },
    emptyIcon: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#EBF5FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#4A90E2',
        borderStyle: 'dashed',
    },
    emptyIconText: {
        fontSize: 32,
        fontWeight: '300',
        color: '#4A90E2',
    },
    emptyQuestionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 6,
    },
    emptyQuestionSubtext: {
        fontSize: 13,
        color: '#7F8C8D',
        textAlign: 'center',
    },
    questionsList: {
        marginBottom: 16,
    },
    questionCard: {
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#4A90E2',
    },
    questionCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    questionNumberBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    questionNumberText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 13,
    },
    questionTypeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    questionTypeIcon: {
        fontSize: 14,
        marginRight: 6,
        fontWeight: '600',
    },
    questionTypeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    questionPreviewText: {
        fontSize: 14,
        color: '#2C3E50',
        lineHeight: 20,
    },
    questionImagePreview: {
        marginTop: 10,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#F8F9FA',
    },
    questionImagePreviewImage: {
        width: '100%',
        height: 120,
    },
    addQuestionSection: {
        marginTop: 8,
    },
    addQuestionLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 14,
    },
    addQuestionButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    addQuestionButton: {
        flex: 1,
        minWidth: '30%',
        borderRadius: 14,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    },
    addQuestionGradient: {
        padding: 16,
        alignItems: 'center',
    },
    addQuestionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    addQuestionIconText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '700',
    },
    addQuestionText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '600',
        textAlign: 'center',
    },
    saveButton: {
        borderRadius: 14,
        overflow: 'hidden',
        marginTop: 8,
        marginBottom: 32,
        elevation: 4,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    saveButtonGradient: {
        padding: 16,
    },
    saveButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonIcon: {
        fontSize: 18,
        marginRight: 10,
        fontWeight: '700',
        color: '#fff',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});
