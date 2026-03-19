const express = require('express');
const router = express.Router();
const {
  getChatMessages,
  sendMessage,
  provideFeedback
} = require('../controllers/chatController');
const auth = require('../middleware/auth');

router.route('/')
  .get(auth, getChatMessages)
  .post(auth, sendMessage);

router.patch('/:id/feedback', auth, provideFeedback);

module.exports = router;