import {combineReducers} from "redux";
import { loginAdminReducer, loginUserReducer } from "./login";


const allReducer = combineReducers({
    loginAdminReducer,
    loginUserReducer
});

export default allReducer;