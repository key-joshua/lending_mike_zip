import React from "react";
import success from "../assets/success.svg";
import { Grid, Paper, Modal, Button, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";
const Success = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const small = useMediaQuery("(max-width:756px)");
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        className="fade-in-slow"
        sx={{
          position: "absolute",
          top: small ? "50%" : "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5em 2em",
          borderRadius: "1em",
          textAlign: "center",
          width: small ? "100vw" : "30vw",
        }}
        elevation={small ? 0 : 6}
      >
        {" "}
        <Grid item container justifyContent="center" xs={12}>
          <img src={success} alt="" />
        </Grid>
        <Grid
          sx={{ mt: 3 }}
          style={{ textAlign: "center", fontSize: "1.4em", fontWeight: 700 }}
          item
          xs={12}
        >
          Loan request has been published{" "}
        </Grid>
        <Grid item xs={12} style={{ color: "#727987", fontSize: "14px" }}>
          Your loan request is online, you will be contacted by who wants to
          grant your loan request.
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setOpen(false);
              navigate("/dashboard/");
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
    </Modal>
  );
};

export default Success;
