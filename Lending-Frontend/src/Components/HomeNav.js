import React from "react";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
const HomeNav = () => {
  const small = useMediaQuery("(max-width:756px)");
  return (
    <Grid
      container
      sx={{ padding: small ? "1em" : "2em 3em" }}
      item
      xs={12}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Grid item xs={3} md={6}>
        <img
          src="/logo.jpg"
          style={{
            width: small ? "30vw" : "10vw",
          }}
          alt="logo"
        />
      </Grid>
      <Grid
        container
        justifyContent="flex-end"
        alignItems={"center"}
        item
        xs={6}
        md={4}
        spacing={4}
      >
        <Grid item xs={5} container justifyContent={"flex-end"} md={6}>
          <Typography
            variant="body"
            fontSize={small ? "1em" : "1.2em"}
            fontWeight={700}
          >
            About us
          </Typography>
        </Grid>
        <Grid item xs={7} md={6}>
          <Button
            size={small ? "" : "large"}
            as={Link}
            to="/login"
            sx={{
              backgroundColor: "#4267B2",
              borderRadius: "4px",
              color: "white",
              padding: "0.7em 1.3em",
              fontSize: small ? "" : "1.2em",
              width: "100%",
              textTransform: "none",
              textDecoration: "none",
            }}
            variant="contained"
          >
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomeNav;
