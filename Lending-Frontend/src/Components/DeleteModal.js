import React from "react";
import warning from "../assets/warning.svg";
import { Grid, Paper, Modal, Button, useMediaQuery } from "@mui/material";
const Delete = ({ open, setOpen, deleteAccounts }) => {
  const small = useMediaQuery("(max-width:756px)");
  const submit = async () => {
    await deleteAccounts();
    setOpen(false);
  };
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
          <img src={warning} alt="" />
        </Grid>
        <Grid
          sx={{ mt: 3 }}
          style={{ textAlign: "center", fontSize: "1.4em", fontWeight: 700 }}
          item
          xs={12}
        >
          Are you sure you want delete selected account?{" "}
        </Grid>
        <Grid item container xs={12} spacing={1}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                setOpen(false);
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
                Cancel
              </p>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submit}
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
                Delete
              </p>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default Delete;
