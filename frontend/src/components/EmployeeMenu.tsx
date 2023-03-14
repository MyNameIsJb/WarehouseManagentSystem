import { Outlet } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const EmployeeMenu = () => {
  const levelOfAccess = localStorage.getItem("levelOfAccess");

  if (levelOfAccess !== "Employee") {
    return (
      <>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
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
              <WarningAmberIcon sx={{ fontSize: "2em", color: "#ff1744" }} />
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
              403 Restricted Access
            </Typography>
          </Box>
        </Container>
      </>
    );
  }

  return <Outlet />;
};

export default EmployeeMenu;
