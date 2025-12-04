// title = models.CharField(max_length=200, blank=False)
// location = models.CharField(max_length=200)
// description = models.TextField(max_length=1000)
// category = models.ForeignKey(
//     Category, on_delete=models.CASCADE, blank=False)
// date = models.DateTimeField()
// # cover = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)

import { useEffect, useState } from "react";
import Backlink from "../Backlink";

function AddSession() {
  const [session, setSession] = useState({
    title: "",
    description: "",
    location: "",
    client: -1,
    category: -1,
    date: "",
  });
  const [clientsList, setClientsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  const handleChange = (event: { target: any }) => {
    const name = event.target.name;
    const value = event.target.value;
    setSession((values) => ({ ...values, [name]: value }));
  };

  // TODO: Add functionality to assign client to session (create model relation)
  const createSession = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    session.date = new Date(session.date).toISOString();
    const endpoint = "/api/newsession/";
    console.log(JSON.stringify(session));
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });

      if (!response.ok) throw new Error("Coult not create session.");

      const result = await response.json();

      window.location.href = `/sessions/${result.id}`; // Redirect to new session page

      // TODO: display global alert
    } catch (err) {
      console.log(err);
      alert("There was an error creating the session.");
    }
  };

  useEffect(() => {
    const getClients = async () => {
      try {
        const endpoint = "/api/getclients/";
        const response = await fetch(endpoint);
        const data = await response.json();

        setClientsList(data);
        setSession((values) => ({ ...values, ["client"]: data[0]["id"] })); // set default client as first in list
      } catch (e) {
        console.log(e);
      }
    };

    const getCategories = async () => {
      try {
        const endpoint = "/api/getcategories/";
        const response = await fetch(endpoint);
        const data = await response.json();

        setCategoriesList(data);
        setSession((values) => ({ ...values, ["category"]: data[0]["id"] })); // set default category as first in list
      } catch (e) {
        console.log(e);
      }
    };

    getClients();
    getCategories();
  }, []);

  return (
    <div className="add-session w-100">
      <Backlink />
      <h1>Create New Session</h1>
      <div className="session-intake-form">
        <form onSubmit={createSession}>
          <div className="mb-3">
            <label htmlFor="sessionTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="sessionTitle"
              required
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sessionDescription">Description</label>
            <textarea
              className="form-control"
              id="sessionDescription"
              name="description"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sessionAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="sessionAddress"
              onChange={handleChange}
              name="location"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sessionClient">Client</label>
            <select
              id="sessionClient"
              className="form-control"
              name="client"
              value={session.client}
              onChange={handleChange}
            >
              {clientsList.map((client) => (
                <option key={client["id"]} value={client["id"]}>
                  {client["first_name"] + " " + client["last_name"]}
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
              value={session.category}
              onChange={handleChange}
            >
              {categoriesList.map((category) => (
                <option key={category["id"]} value={category["id"]}>
                  {category["name"]}
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
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSession;
