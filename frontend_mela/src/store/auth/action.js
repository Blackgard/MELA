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
        }, expirationTime * 336)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post(`${apiURL}/login/`, {
            username: username,
            password: password
        })
        .then(res => {
            let id_company = false;
            if (!res.data.user.is_staff) {
                axios.get(`${apiURL}/company/?employer_id=${res.data.user.id}`)
                .then(company => {
                    id_company = company.data[0].id;
                    let data = {
                        'id_company' : id_company,
                        'username'   : res.data.user.username,
                        'email'      : res.data.user.email,
                        'token'      : res.data.token,
                        'is_staff'   : res.data.user.is_staff
                    }

                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user_info', JSON.stringify(data));
                    dispatch(authSuccess(data.token));
                    dispatch(checkAuthTimeout(3600)); 
                })
                .catch(err => {
                    dispatch(authFail(err.response.data.non_field_errors));
                })
            } else {
                let data = {
                    'username': res.data.user.username,
                    'email'   : res.data.user.email,
                    'token'   : res.data.token,
                    'is_staff' : res.data.user.is_staff
                }

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_info', JSON.stringify(data));
                dispatch(authSuccess(data.token));
                dispatch(checkAuthTimeout(3600)); 
            }
        })
        .catch(err => {
            dispatch(authFail(err.response.data.non_field_errors));
        })
    }
}

export const Signup = (data) => {
    return dispatch => {
        dispatch(authStart())
        axios.post(`${apiURL}/signup/`, {
            username    : data.username,
            email       : data.email,
            password1   : data.password1,
            password2   : data.password2
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
            dispatch(authFail(err.response.data));
        })
    }
}