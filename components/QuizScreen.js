import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuizScreen({ questions, onFinish }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleAnswer = (answerIndex) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = () => {
        // Update score berdasarkan jawaban saat ini
        const newScore = selectedAnswer === currentQuestion.correctAnswer
            ? score + 1
            : score;

        if (isLastQuestion) {
            onFinish(newScore);
        } else {
            setScore(newScore);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.questionNumber}>
                    Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
                </Text>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
                        ]}
                    />
                </View>
            </View>

            <View style={styles.questionContainer}>
                <Text style={styles.question}>{currentQuestion.question}</Text>

                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    let buttonStyle = styles.optionButton;
                    let textStyle = styles.optionText;

                    if (selectedAnswer !== null) {
                        if (isSelected && isCorrect) {
                            buttonStyle = [styles.optionButton, styles.correctAnswer];
                            textStyle = [styles.optionText, styles.correctText];
                        } else if (isSelected && !isCorrect) {
                            buttonStyle = [styles.optionButton, styles.wrongAnswer];
                            textStyle = [styles.optionText, styles.wrongText];
                        } else if (isCorrect) {
                            buttonStyle = [styles.optionButton, styles.correctAnswer];
                            textStyle = [styles.optionText, styles.correctText];
                        }
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            style={buttonStyle}
                            onPress={() => handleAnswer(index)}
                            disabled={selectedAnswer !== null}
                        >
                            <Text style={textStyle}>{option}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {selectedAnswer !== null && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>
                        {isLastQuestion ? 'Lihat Hasil' : 'Pertanyaan Berikutnya'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        marginBottom: 30,
    },
    questionNumber: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 10,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#ecf0f1',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#3498db',
        borderRadius: 4,
    },
    questionContainer: {
        flex: 1,
    },
    question: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 30,
        lineHeight: 32,
    },
    optionButton: {
        backgroundColor: '#fff',
        padding: 18,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#ecf0f1',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    optionText: {
        fontSize: 16,
        color: '#2c3e50',
    },
    correctAnswer: {
        backgroundColor: '#2ecc71',
        borderColor: '#27ae60',
    },
    correctText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    wrongAnswer: {
        backgroundColor: '#e74c3c',
        borderColor: '#c0392b',
    },
    wrongText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#3498db',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

