import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Star, Clock, ExternalLink } from 'lucide-react';

export default function ResourceCard({ resource, typeIcon: TypeIcon, typeColor }) {
  const difficultyColors = {
    beginner: "bg-green-100 text-green-800 border-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    advanced: "bg-red-100 text-red-800 border-red-200"
  };

  const handleOpenResource = () => {
    window.open(resource.url, '_blank');
  };

  return (
    <Card className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${typeColor} shadow-lg`}>
            <TypeIcon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {resource.rating || 4.5}
            </span>
          </div>
        </div>
        
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-200">
          {resource.title}
        </CardTitle>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {resource.subject}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {resource.topic}
          </Badge>
          {resource.difficulty && (
            <Badge className={`text-xs ${difficultyColors[resource.difficulty]}`}>
              {resource.difficulty}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
          {resource.description || "High-quality learning resource to help you master this topic."}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          {resource.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{resource.duration}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="capitalize">{resource.type}</span>
          </div>
        </div>

        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <Button 
          onClick={handleOpenResource}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-200 transform hover:scale-105"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Open Resource
        </Button>
      </CardContent>
    </Card>
  );
}