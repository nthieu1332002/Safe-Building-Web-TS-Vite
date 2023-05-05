import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./config/ProtectedRoutes";
import PrivateRoutes from "./config/PrivateRoutes";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Building from "./pages/Building/Building";
import Admin from "./pages/Admin/Admin";
import Resident from "./pages/Resident/Resident";
import Flat from "./pages/Flat/Flat";
import Service from "./pages/Service/Service";
import Contract from "./pages/Contract/Contract";
import GuestPage from "./pages/GuestPage/GuestPage";
import Layout from "./pages/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "./pages/Error/Error";
import Bill from "./pages/Bill/Bill";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<GuestPage />}>
              <Route path="/login" element={<Login />}></Route>
            </Route>
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path="/building" element={<Building />}></Route>
              <Route path="/admin" element={<Admin />}></Route>
              <Route path="/resident" element={<Resident />}></Route>
              <Route path="/bill" element={<Bill />}></Route>
              <Route path="/flat" element={<Flat />}></Route>
              <Route path="/service" element={<Service />}></Route>
              <Route path="/contract" element={<Contract />}></Route>
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
