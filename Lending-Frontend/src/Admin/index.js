import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  Grid,
  useMediaQuery,
  Button,
  Avatar,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { logout } from "../actions/auth";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import notification from "../assets/notification.svg";
import pie from "../assets/pie.svg";
import account from "../assets/user.svg";
import { NavLink, Route, Routes, useNavigate, Link } from "react-router-dom";
import Home from "./Home";
import Board from "./Loan Board";
import Users from "./Users";
import { useDispatch, useSelector } from "react-redux";
function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const small = useMediaQuery("(max-width:756px)");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        open={open}
        sx={{ backgroundColor: "#e7efff", boxShadow: "none", zIndex: 1 }}
      >
        <Toolbar>
          <Grid item container alignItems={"center"}>
            {" "}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon style={{ color: "black", fontSize: "1.1em" }} />
            </IconButton>
          </Grid>

          <Box
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              padding: small ? "0" : "0 2em",
              justifyContent: "flex-end",
            }}
          >
            <IconButton color="inherit" style={{ marginRight: "1em" }}>
              <img src={notification} alt="" />
            </IconButton>
            <IconButton component={Link} to="/admin" color="inherit">
              {" "}
              <Avatar src={user.pfp} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        onClose={toggleDrawer}
        open={open}
        sx={{
          zIndex: 1,
          width: small ? "40vw" : "20vw",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: small ? "65vw" : "20vw",
            boxSizing: "border-box",
          },
        }}
        variant={!small ? "permanent" : "temporary"}
        anchor="left"
      >
        <Box sx={{ px: 2, py: 1 }}>
          <img
            src="/logo.jpg"
            style={{ width: small ? "30vw" : "10vw" }}
            alt="logo"
          />
        </Box>
        <Toolbar />
        <Box>
          <Button
            fullWidth
            style={{
              color: "black",
              padding: 0,
              marginBottom: "1em",
              textTransform: "capitalize",
            }}
          >
            <NavLink
              onClick={toggleDrawer}
              to="/admin/"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "rgba(124, 154, 234,0.7)",
                      color: "black",
                      textDecoration: "none",
                      height: "100%",
                      width: "100%",
                      padding: "0.5em",
                    }
                  : {
                      color: "black",
                      textDecoration: "none",
                      height: "100%",
                      width: "100%",
                      padding: "0.5em",
                    }
              }
            >
              <Grid item container xs={12}>
                <Grid
                  item
                  xs={3}
                  container
                  justifyContent={"center"}
                  alignItems="center"
                >
                  <DashboardOutlinedIcon />
                </Grid>
                <Grid item xs={7} container>
                  <Typography fontSize={24}>Dashboard</Typography>
                </Grid>
              </Grid>
            </NavLink>
          </Button>
          <Button
            fullWidth
            style={{
              color: "black",
              padding: 0,
              marginBottom: "1em",
              textTransform: "capitalize",
            }}
          >
            <NavLink
              onClick={toggleDrawer}
              to="/admin/users"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "rgba(124, 154, 234,0.7)",
                      color: "black",
                      textDecoration: "none",
                      height: "100%",
                      width: "100%",
                      padding: "0.5em",
                    }
                  : {
                      color: "black",
                      textDecoration: "none",
                      height: "100%",
                      width: "100%",
                      padding: "0.5em",
                      display: "flex",
                    }
              }
            >
              <Grid item container xs={12}>
                <Grid
                  item
                  xs={3}
                  container
                  justifyContent={"center"}
                  alignItems="center"
                >
                  <img src={account} alt="user" />
                </Grid>
                <Grid item xs={7} container>
                  <Typography fontSize={24}>Users</Typography>
                </Grid>
              </Grid>
            </NavLink>
          </Button>{" "}
          <Button
            fullWidth
            style={{
              color: "black",
              padding: 0,
              marginBottom: "1em",
              textTransform: "capitalize",
            }}
          >
            <NavLink
              onClick={toggleDrawer}
              to="/admin/loan-board?type=requested"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "rgba(124, 154, 234,0.7)",
                      color: "black",
                      textDecoration: "none",
                      height: "100%",
                      width: "100%",
                      padding: "0.5em",
                    }
                  : {
                      color: "black",
                      textDecoration: "none",
                      height: "100%",
                      width: "100%",
                      padding: "0.5em",
                    }
              }
            >
              <Grid item container xs={12}>
                <Grid
                  item
                  xs={3}
                  container
                  justifyContent={"center"}
                  alignItems="center"
                >
                  <img src={pie} alt="" />
                </Grid>
                <Grid item xs={7} container>
                  <Typography fontSize={24}>LoanBoard</Typography>
                </Grid>
              </Grid>
            </NavLink>
          </Button>{" "}
        </Box>
        <Box
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            fullWidth
            onClick={() => {
              dispatch(logout(navigate, toggleDrawer));
            }}
            style={{
              color: "black",
              padding: "0.5em",
              marginBottom: "1em",
              textTransform: "capitalize",
            }}
          >
            <Grid item container xs={12} alignItems="center">
              <Grid
                item
                xs={3}
                container
                justifyContent={"center"}
                alignItems="center"
              >
                <LogoutOutlinedIcon />
              </Grid>
              <Grid container item xs={7}>
                <Typography fontSize={24}>Logout</Typography>
              </Grid>
            </Grid>
          </Button>
        </Box>
      </Drawer>
      <Box
        component="main"
        style={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          backgroundColor: "#e7efff",
          padding: small ? "none" : "0.5em 0 0.5em 1.5em",
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="loan-board" element={<Board />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
