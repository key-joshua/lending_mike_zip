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
  Menu,
  MenuItem,
  Avatar,
  Badge,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { logout } from "../actions/auth";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import notif from "../assets/notification.svg";
import pie from "../assets/pie.svg";
import gear from "../assets/gear.svg";
import { NavLink, Route, Routes, useNavigate, Link } from "react-router-dom";
import Home from "./Home";
import Board from "./Loan Board";
import Settings from "./Settings";
import { useDispatch, useSelector } from "react-redux";
import Messaging from "./Messages";
import io from "socket.io-client";
import baseurl from "../api/url";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const small = useMediaQuery("(max-width:756px)");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menu = Boolean(anchorEl);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    console.log(baseurl.slice(0, -3));
    const newSocket = io(baseurl.slice(0, -3));
    newSocket.emit("add user", user);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [user, setSocket]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [notification, setNotification] = useState({});
  useEffect(() => {
    if (socket) {
      socket.emit("notification", user.id);
      socket.on("notifications", (data) => setNotification(data));
    }
  }, [socket, setNotification, user]);
  console.log(notification);
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
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={menu ? "long-menu" : undefined}
              aria-expanded={menu ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              style={{ marginRight: "1em" }}
            >
              <Badge
                badgeContent={notification?.results?.length}
                color="primary"
              >
                <img src={notif} alt="notif" />
              </Badge>
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={menu}
              onClose={handleClose}
              PaperProps={{
                style: {
                  width: "20em",
                },
              }}
            >
              {notification.results?.map((obj) => {
                return (
                  <MenuItem
                    onClick={() => {
                      socket.emit("seen", obj.id).then(() => {
                        handleClose();
                        obj.type === "chat"
                          ? navigate("/dashboard/messages", {
                              state: { reciever: obj.from.id },
                            })
                          : navigate("/dashboard");
                      });
                    }}
                    key={obj.id}
                    sx={{ padding: "1em" }}
                  >
                    <Avatar src={obj.from.pfp} sx={{ marginRight: "0.4em" }} />{" "}
                    {obj.type === "chat"
                      ? `${obj.from.username} sent you a message`
                      : `${obj.from.username} granted you a loan`}
                  </MenuItem>
                );
              })}
            </Menu>
            <IconButton
              component={Link}
              to="/dashboard/settings "
              color="inherit"
            >
              {" "}
              <Avatar src={user.pfp} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        onClose={() => toggleDrawer()}
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
              to="/dashboard/"
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
              to="/dashboard/messages"
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
                  <MessageOutlinedIcon />
                </Grid>
                <Grid item xs={7} container>
                  <Typography fontSize={24}>Messages</Typography>
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
              to="/dashboard/loan-board"
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
              to="/dashboard/settings"
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
                  <img src={gear} alt="" />
                </Grid>
                <Grid item xs={7} container>
                  <Typography fontSize={24}>Settings</Typography>
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
          <Route path="loan-board/*" element={<Board socket={socket} />} />
          <Route path="messages" element={<Messaging socket={socket} />} />
          <Route path="settings/*" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Dashboard;
