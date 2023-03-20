import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logoutAction } from "../features/Login/loginSlice";
import SideNav from "./SideNav";
import { getProfileAction } from "../features/Profile/profileSlice";

const settings = [
  { route: "profile", link: "Profile" },
  { route: "help", link: "Help" },
];

const TopNav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { profileData, loading } = useAppSelector((state) => state.profile);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    dispatch(logoutAction());
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  useEffect(() => {
    dispatch(getProfileAction());
    if (token === null) {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  }, [dispatch, navigate, token]);

  return (
    <AppBar position="static">
      <Toolbar
        disableGutters
        sx={{
          padding: "0 1em 0 1em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SideNav />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WMS
          </Typography>
        </Box>

        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          WMS
        </Typography>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar>
                {loading ? (
                  <CircularProgress sx={{ fontSize: "2em" }} />
                ) : (
                  profileData?.name.charAt(0)
                )}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <Link
                className="MenuLink"
                key={setting.route}
                to={`/${setting.route}`}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting.link}</Typography>
                </MenuItem>
              </Link>
            ))}
            <MenuItem onClick={logout}>
              <Typography textAlign="center" className="MenuLink">
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
