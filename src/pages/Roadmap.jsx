import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { careerData } from "../data/careerData";
import { getTrackProgress, saveTrackProgress } from "../trackStorage";
import Navbar from "../Navbar";

function Roadmap() {
  const navigate = useNavigate();

  const savedCareer = JSON.parse(localStorage.getItem("careerGoal"));
  const careerName = savedCareer?.title || "Frontend Developer";

  const currentCareer = careerData[careerName];

  const roadmap = currentCareer.roadmap;
  const requiredSkills = currentCareer.skills;

  const trackProgress = getTrackProgress(careerName);

  const savedSkills = trackProgress.skills || {};

  const [completedSteps, setCompletedSteps] = useState(
    (trackProgress.completedSteps || []).filter((step) =>
      roadmap.includes(step)
    )
  );

  const toggleStep = (step) => {
    let updatedSteps;

    if (completedSteps.includes(step)) {
      updatedSteps = completedSteps.filter(
        (item) => item !== step
      );
    } else {
      updatedSteps = [...completedSteps, step];
    }

    setCompletedSteps(updatedSteps);

    const updatedTrack = {
      ...trackProgress,
      completedSteps: updatedSteps,
    };

    saveTrackProgress(careerName, updatedTrack);
  };

  const completedCount = completedSteps.length;

  const progress =
    roadmap.length > 0
      ? Math.round(
          (completedCount / roadmap.length) * 100
        )
      : 0;

  const roadmapCompleted =
    completedCount === roadmap.length;

  // Get the skill level related to each roadmap step
  const getSkillStatus = (step) => {
    if (requiredSkills.includes(step)) {
      return savedSkills[step] || "Not Started";
    }

    return null;
  };

  const getStatusLabel = (step) => {
    const skillStatus = getSkillStatus(step);

    if (!skillStatus) {
      return "Learning Path";
    }

    if (skillStatus === "Advanced") {
      return "Already Strong";
    }

    if (skillStatus === "Intermediate") {
      return "Strengthen";
    }

    if (skillStatus === "Beginner") {
      return "Needs Practice";
    }

    return "Learn";
  };

  return (
     <>
    <Navbar />
    <div className="roadmap-page">

      <div className="roadmap-header">
        <span>YOUR PERSONALIZED ROADMAP</span>

        <h1>Your Path to Becoming a {careerName}</h1>

        <p>
          We've turned your skill gaps into a step-by-step learning path designed around your current level and career goal.
        </p>
      </div>

      <div className="roadmap-progress">

        <div className="progress-info">
          <div>
            <small>ROADMAP PROGRESS</small>
            <h2>{progress}% Complete</h2>
          </div>

          <span>
            {completedCount} / {roadmap.length} completed
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>

      </div>

      <div className="roadmap-container">

        {roadmap.map((step, index) => {

          const completed =
            completedSteps.includes(step);

          const previousStep =
            roadmap[index - 1];

          const previousCompleted =
            index === 0 ||
            completedSteps.includes(previousStep);

          const locked =
            !completed && !previousCompleted;

          const skillStatus =
            getSkillStatus(step);

          const statusLabel =
            getStatusLabel(step);

          return (
            <div
              className={`roadmap-step ${
                completed ? "completed" : ""
              } ${locked ? "locked" : ""}`}
              key={step}
            >

              <div className="step-number">
                {completed ? "✓" : index + 1}
              </div>

              <div className="roadmap-content">

                <div className="roadmap-step-top">

                  <div>
                    <small>
                      STEP{" "}
                      {String(index + 1).padStart(2, "0")}
                    </small>

                    <h3>{step}</h3>
                  </div>

                  <div className="step-statuses">

                    {skillStatus && (
                      <span className="skill-status">
                        {skillStatus}
                      </span>
                    )}

                    {completed && (
                      <span className="completed-label">
                        Completed
                      </span>
                    )}

                    {locked && (
                      <span className="locked-label">
                        Locked
                      </span>
                    )}

                  </div>

                </div>

                <div className="personalized-status">
                  <span>{statusLabel}</span>

                  <p>
                    {skillStatus === "Advanced" &&
                      "You already have a strong foundation in this skill. Review it and focus on applying it."}

                    {skillStatus === "Intermediate" &&
                      "You have a good foundation. Strengthen your knowledge through practice and real examples."}

                    {skillStatus === "Beginner" &&
                      "You have started learning this skill. Focus on building your fundamentals and practicing regularly."}

                    {skillStatus === "Not Started" &&
                      "This is an important skill for your career path. Start learning the fundamentals and build your confidence."}

                    {!skillStatus &&
                      index === 0 &&
                      "Build a strong foundation before moving forward."}

                    {!skillStatus &&
                      index === 1 &&
                      "Strengthen your understanding and practical skills."}

                    {!skillStatus &&
                      index === 2 &&
                      "Practice what you learned through real examples."}

                    {!skillStatus &&
                      index >= 3 &&
                      "Continue building your skills and apply them through projects."}
                  </p>
                </div>

                {!locked && (
                  <button
                    className={
                      completed
                        ? "step-button completed-button"
                        : "step-button"
                    }
                    onClick={() =>
                      toggleStep(step)
                    }
                  >
                    {completed
                      ? "Mark as Incomplete"
                      : "Mark as Complete"}
                  </button>
                )}

              </div>

            </div>
          );
        })}

      </div>

      <div className="roadmap-cta">

        {!roadmapCompleted ? (
          <>
            <div>
              <span>KEEP LEARNING</span>

              <h2>
                Complete your roadmap first.
              </h2>

              <p>
                Finish all the learning steps before
                moving on to real-world projects.
              </p>
            </div>

            <button
              className="primary-btn locked-cta"
              disabled
            >
              Projects Locked 🔒
            </button>
          </>
        ) : (
          <>
            <div>
              <span>ROADMAP COMPLETE 🎉</span>

              <h2>
                You're ready to build real projects.
              </h2>

              <p>
                You've completed your personalized learning
                path. Now it's time to put your skills into
                practice.
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/projects")
              }
            >
              Explore Projects →
            </button>
          </>
        )}

      </div>

    </div>
    </>
  );
}

export default Roadmap;