import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Pagination } from "@mui/material";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllProductsAction, itemsInterface } from "./productListSlice";

const InventoryPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.productList);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllProductsAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllProductsAction(value));
    setPage(value);
  };

  return (
    <Box sx={{ margin: "1em", padding: "1em", background: "#FFF" }}>
      <Box
        sx={{
          marginBottom: "1em",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: "bold", color: "inherit" }}
        >
          Inventory
        </Typography>
      </Box>
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
                products?.items.map((item: itemsInterface, index: number) => {
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
                })
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
  );
};

export default InventoryPage;
