import React from "react";
import { Link } from "react-router-dom";

// Navbar Component
const Navbar = () => {
  return (
    <div
      className="flex items-center justify-between bg-richblack-800 h-16 px-6 border-b-[4px] border-richblack-700"
      style={{ position: "relative" }}
    >
      {/* Left Section: Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={require("./logo.png")}
          alt="Logo"
          style={{ height: "60px", width: "100px" }}
        />
        <h1 style={{ color: "white", marginLeft: "10px" }}><b>PathFinderAI</b></h1>
      </div>

      {/* Scrolling Text: Empowering Minds with Adaptive Learning */}
      <div
        className="scrolling-text-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start", 
          overflow: "hidden",
          flexGrow: 1,
          marginLeft: "40px", 
        }}
      >
        <div
          className="scrolling-text"
          style={{
            whiteSpace: "nowrap",
            fontSize: "18px",
            color: "#fff",
            fontWeight: "bold",
            animation: "scroll-left-to-right 20s linear infinite",
          }}
        >
          PathFinderAI: Empowering Your Future with Personalised Learning Paths Tailored Just for you!
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left-to-right {
          0% {
            transform: translateX(-100%); /* Start off-screen to the left */
          }
          100% {
            transform: translateX(100%); /* Move to the right end */
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;