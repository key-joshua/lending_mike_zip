import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import LoginNav from "../../Components/LoginNav";
import login from "../../assets/login.svg";
import SignUpForm from ".";

function Signup() {
  const small = useMediaQuery("(max-width:756px)");
  return (
    <div
      style={
        small
          ? {}
          : {
              padding: "1em",
              boxSizing: "border-box",
              backgroundImage: `url(${login})`,
              backgroundSize: "cover",
              minHeight: "100vh",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }
      }
    >
      <Grid container>
        <LoginNav />
        <SignUpForm />
      </Grid>
    </div>
  );
}

export default Signup;
