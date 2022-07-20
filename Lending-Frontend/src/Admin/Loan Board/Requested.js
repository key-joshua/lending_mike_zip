import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import moment from "moment";

const Cards = ({ data }) => {
  const small = useMediaQuery("(max-width:756px)");
  return (
    <Grid
      item
      xs={11}
      alignItems="center"
      style={{
        marginBottom: "1em",
        backgroundColor: "white",
        border: "1px solid rgba(66, 103, 178,0.3)",
        boxShadow: "0px 1px 6px 0px #7C9AEA",
        padding: "1em",
        borderRadius: "6px",
      }}
      container
    >
      <Grid item xs={12} md={7} container>
        <Grid item xs={12}>
          <Typography fontWeight={400} fontSize={"20px"}>
            {" "}
            {data.description}
          </Typography>
        </Grid>
        <Grid item spacing={small ? 1 : 3} container xs={12}>
          <Grid item>
            <Typography fontWeight={400} fontSize={"15px"}>
              Payback date: {moment(data.date).format("DD MMMM,yyyy")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontWeight={400} fontSize={"15px"}>
              Collateral: {data.collateral}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container spacing={1} justifyContent="center" xs={12} md={5}>
        <Typography fontWeight={400} fontSize={"20px"}>
          ${data.amount}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Cards;
