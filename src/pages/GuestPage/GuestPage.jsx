import React from "react";
import { Outlet } from "react-router-dom";
import loginImg from "../../assets/images/LoginImage.jpg";
import "./style.scss";

const GuestPage = () => {
  return (
    <>
      <div className="main-container">
        <div className="login-img">
          <img src={loginImg} alt="login-img" />
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default GuestPage;
