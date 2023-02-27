import React, { useEffect } from "react";
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
  getAllProductsAction,
  getProductAction,
  itemsInterface,
  removeSingleProductAction,
  updateProductAction,
} from "./productListSlice";

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
    productId: yup.string().required("Product ID is required"),
    brandName: yup.string().required("Brand name is required"),
    description: yup.string().required("Description is required"),
    model: yup.string().required("Model is required"),
    quantity: yup.number().required("Quantity is required"),
    pricePerUnit: yup.string().required("Price per unit is required"),
  })
  .required();

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { singleProduct, loading } = useAppSelector(
    (state) => state.productList
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<itemsInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: singleProduct?.productId,
      brandName: singleProduct?.brandName,
      description: singleProduct?.description,
      model: singleProduct?.model,
      quantity: singleProduct?.quantity,
      pricePerUnit: singleProduct?.pricePerUnit,
    },
  });

  useEffect(() => {
    dispatch(getProductAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      productId: singleProduct?.productId,
      brandName: singleProduct?.brandName,
      description: singleProduct?.description,
      model: singleProduct?.model,
      quantity: singleProduct?.quantity,
      pricePerUnit: singleProduct?.pricePerUnit,
    });
  }, [reset, singleProduct]);

  const onSubmit = (data: itemsInterface) => {
    const finalData = {
      ...data,
      id: id,
    };
    dispatch(updateProductAction(finalData))
      .unwrap()
      .then(() => {
        dispatch(getAllProductsAction(1));
        navigate("/productList");
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
          Edit Product
        </Typography>
        <Button
          color="error"
          onClick={() => {
            navigate("/productList");
            dispatch(removeSingleProductAction());
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
            <InputLabel htmlFor="standard-adornment-password" shrink>
              Model
            </InputLabel>
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
            <InputLabel htmlFor="standard-adornment-password" shrink>
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
            <InputLabel htmlFor="standard-adornment-password" shrink>
              Price Per Unit
            </InputLabel>
            <Input
              {...register("pricePerUnit")}
              error={errors.pricePerUnit ? true : false}
              id="standard-adornment-password"
              type="text"
            />
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={{ color: "#d50000" }}
            >
              {errors.pricePerUnit?.message}
            </FormHelperText>
            <Box sx={{ marginTop: "2em" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", borderRadius: "20px" }}
              >
                Submit
              </Button>
            </Box>
          </FormControl>
        </form>
      )}
    </StyledParentBox>
  );
};

export default EditProductPage;
