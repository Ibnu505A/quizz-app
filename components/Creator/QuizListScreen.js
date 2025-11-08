import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { getAllQuizzes, deleteQuiz } from '../../services/api';

export default function QuizListScreen({ onCreateNew, onSelectQuiz, onBack, onViewResults }) {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {
        setLoading(true);
        try {
            const data = await getAllQuizzes();
            setQuizzes(data);
        } catch (error) {
            Alert.alert('Error', error.message || 'Gagal memuat daftar kuis');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (quizId, quizTitle) => {
        Alert.alert(
            'Hapus Kuis',
            `Apakah Anda yakin ingin menghapus "${quizTitle}"?`,
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteQuiz(quizId);
                            loadQuizzes();
                        } catch (error) {
                            Alert.alert('Error', error.message || 'Gagal menghapus kuis');
                        }
                    },
                },
            ]
        );
    };

    const renderQuizItem = ({ item }) => (
        <View style={styles.quizCard}>
            <TouchableOpacity
                style={styles.cardContent}
                onPress={() => onSelectQuiz(item)}
                activeOpacity={0.7}
            >
                <View style={styles.cardHeader}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.quizTitle} numberOfLines={1}>
                            {item.title}
                        </Text>
                        <View style={styles.codeBadge}>
                            <Text style={styles.codeText}>{item.code}</Text>
                        </View>
                    </View>
                </View>

                {item.description && (
                    <Text style={styles.quizDescription} numberOfLines={2}>
                        {item.description}
                    </Text>
                )}

                <View style={styles.cardFooter}>
                    <View style={styles.infoBadge}>
                        <Text style={styles.infoText}>
                            {item.questions?.length || 0} Pertanyaan
                        </Text>
                    </View>
                    {item.timeLimit > 0 && (
                        <View style={styles.infoBadge}>
                            <Text style={styles.infoText}>{item.timeLimit} menit</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={styles.resultsButton}
                    onPress={() => onViewResults(item)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.resultsButtonText}>Hasil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id, item.title)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.deleteIcon}>×</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Kuis Saya</Text>
                <TouchableOpacity style={styles.createButton} onPress={onCreateNew}>
                    <Text style={styles.createButtonText}>+ Baru</Text>
                </TouchableOpacity>
            </View>

            {quizzes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Belum ada kuis</Text>
                    <Text style={styles.emptySubtext}>
                        Buat kuis pertama Anda sekarang!
                    </Text>
                    <TouchableOpacity style={styles.emptyButton} onPress={onCreateNew}>
                        <Text style={styles.emptyButtonText}>Buat Kuis</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={quizzes}
                    renderItem={renderQuizItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        flex: 1,
        marginLeft: 12,
    },
    createButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    createButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    listContent: {
        padding: 16,
    },
    quizCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: 'hidden',
    },
    cardContent: {
        padding: 16,
    },
    cardActions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#E1E8ED',
    },
    resultsButton: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#EBF5FB',
    },
    resultsButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A90E2',
    },
    cardHeader: {
        marginBottom: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    quizTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2d3748',
        flex: 1,
        marginRight: 8,
    },
    codeBadge: {
        backgroundColor: '#4A90E2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    codeText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.5,
    },
    quizDescription: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 12,
        lineHeight: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        gap: 12,
    },
    infoBadge: {
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    infoText: {
        fontSize: 12,
        color: '#5D6D7E',
        fontWeight: '600',
    },
    deleteButton: {
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEF5F5',
        borderLeftWidth: 1,
        borderLeftColor: '#E1E8ED',
    },
    deleteIcon: {
        fontSize: 24,
        color: '#E74C3C',
        fontWeight: '300',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 15,
        color: '#7F8C8D',
        textAlign: 'center',
        marginBottom: 28,
        lineHeight: 22,
    },
    emptyButton: {
        backgroundColor: '#4A90E2',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 28,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    emptyButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
});
