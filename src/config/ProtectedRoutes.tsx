import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const ProtectedRoutes = () => {
  const { userToken } = useSelector((state: RootState) => state.user);
  return !userToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
