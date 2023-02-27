import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const GalleryPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ margin: "1em", padding: "1em" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: "bold", color: "inherit" }}
        >
          Gallery
        </Typography>
        <Button onClick={() => navigate("/uploadImage")} variant="contained">
          <AddIcon /> Upload Image
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></Box>
    </Box>
  );
};

export default GalleryPage;
