// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { Progress } from '../ui/progress';
// import { CheckCircle2, Clock, BookOpen, AlertCircle } from 'lucide-react';

// export default function TodaySchedule({ studyPlan, examName }) {
//   const today = new Date().toLocaleDateString('en-US', { 
//     weekday: 'long', 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   });

//   if (!studyPlan) {
//     return (
//       <Card className="glass-effect border-0 shadow-xl">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-3">
//             <BookOpen className="w-6 h-6 text-purple-600" />
//             Today's Schedule - {today}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="text-center py-8">
//             <AlertCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
//             <p className="text-gray-600 dark:text-gray-300">
//               No study plan for today. Create one in Settings!
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   const completedTopics = studyPlan.topics?.filter(t => t.completed).length || 0;
//   const totalTopics = studyPlan.topics?.length || 0;
//   const progressPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

//   return (
//     <Card className="glass-effect border-0 shadow-xl">
//       <CardHeader>
//         <CardTitle className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <BookOpen className="w-6 h-6 text-purple-600" />
//             Today's Schedule - {today}
//           </div>
//           <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
//             {examName}
//           </Badge>
//         </CardTitle>
//         <div className="space-y-2">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600 dark:text-gray-300">
//               Progress: {completedTopics}/{totalTopics} topics
//             </span>
//             <span className="font-medium">
//               {Math.round(progressPercentage)}%
//             </span>
//           </div>
//           <Progress value={progressPercentage} className="h-2" />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {studyPlan.topics?.map((topic, index) => (
//             <div 
//               key={index}
//               className={`p-4 rounded-xl border transition-all duration-200 ${
//                 topic.completed 
//                   ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
//                   : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
//               }`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   {topic.completed ? (
//                     <CheckCircle2 className="w-5 h-5 text-green-600" />
//                   ) : (
//                     <Clock className="w-5 h-5 text-gray-400" />
//                   )}
//                   <div>
//                     <h3 className={`font-medium ${
//                       topic.completed 
//                         ? 'text-green-700 dark:text-green-300 line-through' 
//                         : 'text-gray-900 dark:text-white'
//                     }`}>
//                       {topic.name}
//                     </h3>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {topic.allocated_hours}h allocated
//                     </p>
//                   </div>
//                 </div>
//                 {!topic.completed && (
//                   <Button 
//                     size="sm" 
//                     className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
//                   >
//                     Start Study
//                   </Button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle2, Clock, BookOpen, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function TodaySchedule({ studyPlan, examName, onUpdate }) {
  const [loadingTopic, setLoadingTopic] = useState(null);

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleToggleTopic = async (topicIndex, currentStatus) => {
    setLoadingTopic(topicIndex);
    try {
      await api.patch(`/study-plans/${studyPlan._id}/topics/${topicIndex}/complete`, {
        completed: !currentStatus
      });
      
      if (onUpdate) onUpdate();
      window.location.reload(); 
    } catch (error) {
      console.error("Error updating topic:", error);
    } finally {
      setLoadingTopic(null);
    }
  };

  if (!studyPlan) {
    return (
      <Card className="glass-effect border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-600" />
            Today's Schedule - {today}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              No study plan for today. Create one in Settings!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedTopics = studyPlan.topics?.filter(t => t.completed).length || 0;
  const totalTopics = studyPlan.topics?.length || 0;
  const progressPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  return (
    <Card className="glass-effect border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-600" />
            Today's Schedule - {today}
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            {examName}
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              Progress: {completedTopics}/{totalTopics} topics
            </span>
            <span className="font-medium">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {studyPlan.topics?.map((topic, index) => (
            <div 
              key={index}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                topic.completed 
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    disabled={loadingTopic === index}
                    onClick={() => handleToggleTopic(index, topic.completed)}
                    className="focus:outline-none"
                  >
                    {topic.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  <div>
                    <h3 className={`font-medium ${
                      topic.completed 
                        ? 'text-green-700 dark:text-green-300 line-through' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {topic.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {topic.allocated_hours}h allocated
                    </p>
                  </div>
                </div>
                {!topic.completed && (
                  <Button 
                    size="sm" 
                    disabled={loadingTopic === index}
                    onClick={() => handleToggleTopic(index, topic.completed)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {loadingTopic === index ? 'Updating...' : 'Start '}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}