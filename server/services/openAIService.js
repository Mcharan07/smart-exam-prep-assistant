// const axios = require('axios');

// class OpenAIService {
//   constructor() {
//     this.apiKey = process.env.OPENAI_API_KEY;
//     this.apiUrl = 'https://api.openai.com/v1/chat/completions';
//   }

//   async getChatResponse(userMessage, context = {}) {
//     try {
//       const systemPrompt = this.buildSystemPrompt(context);

//       const response = await axios.post(
//         this.apiUrl,
//         {
//           model: 'gpt-3.5-turbo',
//           messages: [
//             { role: 'system', content: systemPrompt },
//             { role: 'user', content: userMessage }
//           ],
//           temperature: 0.7,
//           max_tokens: 500
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${this.apiKey}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       return response.data.choices[0].message.content;
//     } catch (error) {
//       console.error('OpenAI API Error:', error.response?.data || error.message);
//       throw new Error('Failed to get AI response');
//     }
//   }

//   buildSystemPrompt(context) {
//     return `You are an AI Study Assistant helping students prepare for their exams. 

// Your role is to:
// - Explain complex topics in simple, easy-to-understand terms
// - Provide study strategies and techniques
// - Help with time management and study scheduling
// - Answer questions about exam topics
// - Offer encouragement and motivation

// Be friendly, supportive, and concise in your responses. Use emojis appropriately to make the conversation engaging.

// ${context.examId ? `The student is currently preparing for an exam.` : ''}
// ${context.topic ? `They are asking about: ${context.topic}` : ''}

// Provide helpful, educational responses that will aid in their exam preparation.`;
//   }

//   async generateStudyPlan(examDetails) {
//     try {
//       const prompt = `Generate a detailed study plan for the following exam:

// Exam: ${examDetails.name}
// Subject: ${examDetails.subject}
// Exam Date: ${examDetails.exam_date}
// Daily Study Hours: ${examDetails.daily_study_hours}
// Priority Topics: ${examDetails.priority_topics?.join(', ') || 'None specified'}
// Weak Topics: ${examDetails.weak_topics?.join(', ') || 'None specified'}
// Syllabus: ${examDetails.syllabus_text || 'Not provided'}

// Please create a day-by-day study schedule with specific topics and time allocations.`;

//       const response = await axios.post(
//         this.apiUrl,
//         {
//           model: 'gpt-3.5-turbo',
//           messages: [
//             { role: 'system', content: 'You are an expert study planner.' },
//             { role: 'user', content: prompt }
//           ],
//           temperature: 0.7,
//           max_tokens: 1500
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${this.apiKey}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       return response.data.choices[0].message.content;
//     } catch (error) {
//       console.error('OpenAI API Error:', error.response?.data || error.message);
//       throw new Error('Failed to generate study plan');
//     }
//   }
// }

// module.exports = new OpenAIService();


const { GoogleGenerativeAI } = require("@google/generative-ai");

class AIService {
  constructor() {
    // Initialize Gemini with the key from .env
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use the flash model for speed and low cost (free tier)
    // Use 'gemini-pro' which is the standard stable model alias
    // NEW - Uses the model confirmed in your list
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  }

  async getChatResponse(userMessage, context = {}) {
    try {
      // 1. Construct the prompt by combining system instructions + user message
      const systemInstruction = this.buildSystemPrompt(context);
      
      const fullPrompt = `${systemInstruction}
      
      ----------------------------------------
      Student Question: ${userMessage}
      ----------------------------------------
      Answer:`;

      // 2. Call Gemini API
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  buildSystemPrompt(context) {
    return `You are an AI Study Assistant helping students prepare for their exams. 

Your role is to:
- Explain complex topics in simple, easy-to-understand terms
- Provide study strategies and techniques
- Help with time management and study scheduling
- Answer questions about exam topics
- Offer encouragement and motivation

Be friendly, supportive, and concise. Use emojis appropriately.

${context.examId ? `The student is currently preparing for an exam.` : ''}
${context.topic ? `The context topic is: ${context.topic}` : ''}

Provide helpful, educational responses that will aid in their exam preparation.`;
  }

  async generateStudyPlan(examDetails) {
    try {
      const prompt = `Act as an expert study planner. Generate a detailed, day-by-day study schedule for the following exam:

      Exam Name: ${examDetails.name}
      Subject: ${examDetails.subject}
      Exam Date: ${examDetails.exam_date}
      Daily Study Hours: ${examDetails.daily_study_hours}
      Priority Topics: ${examDetails.priority_topics?.join(', ') || 'None specified'}
      Weak Topics: ${examDetails.weak_topics?.join(', ') || 'None specified'}
      Syllabus: ${examDetails.syllabus_text || 'Not provided'}

      Output Format:
      Please provide a structured plan (Day 1, Day 2, etc.) with specific topics to cover and time allocations.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();

    } catch (error) {
      console.error('Gemini API Error (Study Plan):', error);
      throw new Error('Failed to generate study plan');
    }
  }
}

// Export as a singleton instance
module.exports = new AIService();