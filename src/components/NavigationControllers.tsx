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
          className={`px-4 py-2 rounded ${
            isFirstQuestion
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>
  
        {isLastQuestion ? (
          <button
            onClick={onSubmit}
            disabled={!isAnswerSelected}
            className={`px-4 py-2 rounded ${
              !isAnswerSelected
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={!isAnswerSelected}
            className={`px-4 py-2 rounded ${
              !isAnswerSelected
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next Question
          </button>
        )}
      </div>
    );
  };
  
  export default NavigationControls;