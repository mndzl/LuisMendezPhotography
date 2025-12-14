import { Link } from "react-router-dom";

function Backlink({ color = "#454545ff" }) {
  return (
    <div className="backlink">
      <Link
        to="/"
        className="fs-4 d-inline-block mb-3"
        style={{ textDecoration: "None", color: color }}
      >
        <i className="fa-solid fa-angle-left"></i>
        Back
      </Link>
    </div>
  );
}

export default Backlink;
