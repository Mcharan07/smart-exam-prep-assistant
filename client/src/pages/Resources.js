// import React, { useState, useEffect, useCallback } from "react";
// import {
//   BookOpen,
//   Video,
//   FileText,
//   Globe,
//   Search
// } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Input } from "../components/ui/input";
// import { Button } from "../components/ui/button";
// import { Badge } from "../components/ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
// import { base44 } from "../api/base44Client.js";

// import ResourceCard from "../components/resources/ResourceCard";
// import AddResourceDialog from "../components/resources/AddResourceDialog";

// export default function Resources() {
//   const [resources, setResources] = useState([]);
//   const [filteredResources, setFilteredResources] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("all");
//   const [selectedType, setSelectedType] = useState("all");
//   const [selectedDifficulty, setSelectedDifficulty] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);

//   const filterResources = useCallback(() => {
//     let filtered = [...resources];

//     if (searchTerm) {
//       filtered = filtered.filter(resource =>
//         resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         resource.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         resource.subject.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (selectedSubject !== "all") {
//       filtered = filtered.filter(resource => resource.subject === selectedSubject);
//     }

//     if (selectedType !== "all") {
//       filtered = filtered.filter(resource => resource.type === selectedType);
//     }

//     if (selectedDifficulty !== "all") {
//       filtered = filtered.filter(resource => resource.difficulty === selectedDifficulty);
//     }

//     setFilteredResources(filtered);
//   }, [resources, searchTerm, selectedSubject, selectedType, selectedDifficulty]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   useEffect(() => {
//     filterResources();
//   }, [filterResources]);

//   const loadData = async () => {
//     setIsLoading(true);
//     try {
//       const user = await base44.auth.me();
//       const userExams = await base44.entities.Exam.filter({ created_by: user.email });

//       const activeExam = userExams.find(e => e.status === 'active');
//       if (activeExam && activeExam.subject) {
//         setSelectedSubject(activeExam.subject);
//       }

//       const allResources = await base44.entities.Resource.list();
//       setResources(allResources);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleAddResource = async (resourceData) => {
//     const newResource = await base44.entities.Resource.create(resourceData);
//     setResources(prev => [newResource, ...prev]);
//   };

//   const getUniqueSubjects = () => {
//     const subjects = [...new Set(resources.map(r => r.subject))];
//     return subjects.filter(Boolean);
//   };

//   const getResourceTypeIcon = (type) => {
//     switch (type) {
//       case 'video': return Video;
//       case 'pdf': return FileText;
//       case 'website': return Globe;
//       default: return BookOpen;
//     }
//   };

