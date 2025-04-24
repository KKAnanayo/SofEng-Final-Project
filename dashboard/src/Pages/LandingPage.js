import React, { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import '../Style/LandingPage.css'
function LandingPage() {
   const navigate = useNavigate();
    useEffect(() => {
      const storedAdmin = localStorage.getItem("adminID");
  
      // If there's an adminID and not on the admin page, redirect to admin
      if (storedAdmin && window.location.pathname !== "/admin") {
        navigate("/admin");
      }
    }, [navigate]);
  return (
    <div className='landingPageBody'>

    </div>
  )
}

export default LandingPage
