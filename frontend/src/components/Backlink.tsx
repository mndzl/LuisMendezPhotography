import { Link } from "react-router-dom";

function Backlink() {
  return (
    <div className="backlink">
      <Link
        to="/"
        className="link-secondary fs-4 d-block mb-3"
        style={{ textDecoration: "None" }}
      >
        <i className="fa-solid fa-angle-left"></i>
        Back
      </Link>
    </div>
  );
}

export default Backlink;
