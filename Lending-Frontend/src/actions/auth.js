import {
  changepassword,
  forgotpassword,
  login,
  signUp,
  resetpassword,
  updatepfp,
  updateprofile,
} from "../api/auth";
import { toast } from "react-toastify";
export const signin = (formdata, router) => async (dispatch) => {
  dispatch({ type: "LOAD" });
  try {
    const res = await login(formdata);
    dispatch({ type: "LOGIN", data: res.data });
    dispatch({ type: "UNLOAD" });
    if (res.data.user.role === "admin") {
      return router("/admin");
    }
    return router("/dashboard");
  } catch (error) {
    if (error.response.data.code === 400) {
      toast.error("Your account has been suspended");
      return dispatch({ type: "UNLOAD" });
    }
    dispatch({ type: "UNLOAD" });
    toast.error("Invalid email or password");
  }
};

export const signup = (formdata) => async (dispatch) => {
  dispatch({ type: "LOAD" });

  try {
    await signUp(formdata);
    dispatch({ type: "UNLOAD" });

    // toast("You have been signed up please wait for verification");
    dispatch({ type: "NEXT" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    toast.error(error?.response?.data?.message);

    return error;
  }
};

export const logout = (router, toggle) => (dispatch) => {
  try {
    dispatch({ type: "LOGOUT" });
    router("/login");
    toggle();
  } catch (error) {
    toast.error("Something went wrong");
    return error;
  }
  dispatch({ type: "UNLOAD" });
};

export const changePassword = (formdata, router) => async (dispatch) => {
  try {
    const { data } = await changepassword(formdata);
    dispatch({ type: "UPDATE PROFILE", data: data });
    toast("Your password has been changed");
    router(-1);
  } catch (error) {
    toast.error("Invalid current pasword");
  }
  dispatch({ type: "UNLOAD" });
};

export const updatePfp = (formdata) => async (dispatch) => {
  try {
    const { data } = await updatepfp(formdata);
    dispatch({ type: "UPDATE PROFILE", data: data });
    toast("Profile picture has been updated");
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const updateProfile = (formdata) => async (dispatch) => {
  try {
    const { data } = await updateprofile(formdata);
    dispatch({ type: "UPDATE PROFILE", data: data });
    toast("Profile has been updated");
  } catch (error) {
    toast.error("Something went wrong");
  }
};

export const forgotPassword = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    await forgotpassword(formdata);
    toast(
      "An Email has been sent to your registered email id for reseting password "
    );
    dispatch({ type: "UNLOAD" });
  } catch (error) {
    dispatch({ type: "UNLOAD" });

    toast.error(error?.response?.data?.message);
    console.log(error);
  }
};

export const resetPassword = (formdata, router) => async (dispatch) => {
  try {
    dispatch({ type: "LOAD" });
    await resetpassword(formdata);
    dispatch({ type: "UNLOAD" });
    toast("Password Reset");
    localStorage.clear();
    router("/login");
  } catch (error) {
    dispatch({ type: "UNLOAD" });
    toast.error("The link has expired please regenerate the link");
    router("/forgot-password");
    localStorage.clear();
    console.log(error);
  }
};
