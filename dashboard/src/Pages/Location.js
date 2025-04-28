import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../Style/Location.css";

function Location() {
   const navigate = useNavigate();
    useEffect(() => {
      const storedAdmin = localStorage.getItem("adminID");  
      if (storedAdmin && window.location.pathname !== "/admin") {
        navigate("/admin");
      }
    }, [navigate]);
  const googleMapLink =
    "https://www.google.com/maps/place/Mrs.+Baker's+Restaurant+%26+Pastry+Shop+Vizcaya/@16.4852522,121.1538953,17z/data=!3m1!4b1!4m6!3m5!1s0x33904411520b787d:0x8804745331bae45e!8m2!3d16.4852522!4d121.156084!16s%2Fg%2F1tdbt4l8";

  return (
    <div
      className="location-main"
      style={{ backgroundImage: "url('/path-to-image.jpg')" }}
    >
      <h3>Location</h3>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.8080925718305!2d121.1538953!3d16.485252199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33904411520b787d%3A0x8804745331bae45e!2sMrs.%20Baker&#39;s%20Restaurant%20%26%20Pastry%20Shop%20Vizcaya!5e0!3m2!1sen!2sph!4v1716254852056!5m2!1sen!2sph"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map"
          title="Mrs. Baker's Restaurant Location Map" // Added title attribute
        />
      </div>
      <div>
        <LocationOnIcon sx={{ fontSize: 30, marginRight: 1 }} />
        <span>
          National Highway DTM. Nueva Vizcaya, Bayombong, Luzon 3700 Philippines
        </span>
      </div>
      <button
        className="directions-button"
        onClick={() => window.open(googleMapLink, "_blank")}
      >
        Get Directions
      </button>
    </div>
  );
}

export default Location;
