import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ResultScreen({ score, totalQuestions, onRestart }) {
    const percentage = Math.round((score / totalQuestions) * 100);

    const getMessage = () => {
        if (percentage >= 80) {
            return { text: 'Luar Biasa!', emoji: '🎉', color: '#2ecc71' };
        } else if (percentage >= 60) {
            return { text: 'Bagus!', emoji: '👍', color: '#3498db' };
        } else {
            return { text: 'Tetap Semangat!', emoji: '💪', color: '#f39c12' };
        }
    };

    const message = getMessage();

    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>{message.emoji}</Text>
            <Text style={[styles.title, { color: message.color }]}>{message.text}</Text>

            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>{score}</Text>
                <Text style={styles.totalText}>dari {totalQuestions}</Text>
            </View>

            <View style={styles.percentageContainer}>
                <View style={styles.percentageCircle}>
                    <Text style={styles.percentageText}>{percentage}%</Text>
                </View>
            </View>

            <Text style={styles.description}>
                Anda menjawab benar {score} dari {totalQuestions} pertanyaan.
            </Text>

            <TouchableOpacity style={styles.button} onPress={onRestart}>
                <Text style={styles.buttonText}>Coba Lagi</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    emoji: {
        fontSize: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    totalText: {
        fontSize: 20,
        color: '#7f8c8d',
        marginTop: 5,
    },
    percentageContainer: {
        marginBottom: 30,
    },
    percentageCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    percentageText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 16,
        color: '#34495e',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

