/*
  This dashboard will be visible to photographer to see the
  status of their upcoming and previous sessions,
  with the ability of 
    - view status of last session (images backed up, editing, purchases available, closed)
    - view clients with information
*/
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import "./sessions.css";
import { Link } from "react-router-dom";

function Sessions() {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<any[]>([]);
  const [collapsedUpcoming, setCollapsedUpcoming] = useState(false);
  const [collapsedPrevious, setCollapsedPrevious] = useState(true);
  const [formError, setFormError] = useState(false);
  const [clientsList, setClientsList] = useState([
    {
      id: null,
      first_name: "",
      last_name: "",
    },
  ]);
  const [categoriesList, setCategoriesList] = useState([
    {
      id: null,
      name: "",
    },
  ]);
  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    location: "",
    client: null,
    category: null,
    date: "",
  });
  const closeModalRef = useRef(null);

  const fetchClients = async () => {
    const endpoint = "/api/getclients/";
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      setClientsList(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategories = async () => {
    const endpoint = "/api/getcategories/";
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      setCategoriesList(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormError(false);
    const { name, value } = e.target;
    setNewSession((values) => ({ ...values, [name]: value }));
  };

  const createSession = async () => {
    newSession.date = new Date(newSession.date).toISOString();
    const endpoint = "/api/newsession/";
    console.log(JSON.stringify(newSession));
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSession),
      });

      if (!response.ok) throw new Error("Coult not create session.");

      const result = await response.json();

      setNewSession({
        title: "",
        description: "",
        location: "",
        client: null,
        category: null,
        date: "",
      });

      setFormError(false);

      window.location.href = `/sessions/${result.id}`; // Redirect to new session page

      // TODO: display global alert
    } catch (err) {
      console.log(err);
      alert("There was an error creating the session.");
    }
  };

  function colorCategory(categoryName: string): string {
    const colors: Record<string, string> = {
      Weddings: "text-info-emphasis",
    };

    return colors[categoryName];
  }

  const validateData = () => {
    if (newSession.client == "-1" || newSession.category == "-1") {
      setFormError(true);
    } else {
      createSession();
    }
  };

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
    fetchClients();
    fetchCategories();
    setLoading(false);
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

  // TODO: Integrate New Session on Sessions

  return (
    <div className="dashboard w-100">
      {/* Main content */}
      <div className="sessions-header d-flex justify-content-between align-items-center mb-4">
        <h1>Sessions</h1>
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#createClientModal"
        >
          <i className="fa-solid fa-plus me-1"></i>
          Create
        </button>
        {/* Add client modal */}
        <div
          className="modal fade"
          id="createClientModal"
          aria-labelledby="createClientModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="createClientModalLabel">
                  Create New Session
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeModalRef}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="title"
                      name="title"
                      onChange={handleChange}
                      value={newSession.title}
                      placeholder="Ana & John's Wedding"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sessionEmail">Description</label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      value={newSession.description}
                      name="description"
                      placeholder="Meeting at the mountains by sunset"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sessionLocation">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="sessionLocation"
                      value={newSession.location}
                      onChange={handleChange}
                      name="location"
                      placeholder="1123 Confused Ln, Kissimmee FL 34741"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sessionClient">Client</label>
                    <select
                      id="sessionClient"
                      className="form-control"
                      name="client"
                      value={newSession.client || ""}
                      onChange={handleChange}
                    >
                      <option key="-1" value={"-1"}>
                        Select
                      </option>
                      {clientsList.map((client) => (
                        <option key={client.id} value={client.id || ""}>
                          {client.first_name + " " + client.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sessionType">Type of Session</label>
                    <select
                      id="sessionType"
                      className="form-control"
                      name="category"
                      value={newSession.category || ""}
                      onChange={handleChange}
                    >
                      <option key="-1" value={"-1"}>
                        Select
                      </option>
                      {categoriesList.map((category) => (
                        <option key={category.id} value={category.id || "null"}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sessionDate">Date</label>
                    <input
                      type="datetime-local"
                      id="sessionDate"
                      name="date"
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex align-items-center justify-content-between">
                <div className="errors d-flex align-items-center">
                  {formError && (
                    <p className="text-danger mb-0">Please check fields.</p>
                  )}
                </div>
                <div className="modal-controls">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-1"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    // data-bs-dismiss="modal"
                    onClick={validateData}
                    disabled={
                      !newSession.title ||
                      !newSession.description ||
                      !newSession.location ||
                      !newSession.client ||
                      !newSession.category ||
                      !newSession.date
                    }
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
