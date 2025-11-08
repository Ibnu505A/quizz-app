import React, { useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';

export default function AddQuestionScreen({
    questionType,
    onSave,
    onCancel,
    initialQuestion = null,
}) {
    const [question, setQuestion] = useState(initialQuestion?.question || '');
    const [options, setOptions] = useState(
        initialQuestion?.options || ['', '', '', '']
    );
    const [correctAnswer, setCorrectAnswer] = useState(
        initialQuestion?.correctAnswer !== undefined
            ? initialQuestion.correctAnswer
            : questionType === 'multiple_choice'
                ? 0
                : ''
    );
    const [score, setScore] = useState(
        initialQuestion?.score?.toString() || '1'
    );
    const [imageUri, setImageUri] = useState(initialQuestion?.image || null);

    const handleSave = () => {
        if (!question.trim()) {
            Alert.alert('Error', 'Pertanyaan harus diisi');
            return;
        }

        if (questionType === 'multiple_choice') {
            if (options.some((opt) => !opt.trim())) {
                Alert.alert('Error', 'Semua opsi harus diisi');
                return;
            }
            if (correctAnswer === '' || correctAnswer < 0 || correctAnswer > 3) {
                Alert.alert('Error', 'Pilih jawaban yang benar');
                return;
            }
        }

        if (questionType === 'true_false') {
            if (correctAnswer === '') {
                Alert.alert('Error', 'Pilih jawaban yang benar');
                return;
            }
        }

        if (questionType === 'short_answer') {
            if (!correctAnswer.trim()) {
                Alert.alert('Error', 'Jawaban benar harus diisi');
                return;
            }
        }

        const questionData = {
            id: initialQuestion?.id || Date.now(),
            type: questionType,
            question: question.trim(),
            options: questionType === 'multiple_choice' ? options : [],
            correctAnswer:
                questionType === 'multiple_choice' || questionType === 'true_false'
                    ? correctAnswer
                    : correctAnswer.trim(),
            score: parseInt(score) || 1,
            image: imageUri || null,
        };

        onSave(questionData);
    };

    const updateOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const pickImage = async () => {
        // Request permission
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Izin Diperlukan',
                'Aplikasi memerlukan izin untuk mengakses galeri foto.'
            );
            return;
        }

        // Launch image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            base64: true,
        });

        if (!result.canceled && result.assets[0]) {
            // Simpan sebagai base64 untuk disimpan di AsyncStorage
            const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
            setImageUri(base64Image);
        }
    };

    const removeImage = () => {
        Alert.alert(
            'Hapus Gambar',
            'Apakah Anda yakin ingin menghapus gambar ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: () => setImageUri(null),
                },
            ]
        );
    };

    const getQuestionTypeLabel = () => {
        if (questionType === 'multiple_choice') return 'Pilihan Ganda';
        if (questionType === 'short_answer') return 'Isian Singkat';
        return 'Benar/Salah';
    };

    const getQuestionTypeColor = () => {
        if (questionType === 'multiple_choice') return ['#4A90E2', '#357ABD'];
        if (questionType === 'short_answer') return ['#5B9BD5', '#4472C4'];
        return ['#6BA3D1', '#4A90E2'];
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancel} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{getQuestionTypeLabel()}</Text>
                <View style={{ width: 36 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Pertanyaan *</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Masukkan pertanyaan"
                            placeholderTextColor="#a0aec0"
                            value={question}
                            onChangeText={setQuestion}
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Gambar</Text>
                            <Text style={styles.optional}>(Opsional)</Text>
                        </View>
                        {imageUri ? (
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={removeImage}
                                >
                                    <Text style={styles.removeImageText}>×</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.addImageButton}
                                onPress={pickImage}
                                activeOpacity={0.7}
                            >
                                <LinearGradient
                                    colors={['#EBF5FB', '#D6EAF8']}
                                    style={styles.addImageGradient}
                                >
                                    <View style={styles.addImageIconContainer}>
                                        <Text style={styles.addImageIcon}>IMG</Text>
                                    </View>
                                    <Text style={styles.addImageText}>Tambahkan Gambar</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        )}
                    </View>

                    {questionType === 'multiple_choice' && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Opsi Jawaban *</Text>
                            {options.map((option, index) => (
                                <View key={index} style={styles.optionContainer}>
                                    <TouchableOpacity
                                        style={[
                                            styles.radioButton,
                                            correctAnswer === index && styles.radioButtonSelected,
                                        ]}
                                        onPress={() => setCorrectAnswer(index)}
                                        activeOpacity={0.7}
                                    >
                                        {correctAnswer === index && (
                                            <View style={styles.radioButtonInner} />
                                        )}
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.optionInput}
                                        placeholder={`Opsi ${index + 1}`}
                                        placeholderTextColor="#a0aec0"
                                        value={option}
                                        onChangeText={(value) => updateOption(index, value)}
                                    />
                                </View>
                            ))}
                            <Text style={styles.hint}>
                                Klik lingkaran untuk menandai jawaban yang benar
                            </Text>
                        </View>
                    )}

                    {questionType === 'true_false' && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Jawaban yang Benar *</Text>
                            <View style={styles.trueFalseContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.trueFalseButton,
                                        correctAnswer === true && styles.trueFalseButtonSelected,
                                    ]}
                                    onPress={() => setCorrectAnswer(true)}
                                    activeOpacity={0.7}
                                >
                                    <LinearGradient
                                        colors={
                                            correctAnswer === true
                                                ? ['#2ecc71', '#27ae60']
                                                : ['#fff', '#fff']
                                        }
                                        style={styles.trueFalseGradient}
                                    >
                                        <Text
                                            style={[
                                                styles.trueFalseText,
                                                correctAnswer === true && styles.trueFalseTextSelected,
                                            ]}
                                        >
                                            Benar
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.trueFalseButton,
                                        correctAnswer === false && styles.trueFalseButtonSelected,
                                    ]}
                                    onPress={() => setCorrectAnswer(false)}
                                    activeOpacity={0.7}
                                >
                                    <LinearGradient
                                        colors={
                                            correctAnswer === false
                                                ? ['#e74c3c', '#c0392b']
                                                : ['#fff', '#fff']
                                        }
                                        style={styles.trueFalseGradient}
                                    >
                                        <Text
                                            style={[
                                                styles.trueFalseText,
                                                correctAnswer === false && styles.trueFalseTextSelected,
                                            ]}
                                        >
                                            Salah
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {questionType === 'short_answer' && (
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Jawaban yang Benar *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Masukkan jawaban yang benar"
                                placeholderTextColor="#a0aec0"
                                value={correctAnswer}
                                onChangeText={setCorrectAnswer}
                            />
                            <Text style={styles.hint}>
                                Jawaban akan dibandingkan secara case-insensitive
                            </Text>
                        </View>
                    )}

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Skor</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="1"
                            placeholderTextColor="#a0aec0"
                            value={score}
                            onChangeText={setScore}
                            keyboardType="numeric"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={getQuestionTypeColor()}
                            style={styles.saveButtonGradient}
                        >
                            <Text style={styles.saveButtonText}>Simpan Pertanyaan</Text>
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
        paddingBottom: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 20,
        color: '#4A90E2',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C3E50',
    },
    scrollView: {
        flex: 1,
    },
    form: {
        padding: 20,
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
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: '#E1E8ED',
        borderRadius: 10,
        padding: 14,
        fontSize: 15,
        color: '#2C3E50',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#cbd5e0',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#4A90E2',
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#4A90E2',
    },
    optionInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#2d3748',
    },
    hint: {
        fontSize: 13,
        color: '#718096',
        marginTop: 8,
        fontStyle: 'italic',
    },
    trueFalseContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    trueFalseButton: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    trueFalseGradient: {
        padding: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E1E8ED',
        borderRadius: 10,
    },
    trueFalseText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
    },
    trueFalseTextSelected: {
        color: '#fff',
    },
    saveButton: {
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 32,
        elevation: 2,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    saveButtonGradient: {
        padding: 14,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    optional: {
        fontSize: 12,
        color: '#7F8C8D',
        fontWeight: '500',
        marginLeft: 4,
    },
    imageContainer: {
        position: 'relative',
        marginTop: 8,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(231, 76, 60, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    removeImageText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    addImageButton: {
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    addImageGradient: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#E1E8ED',
        borderStyle: 'dashed',
        borderRadius: 12,
    },
    addImageIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    addImageIcon: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.5,
    },
    addImageText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A90E2',
    },
});
