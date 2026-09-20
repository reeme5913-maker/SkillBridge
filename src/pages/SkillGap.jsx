import { useNavigate } from "react-router-dom";
import { careerData } from "../data/careerData";
import { getTrackProgress } from "../trackStorage";

function SkillGap() {
  const navigate = useNavigate();

  const savedCareer = JSON.parse(
    localStorage.getItem("careerGoal")
  );

  const careerName =
    savedCareer?.title || "Frontend Developer";

  const currentCareer = careerData[careerName];

  const trackProgress = getTrackProgress(careerName);

  const savedSkills = trackProgress.skills || {};

  const requiredSkills = currentCareer.skills;

  const ownedSkills = requiredSkills.filter(
    (skill) =>
      savedSkills[skill] === "Intermediate" ||
      savedSkills[skill] === "Advanced"
  );

  const needsImprovement = requiredSkills.filter(
    (skill) => savedSkills[skill] === "Beginner"
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !savedSkills[skill]
  );

  const readiness = Math.round(
    (ownedSkills.length / requiredSkills.length) * 100
  );

  const handleContinue = () => {
    navigate("/roadmap");
  };

  return (
    <div className="gap-page">

      <div className="gap-header">

        <span>STEP 3 OF 3</span>

        <h1>Understand Your Skill Gap</h1>

        <p>
          Here's where you are today, what you're already good at, and what you need to build next for your career goal.
          <strong> {careerName}</strong>.
        </p>

      </div>

      {/* Readiness */}

      <div className="readiness-card">

        <div>

          <small>CAREER READINESS</small>

          <h2>{readiness}%</h2>

          <p>
            You currently have {ownedSkills.length} of{" "}
            {requiredSkills.length} required skills at an
            intermediate or advanced level.
          </p>

        </div>

        <div className="progress-circle">
          {readiness}%
        </div>

      </div>

      {/* Skills Summary */}

      <div className="gap-grid">

        {/* Owned */}

        <div className="gap-card">

          <div className="gap-card-header">

            <span className="gap-icon">✓</span>

            <div>
              <h3>Skills You Have</h3>
              <p>
                Skills you're already comfortable with.
              </p>
            </div>

          </div>

          <div className="skill-list">

            {ownedSkills.length > 0 ? (
              ownedSkills.map((skill) => (

                <div
                  className="gap-skill owned"
                  key={skill}
                >

                  <span>{skill}</span>

                  <small>
                    {savedSkills[skill]}
                  </small>

                </div>

              ))
            ) : (

              <p className="empty-message">
                No skills at this level yet.
              </p>

            )}

          </div>

        </div>

        {/* Improvement */}

        <div className="gap-card">

          <div className="gap-card-header">

            <span className="gap-icon">↗</span>

            <div>
              <h3>Needs Improvement</h3>
              <p>
                Skills you have started but should strengthen.
              </p>
            </div>

          </div>

          <div className="skill-list">

            {needsImprovement.length > 0 ? (
              needsImprovement.map((skill) => (

                <div
                  className="gap-skill improve"
                  key={skill}
                >

                  <span>{skill}</span>

                  <small>Beginner</small>

                </div>

              ))
            ) : (

              <p className="empty-message">
                No skills need improvement.
              </p>

            )}

          </div>

        </div>

        {/* Missing */}

        <div className="gap-card">

          <div className="gap-card-header">

            <span className="gap-icon">+</span>

            <div>
              <h3>Missing Skills</h3>
              <p>
                Skills you haven't started learning yet.
              </p>
            </div>

          </div>

          <div className="skill-list">

            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (

                <div
                  className="gap-skill missing"
                  key={skill}
                >

                  <span>{skill}</span>

                  <small>Not started</small>

                </div>

              ))
            ) : (

              <p className="empty-message">
                You have all the required skills.
              </p>

            )}

          </div>

        </div>

      </div>

      {/* Recommendation */}

      <div className="gap-recommendation">

        <div>

          <span>YOUR NEXT STEP</span>

          <h2>
            Let's turn your gap into a roadmap.
          </h2>

          <p>
           Now that you know where you stand, let's turn your skill gaps into a personalized roadmap that moves you closer to your career goal.
          </p>

        </div>

        <button
          className="primary-btn"
          onClick={handleContinue}
        >
          Build My Roadmap →
        </button>

      </div>

    </div>
  );
}

export default SkillGap;