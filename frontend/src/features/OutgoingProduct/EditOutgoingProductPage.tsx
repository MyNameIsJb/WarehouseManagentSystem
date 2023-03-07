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
  getAllOutgoingProductsAction,
  getOutgoingProductAction,
  itemsInterface,
  removeSingleOutgoingProductAction,
  updateOutgoingProductAction,
} from "./outgoingProductSlice";

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
    productId: yup.string().required("Brand name is required"),
    quantity: yup.number().required("Quantity is required"),
    store: yup.string().required("Store is required"),
  })
  .required();

const EditOutgoingProductPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { singleOutgoingProduct, loading } = useAppSelector(
    (state) => state.outgoingProduct
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<itemsInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: singleOutgoingProduct?.productId,
      quantity: singleOutgoingProduct?.quantity,
      store: singleOutgoingProduct?.store,
    },
  });

  useEffect(() => {
    dispatch(getOutgoingProductAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      productId: singleOutgoingProduct?.productId,
      quantity: singleOutgoingProduct?.quantity,
      store: singleOutgoingProduct?.store,
    });
  }, [reset, singleOutgoingProduct]);

  const onSubmit = (data: itemsInterface) => {
    const finalData = {
      ...data,
      id: id,
    };

    dispatch(updateOutgoingProductAction(finalData))
      .unwrap()
      .then(() => {
        dispatch(getAllOutgoingProductsAction(1));
        navigate("/outgoingProduct");
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
            navigate("/outgoingProduct");
            dispatch(removeSingleOutgoingProductAction());
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
              Store
            </InputLabel>
            <Input
              {...register("store")}
              error={errors.store ? true : false}
              id="standard-adornment-password"
              type="text"
            />
            <FormHelperText
              id="outlined-weight-helper-text"
              sx={{ color: "#d50000" }}
            >
              {errors.store?.message}
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

export default EditOutgoingProductPage;
