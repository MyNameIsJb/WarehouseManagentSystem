import React, { ChangeEvent, useEffect, useState } from "react";
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
  Pagination,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getAllOrderedProductsAction,
  itemsInterface,
  orderProductAction,
} from "./stockReplenishmentSlice";
import { getAllProductsAction } from "../ProductList/productListSlice";

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

interface ProductListInterface {
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  pricePerUnit: string;
}

const OrderProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, loading } = useAppSelector((state) => state.productList);
  const [page, setPage] = useState(1);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<itemsInterface>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: itemsInterface) => {
    dispatch(orderProductAction(data))
      .unwrap()
      .then(() => {
        dispatch(getAllOrderedProductsAction(1));
        navigate("/storeOrderProduct");
      });
    reset();
  };

  useEffect(() => {
    dispatch(getAllProductsAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllProductsAction(value));
    setPage(value);
  };

  return (
    <>
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
            Order Product
          </Typography>
          <Button
            color="error"
            onClick={() => navigate("/storeOrderProduct")}
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
              Product Id
            </InputLabel>
            <Input
              {...register("productId")}
              error={errors.productId ? true : false}
              id="standard-adornment-password"
              type="text"
              autoFocus
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
      <Box sx={{ margin: "1em", padding: "1em", background: "#FFF" }}>
        <Box
          style={{
            overflowX: "auto",
          }}
        >
          {loading ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h1" component="h1">
                <CircularProgress sx={{ fontSize: "2em" }} />
              </Typography>
            </Box>
          ) : (
            <Table className="global-table-css">
              <Thead>
                <Tr>
                  <Th>Product ID</Th>
                  <Th>Brand Name</Th>
                  <Th>Description</Th>
                  <Th>Model</Th>
                  <Th>Quantity</Th>
                  <Th>Price Per Unit</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products?.items.length === 0 ? (
                  <Tr>
                    <Td>0 Result</Td>
                    <Td>0 Result</Td>
                    <Td>0 Result</Td>
                    <Td>0 Result</Td>
                    <Td>0 Result</Td>
                    <Td>0 Result</Td>
                    <Td>0 Result</Td>
                  </Tr>
                ) : (
                  products?.items.map(
                    (item: ProductListInterface, index: number) => {
                      return (
                        <Tr key={index}>
                          <Td
                            style={{
                              background: item.quantity <= 8 && "red",
                              color: item.quantity <= 8 && "white",
                            }}
                          >
                            {item.productId}
                          </Td>
                          <Td
                            style={{
                              background: item.quantity <= 8 && "red",
                              color: item.quantity <= 8 && "white",
                            }}
                          >
                            {item.brandName}
                          </Td>
                          <Td
                            style={{
                              background: item.quantity <= 8 && "red",
                              color: item.quantity <= 8 && "white",
                            }}
                          >
                            {item.description}
                          </Td>
                          <Td
                            style={{
                              background: item.quantity <= 8 && "red",
                              color: item.quantity <= 8 && "white",
                            }}
                          >
                            {item.model}
                          </Td>
                          <Td
                            style={{
                              background: item.quantity <= 8 && "red",
                              color: item.quantity <= 8 && "white",
                            }}
                          >
                            {item.quantity}
                          </Td>
                          <Td
                            style={{
                              background: item.quantity <= 8 && "red",
                              color: item.quantity <= 8 && "white",
                            }}
                          >
                            {item.pricePerUnit}
                          </Td>
                        </Tr>
                      );
                    }
                  )
                )}
              </Tbody>
            </Table>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1em 0 1em 0",
          }}
        >
          {products?.pagination.pageCount !== 0 && (
            <Pagination
              count={products?.pagination.pageCount}
              variant="outlined"
              color="primary"
              page={page}
              onChange={handleChange}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrderProductPage;
