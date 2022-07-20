import {
  Grid,
  useMediaQuery,
  Paper,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDashboard, getDashboardCounts } from "../../actions/admin";
import Counts from "./Counts";
import { useDispatch, useSelector } from "react-redux";
import { getLoans } from "../../actions/loan";
import Charts from "./Charts";
import Cards from "./Cards";
const Home = () => {
  const dispatch = useDispatch();
  const [counts, setCounts] = useState({ users: 0, granted: 0, loans: 0 });
  const [requestType, setRequestType] = useState("weekly");
  const [grantedType, setGrantedType] = useState("weekly");

  const [granted, setGranted] = useState([]);
  const [requests, setRequests] = useState([]);
  const { loans } = useSelector((state) => state.loans);
  useEffect(() => {
    dispatch(getLoans("limit=6"));
    const getCounts = async () => {
      const loans = await getDashboard(`type=requested&range=${requestType}`);
      const data = await getDashboardCounts();
      setRequests(loans);
      const granted = await getDashboard(`type=granted&range=${grantedType}`);
      setGranted(granted);
      setCounts(data);
    };
    getCounts();
  }, [setCounts, setRequests, requestType, grantedType, setGranted, dispatch]);

  const small = useMediaQuery("(max-width:756px)");
  return (
    <Grid
      item
      xs={12}
      style={{ padding: small ? "0 1em" : "1em 3em" }}
      container
    >
      <Counts counts={counts} />
      <Grid
        style={{ marginTop: "1em" }}
        item
        xs={12}
        container
        spacing={3}
        justifyContent={"space-between"}
      >
        <Grid item xs={12} md={7} spacing={2} container>
          <Grid item xs={12}>
            <Paper style={{ padding: "1em" }}>
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={6}>
                  <Typography>Loan Requests</Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <TextField
                    variant="outlined"
                    style={{ width: "60%" }}
                    select
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="thisweek">7 days</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Charts points={requests} type={"request"} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={{ padding: "1em" }}>
              <Grid
                item
                xs={12}
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={6}>
                  <Typography>Loans Granted</Typography>
                </Grid>
                <Grid item xs={6} container justifyContent="flex-end">
                  <TextField
                    variant="outlined"
                    style={{ width: "60%" }}
                    select
                    value={grantedType}
                    onChange={(e) => setGrantedType(e.target.value)}
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="thisweek">7 days</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </TextField>
                </Grid>
              </Grid>{" "}
              <Charts points={granted} type={"granted"} />
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper
            style={{
              height: "100%",
              width: "100%",
              padding: "1em",
              backgroundColor: "white",
            }}
          >
            <Grid
              item
              spacing={3}
              style={{ height: "100vh", overflowY: "scroll" }}
              container
              xs={12}
            >
              <Grid item xs={12}>
                <Typography fontSize={22}>Recent Activity</Typography>
              </Grid>
              <Grid item container xs={12}>
                {loans.map((obj) => {
                  return <Cards data={obj} key={obj.id} />;
                })}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
