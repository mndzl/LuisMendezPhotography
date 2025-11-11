// title = models.CharField(max_length=200, blank=False)
// location = models.CharField(max_length=200)
// description = models.TextField(max_length=1000)
// category = models.ForeignKey(
//     Category, on_delete=models.CASCADE, blank=False)
// date = models.DateTimeField()
// # cover = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)

import { useState } from "react";

function AddSession() {
  return (
    <div className="add-session w-100">
      <h1>Create New Session</h1>
      <div className="session-intake-form">
        <form>
          <div className="mb-3">
            <label htmlFor="sessionTitle">Title</label>
            <input
              type="text"
              className="form-control"
              id="sessionTitle"
              required
              name="sessionTitle"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sessionDescription">Description</label>
            <textarea
              className="form-control"
              id="sessionDescription"
              name="sessionDescription"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sessionAddress">Address</label>
            <input type="text" className="form-control" id="sessionAddress" />
          </div>
          <div className="mb-3">
            <label htmlFor="sessionClient">Client</label>
            <input
              className="form-control"
              list="sessionClientOptions"
              id="sessionClient"
              name="sessionClient"
              placeholder="Start typing..."
            />
            <datalist id="sessionClientOptions">
              <option value="1">Client #1</option>
              <option value="2">Client #2</option>
              <option value="3">Client #3</option>
              <option value="4">Client #4</option>
            </datalist>
          </div>
          <div className="mb-3">
            <label htmlFor="sessionType">Type of Session</label>
            <input
              className="form-control"
              list="sessionTypeOptions"
              id="sessionType"
              name="sessionType"
              placeholder="Start typing..."
            />
            <datalist id="sessionTypeOptions">
              <option value="1">Category #1</option>
              <option value="2">Category #2</option>
              <option value="3">Category #3</option>
              <option value="4">Category #4</option>
            </datalist>
          </div>
          <div className="mb-3">
            <label htmlFor="sessionDate">Date</label>
            <input
              type="date"
              id="sessionDate"
              name="sessionDate"
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
