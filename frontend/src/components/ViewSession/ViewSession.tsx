import { useParams } from "react-router-dom";
import Backlink from "../Backlink";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function ViewSession() {
  const { sessionID } = useParams();
  const [session, setSession] = useState({
    title: "",
    description: "",
    location: "",
    client: -1,
    category_detail: { name: "" },
    category: -1,
    date: "",
  });
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [categories, setCategories] = useState([
    {
      name: "",
      id: -1,
    },
  ]);
  const [clients, setClients] = useState([
    {
      name: "",
      id: -1,
    },
  ]);

  function colorCategory(categoryName: string): string {
    const colors: Record<string, string> = {
      Weddings: "text-info-emphasis",
    };

    return colors[categoryName];
  }

  const fetchData = async () => {
    try {
      const sessionEndpoint = `/api/getsession/${sessionID}`;
      const sessionResponse = await fetch(sessionEndpoint);
      const sessionData = await sessionResponse.json();

      setSession(sessionData);

      const modelsEndpoint = `/api/getmodels/${sessionID}`;
      const modelsResponse = await fetch(modelsEndpoint);
      const modelsData = await modelsResponse.json();

      setModels(modelsData);

      const categoriesEndpoint = "/api/getcategories/";
      const categoriesResponse = await fetch(categoriesEndpoint);
      const categoriesData = await categoriesResponse.json();

      setCategories(categoriesData);

      // TODO: Functionality to change client/model
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const updateSession = async () => {
    setEditing(false);
    const endpoint = `/api/updatesession/${sessionID}/`;
    console.log(JSON.stringify(session));
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });

      if (!response.ok) throw new Error("Coult not update session.");

      fetchData();
      alert("Session Updated.");
    } catch (err) {
      console.log(err);
      alert("There was an error updating the session.");
    }
  };

  const handleChange = (event: { target: any }) => {
    const name = event.target.name;
    const value = event.target.value;

    setSession((values) => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="viewsession-container position-relative">
      <Backlink />
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        // Editing Controls
        <div className="session-details ">
          <div className="editing-control position-absolute top-0 end-0">
            {!editing ? (
              <i
                className="fa-solid fa-pencil fs-5"
                style={{ cursor: "pointer" }}
                onClick={() => setEditing(true)}
              ></i>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateSession}
              >
                Update
              </button>
            )}
          </div>
          {/* Category */}
          <div className="session-header">
            {editing ? (
              <select name="category" id="category" onChange={handleChange}>
                {categories.map((category) => (
                  <option
                    selected={category.name == session.category_detail.name}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <small
                className={`session-category fs-5 ${colorCategory(
                  session.category_detail.name
                )}`}
              >
                {session.category_detail.name}
              </small>
            )}

            {/* Title */}
            {editing ? (
              <textarea
                value={session.title}
                className={`form-control bg-white fs-1 ${
                  editing ? "ps-3 border" : "ps-0 border-0"
                }`}
                disabled={!editing}
                name="title"
                onChange={handleChange}
              />
            ) : (
              <h1>{session.title}</h1>
            )}

            {/* Models */}
            <div className="models-list">
              {models.map((model) => (
                <div className="model" key={model.id}>
                  <i className="fa-solid fa-user me-1"></i>
                  <small className="d-inline">
                    {`${model.client_detail.first_name} ${model.client_detail.last_name} (${model.client_detail.email})`}
                  </small>
                </div>
              ))}
              {/* Date */}
              <small className="date">
                <i className="fa-solid fa-calendar me-1"></i>
                {format(new Date(session.date), "MMM d, yyyy")}
              </small>
            </div>
            <hr className="border opacity-50" />
          </div>
          {/* Description */}

          <div className="session-description mb-4">
            <h3 className="mb-1 text-wrap">Description</h3>
            <textarea
              value={session.description}
              className={`form-control bg-white ${
                editing ? "ps-3 border" : "ps-0 border-0"
              }`}
              name="description"
              style={{
                height: editing ? "5em" : "0",
                overflow: "hidden",
                resize: "none",
              }}
              disabled={!editing}
            />
          </div>

          {/* Location */}
          <div className="session-location">
            <h5 className="mb-1">Location</h5>
            <textarea
              value={session.location}
              className={`form-control bg-white ${
                editing ? "ps-3 border form-control-md" : "ps-0 border-0"
              }`}
              name="location"
              style={{
                height: editing ? "5em" : "0",
                overflow: "hidden",
                resize: "none",
              }}
              disabled={!editing}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSession;
