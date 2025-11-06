/*
  This dashboard will be visible to photographer to see the
  status of their upcoming and previous sessions,
  with the ability of 
    - view status of last session (images backed up, editing, purchases available, closed)
    - view clients with information
*/
import Navbar from "./Navbar/navbar.tsx";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="main-container d-flex vh-100 vw-100">
      {/* <Navbar /> */}
      <div className="dashboard w-100 h-100">
        {/* Heading */}
        <div className="dashboard-heading container-fluid text-bg-light border-bottom d-flex align-items-center">
          <i className="fa-solid fa-bars mx-4"></i>
          <h1 className="dashboard-title">Sessions</h1>
        </div>

        {/* Main content */}
        <main className="w-80 mx-auto w-sm-100">
          <div className="sessions-upcoming">
            <h2>Upcoming Sessions</h2>

            <div className="sessions-upcoming-cards card-group d-flex gap-3 flex-wrap flex-wrap-sm justify-content-center mx-auto w-100">
              <div className="card border rounded-3 overflow-hidden">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  {/* <i className="fa-regular fa-images fs-5 text-color-primary"></i> */}
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top shadow-sm">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is some example on where the card is gonna show up!
                  </p>
                </div>
              </div>

              <div className="card border rounded-3 overflow-hidden">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  {/* <i className="fa-regular fa-images fs-5 text-color-primary"></i> */}
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top shadow-sm">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is some example on where the card is gonna show up!
                  </p>
                </div>
              </div>

              <div className="card border rounded-3 overflow-hidden">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  {/* <i className="fa-regular fa-images fs-5 text-color-primary"></i> */}
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top shadow-sm">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is some example on where the card is gonna show up!
                  </p>
                </div>
              </div>

              <div className="card border rounded-3 overflow-hidden">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  {/* <i className="fa-regular fa-images fs-5 text-color-primary"></i> */}
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top shadow-sm">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is some example on where the card is gonna show up!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-group sessions-previous">
            <h3>Previous Sessions</h3>

            <div className="sessions-upcoming-cards card-group d-flex gap-3 flex-wrap flex-wrap-sm justify-content-center mx-auto w-100">
              <div className="card border rounded-3 overflow-hidden">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  {/* <i className="fa-regular fa-images fs-5 text-color-primary"></i> */}
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top shadow-sm">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is some example on where the card is gonna show up!
                  </p>
                </div>
              </div>

              <div className="card border rounded-3 overflow-hidden">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  {/* <i className="fa-regular fa-images fs-5 text-color-primary"></i> */}
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top shadow-sm">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is some example on where the card is gonna show up!
                  </p>
                </div>
              </div>

              <div className="card border rounded-3 overflow-hidden">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  {/* <i className="fa-regular fa-images fs-5 text-color-primary"></i> */}
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top shadow-sm">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is some example on where the card is gonna show up!
                  </p>
                </div>
              </div>

              <div className="card border rounded-3 overflow-hidden">
                <div className="card-img-top d-flex justify-content-center align-items-center overflow-hidden">
                  {/* <i className="fa-regular fa-images fs-5 text-color-primary"></i> */}
                  <img
                    src="/static/sports.jpeg"
                    alt="project image"
                    className="img-fluid object-fit-fill"
                  />
                </div>
                <div className="card-body border-top shadow-sm">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is some example on where the card is gonna show up!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
