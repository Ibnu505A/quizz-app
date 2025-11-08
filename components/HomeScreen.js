import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ onStartQuiz }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selamat Datang!</Text>
            <Text style={styles.subtitle}>Aplikasi Kuis Indonesia</Text>
            <Text style={styles.description}>
                Uji pengetahuan Anda tentang Indonesia dengan menjawab 5 pertanyaan.
            </Text>
            <TouchableOpacity style={styles.button} onPress={onStartQuiz}>
                <Text style={styles.buttonText}>Mulai Kuis</Text>
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
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#7f8c8d',
        marginBottom: 30,
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

