import { useNavigate } from "react-router-dom";
import { careerData } from "../data/careerData";
import {
  getAllTrackProgress,
  getTrackProgress,
  resetTrackProgress,
} from "../trackStorage";
import Navbar from "../Navbar";

function Profile() {
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

  const projectProgress =
    trackProgress.projectProgress || {};

  const requiredSkills = currentCareer.skills;
  const roadmap = currentCareer.roadmap;
  const projects = currentCareer.projects;

  /* ---------------- Skills ---------------- */

  const ownedSkills = requiredSkills.filter(
    (skill) =>
      savedSkills[skill] === "Intermediate" ||
      savedSkills[skill] === "Advanced"
  );

  const readiness = Math.round(
    (ownedSkills.length / requiredSkills.length) * 100
  );

  /* ---------------- Roadmap ---------------- */

  const roadmapProgress = Math.round(
    (completedSteps.length / roadmap.length) * 100
  );

  /* ---------------- Projects ---------------- */

  const completedProjects = projects.filter(
    (project) =>
      projectProgress[project] === "completed"
  );

  /* ---------------- XP & Level ---------------- */

  const xp =
    completedSteps.length * 150 +
    completedProjects.length * 200;

  const level = Math.max(
    1,
    Math.floor(xp / 500) + 1
  );

  /* ---------------- Achievements ---------------- */

  const achievements = [
    {
      title: "First Step",
      description:
        "Complete your first roadmap step.",
      icon: "🎯",
      unlocked:
        completedSteps.length >= 1,
    },

    {
      title: "Roadmap Explorer",
      description:
        "Complete 3 roadmap steps.",
      icon: "🗺️",
      unlocked:
        completedSteps.length >= 3,
    },

    {
      title: "Roadmap Complete",
      description:
        "Complete your entire learning roadmap.",
      icon: "🏁",
      unlocked:
        completedSteps.length === roadmap.length,
    },

    {
      title: "First Project",
      description:
        "Complete your first real-world project.",
      icon: "💻",
      unlocked:
        completedProjects.length >= 1,
    },

    {
      title: "Builder",
      description:
        "Complete 3 real-world projects.",
      icon: "🚀",
      unlocked:
        completedProjects.length >= 3,
    },

    {
      title: "Career Ready",
      description:
        "Complete your roadmap and all projects.",
      icon: "⭐",
      unlocked:
        completedSteps.length === roadmap.length &&
        completedProjects.length === projects.length,
    },
  ];

  /* ---------------- Career Tracks ---------------- */

  const allTracks = getAllTrackProgress();

  const trackList = Object.keys(careerData);

  /* ---------------- Reset Current Track ---------------- */

  const handleResetTrack = () => {
    const confirmed = window.confirm(
      `Are you sure you want to reset your ${careerName} track? All skills, roadmap progress, projects, XP and achievements for this track will be reset.`
    );

    if (!confirmed) {
      return;
    }

    resetTrackProgress(careerName);

    navigate("/profile");

    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <div className="profile-page">

        {/* Header */}

        <div className="profile-header">

          <span>MY JOURNEY</span>

          <h1>Your {careerName} Journey</h1>

          <p>
            Track your progress, skills, projects, and achievements as you move toward your career goal.
          </p>

        </div>

        {/* Career Overview */}

        <div className="profile-career-card">

          <div>
            <small>CURRENT CAREER TRACK</small>

            <h2>{careerName}</h2>

            <p>
             Keep building your skills and experience as you move closer to becoming a Frontend Developer.
            </p>
          </div>

          <div className="profile-level">

            <span>LEVEL</span>

            <strong>{level}</strong>

            <small>{xp} XP</small>

          </div>

        </div>

        {/* Stats */}

        <div className="profile-stats">

          <div className="profile-stat">
            <small>CAREER READINESS</small>

            <h3>{readiness}%</h3>

            <p>
              {ownedSkills.length} of{" "}
              {requiredSkills.length} skills
            </p>
          </div>

          <div className="profile-stat">
            <small>ROADMAP</small>

            <h3>{roadmapProgress}%</h3>

            <p>
              {completedSteps.length} of{" "}
              {roadmap.length} steps
            </p>
          </div>

          <div className="profile-stat">
            <small>PROJECTS</small>

            <h3>{completedProjects.length}</h3>

            <p>
              {projects.length} total projects
            </p>
          </div>

          <div className="profile-stat">
            <small>TRACK XP</small>

            <h3>{xp}</h3>

            <p>
              Level {level}
            </p>
          </div>

        </div>

        {/* Skills */}

        <section className="profile-section">

          <div className="profile-section-header">

            <div>
              <span>YOUR SKILLS</span>

              <h2>Current Skill Levels</h2>
            </div>

            <button
              className="secondary-btn"
              onClick={() => navigate("/skills")}
            >
              Update Skills
            </button>

          </div>

          <div className="profile-skills">

            {requiredSkills.map((skill) => {

              const skillLevel =
                savedSkills[skill] || "Not Started";

              return (
                <div
                  className="profile-skill"
                  key={skill}
                >

                  <div>

                    <h3>{skill}</h3>

                    <span
                      className={`profile-skill-level ${skillLevel
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {skillLevel}
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* Roadmap */}

        <section className="profile-section">

          <div className="profile-section-header">

            <div>
              <span>YOUR ROADMAP</span>

              <h2>Learning Progress</h2>
            </div>

            <button
              className="secondary-btn"
              onClick={() => navigate("/roadmap")}
            >
              View Roadmap →
            </button>

          </div>

          <div className="profile-roadmap">

            {roadmap.map((step, index) => {

              const completed =
                completedSteps.includes(step);

              return (
                <div
                  className={`profile-roadmap-step ${
                    completed ? "completed" : ""
                  }`}
                  key={step}
                >

                  <div className="profile-roadmap-number">
                    {completed
                      ? "✓"
                      : index + 1}
                  </div>

                  <div>

                    <h3>{step}</h3>

                    <p>
                      {completed
                        ? "Completed"
                        : index === completedSteps.length
                        ? "Current step"
                        : "Locked"}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* Projects */}

        <section className="profile-section">

          <div className="profile-section-header">

            <div>
              <span>YOUR PROJECTS</span>

              <h2>Project Progress</h2>
            </div>

            <button
              className="secondary-btn"
              onClick={() => navigate("/projects")}
            >
              View Projects →
            </button>

          </div>

          <div className="profile-projects">

            {projects.map((project) => {

              const status =
                projectProgress[project] ||
                "not-started";

              return (
                <div
                  className={`profile-project ${status}`}
                  key={project}
                >

                  <div className="project-status">

                    {status === "completed"
                      ? "✓"
                      : status === "in-progress"
                      ? "→"
                      : "○"}

                  </div>

                  <div>

                    <h3>{project}</h3>

                    <p>
                      {status === "completed"
                        ? "Completed"
                        : status === "in-progress"
                        ? "In Progress"
                        : "Not Started"}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* Achievements */}

        <section className="profile-section">

          <div className="profile-section-header">

            <div>
              <span>ACHIEVEMENTS</span>

              <h2>Your Milestones</h2>
            </div>

          </div>

          <div className="profile-achievements">

            {achievements.map((achievement) => (

              <div
                className={`achievement-card ${
                  achievement.unlocked
                    ? "unlocked"
                    : "locked"
                }`}
                key={achievement.title}
              >

                <div className="achievement-icon">

                  {achievement.unlocked
                    ? achievement.icon
                    : "🔒"}

                </div>

                <div>

                  <h3>{achievement.title}</h3>

                  <p>
                    {achievement.description}
                  </p>

                  <span>
                    {achievement.unlocked
                      ? "Unlocked"
                      : "Locked"}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* Career Tracks */}

        <section className="profile-section">

          <div className="profile-section-header">

            <div>
              <span>CAREER TRACKS</span>

              <h2>Your Career Paths</h2>
            </div>

          </div>

          <div className="career-tracks">

            {trackList.map((track) => {

              const progress =
                allTracks[track];

              const trackSteps =
                progress?.completedSteps?.length || 0;

              const totalSteps =
                careerData[track].roadmap.length;

              const trackProgress =
                Math.round(
                  (trackSteps / totalSteps) * 100
                );

              const isCurrent =
                track === careerName;

              const hasStarted =
                !!allTracks[track] &&
                (
                  (allTracks[track]
                    .completedSteps?.length || 0) > 0 ||

                  Object.keys(
                    allTracks[track].skills || {}
                  ).length > 0 ||

                  Object.keys(
                    allTracks[track]
                      .projectProgress || {}
                  ).length > 0
                );

              return (
                <div
                  className={`career-track ${
                    isCurrent ? "current" : ""
                  }`}
                  key={track}
                >

                  <div>

                    <h3>{track}</h3>

                    <p>
                      {isCurrent
                        ? "Current Track"
                        : hasStarted
                        ? `${trackProgress}% completed`
                        : "Not started"}
                    </p>

                  </div>

                  <button
                    className="secondary-btn"
                    onClick={() => {

                      if (isCurrent) {
                        navigate("/dashboard");
                        return;
                      }

                      localStorage.setItem(
                        "careerGoal",
                        JSON.stringify({
                          title: track,
                        })
                      );

                      if (hasStarted) {
                        navigate("/dashboard");
                      } else {
                        navigate("/skills");
                      }

                    }}
                  >
                    {isCurrent
                      ? "View Dashboard"
                      : hasStarted
                      ? "Continue Track"
                      : "Start Track"}
                  </button>

                </div>
              );
            })}

          </div>

          {/* Reset Button */}

          <button
            className="reset-track-btn"
            onClick={handleResetTrack}
          >
            Reset Current Track
          </button>

        </section>

      </div>
    </>
  );
}

export default Profile;
