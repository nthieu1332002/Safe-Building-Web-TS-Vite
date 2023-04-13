import React from "react";

import logo from "../../assets/images/brand-y.png";
import * as Ant from "antd";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";





const ForgotPassword = () => {
  return (
    <>
    <div className="forgot-field">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <p className="forgot-title">Forgot Password</p>
      <div>
        <p id="forgot-text">Enter your user account's verified email address and we will send you a password reset link.</p>
      </div>
      <Ant.Input placeholder="Email" className="email" />

      
      <div className="return-login">
        <Link to='/login' id="link">Return to Login</Link>
      </div>
      <Ant.Button block type="primary" className="send-reset">
       SEND RESET EMAIL
      </Ant.Button>
      

    </div>
  </>
  )
}

export default ForgotPassword