// const express = require('express');
// const router = express.Router();
// const {
//   getStudyPlans,
//   getStudyPlanById,
//   createStudyPlan,
//   updateStudyPlan,
//   deleteStudyPlan,
//   markTopicComplete
// } = require('../controllers/studyPlanController');
// const auth = require('../middleware/auth');

// router.route('/')
//   .get(auth, getStudyPlans)
//   .post(auth, createStudyPlan);

// router.route('/:id')
//   .get(auth, getStudyPlanById)
//   .put(auth, updateStudyPlan)
//   .delete(auth, deleteStudyPlan);

// router.patch('/:id/topics/:topicIndex/complete', auth, markTopicComplete);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  getStudyPlans,
  getStudyPlanById,
  createStudyPlan,
  updateStudyPlan,
  deleteStudyPlan,
  markTopicComplete
} = require('../controllers/studyPlanController');
const auth = require('../middleware/auth');

// Base route: /api/study-plans

router.route('/')
  .get(auth, getStudyPlans)
  .post(auth, createStudyPlan);

router.route('/:id')
  .get(auth, getStudyPlanById)
  .put(auth, updateStudyPlan)
  .delete(auth, deleteStudyPlan);

// Route for marking a specific topic as complete
// Matches: /api/study-plans/123/topics/0/complete
router.patch('/:id/topics/:topicIndex/complete', auth, markTopicComplete);

module.exports = router;