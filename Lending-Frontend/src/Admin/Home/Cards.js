import { Grid, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
const Cards = ({ data }) => {
  return (
    <Grid
      item
      container
      xs={12}
      style={{
        marginBottom: "1em",
        backgroundColor: "white",
        border: "1px solid rgba(66, 103, 178,0.3)",
        boxShadow: "0px 1px 6px 0px #7C9AEA",
        borderRadius: "6px",
        padding: "1em",
      }}
    >
      <Grid item xs={12}>
        <Typography>
          {data.granted_by
            ? `${data.granted_by?.username} granted a loan requested by ${data.created_by?.username}`
            : `User ${data.created_by?.username} requested for a loan`}
        </Typography>
        <Grid container style={{ marginTop: "0.3em" }} spacing={1} item xs={12}>
          <Grid item container xs={4}>
            <Grid item xs={12}>
              <Typography fontSize={14} textAlign="center">
                Payback Date
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={14} textAlign="center">
                {moment(data.date).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={4}>
            <Grid item xs={12}>
              <Typography fontSize={14} textAlign="center">
                Collateral
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={14} textAlign="center">
                {data.collateral}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={4}>
            <Grid item xs={12}>
              <Typography fontSize={14} textAlign="center">
                Amount
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={14} textAlign="center">
                ${data.amount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cards;
