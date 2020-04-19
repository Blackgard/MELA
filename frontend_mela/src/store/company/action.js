import axios from 'axios';
import * as ActionTypes from './actionTypes';
import { apiURL } from '../settings';
import { logout } from '../auth/action';

const pathURL = 'company';

const normalizeData = data => {
    for (let i in data) {
        data[i].key = data[i].id;
    }
    return data
}

// load data 

export const companyLoadStart = () => {
    return {
        type : ActionTypes.COMPANY_LOAD_START
    }
}

export const companyLoadSuccess = (data) => {
    return {
        type : ActionTypes.COMPANY_LOAD_SUCCESS,
        data : data
    }
}

export const companyLoadFail = (error) => {
    return {
        type  : ActionTypes.COMPANY_LOAD_FAIL,
        error : error
    }
}

// view form

export const viewFormAddCompanyTrue = () => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_COMPANY_SET_TRUE,
        
    }
}

export const viewFormAddCompanyFalse = () => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_COMPANY_SET_FALSE
    }
}

export const viewFormAddCompanyFail = (error) => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_COMPANY_FAIL,
        error : error
    }
}

// add new 


export const SignupStart = () => {
    return {
        type : ActionTypes.SIGNUP_START
    }
}

export const SignupSuccess = () => {
    return {
        type  : ActionTypes.SIGNUP_SUCCESS
    }
}

export const SignupFail = (error) => {
    return {
        type  : ActionTypes.SIGNUP_FAIL,
        error : error
    }
}

// Load aid list

const companyAddNewAidStart = () => {
    return {
        type : ActionTypes.COMPANY_ADD_NEW_AID_START
    };
}

const companyAddNewAidSuccess = (data) => {
    return {
        type  : ActionTypes.COMPANY_ADD_NEW_AID_SUCCESS,
        data  : data,
    };
}

const companyAddNewAidFail = (error) => {
    return {
        type  : ActionTypes.COMPANY_ADD_NEW_AID_FAIL,
        error : error,
    };
}

// delete 

export const companyDeleteStart = () => {
    return {
        type: ActionTypes.COMPANY_DELETE_START
    }
}

export const companyDeleteSuccess = (data) => {
    return {
        type  : ActionTypes.COMPANY_DELETE_SUCCESS,
        data  : data
    }
}

export const companyDeleteFail = (error) => {
    return {
        type  : ActionTypes.COMPANY_DELETE_FAIL,
        error : error
    }
}

// patch 

export const companyPatchStart = () => {
    return {
        type: ActionTypes.COMPANY_PATCH_START
    }
}

export const companyPatchSuccess = (data) => {
    return {
        type  : ActionTypes.COMPANY_PATCH_SUCCESS,
        data  : data
    }
}

export const companyPatchFail = (error) => {
    return {
        type  : ActionTypes.COMPANY_PATCH_FAIL,
        error : error
    }
}

// load types

export const getTypesCompanyStart = () => {
    return {
        type : ActionTypes.GET_TYPES_COMPANY_START
    }
}

export const getTypesCompanySuccess = (types) => {
    return {
        type  : ActionTypes.GET_TYPES_COMPANY_SUCCESS,
        types : types
    }
}

export const getTypesCompanyFail = (error) => {
    return {
        type  : ActionTypes.GET_TYPES_COMPANY_FAIL,
        error : error
    }
}

// actions

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 336)
    }
}

export const SignupCompany = (data) => {
    return dispatch => {
        dispatch(SignupStart());
        axios.post(`${apiURL}/${pathURL}/`, data)
        .then(company => {
            axios.post(`${apiURL}/login/`, {
                'username' : data.username,
                'password' : data.password1
            })
            .then(res => {
                let data = {
                    'id_company' : company.data.id,
                    'username'   : res.data.user.username,
                    'email'      : res.data.user.email,
                    'token'      : res.data.token
                }
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_info', JSON.stringify(data));
                dispatch(checkAuthTimeout(3600)); 
                dispatch(SignupSuccess());
            })
            .catch(err => {
                dispatch(SignupFail(err.response.data));
            })
        })
        .catch(err => {
            dispatch(SignupFail(err.response.data))
        })
    }
}

export const companyLoad = () => {
    return dispatch => {
        dispatch(companyLoadStart());
        axios.get(`${apiURL}/${pathURL}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(companyLoadSuccess(normalizeData(res.data)));
        })
        .catch(err => {
            dispatch(companyLoadFail(err.response.data));
        })
    }
}

export const companyLoadDetails = id => {
    return dispatch => {
        dispatch(companyLoadStart());
        axios.get(`${apiURL}/${pathURL}/${id}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(companyLoadSuccess([res.data]));
        })
        .catch(err => {
            dispatch(companyLoadFail(err.response.data));
        })
    }
}

export const companyAddNewAid = data => {
    return dispatch => {
        dispatch(companyAddNewAidStart());

        let { id_company } = data;

        data = {
            ...data,
            'status_id' : 'start'
        }

        axios.post(`${apiURL}/aid/`, data, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(new_aid => {
            axios.post(`${apiURL}/company_aids/`, {
                'aids_id'    : new_aid.data.id,
                'company_id' : id_company
            },{
                headers : {
                    'Authorization': "JWT " + localStorage.getItem('token')
            }})
            .then(_ => {
                axios.get(`${apiURL}/${pathURL}/${id_company}/`, {
                    headers : {
                        'Authorization': "JWT " + localStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res);
                    dispatch(companyAddNewAidSuccess([res.data]));
                })
                .catch(err => {
                    dispatch(companyAddNewAidFail(err.response.data));
                })
            })
            .catch(err => {
                dispatch(companyAddNewAidFail(err.response.data));
            })
        })
        .catch(err => {
            dispatch(companyAddNewAidFail(err.response.data));
        })
    }
}

export const companyDelete = id => {
    return async dispatch => {
        dispatch(companyDeleteStart());

        await axios.delete(`${apiURL}/${pathURL}/${id}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .catch(err => {
            dispatch(companyDeleteFail(err.response.data))
        })
        
        axios.get(`${apiURL}/${pathURL}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(companyDeleteSuccess(res.data));
        })
        .catch(err => {
            dispatch(companyDeleteFail(err.response.data))
        })
    }
}

export const companyPatch  = (id, data) => {
    return dispatch => {
        dispatch(companyPatchStart());
        axios.patch(`${apiURL}/${pathURL}/${id}/`, data, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(companyPatchSuccess([res.data]));
        })
        .catch(err => {
            dispatch(companyPatchFail(err.response.data));
        })
    }
}

// other

export const setViewForm = (isView) => {
    return dispatch => {
        switch (isView) {
            case true  : return dispatch(viewFormAddCompanyTrue());
            case false : return dispatch(viewFormAddCompanyFalse());
            default    : return dispatch(viewFormAddCompanyFail('Я не знаю такой команды смены состояния!'))
        }
    }
}

export const getTypeCompany = () => {
    return dispatch => {
        dispatch(getTypesCompanyStart());
        axios.get(`${apiURL}/type_company/`)
        .then(res => {
            let typesList = [];
            for (let i in res.data){
                typesList.push({
                    id   : res.data[i].id,
                    name : res.data[i].name
                });
            }
            dispatch(getTypesCompanySuccess(typesList));
        })
        .catch(err => {
            dispatch(getTypesCompanyFail(err.response.data));
        })
    }
}