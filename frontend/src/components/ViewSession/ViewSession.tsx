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
    date: "",
  });
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  function colorCategory(categoryName: string): string {
    const colors: Record<string, string> = {
      Weddings: "text-info-emphasis",
    };

    return colors[categoryName];
  }

  useEffect(() => {
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
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="viewsession-container">
      <Backlink />
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="session-details">
          <div className="session-header">
            <small
              className={`session-category ${colorCategory(
                session.category_detail.name
              )}`}
            >
              {session.category_detail.name}
            </small>
            <h1>{session.title}</h1>
            <div className="models-list">
              {models.map((model) => (
                <div className="model" key={model.id}>
                  <i className="fa-solid fa-user me-1"></i>
                  <small className="d-inline">
                    {model.client_detail.first_name}{" "}
                    {model.client_detail.last_name}
                  </small>
                </div>
              ))}
              <small className="date">
                <i className="fa-solid fa-calendar me-1"></i>
                {format(new Date(session.date), "MMM d, yyyy")}
              </small>
            </div>
            <hr className="border opacity-50" />
          </div>

          <div className="session-description">
            <h3 className="mb-1">Description</h3>
            <p>{session.description}</p>
          </div>

          <div className="session-location">
            <h5>Location</h5>
            <p>{session.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewSession;
