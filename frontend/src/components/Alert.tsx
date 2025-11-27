import React from "react";

interface AlertProps {
  content: string;
  type: string;
}

function Alert(Props: AlertProps) {
  return (
    <div
      className={`alert alert-${Props.type} d-inline position-absolute bottom-0 end-0 mb-5`}
      role="alert"
    >
      {Props.content}
    </div>
  );
}

export default Alert;
