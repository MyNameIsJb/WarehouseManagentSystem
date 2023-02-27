import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Pagination,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteUserAction, getAllUsersAction } from "./employeeListSlice";

const EmployeeListPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users, loading } = useAppSelector((state) => state.employeeList);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUsersAction(1));
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(getAllUsersAction(value));
    setPage(value);
  };

  return (
    <Box
      sx={{
        margin: "1em",
        padding: "1em",
        background: "#FFF",
      }}
    >
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
          Employee List
        </Typography>
        <Button onClick={() => navigate("/createUser")} variant="contained">
          <AddIcon />
          Create User
        </Button>
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
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Address</Th>
                <Th>Contact Number</Th>
                <Th>User Level</Th>
                <Th>Store</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users?.filteredItems.length === 0 ? (
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
                users?.filteredItems.map((item: any, index: number) => {
                  return (
                    <Tr key={index}>
                      <Td>{item.name}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.address}</Td>
                      <Td>{item.contactNumber}</Td>
                      <Td>{item.levelOfAccess}</Td>
                      <Td>{item.store ? item.store : "N/A"}</Td>
                      <Td>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Link to={`/editUser/${item._id}`}>
                            <Box sx={{ marginRight: "0.5em" }}>
                              <Button color="success" variant="contained">
                                <EditIcon />
                              </Button>
                            </Box>
                          </Link>
                          <Box sx={{ marginLeft: "0.5em" }}>
                            <Button
                              onClick={() => {
                                dispatch(deleteUserAction(item._id));
                                setPage(1);
                              }}
                              color="error"
                              variant="contained"
                            >
                              <DeleteIcon />
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
        {users?.pagination.pageCount !== 0 && (
          <Pagination
            count={users?.pagination.pageCount}
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

export default EmployeeListPage;
