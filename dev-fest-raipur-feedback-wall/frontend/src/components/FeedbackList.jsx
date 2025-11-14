function FeedbackList({ feedback }) {
  if (feedback.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
        <div className="text-6xl mb-4">💭</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No feedback yet
        </h3>
        <p className="text-gray-500">
          Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    let date;
    try {
      // Handle Firestore Timestamp objects
      if (timestamp && typeof timestamp === 'object' && timestamp.toDate) {
        date = timestamp.toDate();
      } else {
        // Handle ISO string or other date formats
        date = new Date(timestamp);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Just now';
      }
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Just now';
    }
    
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        📊 Live Feedback ({feedback.length})
      </h2>
      <div className="space-y-4">
        {feedback.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 animate-in fade-in slide-in-from-bottom-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-google-blue to-google-blue/80 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {item.author ? item.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.author || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(item.timestamp)}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackList;

