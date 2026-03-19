import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Progress } from '../components/ui/progress';
import { 
  FileText,
  Upload,
  Eye,
  Edit3,
  Save,
  Image as ImageIcon,
  BookOpen,
  Calendar,
  Clock,
  Zap,
  Brain,
  CheckCircle
} from 'lucide-react';
import api from '../services/api';
import { calculateDaysRemaining } from '../utils';

export default function Syllabus() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSyllabus, setEditedSyllabus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/exams');
      const exams = response.data;
      setExams(exams);
      
      if (exams.length > 0) {
        const activeExam = exams.find(e => e.status === 'active') || exams[0];
        setSelectedExam(activeExam);
        setEditedSyllabus(activeExam.syllabus_text || '');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedExam) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const response = await api.post('/exams/upload-syllabus', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setUploadProgress(100);

      const updatedExam = {
        ...selectedExam,
        syllabus_image_url: response.data.fileUrl,
        syllabus_text: response.data.extractedText || selectedExam.syllabus_text
      };

      await api.put(`/exams/${selectedExam._id}`, updatedExam);
      
      setSelectedExam(updatedExam);
      setEditedSyllabus(response.data.extractedText || selectedExam.syllabus_text);
      setExams(prev => prev.map(exam => 
        exam._id === selectedExam._id ? updatedExam : exam
      ));

      clearInterval(progressInterval);
      alert('Syllabus uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSaveSyllabus = async () => {
    if (!selectedExam) return;

    try {
      const updatedExam = { ...selectedExam, syllabus_text: editedSyllabus };
      await api.put(`/exams/${selectedExam._id}`, updatedExam);

      setSelectedExam(updatedExam);
      setExams(prev => prev.map(exam => 
        exam._id === selectedExam._id ? updatedExam : exam
      ));
      
      setIsEditing(false);
      alert('Syllabus saved successfully!');
    } catch (error) {
      console.error('Error saving syllabus:', error);
      alert('Error saving syllabus. Please try again.');
    }
  };

  const generateScheduleFromSyllabus = async () => {
    if (!selectedExam || (!selectedExam.syllabus_text && !selectedExam.syllabus_image_url)) {
      alert('Please add syllabus content first!');
      return;
    }

    setIsGeneratingPlan(true);
    
    try {
      const response = await api.post(`/exams/${selectedExam._id}/generate-plan`);
      alert(`Study schedule generated successfully! 🎉\n\n${response.data.message}`);
    } catch (error) {
      console.error('Error generating schedule:', error);
      alert('Error generating study schedule. Please try again.');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-white/10 rounded-xl animate-pulse glass-effect"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Exam Syllabus 📋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Upload, manage, and generate study schedules from your syllabus
          </p>
        </div>

        {!selectedExam ? (
          <div className="text-center py-16">
            <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto">
              <FileText className="w-20 h-20 mx-auto text-gray-400 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Exam Found
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Please create an exam in Settings first to view the syllabus.
              </p>
            </div>
          </div>
        ) : (
          <>
            <Card className="glass-effect border-0 shadow-xl">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedExam.name}
                    </CardTitle>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                      {selectedExam.subject}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2">
                      {selectedExam.branch}
                    </Badge>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {calculateDaysRemaining(selectedExam.exam_date)} days left
                    </Badge>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedExam.daily_study_hours}h/day
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="glass-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Brain className="w-6 h-6 text-purple-600" />
                  AI-Powered Schedule Generator
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate a personalized study schedule based on your syllabus content
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={generateScheduleFromSyllabus}
                  disabled={isGeneratingPlan || (!selectedExam.syllabus_text && !selectedExam.syllabus_image_url)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                >
                  {isGeneratingPlan ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Generating AI Study Schedule...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Generate Smart Study Schedule
                    </>
                  )}
                </Button>
                
                {(!selectedExam.syllabus_text && !selectedExam.syllabus_image_url) && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                    Please add syllabus content below to generate a schedule
                  </p>
                )}
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="glass-effect border-0 shadow-xl">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      Text Syllabus
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (isEditing) {
                          handleSaveSyllabus();
                        } else {
                          setIsEditing(true);
                        }
                      }}
                      className="glass-effect border-white/20"
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={editedSyllabus}
                      onChange={(e) => setEditedSyllabus(e.target.value)}
                      placeholder="Enter your exam syllabus here..."
                      className="glass-effect border-white/20 min-h-[400px]"
                    />
                  ) : (
                    <div className="glass-effect rounded-lg p-6 min-h-[400px]">
                      {selectedExam.syllabus_text ? (
                        <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-200 font-sans">
                          {selectedExam.syllabus_text}
                        </pre>
                      ) : (
                        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
                          <BookOpen className="w-12 h-12 mx-auto mb-4" />
                          <p>No syllabus text added yet.</p>
                          <p className="text-sm mt-2">Click Edit to add your syllabus.</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-effect border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <ImageIcon className="w-6 h-6 text-purple-600" />
                    Syllabus Image
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-purple-400 transition-colors duration-200">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="syllabus-image"
                        disabled={isUploading}
                      />
                      <label 
                        htmlFor="syllabus-image" 
                        className="cursor-pointer block"
                      >
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          {isUploading ? 'Processing...' : 'Click to upload syllabus image'}
                        </p>
                        <p className="text-sm text-gray-500">
                          JPG, PNG, or PDF files • AI will extract text automatically
                        </p>
                      </label>
                      
                      {isUploading && (
                        <div className="mt-4">
                          <Progress value={uploadProgress} className="w-full" />
                          <p className="text-sm text-gray-500 mt-2">
                            Uploading and processing... {uploadProgress}%
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedExam.syllabus_image_url && (
                      <div className="glass-effect rounded-lg p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Uploaded Syllabus
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(selectedExam.syllabus_image_url, '_blank')}
                            className="glass-effect border-white/20"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Size
                          </Button>
                        </div>
                        <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                          <img
                            src={selectedExam.syllabus_image_url}
                            alt="Syllabus"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}