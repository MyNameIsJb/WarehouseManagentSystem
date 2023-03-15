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
  itemsInterface,
  getStoreProductAction,
  updateStorePriceAction,
  getAllStoreInventoryAction,
  removeSingleProductAction,
} from "./storeInventorySlice";

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
    storePrice: yup.string().required("Price is required"),
  })
  .required();

const EditStorePricePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { singleProduct, loading } = useAppSelector(
    (state) => state.storeInventory
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
      wareHousePrice: singleProduct?.wareHousePrice,
    },
  });

  useEffect(() => {
    dispatch(getStoreProductAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      productId: singleProduct?.productId,
      brandName: singleProduct?.brandName,
      description: singleProduct?.description,
      model: singleProduct?.model,
      quantity: singleProduct?.quantity,
      wareHousePrice: singleProduct?.wareHousePrice,
    });
  }, [reset, singleProduct]);

  const onSubmit = (data: itemsInterface) => {
    const finalData = {
      ...data,
      id: id,
    };

    dispatch(updateStorePriceAction(finalData))
      .unwrap()
      .then(() => {
        dispatch(getAllStoreInventoryAction(1));
        navigate("/storeInventory");
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
          Edit Price
        </Typography>
        <Button
          color="error"
          onClick={() => {
            navigate("/storeInventory");
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
              Product Id
            </InputLabel>
            <Input
              {...register("productId")}
              id="standard-adornment-password"
              type="text"
              disabled
            />
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
              id="standard-adornment-password"
              type="text"
              disabled
            />
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
              id="standard-adornment-password"
              type="text"
              disabled
            />
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
              id="standard-adornment-password"
              type="text"
              disabled
            />
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
              id="standard-adornment-password"
              type="text"
              disabled
            />
          </FormControl>
          <FormControl
            sx={{ width: "100%", margin: "1em 0 1em 0" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password" shrink>
              Warehouse Price
            </InputLabel>
            <Input
              {...register("wareHousePrice")}
              id="standard-adornment-password"
              type="text"
              disabled
            />
          </FormControl>
          <FormControl
            sx={{ width: "100%", margin: "1em 0 1em 0" }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password" shrink>
              Store Price
            </InputLabel>
            <Input
              {...register("storePrice")}
              error={errors.storePrice ? true : false}
              id="standard-adornment-password"
              type="text"
            />
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={{ color: "#d50000" }}
            >
              {errors.storePrice?.message}
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
      )}
    </StyledParentBox>
  );
};

export default EditStorePricePage;
