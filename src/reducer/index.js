import {combineReducers} from "redux";
import { loginAdminReducer } from "./login";

const allReducer = combineReducers({
    loginAdminReducer,
});

export default allReducer;