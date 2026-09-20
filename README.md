# SkillBridge

> **Build your path. Bridge your skills. Reach your career goal.**

SkillBridge is a career guidance web application designed to help students understand where they are in their career journey, identify their skill gaps, and follow a personalized learning roadmap toward their target career.

## ✨ Features

* 🎯 **Career Goal Selection**
  Choose the career path you want to pursue.

* 📊 **Skills Assessment**
  Evaluate your current confidence level across the skills required for your selected career.

* 🔎 **Skill Gap Analysis**
  Understand your current strengths, areas that need improvement, and missing skills.

* 🗺️ **Personalized Roadmap**
  Follow a step-by-step learning path based on your current skill level.

* 🔒 **Project Unlock System**
  Real-world projects become available after completing the learning roadmap.

* 🚀 **Project Progress Tracking**
  Start, track, and complete projects to gain practical experience.

* ⭐ **XP & Level System**
  Earn XP as you progress through your career journey.

* 📈 **Dashboard**
  View your skills, roadmap progress, projects, XP, and overall career progress.

* 👤 **Profile & Career Tracks**
  Manage your journey and switch between different career tracks while keeping each track's progress separate.

## 🧭 Career Tracks

SkillBridge currently supports:

* Frontend Developer
* Backend Developer
* UI/UX Designer
* Data Analyst
* Cybersecurity
* Mobile Developer

## 🛠️ Tech Stack

* React.js
* JavaScript (ES6+)
* React Router
* Vite
* HTML5
* CSS3
* LocalStorage
* Git & GitHub

## 📂 Project Structure

```text
SkillBridge
├── public
├── src
│   ├── assets
│   ├── data
│   │   └── careerData.js
│   ├── pages
│   │   ├── CareerGoal.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Projects.jsx
│   │   ├── Roadmap.jsx
│   │   ├── SkillGap.jsx
│   │   └── Skills.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── Navbar.jsx
│   ├── main.jsx
│   └── trackStorage.js
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/reeme5913-maker/SkillBridge.git
```

### 2. Navigate to the project

```bash
cd SkillBridge
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will then be available through the local development URL shown in the terminal.

## 💾 Progress Tracking

SkillBridge uses **LocalStorage** to save the user's progress.

Each career track maintains its own:

* Skill assessment
* Roadmap progress
* Project progress
* XP and level

This allows users to switch between career tracks without losing their previous progress.

## 🎯 User Journey

```text
Career Goal
     ↓
Skills Assessment
     ↓
Skill Gap Analysis
     ↓
Personalized Roadmap
     ↓
Real-World Projects
     ↓
XP & Level Progress
     ↓
Dashboard & Profile
```

## 📌 Future Improvements

Possible future improvements include:

* User authentication
* Cloud-based progress storage
* More career tracks
* More projects and learning resources
* Achievement badges
* Progress analytics
* AI-powered career recommendations

## 👩‍💻 Author

**Reem Ehab**

Computer Science Student & Front-End Developer

Built with React.js and JavaScript.
