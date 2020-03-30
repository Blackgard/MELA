import axios from 'axios';
import * as ActionTypes from './actionTypes';
import { apiURL } from '../settings';

export const authStart = () => {
    return {
        type : ActionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type  : ActionTypes.AUTH_SUCCESS,
        token : token,
    }
}

export const authFail = (error) => {
    return {
        type  : ActionTypes.AUTH_FAIL,
        error : error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_info');

    return {
        type : ActionTypes.AUTH_LOGOUT
    };
    
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${apiURL}/api/login/`, {
            username: username,
            password: password
        })
        .then(res => {
            let data = {
                'username': res.data.user.username,
                'email'   : res.data.user.email,
                'token'   : res.data.token
            }
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_info', JSON.stringify(data));
            dispatch(authSuccess(data.token));
            dispatch(checkAuthTimeout(3600)); 
        })
        .catch(err => {
            dispatch(authFail(err.response.data.non_field_errors));
        })
    }
}

export const Signup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(`${apiURL}/api/signup/`, {
            username    : username,
            email       : email,
            password1   : password1,
            password2   : password2
        })
        .then(res => {
            let data = {
                'username': res.data.user.username,
                'email'   : res.data.user.email,
                'token'   : res.data.token
            }
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user_info', JSON.stringify(data));
            dispatch(authSuccess(data.token));
            dispatch(checkAuthTimeout(3600))
        })
        .catch(err => {
            dispatch(authFail(String(err)));
        })
    }
}