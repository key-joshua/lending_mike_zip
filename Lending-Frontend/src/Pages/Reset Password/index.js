import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import LoginNav from "../../Components/LoginNav";
import bg from "../../assets/login.svg";
import { resetPassword } from "../../actions/auth";
import { useDispatch } from "react-redux";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255,255,255,0.6)",
    height: "3em",
    borderRadius: "10px",
  },
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
const CssButton = styled(Button)({
  backgroundColor: "#4267b2",
  color: "white",
  borderRadius: "5px",
});

const Login = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    confirm_password: "",
  });

  useEffect(() => {
    localStorage.setItem("token", "Bearer " + id);
  }, [id]);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;
    if (data.confirm_password !== data.new_password) {
      error = true;
      setErrors((state) => ({ ...state, confirm_password: true }));
    }
    if (!error) {
      dispatch(resetPassword(data, navigate));
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (errors[id]) {
      setErrors((error) => ({ ...error, [id]: false }));
    }
    setData((state) => ({ ...state, [id]: value }));
  };

  const small = useMediaQuery("(max-width:756px)");
  return (
    <div
      style={
        small
          ? {}
          : {
              padding: "1em",
              boxSizing: "border-box",
              height: "100vh",
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }
      }
    >
      <LoginNav />

      <Grid item container justifyContent={"center"} alignItems="center">
        <Paper
          className="fade-in-slow"
          sx={{
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
                fontWeight: 500,
                fontSize: "22.6667px",
              }}
            >
              Reset Password
            </p>
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid
              component={"form"}
              onSubmit={handleSubmit}
              container
              item
              xs={12}
              spacing={1}
            >
              {" "}
              <div style={{ width: "100%" }}>
                <Grid container item xs={12} sx={{ height: "3em" }}>
                  <p style={{ fontWeight: 500 }}>New Password</p>
                </Grid>

                <CssTextField
                  // margin="normal"
                  required
                  fullWidth
                  type="password"
                  onChange={handleChange}
                  id="new_password"
                  autoFocus
                />
              </div>
              <div style={{ width: "100%" }}>
                <Grid container item xs={12} sx={{ height: "3em" }}>
                  <p style={{ fontWeight: 500 }}>Confirm Password</p>
                </Grid>

                <CssTextField
                  error={errors.confirm_password}
                  helperText={
                    errors.confirm_password
                      ? "Confirm password must be same as New Password"
                      : ""
                  }
                  required
                  fullWidth
                  type="password"
                  onChange={handleChange}
                  id="confirm_password"
                  autoFocus
                />
              </div>
            </Grid>{" "}
            <Grid container spacing={2} item xs={12}>
              <Grid item xs={6}>
                <WhiteCssButton
                  component={Link}
                  to="/login"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    color: "black",
                    textTransform: "none",
                    fontSize: "1em",
                    borderRadius: "5px",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
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
                  style={{
                    color: "white",
                    fontSize: "1em",
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <p
                    style={{
                      margin: "0",
                    }}
                  >
                    Submit
                  </p>
                </CssButton>
              </Grid>{" "}
            </Grid>{" "}
          </Box>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
