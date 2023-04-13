import { MdDashboard, MdRoomService } from "react-icons/md";
import { FaMoneyBill, FaBuilding, FaUserAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { IoNewspaperSharp } from "react-icons/io5";

interface Route {
  path: string,
  name: string,
  icon: JSX.Element
}

const Routes: Route[] = [
  {
    path: "/",
    name: "Dashboard",
    icon: <MdDashboard />,
  },
  {
    path: "/contract",
    name: "Contract",
    icon: <IoNewspaperSharp />,
  },
  {
    path: "/bill",
    name: "Bill",
    icon: <FaMoneyBill />,
  },
  {
    path: "/resident",
    name: "Resident",
    icon: <BsFillPeopleFill />,
  },
  {
    path: "/building",
    name: "Building",
    icon: <FaBuilding />,
  },
  {
    path: "/flat",
    name: "Flat",
    icon: <HiHome />,
  },
  {
    path: "/service",
    name: "Service",
    icon: <MdRoomService />,
  },
  {
    path: "/admin",
    name: "Admin",
    icon: <FaUserAlt />,
  },
];

export default Routes;
