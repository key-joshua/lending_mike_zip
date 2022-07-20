import React from "react";
import { Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const Cards = ({ data, deleteLoan }) => {
  const small = useMediaQuery("(max-width:756px)");
  const { user } = useSelector((state) => state.auth);
  return (
    <Grid
      item
      xs={12}
      alignItems="center"
      style={{
        marginBottom: "1em",
        backgroundColor: "white",
        border: "1px solid rgba(66, 103, 178,0.3)",
        boxShadow: "0px 1px 6px 0px #7C9AEA",
        borderRadius: "6px",
        padding: small ? "1em" : "2em",
      }}
      container
      spacing={1}
    >
      <Grid container alignItems={"center"} item xs={12} md={1}>
        <Grid item xs={2} md={12}>
          <Grid item xs={12}>
            <Typography fontSize={"20px"}>
              {months[new Date(data.date).getMonth() - 1]}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize={"20px"}>
              {new Date(data.date).getDate()}{" "}
            </Typography>
          </Grid>
        </Grid>
        {small ? (
          <Grid item xs={10}>
            <Grid item xs={12}>
              <Typography fontSize={small ? "20px" : "24px"}>
                Loan Request {data.granted_by ? "Granted" : "Published"}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
      <Grid spacing={1} container item xs={12} md={4}>
        {!small && (
          <Grid item xs={12}>
            <Typography fontSize={"24px"}>
              Loan Request {data.granted_by ? "Granted" : "Published"}
            </Typography>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography fontSize={"16px"}>
            {data.granted_by
              ? data.granted_by.id === user.id
                ? `You granted a loan request for ${data.created_by?.username}`
                : `Your request for loan has been granted by @${data.granted_by?.username}`
              : "Your request has been published"}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12} md={5}>
        <Grid item style={small ? {} : { textAlign: "center" }} xs={12}>
          <Typography fontSize={"18px"}>Loan Status</Typography>
        </Grid>
        <Grid item style={small ? {} : { textAlign: "center" }} xs={12}>
          <Typography fontSize={"15px"}>
            {data.granted_by ? "Completed" : "Active"}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={1}>
        <Typography fontSize={"20px"}>${data.amount}</Typography>
      </Grid>
      {deleteLoan && !data.granted_by ? (
        <Grid item xs={12} md={1}>
          <IconButton onClick={deleteLoan}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      ) : (
        <></>
      )}{" "}
    </Grid>
  );
};

export default Cards;
