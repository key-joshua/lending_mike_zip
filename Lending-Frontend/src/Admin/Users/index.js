import {
  Grid,
  useMediaQuery,
  Button,
  Typography,
  Menu,
  MenuItem,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useState, useEffect } from "react";
import { deleteUsers, getUsers, suspendUsers } from "../../actions/admin";
import Delete from "../../Components/DeleteModal";
import Table from "./Table";
import Suspend from "../../Components/SuspendModal";
const CssButton = styled(Button)({
  backgroundColor: "#4267b2",
  color: "white",
  borderRadius: "5px",
  height: "2.5em",
});
const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#D9D9D9",
    margin: "5px 2px",
    color: "black",
    height: "2.5em",
    borderRadius: "10px",
  },
});

function createData(id, name, email, username, active) {
  return {
    id,
    name,
    email,
    username,
    active,
  };
}

const Users = () => {
  const small = useMediaQuery("(max-width:756px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");
  const [suspend, setSuspend] = useState(false);
  const [remove, setRemove] = useState(false);
  const [filter, setFilter] = useState([]);
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteAccounts = async () => {
    await deleteUsers(selected, (data) => {
      setRows(
        data.map((obj) => {
          return createData(
            obj.id,
            obj.name,
            obj.email,
            obj.username,
            obj.active
          );
        })
      );
      setSelected([]);
    });
    return;
  };

  const suspendAccounts = async () => {
    await suspendUsers(selected, (data) => {
      setRows(
        data.map((obj) => {
          return createData(
            obj.id,
            obj.name,
            obj.email,
            obj.username,
            obj.active
          );
        })
      );
      setSelected([]);
    });
    return;
  };

  useEffect(() => {
    const user = async () => {
      const data = await getUsers("");

      setRows(
        data.map((obj) => {
          return createData(
            obj.id,
            obj.name,
            obj.email,
            obj.username,
            obj.active
          );
        })
      );
    };
    user();
  }, [setRows]);

  useEffect(() => {
    let removed_id = rows.filter(
      (item) => !item.name.toLowerCase().includes(search.toLowerCase())
    );
    removed_id = removed_id.map((obj) => obj.id);
    setFilter(
      rows.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    setSelected((state) => [
      ...state.filter((item) => !removed_id.includes(item)),
    ]);
  }, [setFilter, setSelected, search, rows]);

  return (
    <>
      <Delete
        open={remove}
        setOpen={setRemove}
        deleteAccounts={deleteAccounts}
      />
      <Suspend open={suspend} setOpen={setSuspend} suspend={suspendAccounts} />
      <Grid
        item
        xs={12}
        style={{ padding: small ? "0 1em" : "0 3em 0 3em" }}
        container
      >
        <Grid item container xs={12} justifyContent={"space-between"}>
          <Grid item xs={6}>
            <Typography fontSize={"35px"} fontWeight={400}>
              Users
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            container
            alignItems="center"
            justifyContent="flex-end"
          >
            <CssButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="contained"
              style={{
                color: "white",
                fontSize: "1em",
                textTransform: "none",
                borderRadius: "5px",
              }}
            >
              <p
                style={{
                  margin: "0",
                }}
              >
                Actions{" "}
              </p>
              <ArrowDropDownIcon />
            </CssButton>{" "}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  setSuspend(true);
                  handleClose();
                }}
              >
                Suspend Account
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setRemove(true);
                  handleClose();
                }}
              >
                Delete Account
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "1em" }} container>
          <Paper style={{ width: "100%" }}>
            <Grid item xs={8} md={4}>
              <CssTextField
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Table
              rows={filter}
              setSelected={setSelected}
              selected={selected}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
