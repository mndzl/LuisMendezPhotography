import { useEffect, useRef, useState } from "react";
import Backlink from "../Backlink";
import Footer from "../Footer/Footer";
import "./Gallery.css";

function Gallery() {
  const [lightMode, setLightMode] = useState(true);
  const [gallery, setGallery] = useState({
    id: -1,
    title: "",
  });
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const [images, setImages] = useState([
    {
      id: -1,
      url: "",
    },
  ]);
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

  const fetchImages = () => {
    setImages([
      {
        id: 1,
        url: "/sports.jpeg",
      },
      {
        id: 2,
        url: "/wedding.jpeg",
      },
      {
        id: 3,
        url: "/sports.jpeg",
      },
      {
        id: 4,
        url: "/wedding.jpeg",
      },
      {
        id: 5,
        url: "/sports.jpeg",
      },
      {
        id: 6,
        url: "/wedding.jpeg",
      },
      {
        id: 7,
        url: "/wedding.jpeg",
      },
      {
        id: 8,
        url: "/sports.jpeg",
      },
    ]);
  };

  useEffect(() => {
    fetchImages();
    setGallery({
      id: 1,
      title: "Lorie & Jean's Wedding",
    });
  }, []);

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
        <dialog ref={imageExpandModal} className="p-0 border-0 overflow-hidden">
          <button
            className="btn-close position-absolute top-0 end-0 mt-2 me-2 p-2 bg-light border rounded-3"
            onClick={() => setSelectedImageURL(null)}
          ></button>
          {selectedImageURL && (
            <img
              src={`${selectedImageURL}`}
              alt=""
              style={{ maxHeight: "100vh", maxWidth: "80vw" }}
            />
          )}
        </dialog>

        <div className="gallery" style={{ maxWidth: "90%" }}>
          <div className="gallery-info text-center p-0 py-5">
            <h1 className={`m-0 ${lightMode ? "" : "text-light"}`}>
              {gallery.title}
            </h1>
            <small className="fs-5 text-secondary">
              Luis Mendez Photography
            </small>
          </div>
          <div className="gallery-grid row g-2 d-flex justify-content-center">
            {images.map((image) => (
              <div className="gallery-img col-6 col-md-4 col-lg-3">
                <img
                  src={image.url}
                  alt={`${gallery.title} image`}
                  className="w-100 h-100 rounded"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  onClick={expandImage}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer light={lightMode} />
    </div>
  );
}

export default Gallery;
