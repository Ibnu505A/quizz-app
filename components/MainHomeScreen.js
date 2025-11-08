import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MainHomeScreen({ onSelectMode, onOpenSettings, currentUser, onLogout }) {
    return (
        <View style={styles.container}>
            {/* Background Decoration - Acak tapi Estetis */}
            <View style={styles.backgroundDecoration}>
                {/* Rumus Matematika & Fisika - Posisi Acak */}
                <Text style={styles.formula1}>E = mc²</Text>
                <Text style={styles.formula2}>F = ma</Text>
                <Text style={styles.formula3}>V = πr²h</Text>
                <Text style={styles.formula4}>a² + b² = c²</Text>
                <Text style={styles.formula5}>PV = nRT</Text>
                <Text style={styles.formula6}>E = ½mv²</Text>
                <Text style={styles.formula7}>F = kx</Text>
                <Text style={styles.formula8}>λ = v/f</Text>
                <Text style={styles.formula9}>sin²θ + cos²θ = 1</Text>
                <Text style={styles.formula10}>W = F × d</Text>

                {/* Tulisan Motivasi - Posisi Acak */}
                <Text style={styles.motivation1}>"Belajar adalah investasi terbaik"</Text>
                <Text style={styles.motivation2}>"Practice makes perfect"</Text>
                <Text style={styles.motivation3}>"Knowledge is power"</Text>
                <Text style={styles.motivation4}>"Never stop learning"</Text>

                {/* Simbol Matematika - Posisi Acak */}
                <Text style={styles.symbol1}>∫</Text>
                <Text style={styles.symbol2}>∑</Text>
                <Text style={styles.symbol3}>π</Text>
                <Text style={styles.symbol4}>∞</Text>
                <Text style={styles.symbol5}>√</Text>
                <Text style={styles.symbol6}>Δ</Text>
                <Text style={styles.symbol7}>α</Text>
                <Text style={styles.symbol8}>θ</Text>
            </View>

            <View style={styles.content}>
                {/* Top Bar */}
                <View style={styles.topBar}>
                    {currentUser && (
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{currentUser.name}</Text>
                            <TouchableOpacity
                                style={styles.logoutButton}
                                onPress={onLogout}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.logoutText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {onOpenSettings && (
                        <TouchableOpacity
                            style={styles.settingsButton}
                            onPress={onOpenSettings}
                            activeOpacity={0.7}
                        >
                            <View style={styles.settingsButtonContainer}>
                                <Text style={styles.settingsIcon}>⚙</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.contentBox}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <View style={styles.logoWrapper}>
                            <LinearGradient
                                colors={['#4A90E2', '#357ABD']}
                                style={styles.logoCircle}
                            >
                                <Text style={styles.logoText}>Q</Text>
                            </LinearGradient>
                        </View>
                        <Text style={styles.title}>Quiz App</Text>
                        <View style={styles.divider} />
                        <Text style={styles.subtitle}>
                            Buat dan kelola kuis dengan mudah
                        </Text>
                    </View>

                    {/* Button Container */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onSelectMode('creator')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#4A90E2', '#357ABD']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <View style={styles.buttonContent}>
                                    <View style={styles.buttonIconWrapper}>
                                        <Text style={styles.buttonIcon}>+</Text>
                                    </View>
                                    <View style={styles.buttonTextWrapper}>
                                        <Text style={styles.buttonTitle}>Buat Kuis</Text>
                                        <Text style={styles.buttonDescription}>
                                            Buat kuis interaktif untuk siswa Anda
                                        </Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onSelectMode('taker')}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={['#5B9BD5', '#4472C4']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <View style={styles.buttonContent}>
                                    <View style={styles.buttonIconWrapper}>
                                        <Text style={styles.buttonIcon}>→</Text>
                                    </View>
                                    <View style={styles.buttonTextWrapper}>
                                        <Text style={styles.buttonTitle}>Isi Kuis</Text>
                                        <Text style={styles.buttonDescription}>
                                            Masukkan kode untuk mengisi kuis
                                        </Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    backgroundDecoration: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    // Rumus - Posisi Acak dengan Rotasi
    formula1: {
        position: 'absolute',
        top: '12%',
        left: '8%',
        fontSize: 22,
        color: '#357ABD',
        opacity: 0.35,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '-8deg' }],
    },
    formula2: {
        position: 'absolute',
        top: '25%',
        right: '12%',
        fontSize: 20,
        color: '#4A90E2',
        opacity: 0.3,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '12deg' }],
    },
    formula3: {
        position: 'absolute',
        top: '40%',
        left: '15%',
        fontSize: 19,
        color: '#2E5C8A',
        opacity: 0.35,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '-15deg' }],
    },
    formula4: {
        position: 'absolute',
        top: '55%',
        right: '8%',
        fontSize: 21,
        color: '#357ABD',
        opacity: 0.3,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '18deg' }],
    },
    formula5: {
        position: 'absolute',
        top: '18%',
        left: '25%',
        fontSize: 20,
        color: '#5B9BD5',
        opacity: 0.32,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '-5deg' }],
    },
    formula6: {
        position: 'absolute',
        top: '65%',
        left: '10%',
        fontSize: 19,
        color: '#4A90E2',
        opacity: 0.33,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '10deg' }],
    },
    formula7: {
        position: 'absolute',
        top: '48%',
        right: '20%',
        fontSize: 21,
        color: '#357ABD',
        opacity: 0.3,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '-12deg' }],
    },
    formula8: {
        position: 'absolute',
        top: '72%',
        right: '15%',
        fontSize: 20,
        color: '#2E5C8A',
        opacity: 0.35,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '15deg' }],
    },
    formula9: {
        position: 'absolute',
        top: '35%',
        left: '5%',
        fontSize: 18,
        color: '#5B9BD5',
        opacity: 0.3,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '-20deg' }],
    },
    formula10: {
        position: 'absolute',
        top: '80%',
        left: '20%',
        fontSize: 19,
        color: '#4A90E2',
        opacity: 0.32,
        fontWeight: '500',
        fontStyle: 'italic',
        transform: [{ rotate: '8deg' }],
    },
    // Tulisan Motivasi - Posisi Acak
    motivation1: {
        position: 'absolute',
        top: '8%',
        right: '25%',
        fontSize: 16,
        color: '#2E5C8A',
        opacity: 0.3,
        fontWeight: '600',
        fontStyle: 'italic',
        transform: [{ rotate: '5deg' }],
        letterSpacing: 1,
    },
    motivation2: {
        position: 'absolute',
        top: '60%',
        left: '30%',
        fontSize: 15,
        color: '#357ABD',
        opacity: 0.28,
        fontWeight: '600',
        fontStyle: 'italic',
        transform: [{ rotate: '-8deg' }],
        letterSpacing: 1.2,
    },
    motivation3: {
        position: 'absolute',
        top: '85%',
        right: '10%',
        fontSize: 16,
        color: '#4A90E2',
        opacity: 0.3,
        fontWeight: '600',
        fontStyle: 'italic',
        transform: [{ rotate: '12deg' }],
        letterSpacing: 1,
    },
    motivation4: {
        position: 'absolute',
        top: '30%',
        right: '5%',
        fontSize: 15,
        color: '#2E5C8A',
        opacity: 0.28,
        fontWeight: '600',
        fontStyle: 'italic',
        transform: [{ rotate: '-15deg' }],
        letterSpacing: 1.2,
    },
    // Simbol Matematika - Posisi Acak
    symbol1: {
        position: 'absolute',
        top: '15%',
        left: '18%',
        fontSize: 75,
        color: '#4A90E2',
        opacity: 0.18,
        transform: [{ rotate: '-25deg' }],
    },
    symbol2: {
        position: 'absolute',
        top: '45%',
        right: '12%',
        fontSize: 85,
        color: '#357ABD',
        opacity: 0.2,
        transform: [{ rotate: '30deg' }],
    },
    symbol3: {
        position: 'absolute',
        top: '70%',
        left: '8%',
        fontSize: 80,
        color: '#5B9BD5',
        opacity: 0.18,
        transform: [{ rotate: '-18deg' }],
    },
    symbol4: {
        position: 'absolute',
        top: '32%',
        right: '22%',
        fontSize: 90,
        color: '#4A90E2',
        opacity: 0.2,
        transform: [{ rotate: '22deg' }],
    },
    symbol5: {
        position: 'absolute',
        top: '58%',
        left: '22%',
        fontSize: 70,
        color: '#357ABD',
        opacity: 0.18,
        transform: [{ rotate: '-30deg' }],
    },
    symbol6: {
        position: 'absolute',
        top: '78%',
        right: '18%',
        fontSize: 75,
        color: '#2E5C8A',
        opacity: 0.2,
        transform: [{ rotate: '15deg' }],
    },
    symbol7: {
        position: 'absolute',
        top: '22%',
        left: '12%',
        fontSize: 65,
        color: '#5B9BD5',
        opacity: 0.18,
        transform: [{ rotate: '-12deg' }],
    },
    symbol8: {
        position: 'absolute',
        top: '50%',
        right: '5%',
        fontSize: 72,
        color: '#4A90E2',
        opacity: 0.19,
        transform: [{ rotate: '28deg' }],
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 48,
        zIndex: 1,
    },
    contentBox: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 28,
        marginHorizontal: 16,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(74, 144, 226, 0.08)',
    },
    header: {
        alignItems: 'center',
        marginBottom: 36,
    },
    logoWrapper: {
        marginBottom: 16,
    },
    logoCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    logoText: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 12,
        letterSpacing: -0.5,
    },
    divider: {
        width: 60,
        height: 3,
        backgroundColor: '#4A90E2',
        borderRadius: 2,
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 15,
        color: '#7F8C8D',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 8,
    },
    buttonContainer: {
        gap: 14,
    },
    button: {
        borderRadius: 14,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
    },
    buttonGradient: {
        padding: 18,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonIconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    buttonIcon: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
    },
    buttonTextWrapper: {
        flex: 1,
    },
    buttonTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
        letterSpacing: 0.2,
    },
    buttonDescription: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.92)',
        lineHeight: 18,
    },
    topBar: {
        position: 'absolute',
        top: 50,
        left: 24,
        right: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C3E50',
        marginRight: 8,
    },
    logoutButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    logoutText: {
        fontSize: 12,
        color: '#E74C3C',
        fontWeight: '600',
    },
    settingsButton: {
        zIndex: 2,
    },
    settingsButtonContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    settingsIcon: {
        fontSize: 20,
        color: '#4A90E2',
        fontWeight: '700',
    },
});
