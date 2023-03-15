import React, { ChangeEvent, useEffect, useState } from "react";
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
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  deleteSaleAction,
  getAllSalesAction,
  itemsInterface,
} from "./saleSlice";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

const SalePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sales, loading } = useAppSelector((state) => state.sale);
  const [page, setPage] = useState(1);
  const levelOfAccess = localStorage.getItem("levelOfAccess");

  useEffect(() => {
    dispatch(getAllSalesAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllSalesAction(value));
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
          Sale
        </Typography>
        {levelOfAccess === "Client" && (
          <Button onClick={() => navigate("/createSale")} variant="contained">
            <AddIcon /> Add Sale
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
                <Th>Date of Transaction</Th>
                <Th>Product ID</Th>
                <Th>Brand Name</Th>
                <Th>Description</Th>
                <Th>Model</Th>
                <Th>Quantity</Th>
                <Th>Total Price</Th>
                <Th>Name of Store</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sales?.items.length === 0 ? (
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
                sales?.items.map((item: itemsInterface, index: number) => {
                  return (
                    <Tr key={index}>
                      <Td>
                        {moment(item.dateOfTransaction)
                          .utc()
                          .format("MMMM D, Y")}
                      </Td>
                      <Td>{item.productId}</Td>
                      <Td>{item.brandName}</Td>
                      <Td>{item.description}</Td>
                      <Td>{item.model}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>{item.totalPrice}</Td>
                      <Td>{item.nameOfStore}</Td>
                      <Td>
                        {levelOfAccess === "Client" && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Link to={`/editSale/${item._id}`}>
                              <Box sx={{ marginRight: "0.5em" }}>
                                <Button color="success" variant="contained">
                                  <EditIcon />
                                </Button>
                              </Box>
                            </Link>
                            <Box sx={{ marginLeft: "0.5em" }}>
                              <Button
                                onClick={() => {
                                  dispatch(deleteSaleAction(item._id));
                                  setPage(1);
                                }}
                                color="error"
                                variant="contained"
                              >
                                <DeleteIcon />
                              </Button>
                            </Box>
                          </Box>
                        )}
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
        {sales?.pagination.pageCount !== 0 && (
          <Pagination
            count={sales?.pagination.pageCount}
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

export default SalePage;
