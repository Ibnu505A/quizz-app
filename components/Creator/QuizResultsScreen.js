import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getQuizResults } from '../../services/api';

export default function QuizResultsScreen({ quiz, onBack }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResults();
    }, [quiz]);

    const loadResults = async () => {
        setLoading(true);
        try {
            const data = await getQuizResults(quiz.id);
            // Backend sudah sort, tapi kita sort lagi untuk memastikan
            // Sort by score (tertinggi dulu), jika sama sort by timeUsed (tercepat dulu)
            const sorted = data.sort((a, b) => {
                // Bandingkan score dulu
                if (b.score !== a.score) {
                    return b.score - a.score; // Score tertinggi dulu
                }
                // Jika score sama, bandingkan waktu (tercepat dulu)
                // Jika tidak ada waktu, yang tidak ada waktu dianggap lebih lambat
                if (a.time_used === null && b.time_used === null) {
                    return 0; // Keduanya tidak ada waktu, tetap urutan
                }
                if (a.time_used === null) return 1; // a tidak ada waktu, b lebih cepat
                if (b.time_used === null) return -1; // b tidak ada waktu, a lebih cepat
                return a.time_used - b.time_used; // Waktu lebih sedikit = lebih cepat = ranking lebih tinggi
            });
            // Map data dari backend ke format yang diharapkan
            const mappedResults = sorted.map((item) => ({
                id: item.id,
                studentName: item.student_name,
                score: item.score,
                maxScore: item.max_score,
                timeUsed: item.time_used,
                submittedAt: item.submitted_at,
            }));
            setResults(mappedResults);
        } catch (error) {
            console.error('Error loading results:', error);
            // Tetap set empty array jika error
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getPercentage = (score, maxScore) => {
        return Math.round((score / maxScore) * 100);
    };

    const getGradeColor = (percentage) => {
        if (percentage >= 80) return '#2ecc71';
        if (percentage >= 60) return '#4A90E2';
        return '#e74c3c';
    };

    const renderResultItem = ({ item, index }) => {
        const percentage = getPercentage(item.score, item.maxScore);
        const gradeColor = getGradeColor(percentage);

        return (
            <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                    <View style={styles.resultNumber}>
                        <Text style={styles.resultNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.resultInfo}>
                        <Text style={styles.studentName}>{item.studentName}</Text>
                        <Text style={styles.submittedDate}>
                            {formatDate(item.submittedAt)}
                        </Text>
                    </View>
                    <View style={[styles.scoreBadge, { backgroundColor: gradeColor + '15' }]}>
                        <Text style={[styles.scoreText, { color: gradeColor }]}>
                            {item.score}/{item.maxScore}
                        </Text>
                    </View>
                </View>
                <View style={styles.resultFooter}>
                    <View style={styles.percentageContainer}>
                        <View style={styles.progressBar}>
                            <View
                                style={[
                                    styles.progressFill,
                                    { width: `${percentage}%`, backgroundColor: gradeColor },
                                ]}
                            />
                        </View>
                        <Text style={[styles.percentageText, { color: gradeColor }]}>
                            {percentage}%
                        </Text>
                    </View>
                    {item.timeUsed !== null && item.timeUsed !== undefined && (
                        <Text style={styles.timeText}>
                            Waktu: {Math.floor(item.timeUsed / 60)}:{String(item.timeUsed % 60).padStart(2, '0')}
                        </Text>
                    )}
                </View>
            </View>
        );
    };

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
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Hasil Kuis</Text>
                    <Text style={styles.headerSubtitle}>{quiz.title}</Text>
                </View>
                <View style={{ width: 36 }} />
            </View>

            {results.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIcon}>
                        <Text style={styles.emptyIconText}>=</Text>
                    </View>
                    <Text style={styles.emptyText}>Belum ada hasil</Text>
                    <Text style={styles.emptySubtext}>
                        Hasil kuis akan muncul di sini setelah siswa mengisi kuis
                    </Text>
                </View>
            ) : (
                <View style={styles.content}>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Total Peserta</Text>
                            <Text style={styles.summaryValue}>{results.length}</Text>
                        </View>
                        <View style={styles.summaryDivider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Rata-rata</Text>
                            <Text style={styles.summaryValue}>
                                {Math.round(
                                    (results.reduce((sum, r) => sum + (r.score / r.maxScore) * 100, 0) /
                                        results.length)
                                )}
                                %
                            </Text>
                        </View>
                    </View>

                    <FlatList
                        data={results}
                        renderItem={renderResultItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
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
        fontSize: 13,
        color: '#7F8C8D',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    summaryItem: {
        flex: 1,
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 13,
        color: '#7F8C8D',
        marginBottom: 8,
        fontWeight: '600',
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2C3E50',
    },
    summaryDivider: {
        width: 1,
        backgroundColor: '#E1E8ED',
        marginHorizontal: 20,
    },
    listContent: {
        paddingBottom: 16,
    },
    resultCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },
    resultHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    resultNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#EBF5FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    resultNumberText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#4A90E2',
    },
    resultInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    submittedDate: {
        fontSize: 12,
        color: '#7F8C8D',
    },
    scoreBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    scoreText: {
        fontSize: 14,
        fontWeight: '700',
    },
    resultFooter: {
        marginTop: 8,
    },
    percentageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#E1E8ED',
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: 12,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    percentageText: {
        fontSize: 14,
        fontWeight: '700',
        minWidth: 45,
    },
    timeText: {
        fontSize: 12,
        color: '#7F8C8D',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EBF5FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4A90E2',
        borderStyle: 'dashed',
    },
    emptyIconText: {
        fontSize: 32,
        fontWeight: '300',
        color: '#4A90E2',
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
        lineHeight: 20,
    },
});

