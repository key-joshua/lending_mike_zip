import { Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getLoanById, grantLoan } from "../../../actions/loan";
import Granted from "../../../Components/GrantedModal";
import moment from "moment";
import { Link } from "react-router-dom";
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
const Single = ({ socket }) => {
  const [success, setSuccess] = useState(false);
  const { loan } = useSelector((state) => state.loans);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoanById(id));
  }, [id, dispatch]);
  const grant = async () => {
    dispatch({ type: "LOAD" });
    dispatch(grantLoan({ ...loan, user: user.id }, () => setSuccess(true)));
  };
  return (
    <>
      <Granted open={success} setOpen={setSuccess} />
      <Grid
        container
        item
        xs={12}
        spacing={2}
        sx={{
          marginBottom: "1em",
          backgroundColor: "white",
          border: "1px solid rgba(66, 103, 178,0.3)",
          boxShadow: "0px 1px 6px 0px #7C9AEA",
          borderRadius: "6px",
          padding: "1em",
        }}
      >
        <Grid item xs={12}>
          <Typography fontWeight={700} fontSize={"28px"}>
            Grant a Loan
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography style={{ fontSize: "20px" }}>
              Loan Description
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent={"flex-end"}>
            <Typography style={{ fontSize: "20px" }}>
              {loan.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography style={{ fontSize: "20px" }}>Loan Amount</Typography>
          </Grid>
          <Grid item xs={6} container justifyContent={"flex-end"}>
            <Typography style={{ fontSize: "20px" }}>${loan.amount}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography style={{ fontSize: "20px" }}>Payback Date</Typography>
          </Grid>
          <Grid item xs={6} container justifyContent={"flex-end"}>
            <Typography style={{ fontSize: "20px" }}>
              {moment(loan.date).format("DD/MM/YYYY")}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography style={{ fontSize: "20px" }}>Collateral</Typography>
          </Grid>
          <Grid item xs={6} container justifyContent={"flex-end"}>
            <Typography style={{ fontSize: "20px" }}>
              {loan.collateral}
            </Typography>
          </Grid>
        </Grid>
        {loan.airbnb_url && (
          <Grid
            item
            container
            xs={12}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography style={{ fontSize: "20px" }}>Airbnb Room</Typography>
            </Grid>
            <Grid item xs={6} container justifyContent={"flex-end"}>
              <a
                style={{ fontSize: "20px" }}
                href={loan.airbnb_url}
                target="__blank"
                rel="no-referrer"
              >
                Room
              </a>
            </Grid>
          </Grid>
        )}{" "}
        <Grid item spacing={1} container justifyContent={"flex-end"} xs={12}>
          <Grid item>
            <WhiteCssButton
              component={Link}
              to="/dashboard/loan-board"
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
              onClick={grant}
            >
              Grant Loan
            </CssButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Single;
