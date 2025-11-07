/*
  This dashboard will be visible to photographer to see the
  status of their upcoming and previous sessions,
  with the ability of 
    - view status of last session (images backed up, editing, purchases available, closed)
    - view clients with information
*/
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Navbar from "./Navbar/navbar.tsx";
import "./dashboard.css";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);

  function renderSessions() {
    if (loading)
      return (
        <div className="card" aria-hidden="true">
          <div className="card-img-top h-50"></div>

          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        </div>
      );

    if (sessions.length == 0)
      return <p className="opacity-50 fs-5">No sessions</p>;

    return sessions.map((session) => (
      <div
        key={session.id}
        className="card border rounded-3 overflow-hidden shadow-sm"
      >
        <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
          <img
            src="/static/sports.jpeg"
            alt="project image"
            className="img-fluid object-fit-fill"
          />
        </div>
        <div className="card-body border-top">
          <h5 className="card-title">{session.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {format(new Date(session.date), "MMM d, yyyy")}
          </h6>
          <p className="card-text">{session.description}</p>
        </div>
      </div>
    ));
  }

  useEffect(() => {
    async function fetchSessions() {
      try {
        const api_url = "http://localhost:8000/api";
        const res = await fetch(api_url);
        const data = await res.json();
        setSessions(data);
        console.log(data);
        setLoading(false);
      } catch (err) {
        console.log("There was an error loading the sessions." + err);
      }
    }

    fetchSessions();
  }, []);

  return (
    <div className="main-container d-flex">
      <Navbar />
      <div className="dashboard w-100">
        {/* Heading */}
        <div className="w-100 dashboard-nav container-fluid text-bg-light border-bottom d-flex justify-content-end align-items-center">
          <div className="nav-profile">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
        {/* Main content */}
        <main className="mx-auto">
          <div className="sessions-upcoming">
            <h2>Upcoming Sessions</h2>

            <div className="sessions-upcoming-cards card-group d-flex flex-wrap gap-3 w-100">
              {renderSessions()}

              <div className="card border rounded-3 overflow-hidden shadow-sm">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top">
                  <h5 className="card-title">This is the dummy tittle</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Feb 12, 2003
                  </h6>
                  <p className="card-text">This is a dummy description</p>
                </div>
              </div>

              <div className="card border rounded-3 overflow-hidden shadow-sm">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top">
                  <h5 className="card-title">This is the dummy tittle</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Feb 12, 2003
                  </h6>
                  <p className="card-text">This is a dummy description</p>
                </div>
              </div>
              <div className="card border rounded-3 overflow-hidden shadow-sm">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top">
                  <h5 className="card-title">This is the dummy tittle</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Feb 12, 2003
                  </h6>
                  <p className="card-text">This is a dummy description</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-group sessions-previous">
            <h3>Previous Sessions</h3>
            <div className="card-group-empty w-100">
              <p className="opacity-50 fs-5">No sessions</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
