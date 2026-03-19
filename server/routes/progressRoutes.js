const express = require('express');
const router = express.Router();
const {
  getProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress
} = require('../controllers/progressController');
const auth = require('../middleware/auth');

router.route('/')
  .get(auth, getProgress)
  .post(auth, createProgress);

router.route('/:id')
  .get(auth, getProgressById)
  .put(auth, updateProgress)
  .delete(auth, deleteProgress);

module.exports = router;