import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "react-rating-stars-component";
import "../Style/Menu.css";

function Menu() {
  const navigate = useNavigate();
  const [allImage, setAllImage] = useState([]);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [selectedDish, setSelectedDish] = useState(null);
  const [currentComment, setCurrentComment] = useState("");
  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminID");

    if (storedAdmin && window.location.pathname !== "/admin") {
      navigate("/admin");
    }
    getImage();

    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setRatings(savedRatings);
    setComments(savedComments);
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

  const handleCommentSubmit = (dishId) => {
    const updatedComments = {
      ...comments,
      [dishId]: [...(comments[dishId] || []), { text: currentComment || "No comment", rating: currentRating }],
    };
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));

    const dishComments = updatedComments[dishId];
    const totalRating = dishComments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / dishComments.length;

    const updatedRatings = { ...ratings, [dishId]: averageRating };
    setRatings(updatedRatings);
    localStorage.setItem("ratings", JSON.stringify(updatedRatings));

    setCurrentComment("");
    setCurrentRating(0);
    setSelectedDish(null);


    window.location.reload();
  };

  const handleViewDetails = (dish) => {
    setSelectedDish(dish);
  };

  const handleCloseDialog = () => {
    setSelectedDish(null);
    setCurrentRating(0); 
  };

  return (
    <div className="menu-main">
      <h3>Menu</h3>
      <div className="image-container">
        {allImage.map((data) => {
          const imageUrl = `data:image/jpeg;base64,${data.image}`;
          return (
            <div
              key={data._id}
              className="image-item"
              onClick={() => handleViewDetails(data)}
            >
              <img src={imageUrl} alt={data.Name} />
              <div className="image-text">
                <b>{data.Name}</b>
              </div>
              <div className="image-text">₱&nbsp;{data.Price}</div>
              <div className="image-description">{data.Description}</div>
              <div
                className="image-text"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div className="ratings">
                <b>Over All Ratings:</b>
                <Rating
                  count={5}
                  size={24}
                  isHalf={true}
                  value={ratings[data._id] || 0}
                  edit={false}
                />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        open={!!selectedDish}
        onClose={handleCloseDialog}
        className="dialogbox"
      >
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <b>{selectedDish && selectedDish.Name}</b>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            style={{ color: "gray" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {selectedDish && (
            <>
              <img
                src={`data:image/jpeg;base64,${selectedDish.image}`}
                alt={selectedDish.Name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "60vh",
                  objectFit: "contain",
                  borderRadius: "10px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <div>{selectedDish.Description}</div>
              <div style={{ marginTop: "20px" }}>
                <h4>Rate this dish:</h4>
                <Rating
                  count={5}
                  size={32}
                  isHalf={true}
                  value={currentRating}
                  edit={true}
                  onChange={(newRating) => setCurrentRating(newRating)}
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <h4>Leave a comment:</h4>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Write your comment here..."
                  value={currentComment}
                  onChange={(e) => setCurrentComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleCommentSubmit(selectedDish._id)}
                  disabled={currentRating === 0} 
                >
                  Submit
                </Button>
              </div>
              <div style={{ marginTop: "20px" }}>
                <h4>Comments:</h4>
                {comments[selectedDish._id] && comments[selectedDish._id].length > 0 ? (
                  comments[selectedDish._id].map((comment, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      - {comment.text} (Rating: {comment.rating})
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Menu;
