const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  allocated_hours: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completion_time: {
    type: Number
  },
  difficulty_rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

const studyPlanSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  topics: [topicSchema],
  total_planned_hours: {
    type: Number
  },
  actual_hours: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('StudyPlan', studyPlanSchema);