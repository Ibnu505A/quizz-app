import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Switch,
    Alert,
    Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen({ onBack }) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '' });

    const handleAbout = () => {
        setModalContent({
            title: 'Tentang Aplikasi',
            content: `QUIZ APP\n\nVersi 1.0.0\n\nAplikasi Quiz App adalah platform pembelajaran interaktif yang dirancang untuk membantu guru membuat, mengelola, dan membagikan kuis kepada siswa dengan mudah dan efisien.\n\nDESKRIPSI\nQuiz App memungkinkan guru untuk membuat berbagai jenis kuis dengan berbagai format pertanyaan, sementara siswa dapat mengisi kuis dengan antarmuka yang user-friendly.\n\nFITUR UTAMA\n• Pembuatan Kuis: Buat kuis dengan berbagai jenis pertanyaan (Pilihan Ganda, Isian Singkat, Benar/Salah)\n• Kode Unik: Setiap kuis memiliki kode unik 6 karakter untuk kemudahan berbagi\n• Timer Otomatis: Atur waktu pengerjaan untuk setiap kuis\n• Penilaian Otomatis: Sistem penilaian otomatis dengan review jawaban\n• Manajemen Hasil: Guru dapat melihat hasil dan nilai semua siswa\n• Keamanan: Pencegahan screenshot saat quiz berlangsung\n• Penyimpanan Lokal: Semua data disimpan secara lokal di perangkat\n\nTUJUAN\nAplikasi ini dibuat untuk mendukung proses pembelajaran yang lebih interaktif dan efisien, memungkinkan guru untuk melakukan evaluasi dengan mudah dan siswa untuk belajar melalui kuis yang menarik.\n\n© 2024 Quiz App. All rights reserved.`,
        });
        setModalVisible(true);
    };

    const handlePrivacyPolicy = () => {
        setModalContent({
            title: 'Kebijakan Privasi',
            content: `KEBIJAKAN PRIVASI QUIZ APP\n\nTerakhir diperbarui: ${new Date().toLocaleDateString('id-ID')}\n\n1. PENDAHULUAN\nKami menghormati privasi Anda dan berkomitmen untuk melindungi informasi pribadi yang Anda berikan kepada kami. Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.\n\n2. INFORMASI YANG KAMI KUMPULKAN\nAplikasi ini mengumpulkan informasi berikut:\n• Nama siswa yang dimasukkan saat mengisi kuis\n• Jawaban dan hasil kuis\n• Data kuis yang dibuat oleh guru (judul, deskripsi, pertanyaan)\n• Waktu pengerjaan kuis (jika diaktifkan)\n\n3. CARA KAMI MENGGUNAKAN INFORMASI\nInformasi yang dikumpulkan digunakan untuk:\n• Menyimpan dan menampilkan hasil kuis kepada guru\n• Menghitung dan menampilkan nilai siswa\n• Menyimpan kuis yang dibuat untuk digunakan kembali\n• Menyediakan fitur ranking berdasarkan nilai dan waktu\n\n4. PENYIMPANAN DATA\n• Semua data disimpan secara lokal di perangkat Anda menggunakan AsyncStorage\n• Data tidak dikirim ke server eksternal atau pihak ketiga\n• Data hanya dapat diakses melalui aplikasi di perangkat yang sama\n\n5. KEAMANAN DATA\nKami menerapkan langkah-langkah keamanan berikut:\n• Penyimpanan data lokal di perangkat\n• Pencegahan screenshot saat quiz berlangsung\n• Tidak ada transmisi data ke server eksternal\n• Akses data terbatas pada aplikasi\n\n6. HAK ANDA\nSebagai pengguna, Anda memiliki hak untuk:\n• Mengakses data yang tersimpan di aplikasi\n• Menghapus semua data kapan saja melalui pengaturan\n• Menolak memberikan informasi tertentu (namun mungkin membatasi penggunaan fitur)\n• Meminta informasi tentang data yang disimpan\n\n7. BERBAGI INFORMASI\nKami tidak membagikan informasi Anda kepada pihak ketiga. Semua data tetap berada di perangkat Anda.\n\n8. RETENSI DATA\nData akan disimpan selama aplikasi terinstall di perangkat Anda. Anda dapat menghapus semua data kapan saja melalui fitur yang tersedia.\n\n9. PERUBAHAN KEBIJAKAN PRIVASI\nKami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui aplikasi atau pembaruan.\n\n10. KONTAK\nJika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami melalui aplikasi.\n\nDengan menggunakan aplikasi ini, Anda menyetujui kebijakan privasi ini.`,
        });
        setModalVisible(true);
    };

    const handleTerms = () => {
        setModalContent({
            title: 'Syarat & Ketentuan',
            content: `SYARAT & KETENTUAN PENGGUNAAN QUIZ APP\n\nTerakhir diperbarui: ${new Date().toLocaleDateString('id-ID')}\n\nDengan mengunduh, menginstal, atau menggunakan aplikasi Quiz App, Anda setuju untuk terikat oleh syarat dan ketentuan berikut. Jika Anda tidak setuju dengan syarat dan ketentuan ini, harap jangan menggunakan aplikasi ini.\n\n1. PENERIMAAN SYARAT\nDengan menggunakan aplikasi ini, Anda mengakui bahwa Anda telah membaca, memahami, dan setuju untuk terikat oleh syarat dan ketentuan ini.\n\n2. PENGGUNAAN APLIKASI\n2.1. Aplikasi ini disediakan untuk tujuan pendidikan dan pembelajaran.\n2.2. Anda setuju untuk menggunakan aplikasi sesuai dengan tujuan yang dimaksudkan.\n2.3. Dilarang menggunakan aplikasi untuk tujuan yang melanggar hukum atau merugikan pihak lain.\n\n3. KEWAJIBAN PENGGUNA\n3.1. Anda bertanggung jawab untuk menjaga kerahasiaan kode kuis yang diberikan.\n3.2. Anda setuju untuk tidak membagikan kode kuis kepada pihak yang tidak berwenang.\n3.3. Anda wajib memberikan informasi yang akurat dan benar saat menggunakan aplikasi.\n3.4. Dilarang melakukan kecurangan saat mengisi kuis, termasuk screenshot atau cara lain.\n\n4. KONTEN KUIS\n4.1. Guru bertanggung jawab penuh atas konten kuis yang dibuat.\n4.2. Konten kuis harus sesuai dengan norma dan hukum yang berlaku.\n4.3. Aplikasi tidak bertanggung jawab atas konten yang dibuat oleh pengguna.\n\n5. HASIL KUIS\n5.1. Hasil kuis bersifat final setelah disubmit.\n5.2. Penilaian dilakukan secara otomatis oleh sistem.\n5.3. Aplikasi tidak bertanggung jawab atas kesalahan dalam penilaian yang disebabkan oleh kesalahan input data.\n\n6. KEAMANAN\n6.1. Screenshot dicegah saat quiz berlangsung untuk menjaga integritas kuis.\n6.2. Anda setuju untuk tidak mencoba membypass fitur keamanan aplikasi.\n6.3. Setiap upaya untuk merusak atau mengganggu aplikasi dilarang.\n\n7. BATASAN TANGGUNG JAWAB\n7.1. Aplikasi disediakan "sebagaimana adanya" tanpa jaminan apapun.\n7.2. Kami tidak bertanggung jawab atas kehilangan data atau kerugian yang timbul dari penggunaan aplikasi.\n7.3. Kami tidak menjamin bahwa aplikasi akan bebas dari kesalahan atau gangguan.\n\n8. HAK KEKAYAAN INTELEKTUAL\n8.1. Semua hak kekayaan intelektual dalam aplikasi ini adalah milik kami.\n8.2. Anda tidak diperbolehkan untuk menyalin, memodifikasi, atau mendistribusikan aplikasi tanpa izin.\n\n9. PERUBAHAN LAYANAN\n9.1. Kami berhak mengubah, menangguhkan, atau menghentikan layanan kapan saja.\n9.2. Perubahan akan diberitahukan melalui aplikasi atau pembaruan.\n\n10. PEMUTUSAN\nKami berhak menghentikan akses Anda ke aplikasi jika Anda melanggar syarat dan ketentuan ini.\n\n11. HUKUM YANG BERLAKU\nSyarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia.\n\n12. PERUBAHAN SYARAT\nKami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku efektif setelah diterbitkan.\n\n13. PENERIMAAN\nDengan melanjutkan penggunaan aplikasi setelah perubahan syarat dan ketentuan, Anda dianggap telah menerima perubahan tersebut.\n\nJika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami.`,
        });
        setModalVisible(true);
    };

    const handleAboutUs = () => {
        setModalContent({
            title: 'Tentang Kami',
            content: `TENTANG KAMI\n\nQuiz App adalah aplikasi pembelajaran interaktif yang dikembangkan dengan tujuan membantu proses pembelajaran menjadi lebih efektif dan menyenangkan.\n\nVISI KAMI\nMenjadi platform pembelajaran digital terdepan yang memudahkan guru dan siswa dalam proses evaluasi pembelajaran.\n\nMISI KAMI\n• Menyediakan platform yang mudah digunakan untuk membuat dan mengelola kuis\n• Meningkatkan kualitas pembelajaran melalui evaluasi yang interaktif\n• Mendukung proses pembelajaran yang lebih efisien dan efektif\n• Menyediakan fitur keamanan untuk menjaga integritas evaluasi\n\nTIM PENGEMBANG\nQuiz App dikembangkan oleh tim yang berdedikasi untuk menciptakan solusi pembelajaran yang inovatif dan user-friendly.\n\nTEKNOLOGI\nAplikasi ini dibangun menggunakan teknologi modern:\n• React Native untuk pengembangan aplikasi mobile\n• Expo untuk kemudahan pengembangan dan deployment\n• AsyncStorage untuk penyimpanan data lokal\n\nKOMITMEN KAMI\nKami berkomitmen untuk terus mengembangkan dan meningkatkan aplikasi ini berdasarkan feedback dari pengguna. Setiap update akan membawa perbaikan dan fitur baru yang lebih baik.\n\n© 2024 Quiz App. All rights reserved.`,
        });
        setModalVisible(true);
    };

    const handleContactUs = () => {
        setModalContent({
            title: 'Hubungi Kami',
            content: `HUBUNGI KAMI\n\nKami senang mendengar dari Anda! Jika Anda memiliki pertanyaan, saran, atau membutuhkan bantuan, jangan ragu untuk menghubungi kami.\n\nEMAIL\nsupport@quizapp.com\n\nUntuk pertanyaan umum, dukungan teknis, atau feedback tentang aplikasi.\n\nWAKTU RESPON\nKami berusaha merespons semua pertanyaan dalam waktu 24-48 jam pada hari kerja.\n\nDUKUNGAN\nTim dukungan kami siap membantu Anda dengan:\n• Pertanyaan tentang penggunaan aplikasi\n• Masalah teknis yang Anda alami\n• Saran dan feedback untuk pengembangan aplikasi\n• Laporan bug atau masalah\n\nFEEDBACK\nKami sangat menghargai feedback dari pengguna. Pendapat Anda membantu kami untuk terus meningkatkan aplikasi ini.\n\nJika Anda memiliki ide fitur baru atau saran perbaikan, silakan kirimkan kepada kami melalui email di atas.\n\nTERIMA KASIH\nTerima kasih telah menggunakan Quiz App! Kami berharap aplikasi ini dapat membantu proses pembelajaran Anda.`,
        });
        setModalVisible(true);
    };

    const formatModalContent = (content) => {
        if (!content) return null;

        const lines = content.split('\n');
        const formattedLines = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (!line) {
                formattedLines.push(<View key={i} style={styles.modalSpacer} />);
                continue;
            }

            // Nomor bagian (seperti "1. PENDAHULUAN")
            if (/^\d+\.\s/.test(line)) {
                const parts = line.match(/^(\d+)\.\s(.+)$/);
                if (parts) {
                    formattedLines.push(
                        <View key={i} style={styles.modalSectionContainer}>
                            <View style={styles.modalSectionNumber}>
                                <Text style={styles.modalSectionNumberText}>{parts[1]}</Text>
                            </View>
                            <Text style={styles.modalSectionTitle}>{parts[2]}</Text>
                        </View>
                    );
                } else {
                    formattedLines.push(
                        <Text key={i} style={styles.modalText}>
                            {line}
                        </Text>
                    );
                }
            }
            // Bullet points
            else if (line.startsWith('•')) {
                formattedLines.push(
                    <View key={i} style={styles.modalBulletContainer}>
                        <Text style={styles.modalBullet}>•</Text>
                        <Text style={styles.modalBulletText}>{line.substring(1).trim()}</Text>
                    </View>
                );
            }
            // Sub-bullet (seperti "2.1.", "3.2.")
            else if (/^\d+\.\d+\./.test(line)) {
                formattedLines.push(
                    <View key={i} style={styles.modalSubBulletContainer}>
                        <Text style={styles.modalSubBulletText}>{line}</Text>
                    </View>
                );
            }
            // Sub-judul (seperti "DESKRIPSI", "FITUR UTAMA") - harus setelah nomor bagian
            else if (line === line.toUpperCase() && line.length > 3 && line.length < 50 && !line.startsWith('•') && !/^\d+\./.test(line)) {
                formattedLines.push(
                    <View key={i} style={styles.modalSubtitleContainer}>
                        <Text style={styles.modalSubtitle}>{line}</Text>
                    </View>
                );
            }
            // Teks biasa
            else {
                formattedLines.push(
                    <Text key={i} style={styles.modalText}>
                        {line}
                    </Text>
                );
            }
        }

        return formattedLines;
    };

    const SettingItem = ({ icon, title, subtitle, onPress, rightComponent, showArrow = true }) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={!onPress}
        >
            <View style={styles.settingItemLeft}>
                <View style={styles.settingIcon}>
                    <Text style={styles.settingIconText}>{icon}</Text>
                </View>
                <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{title}</Text>
                    {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            {rightComponent || (showArrow && <Text style={styles.settingArrow}>›</Text>)}
        </TouchableOpacity>
    );

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
                    <Text style={styles.headerTitle}>Pengaturan</Text>
                </View>
                <View style={{ width: 44 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* General Settings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Umum</Text>
                    <View style={styles.sectionContent}>
                        <SettingItem
                            icon="!"
                            title="Notifikasi"
                            subtitle="Aktifkan notifikasi untuk kuis"
                            rightComponent={
                                <Switch
                                    value={notificationsEnabled}
                                    onValueChange={setNotificationsEnabled}
                                    trackColor={{ false: '#E1E8ED', true: '#4A90E2' }}
                                    thumbColor="#fff"
                                />
                            }
                            showArrow={false}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="♪"
                            title="Suara"
                            subtitle="Aktifkan suara notifikasi"
                            rightComponent={
                                <Switch
                                    value={soundEnabled}
                                    onValueChange={setSoundEnabled}
                                    trackColor={{ false: '#E1E8ED', true: '#4A90E2' }}
                                    thumbColor="#fff"
                                />
                            }
                            showArrow={false}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="S"
                            title="Simpan Otomatis"
                            subtitle="Simpan progress secara otomatis"
                            rightComponent={
                                <Switch
                                    value={autoSaveEnabled}
                                    onValueChange={setAutoSaveEnabled}
                                    trackColor={{ false: '#E1E8ED', true: '#4A90E2' }}
                                    thumbColor="#fff"
                                />
                            }
                            showArrow={false}
                        />
                    </View>
                </View>

                {/* About */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tentang</Text>
                    <View style={styles.sectionContent}>
                        <SettingItem
                            icon="i"
                            title="Tentang Aplikasi"
                            subtitle="Informasi aplikasi dan versi"
                            onPress={handleAbout}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="P"
                            title="Kebijakan Privasi"
                            subtitle="Baca kebijakan privasi"
                            onPress={handlePrivacyPolicy}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="T"
                            title="Syarat & Ketentuan"
                            subtitle="Baca syarat dan ketentuan"
                            onPress={handleTerms}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="U"
                            title="Tentang Kami"
                            subtitle="Informasi tentang tim pengembang"
                            onPress={handleAboutUs}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="C"
                            title="Hubungi Kami"
                            subtitle="Kontak dan dukungan"
                            onPress={handleContactUs}
                        />
                    </View>
                </View>

                {/* Version Info */}
                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>Versi 1.0.0</Text>
                </View>
            </ScrollView>

            {/* Modal untuk menampilkan konten */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        style={styles.modalOverlayTouchable}
                        activeOpacity={1}
                        onPress={() => setModalVisible(false)}
                    />
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{modalContent.title}</Text>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={styles.modalCloseButton}
                            >
                                <Text style={styles.modalCloseText}>×</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            style={styles.modalScrollView}
                            contentContainerStyle={styles.modalContentContainer}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled={true}
                        >
                            <View style={styles.modalContentWrapper}>
                                {formatModalContent(modalContent.content)}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#7F8C8D',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    sectionContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
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
    settingIconText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4A90E2',
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 2,
    },
    settingSubtitle: {
        fontSize: 13,
        color: '#7F8C8D',
    },
    settingArrow: {
        fontSize: 20,
        color: '#BDC3C7',
        fontWeight: '300',
    },
    divider: {
        height: 1,
        backgroundColor: '#E1E8ED',
        marginLeft: 52,
    },
    versionContainer: {
        alignItems: 'center',
        paddingVertical: 24,
        marginBottom: 20,
    },
    versionText: {
        fontSize: 12,
        color: '#95A5A6',
        fontWeight: '500',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalOverlayTouchable: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '85%',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E8ED',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2C3E50',
        flex: 1,
    },
    modalCloseButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F8F9FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCloseText: {
        fontSize: 24,
        color: '#7F8C8D',
        fontWeight: '300',
    },
    modalScrollView: {
        flex: 1,
    },
    modalContentContainer: {
        padding: 20,
        paddingBottom: 30,
        flexGrow: 1,
    },
    modalContentWrapper: {
        flex: 1,
    },
    modalSpacer: {
        height: 12,
    },
    modalMainTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#4A90E2',
        marginBottom: 8,
        marginTop: 4,
        letterSpacing: 0.5,
    },
    modalSubtitleContainer: {
        marginTop: 20,
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: '#EBF5FB',
    },
    modalSubtitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#357ABD',
        letterSpacing: 0.3,
    },
    modalSectionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 16,
        marginBottom: 8,
    },
    modalSectionNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    modalSectionNumberText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
    },
    modalSectionTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        lineHeight: 24,
    },
    modalBulletContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 8,
        marginBottom: 4,
        marginLeft: 8,
    },
    modalBullet: {
        fontSize: 18,
        color: '#4A90E2',
        fontWeight: '700',
        marginRight: 10,
        marginTop: 2,
    },
    modalBulletText: {
        flex: 1,
        fontSize: 14,
        color: '#5D6D7E',
        lineHeight: 22,
    },
    modalSubBulletContainer: {
        marginLeft: 24,
        marginTop: 6,
        marginBottom: 4,
    },
    modalSubBulletText: {
        fontSize: 14,
        color: '#5D6D7E',
        lineHeight: 22,
    },
    modalText: {
        fontSize: 14,
        color: '#5D6D7E',
        lineHeight: 22,
        textAlign: 'left',
        marginTop: 8,
        marginBottom: 4,
    },
});
