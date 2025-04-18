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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-purple-100">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Trivia Master
          </div>
          <p className="text-gray-600 mt-2 text-lg">Challenge yourself with exciting trivia!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              placeholder="Your name"
            />
            {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-md"
          >
            Start Quiz
          </button>
        </form>

        {name && (
          <div className="mt-6 text-center">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <p className="text-indigo-800 font-medium">
                Welcome back, {name}!
              </p>
              <p className="text-indigo-600 text-sm mt-1">
                Ready for another challenge?
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;