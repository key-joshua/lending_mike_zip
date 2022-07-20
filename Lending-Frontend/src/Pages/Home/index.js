import React from "react";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import HomeNav from "../../Components/HomeNav";
import home from "../../assets/homepage.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const small = useMediaQuery("(max-width:756px)");
  return (
    <div>
      <HomeNav />
      <Grid
        container
        direction={small ? "column-reverse" : ""}
        item
        style={{ padding: small ? "1em" : "3em", boxSizing: "border-box" }}
        xs={12}
      >
        <Grid
          sx={{ padding: small ? "none" : "4.65em" }}
          spacing={small ? 1 : 3}
          item
          xs={12}
          md={6}
          container
          alignItems="center"
        >
          <Grid container spacing={3} item xs={12}>
            <Grid item xs={12}>
              <Typography variant="h3" fontWeight={800}>
                Be of help to others by lending them some money
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body" fontWeight={600} fontSize={"1.2em"}>
                Cras ultricies ligula sed magna dictum porta. Cras ultricies
                ligula sed magna dictum porta. Vivamus suscipit tortor eget
                felis porttitor volutpat. Donec sollicitudin molestie malesuada
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
        <Grid sx={{ height: "80vh" }} item xs={12} md={6}>
          <img style={{ height: "100%", width: "100%" }} src={home} alt="" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
