import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Pagination } from "@mui/material";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getAllOrderProductsAction,
  itemsInterface,
} from "./stockReplenishmentSlice";
import moment from "moment";

const StockReplenishmentPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.orderProduct);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllOrderProductsAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllOrderProductsAction(value));
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
          Stock Replenishment
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
                <Th>Product Id</Th>
                <Th>Brand Name</Th>
                <Th>Description</Th>
                <Th>Model</Th>
                <Th>Quantity</Th>
                <Th>Store</Th>
                <Th>Ordered Date</Th>
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
                      <Td>{item.productId}</Td>
                      <Td>{item.brandName}</Td>
                      <Td>{item.description}</Td>
                      <Td>{item.model}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>{item.store}</Td>
                      <Td>
                        {moment(item.orderedDate).utc().format("MMMM D, Y")}
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

export default StockReplenishmentPage;
