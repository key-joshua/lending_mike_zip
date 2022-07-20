import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255,255,255,0.6)",
    height: "3em",
    borderRadius: "10px",
  },
});

const CssButton = styled(Button)({
  backgroundColor: "#4267b2",
  color: "white",
  borderRadius: "5px",
});

const WhiteCssButton = styled(Button)({
  backgroundColor: "white",
  color: "black",
  borderRadius: "5px",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
  },
});

function PersonalInformation({ data, setData }) {
  const small = useMediaQuery("(max-width:756px)");

  const dispatch = useDispatch();
  const [error, setError] = useState({
    name: false,
    email: false,
    username: false,
    password: false,
  });

  const handleChange = (e) => {
    const { value, id } = e.target;
    if (error[id]) {
      setError((state) => ({ ...state, [id]: false }));
    }
    setData((state) => ({ ...state, [id]: value }));
  };

  const validate = (e) => {
    e.preventDefault();
    let errors = false;
    if (data.name === "") {
      errors = true;
      setError((state) => ({ ...state, name: true }));
    }
    if (data.username === "") {
      errors = true;
      setError((state) => ({ ...state, username: true }));
    }
    if (data.email === "") {
      errors = true;
      setError((state) => ({ ...state, email: true }));
    }
    if (data.password === "") {
      errors = true;
      setError((state) => ({ ...state, password: true }));
    }
    if (!errors) {
      dispatch({ type: "NEXT" });
    }
  };

  return (
    <>
      <Grid item container justifyContent={"center"} alignItems="center">
        <Paper
          className="fade-in-slow"
          sx={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "column",
            padding: "1.5em 2em",
            borderRadius: "1em",
            width: small ? "100vw" : "25vw",
          }}
          elevation={small ? 0 : 6}
          style={{
            backgroundColor: "rgb(250, 250, 250, 0.2)",
            border: "1px solid rgb(250, 250, 250, 0.5)",
            backdropFilter: "blur(2px)",
          }}
        >
          <Typography component="h1" variant="h5">
            <p
              style={{
                fontWeight: "500",
              }}
            >
              Personal Information
            </p>
          </Typography>
          <Box component="form" noValidate onSubmit={validate}>
            <p style={{ fontWeight: "500" }}>Full Name</p>
            <CssTextField
              required
              error={error.name}
              onChange={handleChange}
              value={data.name}
              helperText={error.name ? "Please enter your name" : ""}
              fullWidth
              placeholder="John Doe"
              id="name"
              name="name"
              autoComplete="name"
            />
            <p style={{ fontWeight: "500" }}>User name</p>
            <CssTextField
              error={error.username}
              required
              value={data.username}
              onChange={(e) => e.target.value.length <= 9 && handleChange(e)}
              helperText={error.username ? "Please enter your username" : ""}
              fullWidth
              placeholder="Username"
              id="username"
              name="username"
              autoComplete="username"
            />
            <p style={{ fontWeight: "500" }}>Email address</p>
            <CssTextField
              error={error.email}
              required
              value={data.email}
              onChange={handleChange}
              helperText={error.email ? "Please enter your valid email" : ""}
              fullWidth
              placeholder="name@placeholder.com"
              id="email"
              name="email"
              autoComplete="email"
            />
            <p style={{ fontWeight: "500" }}>Password</p>
            <CssTextField
              error={error.password}
              required
              value={data.password}
              fullWidth
              name="password"
              onChange={handleChange}
              placeholder="Placeholder"
              helperText={error.password ? "Please enter a password" : ""}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid container spacing={2} item xs={12}>
              <Grid item xs={6}>
                <WhiteCssButton
                  component={Link}
                  to="/"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  backgroundColor="white"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "black",
                    textTransform: "none",
                    fontSize: "1em",
                    borderRadius: "5px",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Cancel
                  </p>
                </WhiteCssButton>
              </Grid>
              <Grid container item justifyItems="flex-end" xs={6}>
                <CssButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={validate}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    color: "white",
                    fontSize: "1em",
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Continue
                  </p>
                </CssButton>
              </Grid>{" "}
              <Grid container>
                <Grid item>
                  Already a member?{" "}
                  <Link
                    to="/login"
                    variant="body2"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      textDecoration: "none",
                      color: "#3F51B5",
                      fontWeight: 700,
                    }}
                  >
                    {"Login Now"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>{" "}
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default PersonalInformation;
