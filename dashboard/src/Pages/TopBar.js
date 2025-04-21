import React from "react";
import { Link } from "react-router-dom";
import Home from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InfoIcon from "@mui/icons-material/Info";
import TagIcon from "@mui/icons-material/Tag";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import logo from "../Images/9202_1715092898773363_598104470283525789_n-transformed.png";
import "../Style/TopBar.css";

function TopBar() {
  return (
    <div className="topbar">
      <div className="left">
      
        <Link to="/">
          <img className="logo" src={logo} alt="Restaurant Logo" />
        </Link>
      </div>
      <div className="right">
        
        <Link to="/" className="link">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Home sx={{ fontSize: 30, marginRight: 1 }} />
            <span style={{ fontSize: "14px" }}>Home</span>
          </div>
        </Link>
        <Link to="/menu" className="link">
          <div style={{ display: "flex", alignItems: "center" }}>
            <MenuBookIcon sx={{ fontSize: 30, marginRight: 1 }} />
            <span style={{ fontSize: "14px" }}>Menu</span>
          </div>
        </Link>
        <Link to="/location" className="link">
          <div style={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon sx={{ fontSize: 30, marginRight: 1 }} />
            <span style={{ fontSize: "14px" }}>Location</span>
          </div>
        </Link>
        <Link to="/about" className="link">
          <div style={{ display: "flex", alignItems: "center" }}>
            <InfoIcon sx={{ fontSize: 30, marginRight: 1 }} />
            <span style={{ fontSize: "14px" }}>About</span>
          </div>
        </Link>
        <Link to="/socialmedia" className="link">
          <div style={{ display: "flex", alignItems: "center" }}>
            <TagIcon sx={{ fontSize: 30, marginRight: 1 }} />
            <span style={{ fontSize: "14px" }}>Social Media</span>
          </div>
        </Link>
        <Link to="/dashboard" className="link">
          <div style={{ display: "flex", alignItems: "center" }}>
            <SupervisorAccountIcon sx={{ fontSize: 30, marginRight: 1 }} />
            <span style={{ fontSize: "14px" }}>Admin</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopBar;
