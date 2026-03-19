const ChatMessage = require('../models/ChatMessage');
const openAIService = require('../services/openAIService');

// @desc    Get all chat messages
// @route   GET /api/chat
// @access  Private
exports.getChatMessages = async (req, res) => {
  try {
    const { exam_id } = req.query;
    let query = { created_by: req.user._id };

    if (exam_id) query.exam_id = exam_id;

    const messages = await ChatMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send message to AI
// @route   POST /api/chat
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { message, exam_id, topic, message_type } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Get AI response
    const aiResponse = await openAIService.getChatResponse(message, {
      userId: req.user._id,
      examId: exam_id,
      topic
    });

    // Save chat message
    const chatMessage = await ChatMessage.create({
      message,
      response: aiResponse,
      exam_id,
      topic,
      message_type: message_type || 'general',
      created_by: req.user._id
    });

    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark message as helpful/not helpful
// @route   PATCH /api/chat/:id/feedback
// @access  Private
exports.provideFeedback = async (req, res) => {
  try {
    const { helpful } = req.body;

    const chatMessage = await ChatMessage.findOne({
      _id: req.params.id,
      created_by: req.user._id
    });

    if (!chatMessage) {
      return res.status(404).json({ message: 'Chat message not found' });
    }

    chatMessage.helpful = helpful;
    await chatMessage.save();

    res.json(chatMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};