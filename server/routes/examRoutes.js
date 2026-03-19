// const express = require('express');
// const router = express.Router();
// const {
//   getExams,
//   getExamById,
//   createExam,
//   updateExam,
//   deleteExam
// } = require('../controllers/examController');
// const auth = require('../middleware/auth');

// router.route('/')
//   .get(auth, getExams)
//   .post(auth, createExam);

// router.route('/:id')
//   .get(auth, getExamById)
//   .put(auth, updateExam)
//   .delete(auth, deleteExam);

// module.exports = router;
const express = require('express');
const router = express.Router();
// We destructure the functions exactly as named in the controller exports
const {
  getExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  generateStudyPlan
} = require('../controllers/examController');
const auth = require('../middleware/auth');

// Debugging block: helps identify if imports are failing
if (!getExamById) console.error("CRITICAL ERROR: getExamById is undefined. Check examController exports.");
if (!generateStudyPlan) console.error("CRITICAL ERROR: generateStudyPlan is undefined. Check examController exports.");

// Define Routes
router.route('/')
  .get(auth, getExams)
  .post(auth, createExam);

// Specific routes must come before /:id generic routes
router.post('/:id/generate-plan', auth, generateStudyPlan);

router.route('/:id')
  .get(auth, getExamById)
  .put(auth, updateExam)
  .delete(auth, deleteExam);

module.exports = router;