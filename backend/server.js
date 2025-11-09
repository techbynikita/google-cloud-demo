const express = require('express');
const cors = require('cors');
const { Firestore } = require('@google-cloud/firestore');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Initialize Firestore with specific database
const databaseId = process.env.FIRESTORE_DATABASE || 'techbynikita-default';
const firestore = new Firestore({
  databaseId: databaseId
});

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    service: 'feedback-wall-backend',
    status: 'running',
    endpoints: {
      health: '/health',
      getFeedback: 'GET /api/feedback',
      postFeedback: 'POST /api/feedback'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'feedback-wall-backend' });
});

// Get all feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedbackRef = firestore.collection('feedback');
    const snapshot = await feedbackRef.orderBy('timestamp', 'desc').get();
    
    const feedback = [];
    snapshot.forEach(doc => {
      feedback.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Create new feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { message, author } = req.body;
    
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const feedbackData = {
      message: message.trim(),
      author: author || 'Anonymous',
      timestamp: Firestore.FieldValue.serverTimestamp(),
      createdAt: new Date().toISOString()
    };
    
    const docRef = await firestore.collection('feedback').add(feedbackData);
    
    res.status(201).json({
      id: docRef.id,
      ...feedbackData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
});

// Delete feedback (optional)
app.delete('/api/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await firestore.collection('feedback').doc(id).delete();
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Connected to Firestore`);
});

