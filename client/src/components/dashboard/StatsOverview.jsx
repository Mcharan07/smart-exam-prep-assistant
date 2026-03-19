// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Progress } from '../ui/progress'; // CORRECTED PATH
// import { Calendar, Clock, TrendingUp, Target } from 'lucide-react';

// export default function StatsOverview({ exam, progress, daysRemaining, studyStreak }) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
//             Current Exam
//           </CardTitle>
//           <Target className="h-4 w-4 text-purple-600" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-gray-900 dark:text-white">
//             {exam?.name || 'No exam'}
//           </div>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             {exam?.subject}
//           </p>
//         </CardContent>
//       </Card>

//       <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
//             Days Remaining
//           </CardTitle>
//           <Calendar className="h-4 w-4 text-red-500" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-gray-900 dark:text-white">
//             {daysRemaining}
//           </div>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             {daysRemaining > 0 ? 'Days to go' : 'Exam today!'}
//           </p>
//         </CardContent>
//       </Card>

//       <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
//             Overall Progress
//           </CardTitle>
//           <TrendingUp className="h-4 w-4 text-green-500" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-gray-900 dark:text-white">
//             {progress}%
//           </div>
//           <Progress value={progress} className="mt-2" />
//         </CardContent>
//       </Card>

//       <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
//             Study Streak
//           </CardTitle>
//           <Clock className="h-4 w-4 text-blue-500" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold text-gray-900 dark:text-white">
//             {studyStreak}
//           </div>
//           <p className="text-xs text-gray-500 dark:text-gray-400">
//             Consecutive days
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Calendar, Clock, TrendingUp, Target } from 'lucide-react';

export default function StatsOverview({ exam, progress, daysRemaining, studyStreak }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Current Exam
          </CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {exam?.name || 'No exam'}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {exam?.subject}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Days Remaining
          </CardTitle>
          <Calendar className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {daysRemaining}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {daysRemaining > 0 ? 'Days to go' : 'Exam today!'}
          </p>
        </CardContent>
      </Card>

      <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Overall Progress
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {progress}%
          </div>
          <Progress value={progress} className="mt-2" />
        </CardContent>
      </Card>

      <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Study Streak
          </CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {studyStreak}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Consecutive days
          </p>
        </CardContent>
      </Card>
    </div>
  );
}