// src/api/base44Client.js

// This file acts as a "Mock" or "Bridge" to your data
// eventually you will replace this data with real fetch() calls to your online website.

export const base44 = {
  auth: {
    me: async () => {
      // Simulating a logged-in user
      return { email: "student@example.com", name: "Demo Student" };
    }
  },
  entities: {
    Exam: {
      filter: async (query) => {
        // Simulating finding an active exam
        return [{ status: 'active', subject: 'Mathematics' }];
      }
    },
    Resource: {
      list: async () => {
        // Simulating a list of resources coming from the "online" source
        return [
          {
            id: 1,
            title: "Intro to Algebra",
            topic: "Algebra",
            subject: "Mathematics",
            type: "video",
            difficulty: "beginner",
            url: "https://example.com/video1"
          },
          {
            id: 2,
            title: "Advanced React Patterns",
            topic: "React",
            subject: "Computer Science",
            type: "pdf",
            difficulty: "advanced",
            url: "https://example.com/guide.pdf"
          },
          {
            id: 3,
            title: "Physics Formulas",
            topic: "Kinematics",
            subject: "Physics",
            type: "article",
            difficulty: "intermediate",
            url: "https://example.com/physics"
          }
        ];
      },
      create: async (data) => {
        console.log("Saving new resource to online DB:", data);
        return { ...data, id: Date.now() };
      }
    }
  }
};