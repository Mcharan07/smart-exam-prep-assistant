# SmartExam – AI-Powered Exam Preparation Assistant

A comprehensive exam preparation platform designed to help students organize their studies efficiently. It features AI-powered study plan generation, syllabus analysis, resource management, and an intelligent chatbot tutor.

---

## 🚀 Features

- **🎯 Personalized Study Plans**  
  AI-generated daily schedules tailored to your exam date, syllabus, and available study hours.

- **🤖 AI Study Assistant**  
  24/7 chatbot (powered by Google Gemini) to explain concepts, solve doubts, and provide motivation.

- **📚 Resource Management**  
  Community-driven resource sharing for videos, PDFs, notes, and articles.

- **📋 Syllabus Management**  
  Add, edit, and manage syllabus topics for targeted learning.

- **📊 Progress Tracking**  
  Dashboards with topic completion, weekly activity, and study streaks.

- **🔐 Secure Authentication**  
  Full registration/login system using JWT and Bcrypt.

- **📱 Responsive UI**  
  Fully optimized interface for mobile, tablet, and desktop.

---

## 🛠 Tech Stack

### Frontend (Client)
- React 18  
- Tailwind CSS  
- Shadcn UI  
- React Router v6  
- Lucide React Icons  
- Axios  

### Backend (Server)
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Google Gemini API (`@google/generative-ai`)  
- JWT Authentication  
- Bcrypt  

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v16+)  
- MongoDB (Local or Atlas)  
- Google Gemini API Key  

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd smart-exam-prep-assistant
2. Install Dependencies
Backend
bash
Copy code
cd server
npm install
Frontend
bash
Copy code
cd ../client
npm install
3. Configure Environment Variables
Backend (server/.env)
ini
Copy code
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/smartexam
JWT_SECRET=your_super_secret_key_123
GEMINI_API_KEY=AIzaSy...<Your_Google_Gemini_Key>
Frontend (client/.env)
bash
Copy code
REACT_APP_API_URL=http://localhost:5000/api
4. Start the Application
Terminal 1 – Backend
bash
Copy code
cd server
npm start
Expected:

pgsql
Copy code
🚀 Server running on port 5000
✅ Connected to MongoDB
Terminal 2 – Frontend
bash
Copy code
cd client
npm start
Automatically opens:
http://localhost:3000

📂 Project Structure
pgsql
Copy code
smart-exam-prep-assistant/
├── client/                 
│   ├── src/
│   │   ├── api/            
│   │   ├── components/     
│   │   │   ├── dashboard/  
│   │   │   ├── resources/  
│   │   │   └── ui/         
│   │   ├── contexts/       
│   │   ├── pages/          
│   │   │   ├── Dashboard.js
│   │   │   ├── Resources.js
│   │   │   ├── Settings.js
│   │   │   └── Login.js
│   │   ├── services/       
│   │   └── App.js          
│
├── server/                 
│   ├── controllers/        
│   ├── middleware/         
│   ├── models/             
│   ├── routes/             
│   ├── services/           
│   ├── seedResources.js    
│   └── server.js           
📡 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login & get JWT

Exams
Method	Endpoint	Description
GET	/api/exams	Get user's exams
POST	/api/exams	Create exam
POST	/api/exams/:id/generate-plan	AI study plan generation

Study Plans
Method	Endpoint	Description
GET	/api/study-plans	Get daily tasks
PATCH	/api/study-plans/:id/topics/:idx/complete	Mark topic as complete

Resources
| GET | /api/resources | Fetch all resources |

Chat
| POST | /api/chat | AI chatbot powered by Gemini |

💡 Usage Guide
Register → Create account

Add Exam → Enter exam name, date, subjects

Add Syllabus → Paste topics

Generate Smart Study Plan → AI creates schedule

Track Progress → Dashboard shows daily tasks

Use Chatbot → Solve doubts & get explanations

Browse Resources → View videos, PDFs, notes

🔧 Troubleshooting
MongoDB Issues
Ensure MongoDB is running (mongod)

Check MONGODB_URI in .env

AI Errors
Verify GEMINI_API_KEY

Ensure Gemini API is enabled

If 404 Model Not Found:
Update model to gemini-1.5-flash or gemini-pro

Frontend API Issues
Make sure backend runs on 5000

Ensure: REACT_APP_API_URL=http://localhost:5000/api

🤝 Contributing
Fork the repository

Create a feature branch

bash
Copy code
git checkout -b feature/AmazingFeature
Commit your changes

Push to GitHub

Open a Pull Request

📄 License
Distributed under the MIT License.