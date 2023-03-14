import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import moment from "moment";
import {
  deleteOutgoingProductAction,
  deliverOutgoingProductAction,
  getAllOutgoingProductsAction,
  itemsInterface,
} from "./outgoingProductSlice";
import { getAllUsersAction } from "../EmployeeList/employeeListSlice";

const OutgoingProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { outgoingProducts, loading } = useAppSelector(
    (state) => state.outgoingProduct
  );
  const [page, setPage] = useState(1);
  const levelOfAccess = localStorage.getItem("levelOfAccess");

  useEffect(() => {
    dispatch(getAllOutgoingProductsAction(1));
    dispatch(getAllUsersAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllOutgoingProductsAction(value));
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
          Outgoing Product
        </Typography>
        {levelOfAccess === "Administrator" && (
          <Button
            onClick={() => navigate("/createOutgoingProduct")}
            variant="contained"
          >
            <AddIcon /> Add Product
          </Button>
        )}
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
                <Th>Date</Th>
                <Th>Store</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {outgoingProducts?.items.length === 0 ? (
                <Tr>
                  <Td>0 Result</Td>
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
                outgoingProducts?.items.map(
                  (item: itemsInterface, index: number) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.productId}</Td>
                        <Td>{item.brandName}</Td>
                        <Td>{item.description}</Td>
                        <Td>{item.model}</Td>
                        <Td>{item.quantity}</Td>
                        <Td>{item.pricePerUnit}</Td>
                        <Td>
                          {moment(item.dateOfTransaction)
                            .utc()
                            .format("MMMM D, Y")}
                        </Td>
                        <Td>{item.store}</Td>
                        <Td>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {levelOfAccess === "Administrator" ? (
                              <>
                                <Link to={`/editOutgoingProduct/${item._id}`}>
                                  <Box sx={{ marginRight: "0.5em" }}>
                                    <Button color="success" variant="contained">
                                      <EditIcon />
                                    </Button>
                                  </Box>
                                </Link>
                                <Box sx={{ marginLeft: "0.5em" }}>
                                  <Button
                                    onClick={() => {
                                      dispatch(
                                        deleteOutgoingProductAction(item._id)
                                      );
                                      setPage(1);
                                    }}
                                    color="error"
                                    variant="contained"
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </Box>
                              </>
                            ) : (
                              <Box sx={{ marginLeft: "0.5em" }}>
                                <Button
                                  onClick={() => {
                                    dispatch(
                                      deliverOutgoingProductAction(item._id)
                                    );
                                    setPage(1);
                                  }}
                                  color="primary"
                                  variant="contained"
                                >
                                  <ShoppingCartCheckoutIcon />
                                </Button>
                              </Box>
                            )}
                          </Box>
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
        {outgoingProducts?.pagination.pageCount !== 0 && (
          <Pagination
            count={outgoingProducts?.pagination.pageCount}
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

export default OutgoingProductPage;
