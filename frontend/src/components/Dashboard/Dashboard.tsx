/*
  This dashboard will be visible to photographer to see the
  status of their upcoming and previous sessions,
  with the ability of 
    - view status of last session (images backed up, editing, purchases available, closed)
    - view clients with information
*/
import { useEffect, useState } from "react";
import { format } from "date-fns";
import "./dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);

  function colorCategory(categoryName: string): string {
    const colors: Record<string, string> = {
      Weddings: "text-info-emphasis",
    };

    return colors[categoryName];
  }

  function renderSessions() {
    if (loading)
      return (
        <div className="card" style={{ cursor: "default" }} aria-hidden="true">
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
        <Link
          to={`/session/${session.id}`}
          className="text-decoration-none text-dark"
        >
          <h6 className="card-date card-header bg-dark text-white">
            {format(new Date(session.date), "MMM d, yyyy")}
          </h6>
          <div className="card-body">
            <h5 className="card-title">{session.title}</h5>
            <h6 className="card-location card-subtitle mb-2 text-body-secondary">
              {session.location}
            </h6>
            <h6
              className={`card-category card-subtitle mb-2 ${colorCategory(
                session.category_detail.name
              )}`}
            >
              {session.category_detail.name}
            </h6>
          </div>
        </Link>
      </div>
    ));
  }

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    try {
      const api_url = "/api/getsessions";
      const res = await fetch(api_url);
      const data = await res.json();
      setSessions(data);
      setLoading(false);
    } catch (err) {
      console.log("There was an error loading the sessions." + err);
    }
  }

  return (
    <div className="dashboard w-100">
      {/* Main content */}
      <Link to="/newsession" className="btn btn-outline-primary">
        <i className="fa-solid fa-plus"></i>
        Add Session
      </Link>
      <div className="sessions-upcoming">
        <h2>Upcoming Sessions</h2>
        <div className="sessions-upcoming-cards d-flex flex-wrap gap-3">
          {renderSessions()}
        </div>
      </div>

      <div className="sessions-previous">
        <h3>Previous Sessions</h3>
        <div className=" w-100">
          <p className="opacity-50 fs-5">No sessions</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
