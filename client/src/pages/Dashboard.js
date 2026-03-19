// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '../components/ui/button';
// import { Play, Brain } from 'lucide-react';
// import api from '../services/api';
// import StatsOverview from '../components/dashboard/StatsOverview';
// import TodaySchedule from '../components/dashboard/TodaySchedule';
// import WeeklyProgress from '../components/dashboard/WeeklyProgress';
// import QuickActions from '../components/dashboard/QuickActions';
// import { useAuth } from '../contexts/AuthContext';
// import { calculateDaysRemaining } from '../utils';

// export default function Dashboard() {
//   const { user } = useAuth();
//   const [exams, setExams] = useState([]);
//   const [todayPlan, setTodayPlan] = useState(null);
//   const [progress, setProgress] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     loadDashboardData();
//   }, []);

//   const loadDashboardData = async () => {
//     setIsLoading(true);
//     try {
//       const [examsRes, studyPlansRes, progressRes] = await Promise.all([
//         api.get('/exams'),
//         api.get('/study-plans'),
//         api.get('/progress')
//       ]);

//       setExams(examsRes.data);
      
//       const today = new Date().toISOString().split('T')[0];
//       const todayStudyPlan = studyPlansRes.data.find(
//         plan => plan.date.split('T')[0] === today
//       );
//       setTodayPlan(todayStudyPlan);
      
//       setProgress(progressRes.data);
//     } catch (error) {
//       console.error('Error loading dashboard data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getActiveExam = () => {
//     return exams.find(exam => exam.status === 'active') || exams[0];
//   };

//   const calculateOverallProgress = () => {
//     if (progress.length === 0) return 0;
//     const totalProgress = progress.reduce((sum, p) => sum + p.completion_percentage, 0);
//     return Math.round(totalProgress / progress.length);
//   };

//   const activeExam = getActiveExam();
//   const overallProgress = calculateOverallProgress();
//   const daysRemaining = activeExam ? calculateDaysRemaining(activeExam.exam_date) : 0;

//   if (isLoading) {
//     return (
//       <div className="p-8">
//         <div className="max-w-7xl mx-auto space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {[1, 2, 3, 4].map(i => (
//               <div key={i} className="h-32 bg-white/10 rounded-xl animate-pulse glass-effect"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-8 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
//             Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}! 🎯
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300">
//             Ready to ace your exams? Let's make today count!
//           </p>
//         </div>

//         {!activeExam ? (
//           <div className="text-center py-16">
//             <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto">
//               <Brain className="w-20 h-20 mx-auto text-purple-600 mb-6" />
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                 Start Your Exam Preparation Journey
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 mb-8">
//                 Add your first exam to get personalized study plans, resources, and AI assistance.
//               </p>
//               <Link to="/settings">
//                 <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg">
//                   <Play className="w-5 h-5 mr-2" />
//                   Create Your First Exam Plan
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <>
//             <StatsOverview 
//               exam={activeExam}
//               progress={overallProgress}
//               daysRemaining={daysRemaining}
//               studyStreak={7}
//             />

//             <div className="grid lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 space-y-8">
//                 <TodaySchedule 
//                   studyPlan={todayPlan}
//                   examName={activeExam.name}
//                 />
//                 <WeeklyProgress progress={progress} />
//               </div>

//               <div className="space-y-6">
//                 <QuickActions activeExam={activeExam} />
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Play, Brain, Loader2 } from 'lucide-react';
import api from '../services/api';
import StatsOverview from '../components/dashboard/StatsOverview';
import TodaySchedule from '../components/dashboard/TodaySchedule';
import WeeklyProgress from '../components/dashboard/WeeklyProgress';
import QuickActions from '../components/dashboard/QuickActions';
import { useAuth } from '../contexts/AuthContext';
import { calculateDaysRemaining } from '../utils';

export default function Dashboard() {
  const { user } = useAuth();
  const [activeExam, setActiveExam] = useState(null);
  const [todayPlan, setTodayPlan] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh data (passed to child components)
  const loadDashboardData = async () => {
    try {
      // 1. Fetch Exams
      const examsRes = await api.get('/exams');
      const exams = examsRes.data;
      
      // Find active exam (or the first one)
      const currentExam = exams.find(e => e.status === 'active') || exams[0];
      setActiveExam(currentExam);

      if (currentExam) {
        // 2. Fetch Study Plans
        // We get all plans to find today's specific plan
        const plansRes = await api.get(`/study-plans?exam_id=${currentExam._id}`);
        
        // Find plan matching today's date
        const todayStr = new Date().toISOString().split('T')[0];
        const today = plansRes.data.find(p => 
          new Date(p.date).toISOString().split('T')[0] === todayStr
        );
        setTodayPlan(today);

        // 3. Fetch Progress Stats
        const progRes = await api.get(`/progress?exam_id=${currentExam._id}`);
        setProgressData(progRes.data);

        // Calculate Overall Progress (Average of all topic completion % in the Progress collection)
        // OR if you are using the Progress Controller aggregation we built earlier:
        if (progRes.data.length > 0) {
           // If the controller returns a summary object
           if (progRes.data[0].completion_percentage !== undefined) {
             setOverallProgress(progRes.data[0].completion_percentage);
           } else {
             // If it returns raw records, calculate average manually
             const total = progRes.data.reduce((acc, curr) => acc + curr.completion_percentage, 0);
             setOverallProgress(Math.round(total / progRes.data.length));
           }
        }
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const daysRemaining = activeExam ? calculateDaysRemaining(activeExam.exam_date) : 0;

  if (isLoading) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading your study space...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}! 
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ready to ace your exams? Let's make today count!
          </p>
        </div>

        {!activeExam ? (
          /* Empty State - No Exam Created Yet */
          <div className="text-center py-16">
            <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto border-0 shadow-xl">
              <Brain className="w-20 h-20 mx-auto text-purple-600 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Start Your Exam Preparation Journey
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Add your first exam to get personalized study plans, resources, and AI assistance.
              </p>
              <Link to="/settings">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition-transform hover:scale-105">
                  <Play className="w-5 h-5 mr-2" />
                  Create Your First Exam Plan
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Active Dashboard */
          <>
            <StatsOverview 
              exam={activeExam}
              progress={overallProgress}
              daysRemaining={daysRemaining}
              studyStreak={7} // You can implement streak logic in User model later
            />

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <TodaySchedule 
                  studyPlan={todayPlan}
                  examName={activeExam.name}
                  onUpdate={loadDashboardData} // Pass refresh function
                />
                <WeeklyProgress progress={progressData} />
              </div>

              <div className="space-y-6">
                <QuickActions activeExam={activeExam} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}