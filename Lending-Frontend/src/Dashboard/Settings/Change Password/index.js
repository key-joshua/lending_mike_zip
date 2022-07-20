import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { changePassword } from "../../../actions/auth";
const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255,255,255,0.6)",
    height: "3em",
    borderRadius: "10px",
  },
});
const WhiteCssButton = styled(Button)({
  boxShadow: "0px 5px 3px -2px #00000005",
  border: "1px solid #DDDDDD",

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

const ChangePassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    confirm_password: "",
  });
  const small = useMediaQuery("(max-width:756px)");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let error = false;
    if (data.confirm_password !== data.new_password) {
      error = true;
      setErrors((state) => ({ ...state, confirm_password: true }));
    }
    if (!error) {
      dispatch(changePassword(data, navigate));
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (errors[id]) {
      setErrors((error) => ({ ...error, [id]: false }));
    }
    setData((state) => ({ ...state, [id]: value }));
  };
  return (
    <div style={{ paddingRight: small ? "none" : "1.5em" }}>
      <Grid
        component={"form"}
        onSubmit={handleSubmit}
        container
        item
        xs={12}
        spacing={1}
        sx={{
          marginTop: "0.5em",
          backgroundColor: "white",
          border: "1px solid rgba(66, 103, 178,0.3)",
          boxShadow: "0px 1px 6px 0px #7C9AEA",
          borderRadius: "6px",
          padding: "1em",
        }}
      >
        {" "}
        <Grid item xs={12}>
          <Typography fontWeight={700} fontSize={"24px"}>
            Change Password
          </Typography>
        </Grid>
        <div style={{ width: "100%" }}>
          <Grid container item xs={12} sx={{ height: "3em" }}>
            <p style={{ fontWeight: 500 }}>Current Password</p>
          </Grid>

          <CssTextField
            required
            fullWidth
            type="password"
            onChange={handleChange}
            id="current_password"
            autoFocus
          />
        </div>
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
        <Grid
          item
          spacing={1}
          style={{ marginTop: "1em" }}
          container
          justifyContent={"flex-end"}
          xs={12}
        >
          <Grid item>
            <WhiteCssButton
              component={Link}
              to="/dashboard/settings"
              style={{ textTransform: "capitalize", fontSize: "14px" }}
            >
              Cancel
            </WhiteCssButton>
          </Grid>
          <Grid item>
            <CssButton
              type="submit"
              variant="contained"
              style={{
                color: "white",
                textTransform: "none",
                borderRadius: "5px",
              }}
            >
              {"Save Changes"}
            </CssButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChangePassword;
