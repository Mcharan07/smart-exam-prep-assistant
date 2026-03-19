const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam'
  },
  message: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  topic: {
    type: String
  },
  message_type: {
    type: String,
    enum: ["question", "explanation", "study_tip", "schedule_help", "general"],
    default: "general"
  },
  helpful: {
    type: Boolean
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
