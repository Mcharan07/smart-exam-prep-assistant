// const mongoose = require('mongoose');

// const progressSchema = new mongoose.Schema({
//   exam_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Exam',
//     required: true
//   },
//   topic: {
//     type: String,
//     required: true
//   },
//   completion_percentage: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 100
//   },
//   time_spent: {
//     type: Number,
//     default: 0
//   },
//   difficulty_experienced: {
//     type: String,
//     enum: ["easy", "medium", "hard"]
//   },
//   confidence_level: {
//     type: Number,
//     min: 1,
//     max: 10,
//     default: 5
//   },
//   resources_used: [{
//     type: String
//   }],
//   last_studied: {
//     type: Date,
//     default: Date.now
//   },
//   revision_count: {
//     type: Number,
//     default: 0
//   },
//   created_by: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Progress', progressSchema);


const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  completion_percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  time_spent: {
    type: Number,
    default: 0
  },
  difficulty_experienced: {
    type: String,
    enum: ["easy", "medium", "hard"]
  },
  confidence_level: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  resources_used: [{
    type: String
  }],
  last_studied: {
    type: Date,
    default: Date.now
  },
  revision_count: {
    type: Number,
    default: 0
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Progress', progressSchema);