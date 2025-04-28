import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "../Style/Menu.css";


function Menu() {
  const navigate = useNavigate();
  const [allImage, setAllImage] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null); // State to store the selected dish

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminID");

    if (storedAdmin && window.location.pathname !== "/admin") {
      navigate("/admin");
    }
    getImage();
  }, [navigate]);

  const getImage = async () => {
    try {
      const response = await fetch("http://localhost:1337/get-image");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllImage(data.data);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  const handleViewDetails = (dish) => {
    setSelectedDish(dish); // Set the selected dish when the button is clicked
  };

  const handleCloseDialog = () => {
    setSelectedDish(null); // Reset the selected dish when the dialog is closed
  };

  return (
    <div className="menu-main">
      <h3>Menu</h3>
      <div className="image-container" >
        {allImage.map((data, index) => {
          const imageUrl = `data:image/jpeg;base64,${data.image}`;
          return (
            <div key={index} className="image-item"
            onClick={() => handleViewDetails(data)}>
              <img src={imageUrl} alt={data.Name} />
              <div className="image-text">
                <b>{data.Name}</b>
              </div>
              <div className="image-text">₱&nbsp;{data.Price}</div>
              <div className="image-description">{data.Description}</div>
            </div>
          );
        })}
      </div>
      <Dialog
        open={!!selectedDish}
        onClose={handleCloseDialog}
        className="dialogbox"
      >
        <DialogTitle>
          <b>{selectedDish && selectedDish.Name}</b>
        </DialogTitle>
        <DialogContent>
          {selectedDish && (
            <>
              <img
                src={`data:image/jpeg;base64,${selectedDish.image}`}
                alt={selectedDish.Name}
                style={{ width: "60vh", height: "35vh", borderRadius: "10px" }}
              />
              <div>{selectedDish.Description}</div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Menu;