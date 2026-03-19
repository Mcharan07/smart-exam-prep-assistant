// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Progress } from '../ui/progress';
// import { TrendingUp, Award } from 'lucide-react';

// export default function WeeklyProgress({ progress }) {
//   const getWeeklyStats = () => {
//     if (!progress || progress.length === 0) return [];
    
//     return progress.slice(0, 5).map(p => ({
//       topic: p.topic,
//       completion: p.completion_percentage,
//       confidence: p.confidence_level || 5,
//       timeSpent: p.time_spent || 0
//     }));
//   };

//   const weeklyStats = getWeeklyStats();
//   const averageProgress = weeklyStats.length > 0 
//     ? weeklyStats.reduce((sum, stat) => sum + stat.completion, 0) / weeklyStats.length 
//     : 0;

//   return (
//     <Card className="glass-effect border-0 shadow-xl">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-3">
//           <TrendingUp className="w-6 h-6 text-emerald-600" />
//           Weekly Progress Overview
//         </CardTitle>
//         <div className="flex items-center gap-2">
//           <Award className="w-4 h-4 text-yellow-500" />
//           <span className="text-sm text-gray-600 dark:text-gray-300">
//             Average: {Math.round(averageProgress)}% completion
//           </span>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {weeklyStats.length > 0 ? (
//             weeklyStats.map((stat, index) => (
//               <div key={index} className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium text-gray-900 dark:text-white">
//                     {stat.topic}
//                   </span>
//                   <div className="flex items-center gap-2 text-sm">
//                     <span className="text-gray-500 dark:text-gray-400">
//                       {stat.timeSpent}h
//                     </span>
//                     <span className="font-medium">
//                       {stat.completion}%
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Progress value={stat.completion} className="flex-1 h-2" />
//                   <div className="flex gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <div
//                         key={i}
//                         className={`w-2 h-2 rounded-full ${
//                           i < (stat.confidence / 2) 
//                             ? 'bg-yellow-400' 
//                             : 'bg-gray-200 dark:bg-gray-600'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-8">
//               <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
//               <p className="text-gray-600 dark:text-gray-300">
//                 Start studying to see your progress here!
//               </p>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { TrendingUp, Award } from 'lucide-react';

export default function WeeklyProgress({ progress }) {
  const getWeeklyStats = () => {
    if (!progress || progress.length === 0) return [];
    
    return progress.slice(0, 5).map(p => ({
      topic: p.topic,
      completion: p.completion_percentage,
      confidence: p.confidence_level || 5,
      timeSpent: p.time_spent || 0
    }));
  };

  const weeklyStats = getWeeklyStats();
  const averageProgress = weeklyStats.length > 0 
    ? weeklyStats.reduce((sum, stat) => sum + stat.completion, 0) / weeklyStats.length 
    : 0;

  return (
    <Card className="glass-effect border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
          Weekly Progress Overview
        </CardTitle>
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Average: {Math.round(averageProgress)}% completion
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weeklyStats.length > 0 ? (
            weeklyStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {stat.topic}
                  </span>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      {stat.timeSpent}h
                    </span>
                    <span className="font-medium">
                      {stat.completion}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={stat.completion} className="flex-1 h-2" />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < (stat.confidence / 2) 
                            ? 'bg-yellow-400' 
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-300">
                Start studying to see your progress here!
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}