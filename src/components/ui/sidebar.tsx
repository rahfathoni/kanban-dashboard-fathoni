import { Link, useLocation } from "react-router-dom";
import { FaHome, FaInfoCircle, FaTachometerAlt } from "react-icons/fa"

const menuItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "About", path: "/about", icon: <FaInfoCircle /> },
  { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 w-16 hover:w-48 group overflow-hidden">
      <div className="flex items-center justify-center h-16 font-bold text-xl border-b border-gray-700">
        LOGO
      </div>
      <nav className="flex-1 mt-4 flex flex-col">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 hover:bg-gray-700 transition-colors ${
                active ? "bg-gray-700" : ""
              }`}
            >
              <div className="text-lg">{item.icon}</div>
              <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}