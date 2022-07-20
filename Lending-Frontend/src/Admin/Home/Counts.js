import React from "react";
import user from "../../assets/user.svg";
import granted from "../../assets/granted.svg";
import loan from "../../assets/loan.svg";
import { Grid, Paper, Typography, useMediaQuery } from "@mui/material";
const Counts = ({ counts }) => {
  const small = useMediaQuery("(max-width:756px)");
  return (
    <Grid item container xs={12} spacing={3}>
      <Grid item xs={6} md={4}>
        <Paper
          style={{ backgroundColor: "white", height: "25vh", padding: "1em" }}
        >
          <Grid item container xs={12} alignItems="center">
            <Grid item>
              <img
                style={{ width: "2em", height: small ? "1em" : "2em" }}
                src={user}
                alt=""
              />
            </Grid>
            <Grid item>
              <Typography fontSize={small ? "0.9em" : "1.8em"}>
                Total Users
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign={"center"} fontSize={"3.5em"}>
              {counts.users}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper
          style={{ backgroundColor: "white", height: "25vh", padding: "1em" }}
        >
          <Grid item container xs={12} alignItems="center">
            <Grid item>
              <img
                style={{ width: "2em", height: small ? "1em" : "2em" }}
                src={loan}
                alt=""
              />
            </Grid>
            <Grid item>
              <Typography fontSize={small ? "0.9em" : "1.8em"}>
                Loan Requests
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign={"center"} fontSize={"3.5em"}>
              {counts.loans}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper
          style={{ backgroundColor: "white", height: "25vh", padding: "1em" }}
        >
          <Grid item container xs={12} alignItems="center">
            <Grid item>
              <img
                style={{ width: "2em", height: small ? "1em" : "2em" }}
                src={granted}
                alt=""
              />
            </Grid>
            <Grid item>
              <Typography fontSize={small ? "0.9em" : "1.8em"}>
                Loans Granted
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign={"center"} fontSize={"3.5em"}>
              {counts.granted}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Counts;
