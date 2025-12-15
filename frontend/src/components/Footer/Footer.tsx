function Footer({ light = true }) {
  return (
    <div
      className={`footer text-center py-3 mt-3 ${
        light ? "bg-light" : "bg-dark"
      }`}
    >
      <small className={`d-block ${light ? "" : "text-light"}`}>
        Luis Mendez Photography
      </small>
      <small className="d-block text-secondary">
        luis@luismendezphotography | (901) 612-9164
      </small>
    </div>
  );
}

export default Footer;
