import { useEffect, useRef, useState } from "react";
import Backlink from "../Backlink";
import Footer from "../Footer/Footer";
import "./Gallery.css";
import CldImage from "../Cloudinary/CldImage";
import { AdvancedImage } from "@cloudinary/react";
import getGallery from "../../firebase/getGallery";
import { addSeconds } from "date-fns";

function Gallery() {
  const [loading, setLoading] = useState(true);
  const [lightMode, setLightMode] = useState(true);
  const [gallery, setGallery] = useState({
    id: -1,
    title: "",
  });
  const [images, setImages] = useState([
    {
      id: "",
      url: "",
    },
  ]);
  const [selectedImageURL, setSelectedImageURL] = useState("");
  const [loadingError, setLoadingError] = useState(false);

  const imageExpandModal = useRef<HTMLDialogElement | null>(null);

  const expandImage = (e: React.ChangeEvent<any>) => {
    setSelectedImageURL(e.target.src);
  };

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  useEffect(() => {
    if (lightMode) {
      document.body.classList.remove("bg-dark");
    } else {
      document.body.classList.add("bg-dark");
    }
  }, [lightMode]);

  useEffect(() => {
    if (!selectedImageURL) {
      imageExpandModal.current?.close();
      document.body.style.overflow = "scroll";
    } else {
      imageExpandModal.current?.showModal();
      document.body.style.overflow = "hidden";
    }
  }, [selectedImageURL]);

  const handleEsc = (e: any) => {
    if (e.key == "Escape") {
      setSelectedImageURL("");
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getGallery();

        if (!data || data.length == 0) {
          setImages([]);
        } else {
          setImages(
            data.map((img) => ({
              id: String(img.id),
              url: String(img.url),
            }))
          );
        }
        setGallery({
          id: 1,
          title: "Lorie & Jean's Wedding",
        });
        setLoadingError(false);
      } catch (e) {
        console.log("Network error. Try again.");
        setLoadingError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

    window.addEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : loadingError ? (
        <div className="d-flex w-75 mx-auto text-center justify-content-center vh-100 align-items-center">
          <span>There was an error loading the page. Please try again.</span>
        </div>
      ) : (
        <div className={`gallery m-0`}>
          <div
            className={`lightmode p-2 rounded position-fixed end-0 top-0 mt-3 me-3 d-flex flex-row align-items-center ${
              lightMode ? "bg-secondary-subtle" : "bg-secondary"
            }`}
            style={{ cursor: "pointer" }}
            onClick={toggleLightMode}
          >
            <p
              className={`d-block p-0 m-0 me-1 ${
                lightMode ? "" : "text-light"
              }`}
            >
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
            <dialog
              ref={imageExpandModal}
              className="p-0 border-0 overflow-hidden"
            >
              <div className="img-controls position-absolute bg-light border rounded-3 top-0 end-0 mt-2 me-2 d-flex p-2 gap-2">
                <a
                  href={`${selectedImageURL.replace(
                    "/image/upload/",
                    "/image/upload/fl_attachment/"
                  )}`}
                  className="text-secondary"
                  download
                >
                  <i
                    className="fa-solid fa-arrow-down"
                    style={{ cursor: "pointer" }}
                  />
                </a>
                <div className="vr" />
                <button
                  className="btn-close"
                  onClick={() => setSelectedImageURL("")}
                />
              </div>

              {selectedImageURL && (
                <img
                  src={`${selectedImageURL}`}
                  alt=""
                  style={{
                    maxHeight: "100vh",
                    maxWidth: "80vw",
                    objectFit: "cover",
                  }}
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
              <div
                className="gallery-grid row g-2 d-flex justify-content-center"
                onClick={expandImage}
              >
                {images.map((image) => (
                  <div
                    className="gallery-img col-6 col-md-4 col-lg-3 position-relative"
                    key={image.id}
                  >
                    <CldImage publicID={image.url} />
                  </div>
                ))}
              </div>
            </div>
          </main>
          <Footer light={lightMode} />
        </div>
      )}
    </>
  );
}

export default Gallery;