//   const getResourceTypeColor = (type) => {
//     switch (type) {
//       case 'video': return 'from-red-500 to-pink-500';
//       case 'pdf': return 'from-blue-500 to-purple-500';
//       case 'website': return 'from-green-500 to-emerald-500';
//       case 'article': return 'from-orange-500 to-yellow-500';
//       case 'practice_test': return 'from-purple-500 to-indigo-500';
//       default: return 'from-gray-500 to-gray-600';
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1,2,3,4,5,6].map(i => (
//               <div key={i} className="h-64 bg-white/10 rounded-xl animate-pulse glass-effect"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-8 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Study Resources 📚
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300">
//             Curated learning materials to boost your exam preparation
//           </p>
//         </div>

//         {/* Search and Filters */}
//         <Card className="glass-effect border-0 shadow-xl">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-3">
//               <Search className="w-6 h-6 text-purple-600" />
//               Find Resources
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//               <div className="lg:col-span-2">
//                 <Input
//                   placeholder="Search resources, topics, subjects..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="glass-effect border-white/20"
//                 />
//               </div>

//               <Select value={selectedSubject} onValueChange={setSelectedSubject}>
//                 <SelectTrigger className="glass-effect border-white/20">
//                   <SelectValue placeholder="Subject" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Subjects</SelectItem>
//                   {getUniqueSubjects().map(subject => (
//                     <SelectItem key={subject} value={subject}>
//                       {subject}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Select value={selectedType} onValueChange={setSelectedType}>
//                 <SelectTrigger className="glass-effect border-white/20">
//                   <SelectValue placeholder="Type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Types</SelectItem>
//                   <SelectItem value="video">Videos</SelectItem>
//                   <SelectItem value="pdf">PDFs</SelectItem>
//                   <SelectItem value="website">Websites</SelectItem>
//                   <SelectItem value="article">Articles</SelectItem>
//                   <SelectItem value="practice_test">Practice Tests</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
//                 <SelectTrigger className="glass-effect border-white/20">
//                   <SelectValue placeholder="Difficulty" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Levels</SelectItem>
//                   <SelectItem value="beginner">Beginner</SelectItem>
//                   <SelectItem value="intermediate">Intermediate</SelectItem>
//                   <SelectItem value="advanced">Advanced</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Results Summary */}
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//             {filteredResources.length} Resources Found
//           </h2>
//           <AddResourceDialog onResourceAdded={handleAddResource} />
//           <div className="flex gap-2">
//             {selectedSubject !== "all" && (
//               <Badge className="bg-blue-100 text-blue-800">
//                 Subject: {selectedSubject}
//               </Badge>
//             )}
//             {selectedType !== "all" && (
//               <Badge className="bg-green-100 text-green-800">
//                 Type: {selectedType}
//               </Badge>
//             )}
//             {selectedDifficulty !== "all" && (
//               <Badge className="bg-purple-100 text-purple-800">
//                 Level: {selectedDifficulty}
//               </Badge>
//             )}
//           </div>
//         </div>

//         {/* Resources Grid */}
//         {filteredResources.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredResources.map((resource) => (
//               <ResourceCard
//                 key={resource.id}
//                 resource={resource}
//                 typeIcon={getResourceTypeIcon(resource.type)}
//                 typeColor={getResourceTypeColor(resource.type)}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto">
//               <BookOpen className="w-20 h-20 mx-auto text-gray-400 mb-6" />
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                 No Resources Found
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 Try adjusting your search criteria or explore different subjects.
//               </p>
//               <Button
//                 onClick={() => {
//                   setSearchTerm("");
//                   setSelectedSubject("all");
//                   setSelectedType("all");
//                   setSelectedDifficulty("all");
//                 }}
//                 className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
//               >
//                 Clear All Filters
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  Video,
  FileText,
  Globe,
  Search,
  PenTool,
  Laptop
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import api from "../services/api";

import ResourceCard from "../components/resources/ResourceCard";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const filterResources = useCallback(() => {
    let filtered = [...resources];

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSubject !== "all") {
      filtered = filtered.filter(resource => resource.subject === selectedSubject);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(resource => resource.difficulty === selectedDifficulty);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedSubject, selectedType, selectedDifficulty]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterResources();
  }, [filterResources]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // 1. Try to set default subject based on active exam
      try {
        const examsRes = await api.get('/exams');
        const activeExam = examsRes.data.find(e => e.status === 'active');
        if (activeExam && activeExam.subject) {
          setSelectedSubject(activeExam.subject);
        }
      } catch (e) { console.log("No active exam"); }

      // 2. Fetch all resources
      const response = await api.get('/resources');
      setResources(response.data);
    } catch (error) {
      console.error("Error loading resources:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUniqueSubjects = () => {
    const subjects = [...new Set(resources.map(r => r.subject))];
    return subjects.filter(Boolean);
  };

  const getResourceTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'pdf': return FileText;
      case 'website': return Globe;
      case 'article': return PenTool;
      case 'practice_test': return Laptop;
      default: return BookOpen;
    }
  };

  const getResourceTypeColor = (type) => {
    switch (type) {
      case 'video': return 'from-red-500 to-pink-500';
      case 'pdf': return 'from-blue-500 to-purple-500';
      case 'website': return 'from-green-500 to-emerald-500';
      case 'article': return 'from-orange-500 to-yellow-500';
      case 'practice_test': return 'from-purple-500 to-indigo-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-64 bg-white/10 rounded-xl animate-pulse glass-effect"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Study Resources 📚
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Curated learning materials for your exam preparation
          </p>
        </div>

        <Card className="glass-effect border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Search className="w-6 h-6 text-purple-600" />
              Find Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search resources, topics, subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="glass-effect border-white/20"
                />
              </div>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {getUniqueSubjects().map(subject => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="pdf">PDFs</SelectItem>
                  <SelectItem value="website">Websites</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="practice_test">Practice Tests</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="glass-effect border-white/20">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Header (No Add Button) */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredResources.length} Resources Found
          </h2>
          <div className="flex gap-2">
            {selectedSubject !== "all" && (
              <Badge className="bg-blue-100 text-blue-800">
                Subject: {selectedSubject}
              </Badge>
            )}
            {selectedType !== "all" && (
              <Badge className="bg-green-100 text-green-800">
                Type: {selectedType}
              </Badge>
            )}
          </div>
        </div>

        {/* Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource._id || resource.id}
                resource={resource}
                typeIcon={getResourceTypeIcon(resource.type)}
                typeColor={getResourceTypeColor(resource.type)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass-effect rounded-2xl p-12 max-w-2xl mx-auto">
              <BookOpen className="w-20 h-20 mx-auto text-gray-400 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Resources Found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Try adjusting your filters.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSubject("all");
                  setSelectedType("all");
                  setSelectedDifficulty("all");
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}