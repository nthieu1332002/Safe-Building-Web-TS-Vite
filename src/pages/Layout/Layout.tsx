import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBarMenu from "../../components/SideBarMenu/SideBarMenu";
import { HiOutlineLogout } from "react-icons/hi";
import brand from "../../assets/images/brand-x.png";
import "./style.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user/userSlice";
import { useAppDispatch } from "../../store/store";

const Layout = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate(); 
  const handleNavigate =() => {
    navigate("/")
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div className="main-container">
      <div className="side-bar">
        <div className="brand-container" onClick={handleNavigate}>
          <img src={brand} alt="logo" />
        </div>
        <SideBarMenu />
        <div className="logout-container" onClick={handleLogout}>
          <div className="icon">
            <HiOutlineLogout />
          </div>
          Log out
        </div>
      </div>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
