import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import LoginScreen from './components/Auth/LoginScreen';
import MainHomeScreen from './components/MainHomeScreen';
import QuizListScreen from './components/Creator/QuizListScreen';
import CreateQuizScreen from './components/Creator/CreateQuizScreen';
import AddQuestionScreen from './components/Creator/AddQuestionScreen';
import QuizCreatedScreen from './components/Creator/QuizCreatedScreen';
import QuizResultsScreen from './components/Creator/QuizResultsScreen';
import EnterCodeScreen from './components/Taker/EnterCodeScreen';
import TakeQuizScreen from './components/Taker/TakeQuizScreen';
import QuizResultScreen from './components/Taker/QuizResultScreen';
import SettingsScreen from './components/SettingsScreen';
import { submitQuizResult } from './services/api';
import { isAuthenticated, getUserData, clearAuthData } from './services/authStorage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState('home');
  const [mode, setMode] = useState(null); // 'creator' or 'taker'
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    timeLimit: '',
    questions: [],
  });
  const [currentQuestionType, setCurrentQuestionType] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [studentName, setStudentName] = useState('');

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        const userData = await getUserData();
        setCurrentUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setScreen('home');
  };

  const handleLogout = async () => {
    await clearAuthData();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setScreen('home');
    setMode(null);
  };

  // Main Home Screen
  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === 'creator') {
      // Creator mode perlu login
      if (!isLoggedIn) {
        setScreen('login');
        return;
      }
      setScreen('creator_list');
    } else {
      // Taker mode tidak perlu login
      setScreen('taker_enter_code');
    }
  };

  // Creator Mode Navigation
  const handleCreateNew = () => {
    setQuizData({
      title: '',
      description: '',
      timeLimit: '',
      questions: [],
    });
    setScreen('creator_create');
  };

  const handleAddQuestion = (questionType) => {
    setCurrentQuestionType(questionType);
    setScreen('creator_add_question');
  };

  const handleSaveQuestion = (question) => {
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, question],
    });
    setScreen('creator_create');
  };

  const handleQuizCreated = (quiz) => {
    setCurrentQuiz(quiz);
    setScreen('creator_created');
  };

  const handleBackToCreatorList = () => {
    setScreen('creator_list');
    setCurrentQuiz(null);
  };

  const handleSelectQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    // Bisa ditambahkan fitur edit atau view detail
    setScreen('creator_list');
  };

  const handleViewResults = (quiz) => {
    setCurrentQuiz(quiz);
    setScreen('creator_results');
  };

  // Taker Mode Navigation
  const handleQuizFound = (quiz, name) => {
    setCurrentQuiz(quiz);
    setStudentName(name);
    setScreen('taker_quiz');
  };

  const handleFinishQuiz = async (result) => {
    // Simpan hasil dengan nama siswa
    const resultWithName = {
      ...result,
      studentName: studentName,
    };
    setQuizResult(resultWithName);

    // Simpan ke backend API
    try {
      await submitQuizResult({
        quizId: currentQuiz.id,
        studentName: studentName,
        score: result.score,
        maxScore: result.maxScore,
        answers: result.answers,
        timeUsed: result.timeUsed,
      });
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      // Tetap lanjutkan ke result screen meskipun ada error
    }

    setScreen('taker_result');
  };

  const handleRestartQuiz = () => {
    setQuizResult(null);
    setScreen('taker_quiz');
  };

  const handleBackToHome = () => {
    setScreen('home');
    setMode(null);
    setCurrentQuiz(null);
    setQuizResult(null);
    setStudentName('');
    // Force re-render MainHomeScreen untuk update statistik
    setScreen('home_refresh');
    setTimeout(() => setScreen('home'), 10);
  };

  const handleOpenSettings = () => {
    setScreen('settings');
  };

  const handleBackFromSettings = () => {
    setScreen('home');
  };

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Memuat...</Text>
      </View>
    );
  }

  // Show login screen if not logged in and trying to access creator mode
  if (!isLoggedIn && (screen === 'login' || screen === 'creator_list' || screen === 'creator_create')) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Main Home */}
      {(screen === 'home' || screen === 'home_refresh') && (
        <MainHomeScreen
          onSelectMode={handleSelectMode}
          onOpenSettings={handleOpenSettings}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {/* Settings */}
      {screen === 'settings' && (
        <SettingsScreen onBack={handleBackFromSettings} />
      )}

      {/* Creator Mode */}
      {screen === 'creator_list' && (
        <QuizListScreen
          onCreateNew={handleCreateNew}
          onSelectQuiz={handleSelectQuiz}
          onViewResults={handleViewResults}
          onBack={handleBackToHome}
        />
      )}
      {screen === 'creator_create' && (
        <CreateQuizScreen
          onBack={handleBackToCreatorList}
          onAddQuestion={handleAddQuestion}
          quizData={quizData}
          setQuizData={setQuizData}
          onQuizCreated={handleQuizCreated}
        />
      )}
      {screen === 'creator_add_question' && (
        <AddQuestionScreen
          questionType={currentQuestionType}
          onSave={handleSaveQuestion}
          onCancel={() => setScreen('creator_create')}
        />
      )}
      {screen === 'creator_created' && currentQuiz && (
        <QuizCreatedScreen quiz={currentQuiz} onBack={handleBackToCreatorList} />
      )}
      {screen === 'creator_results' && currentQuiz && (
        <QuizResultsScreen quiz={currentQuiz} onBack={handleBackToCreatorList} />
      )}

      {/* Taker Mode */}
      {screen === 'taker_enter_code' && (
        <EnterCodeScreen onQuizFound={handleQuizFound} onBack={handleBackToHome} />
      )}
      {screen === 'taker_quiz' && currentQuiz && (
        <TakeQuizScreen quiz={currentQuiz} studentName={studentName} onFinish={handleFinishQuiz} />
      )}
      {screen === 'taker_result' && currentQuiz && quizResult && (
        <QuizResultScreen
          result={quizResult}
          quiz={currentQuiz}
          onRestart={handleRestartQuiz}
          onBack={handleBackToHome}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7F8C8D',
  },
});
