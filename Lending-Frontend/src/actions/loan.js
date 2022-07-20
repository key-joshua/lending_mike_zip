import {
  createloan,
  deleteloan,
  getloanbyId,
  getloans,
  grantloan,
} from "../api/loan";
import { toast } from "react-toastify";
export const getLoans = (query, loan) => async (dispatch) => {
  try {
    const { data } = await getloans(query);
    dispatch({ type: "GET LOANS", data, loan });
  } catch (error) {
    return error;
  }
};

export const createLoans = (formdata, success) => async (dispatch) => {
  try {
    await createloan(formdata);
    dispatch({ type: "UNLOAD" });
    success();
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    return error;
  }
};

export const getLoanById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    const { data } = await getloanbyId(id);
    dispatch({ type: "SINGLE LOAN", data: data });
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });

    console.log(error);
  }
};

export const grantLoan = (loan, state) => async (dispatch) => {
  try {
    await grantloan(loan.id);
    state();
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    toast.error("Something went wrong");
  }
};

export const deleteLoan = (id, query) => async (dispatch) => {
  try {
    dispatch({ type: "LOAN" });
    await deleteloan(id);
    dispatch(getLoans(query));
    toast.success("Loan Deleted");

    dispatch({ type: "UNLOAD" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
  }
};
