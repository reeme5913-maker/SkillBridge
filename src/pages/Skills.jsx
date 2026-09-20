import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { careerData } from "../data/careerData";
import { getTrackProgress, saveTrackProgress } from "../trackStorage";
function Skills() {
  const navigate = useNavigate();

  const savedCareer = JSON.parse(localStorage.getItem("careerGoal"));

  const careerName = savedCareer?.title || "Frontend Developer";

  const currentCareer = careerData[careerName];

  const trackProgress = getTrackProgress(careerName);

 const [levels, setLevels] = useState(
  trackProgress.skills || {}
);

  const handleLevelChange = (skill, level) => {
    setLevels({
      ...levels,
      [skill]: level,
    });
  };

const handleContinue = () => {
  const updatedTrack = {
    ...trackProgress,
    skills: levels,
  };

  saveTrackProgress(careerName, updatedTrack);

  navigate("/gap");
};
  return (
    <div className="skills-page">

      <div className="skills-header">
        <span>STEP 2 OF 3</span>

        <h1>Where Are You on Your Career Journey?</h1>

        <p>
          You're preparing for a career as a{" "}
          <strong>{careerName}</strong>.
          <br />
         Tell us your current skill level so we can identify your strengths, discover your gaps, and personalize your learning path..
        </p>
      </div>

      <div className="skills-container">

        {currentCareer.skills.map((skill) => (
          <div className="skill-item" key={skill}>

            <div className="skill-info">
              <h3>{skill}</h3>

              <p>
                How confident are you with this skill?
              </p>
            </div>

            <div className="level-options">

              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <button
                  key={level}
                  className={
                    levels[skill] === level
                      ? "level-btn active"
                      : "level-btn"
                  }
                  onClick={() => handleLevelChange(skill, level)}
                >
                  {level}
                </button>
              ))}

            </div>

          </div>
        ))}

      </div>

      <div className="skills-footer">

        <button
          className="back-btn"
          onClick={() => navigate("/career")}
        >
          ← Back
        </button>

        <button
          className="primary-btn"
          onClick={handleContinue}
        >
          Analyze My Skills →
        </button>

      </div>

    </div>
  );
}

export default Skills;