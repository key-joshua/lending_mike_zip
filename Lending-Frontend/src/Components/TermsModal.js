import React, { useState } from "react";
import {
  Paper,
  Grid,
  Button,
  useMediaQuery,
  TextField,
  Modal,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { createLoans } from "../actions/loan";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
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

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: "10px",
  },
});
function Terms({ open, setOpen, data, setSuccess }) {
  const dispatch = useDispatch();
  const [checked, setCheck] = useState(false);
  const small = useMediaQuery("(max-width:756px)");
  const submit = async () => {
    if (checked) {
      dispatch({ type: "LOAD" });
      dispatch(
        createLoans(
          {
            description: data.description,
            date: data.date,
            amount: data.amount,
            collateral: data.collateral,
            ...(data.collateral === "Room/rent on Airbnb"
              ? { airbnb_url: data.airbnb_url }
              : {}),
          },
          () => {
            setOpen(false);
            setSuccess(true);
          }
        )
      );
    } else {
      toast.error("Please check the checkbox");
    }
  };
  return (
    <Modal
      sx={{ zIndex: 2 }}
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
          height: small ? "80vh" : "80vh",
          width: small ? "100vw" : "30vw",
          overflowY: "scroll",
        }}
        elevation={small ? 0 : 6}
      >
        <Typography
          fontWeight={700}
          style={{ marginBottom: "1em" }}
          fontSize={"16px"}
        >
          {" "}
          Loan Request Contract{" "}
        </Typography>
        <Typography fontSize={"14px"}>
          I, The Borrower, agree that the property will remain in the lender’s
          possession for the time it takes to pay the repayment loan amount. I
          agree that the property is in my possession and I possess the rights
          to the property. I, as The Borrower, also agree to give the rights to
          my property listing, to The Intermediary, who is Lendr Ventures LLC
          and will act in fair judgement, and according to this contract.
          Moreover, The Lender will own the rights to the property should The
          Borrower be unable to pay back in FULL. In case the loan is partially
          repaid, The Lender owns the rights to the listing and can exercise the
          option to post the listing for the time required to pay the remaining
          repayment loan amount. If I, The Borrower, pay back the loan in the
          full repayment amount, this agreement will cease, as the transaction
          will be marked completed.
        </Typography>
        <p style={{ fontWeight: 700 }}>Full Name</p>
        <CssTextField fullWidth placeholder="Full Name" />
        <FormControlLabel
          checked={checked}
          onChange={() => setCheck(!checked)}
          style={{ marginTop: "1em" }}
          label={
            <Typography color="#727987" fontSize={"14px"}>
              I, Full name, understand that this contract is legally binding and
              a breach of this contact will warrant neccesary repercussions.
            </Typography>
          }
          control={<Checkbox sx={{ color: "#DDDDDD", borderRadius: "1px" }} />}
        />
        <Grid
          item
          xs={12}
          justifyContent="flex-end"
          spacing={1}
          style={{ marginTop: "0.5em" }}
          container
        >
          <Grid item>
            <WhiteCssButton
              style={{ textTransform: "capitalize", fontSize: "14px" }}
              onClick={() => setOpen(!open)}
            >
              Cancel
            </WhiteCssButton>
          </Grid>
          <Grid item>
            <CssButton
              onClick={submit}
              variant="contained"
              style={{
                color: "white",
                textTransform: "none",
                borderRadius: "5px",
              }}
            >
              {"Confirm Request"}
            </CssButton>
          </Grid>{" "}
        </Grid>
      </Paper>
    </Modal>
  );
}

export default Terms;
