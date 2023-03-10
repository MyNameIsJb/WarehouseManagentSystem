import React, { useEffect, useRef } from "react";
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
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  createBarcodeAction,
  deleteAllBarcodesAction,
  getAllBarcodesAction,
  itemsInterface,
} from "./barcodeGeneratorSlice";

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
    productId: yup.string().required("Product Id is required"),
  })
  .required();

const BarcodeGeneratorPage = () => {
  const ref: any = useRef();
  const dispatch = useAppDispatch();
  const { barcodes } = useAppSelector((state) => state.barcodeGenerator);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<itemsInterface>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(getAllBarcodesAction());
  }, [dispatch]);

  const onSubmit = (data: itemsInterface) => {
    dispatch(createBarcodeAction(data));
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
          Barcode Generator
        </Typography>
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
        <Box sx={{ marginTop: "2em" }}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ width: "100%", borderRadius: "20px" }}
          >
            Add
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteAllBarcodesAction());
            }}
            color="error"
            variant="contained"
            sx={{ width: "100%", borderRadius: "20px", marginTop: "1em" }}
          >
            Delete
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button
                type="submit"
                color="success"
                variant="contained"
                sx={{ width: "100%", borderRadius: "20px", marginTop: "1em" }}
              >
                Print
              </Button>
            )}
            content={() => ref.current}
          />
        </Box>
      </form>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "1em",
        }}
      >
        <Box ref={ref}>
          {barcodes?.items.map((items: itemsInterface, index) => {
            return <Barcode key={index} value={items.productId} />;
          })}
        </Box>
      </Box>
    </StyledParentBox>
  );
};

export default BarcodeGeneratorPage;
