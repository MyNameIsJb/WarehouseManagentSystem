import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getAllStoreInventoryAction,
  itemsInterface,
} from "./storeInventorySlice";

const StoreInventoryPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.storeInventory);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllStoreInventoryAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllStoreInventoryAction(value));
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
                <Th>Warehouse Price</Th>
                <Th>Store Price</Th>
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
                        {item.wareHousePrice}
                      </Td>
                      <Td
                        style={{
                          background: item.quantity <= 8 && "red",
                          color: item.quantity <= 8 && "white",
                        }}
                      >
                        {item.storePrice}
                      </Td>
                      <Td
                        style={{
                          background: item.quantity <= 8 && "red",
                          color: item.quantity <= 8 && "white",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Link to={`/editStorePrice/${item._id}`}>
                            <Box sx={{ marginRight: "0.5em" }}>
                              <Button color="success" variant="contained">
                                <EditIcon />
                              </Button>
                            </Box>
                          </Link>
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

export default StoreInventoryPage;
