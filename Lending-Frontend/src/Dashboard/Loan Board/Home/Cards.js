import React from "react";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const CssButton = styled(Button)({
  backgroundColor: "#4267b2",
  color: "white",
  borderRadius: "5px",
});

const Cards = ({ data }) => {
  const navigate = useNavigate();
  const small = useMediaQuery("(max-width:756px)");
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
      <Grid item container spacing={1} xs={12} md={5}>
        <Grid
          item
          container
          alignItems={"center"}
          justifyContent={small ? "flex-start" : "flex-end"}
          xs={2}
        >
          <Typography fontWeight={400} fontSize={"20px"}>
            ${data.amount}
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={1} md={10}>
          <Grid item xs={6} container justifyContent={"flex-end"}>
            <CssButton
              type="submit"
              onClick={() => {
                navigate("/dashboard/messages", {
                  state: { reciever: data.created_by.id },
                });
              }}
              variant="contained"
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
                {"Message"}
              </p>
            </CssButton>{" "}
          </Grid>
          <Grid item xs={6}>
            <CssButton
              component={Link}
              to={`/dashboard/loan-board/${data.id}`}
              variant="contained"
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
                {"Grant a Loan"}
              </p>
            </CssButton>{" "}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cards;
