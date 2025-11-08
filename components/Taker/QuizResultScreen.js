import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function QuizResultScreen({ result, quiz, onRestart, onBack }) {
    const percentage = Math.round((result.score / result.maxScore) * 100);

    const getMessage = () => {
        if (percentage >= 80) {
            return {
                text: 'Luar Biasa!',
                colors: ['#2ecc71', '#27ae60'],
                borderColor: '#2ecc71',
            };
        } else if (percentage >= 60) {
            return {
                text: 'Bagus!',
                colors: ['#4A90E2', '#357ABD'],
                borderColor: '#4A90E2',
            };
        } else {
            return {
                text: 'Tetap Semangat!',
                colors: ['#f39c12', '#e67e22'],
                borderColor: '#f39c12',
            };
        }
    };

    const message = getMessage();

    const getQuestionResult = (question) => {
        const userAnswer = result.answers[question.id];
        let isCorrect = false;
        let userAnswerDisplay = '';

        if (question.type === 'multiple_choice') {
            isCorrect = userAnswer === question.correctAnswer;
            userAnswerDisplay = question.options[userAnswer] || '(Tidak dijawab)';
        } else if (question.type === 'true_false') {
            isCorrect = userAnswer === question.correctAnswer;
            userAnswerDisplay = userAnswer === true ? 'Benar' : userAnswer === false ? 'Salah' : '(Tidak dijawab)';
        } else if (question.type === 'short_answer') {
            const userAnswerLower = userAnswer?.trim().toLowerCase() || '';
            const correctAnswerLower = question.correctAnswer.trim().toLowerCase();
            isCorrect = userAnswerLower === correctAnswerLower;
            userAnswerDisplay = userAnswer || '(Tidak dijawab)';
        }

        const correctAnswerDisplay =
            question.type === 'multiple_choice'
                ? question.options[question.correctAnswer]
                : question.type === 'true_false'
                    ? (question.correctAnswer ? 'Benar' : 'Salah')
                    : question.correctAnswer;

        return { isCorrect, userAnswerDisplay, correctAnswerDisplay };
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={message.colors}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.title}>{message.text}</Text>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>{result.score}</Text>
                        <Text style={styles.totalText}>dari {result.maxScore}</Text>
                    </View>

                    <View style={styles.percentageContainer}>
                        <View
                            style={[
                                styles.percentageCircle,
                                { borderColor: 'rgba(255, 255, 255, 0.3)' },
                            ]}
                        >
                            <Text style={styles.percentageText}>{percentage}%</Text>
                        </View>
                    </View>

                    {result.timeUsed !== null && (
                        <View style={styles.timeBadge}>
                            <Text style={styles.timeText}>
                                Waktu: {Math.floor(result.timeUsed / 60)}:
                                {String(result.timeUsed % 60).padStart(2, '0')}
                            </Text>
                        </View>
                    )}
                </View>
            </LinearGradient>

            <View style={styles.reviewSection}>
                <Text style={styles.reviewTitle}>Review Jawaban</Text>

                {quiz.questions.map((question, index) => {
                    const questionResult = getQuestionResult(question);
                    return (
                        <View
                            key={question.id}
                            style={[
                                styles.questionReview,
                                questionResult.isCorrect
                                    ? styles.questionReviewCorrect
                                    : styles.questionReviewWrong,
                            ]}
                        >
                            <View style={styles.questionReviewHeader}>
                                <Text style={styles.questionReviewNumber}>
                                    Pertanyaan {index + 1}
                                </Text>
                                <Text
                                    style={[
                                        styles.questionReviewStatus,
                                        questionResult.isCorrect
                                            ? styles.questionReviewStatusCorrect
                                            : styles.questionReviewStatusWrong,
                                    ]}
                                >
                                    {questionResult.isCorrect ? 'Benar' : 'Salah'}
                                </Text>
                            </View>

                            <Text style={styles.questionReviewText}>
                                {question.question}
                            </Text>

                            <View style={styles.answerContainer}>
                                <View style={styles.answerRow}>
                                    <Text style={styles.answerLabel}>Jawaban Anda:</Text>
                                    <Text
                                        style={[
                                            styles.answerValue,
                                            questionResult.isCorrect
                                                ? styles.answerValueCorrect
                                                : styles.answerValueWrong,
                                        ]}
                                    >
                                        {questionResult.userAnswerDisplay}
                                    </Text>
                                </View>

                                {!questionResult.isCorrect && (
                                    <View style={styles.answerRow}>
                                        <Text style={styles.answerLabel}>Jawaban Benar:</Text>
                                        <Text style={styles.answerValueCorrect}>
                                            {questionResult.correctAnswerDisplay}
                                        </Text>
                                    </View>
                                )}

                                <Text style={styles.questionScore}>
                                    Skor: {questionResult.isCorrect ? question.score : 0} / {question.score}
                                </Text>
                            </View>
                        </View>
                    );
                })}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={onBack}
                    activeOpacity={0.8}
                >
                    <Text style={styles.backButtonText}>Kembali ke Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.restartButton}
                    onPress={onRestart}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={message.colors}
                        style={styles.restartButtonGradient}
                    >
                        <Text style={styles.restartButtonText}>Coba Lagi</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 32,
        marginBottom: 20,
    },
    headerContent: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: '800',
        color: '#fff',
    },
    totalText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: 6,
    },
    percentageContainer: {
        marginBottom: 16,
    },
    percentageCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    percentageText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
    },
    timeBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
    },
    timeText: {
        fontSize: 13,
        color: '#fff',
        fontWeight: '600',
    },
    reviewSection: {
        padding: 16,
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 14,
    },
    questionReview: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    questionReviewCorrect: {
        borderLeftColor: '#2ecc71',
    },
    questionReviewWrong: {
        borderLeftColor: '#e74c3c',
    },
    questionReviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    questionReviewNumber: {
        fontSize: 13,
        fontWeight: '600',
        color: '#7F8C8D',
    },
    questionReviewStatus: {
        fontSize: 13,
        fontWeight: '700',
    },
    questionReviewStatusCorrect: {
        color: '#2ecc71',
    },
    questionReviewStatusWrong: {
        color: '#e74c3c',
    },
    questionReviewText: {
        fontSize: 15,
        color: '#2C3E50',
        marginBottom: 12,
        lineHeight: 22,
    },
    answerContainer: {
        backgroundColor: '#F8F9FA',
        padding: 12,
        borderRadius: 8,
    },
    answerRow: {
        flexDirection: 'row',
        marginBottom: 6,
        flexWrap: 'wrap',
    },
    answerLabel: {
        fontSize: 13,
        color: '#7F8C8D',
        marginRight: 8,
        fontWeight: '600',
    },
    answerValue: {
        fontSize: 13,
        flex: 1,
        fontWeight: '600',
    },
    answerValueCorrect: {
        color: '#2ecc71',
    },
    answerValueWrong: {
        color: '#e74c3c',
    },
    questionScore: {
        fontSize: 12,
        color: '#7F8C8D',
        marginTop: 4,
    },
    buttonContainer: {
        padding: 16,
        gap: 10,
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
    restartButton: {
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    restartButtonGradient: {
        padding: 14,
        alignItems: 'center',
    },
    restartButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});

