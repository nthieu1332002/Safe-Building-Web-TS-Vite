import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoutes = () => {
    const { userToken } = useSelector((state) => state.user);

    return (!userToken ? <Outlet /> : <Navigate to="/" />)
}

export default ProtectedRoutes;