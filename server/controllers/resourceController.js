const Resource = require('../models/Resource');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
exports.getResources = async (req, res) => {
  try {
    const { subject, type, difficulty, search } = req.query;
    let query = {};

    if (subject) query.subject = subject;
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { topic: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const resources = await Resource.find(query).sort({ created_at: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Private
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new resource
// @route   POST /api/resources
// @access  Private (Admin or resource owner)
exports.createResource = async (req, res) => {
  try {
    const resourceData = {
      ...req.body,
      created_by: req.user._id
    };

    const resource = await Resource.create(resourceData);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check if user is admin or resource owner
    if (req.user.role !== 'admin' && resource.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this resource' });
    }

    Object.assign(resource, req.body);
    const updatedResource = await resource.save();
    
    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check if user is admin or resource owner
    if (req.user.role !== 'admin' && resource.created_by.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this resource' });
    }

    await resource.deleteOne();
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};