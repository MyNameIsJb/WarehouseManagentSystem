import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Container, CircularProgress, Typography } from "@mui/material";
import { useAppSelector } from "../store/store";
import TopNav from "./TopNav";
import Box from "@mui/material/Box";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const { loading } = useAppSelector((state) => state.login);

  if (token === null) {
    return (
      <>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          {loading ? (
            <Box
              sx={{
                border: "1px solid #FFF",
                borderRadius: "20px 20px 0 0",
                textAlign: "center",
                margin: "30vh auto 0",
                padding: "1em",
                background: "#FFF",
              }}
            >
              <Typography variant="h1" component="h1">
                <CircularProgress sx={{ fontSize: "2em" }} />
              </Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  border: "1px solid #FFF",
                  borderRadius: "20px 20px 0 0",
                  textAlign: "center",
                  margin: "15vh auto 0",
                  padding: "1em",
                  background: "#FFF",
                }}
              >
                <Typography variant="h1" component="h1">
                  <WarningAmberIcon
                    sx={{ fontSize: "2em", color: "#ff1744" }}
                  />
                </Typography>
              </Box>
              <Box
                sx={{
                  border: "1px solid #FFF",
                  borderRadius: "0 0 20px 20px",
                  margin: "0 auto 0",
                  padding: "1em",
                  background: "#FFF",
                }}
              >
                <Typography
                  sx={{ color: "#ff1744" }}
                  variant="h3"
                  component="h1"
                  gutterBottom
                >
                  401 Unauthorized
                </Typography>
                <Typography variant="h5" component="h1" gutterBottom>
                  <NavLink className="ProtectRouteLink" to="/">
                    Login
                  </NavLink>{" "}
                  to gain access
                </Typography>
              </Box>
            </>
          )}
        </Container>
      </>
    );
  }

  return (
    <>
      <TopNav />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
