import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getAllImagesAction,
  getImageAction,
  itemsInterface,
  removeSingleImageAction,
  updateImageAction,
} from "./GallerySlice";

const StyledParentBox = styled(Box)(({ theme }) => ({
  width: "50%",
  margin: "1em auto",
  padding: "2em",
  [theme.breakpoints.down("md")]: {
    width: "80%",
    margin: "1em auto",
    padding: "2em",
  },
  [theme.breakpoints.up("md")]: {
    width: "50%",
    margin: "1em auto",
    padding: "2em",
  },
}));

const schema = yup
  .object({
    brandName: yup.string().required("Brand name is required"),
    itemDescription: yup.string().required("Item description is required"),
    classification: yup.string().required("Classification is required"),
    price: yup.string().required("Price is required"),
  })
  .required();

const EditImagePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [baseImage, setBaseImage] = useState("");
  const { singleImage, loading } = useAppSelector((state) => state.gallery);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<itemsInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      brandName: singleImage?.brandName,
      itemDescription: singleImage?.itemDescription,
      classification: singleImage?.classification,
      price: singleImage?.price,
    },
  });

  useEffect(() => {
    dispatch(getImageAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      brandName: singleImage?.brandName,
      itemDescription: singleImage?.itemDescription,
      classification: singleImage?.classification,
      price: singleImage?.price,
    });
  }, [reset, singleImage]);

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const base64: any = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = (data: itemsInterface) => {
    if (baseImage === "") {
      const finalData = {
        ...data,
        id: id,
        image: singleImage?.image,
      };
      dispatch(updateImageAction(finalData))
        .unwrap()
        .then(() => {
          dispatch(getAllImagesAction(1));
          navigate("/gallery");
        });
      reset();
    } else {
      const finalData = {
        ...data,
        id: id,
        image: baseImage,
      };
      dispatch(updateImageAction(finalData))
        .unwrap()
        .then(() => {
          dispatch(getAllImagesAction(1));
          navigate("/gallery");
        });
      reset();
    }
  };

  return (
    <StyledParentBox>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: "bold", color: "inherit" }}
        >
          Edit Image
        </Typography>
        <Button
          color="error"
          onClick={() => {
            navigate("/gallery");
            dispatch(removeSingleImageAction());
          }}
          variant="contained"
        >
          <CloseIcon />
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h1" component="h1">
            <CircularProgress sx={{ fontSize: "2em" }} />
          </Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <FormControl
            sx={{ width: "100%", margin: "1em 0 1em 0" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password" shrink>
              Brand Name
            </InputLabel>
            <Input
              {...register("brandName")}
              error={errors.brandName ? true : false}
              id="standard-adornment-password"
              type="text"
            />
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={{ color: "#d50000" }}
            >
              {errors.brandName?.message}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ width: "100%", margin: "1em 0 1em 0" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password" shrink>
              Item Description
            </InputLabel>
            <Input
              {...register("itemDescription")}
              error={errors.itemDescription ? true : false}
              id="standard-adornment-password"
              type="text"
            />
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={{ color: "#d50000" }}
            >
              {errors.itemDescription?.message}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ width: "100%", margin: "1em 0 1em 0" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password" shrink>
              Classification
            </InputLabel>
            <Input
              {...register("classification")}
              error={errors.classification ? true : false}
              id="standard-adornment-password"
              type="text"
            />
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={{ color: "#d50000" }}
            >
              {errors.classification?.message}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ width: "100%", margin: "1em 0 1em 0" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password" shrink>
              Price
            </InputLabel>
            <Input
              {...register("price")}
              error={errors.price ? true : false}
              id="standard-adornment-password"
              type="text"
            />
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={{ color: "#d50000" }}
            >
              {errors.price?.message}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ width: "100%", margin: "1em 0 1em 0" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password" shrink>
              Image
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type="file"
              inputProps={{
                accept: "image/*, .jpeg, .jpg, .png, .gif",
              }}
              onChange={(e) => {
                uploadImage(e);
              }}
            />
          </FormControl>
          <Box sx={{ marginTop: "2em" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", borderRadius: "20px" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </StyledParentBox>
  );
};

export default EditImagePage;
