import React, { useState } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Fab,
  MenuItem,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Terms from "../../../Components/TermsModal";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Success from "../../../Components/SuccessModal";
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
    height: "3em",
    borderRadius: "10px",
  },
});

const Request = () => {
  const [terms, setTerms] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    description: "",
    date: "",
    amount: "",
    collateral: "",
  });
  const [errors, setErrors] = useState({
    description: false,
    date: false,
    amount: false,
    collateral: false,
  });

  const validate = async (e) => {
    let error = false;
    e.preventDefault();
    if (data.description === "") {
      setErrors((state) => ({ ...state, description: true }));
      error = true;
    }
    if (data.description === "") {
      setErrors((state) => ({ ...state, description: true }));
      error = true;
    }
    if (data.amount === "" || isNaN(data.amount)) {
      setErrors((state) => ({ ...state, amount: true }));
      error = true;
    }
    if (data.collateral === "") {
      setErrors((state) => ({ ...state, collateral: true }));
      error = true;
    }
    if (data.collateral === "Room/rent on Airbnb" && data.airbnb_url === "") {
      setErrors((state) => ({ ...state, airbnb_url: true }));
      error = true;
    }
    if (!error) {
      setTerms(true);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((state) => ({ ...state, [id]: value }));
  };

  return (
    <>
      <Success open={success} setOpen={setSuccess} />
      <Terms
        open={terms}
        setOpen={setTerms}
        data={data}
        setSuccess={setSuccess}
      />
      <Grid
        container
        component="form"
        onSubmit={validate}
        item
        xs={11}
        justifyContent={"flex-start"}
        style={{
          marginBottom: "1em",
          backgroundColor: "white",
          border: "1px solid rgba(66, 103, 178,0.3)",
          boxShadow: "0px 1px 6px 0px #7C9AEA",
          borderRadius: "6px",
          padding: "1em",
        }}
      >
        <Typography component="h1" variant="h5">
          <p
            style={{
              fontWeight: 800,
              fontSize: "25px",
            }}
          >
            Loan Request
          </p>
        </Typography>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            <p style={{ fontWeight: 500 }}>Loan Description</p>
          </Typography>

          <CssTextField
            required
            value={data.description}
            placeholder="Description"
            fullWidth
            id="description"
            error={errors.description}
            helperText={errors.description ? "Please enter description" : ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            <p style={{ fontWeight: 500 }}>Payback Amount</p>
          </Typography>
          <CssTextField
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            value={data.amount}
            placeholder="100"
            id="amount"
            error={errors.amount}
            helperText={errors.amount ? "Please enter amount" : ""}
            onChange={(e) => {
              if (!isNaN(e.target.value)) handleChange(e);
            }}
            name="Amount"
            autoComplete="Amount"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            <p style={{ fontWeight: 500 }}>Payback Date</p>
          </Typography>
          <CssTextField
            fullWidth
            value={data.date}
            required
            error={errors.date}
            helperText={errors.date ? "Please enter date" : ""}
            type="date"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
            id="date"
            onChange={handleChange}
          />
        </Grid>
        <Typography component="h1" variant="h5">
          <p style={{ fontWeight: 500 }}>Collateral</p>
        </Typography>
        <CssTextField
          select
          error={errors.collateral}
          helperText={errors.collateral ? "Please select collateral" : ""}
          fullWidth
          value={data.collateral}
          onChange={(e) =>
            handleChange({
              target: { id: "collateral", value: e.target.value },
            })
          }
          id="collateral"
          placeholder="Collateral"
          sx={{
            width: "100%",
            borderRadius: "2px",
            backgroundColor: "rgb(250, 250, 250, 0.5)",
          }}
        >
          {["Room/rent on Airbnb", "Vehicle Rentage"].map((value, index) => {
            return (
              <MenuItem value={value} key={index}>
                {value}
              </MenuItem>
            );
          })}
        </CssTextField>
        {data.collateral === "Room/rent on Airbnb" ? (
          <>
            <Typography component="h1" variant="h5">
              <p style={{ fontWeight: 500 }}>Airbnb room Url</p>
            </Typography>
            <CssTextField
              error={errors.airbnb_url}
              helperText={errors.airbnb_url ? "Please enter airbnb room url for your collateral" : ""}
              fullWidth
              value={data.airbnb_url || ""}
              onChange={(e) =>
                handleChange({
                  target: { id: "airbnb_url", value: e.target.value },
                })
              }
            />
          </>
        ) : (
          <></>
        )}
        <Grid
          item
          spacing={1}
          sx={{ mt: 2 }}
          container
          justifyContent={"flex-end"}
          xs={12}
        >
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
            >
              {"Publish Request"}
            </CssButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Request;
