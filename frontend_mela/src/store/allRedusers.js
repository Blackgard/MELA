import { combineReducers } from "redux";
import AuthReducer from './auth/reduser';
import AidReducer from './aid/reduser';

export default combineReducers({
    auth : AuthReducer,
    aid  : AidReducer
})