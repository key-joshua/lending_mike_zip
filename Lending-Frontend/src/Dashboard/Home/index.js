import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteLoan, getLoans } from "../../actions/loan";
import { Grid, Typography } from "@mui/material";
import Cards from "./Cards";
import DeleteLoan from "../../Components/DeleteLoan";
const Home = () => {
  const dispatch = useDispatch();
  const [deleteId, setDelete] = useState("");
  const { loans, granted } = useSelector((state) => state.loans);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch({ type: "RESET_LOANS" });
    dispatch(getLoans(`createdBy=${user.id}`));
    dispatch(getLoans(`grantedBy=${user.id}`, true));
  }, [dispatch, user]);

  const deleteloan = () => {
    dispatch(deleteLoan(deleteId, `createdBy=${user.id}`));
  };

  return (
    <>
      <DeleteLoan open={open} setOpen={setOpen} deleteLoan={deleteloan} />
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Typography fontSize={"24px"} fontWeight={600}>
            Recent Activity
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography fontSize={"22px"} fontWeight={400}>
            Loans Requested
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ padding: "2em" }}>
          {loans.length > 0 ? (
            loans
              .sort((a, b) =>
                new Date(a.updatedAt).getTime() >
                new Date(b.updatedAt).getTime()
                  ? 1
                  : -1
              )
              .map((obj) => {
                return (
                  <Cards
                    key={obj.id}
                    data={obj}
                    deleteLoan={() => {
                      setDelete(obj.id);
                      setOpen(true);
                    }}
                  />
                );
              })
          ) : (
            <Typography fontSize={"20px"} fontWeight={400}>
              No Loans Requested
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={"22px"} fontWeight={400}>
            Loans Granted
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ padding: "2em" }}>
          {granted?.length > 0 ? (
            granted
              ?.sort((a, b) =>
                new Date(a.updatedAt).getTime() >
                new Date(b.updatedAt).getTime()
                  ? 1
                  : -1
              )
              ?.map((obj) => {
                return <Cards key={obj.id} data={obj} />;
              })
          ) : (
            <Typography fontSize={"20px"} fontWeight={400}>
              No Loans Granted
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
