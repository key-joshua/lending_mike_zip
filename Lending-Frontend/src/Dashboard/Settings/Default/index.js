import React, { useState } from "react";
import {
  Avatar,
  Input,
  Grid,
  Typography,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updatePfp, updateProfile } from "../../../actions/auth";
import { toast } from "react-toastify";
const EditTextField = styled(Input)({
  "& .MuiInput-input.Mui-disabled": {
    backgroundColor: "#EDEDED",
    color: "black",
    padding: 0,
  },
  "& .MuiInput-input": {
    backgroundColor: "white",
    paddingLeft: "10px",
    height: "2em",
    borderRadius: "10px",
  },
});

const EditButton = styled(Button)({
  backgroundColor: "#E7EFFF",
  color: "black",
  textTransform: "none",
  borderRadius: "5px",
  height: "38px",
  border: "1px solid #DDDDDD",
  boxShadow: " 0px 5px 3px -2px #00000005",
});

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
const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState({ ...user });
  const [edit, setEdit] = useState({ username: false, email: false });
  const [update, setUpdate] = useState({});
  const handleEdit = (id, bool) => {
    setEdit((state) => ({ ...state, [id]: bool }));
    if (bool) {
      setUpdate((state) => ({ ...state, [id]: data[id] }));
    } else {
      setUpdate((state) => {
        delete state[id];
      });
      setData((state) => ({ ...state, [id]: user[id] }));
    }
  };

  const small = useMediaQuery("(max-width:756px)");

  const handlePfp = (e) => {
    const { files } = e.target;
    const data = new FormData();
    data.append("pfp", files[0]);
    dispatch(updatePfp(data));
    return (e.target.value = "");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUpdate((state) => ({ ...state, [id]: value }));
  };

  const handleSubmit = () => {
    let error = false;
    if ("username" in update && update.username === "") {
      error = true;
      toast.error("Username cannot be empty");
    }
    if ("email" in update && update.email === "") {
      error = true;
      toast.error("Email cannot be empty");
    }
    if (!error) {
      dispatch(updateProfile(update));
    }
  };

  return (
    <div style={{ paddingRight: small ? "none" : "1.5em" }}>
      <Grid
        container
        item
        xs={12}
        spacing={1}
        sx={{
          marginTop: "0.5 em",
          backgroundColor: "white",
          border: "1px solid rgba(66, 103, 178,0.3)",
          boxShadow: "0px 1px 6px 0px #7C9AEA",
          borderRadius: "6px",
          padding: "1em",
        }}
      >
        <Grid item xs={12}>
          <Typography fontWeight={700} fontSize={"24px"}>
            Settings
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={1} alignItems="center">
          <Grid item>
            <label htmlFor="id_proof">
              <EditTextField
                style={{ display: "none" }}
                id="id_proof"
                onChange={handlePfp}
                name="upload-photo"
                type="file"
              />
              <IconButton
                size="small"
                // sx={{
                //   borderRadius: "50%",
                //   boxShadow: "none",
                //   height: 94,
                //   width: 94,
                // }}
                component="span"
                aria-label="add"
                variant="extended"
              >
                <Avatar src={user.pfp} sx={{ height: 94, width: 94 }} />
              </IconButton>
              <br />
            </label>
          </Grid>
          <Grid item>
            <Typography fontSize={"20px"}>{data.username}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{
            backgroundColor: "#EDEDED",
            marginTop: "1em",
            padding: "1em",
            borderRadius: "10px",
          }}
        >
          <Grid item container xs={12} alignItems="center">
            <Grid container spacing={1} item xs={6}>
              <Grid item xs={12}>
                <Typography>USERNAME</Typography>
              </Grid>
              <Grid item xs={12}>
                <EditTextField
                  id="username"
                  onChange={handleChange}
                  disableUnderline={true}
                  style={{ padding: 0, border: "none" }}
                  fullWidth
                  value={edit.username ? update.username : data.username}
                  disabled={!edit.username}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} container justifyContent={"flex-end"}>
              <EditButton
                onClick={() => handleEdit("username", !edit.username)}
                style={{ padding: "12px 16px" }}
              >
                {edit.username ? "Cancel" : "Edit"}
              </EditButton>
            </Grid>
          </Grid>
          <Grid
            item
            container
            style={{ marginTop: "1em" }}
            xs={12}
            alignItems="center"
          >
            <Grid container spacing={1} item xs={6}>
              <Grid item xs={12}>
                <Typography>EMAIL</Typography>
              </Grid>
              <Grid item xs={12}>
                <EditTextField
                  id="email"
                  onChange={handleChange}
                  disableUnderline={true}
                  style={{ padding: 0, border: "none" }}
                  fullWidth
                  value={!edit.email ? data.email : update.email}
                  disabled={!edit.email}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} container justifyContent={"flex-end"}>
              <EditButton
                onClick={() => handleEdit("email", !edit.email)}
                style={{ padding: "12px 16px" }}
              >
                {edit.email ? "Cancel" : "Edit"}
              </EditButton>
            </Grid>
          </Grid>
          <Grid
            item
            container
            style={{ marginTop: "1em" }}
            xs={12}
            alignItems="center"
          >
            <Grid container spacing={1} item xs={6}>
              <Grid item xs={12}>
                <Typography>PASSWORD</Typography>
              </Grid>
              <Grid item xs={12}>
                <EditTextField
                  disableUnderline={true}
                  fullWidth
                  type="password"
                  value={data.password}
                  disabled={true}
                />
              </Grid>
            </Grid>
            <Grid item xs={6} container justifyContent={"flex-end"}>
              <EditButton
                component={Link}
                to="/dashboard/settings/change-password"
              >
                Change Password
              </EditButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          spacing={1}
          style={{ marginTop: "1em" }}
          container
          justifyContent={"flex-end"}
          xs={12}
        >
          <Grid item>
            <WhiteCssButton
              component={Link}
              to="/dashboard"
              style={{ textTransform: "capitalize", fontSize: "14px" }}
            >
              Cancel
            </WhiteCssButton>
          </Grid>
          <Grid item>
            <CssButton
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              style={{
                color: "white",
                textTransform: "none",
                borderRadius: "5px",
              }}
            >
              {"Save Changes"}
            </CssButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
