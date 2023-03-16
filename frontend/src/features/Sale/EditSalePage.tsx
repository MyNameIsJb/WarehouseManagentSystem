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
  getAllSalesAction,
  getSaleAction,
  itemsInterface,
  removeSingleSaleAction,
  updateSaleAction,
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

const EditSalePage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { singleSale, loading } = useAppSelector((state) => state.sale);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<itemsInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      productId: singleSale?.productId,
      quantity: singleSale?.quantity,
    },
  });

  useEffect(() => {
    dispatch(getSaleAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    reset({
      productId: singleSale?.productId,
      quantity: singleSale?.quantity,
    });
  }, [reset, singleSale]);

  const onSubmit = (data: itemsInterface) => {
    const finalData = {
      ...data,
      id: id,
    };
    dispatch(updateSaleAction(finalData))
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
          Edit Sale
        </Typography>
        <Button
          color="error"
          onClick={() => {
            navigate("/storeSales");
            dispatch(removeSingleSaleAction());
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
              disabled
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

export default EditSalePage;
