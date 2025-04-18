import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a stored name
    const storedName = localStorage.getItem('quizPlayerName');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name to continue');
      return;
    }
    
    // Store name in localStorage
    localStorage.setItem('quizPlayerName', name);
    
    // Navigate to quiz page
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Trivia Master</h1>
          <p className="text-gray-600 mt-2">Test your knowledge with fun trivia questions!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your name"
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Start Quiz
          </button>
        </form>

        {name && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Welcome back, {name}! Ready for another challenge?
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;