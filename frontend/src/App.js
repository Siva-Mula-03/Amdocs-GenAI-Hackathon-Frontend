import "./App.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/Dashboard/Settings";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ViewProfile from "./components/core/Dashboard/ViewProfile";
import Sidebarcom from "./components/common/Sidebarcom"; // Sidebar import
import EditProfile from "./components/core/Dashboard/Settings/EditProfile";
import UpdatePassword from "./components/core/Dashboard/Settings/UpdatePassword";
import DeleteAccount from "./components/core/Dashboard/Settings/DeleteAccount";
import ChangeProfilePicture from "./components/core/Dashboard/Settings/ChangeProfilePicture";
import ChatBot from "./components/core/Dashboard/chatbot/ChatBot";
import Homepage from "./components/core/HomePage/Home"
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-white-900 font-inter">
      <NavBar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebarcom className="w-1/4 bg-richblack-800 sidebar" />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto flex flex-col">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Homepage/>} />
            <Route path="/profile" element={<ViewProfile />} />
            <Route path="dashboard/settings/profile" element={<Settings />} />
            <Route path="/chatbot" element={<ChatBot />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
