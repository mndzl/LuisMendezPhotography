import { useEffect, useRef, useState } from "react";
import Alert from "../Alert";

function ViewClients() {
  const [clients, setClients] = useState<any[]>([
    {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  ]);
  const [newClient, setNewClient] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState(false);
  const closeModalRef = useRef<HTMLButtonElement>(null); // close model ref

  const fetchClients = async () => {
    const endpoint = "/api/getclients/";
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      setClients(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteClient = async (clientID: number) => {
    const endpoint = `/api/deleteclient/${clientID}/`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Could not delete client.");

      // Refresh clients list
      fetchClients();
      alert("Client deleted.");
    } catch (e) {
      console.log(e);
    }
  };

  const validateData = () => {
    if (
      /\S+@\S+\.\S+/.test(newClient.email) === false ||
      /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(newClient.phone_number) ===
        false
    ) {
      setFormError(true);
      return;
    }
    createClient();
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormError(false);
    const { name, value } = e.target;
    setNewClient((values) => ({ ...values, [name]: value }));
  };

  const createClient = async () => {
    console.log(newClient);
    const endpoint = "/api/newclient/";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) throw new Error("Could not create client.");

      // Refresh clients list
      fetchClients();
      setNewClient({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
      });

      alert("Client created successfully!");
      closeModalRef.current?.click(); // close modal
    } catch (e) {
      console.log(e);
      setFormError(true);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="clients">
      <div className="clients-heading d-flex justify-content-between align-items-center mb-4">
        <h1>Clients</h1>
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#createClientModal"
        >
          <i className="fa-solid fa-plus me-1"></i>
          Create Client
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
                  Create New Client
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
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="First name"
                        name="first_name"
                        onChange={handleChange}
                        value={newClient.first_name}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Last name"
                        name="last_name"
                        onChange={handleChange}
                        value={newClient.last_name}
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sessionEmail">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        newClient.email && !/\S+@\S+\.\S+/.test(newClient.email)
                          ? "is-invalid"
                          : ""
                      }`}
                      id="sessionEmail"
                      onChange={handleChange}
                      value={newClient.email}
                      name="email"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sessionPhoneNumber">Phone Number</label>
                    <input
                      type="tel"
                      className={`form-control ${
                        newClient.phone_number &&
                        !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(
                          newClient.phone_number
                        )
                          ? "is-invalid"
                          : ""
                      }`}
                      id="sessionPhoneNumber"
                      value={newClient.phone_number}
                      onChange={handleChange}
                      name="phone_number"
                      placeholder="(123) 456-7890"
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
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={validateData}
                    // data-bs-dismiss="modal"
                    disabled={
                      !newClient.first_name ||
                      !newClient.last_name ||
                      !newClient.email ||
                      !newClient.phone_number
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
      <div className="clients-list">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="card border rounded-3 mb-2">
              <button
                className="btn delete-client position-absolute top-0 end-0 m-3"
                data-bs-toggle="modal"
                data-bs-target={`#deleteClientModal-${client.id}`}
              >
                <i
                  className="fa-solid fa-trash-can text-danger"
                  style={{ cursor: "pointer" }}
                ></i>
              </button>
              <div
                className="modal fade"
                id={`deleteClientModal-${client.id}`}
                aria-labelledby="deleteClientModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5"
                        id="deleteClientModalLabel"
                      >
                        Delete Client
                      </h1>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete {client.first_name}{" "}
                      {client.last_name}?
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
                        onClick={() => deleteClient(client.id)}
                        data-bs-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  {client.first_name} {client.last_name}
                </h5>
                <p className="card-email mb-2 text-body-secondary">
                  <i className="fa-solid fa-envelope me-1"></i>
                  {client.email}
                </p>
                <p className="card-phone mb-2 text-body-secondary">
                  <i className="fa-solid fa-phone me-1"></i>
                  {client.phone_number}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewClients;
