import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './Progress';
import Question from './Questions';
import NavigationControls from './NavigationControllers';

// Define TypeScript interfaces
interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  userAnswers: string[];
  isLoading: boolean;
  error: string | null;
}

const QuizContainer = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    isLoading: true,
    error: null,
  });

  const playerName = localStorage.getItem('quizPlayerName');

  useEffect(() => {
    // Redirect if no name is provided
    if (!playerName) {
      navigate('/');
      return;
    }

    // Fetch questions from API
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10');
        const data = await response.json();
        
        if (data.response_code === 0) {
          // Initialize userAnswers array with empty strings
          const emptyAnswers = new Array(data.results.length).fill('');
          
          setQuizState(prevState => ({
            ...prevState,
            questions: data.results,
            userAnswers: emptyAnswers,
            isLoading: false,
          }));
        } else {
          throw new Error('Failed to fetch questions');
        }
      } catch (err) {
        setQuizState(prevState => ({
          ...prevState,
          isLoading: false,
          error: 'Failed to load questions. Please try again.',
        }));
      }
    };

    fetchQuestions();
  }, [navigate, playerName]);

  const handleAnswerSelect = (answer: string) => {
    const newUserAnswers = [...quizState.userAnswers];
    newUserAnswers[quizState.currentQuestionIndex] = answer;
    
    setQuizState(prevState => ({
      ...prevState,
      userAnswers: newUserAnswers,
    }));
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState(prevState => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      }));
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prevState => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex - 1,
      }));
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate results and store them
    const score = quizState.userAnswers.reduce((total, answer, index) => {
      return answer === quizState.questions[index].correct_answer
        ? total + 1
        : total;
    }, 0);

    // Store results in localStorage
    localStorage.setItem('quizResults', JSON.stringify({
      score,
      totalQuestions: quizState.questions.length,
      answers: quizState.userAnswers,
    }));

    // Navigate to results page
    navigate('/results');
  };

  if (quizState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (quizState.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{quizState.error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Trivia Master Quiz</h1>
            <div className="text-gray-600">Hi, {playerName}!</div>
          </div>
          
          <ProgressBar 
            progress={progress} 
            currentQuestion={quizState.currentQuestionIndex + 1} 
            totalQuestions={quizState.questions.length} 
          />

          <Question 
            question={currentQuestion}
            selectedAnswer={quizState.userAnswers[quizState.currentQuestionIndex]}
            onSelectAnswer={handleAnswerSelect}
          />

          <NavigationControls 
            currentIndex={quizState.currentQuestionIndex}
            totalQuestions={quizState.questions.length}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            onSubmit={handleSubmitQuiz}
            isAnswerSelected={!!quizState.userAnswers[quizState.currentQuestionIndex]}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;