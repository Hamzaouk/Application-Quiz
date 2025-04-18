interface NavigationControlsProps {
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  isAnswerSelected: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentIndex,
  totalQuestions,
  onNext,
  onPrevious,
  onSubmit,
  isAnswerSelected
}) => {
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrevious}
        disabled={isFirstQuestion}
        className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
          isFirstQuestion
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-md'
        }`}
      >
        ← Previous
      </button>

      {isLastQuestion ? (
        <button
          onClick={onSubmit}
          disabled={!isAnswerSelected}
          className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
            !isAnswerSelected
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-md'
          }`}
        >
          Submit Quiz
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!isAnswerSelected}
          className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
            !isAnswerSelected
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md'
          }`}
        >
          Next →
        </button>
      )}
    </div>
  );
};

export default NavigationControls;