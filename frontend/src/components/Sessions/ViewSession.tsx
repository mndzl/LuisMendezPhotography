import { Link, useParams } from "react-router-dom";
import Backlink from "../Backlink";
import Alert from "../Alert";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function ViewSession() {
  const { sessionID } = useParams();
  const [galleries, setGalleries] = useState([
    {
      id: null,
      title: "",
      client_detail: {
        first_name: "",
        last_name: "",
      },
    },
  ]);
  const [session, setSession] = useState({
    id: null,
    title: "",
    description: "",
    location: "",
    client: "",
    client_detail: {
      first_name: "",
      last_name: "",
      email: "",
    },
    category_detail: { name: "" },
    category: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [categories, setCategories] = useState([
    {
      name: "",
      id: "",
    },
  ]);
  const [clients, setClients] = useState([
    {
      first_name: "",
      last_name: "",
      email: "",
      id: "",
    },
  ]);

  const [alertBox, setAlertBox] = useState({
    active: false,
    type: "",
    content: "",
  });

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

      const categoriesEndpoint = "/api/getcategories/";
      const categoriesResponse = await fetch(categoriesEndpoint);
      const categoriesData = await categoriesResponse.json();

      setCategories(categoriesData);

      const clientsEndpoint = `/api/getclients/`;
      const clientsResponse = await fetch(clientsEndpoint);
      const clientsData = await clientsResponse.json();

      setClients(clientsData);

      const galleryEndpoint = `/api/getsessiongalleries/${sessionID}`;
      const galleryResponse = await fetch(galleryEndpoint);
      const galleryData = await galleryResponse.json();

      setGalleries(galleryData);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Make this a global thing somehow
  const createAlert = (type: string, content: string) => {
    setAlertBox({
      active: true,
      type: type,
      content: content,
    });
    setTimeout(() => {
      setAlertBox({
        active: false,
        type: "",
        content: "",
      });
    }, 3000);
  };

  const updateSession = async () => {
    setEditing(false);
    const endpoint = `/api/updatesession/${sessionID}/`;
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });

      if (!response.ok) throw new Error("Could not update session.");

      fetchData();
      createAlert("success", "Session Updated");
    } catch (err) {
      console.log(err);
      createAlert("error", "Could not update the session. Try Again.");
    }
  };

  const deleteSession = async () => {
    const endpoint = `/api/deletesession/${sessionID}/`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Could not delete session.");

      window.location.href = "/sessions"; // Redirect to home after deletion
      // TODO: display global alert
    } catch (err) {
      console.log(err);
      createAlert("error", "There was an error deleting the session.");
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
    <div className="viewsession-container position-relative h-100">
      {alertBox.active && (
        <Alert type={alertBox.type} content={alertBox.content} />
      )}
      <div className="backlink mb-3">
        <Backlink />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        // Editing Controls
        <div className="session-details">
          <div className="editing-control position-absolute top-0 end-0">
            {!editing ? (
              <i
                className="fa-solid fa-pencil fs-5"
                style={{ cursor: "pointer" }}
                onClick={() => setEditing(true)}
              ></i>
            ) : (
              <div className="update-controls">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-1"
                  onClick={() => {
                    fetchData();
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={updateSession}
                >
                  Update
                </button>
              </div>
            )}
          </div>
          {/* Category */}
          <div className="session-header">
            {editing ? (
              <select
                name="category"
                id="category"
                defaultValue={session.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
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

            {/* Client */}
            {editing ? (
              <div className="client-editing">
                <i className="fa-solid fa-user me-1"></i>

                <select
                  name="client"
                  id="client"
                  defaultValue={session.client}
                  onChange={handleChange}
                  className="d-inline-block"
                >
                  {!session.client && <option>Add a client</option>}
                  {clients.map((client) => (
                    <option value={client.id} key={client.id}>
                      {`${client.first_name} ${client.last_name}`}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              session.client && (
                <div className="client" key={session.client}>
                  <i className="fa-solid fa-user me-1"></i>
                  <small className="d-inline">
                    {`${session.client_detail.first_name} ${session.client_detail.last_name}`}
                  </small>
                </div>
              )
            )}

            {/* Date */}
            {editing ? (
              <div className="date-editing">
                <i className="fa-solid fa-calendar me-1"></i>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  value={format(new Date(session.date), "yyyy-MM-dd'T'HH:mm")}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <small className="date">
                <i className="fa-solid fa-calendar me-1"></i>
                {format(new Date(session.date), "MMM d, yyyy - h:mm aa")}
              </small>
            )}
          </div>

          {galleries.map((gallery) => (
            <Link to={`/gallery/${gallery.id}`}>
              <i className="fa-solid fa-link me-1"></i>View Gallery (
              {gallery.client_detail.first_name +
                " " +
                gallery.client_detail.last_name}
              )
            </Link>
          ))}

          <hr className="border opacity-50" />
          {/* Description */}

          <div className="session-description mb-4">
            <h3 className="mb-1 text-wrap">Description</h3>
            {editing ? (
              <textarea
                value={session.description}
                className={`form-control bg-white ${
                  editing ? "ps-3 border form-control-md" : "ps-0 border-0"
                }`}
                name="description"
                style={{
                  overflow: "hidden",
                  resize: "none",
                }}
                disabled={!editing}
                onChange={handleChange}
              />
            ) : (
              <p>{session.description}</p>
            )}
          </div>
          {/* Location */}
          <div className="session-location">
            <h5 className="mb-1">Location</h5>
            {editing ? (
              <textarea
                value={session.location}
                className={`form-control bg-white ${
                  editing ? "ps-3 border form-control-md" : "ps-0 border-0"
                }`}
                name="location"
                style={{
                  overflow: "hidden",
                  resize: "none",
                }}
                onChange={handleChange}
                disabled={!editing}
              />
            ) : (
              <p>{session.location}</p>
            )}
          </div>
          <div className="delete-session mt-4">
            <button
              className="btn btn-outline-danger"
              style={{ cursor: "pointer" }}
              data-bs-toggle="modal"
              data-bs-target="#deleteSessionModal"
            >
              <i className="fa-solid fa-trash-can me-2"></i>
              Delete Session
            </button>
          </div>

          <div
            className="modal fade"
            id="deleteSessionModal"
            aria-labelledby="deleteSessionModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="deleteSessionModalLabel">
                    Delete Session
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete this session?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={deleteSession}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSession;
