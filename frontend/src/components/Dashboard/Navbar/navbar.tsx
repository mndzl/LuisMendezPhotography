import "./navbar.css";
import { useState } from "react";

function Navbar() {
  const [collapsed, setCollapsed] = useState<boolean>(window.innerWidth < 900);

  return (
    <nav
      className={`navbar vh-100 bg-body-tertiary flex-column border ${
        collapsed ? "nav-collapsed" : ""
      } `}
    >
      <div
        className={`${
          window.innerWidth > 900 ? "d-none" : ""
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
          <a href="#">
            <img
              src="/static/logo.png"
              className="img-fluid"
              alt="Luis Mendez Photography"
            ></img>
          </a>
        </div>

        <ul className="navbar-nav pages mt-2">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#sessions">
              <i className="fa-solid fa-calendar me-2"></i>
              Sessions
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#clients">
              <i className="fa-regular fa-user me-2"></i>
              Clients
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
