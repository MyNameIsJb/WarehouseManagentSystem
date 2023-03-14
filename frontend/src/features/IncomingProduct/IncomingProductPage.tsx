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
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteIncomingProductAction,
  getAllIncomingProductsAction,
  itemsInterface,
  receivedIncomingProductAction,
} from "./incomingProductSlice";
import moment from "moment";

const IncomingProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { incomingProducts, loading } = useAppSelector(
    (state) => state.incomingProduct
  );
  const [page, setPage] = useState(1);
  const levelOfAccess = localStorage.getItem("levelOfAccess");

  useEffect(() => {
    dispatch(getAllIncomingProductsAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllIncomingProductsAction(value));
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
        {levelOfAccess === "Administrator" && (
          <Button
            onClick={() => navigate("/createIncomingProduct")}
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
                <Th>Brand Name</Th>
                <Th>Description</Th>
                <Th>Model</Th>
                <Th>Quantity</Th>
                <Th>Total Price</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {incomingProducts?.items.length === 0 ? (
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
                incomingProducts?.items.map(
                  (item: itemsInterface, index: number) => {
                    return (
                      <Tr key={index}>
                        <Td>{item.brandName}</Td>
                        <Td>{item.description}</Td>
                        <Td>{item.model}</Td>
                        <Td>{item.quantity}</Td>
                        <Td>{item.totalPrice}</Td>
                        <Td>
                          {moment(item.dateOfTransaction)
                            .utc()
                            .format("MMMM D, Y")}
                        </Td>
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
                                <Link to={`/editIncomingProduct/${item._id}`}>
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
                                        deleteIncomingProductAction(item._id)
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
                                      receivedIncomingProductAction(item._id)
                                    );
                                    setPage(1);
                                  }}
                                  color="primary"
                                  variant="contained"
                                >
                                  <AddShoppingCartIcon />
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
        {incomingProducts?.pagination.pageCount !== 0 && (
          <Pagination
            count={incomingProducts?.pagination.pageCount}
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

export default IncomingProductPage;
