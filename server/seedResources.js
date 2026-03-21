const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Resource = require('./models/Resource');
const User = require('./models/User');

dotenv.config();

const resourcesToAdd = [
  {
    title: "Complete Python Course for Beginners",
    subject: "Computer Science",
    topic: "Programming",
    type: "video",
    url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    difficulty: "beginner",
    description: "A full 4-hour course on Python basics covering variables, loops, and functions.",
    tags: ["python", "coding", "basics"],
    rating: 4.8,
    duration: "4 hours"
  },
  {
    title: "Engineering Mathematics Handbook",
    subject: "Mathematics",
    topic: "Calculus",
    type: "pdf",
    url: "https://tutorial.math.lamar.edu/pdf/Calculus_I_Complete.pdf",
    difficulty: "advanced",
    description: "Comprehensive formulas and practice problems for engineering mathematics.",
    tags: ["math", "formulas", "engineering"],
    rating: 4.5
  },
  {
    title: "Physics: Kinematics Explained",
    subject: "Physics",
    topic: "Mechanics",
    type: "article",
    url: "https://www.physicsclassroom.com/class/1DKin",
    difficulty: "intermediate",
    description: "Detailed breakdown of motion in one dimension with examples.",
    tags: ["physics", "kinematics", "motion"],
    rating: 4.2,
    duration: "15 mins"
  },
  {
    title: "Data Structures Visualization",
    subject: "Computer Science",
    topic: "Algorithms",
    type: "website",
    url: "https://visualgo.net/en",
    difficulty: "intermediate",
    description: "Interactive animations for data structures and algorithms.",
    tags: ["algorithms", "visual", "cs"],
    rating: 4.9
  },
  {
    title: "Complete Python Course for Beginners",
    subject: "Computer Science",
    topic: "Programming",
    type: "video",
    url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
    difficulty: "beginner",
    description: "A full 4-hour course on Python basics covering variables, loops, and functions.",
    tags: ["python", "coding", "basics"],
    rating: 4.8,
    duration: "4 hours"
  },
  {
    title: "Java Programming & OOPS Concepts",
    subject: "Computer Science",
    topic: "Java",
    type: "video",
    url: "https://www.youtube.com/watch?v=bm0OyhwHEBA",
    difficulty: "intermediate",
    description: "Deep dive into Object-Oriented Programming using Java: Classes, Inheritance, and Polymorphism.",
    tags: ["java", "oops", "backend"],
    rating: 4.9,
    duration: "2 hours"
  },
  {
    title: "Operating Systems: Process Management",
    subject: "Computer Science",
    topic: "Operating Systems",
    type: "article",
    url: "https://www.geeksforgeeks.org/introduction-of-process-management/",
    difficulty: "intermediate",
    description: "Comprehensive guide to CPU scheduling, process states, and context switching.",
    tags: ["os", "processes", "scheduling"],
    rating: 4.6
  },
  {
    title: "Deep Learning Specialization - Neural Networks",
    subject: "Artificial Intelligence",
    topic: "Deep Learning",
    type: "website",
    url: "https://www.coursera.org/specializations/deep-learning",
    difficulty: "advanced",
    description: "Master the foundations of Deep Learning and understand how neural networks work.",
    tags: ["dl", "ai", "neural-networks"],
    rating: 4.9
  },
  {
    title: "Engineering Mathematics Handbook",
    subject: "Mathematics",
    topic: "Calculus",
    type: "pdf",
    url: "https://tutorial.math.lamar.edu/pdf/Calculus_I_Complete.pdf",
    difficulty: "advanced",
    description: "Comprehensive formulas and practice problems for engineering mathematics.",
    tags: ["math", "formulas", "engineering"],
    rating: 4.5
  },
  {
    title: "Data Structures Visualization",
    subject: "Computer Science",
    topic: "Algorithms",
    type: "website",
    url: "https://visualgo.net/en",
    difficulty: "intermediate",
    description: "Interactive animations for data structures and algorithms.",
    tags: ["algorithms", "visual", "cs"],
    rating: 4.9
  },
  
];

const seedDB = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find a user to assign as the "creator" (required by Schema)
    const adminUser = await User.findOne(); 

    if (!adminUser) {
      console.log('❌ No users found. Please register an account in the app first.');
      process.exit();
    }

    console.log(`👤 Assigning resources to user: ${adminUser.email}`);

    // Map the resources to include the created_by field
    const resourcesWithUser = resourcesToAdd.map(res => ({
      ...res,
      created_by: adminUser._id // This matches your Schema requirement
    }));

    // Clear existing resources (optional, uncomment if you want to wipe old data first)
    // await Resource.deleteMany({});

    // Insert into DB
    await Resource.insertMany(resourcesWithUser);
    
    console.log(`✅ Successfully added ${resourcesToAdd.length} resources!`);
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  }
};

seedDB();