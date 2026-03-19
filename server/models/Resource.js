const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Resource title is required']
  },
  type: {
    type: String,
    enum: ["video", "pdf", "website", "article", "practice_test", "notes"],
    required: true
  },
  url: {
    type: String,
    required: [true, 'Resource URL is required']
  },
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  branch: {
    type: String
  },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"]
  },
  duration: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4
  },
  description: {
    type: String
  },
  tags: [{
    type: String
  }],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);