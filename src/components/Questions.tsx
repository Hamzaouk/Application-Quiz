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
    easy: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    hard: 'bg-red-100 text-red-800 border-red-200'
  }[question.difficulty.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';

  return (
    <div className="mb-8">
      <div className="flex gap-2 mb-4">
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-200">
          {decodeHTML(question.category)}
        </span>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${difficultyColor} border`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-6 border border-indigo-100">
        <h2 className="text-xl font-medium text-gray-800">
          {decodeHTML(question.question)}
        </h2>
      </div>
      
      <div className="space-y-3">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(answer)}
            className={`w-full py-4 px-5 border-2 rounded-lg text-left transition-all duration-200 flex items-center ${
              selectedAnswer === answer
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white text-gray-800 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm ${
              selectedAnswer === answer 
                ? 'bg-white text-indigo-600' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1">{decodeHTML(answer)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;