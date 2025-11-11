// title = models.CharField(max_length=200, blank=False)
// location = models.CharField(max_length=200)
// description = models.TextField(max_length=1000)
// category = models.ForeignKey(
//     Category, on_delete=models.CASCADE, blank=False)
// date = models.DateTimeField()
// # cover = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)

import { useState } from "react";
import { Link } from "react-router-dom";

function AddSession() {
  const [session, setSession] = useState({
    title: "",
    description: "",
    location: "",
    client: "",
    category: "",
    date: "",
  });

  const handleChange = (event: { target: any }) => {
    const name = event.target.name;
    const value = event.target.value;
    setSession((values) => ({ ...values, [name]: value }));
  };

  const createSession = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const endpoint = "/api/newsession/";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session),
      });

      if (!response.ok) throw new Error("Request Failed!");

      const result = await response.json();
      console.log(result);
      alert("Session Created.");
    } catch (err) {
      console.log(err);
      alert("There was an error creating the session.");
    }
  };

  return (
    <div className="add-session w-100">
      <Link
        to="/"
        className="link-secondary fs-4 d-block mb-3"
        style={{ textDecoration: "None" }}
      >
        <i className="fa-solid fa-angle-left"></i>
        Back
      </Link>
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
              <option value="1">Client #1</option>
              <option value="2">Client #2</option>
              <option value="3">Client #3</option>
              <option value="4">Client #4</option>
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
              <option value="1">Category #1</option>
              <option value="2">Category #2</option>
              <option value="3">Category #3</option>
              <option value="4">Category #4</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="sessionDate">Date</label>
            <input
              type="date"
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
