import React from "react";

import logo from "../../assets/images/brand-y.png";
import * as Ant from "antd";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";



const ConfirmPassword = () => {
  return (
    <>
      <div className="confirm-field">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <p className="change-password-title">Forgot Password</p>

        <Ant.Input
          placeholder="Password"
          type={"password"}
          className="password"
        />

        <Ant.Input
          placeholder=" Confirm Password"
          type={"password"}
          className="confirm-password"
        />

        <Ant.Button block type="primary" className="confirm-button">
          CHANGE PASSWORD
        </Ant.Button>
        {/* <Ant.ConfigProvider
          theme={{
            token: {
              colorPrimary: 'ffbc80',
            },
          }}
        >
          
          <Ant.Button block type="primary">AAAAAAAAA</Ant.Button>
        </Ant.ConfigProvider> */}
      </div>
    </>
  );
};

export default ConfirmPassword;
