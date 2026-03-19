// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Button } from '../ui/button';
// import { MessageCircle, BookOpen, Settings, FileText, Zap } from 'lucide-react';

// export default function QuickActions({ activeExam }) {
//   const actions = [
//     {
//       title: "AI Assistant",
//       description: "Get instant help with topics",
//       icon: MessageCircle,
//       url: "/chatbot",
//       color: "from-purple-600 to-blue-600"
//     },
//     {
//       title: "Study Resources",
//       description: "Access videos, PDFs & links",
//       icon: BookOpen,
//       url: "/resources",
//       color: "from-emerald-600 to-teal-600"
//     },
//     {
//       title: "View Syllabus",
//       description: "Check your exam syllabus",
//       icon: FileText,
//       url: "/syllabus",
//       color: "from-orange-600 to-red-600"
//     },
//     {
//       title: "Update Settings",
//       description: "Modify study preferences",
//       icon: Settings,
//       url: "/settings",
//       color: "from-pink-600 to-purple-600"
//     }
//   ];

//   return (
//     <Card className="glass-effect border-0 shadow-xl">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-3">
//           <Zap className="w-6 h-6 text-yellow-500" />
//           Quick Actions
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 gap-3">
//           {actions.map((action, index) => (
//             <Link key={index} to={action.url}>
//               <Button
//                 variant="ghost"
//                 className="w-full h-auto p-4 glass-effect hover:shadow-lg transition-all duration-200 group"
//               >
//                 <div className="flex items-center gap-3 w-full">
//                   <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-200`}>
//                     <action.icon className="w-4 h-4 text-white" />
//                   </div>
//                   <div className="text-left flex-1">
//                     <h3 className="font-medium text-gray-900 dark:text-white">
//                       {action.title}
//                     </h3>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       {action.description}
//                     </p>
//                   </div>
//                 </div>
//               </Button>
//             </Link>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { MessageCircle, BookOpen, Settings, FileText, Zap } from 'lucide-react';

export default function QuickActions({ activeExam }) {
  const actions = [
    {
      title: "AI Assistant",
      description: "Get instant help with topics",
      icon: MessageCircle,
      url: "/chatbot",
      color: "from-purple-600 to-blue-600"
    },
    {
      title: "Study Resources",
      description: "Access videos, PDFs & links",
      icon: BookOpen,
      url: "/resources",
      color: "from-emerald-600 to-teal-600"
    },
    {
      title: "View Syllabus",
      description: "Check your exam syllabus",
      icon: FileText,
      url: "/syllabus",
      color: "from-orange-600 to-red-600"
    },
    {
      title: "Update Settings",
      description: "Modify study preferences",
      icon: Settings,
      url: "/settings",
      color: "from-pink-600 to-purple-600"
    }
  ];

  return (
    <Card className="glass-effect border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-yellow-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Link key={index} to={action.url}>
              <Button
                variant="ghost"
                className="w-full h-auto p-4 glass-effect hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}