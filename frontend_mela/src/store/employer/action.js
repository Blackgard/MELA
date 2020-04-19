import axios from 'axios';
import * as ActionTypes from './actionTypes';
import { apiURL, nextFormatDate, serverFormatDate } from '../settings';
import moment from 'moment';

const employerURL = 'employer';

const normalizeData = data => {
    for (let i in data) {
        if (data[i].user.brith_date) {
            data[i].user.brith_date = moment(
                data[i].user.brith_date, serverFormatDate
            )
            .format(nextFormatDate);
        } else {
            data[i].user.brith_date = 'Не установлена'
        }
        data[i].key = data[i].id;
    }
    return data
}

// load data employer 

export const employerLoadStart = () => {
    return {
        type : ActionTypes.EMPLOYER_LOAD_START
    }
}

export const employerLoadSuccess = (data) => {
    return {
        type : ActionTypes.EMPLOYER_LOAD_SUCCESS,
        data : data
    }
}

export const employerLoadFail = (error) => {
    return {
        type  : ActionTypes.EMPLOYER_LOAD_FAIL,
        error : error
    }
}

// view form

export const viewFormAddEmployerTrue = () => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_EMPLOYER_SET_TRUE,
        
    }
}

export const viewFormAddEmployerFalse = () => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_EMPLOYER_SET_FALSE
    }
}

export const viewFormAddEmployerFail = (error) => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_EMPLOYER_FAIL,
        error : error
    }
}

// add new employer


export const addNewEmployerStart = () => {
    return {
        type : ActionTypes.ADD_NEW_EMPLOYER_START
    }
}

export const addNewEmployerSuccess = (data) => {
    return {
        type  : ActionTypes.ADD_NEW_EMPLOYER_SUCCESS,
        data  : data,
    }
}

export const addNewEmployerFail = (error) => {
    return {
        type  : ActionTypes.ADD_NEW_EMPLOYER_FAIL,
        error : error
    }
}

// Load aid list

const employerLoadAidListStart = () => {
    return {
        type : ActionTypes.EMPLOYER_LOAD_AID_LIST_START
    };
}

const employerLoadAidListSuccess = (list) => {
    return {
        type  : ActionTypes.EMPLOYER_LOAD_AID_LIST_SUCCESS,
        list  : list,
    };
}

const employerLoadAidListFail = (error) => {
    return {
        type  : ActionTypes.EMPLOYER_LOAD_AID_LIST_FAIL,
        error : error,
    };
}

// delete 

export const employerDeleteStart = () => {
    return {
        type: ActionTypes.EMPLOYER_DELETE_START
    }
}

export const employerDeleteSuccess = (data) => {
    return {
        type  : ActionTypes.EMPLOYER_DELETE_SUCCESS,
        data  : data
    }
}

export const employerDeleteFail = (error) => {
    return {
        type  : ActionTypes.EMPLOYER_DELETE_FAIL,
        error : error
    }
}

// patch 

export const employerPatchStart = () => {
    return {
        type: ActionTypes.EMPLOYER_PATCH_START
    }
}

export const employerPatchSuccess = (data) => {
    return {
        type  : ActionTypes.EMPLOYER_PATCH_SUCCESS,
        data  : data
    }
}

export const employerPatchFail = (error) => {
    return {
        type  : ActionTypes.EMPLOYER_PATCH_FAIL,
        error : error
    }
}

// actions

export const employerLoad = () => {
    return dispatch => {
        dispatch(employerLoadStart());
        axios.get(`${apiURL}/${employerURL}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(employerLoadSuccess(normalizeData(res.data)));
        })
        .catch(err => {
            dispatch(employerLoadFail(err.response.data));
        })
    }
}

export const addEmployer = (data) => {
    return dispatch => {
        dispatch(addNewEmployerStart());
        axios.post(`${apiURL}/signup/`, data, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(new_user => {
            axios.post(`${apiURL}/${employerURL}/`, {
                'id_user' : new_user.data.user.pk
            }, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
            .then(_ => {
                axios.get(`${apiURL}/${employerURL}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
                .then(res => {
                    dispatch(addNewEmployerSuccess(normalizeData(res.data)));
                })
                .catch(err => {
                    dispatch(addNewEmployerFail(err.response.data));
                })
            })
            .catch(err => {
                dispatch(addNewEmployerFail(err.response.data))
            })
            
        })
        .catch(err => {
            try {
                dispatch(addNewEmployerFail(err.response.data))
            } catch {
                dispatch(addNewEmployerFail(err.response.data))
            }
        })
    }
}

export const employerLoadDetails = id => {
    return dispatch => {
        dispatch(employerLoadStart());
        axios.get(`${apiURL}/${employerURL}/${id}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(employerLoadSuccess(normalizeData([res.data])));
        })
        .catch(err => {
            dispatch(employerLoadFail(err.response.data));
        })
    }
}

export const employerLoadAidList = id => {
    return dispatch => {
        dispatch(employerLoadAidListStart());
        axios.get(`${apiURL}/aid/?employer_id=${id}`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(employerLoadAidListSuccess(res.data));
        })
        .catch(err => {

            dispatch(employerLoadAidListFail(err.response.data));
        })
    }
}

export const employerDelete = data => {
    return async dispatch => {
        dispatch(employerDeleteStart());
        for (let id of data) {
            await axios.delete(`${apiURL}/${employerURL}/${id}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
            .catch(err => {
                dispatch(employerDeleteFail(err.response.data))
            })
        }

        axios.get(`${apiURL}/${employerURL}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(employerDeleteSuccess(normalizeData(res.data)));
        })
        .catch(err => {
            dispatch(employerDeleteFail(err.response.data))
        })
    }
}

export const employerPatch  = (id_user, id_emp, data) => {
    return dispatch => {
        dispatch(employerPatchStart());
        axios.patch(`${apiURL}/users/${id_user}/`, data, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(_ => {
            axios.get(`${apiURL}/${employerURL}/${id_emp}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch(employerPatchSuccess(normalizeData([res.data])));
            })
            .catch(err => {
                dispatch(employerPatchFail(err.response.data));
            })
        })
        .catch(err => {
            dispatch(employerPatchFail(err.response.data));
        })
    }
}

// other

export const setViewForm = (isView) => {
    return dispatch => {
        switch (isView) {
            case true  : return dispatch(viewFormAddEmployerTrue());
            case false : return dispatch(viewFormAddEmployerFalse());
            default    : return dispatch(viewFormAddEmployerFail('Я не знаю такой команды смены состояния!'))
        }
    }
}