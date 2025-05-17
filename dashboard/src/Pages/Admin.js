import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import "../Style/Admin.css";
import defaultImage from "../Images/default.jpg"; // Import the default image

function Admin() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const editButtonRef = useRef(null);
  const deleteButtonRef = useRef(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [allImage, setAllImage] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [editNameError, setEditNameError] = useState(false);
  const [editPriceError, setEditPriceError] = useState(false);
  const [editDescriptionError, setEditDescriptionError] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminID");
    const currentPath = window.location.pathname;

    if (!storedAdmin && currentPath !== "/") {
      window.location.href = "/";
    }

    if (storedAdmin && window.location.pathname !== "/admin") {
      navigate("/admin");
    }
    getImage();
  }, [navigate]);

  useEffect(() => {
    // Set the default image as the initial file
    fetch(defaultImage)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File(
          [blob],
          "default.jpg",
          { type: "image/jpeg" }
        );
        setFile(defaultFile);
      });
  }, []);

  function handleFileChange(e) {
    setFile(e.target.files[0] || file); // Use the selected file or fallback to the default file
  }

  function validateFields() {
    let isValid = true;

    if (!name.trim()) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (!price.trim()) {
      setPriceError(true);
      isValid = false;
    } else {
      setPriceError(false);
    }

    if (!description.trim()) {
      setDescriptionError(true);
      isValid = false;
    } else {
      setDescriptionError(false);
    }

    return isValid;
  }

  function uploadImage() {
    if (!validateFields()) {
      return; // Stop if validation fails
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file (default or selected)
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);

    fetch("http://localhost:1337/upload-image", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getImage(); // Update images after uploading
        setName(""); // Clear the name field
        setPrice(""); // Clear the price field
        setDescription(""); // Clear the description field
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the file input using ref
        }
        // Reset the image to the default
        fetch(defaultImage)
          .then((res) => res.blob())
          .then((blob) => {
            const defaultFile = new File([blob], "default.jpg", {
              type: "image/jpeg",
            });
            setFile(defaultFile);
          });

        // Show success message
        setUploadSuccess(true);
      })
      .catch((error) => console.error("Error:", error));
  }

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

  const deleteImage = async (id) => {
    try {
      const response = await fetch(`http://localhost:1337/delete-image/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status === "ok") {
        getImage(); // Update images after deletion
        closeDeleteDialog();
        setDeleteSuccess(true); // Show success message
      } else {
        console.error("Error deleting image:", data.message);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const openEditDialog = (id, name, price, description) => {
    setEditId(id);
    setEditName(name);
    setEditPrice(price);
    setEditDescription(description);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditId(null);
    setEditName("");
    setEditPrice("");
    setEditDescription("");
    if (editButtonRef.current) {
      editButtonRef.current.focus(); // Return focus to the Edit button
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
    if (deleteButtonRef.current) {
      deleteButtonRef.current.focus(); // Return focus to the Delete button
    }
  };

  const validateEditFields = () => {
    let isValid = true;

    if (!editName.trim()) {
      setEditNameError(true);
      isValid = false;
    } else {
      setEditNameError(false);
    }

    if (!editPrice.trim()) {
      setEditPriceError(true);
      isValid = false;
    } else {
      setEditPriceError(false);
    }

    if (!editDescription.trim()) {
      setEditDescriptionError(true);
      isValid = false;
    } else {
      setEditDescriptionError(false);
    }

    return isValid;
  };

  const updateImage = async () => {
    if (!validateEditFields()) {
      return; // Stop if validation fails
    }

    try {
      const response = await fetch(
        `http://localhost:1337/update-image/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editName,
            price: editPrice,
            description: editDescription,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "ok") {
        getImage();
        closeEditDialog();
        setUpdateSuccess(true); // Show success message
      } else {
        console.error("Error updating image:", data.message);
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <div className="admin-main">
      <h3>Admin</h3>
      <div className="input-container">
        <div className="image-upload">
          <input
            ref={fileInputRef}
            accept="image/jpeg,image/png"
            type="file"
            onChange={handleFileChange}
          />
          {file && (
            <div className="image-preview-container">
              <img
                className="image-preview"
                src={URL.createObjectURL(file)}
                alt="Uploaded"
              />
            </div>
          )}
        </div>
        <div className="fieldBox">
          <TextField
            className="text-field"
            type="text"
            placeholder="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={nameError}
            helperText={nameError ? "Name is Required" : ""}
          />
          <TextField
            className="text-field"
            type="text"
            placeholder="Price"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={priceError}
            helperText={priceError ? "Price is Required" : ""}
          />
          <TextField
            className="text-field"
            type="text"
            placeholder="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={descriptionError}
            helperText={descriptionError ? "Description is Required" : ""}
          />
          <div className="button-group">
            <Button variant="contained" onClick={uploadImage}>
              Upload
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.removeItem("adminID");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="image-container">
        {allImage.map((data, index) => {
          const imageUrl = `data:image/jpeg;base64,${data.image}`;
          return (
            <div key={index} className="image-item">
              <img src={imageUrl} alt={`Dish ${index}`} />
              <div className="image-text">
                <b>{data.Name}</b>
              </div>
              <div className="image-text">₱&nbsp;{data.Price}</div>
              <div className="image-description">{data.Description}</div>
              <div className="buttons">
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    ref={editButtonRef}
                    variant="contained"
                    onClick={() =>
                      openEditDialog(
                        data._id,
                        data.Name,
                        data.Price,
                        data.Description
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    ref={deleteButtonRef}
                    variant="contained"
                    color="secondary"
                    onClick={() => openDeleteDialog(data._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
        disableEnforceFocus
        disableRestoreFocus
      >
        <DialogTitle id="edit-dialog-title">Edit Image</DialogTitle>
        <DialogContent>
          <DialogContentText id="edit-dialog-description">
            Update the name, price, and description of the Dish.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            error={editNameError}
            helperText={editNameError ? "Name is Required" : ""}
          />
          <TextField
            margin="dense"
            label="Price"
            type="text"
            fullWidth
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            error={editPriceError}
            helperText={editPriceError ? "Price is Required" : ""}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            error={editDescriptionError}
            helperText={editDescriptionError ? "Description is Required" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={updateImage} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        disableEnforceFocus
        disableRestoreFocus
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Dish?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteImage(deleteId)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={uploadSuccess}
        autoHideDuration={3000}
        onClose={() => setUploadSuccess(false)}
      >
        <Alert
          onClose={() => setUploadSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Dish uploaded successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={3000}
        onClose={() => setDeleteSuccess(false)}
      >
        <Alert
          onClose={() => setDeleteSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Dish deleted successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={updateSuccess}
        autoHideDuration={3000}
        onClose={() => setUpdateSuccess(false)}
      >
        <Alert
          onClose={() => setUpdateSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Dish updated successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Admin;
