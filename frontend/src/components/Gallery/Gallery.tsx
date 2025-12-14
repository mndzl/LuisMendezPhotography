import Backlink from "../Backlink";

function Gallery() {
  return (
    <main className="gallery w-100 h-100 p-0">
      <div className="hero-image">
        <div
          className="backlink position-absolute z-1"
          style={{ top: "1em", left: "1em" }}
        >
          <Backlink color="#c8c8c8ff" />
        </div>

        <figure className="position-relative m-0">
          <figcaption className="position-absolute top-50 start-50 translate-middle text-center text-light fs-1">
            Argentina Vs. Venezuela
          </figcaption>
          <img src="/sports.jpeg" alt="Hero Image" className="img-fluid" />
        </figure>
      </div>

      <div className="gallery-content p-3">
        <div className="session-info mb-3">
          <h1 className="fs-6 m-0">
            <b>ARGENTINA VS. VENEZUELA</b>
          </h1>
          <small>Luis Mendez Photography</small>
        </div>
        <div className="gallery-grid d-flex flex-column gap-3">
          <div className="gallery-img">
            <img src="/sports.jpeg" alt="Hero Image" className="img-fluid" />
          </div>
          <div className="gallery-img">
            <img src="/sports.jpeg" alt="Hero Image" className="img-fluid" />
          </div>
          <div className="gallery-img">
            <img src="/sports.jpeg" alt="Hero Image" className="img-fluid" />
          </div>
          <div className="gallery-img">
            <img src="/sports.jpeg" alt="Hero Image" className="img-fluid" />
          </div>
          <div className="gallery-img">
            <img src="/sports.jpeg" alt="Hero Image" className="img-fluid" />
          </div>
          <div className="gallery-img">
            <img src="/sports.jpeg" alt="Hero Image" className="img-fluid" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Gallery;
