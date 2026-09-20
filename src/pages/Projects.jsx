import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { careerData } from "../data/careerData";
import { getTrackProgress, saveTrackProgress } from "../trackStorage";
import Navbar from "../Navbar";

function Projects() {
  const navigate = useNavigate();

  const savedCareer = JSON.parse(localStorage.getItem("careerGoal"));

  const careerName = savedCareer?.title || "Frontend Developer";
  const currentCareer = careerData[careerName];

  const projects = currentCareer.projects;
  const trackProgress = getTrackProgress(careerName);

const completedSteps = trackProgress.completedSteps || [];

const roadmapCompleted =
  completedSteps.length === currentCareer.roadmap.length;

const [projectProgress, setProjectProgress] = useState(
  trackProgress.projectProgress || {}
);
useEffect(() => {
  if (!roadmapCompleted) {
    navigate("/roadmap", { replace: true });
  }
}, [roadmapCompleted, navigate]);

const startProject = (project) => {
  const updatedProjects = {
    ...projectProgress,
    [project]: "in-progress",
  };

  setProjectProgress(updatedProjects);

  saveTrackProgress(careerName, {
    ...trackProgress,
    projectProgress: updatedProjects,
  });
};

const completeProject = (project) => {
  if (projectProgress[project] === "completed") {
    return;
  }

  const updatedProjects = {
    ...projectProgress,
    [project]: "completed",
  };

  setProjectProgress(updatedProjects);

  saveTrackProgress(careerName, {
    ...trackProgress,
    projectProgress: updatedProjects,
  });
};

  const getProjectStatus = (project) => {
    return projectProgress[project] || "not-started";
  };

  const completedProjects = projects.filter(
    (project) => projectProgress[project] === "completed"
  );

  return (
     <>
    <Navbar />
    <div className="projects-page">

      <div className="projects-header">
        <span>LEARN → PRACTICE → BUILD</span>

        <h1>Build Real Projects</h1>

        <p>
        Put your new skills into practice by building real-world projects designed for your career path.
          <strong> {careerName}</strong>.
        </p>
      </div>

      <div className="projects-summary">
        <div>
          <span>PROJECT PROGRESS</span>
          <h2>
            {completedProjects.length}/{projects.length}
          </h2>
          <p>Projects completed</p>
        </div>

        <div>
          <span>YOUR GOAL</span>
          <h2>{careerName}</h2>
          <p>Build projects related to your career path.</p>
        </div>
      </div>

      <div className="projects-grid">

        {projects.map((project, index) => {

          const status = getProjectStatus(project);

          return (
            <div
              className={`project-card ${status}`}
              key={project}
            >

              <div className="project-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="project-icon">
                💻
              </div>

              <h3>{project}</h3>

              <p>
                Practice your {careerName} skills by building this
                real-world project.
              </p>

              <div className="project-status">

                {status === "not-started" && (
                  <span>Not Started</span>
                )}

                {status === "in-progress" && (
                  <span>In Progress</span>
                )}

                {status === "completed" && (
                  <span>✓ Completed</span>
                )}

              </div>

              <div className="project-footer">

                <span>
                  {status === "completed"
                    ? "Great job! 🎉"
                    : "Practice Project"}
                </span>

                {status === "not-started" && (
                  <button
                    onClick={() => startProject(project)}
                  >
                    Start Project →
                  </button>
                )}

                {status === "in-progress" && (
                  <button
                    onClick={() => completeProject(project)}
                  >
                    Complete Project ✓
                  </button>
                )}

                {status === "completed" && (
                  <button
                    className="completed-project-btn"
                    disabled
                  >
                    Completed ✓
                  </button>
                )}

              </div>

            </div>
          );
        })}

      </div>

      <div className="projects-cta">

        <div>
          <span>YOUR PROGRESS</span>

          <h2>
            {completedProjects.length === projects.length
              ? "You completed all your projects! 🎉"
              : "Turn your skills into experience."}
          </h2>

          <p>
            Every project you complete helps you gain practical
            experience and move closer to your career goal.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/dashboard")}
        >
          View My Progress →
        </button>

      </div>

    </div>
    </>
  );
}

export default Projects;