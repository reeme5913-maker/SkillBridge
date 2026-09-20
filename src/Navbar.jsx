import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="app-navbar">

      <div
        className="app-navbar-logo"
        onClick={() => navigate("/")}
      >
        SkillBridge
      </div>

      <div className="app-navbar-links">

        <button
          className={isActive("/dashboard")}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className={isActive("/roadmap")}
          onClick={() => navigate("/roadmap")}
        >
          Roadmap
        </button>

        <button
          className={isActive("/projects")}
          onClick={() => navigate("/projects")}
        >
          Projects
        </button>

        <button
          className={isActive("/profile")}
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>

      </div>

    </nav>
  );
}

export default Navbar;