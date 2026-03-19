import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { 
  Settings as SettingsIcon,
  Plus,
  X,
  Save,
  Bell,
  BookOpen,
  Target,
  AlertTriangle,
  Brain
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [examData, setExamData] = useState({
    name: '',
    subject: '',
    degree: "Bachelor's",
    branch: 'Computer Science',
    exam_date: '',
    daily_study_hours: 4,
    priority_topics: [],
    weak_topics: [],
    syllabus_text: '',
    status: 'active'
  });
  const [notificationPrefs, setNotificationPrefs] = useState({
    email_enabled: false,
    reminder_time: '09:00'
  });
  const [newTopic, setNewTopic] = useState('');
  const [newWeakTopic, setNewWeakTopic] = useState('');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [existingExam, setExistingExam] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      if (user?.notification_preferences) {
        setNotificationPrefs(user.notification_preferences);
      }

      const examsRes = await api.get('/exams');
      const exams = examsRes.data;
      
      if (exams.length > 0) {
        const activeExam = exams.find(e => e.status === 'active') || exams[0];
        setExistingExam(activeExam);
        setExamData({
          name: activeExam.name,
          subject: activeExam.subject,
          degree: activeExam.degree,
          branch: activeExam.branch,
          exam_date: activeExam.exam_date.split('T')[0],
          daily_study_hours: activeExam.daily_study_hours,
          priority_topics: activeExam.priority_topics || [],
          weak_topics: activeExam.weak_topics || [],
          syllabus_text: activeExam.syllabus_text || '',
          status: activeExam.status
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setExamData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationPrefs(prev => ({ ...prev, [field]: value }));
  };

  const addTopic = (type) => {
    const topic = type === 'priority' ? newTopic : newWeakTopic;
    if (!topic.trim()) return;

    if (type === 'priority') {
      setExamData(prev => ({
        ...prev,
        priority_topics: [...prev.priority_topics, topic.trim()]
      }));
      setNewTopic('');
    } else {
      setExamData(prev => ({
        ...prev,
        weak_topics: [...prev.weak_topics, topic.trim()]
      }));
      setNewWeakTopic('');
    }
  };

  const removeTopic = (type, index) => {
    if (type === 'priority') {
      setExamData(prev => ({
        ...prev,
        priority_topics: prev.priority_topics.filter((_, i) => i !== index)
      }));
    } else {
      setExamData(prev => ({
        ...prev,
        weak_topics: prev.weak_topics.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      if (existingExam) {
        await api.put(`/exams/${existingExam._id}`, examData);
      } else {
        const response = await api.post('/exams', examData);
        setExistingExam(response.data);
      }

      await updateUser({ notification_preferences: notificationPrefs });

      alert('Settings saved successfully! 🎉');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const generateStudyPlan = async () => {
    if (!examData.name || !examData.exam_date) {
      alert('Please fill in exam name and date first!');
      return;
    }

    setIsGeneratingPlan(true);
    try {
      let savedExam = existingExam;
      if (!savedExam) {
        const response = await api.post('/exams', examData);
        savedExam = response.data;
        setExistingExam(savedExam);
      } else {
        await api.put(`/exams/${savedExam._id}`, examData);
      }

      const response = await api.post(`/exams/${savedExam._id}/generate-plan`);

      alert(`Study plan generated successfully! 🎉\n\n${response.data.message}`);
    } catch (error) {
      console.error('Error generating study plan:', error);
      alert('Error generating study plan. Please try again.');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const degrees = [
    "High School",
    "Bachelor's",
    "Master's",
    "PhD",
    "Professional Certification"
  ];

  const branches = [
    "Computer Science",
    "Electronics",
    "Mechanical",
    "Civil",
    "Chemical",
    "Electrical",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Business",
    "Economics",
    "Literature",
    "History",
    "Medicine",
    "Law",
    "Psychology",
    "Other"
  ];

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 bg-clip-text text-transparent">
            Exam Settings ⚙️
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Configure your exam details and study preferences
          </p>
        </div>

        <Card className="glass-effect border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <SettingsIcon className="w-8 h-8 text-purple-600" />
              {existingExam ? 'Update Exam Settings' : 'Create New Exam Plan'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="exam-name">Exam Name *</Label>
                  <Input
                    id="exam-name"
                    value={examData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g. Final Semester Exam"
                    className="glass-effect border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={examData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="e.g. Data Structures & Algorithms"
                    className="glass-effect border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degree">Degree Level</Label>
                  <Select value={examData.degree} onValueChange={(value) => handleInputChange('degree', value)}>
                    <SelectTrigger className="glass-effect border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {degrees.map(degree => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Academic Branch</Label>
                  <Select value={examData.branch} onValueChange={(value) => handleInputChange('branch', value)}>
                    <SelectTrigger className="glass-effect border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map(branch => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exam-date">Exam Date *</Label>
                  <Input
                    id="exam-date"
                    type="date"
                    value={examData.exam_date}
                    onChange={(e) => handleInputChange('exam_date', e.target.value)}
                    className="glass-effect border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="daily-hours">Daily Study Hours</Label>
                  <Input
                    id="daily-hours"
                    type="number"
                    min="0.5"
                    max="16"
                    step="0.5"
                    value={examData.daily_study_hours}
                    onChange={(e) => handleInputChange('daily_study_hours', parseFloat(e.target.value))}
                    className="glass-effect border-white/20"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Syllabus & Topics
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="syllabus">Exam Syllabus (Text Format)</Label>
                <Textarea
                  id="syllabus"
                  value={examData.syllabus_text}
                  onChange={(e) => handleInputChange('syllabus_text', e.target.value)}
                  placeholder="Paste your exam syllabus here..."
                  className="glass-effect border-white/20 h-32"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">High Priority Topics</h4>
              
              <div className="flex gap-3">
                <Input
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Add a priority topic..."
                  className="glass-effect border-white/20"
                  onKeyPress={(e) => e.key === 'Enter' && addTopic('priority')}
                />
                <Button 
                  onClick={() => addTopic('priority')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {examData.priority_topics.map((topic, index) => (
                  <Badge 
                    key={index} 
                    className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 flex items-center gap-2"
                  >
                    {topic}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-blue-600" 
                      onClick={() => removeTopic('priority', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">Topics You Find Difficult</h4>
              
              <div className="flex gap-3">
                <Input
                  value={newWeakTopic}
                  onChange={(e) => setNewWeakTopic(e.target.value)}
                  placeholder="Add a challenging topic..."
                  className="glass-effect border-white/20"
                  onKeyPress={(e) => e.key === 'Enter' && addTopic('weak')}
                />
                <Button 
                  onClick={() => addTopic('weak')}
                  className="bg-gradient-to-r from-red-500 to-orange-500"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {examData.weak_topics.map((topic, index) => (
                  <Badge 
                    key={index} 
                    className="bg-red-100 text-red-800 border-red-200 px-3 py-1 flex items-center gap-2"
                  >
                    {topic}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-red-600" 
                      onClick={() => removeTopic('weak', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-600" />
                Notification Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex items-center space-x-4 p-4 glass-effect rounded-lg">
                  <Switch
                    id="email-notifications"
                    checked={notificationPrefs.email_enabled}
                    onCheckedChange={(value) => handleNotificationChange('email_enabled', value)}
                  />
                  <Label htmlFor="email-notifications" className="flex-1 text-base">
                    Enable Email Reminders
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminder-time">Reminder Time</Label>
                  <Select 
                    value={notificationPrefs.reminder_time} 
                    onValueChange={(value) => handleNotificationChange('reminder_time', value)}
                    disabled={!notificationPrefs.email_enabled}
                  >
                    <SelectTrigger className="glass-effect border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"].map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <Button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 text-lg font-semibold"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>

              <Button
                onClick={generateStudyPlan}
                disabled={isGeneratingPlan || !examData.name || !examData.exam_date}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
              >
                {isGeneratingPlan ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Generate Smart Study Plan
                  </>
                )}
              </Button>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Pro Tip:</strong> Be specific with your syllabus and topics for the most effective study plan.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}