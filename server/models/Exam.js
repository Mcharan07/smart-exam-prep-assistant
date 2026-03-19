const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exam name is required']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  degree: {
    type: String,
    enum: ["High School", "Bachelor's", "Master's", "PhD", "Professional Certification"],
    required: true
  },
  branch: {
    type: String,
    enum: ["Computer Science", "Electronics", "Mechanical", "Civil", "Chemical", "Electrical", "Mathematics", "Physics", "Chemistry", "Biology", "Business", "Economics", "Literature", "History", "Medicine", "Law", "Psychology", "Other"],
    required: true
  },
  exam_date: {
    type: Date,
    required: [true, 'Exam date is required']
  },
  daily_study_hours: {
    type: Number,
    required: true,
    min: 0.5,
    max: 16
  },
  priority_topics: [{
    type: String
  }],
  weak_topics: [{
    type: String
  }],
  syllabus_text: {
    type: String
  },
  syllabus_image_url: {
    type: String
  },
  status: {
    type: String,
    enum: ["active", "completed", "paused"],
    default: "active"
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Exam', examSchema);