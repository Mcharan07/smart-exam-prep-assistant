// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// // Import routes
// const authRoutes = require('./routes/authRoutes');
// const examRoutes = require('./routes/examRoutes');
// const resourceRoutes = require('./routes/resourceRoutes');
// const studyPlanRoutes = require('./routes/studyPlanRoutes');
// const chatRoutes = require('./routes/chatRoutes');
// const progressRoutes = require('./routes/progressRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// // Database Connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/exams', examRoutes);
// app.use('/api/resources', resourceRoutes);
// app.use('/api/study-plans', studyPlanRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/progress', progressRoutes);

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({ status: 'OK', message: 'Server is running' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({ 
//     message: err.message || 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err : {}
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📡 Environment: ${process.env.NODE_ENV}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const examRoutes = require('./routes/examRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const studyPlanRoutes = require('./routes/studyPlanRoutes');
const chatRoutes = require('./routes/chatRoutes');
const progressRoutes = require('./routes/progressRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/study-plans', studyPlanRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/progress', progressRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
});