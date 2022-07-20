import React from "react";
import { Paper, Grid, Button, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import success from "../../assets/success.svg";
import { useDispatch } from "react-redux";
function Success() {
  const dispatch = useDispatch();
  const small = useMediaQuery("(max-width:756px)");
  return (
    <Grid item container justifyContent={"center"} alignItems="center">
      <Paper
        className="fade-in-slow"
        sx={{
          marginTop: "1em",
          display: "flex",
          flexDirection: "column",
          padding: "1.5em 2em",
          borderRadius: "1em",
          width: small ? "100vw" : "25vw",
        }}
        elevation={small ? 0 : 6}
        style={{
          backgroundColor: "rgb(250, 250, 250, 0.2)",
          border: "1px solid rgb(250, 250, 250, 0.5)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Grid item container justifyContent="center" xs={12}>
          <img src={success} alt="" />
        </Grid>
        <Grid
          sx={{ mt: 3 }}
          style={{ textAlign: "center", fontSize: "1.4em", fontWeight: 700 }}
          item
          xs={12}
        >
          Registration Complete
        </Grid>
        <Grid item xs={12}>
          <Button
            component={Link}
            to="/login"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              dispatch({ type: "RESET" });
            }}
            style={{
              fontFamily: "Montserrat, sans-serif",
              backgroundColor: "#4267b2",
              fontSize: "1em",
              borderRadius: "5px",
              textTransform: "none",
            }}
          >
            <p
              style={{
                margin: "0",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Got It
            </p>
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Success;
