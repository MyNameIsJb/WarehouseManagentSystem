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
  createSaleAction,
  getAllSalesAction,
  itemsInterface,
} from "./saleSlice";

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
    productId: yup.string().required("Product id is required"),
    quantity: yup.number().required("Quantity is required"),
  })
  .required();

const CreateSalePage = () => {
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
    dispatch(createSaleAction(data))
      .unwrap()
      .then(() => {
        dispatch(getAllSalesAction(1));
        navigate("/storeSales");
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
          Create Sale
        </Typography>
        <Button
          color="error"
          onClick={() => navigate("/storeSales")}
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
            Product ID
          </InputLabel>
          <Input
            {...register("productId")}
            error={errors.productId ? true : false}
            id="standard-adornment-password"
            type="text"
          />
          <FormHelperText
            id="outlined-weight-helper-text"
            sx={{ color: "#d50000" }}
          >
            {errors.productId?.message}
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

export default CreateSalePage;
