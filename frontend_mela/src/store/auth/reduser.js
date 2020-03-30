import * as actionTypes from './actionTypes';

const initState = {
    token     : null,
    error     : null,
    loading   : false
}

const authStart = (state) => {
    return {
        ...state,
        error     : null,  
        loading   : true
    };
}

const authSuccess = (state, action) => {
    return {
        ...state,
        token     : action.token,
        error     : null,
        loading   : false
    };
}

const authFail = (state, action) => {
    return {
        ...state,
        error   : action.error,
        loading : false
    };
}

const authLogout = (state) => {
    return {
        ...state,
        token   : null
    };
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    };
}

export default AuthReducer;