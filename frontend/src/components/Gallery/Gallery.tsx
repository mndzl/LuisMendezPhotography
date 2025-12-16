import { useEffect, useRef, useState } from "react";
import Backlink from "../Backlink";
import Footer from "../Footer/Footer";
import "./Gallery.css";

function Gallery() {
  const [lightMode, setLightMode] = useState(true);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const imageExpandModal = useRef<HTMLDialogElement | null>(null);

  const expandImage = (e: React.ChangeEvent<any>) => {
    setSelectedImageURL(e.target.src);
    console.log(e.target.src);
  };

  useEffect(() => {
    if (!selectedImageURL) {
      imageExpandModal.current?.close();
      document.body.style.overflow = "scroll";
    } else {
      imageExpandModal.current?.showModal();
      document.body.style.overflow = "hidden";
    }
  }, [selectedImageURL]);

  return (
    <div className={`gallery m-0 ${lightMode ? "" : "bg-dark"}`}>
      <div
        className={`lightmode p-2 rounded position-fixed end-0 top-0 mt-3 me-3 d-flex flex-row align-items-center ${
          lightMode ? "bg-secondary-subtle" : "bg-secondary"
        }`}
        style={{ cursor: "pointer" }}
        onClick={() => setLightMode(!lightMode)}
      >
        <p className={`d-block p-0 m-0 me-1 ${lightMode ? "" : "text-light"}`}>
          {lightMode ? "Light" : "Dark"}
        </p>
        <i
          className={`fa-solid fa-circle-half-stroke fs-3 ${
            lightMode ? "" : "text-light"
          }`}
        ></i>
      </div>
      <div className="backlink pt-3 ps-3 mb-0">
        <Backlink color={lightMode ? "#454545ff" : "#ffffffff"} />
      </div>
      <main className="w-100 p-0 h-100 d-flex justify-content-center">
        <dialog ref={imageExpandModal} className="w-75 p-0 border-0">
          <button
            className="btn-close position-absolute top-0 end-0 mt-2 me-2 p-2 bg-light border rounded-3"
            onClick={() => setSelectedImageURL(null)}
          ></button>
          {selectedImageURL && (
            <img src={`${selectedImageURL}`} alt="" className="img-fluid" />
          )}
        </dialog>

        <div className="gallery" style={{ maxWidth: "90%" }}>
          <div className="gallery-info text-center p-0 py-5">
            <h1 className={`m-0 ${lightMode ? "" : "text-light"}`}>
              Lorie & Jean's Wedding
            </h1>
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
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/wedding.jpeg"
                alt=""
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>{" "}
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/wedding.jpeg"
                alt=""
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>{" "}
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt=""
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt=""
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt=""
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt=""
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/wedding.jpeg"
                alt=""
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/sports.jpeg"
                alt=""
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>
            <div className="gallery-img col-6 col-md-4 col-lg-3">
              <img
                src="/wedding.jpeg"
                alt=""
                className="w-100 h-100 rounded"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={expandImage}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer light={lightMode} />
    </div>
  );
}

export default Gallery;
