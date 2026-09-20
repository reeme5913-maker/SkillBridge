import { useNavigate } from "react-router-dom";
import { careerData } from "../data/careerData";
import { getTrackProgress } from "../trackStorage";
import Navbar from "../Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const savedCareer = JSON.parse(
    localStorage.getItem("careerGoal")
  );

  const careerName =
    savedCareer?.title || "Frontend Developer";

  const currentCareer = careerData[careerName];

  const trackProgress = getTrackProgress(careerName);

  const savedSkills = trackProgress.skills || {};

  const completedSteps =
    trackProgress.completedSteps || [];

  const savedProjectProgress =
    trackProgress.projectProgress || {};

  const requiredSkills = currentCareer.skills;
  const roadmap = currentCareer.roadmap;
  const projects = currentCareer.projects;

  const completedProjects = projects.filter(
    (project) =>
      savedProjectProgress[project] === "completed"
  );

  const ownedSkills = requiredSkills.filter(
    (skill) =>
      savedSkills[skill] === "Intermediate" ||
      savedSkills[skill] === "Advanced"
  );

  const readiness = Math.round(
    (ownedSkills.length / requiredSkills.length) * 100
  );

  const roadmapProgress = Math.round(
    (completedSteps.length / roadmap.length) * 100
  );

  // XP comes from real achievements in this track
  const xp =
    completedSteps.length * 150 +
    completedProjects.length * 200;

  const level = Math.max(
    1,
    Math.floor(xp / 500) + 1
  );

  const currentLevelXP = xp % 500;

  const levelProgress =
    (currentLevelXP / 500) * 100;

  const xpToNextLevel =
    currentLevelXP === 0
      ? 500
      : 500 - currentLevelXP;

  // Check if the user has started this track
  const hasStarted =
    Object.keys(savedSkills).length > 0 ||
    completedSteps.length > 0 ||
    Object.keys(savedProjectProgress).length > 0;

  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        {/* Header */}

        <div className="dashboard-header">

          <div>
            <span>YOUR DASHBOARD</span>

            <h1>
              Your Career Journey at a Glance
            </h1>

            <p>
             Track your skills, roadmap progress, projects, and growth — all in one place.
            </p>
          </div>

          <div className="dashboard-header-buttons">

            <button
              className="secondary-btn"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </button>

            <button
              className="primary-btn"
              onClick={() => navigate("/roadmap")}
            >
              Continue Roadmap →
            </button>

          </div>

        </div>

        {/* Empty State */}

        {!hasStarted && (
          <div className="dashboard-empty-state">

            <div className="empty-icon">
              🚀
            </div>

            <span>YOUR JOURNEY STARTS HERE</span>

            <h2>
              Ready to become a {careerName}?
            </h2>

            <p>
              You haven't started this career track yet.
              Start by reviewing your skills and follow
              your personalized roadmap step by step.
            </p>

            <button
              className="primary-btn"
              onClick={() => navigate("/skills")}
            >
              Start Your Journey →
            </button>

          </div>
        )}

        {/* Career Card */}

        <div className="dashboard-career">

          <div>
            <small>YOUR CAREER GOAL</small>

            <h2>{careerName}</h2>

            <p>
              You're building the skills and practical experience needed to move toward this career.
            </p>
          </div>

          <div className="career-status">
            <span>CAREER READINESS</span>
            <strong>{readiness}%</strong>
          </div>

        </div>

        {/* Stats */}

        <div className="dashboard-stats">

          <div className="dashboard-stat">
            <span>ROADMAP</span>
            <h2>{roadmapProgress}%</h2>
            <p>Progress</p>
          </div>

          <div className="dashboard-stat">
            <span>SKILLS</span>
            <h2>
              {ownedSkills.length}/{requiredSkills.length}
            </h2>
            <p>Skills Ready</p>
          </div>

          <div className="dashboard-stat">
            <span>TRACK XP</span>
            <h2>{xp}</h2>
            <p>Experience Points</p>
          </div>

          <div className="dashboard-stat">
            <span>TRACK LEVEL</span>
            <h2>{level}</h2>
            <p>Current Level</p>
          </div>

          <div className="dashboard-stat">
            <span>PROJECTS</span>
            <h2>
              {completedProjects.length}/{projects.length}
            </h2>
            <p>Completed</p>
          </div>

        </div>

        {/* Main Grid */}

        <div className="dashboard-grid">

          {/* Roadmap */}

          <div className="dashboard-card">

            <div className="dashboard-card-header">

              <div>
                <span>LEARNING</span>
                <h3>Roadmap Progress</h3>
              </div>

              <button
                onClick={() => navigate("/roadmap")}
              >
                View →
              </button>

            </div>

            <div className="dashboard-progress">

              <div className="dashboard-progress-top">

                <span>
                  {completedSteps.length} of {roadmap.length} completed
                </span>

                <strong>{roadmapProgress}%</strong>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${roadmapProgress}%`,
                  }}
                ></div>

              </div>

            </div>

            <div className="next-step">

              <small>NEXT STEP</small>

              <h4>
                {roadmap.find(
                  (step) =>
                    !completedSteps.includes(step)
                ) || "All steps completed! 🎉"}
              </h4>

            </div>

          </div>

          {/* Skills */}

          <div className="dashboard-card">

            <div className="dashboard-card-header">

              <div>
                <span>SKILLS</span>
                <h3>Your Skills</h3>
              </div>

              <button
                onClick={() => navigate("/skills")}
              >
                Edit →
              </button>

            </div>

            <div className="dashboard-skills">

              {requiredSkills.map((skill) => (

                <div
                  className="dashboard-skill"
                  key={skill}
                >

                  <span>{skill}</span>

                  <small>
                    {savedSkills[skill] || "Not started"}
                  </small>

                </div>

              ))}

            </div>

          </div>

          {/* Projects */}

          <div className="dashboard-card dashboard-projects">

            <div className="dashboard-card-header">

              <div>
                <span>PRACTICE</span>
                <h3>Your Projects</h3>
              </div>

              <button
                onClick={() => navigate("/projects")}
              >
                View →
              </button>

            </div>

            <div className="dashboard-project-list">

              {projects.map((project, index) => {

                const status =
                  savedProjectProgress[project];

                return (

                  <div
                    className="dashboard-project"
                    key={project}
                  >

                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p>{project}</p>

                    <small>
                      {status === "completed"
                        ? "✓ Completed"
                        : status === "in-progress"
                        ? "In Progress"
                        : "Not Started"}
                    </small>

                  </div>

                );

              })}

            </div>

          </div>

          {/* XP */}

          <div className="dashboard-card xp-card">

            <span>KEEP BUILDING</span>

            <h3>Track Level {level}</h3>

            <p>
              You currently have{" "}
              <strong>{xp} XP</strong> in this career
              track. Keep completing roadmap steps and projects to unlock the next level.
            </p>

            <div className="xp-progress">

              <div
                style={{
                  width: `${levelProgress}%`,
                }}
              ></div>

            </div>

            <small>
              {`${xpToNextLevel} XP until next level`}
            </small>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;