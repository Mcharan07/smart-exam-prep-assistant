/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Send,
  Bot,
  User as UserIcon,
  Brain,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function ChatBot() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeExam, setActiveExam] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadInitialData = async () => {
    try {
      const [examsRes, chatRes] = await Promise.all([
        api.get('/exams'),
        api.get('/chat')
      ]);

      const exams = examsRes.data;
      if (exams.length > 0) {
        const exam = exams.find(e => e.status === 'active') || exams[0];
        setActiveExam(exam);
        
        const previousMessages = chatRes.data
          .filter(msg => !msg.exam_id || msg.exam_id === exam._id)
          .map(msg => ({
            ...msg,
            id: msg._id,
            isUser: false
          }));
        
        setMessages(previousMessages);
      }

      if (messages.length === 0) {
        setMessages([{
          id: 'welcome',
          message: '',
          response: `Hello ${user?.full_name?.split(' ')[0] || 'Student'}! 👋

I'm your AI Study Assistant, here to help you ace your exam! 

Here's how I can help you:
🎯 Explain complex topics in simple terms
📚 Suggest study strategies and techniques  
⏰ Help plan your study schedule
💡 Provide quick tips and shortcuts
❓ Answer questions about your syllabus

What would you like to study today?`,
          message_type: 'general',
          created_date: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      message: currentMessage,
      response: '',
      message_type: 'question',
      created_date: new Date().toISOString(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const response = await api.post('/chat', {
        exam_id: activeExam?._id,
        message: currentMessage,
        message_type: 'question'
      });

      const aiMessage = {
        id: Date.now() + 1,
        message: currentMessage,
        response: response.data.response,
        message_type: 'explanation',
        created_date: new Date().toISOString(),
        isUser: false
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage = {
        id: Date.now() + 1,
        message: currentMessage,
        response: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment! 🔄",
        message_type: 'general',
        created_date: new Date().toISOString(),
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Explain the most important topics",
    "How should I plan my remaining study time?",
    "Give me study tips for better retention",
    "What are the best practices for this subject?",
    "Help me understand a difficult concept"
  ];

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            AI Study Assistant 🤖
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your personal tutor available 24/7 to help you succeed
          </p>
        </div>

        {activeExam && (
          <Card className="glass-effect border-0 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Currently helping with: {activeExam.name}
                  </span>
                </div>
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  {activeExam.subject}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="glass-effect border-0 shadow-2xl h-96 md:h-[500px]">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-purple-600" />
              Chat with AI Assistant
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.isUser 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600'
                    }`}>
                      {msg.isUser ? (
                        <UserIcon className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    <div className={`p-4 rounded-2xl shadow-lg ${
                      msg.isUser 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                        : 'glass-effect bg-white/80 dark:bg-gray-800/80'
                    }`}>
                      <p className="whitespace-pre-wrap">
                        {msg.isUser ? msg.message : msg.response}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="glass-effect bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref__={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="p-4 border-t border-white/10">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Quick questions to get started:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentMessage(question)}
                      className="glass-effect border-white/20 text-xs hover:bg-white/20"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your studies..."
                  className="glass-effect border-white/20"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !currentMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}