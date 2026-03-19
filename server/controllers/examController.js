// const Exam = require('../models/Exam');

// // @desc    Get all exams for logged in user
// // @route   GET /api/exams
// // @access  Private
// exports.getExams = async (req, res) => {
//   try {
//     const exams = await Exam.find({ created_by: req.user._id }).sort({ created_at: -1 });
//     res.json(exams);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Get single exam
// // @route   GET /api/exams/:id
// // @access  Private
// exports.getExamById = async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ 
//       _id: req.params.id, 
//       created_by: req.user._id 
//     });

//     if (!exam) {
//       return res.status(404).json({ message: 'Exam not found' });
//     }

//     res.json(exam);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Create new exam
// // @route   POST /api/exams
// // @access  Private
// exports.createExam = async (req, res) => {
//   try {
//     const examData = {
//       ...req.body,
//       created_by: req.user._id
//     };

//     const exam = await Exam.create(examData);
//     res.status(201).json(exam);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Update exam
// // @route   PUT /api/exams/:id
// // @access  Private
// exports.updateExam = async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ 
//       _id: req.params.id, 
//       created_by: req.user._id 
//     });

//     if (!exam) {
//       return res.status(404).json({ message: 'Exam not found' });
//     }

//     Object.assign(exam, req.body);
//     const updatedExam = await exam.save();
    
//     res.json(updatedExam);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Delete exam
// // @route   DELETE /api/exams/:id
// // @access  Private
// exports.deleteExam = async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ 
//       _id: req.params.id, 
//       created_by: req.user._id 
//     });

//     if (!exam) {
//       return res.status(404).json({ message: 'Exam not found' });
//     }

//     await exam.deleteOne();
//     res.json({ message: 'Exam deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// const Exam = require('../models/Exam');
// const aiService = require('../services/openAIService'); // <--- ADDED IMPORT

// // @desc    Get all exams for logged in user
// // @route   GET /api/exams
// // @access  Private
// exports.getExams = async (req, res) => {
//   try {
//     const exams = await Exam.find({ created_by: req.user._id }).sort({ created_at: -1 });
//     res.json(exams);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Get single exam
// // @route   GET /api/exams/:id
// // @access  Private
// exports.getExamById = async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ 
//       _id: req.params.id, 
//       created_by: req.user._id 
//     });

//     if (!exam) {
//       return res.status(404).json({ message: 'Exam not found' });
//     }

//     res.json(exam);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Create new exam
// // @route   POST /api/exams
// // @access  Private
// exports.createExam = async (req, res) => {
//   try {
//     const examData = {
//       ...req.body,
//       created_by: req.user._id
//     };

//     const exam = await Exam.create(examData);
//     res.status(201).json(exam);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Update exam
// // @route   PUT /api/exams/:id
// // @access  Private
// exports.updateExam = async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ 
//       _id: req.params.id, 
//       created_by: req.user._id 
//     });

//     if (!exam) {
//       return res.status(404).json({ message: 'Exam not found' });
//     }

//     Object.assign(exam, req.body);
//     const updatedExam = await exam.save();
    
//     res.json(updatedExam);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Delete exam
// // @route   DELETE /api/exams/:id
// // @access  Private
// exports.deleteExam = async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ 
//       _id: req.params.id, 
//       created_by: req.user._id 
//     });

//     if (!exam) {
//       return res.status(404).json({ message: 'Exam not found' });
//     }

//     await exam.deleteOne();
//     res.json({ message: 'Exam deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Generate Study Plan using AI
// // @route   POST /api/exams/:id/generate-plan
// // @access  Private
// exports.generateStudyPlan = async (req, res) => {
//   try {
//     const exam = await Exam.findOne({ 
//       _id: req.params.id, 
//       created_by: req.user._id 
//     });

//     if (!exam) {
//       return res.status(404).json({ message: 'Exam not found' });
//     }

//     // Call the AI Service
//     const planText = await aiService.generateStudyPlan(exam);

//     res.json({ 
//       success: true, 
//       message: planText 
//     });
//   } catch (error) {
//     console.error("Plan Generation Error:", error);
//     res.status(500).json({ message: 'Failed to generate plan' });
//   }
// };
const Exam = require('../models/Exam');
const StudyPlan = require('../models/StudyPlan');
const aiService = require('../services/openAIService');

// @desc    Get all exams
exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find({ created_by: req.user._id }).sort({ created_at: -1 });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single exam
exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, created_by: req.user._id });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create exam
exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create({ ...req.body, created_by: req.user._id });
    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update exam
exports.updateExam = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, created_by: req.user._id });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    
    Object.assign(exam, req.body);
    const updatedExam = await exam.save();
    res.json(updatedExam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete exam
exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, created_by: req.user._id });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    
    await exam.deleteOne();
    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate Study Plan
exports.generateStudyPlan = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, created_by: req.user._id });
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    // 1. Clear old plans
    await StudyPlan.deleteMany({ exam_id: exam._id });

    // 2. Call AI Service (using the update logic for StudyPlan model)
    // We reuse the logic we built for the advanced schema
    const prompt = `
      Act as an expert study planner. Create a detailed daily schedule for:
      Exam: ${exam.name}
      Subject: ${exam.subject}
      Target Date: ${new Date(exam.exam_date).toDateString()}
      Daily Study Hours: ${exam.daily_study_hours} hours/day
      Syllabus: ${exam.syllabus_text || 'Standard curriculum'}
      
      Start Date: ${new Date().toDateString()}

      CRITICAL INSTRUCTIONS:
      - Return ONLY raw JSON. No markdown.
      - Structure must be an ARRAY of days.
      - Each day must have a "day_offset" (number 0, 1, 2...).
      - Each day must have a "topics" array.
      - Each topic object MUST have: "name" (string) and "allocated_hours" (number).
      - Ensure "allocated_hours" sum up to around ${exam.daily_study_hours} per day.

      Example Format:
      [
        {
          "day_offset": 0,
          "topics": [
            { "name": "Algebra: Quadratic Equations", "allocated_hours": 1.5 },
            { "name": "Algebra: Practice Problems", "allocated_hours": 1.5 }
          ]
        }
      ]
      Generate the first 14 days.
    `;

    // 3. Get AI Response
    let aiText = await aiService.model.generateContent(prompt);
    let responseText = await aiText.response.text();
    
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const planData = JSON.parse(responseText);

    const plansToSave = planData.map(day => {
      const planDate = new Date();
      planDate.setDate(planDate.getDate() + day.day_offset);
      const totalHours = day.topics.reduce((sum, t) => sum + t.allocated_hours, 0);

      return {
        exam_id: exam._id,
        created_by: req.user._id,
        date: planDate,
        total_planned_hours: totalHours,
        topics: day.topics.map(t => ({
          name: t.name,
          allocated_hours: t.allocated_hours,
          completed: false,
          difficulty_rating: 3
        }))
      };
    });

    await StudyPlan.insertMany(plansToSave);

    res.json({ success: true, message: "Study plan generated successfully!" });
  } catch (error) {
    console.error("Plan Generation Error:", error);
    res.status(500).json({ message: 'Failed to generate plan' });
  }
};