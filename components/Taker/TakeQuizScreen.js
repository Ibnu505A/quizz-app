import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
    Alert,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenCapture from 'expo-screen-capture';

export default function TakeQuizScreen({ quiz, onFinish }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(
        quiz.timeLimit > 0 ? quiz.timeLimit * 60 : null
    );
    const timerRef = useRef(null);

    // Prevent screenshots saat quiz dimulai
    useEffect(() => {
        // Prevent screenshot saat quiz dimulai
        ScreenCapture.preventScreenCaptureAsync().catch((error) => {
            // Jika ada error (misalnya di web atau platform yang tidak support), ignore
            console.log('Screen capture prevention not available:', error);
        });

        return () => {
            // Allow screenshots kembali saat component unmount
            ScreenCapture.allowScreenCaptureAsync().catch((error) => {
                console.log('Screen capture allow not available:', error);
            });
        };
    }, []);

    useEffect(() => {
        if (timeLeft !== null && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        handleFinish();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    const handleAnswer = (value) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: value,
        });
    };

    const handleNext = () => {
        if (isLastQuestion) {
            handleFinish();
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleFinish = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        // Allow screenshots kembali saat quiz selesai
        ScreenCapture.allowScreenCaptureAsync().catch((error) => {
            console.log('Screen capture allow not available:', error);
        });

        let totalScore = 0;
        let maxScore = 0;

        quiz.questions.forEach((q) => {
            maxScore += q.score;
            const userAnswer = answers[q.id];

            if (q.type === 'multiple_choice' || q.type === 'true_false') {
                if (userAnswer === q.correctAnswer) {
                    totalScore += q.score;
                }
            } else if (q.type === 'short_answer') {
                if (
                    userAnswer &&
                    userAnswer.trim().toLowerCase() ===
                    q.correctAnswer.trim().toLowerCase()
                ) {
                    totalScore += q.score;
                }
            }
        });

        onFinish({
            quizId: quiz.id,
            answers,
            score: totalScore,
            maxScore,
            timeUsed: quiz.timeLimit > 0 ? quiz.timeLimit * 60 - timeLeft : null,
        });
    };

    const getCurrentAnswer = () => {
        return answers[currentQuestion.id];
    };

    const renderQuestion = () => {
        const currentAnswer = getCurrentAnswer();

        if (currentQuestion.type === 'multiple_choice') {
            return (
                <View>
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                currentAnswer === index && styles.optionButtonSelected,
                            ]}
                            onPress={() => handleAnswer(index)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.optionContent}>
                                <View
                                    style={[
                                        styles.radioButton,
                                        currentAnswer === index && styles.radioButtonSelected,
                                    ]}
                                >
                                    {currentAnswer === index && (
                                        <View style={styles.radioButtonInner} />
                                    )}
                                </View>
                                <Text style={styles.optionText}>{option}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            );
        }

        if (currentQuestion.type === 'true_false') {
            return (
                <View style={styles.trueFalseContainer}>
                    <TouchableOpacity
                        style={[
                            styles.trueFalseButton,
                            currentAnswer === true && styles.trueFalseButtonSelected,
                        ]}
                        onPress={() => handleAnswer(true)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.trueFalseText,
                                currentAnswer === true && styles.trueFalseTextSelected,
                            ]}
                        >
                            Benar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.trueFalseButton,
                            currentAnswer === false && styles.trueFalseButtonSelected,
                        ]}
                        onPress={() => handleAnswer(false)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                styles.trueFalseText,
                                currentAnswer === false && styles.trueFalseTextSelected,
                            ]}
                        >
                            Salah
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (currentQuestion.type === 'short_answer') {
            return (
                <TextInput
                    style={styles.shortAnswerInput}
                    placeholder="Masukkan jawaban Anda"
                    placeholderTextColor="#BDC3C7"
                    value={currentAnswer || ''}
                    onChangeText={(text) => handleAnswer(text)}
                    multiline
                />
            );
        }

        return null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.questionNumberBadge}>
                        <Text style={styles.questionNumber}>
                            {currentQuestionIndex + 1} / {quiz.questions.length}
                        </Text>
                    </View>
                    {timeLeft !== null && (
                        <View
                            style={[
                                styles.timer,
                                timeLeft < 60 && styles.timerWarning,
                            ]}
                        >
                            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                            },
                        ]}
                    />
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.quizInfo}>
                    <Text style={styles.quizTitle}>{quiz.title}</Text>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>{currentQuestion.question}</Text>
                    {currentQuestion.image && (
                        <View style={styles.questionImageContainer}>
                            <Image
                                source={{ uri: currentQuestion.image }}
                                style={styles.questionImage}
                                resizeMode="contain"
                            />
                        </View>
                    )}
                    {renderQuestion()}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.navButton,
                        currentQuestionIndex === 0 && styles.navButtonDisabled,
                    ]}
                    onPress={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    activeOpacity={0.7}
                >
                    <Text
                        style={[
                            styles.navButtonText,
                            currentQuestionIndex === 0 && styles.navButtonTextDisabled,
                        ]}
                    >
                        Sebelumnya
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNext}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#4A90E2', '#357ABD']}
                        style={styles.nextButtonGradient}
                    >
                        <Text style={styles.nextButtonText}>
                            {isLastQuestion ? 'Selesai' : 'Selanjutnya'}
                        </Text>
                    </LinearGradient>
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
    header: {
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingBottom: 16,
        paddingHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    questionNumberBadge: {
        backgroundColor: '#EBF5FB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    questionNumber: {
        fontSize: 14,
        color: '#4A90E2',
        fontWeight: '600',
    },
    timer: {
        backgroundColor: '#EBF5FB',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    timerWarning: {
        backgroundColor: '#FEF5E7',
    },
    timerText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4A90E2',
    },
    progressBar: {
        height: 4,
        backgroundColor: '#E1E8ED',
        borderRadius: 2,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4A90E2',
        borderRadius: 2,
    },
    content: {
        flex: 1,
    },
    quizInfo: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C3E50',
    },
    questionContainer: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 12,
        borderRadius: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    questionText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 20,
        lineHeight: 26,
    },
    questionImageContainer: {
        marginBottom: 20,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#F8F9FA',
    },
    questionImage: {
        width: '100%',
        height: 250,
        borderRadius: 12,
    },
    optionButton: {
        backgroundColor: '#F8F9FA',
        borderWidth: 2,
        borderColor: '#E1E8ED',
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
    },
    optionButtonSelected: {
        borderColor: '#4A90E2',
        backgroundColor: '#EBF5FB',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#BDC3C7',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#4A90E2',
    },
    radioButtonInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4A90E2',
    },
    optionText: {
        fontSize: 15,
        color: '#2C3E50',
        flex: 1,
    },
    trueFalseContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    trueFalseButton: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        borderWidth: 2,
        borderColor: '#E1E8ED',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
    },
    trueFalseButtonSelected: {
        borderColor: '#4A90E2',
        backgroundColor: '#EBF5FB',
    },
    trueFalseText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
    },
    trueFalseTextSelected: {
        color: '#4A90E2',
    },
    shortAnswerInput: {
        backgroundColor: '#F8F9FA',
        borderWidth: 2,
        borderColor: '#E1E8ED',
        borderRadius: 10,
        padding: 14,
        fontSize: 15,
        minHeight: 100,
        textAlignVertical: 'top',
        color: '#2C3E50',
    },
    footer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        gap: 12,
    },
    navButton: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    navButtonDisabled: {
        opacity: 0.5,
    },
    navButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2C3E50',
    },
    navButtonTextDisabled: {
        color: '#95A5A6',
    },
    nextButton: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    nextButtonGradient: {
        padding: 12,
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
});
