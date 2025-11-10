import { Link } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";

function Navbar() {
  const [collapsed, setCollapsed] = useState<boolean>(window.innerWidth < 900);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`navbar vh-100 bg-body-tertiary flex-column border ${
        collapsed && isMobile ? "nav-collapsed" : ""
      } `}
    >
      <div
        className={`${
          isMobile ? "" : "d-none"
        } navbar-toggle bg-light justify-content-center position-absolute d-flex align-items-center`}
      >
        <i
          className="fa-solid fa-bars mx-4"
          style={{ cursor: "pointer" }}
          onClick={() => setCollapsed(!collapsed)}
        ></i>
      </div>

      {/* Side navbar */}
      <div className="navbar-container">
        <div className="navbar-brand w-100 border-bottom">
          <Link to="/">
            <img
              src="logo.png"
              className="img-fluid"
              alt="Luis Mendez Photography"
            ></img>
          </Link>
        </div>

        <ul className="navbar-nav pages mt-2">
          <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">
              <i className="fa-solid fa-calendar me-2"></i>
              Sessions
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <i className="fa-regular fa-user me-2"></i>
              Clients
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
