// const StudyPlan = require('../models/StudyPlan');

// // @desc    Get all study plans
// // @route   GET /api/study-plans
// // @access  Private
// exports.getStudyPlans = async (req, res) => {
//   try {
//     const { exam_id, date } = req.query;
//     let query = { created_by: req.user._id };

//     if (exam_id) query.exam_id = exam_id;
//     if (date) query.date = new Date(date);

//     const studyPlans = await StudyPlan.find(query)
//       .populate('exam_id', 'name subject')
//       .sort({ date: 1 });
    
//     res.json(studyPlans);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Get single study plan
// // @route   GET /api/study-plans/:id
// // @access  Private
// exports.getStudyPlanById = async (req, res) => {
//   try {
//     const studyPlan = await StudyPlan.findOne({
//       _id: req.params.id,
//       created_by: req.user._id
//     }).populate('exam_id', 'name subject');

//     if (!studyPlan) {
//       return res.status(404).json({ message: 'Study plan not found' });
//     }

//     res.json(studyPlan);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Create new study plan
// // @route   POST /api/study-plans
// // @access  Private
// exports.createStudyPlan = async (req, res) => {
//   try {
//     const studyPlanData = {
//       ...req.body,
//       created_by: req.user._id
//     };

//     const studyPlan = await StudyPlan.create(studyPlanData);
//     res.status(201).json(studyPlan);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Update study plan
// // @route   PUT /api/study-plans/:id
// // @access  Private
// exports.updateStudyPlan = async (req, res) => {
//   try {
//     const studyPlan = await StudyPlan.findOne({
//       _id: req.params.id,
//       created_by: req.user._id
//     });

//     if (!studyPlan) {
//       return res.status(404).json({ message: 'Study plan not found' });
//     }

//     Object.assign(studyPlan, req.body);
//     const updatedStudyPlan = await studyPlan.save();
    
//     res.json(updatedStudyPlan);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Delete study plan
// // @route   DELETE /api/study-plans/:id
// // @access  Private
// exports.deleteStudyPlan = async (req, res) => {
//   try {
//     const studyPlan = await StudyPlan.findOne({
//       _id: req.params.id,
//       created_by: req.user._id
//     });

//     if (!studyPlan) {
//       return res.status(404).json({ message: 'Study plan not found' });
//     }

//     await studyPlan.deleteOne();
//     res.json({ message: 'Study plan deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Mark topic as complete
// // @route   PATCH /api/study-plans/:id/topics/:topicIndex/complete
// // @access  Private
// exports.markTopicComplete = async (req, res) => {
//   try {
//     const { id, topicIndex } = req.params;
//     const { completed, completion_time } = req.body;

//     const studyPlan = await StudyPlan.findOne({
//       _id: id,
//       created_by: req.user._id
//     });

//     if (!studyPlan) {
//       return res.status(404).json({ message: 'Study plan not found' });
//     }

//     if (topicIndex >= studyPlan.topics.length) {
//       return res.status(400).json({ message: 'Invalid topic index' });
//     }

//     studyPlan.topics[topicIndex].completed = completed;
//     if (completion_time !== undefined) {
//       studyPlan.topics[topicIndex].completion_time = completion_time;
//     }

//     await studyPlan.save();
//     res.json(studyPlan);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const StudyPlan = require('../models/StudyPlan');

// @desc    Get all study plans
// @route   GET /api/study-plans
// @access  Private
exports.getStudyPlans = async (req, res) => {
  try {
    const { exam_id, date } = req.query;
    let query = { created_by: req.user._id };

    if (exam_id) query.exam_id = exam_id;
    // Note: This does an exact match on the Date object. 
    // For date ranges (e.g. "all plans for this day"), you might need a range query later.
    if (date) query.date = new Date(date);

    const studyPlans = await StudyPlan.find(query)
      .populate('exam_id', 'name subject')
      .sort({ date: 1 });
    
    res.json(studyPlans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single study plan
// @route   GET /api/study-plans/:id
// @access  Private
exports.getStudyPlanById = async (req, res) => {
  try {
    const studyPlan = await StudyPlan.findOne({
      _id: req.params.id,
      created_by: req.user._id
    }).populate('exam_id', 'name subject');

    if (!studyPlan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    res.json(studyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new study plan
// @route   POST /api/study-plans
// @access  Private
exports.createStudyPlan = async (req, res) => {
  try {
    const studyPlanData = {
      ...req.body,
      created_by: req.user._id
    };

    const studyPlan = await StudyPlan.create(studyPlanData);
    res.status(201).json(studyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update study plan
// @route   PUT /api/study-plans/:id
// @access  Private
exports.updateStudyPlan = async (req, res) => {
  try {
    const studyPlan = await StudyPlan.findOne({
      _id: req.params.id,
      created_by: req.user._id
    });

    if (!studyPlan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    Object.assign(studyPlan, req.body);
    const updatedStudyPlan = await studyPlan.save();
    
    res.json(updatedStudyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete study plan
// @route   DELETE /api/study-plans/:id
// @access  Private
exports.deleteStudyPlan = async (req, res) => {
  try {
    const studyPlan = await StudyPlan.findOne({
      _id: req.params.id,
      created_by: req.user._id
    });

    if (!studyPlan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    await studyPlan.deleteOne();
    res.json({ message: 'Study plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark topic as complete
// @route   PATCH /api/study-plans/:id/topics/:topicIndex/complete
// @access  Private
exports.markTopicComplete = async (req, res) => {
  try {
    const { id, topicIndex } = req.params;
    const { completed, completion_time } = req.body;

    const studyPlan = await StudyPlan.findOne({
      _id: id,
      created_by: req.user._id
    });

    if (!studyPlan) {
      return res.status(404).json({ message: 'Study plan not found' });
    }

    if (topicIndex >= studyPlan.topics.length) {
      return res.status(400).json({ message: 'Invalid topic index' });
    }

    studyPlan.topics[topicIndex].completed = completed;
    if (completion_time !== undefined) {
      studyPlan.topics[topicIndex].completion_time = completion_time;
    }

    // Recalculate actual hours based on completed topics if necessary
    // For now, simply saving the change
    await studyPlan.save();
    res.json(studyPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};