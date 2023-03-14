import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getAllStoreIncomingProductAction,
  itemsInterface,
  receivedStoreIncomingProductAction,
} from "./storeIncomingProductSlice";
import moment from "moment";

const StoreIncomingProductPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector(
    (state) => state.storeIncomingProduct
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllStoreIncomingProductAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllStoreIncomingProductAction(value));
    setPage(value);
  };

  return (
    <Box sx={{ margin: "1em", padding: "1em", background: "#FFF" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1em",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: "bold", color: "inherit" }}
        >
          Incoming Product
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
                <Th>Date of Delivery</Th>
                <Th>Action</Th>
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
                      <Td>{item.pricePerUnit}</Td>
                      <Td>
                        {moment(item.dateOfDelivery).utc().format("MMMM D, Y")}
                      </Td>
                      <Td>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            onClick={() => {
                              dispatch(
                                receivedStoreIncomingProductAction(item._id)
                              );
                              setPage(1);
                            }}
                            sx={{ marginRight: "0.5em" }}
                          >
                            <Button color="primary" variant="contained">
                              <AddShoppingCartIcon />
                            </Button>
                          </Box>
                        </Box>
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

export default StoreIncomingProductPage;
