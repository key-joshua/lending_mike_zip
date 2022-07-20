import { combineReducers } from "redux";

import signup from "./signup";
import auth from "./auth";
import loans from "./loan";
import loader from "./loader";

export default combineReducers({ signup, auth, loans, loader });
