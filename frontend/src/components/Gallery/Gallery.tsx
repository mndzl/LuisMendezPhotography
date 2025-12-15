import Backlink from "../Backlink";
import Footer from "../Footer/Footer";
import "./Gallery.css";

function Gallery() {
  return (
    <div className="gallery">
      <div className="backlink mt-3 ms-3 mb-0">
        <Backlink />
      </div>
      <main className="w-100 p-0 h-100 d-flex justify-content-center">
        {/* <div className="hero-image overflow-hidden" style={{ maxHeight: "50vh" }}>
        <figure className="position-relative m-0 w-100 h-100">
          <figcaption className="position-absolute top-50 start-50 translate-middle text-center text-light fs-1">
            Argentina Vs. Venezuela
          </figcaption>
          <img
            src="/sports.jpeg"
            alt="Hero Image"
            className="img-fluid w-100"
          />
        </figure>
      </div> */}

        <div className="gallery" style={{ maxWidth: "90%" }}>
          <div className="gallery-info text-center p-0 py-5">
            <h1 className="m-0">Lorie & Jean's Wedding</h1>
            <small className="fs-5 text-secondary">
              Luis Mendez Photography
            </small>
          </div>
          <div className="gallery-grid row g-2 d-flex justify-content-center">
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/wedding.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>{" "}
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/wedding.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>{" "}
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/wedding.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/wedding.jpeg"
                alt="Hero Image"
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Gallery;
