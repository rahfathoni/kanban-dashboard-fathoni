import { RxDashboard } from "react-icons/rx";
import { FaRegFileAlt } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";

export const menuItems = [
  { name: "Dashboard", path: "/", icon: RxDashboard },
  { name: "Document", path: "/document", icon: FaRegFileAlt },
  { name: "Message", path: "/message", icon: BsChatDots },
  { name: "Users", path: "/users", icon: FiUsers },
  { name: "Setting", path: "/setting", icon: IoSettingsOutline },
]
