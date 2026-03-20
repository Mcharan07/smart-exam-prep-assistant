// const express = require('express');
// const router = express.Router();
// const {
//   getResources,
//   getResourceById,
//   createResource,
//   updateResource,
//   deleteResource
// } = require('../controllers/resourceController');
// const auth = require('../middleware/auth');

// router.route('/')
//   .get(auth, getResources)
//   .post(auth, createResource);

// router.route('/:id')
//   .get(auth, getResourceById)
//   .put(auth, updateResource)
//   .delete(auth, deleteResource);

// module.exports = router;

const Resource = require('../models/Resource');

// @desc    Get all resources (Global for ALL logged-in users)
// @route   GET /api/resources
// @access  Private
exports.getResources = async (req, res) => {
  try {
    // The empty brackets {} tell MongoDB to return ALL resources in the database
    // .sort({ createdAt: -1 }) ensures the newest ones show up at the top
    const resources = await Resource.find({}).sort({ createdAt: -1 });
    
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ message: 'Server Error fetching resources' });
  }
};

// @desc    Get a single resource by ID
// @route   GET /api/resources/:id
// @access  Private
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    res.status(500).json({ message: 'Server Error fetching resource' });
  }
};

// @desc    Create a new resource
// @route   POST /api/resources
// @access  Private
exports.createResource = async (req, res) => {
  try {
    // Automatically assign the logged-in user as the creator
    const newResourceData = {
      ...req.body,
      created_by: req.user.id 
    };

    const resource = await Resource.create(newResourceData);
    res.status(201).json(resource);
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({ message: 'Server Error creating resource' });
  }
};

// @desc    Update a resource
// @route   PUT /api/resources/:id
// @access  Private
exports.updateResource = async (req, res) => {
  try {
    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Security check: Only the user who created it can update it
    if (resource.created_by.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to update this resource' });
    }

    resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(resource);
  } catch (error) {
    console.error('Error updating resource:', error);
    res.status(500).json({ message: 'Server Error updating resource' });
  }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Security check: Only the user who created it can delete it
    if (resource.created_by.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to delete this resource' });
    }

    await resource.deleteOne();
    res.status(200).json({ message: 'Resource removed successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ message: 'Server Error deleting resource' });
  }
};