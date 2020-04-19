import { combineReducers } from "redux";
import AuthReducer from './auth/reduser';
import AidReducer from './aid/reduser';
import EmployerReducer from './employer/reduser';
import StorageReducer from "./storage/reduser";
import CompanyReducer from "./company/reduser";

export default combineReducers({
    auth     : AuthReducer,
    aid      : AidReducer,
    employer : EmployerReducer,
    storage  : StorageReducer,
    company  : CompanyReducer
})