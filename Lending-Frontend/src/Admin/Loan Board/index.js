import { Grid, Typography, Button, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";
import { getLoans } from "../../actions/loan";
import Requested from "./Requested";
import Granted from "./Granted";
const CssButton = styled(Button)({
  backgroundColor: "#4267b2",
  color: "white",
  borderRadius: "5px",
  height: "2.5em",
});

const Loans = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();

  const { loans } = useSelector((state) => state.loans);
  const small = useMediaQuery("(max-width:756px)");
  useEffect(() => {
    dispatch({ type: "RESET_LOANS" });
    dispatch(
      getLoans(
        search.get("type") === "requested" ? "granted=false" : "granted=true"
      )
    );
  }, [dispatch, search]);
  const onClick = () => {
    if (search.get("type") === "requested") {
      setSearch({ type: "granted" });
    } else {
      setSearch({ type: "requested" });
    }
  };

  return (
    <Grid
      xs={12}
      container
      item
      style={{ padding: small ? "0 1em" : "0 3em 0 3em" }}
    >
      <Grid item container xs={12} justifyContent={"space-between"}>
        <Grid item xs={6}>
          <Typography fontSize={"35px"} fontWeight={400}>
            Loan Request
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          container
          alignItems="center"
          justifyContent="flex-end"
        >
          <CssButton
            variant="contained"
            onClick={onClick}
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
              {search.get("type") === "View Loans Requests"
                ? ""
                : "View Loans Granted"}
            </p>
          </CssButton>{" "}
        </Grid>
      </Grid>
      <Grid style={{ marginTop: "1em" }} item container xs={12}>
        {search.get("type") === "requested"
          ? loans.map((obj, index) => {
              return <Requested data={obj} key={index} />;
            })
          : loans.map((obj, index) => {
              return <Granted data={obj} key={index} />;
            })}
      </Grid>
    </Grid>
  );
};

export default Loans;
