const express = require('express');
const router = express.Router();
const {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
} = require('../controllers/resourceController');
const auth = require('../middleware/auth');

router.route('/')
  .get(auth, getResources)
  .post(auth, createResource);

router.route('/:id')
  .get(auth, getResourceById)
  .put(auth, updateResource)
  .delete(auth, deleteResource);

module.exports = router;