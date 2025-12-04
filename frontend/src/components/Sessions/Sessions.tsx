/*
  This dashboard will be visible to photographer to see the
  status of their upcoming and previous sessions,
  with the ability of 
    - view status of last session (images backed up, editing, purchases available, closed)
    - view clients with information
*/
import { useEffect, useState } from "react";
import { format } from "date-fns";
import "./sessions.css";
import { Link } from "react-router-dom";

function Sessions() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [collapsedUpcoming, setCollapsedUpcoming] = useState(false);
  const [collapsedPrevious, setCollapsedPrevious] = useState(true);

  function colorCategory(categoryName: string): string {
    const colors: Record<string, string> = {
      Weddings: "text-info-emphasis",
    };

    return colors[categoryName];
  }

  function renderSessions(type: "upcoming" | "previous") {
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

    let sessionList;
    const currentDate = new Date();
    if (type === "upcoming") {
      sessionList = sessions.filter(
        (session) => new Date(session.date) >= currentDate
      );
    } else {
      sessionList = sessions.filter(
        (session) => new Date(session.date) < currentDate
      );
    }

    if (sessionList.length == 0)
      return <p className="opacity-50 fs-5">No sessions</p>;

    return sessionList.map((session) => (
      <div
        key={session.id}
        className="card border rounded-3 overflow-hidden shadow-sm"
      >
        <Link
          to={`/sessions/${session.id}`}
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
            {/* <span className="badge text-bg-primary rounded-pill">MINI</span> */}
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
      <div className="sessions-header d-flex justify-content-between align-items-center mb-4">
        <h1>Sessions</h1>
        <Link to="/newsession" className="btn btn-outline-primary">
          <i className="fa-solid fa-plus me-1"></i>
          Add Session
        </Link>
      </div>

      <div className="sessions-upcoming mb-5">
        <button
          style={{ cursor: "pointer" }}
          data-bs-toggle="collapse"
          data-bs-target="#upcomingSessionsContent"
          aria-controls="upcomingSessionsContent"
          aria-expanded="true"
          className="btn btn-outline-none fs-3 p-0 w-100 text-start"
          onClick={() => setCollapsedUpcoming(!collapsedUpcoming)}
        >
          {collapsedUpcoming ? (
            <i className="fa-solid fa-chevron-up me-2"></i>
          ) : (
            <i className="fa-solid fa-chevron-down me-2"></i>
          )}
          Upcoming
        </button>
        <div id="upcomingSessionsContent" className="collapse show">
          <div className="sessions-upcoming-cards d-flex flex-wrap gap-3">
            {renderSessions("upcoming")}
          </div>
        </div>
      </div>
      <div className="sessions-previous">
        <button
          style={{ cursor: "pointer" }}
          data-bs-toggle="collapse"
          data-bs-target="#previousSessionsContent"
          aria-expanded="false"
          aria-controls="previousSessionsContent"
          className="btn btn-outline-none fs-3 p-0 w-100 text-start"
          onClick={() => setCollapsedPrevious(!collapsedPrevious)}
        >
          {collapsedPrevious ? (
            <i className="fa-solid fa-chevron-up me-2"></i>
          ) : (
            <i className="fa-solid fa-chevron-down me-2"></i>
          )}
          Previous
        </button>

        <div id="previousSessionsContent" className="collapse">
          <div className="sessions-upcoming-cards d-flex flex-wrap gap-3 mt-2">
            {renderSessions("previous")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sessions;
