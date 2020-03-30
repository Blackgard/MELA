import axios from 'axios';
import * as ActionTypes from './actionTypes';
import { apiURL } from '../settings';

export const aidLoadStart = () => {
    return {
        type : ActionTypes.AID_LOAD_SUCCESS
    }
}

export const aidLoadSuccess = (data) => {
    return {
        type : ActionTypes.AID_LOAD_SUCCESS,
        data : data
    }
}

export const aidLoadFail = (error) => {
    return {
        type  : ActionTypes.AID_LOAD_FAIL,
        error : error
    }
}

export const aidLoad = () => {
    return dispatch => {
        dispatch(aidLoadStart());
        axios.get(`${apiURL}/api/aid/`, {
            headers: {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(aidLoadSuccess(res.data));
        })
        .catch(err => {
            dispatch(aidLoadFail(err));
        })
    }
}
