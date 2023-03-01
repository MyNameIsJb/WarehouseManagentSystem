import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteImageAction,
  getAllImagesAction,
  itemsInterface,
} from "./GallerySlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const GalleryPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { images, loading } = useAppSelector((state) => state.gallery);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllImagesAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllImagesAction(value));
    setPage(value);
  };

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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="h1" component="h1">
              <CircularProgress sx={{ fontSize: "2em" }} />
            </Typography>
          </Box>
        ) : (
          images?.items.map((item: itemsInterface, index) => {
            return (
              <Card
                key={index}
                sx={{
                  maxWidth: 345,
                  minWidth: 345,
                  maxHeight: 550,
                  minHeight: 550,
                  margin: "1em",
                  border: "1px solid #D6E4E5",
                  padding: "1em",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 300, width: 300, margin: "0 auto" }}
                  src={item.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.brandName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.itemDescription}
                  </Typography>
                  <Chip
                    sx={{ margin: "1em 0 1em 0" }}
                    label={item.classification}
                  />
                  <Typography
                    sx={{ color: "#5BC0F8" }}
                    variant="h6"
                    component="h1"
                  >
                    ₱{item.price}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Link to={`/editImage/${item._id}`}>
                    <Button size="small" variant="contained">
                      <EditIcon />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      dispatch(deleteImageAction(item._id));
                      setPage(1);
                    }}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    <DeleteIcon />
                  </Button>
                </CardActions>
              </Card>
            );
          })
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "1em 0 1em 0",
        }}
      >
        {images?.pagination.pageCount !== 0 && (
          <Pagination
            count={images?.pagination.pageCount}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handleChange}
          />
        )}
      </Box>
    </Box>
  );
};

export default GalleryPage;
