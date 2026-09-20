import { useNavigate } from "react-router-dom";
import { initializeTrack } from "../trackStorage";

function CareerGoal() {
  const navigate = useNavigate();

  const careers = [
    {
      title: "Frontend Developer",
      description: "Build modern and interactive web experiences.",
      icon: "💻",
    },
    {
      title: "Backend Developer",
      description: "Build APIs, servers, and powerful applications.",
      icon: "⚙️",
    },
    {
      title: "UI/UX Designer",
      description: "Design useful and engaging digital experiences.",
      icon: "🎨",
    },
    {
      title: "Data Analyst",
      description: "Turn data into meaningful insights.",
      icon: "📊",
    },
    {
      title: "Cybersecurity",
      description: "Protect systems, networks, and digital information.",
      icon: "🔐",
    },
    {
      title: "Mobile Developer",
      description: "Create applications for mobile devices.",
      icon: "📱",
    },
  ];

const chooseCareer = (career) => {
  localStorage.setItem("careerGoal", JSON.stringify(career));

  initializeTrack(career.title);

  navigate("/skills");
};

  return (
    <div className="career-page">
      <div className="career-header">
        <span>STEP 1 OF 3</span>

        <h1>What do you want to become?</h1>

        <p>
          <p>
  Choose your career goal, and SkillBridge will help you discover
  the skills you need and build your path forward.
</p>
        </p>
      </div>

      <div className="career-grid">
        {careers.map((career) => (
          <button
            className="career-card"
            key={career.title}
            onClick={() => chooseCareer(career)}
          >
            <div className="career-icon">{career.icon}</div>

            <h3>{career.title}</h3>

            <p>{career.description}</p>

            <span>Explore Path →</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CareerGoal;