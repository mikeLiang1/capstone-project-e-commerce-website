import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import "./AddProductPage.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVOqrvODx6KS-xBGs5guJTrKBJjduEjRI",
  authDomain: "nocta-tech.firebaseapp.com",
  projectId: "nocta-tech",
  storageBucket: "nocta-tech.appspot.com",
  messagingSenderId: "1002605988200",
  appId: "1:1002605988200:web:e91efebc3765fd58b0eedd",
  measurementId: "G-5HBFEX2BNM",
};

const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

function AddProductPage() {
  const [addPhoto, setAddPhoto] = useState("block");
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState({
    category: "",
    name: "",
    image: "",
    price: "",
    tag: "",
    description: "",
  });
  const fileInput = React.useRef(null);

  async function submitData() {
    // Uploading image to retrieve link
    const storageRef = ref(storage, image.name);

    let snapshot = await uploadBytes(storageRef, image);

    let url = await getDownloadURL(ref(storage, image.name));

    details.image = url;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(details),
    };

    const res = await fetch(`/product`, requestOptions);
    console.log(res);
    if (res.status === 200) {
      const data = await res.json();
      console.log(details);
    }
  }

  const handleClick = (e) => {
    fileInput.current.click();
  };

  const handleRemove = (e) => {
    setImage("");
    fileInput.current.value = null;
    setAddPhoto("block");
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setAddPhoto("none");
    }
  };

  //now

  return (
    <div id="AddProductPage">
      <Box sx={{ maxWidth: "50%" }}>
        <Typography variant="body1">
          Select the Category that this product belongs to:
        </Typography>
        <Typography variant="body1">
          (leave it as None if it does not belong to any Category)
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Category (if applicable):</Typography>

          <TextField
            label="Category"
            multiline
            maxRows={8}
            value={details.category}
            onChange={(e) =>
              setDetails({ ...details, category: e.target.value })
            }
            style={{ width: "400px" }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", marginTop: "40px", height: "80%" }}>
        <Box id="file-upload-wrapper">
          <Box id="file-upload-section">
            <img
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
              src={image ? URL.createObjectURL(image) : null}
              alt={image ? image.name : null}
            />
          </Box>
          <Box id="file-upload-buttons">
            <Button
              onClick={() => {
                handleClick();
              }}
              style={{
                backgroundColor: "#000000",
                color: "#FFFFFF",
                borderRadius: "16px",
              }}
              size="large"
              variant="contained"
            >
              Upload Photo
            </Button>
            <input
              id="file-upload"
              ref={fileInput}
              onChange={handleChange}
              type="file"
            />
            <Button
              onClick={() => {
                handleRemove();
              }}
              style={{
                backgroundColor: "#000000",
                color: "#FFFFFF",
                borderRadius: "16px",
              }}
              size="large"
              variant="contained"
            >
              Remove Photo
            </Button>
          </Box>
        </Box>
        <Box id="inputs-section">
          <div>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              style={{ width: "400px" }}
            >
              <TextField
                label="Product Name"
                multiline
                maxRows={8}
                value={details.name}
                onChange={(e) =>
                  setDetails({ ...details, name: e.target.value })
                }
                style={{ width: "400px" }}
              />
            </Box>
          </div>
          <div>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              style={{ width: "400px" }}
            >
              <TextField
                label="Price"
                multiline
                maxRows={8}
                value={details.price}
                onChange={(e) =>
                  setDetails({ ...details, price: e.target.value })
                }
                style={{ width: "400px" }}
              />
            </Box>
          </div>
          <div>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              className="formWidth"
            >
              <TextField
                label="Tag"
                multiline
                maxRows={8}
                value={details.tag}
                onChange={(e) =>
                  setDetails({ ...details, tag: e.target.value })
                }
                fullWidth
                style={{ width: "400px" }}
              />
            </Box>
          </div>
          <div>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              style={{ width: "400px" }}
            >
              <TextField
                label="Description"
                multiline
                maxRows={8}
                value={details.description}
                onChange={(e) =>
                  setDetails({ ...details, description: e.target.value })
                }
                minRows={5}
                style={{ width: "400px" }}
              />
            </Box>
          </div>
          <div>
            <Button
              onClick={() => {
                submitData();
              }}
              type="submit"
              style={{
                backgroundColor: "#000000",
                color: "#FFFFFF",
                borderRadius: "16px",
              }}
              size="large"
              variant="contained"
            >
              Upload Product
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default AddProductPage;
