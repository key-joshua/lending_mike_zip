import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
const LoginNav = () => {
  const small = useMediaQuery("(max-width:756px)");
  return (
    <Grid
      container
      sx={{ padding: small ? "1em" : "1em 3em" }}
      item
      xs={12}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Grid item xs={6}>
        <img
          src="/logo.svg"
          style={{
            width: small ? "30vw" : "10vw",
            filter: "grayscale(1) invert(1)",
          }}
          alt="logo"
        />
      </Grid>
    </Grid>
  );
};

export default LoginNav;
