import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const PrivateRoutes = () => {
  const { userToken } = useSelector((state: RootState) => state.user);
  return userToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
