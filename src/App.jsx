import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CareerGoal from "./pages/CareerGoal";
import Skills from "./pages/Skills";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SkillBridge</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <button
          className="nav-button"
          onClick={() => navigate("/career")}
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-tag">
            YOUR CAREER JOURNEY STARTS HERE
          </span>

          <h1>
            Build Your Path to Your
            <span> Dream Career.</span>
          </h1>

          <p>
            SkillBridge helps students understand their current skills, discover what's missing, and follow a personalized roadmap to build the experience they need for their dream career.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/career")}
            >
              Start Your Journey →
            </button>

            <a href="#how-it-works" className="secondary-btn">
              Explore How It Works
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="bridge-card">
            <div className="bridge-side">
              <small>WHERE YOU ARE</small>
              <h3>Current Skills</h3>
              <p>HTML ✓</p>
              <p>CSS ✓</p>
              <p>JavaScript ◐</p>
            </div>

            <div className="bridge-icon">🌉</div>

            <div className="bridge-side">
              <small>WHERE YOU WANT TO BE</small>
              <h3>Dream Career</h3>
              <p>Frontend Developer</p>
              <span>🎯</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section" id="how-it-works">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>Your Journey, Step by Step</h2>
          <p>
            Turn your career goal into a clear path you can actually follow.
          </p>
        </div>

        <div className="steps">
          <div className="step-card">
            <span>01</span>
            <div>🎯</div>
            <h3>Choose Your Goal</h3>
            <p>Choose the career you want to pursue.</p>
          </div>

          <div className="step-card">
            <span>02</span>
            <div>🔍</div>
            <h3>Discover Your Gap</h3>
            <p>Find out what skills you have and what's missing.</p>
          </div>

          <div className="step-card">
            <span>03</span>
            <div>🗺️</div>
            <h3>Follow Your Roadmap</h3>
            <p>Get a personalized learning path based on your goal.</p>
          </div>

          <div className="step-card">
            <span>04</span>
            <div>🚀</div>
            <h3>Learn, Build & Grow</h3>
            <p>Practice with projects and track your progress.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features-section" id="features">
        <div className="section-heading">
          <span>WHY SKILLBRIDGE?</span>
          <h2>Everything You Need to Move Forward</h2>
        </div>

        <div className="features">
          <div className="feature-card">
            <div>🎯</div>
            <h3>Career Planning</h3>
            <p>Know exactly where you're heading.</p>
          </div>

          <div className="feature-card">
            <div>🧩</div>
            <h3>Skill Assessment</h3>
            <p>Understand your current skill level.</p>
          </div>

          <div className="feature-card">
            <div>🗺️</div>
            <h3>Personalized Roadmap</h3>
            <p>Know what to learn next and in what order.</p>
          </div>

          <div className="feature-card">
            <div>💻</div>
            <h3>Real Projects</h3>
            <p>Turn what you learn into practical experience.</p>
          </div>
        </div>
      </section>

      {/* Bridge */}
      <section className="bridge-section" id="about">
        <div className="section-heading">
          <span>THE BRIDGE</span>
          <h2>From Where You Are to Where You Want to Be</h2>
        </div>

        <div className="journey">
          <div className="journey-box">
            <small>WHERE YOU ARE</small>
            <h3>Current Skills</h3>
            <p>HTML ✓</p>
            <p>CSS ✓</p>
            <p>JavaScript ◐</p>
          </div>

          <div className="journey-line">
            <span>SKILLBRIDGE</span>
            <div>→</div>
          </div>

          <div className="journey-box">
            <small>WHERE YOU WANT TO BE</small>
            <h3>Dream Career</h3>
            <p>Frontend Developer</p>
            <p>🚀 Career Ready</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to Build Your Path?</h2>
        <p>Your career journey starts with one step.</p>

        <button
          className="primary-btn"
          onClick={() => navigate("/career")}
        >
          Start Your Journey →
        </button>
      </section>

      {/* Footer */}
      <footer>
        <div className="logo">SkillBridge</div>
        <p>From where you are → to where you want to be.</p>
        <span>© 2026 SkillBridge</span>
      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/career" element={<CareerGoal />} />
  <Route path="/skills" element={<Skills />} />
  <Route path="/gap" element={<SkillGap />} />
  <Route path="/roadmap" element={<Roadmap />} />
  <Route path="/projects" element={<Projects />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile" element={<Profile />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;