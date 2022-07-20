import React, { useEffect } from "react";
import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { getLoans } from "../../../actions/loan";
const CssButton = styled(Button)({
  backgroundColor: "#4267b2",
  color: "white",
  borderRadius: "5px",
});

const Request = () => {
  const dispatch = useDispatch();

  const { loans } = useSelector((state) => state.loans);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: "RESET_LOANS" });
    dispatch(getLoans(`id=${user.id}&granted=false`));
  }, [dispatch, user]);
  console.log(loans);
  const small = useMediaQuery("(max-width:756px)");
  return (
    <Grid item container xs={12}>
      <Grid
        container
        item
        xs={12}
        style={{ padding: small ? "0 1em" : "0 3em" }}
        alignItems="center"
      >
        <Grid item container xs={6}>
          <Typography fontSize={"35px"} fontWeight={400}>
            Loan Board
          </Typography>
        </Grid>
        <Grid container item justifyContent="flex-end" xs={6}>
          <CssButton
            component={Link}
            to="/dashboard/loan-board/request"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
              {"Request a Loan"}
            </p>
          </CssButton>
        </Grid>{" "}
      </Grid>

      <Grid
        container
        item
        xs={12}
        style={{ padding: small ? "none" : "2.5em" }}
      >
        {loans.length > 0 ? (
          loans.map((obj) => {
            return <Cards key={obj.id} data={obj} />;
          })
        ) : (
          <Typography fontSize={"20px"} fontWeight={400}>
            No Loan Requests
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Request;
