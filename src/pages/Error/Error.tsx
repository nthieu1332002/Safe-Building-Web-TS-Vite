import React from "react";
import { Link } from "react-router-dom";
import error from "../../assets/images/page-error.png";

import "./style.scss";

const Error = () => {
  return (
    <div className="error-container">
      <div className="error-wrapper">
        <h1>Page Not Found</h1>
        <p>Opps! 😖 The requested URL was not found on this server.</p>
        <Link className="back-to-home" to="/">Back to home</Link>
        <img src={error} alt="" />
      </div>
    </div>
  );
};

export default Error;
