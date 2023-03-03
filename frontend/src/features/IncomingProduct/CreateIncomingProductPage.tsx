import React from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../store/store";
import {
  createIncomingProductAction,
  getAllIncomingProductsAction,
  itemsInterface,
} from "./incomingProductSlice";

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
    description: yup.string().required("Description is required"),
    model: yup.string().required("Model is required"),
    quantity: yup.number().required("Quantity is required"),
    totalPrice: yup.string().required("Total price is required"),
  })
  .required();

const CreateIncomingProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<itemsInterface>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: itemsInterface) => {
    dispatch(createIncomingProductAction(data))
      .unwrap()
      .then(() => {
        dispatch(getAllIncomingProductsAction(1));
        navigate("/incomingProduct");
      });
    reset();
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
          Add Product
        </Typography>
        <Button
          color="error"
          onClick={() => navigate("/incomingProduct")}
          variant="contained"
        >
          <CloseIcon />
        </Button>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormControl
          sx={{ width: "100%", margin: "1em 0 1em 0" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">
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
          <InputLabel htmlFor="standard-adornment-password">
            Description
          </InputLabel>
          <Input
            {...register("description")}
            error={errors.description ? true : false}
            id="standard-adornment-password"
            type="text"
          />
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ color: "#d50000" }}
          >
            {errors.description?.message}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{ width: "100%", margin: "1em 0 1em 0" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">Model</InputLabel>
          <Input
            {...register("model")}
            error={errors.model ? true : false}
            id="standard-adornment-password"
            type="text"
          />
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ color: "#d50000" }}
          >
            {errors.model?.message}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{ width: "100%", margin: "1em 0 1em 0" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Quantity
          </InputLabel>
          <Input
            {...register("quantity")}
            error={errors.quantity ? true : false}
            id="standard-adornment-password"
            type="number"
          />
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ color: "#d50000" }}
          >
            {errors.quantity?.message}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{ width: "100%", margin: "1em 0 1em 0" }}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Total Price
          </InputLabel>
          <Input
            {...register("totalPrice")}
            error={errors.totalPrice ? true : false}
            id="standard-adornment-password"
            type="text"
          />
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ color: "#d50000" }}
          >
            {errors.totalPrice?.message}
          </FormHelperText>
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
    </StyledParentBox>
  );
};

export default CreateIncomingProductPage;
