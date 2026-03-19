const Progress = require('../models/Progress');

// @desc    Get all progress records
// @route   GET /api/progress
// @access  Private
exports.getProgress = async (req, res) => {
  try {
    const { exam_id } = req.query;
    let query = { created_by: req.user._id };

    if (exam_id) query.exam_id = exam_id;

    const progress = await Progress.find(query)
      .populate('exam_id', 'name subject')
      .sort({ last_studied: -1 });
    
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single progress record
// @route   GET /api/progress/:id
// @access  Private
exports.getProgressById = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      _id: req.params.id,
      created_by: req.user._id
    }).populate('exam_id', 'name subject');

    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new progress record
// @route   POST /api/progress
// @access  Private
exports.createProgress = async (req, res) => {
  try {
    const progressData = {
      ...req.body,
      created_by: req.user._id
    };

    const progress = await Progress.create(progressData);
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update progress record
// @route   PUT /api/progress/:id
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      _id: req.params.id,
      created_by: req.user._id
    });

    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }

    Object.assign(progress, req.body);
    progress.last_studied = Date.now();
    
    const updatedProgress = await progress.save();
    res.json(updatedProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete progress record
// @route   DELETE /api/progress/:id
// @access  Private
exports.deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      _id: req.params.id,
      created_by: req.user._id
    });

    if (!progress) {
      return res.status(404).json({ message: 'Progress record not found' });
    }

    await progress.deleteOne();
    res.json({ message: 'Progress record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};