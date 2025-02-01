import { useState, useEffect, useRef } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  FaRobot,FaBullseye, FaBook, FaAngleDoubleLeft, FaAngleDoubleRight, FaRegUser, FaChalkboardTeacher, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

// Sidebar links array
const newLinks = [
  { id: "goals", name: "Goals", path: "/goals", icon: FaBullseye },
  { id: "courseguide", name: "Course Guide", path: "/courseguide", icon: FaBook },
  { id: "quizplatform", name: "Quiz Platform", path: "/quizplatform", icon: FaChalkboardTeacher },
  { id: "profile", name: "Profile", path: "/profile", icon: FaRegUser },
  { id: "chatbot", name: "Chatbot", path: "/chatbot", icon: FaRobot }, 
];

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); // This effect runs only once after initial render

  // Expand/Collapse sidebar
  const ShowOrHideSideBar = () => {
    const navigateIconLeft = document.getElementById("NavigateLeftBtn");
    const navigateIconRight = document.getElementById("NavigateRightBtn");
    const sideBar = document.getElementById("dashboardSidebar");

    if (sideBar.classList.contains("w-44")) {
      sideBar.classList.replace("w-44", "w-21.5");
      navigateIconLeft.classList.add("hidden");
      navigateIconRight.classList.remove("hidden");
    } else {
      sideBar.classList.replace("w-21.5", "w-44");
      navigateIconLeft.classList.remove("hidden");
      navigateIconRight.classList.add("hidden");
    }
  };

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[200px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col border-r-[4px] border-r-richblack-700 bg-richblack-800 py-6 relative overflow-x-hidden transition-all duration-300 w-44"
      id="dashboardSidebar"
    >
      {/* Sidebar Links */}
      <div className="flex flex-col">
        {/* Home Link */}
        <div className="px-3 py-2">
          <Link
            to="/home"
            className="text-white block py-2 px-3 rounded-md hover:bg-richblack-600 text-lg flex items-center gap-x-3"
          >
            <FaHome className="text-xl" />
            <span className="text-lg">Home</span>
          </Link>
        </div>

        {/* Dynamically render newLinks */}
        {newLinks.map((link) => (
  <div key={link.id} className="px-3 py-2">
    <Link
      to={link.path}
      className="text-white block py-2 px-3 rounded-md hover:bg-richblack-600 text-lg flex items-center gap-x-3"
    >
      <link.icon className="text-xl" />
      <span className="text-lg">{link.name}</span>
    </Link>
  </div>
))}
      </div>

      {/* Divider */}
      <div className="mx-auto mt-4 mb-4 h-[1px] w-10/12 bg-richblack-700" id="SideBar" />

      {/* Settings with Dropdown */}
      <div className="relative px-3 py-2">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-white block w-full py-2 px-3 rounded-md hover:bg-richblack-600 text-lg flex items-center gap-x-3"
        >
          <VscSignOut className="text-xl" />
          <span className="text-lg">Settings</span>
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-3 mt-2 bg-richblack-700 rounded-md shadow-lg w-48 z-10 transition-all duration-300"
          >
            <ul className="py-1">
              <li>
                <Link
                  to="/dashboard/settings/profile"
                  className="block px-4 py-2 text-white hover:bg-richblack-600"
                  onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                >
                  Profile Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/settings/account"
                  className="block px-4 py-2 text-white hover:bg-richblack-600"
                  onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                >
                  Account Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/settings/security"
                  className="block px-4 py-2 text-white hover:bg-richblack-600"
                  onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
                >
                  Security Settings
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="px-3 py-2">
        <button
          className="text-white block py-2 px-3 rounded-md hover:bg-richblack-600 text-lg flex items-center gap-x-3"
        >
          <VscSignOut className="text-xl" />
          <span className="text-lg">Logout</span>
        </button>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        className="text-white text-3xl absolute bottom-2 right-2 flex items-center justify-center"
        onClick={ShowOrHideSideBar}
      >
        <FaAngleDoubleLeft id="NavigateLeftBtn" />
        <FaAngleDoubleRight id="NavigateRightBtn" className="hidden" />
      </button>
    </div>
  );
}
