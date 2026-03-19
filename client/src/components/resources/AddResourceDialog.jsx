import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

export default function AddResourceDialog({ onResourceAdded }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "video",
    url: "",
    subject: "",
    topic: "",
    branch: "Computer Science",
    difficulty: "beginner",
    duration: "",
    rating: 4,
    description: "",
    tags: ""
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.url || !formData.subject || !formData.topic) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const resourceData = {
        ...formData,
        rating: Number(formData.rating),
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
      };
      
      await onResourceAdded(resourceData);
      
      // Reset form
      setFormData({
        title: "",
        type: "video",
        url: "",
        subject: "",
        topic: "",
        branch: "Computer Science",
        difficulty: "beginner",
        duration: "",
        rating: 4,
        description: "",
        tags: ""
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding resource:", error);
      alert("Failed to add resource. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resourceTypes = ["video", "pdf", "website", "article", "practice_test", "notes"];
  const difficulties = ["beginner", "intermediate", "advanced"];
  const branches = [
    "Computer Science", "Electronics", "Mechanical", "Civil", "Chemical",
    "Electrical", "Mathematics", "Physics", "Chemistry", "Biology",
    "Business", "Economics", "Literature", "History", "Medicine", "Law", "Psychology", "Other"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Resource</DialogTitle>
          <DialogDescription>
            Add a learning resource to help with exam preparation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Data Structures Complete Course"
                required
              />
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type">Resource Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ").charAt(0).toUpperCase() + type.replace("_", " ").slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                placeholder="https://..."
                required
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="e.g., Data Structures"
                required
              />
            </div>

            {/* Topic */}
            <div className="space-y-2">
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => handleInputChange("topic", e.target.value)}
                placeholder="e.g., Arrays and Linked Lists"
                required
              />
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <Label htmlFor="branch">Academic Branch</Label>
              <Select value={formData.branch} onValueChange={(value) => handleInputChange("branch", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(branch => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                placeholder="e.g., 5 hours"
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the resource..."
                rows={3}
              />
            </div>

            {/* Tags */}
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange("tags", e.target.value)}
                placeholder="e.g., programming, algorithms, beginner"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {isSubmitting ? "Adding..." : "Add Resource"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}