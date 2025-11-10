import { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import Header from './components/Header';

// Use relative URL since frontend and backend are in same service
const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      // Use relative URL - same domain as frontend
      const url = API_URL ? `${API_URL}/api/feedback` : '/api/feedback';
      const response = await axios.get(url);
      setFeedback(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      console.error('Error details:', err.response?.data || err.message);
      setError(`Failed to load feedback: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
    // Poll for new feedback every 3 seconds
    const interval = setInterval(fetchFeedback, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (message, author) => {
    try {
      const url = API_URL ? `${API_URL}/api/feedback` : '/api/feedback';
      await axios.post(url, { message, author });
      await fetchFeedback(); // Refresh the list
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError(`Failed to submit feedback: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <FeedbackForm onSubmit={handleSubmit} />
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {loading && feedback.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading feedback...</p>
          </div>
        ) : (
          <FeedbackList feedback={feedback} />
        )}
      </main>
    </div>
  );
}

export default App;

