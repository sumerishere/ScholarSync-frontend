import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileBarChart,
  FileTextIcon,
  HomeIcon,
  LayoutDashboard,
  Settings,
  UserCog,
  Users,
} from "lucide-react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";

const AsideBar = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication status from localStorage
    localStorage.removeItem("isAuthenticated");

    // Redirect to login page
    navigate("/login");
  };

  const menuItems = [
    { path: "/home", icon: HomeIcon, label: "Home" },
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/batches", icon: BookOpen, label: "Batches" },
    { path: "/students", icon: Users, label: "Students" },
    { path: "/trainer", icon: UserCog, label: "Trainers" },
    { path: "/invoice", icon: FileTextIcon, label: "Invoice" },
    { path: "/reports", icon: FileBarChart, label: "Reports" },
    { type: "logout", icon: Settings, label: "LogOut" },
  ];

  return (
    <aside
      className={`scholar-sidebar bg-indigo-800 text-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="scholar-sidebar-header flex justify-end p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="scholar-toggle-btn p-2 hover:bg-indigo-700 rounded-full"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="scholar-sidebar-nav mt-6">
        {menuItems.map((item) =>
          item.type === "logout" ? (
            <button
              key="logout"
              onClick={handleLogout}
              className={`scholar-nav-item flex items-center p-4 hover:bg-indigo-700 w-full text-left`}
            >
              <item.icon size={25} />
              {!isCollapsed && (
                <span className="ml-4 scholar-nav-label">{item.label}</span>
              )}
            </button>
          ) : (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `scholar-nav-item flex items-center p-4 hover:bg-indigo-700 ${
                  isActive ? "bg-indigo-700" : ""
                }`
              }
            >
              <item.icon size={25} />
              {!isCollapsed && (
                <span className="ml-4 scholar-nav-label">{item.label}</span>
              )}
            </NavLink>
          )
        )}
      </nav>
      {!isCollapsed ? (
        <div className="mt-20 text-center text-gray-400">
          <p>&copy; 2024 ScholarSync. All rights reserved.</p>
        </div>
      ) : (
        ""
      )}
    </aside>
  );
};

// PropTypes validation
AsideBar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  setIsCollapsed: PropTypes.func.isRequired,
};

export default AsideBar;
