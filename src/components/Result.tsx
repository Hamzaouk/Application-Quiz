import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuizResults {
  score: number;
  totalQuestions: number;
  answers: string[];
}

const ResultsPage = () => {
  const [results, setResults] = useState<QuizResults | null>(null);
  const [playerName, setPlayerName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get player name
    const storedName = localStorage.getItem('quizPlayerName');
    if (storedName) {
      setPlayerName(storedName);
    } else {
      navigate('/');
      return;
    }

    // Get quiz results
    const storedResults = localStorage.getItem('quizResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handlePlayAgain = () => {
    // Keep the player name but clear results
    localStorage.removeItem('quizResults');
    navigate('/quiz');
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading results...</p>
        </div>
      </div>
    );
  }

  const percentage = Math.round((results.score / results.totalQuestions) * 100);
  
  // Determine result message based on score
  let resultMessage = '';
  let resultEmoji = '';
  
  if (percentage >= 90) {
    resultMessage = 'Outstanding! You\'re a trivia master!';
    resultEmoji = '🏆';
  } else if (percentage >= 70) {
    resultMessage = 'Great job! You know your stuff!';
    resultEmoji = '🎉';
  } else if (percentage >= 50) {
    resultMessage = 'Not bad! Room for improvement.';
    resultEmoji = '👍';
  } else {
    resultMessage = 'Keep practicing, you\'ll get better!';
    resultEmoji = '📚';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{resultEmoji}</div>
          <h1 className="text-3xl font-bold text-gray-800">Quiz Results</h1>
          <p className="text-gray-600 mt-2">Great effort, {playerName}!</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-blue-600">{results.score} / {results.totalQuestions}</div>
            <p className="text-gray-600">Correct Answers</p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className={`h-4 rounded-full ${
                percentage >= 70 ? 'bg-green-600' : 
                percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <div className="text-center text-sm text-gray-600">{percentage}%</div>
        </div>

        <div className="text-center mb-6">
          <p className="text-lg font-medium text-gray-800">{resultMessage}</p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handlePlayAgain}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Play Again
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;