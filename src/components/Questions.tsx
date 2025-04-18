import { useState, useEffect } from 'react';

interface QuestionProps {
  question: {
    category: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  selectedAnswer: string;
  onSelectAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ 
  question, 
  selectedAnswer, 
  onSelectAnswer 
}) => {
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

  // Helper function to decode HTML entities
  const decodeHTML = (html: string) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

  useEffect(() => {
    // Combine and shuffle answers
    const allAnswers = [
      question.correct_answer, 
      ...question.incorrect_answers
    ];
    
    // Fisher-Yates shuffle algorithm
    const shuffled = [...allAnswers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    setShuffledAnswers(shuffled);
  }, [question]);

  // Difficulty badge color
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  }[question.difficulty.toLowerCase()] || 'bg-gray-100 text-gray-800';

  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-4">
        <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
          {decodeHTML(question.category)}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded ${difficultyColor}`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {decodeHTML(question.question)}
      </h2>
      
      <div className="space-y-3">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(answer)}
            className={`w-full py-3 px-4 border rounded-lg text-left transition-colors ${
              selectedAnswer === answer
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {decodeHTML(answer)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;