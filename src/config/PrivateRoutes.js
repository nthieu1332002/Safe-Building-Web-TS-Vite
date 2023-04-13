import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    const {userToken} = useSelector((state) => state.user);

    return (userToken ? <Outlet /> : <Navigate to="/login" />)
}


export default PrivateRoutes;