import axios from 'axios';
import * as ActionTypes from './actionTypes';
import { apiURL } from '../settings';

const pathURL = 'storage';

// load data 

export const storageLoadStart = () => {
    return {
        type : ActionTypes.STORAGE_LOAD_START
    }
}

export const storageLoadSuccess = (data) => {
    return {
        type : ActionTypes.STORAGE_LOAD_SUCCESS,
        data : data
    }
}

export const storageLoadFail = (error) => {
    return {
        type  : ActionTypes.STORAGE_LOAD_FAIL,
        error : error
    }
}

// view form

export const viewFormAddStorageTrue = () => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_STORAGE_SET_TRUE,
        
    }
}

export const viewFormAddStorageFalse = () => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_STORAGE_SET_FALSE
    }
}

export const viewFormAddStorageFail = (error) => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_STORAGE_FAIL,
        error : error
    }
}

// add new 


export const addNewStorageStart = () => {
    return {
        type : ActionTypes.ADD_NEW_STORAGE_START
    }
}

export const addNewStorageSuccess = (data) => {
    return {
        type  : ActionTypes.ADD_NEW_STORAGE_SUCCESS,
        data  : data,
    }
}

export const addNewStorageFail = (error) => {
    return {
        type  : ActionTypes.ADD_NEW_STORAGE_FAIL,
        error : error
    }
}

// Load aid list

const storageLoadAidListStart = () => {
    return {
        type : ActionTypes.STORAGE_LOAD_AID_LIST_START
    };
}

const storageLoadAidListSuccess = (list) => {
    return {
        type  : ActionTypes.STORAGE_LOAD_AID_LIST_SUCCESS,
        list  : list,
    };
}

const storageLoadAidListFail = (error) => {
    return {
        type  : ActionTypes.STORAGE_LOAD_AID_LIST_FAIL,
        error : error,
    };
}

// delete 

export const storageDeleteStart = () => {
    return {
        type: ActionTypes.STORAGE_DELETE_START
    }
}

export const storageDeleteSuccess = (data) => {
    return {
        type  : ActionTypes.STORAGE_DELETE_SUCCESS,
        data  : data
    }
}

export const storageDeleteFail = (error) => {
    return {
        type  : ActionTypes.STORAGE_DELETE_FAIL,
        error : error
    }
}

// patch 

export const storagePatchStart = () => {
    return {
        type: ActionTypes.STORAGE_PATCH_START
    }
}

export const storagePatchSuccess = (data) => {
    return {
        type  : ActionTypes.STORAGE_PATCH_SUCCESS,
        data  : data
    }
}

export const storagePatchFail = (error) => {
    return {
        type  : ActionTypes.STORAGE_PATCH_FAIL,
        error : error
    }
}

// load types

export const getTypesStorageStart = () => {
    return {
        type : ActionTypes.GET_TYPES_STORAGE_START
    }
}

export const getTypesStorageSuccess = (types) => {
    return {
        type  : ActionTypes.GET_TYPES_STORAGE_SUCCESS,
        types : types
    }
}

export const getTypesStorageFail = (error) => {
    return {
        type  : ActionTypes.GET_TYPES_STORAGE_FAIL,
        error : error
    }
}

// actions

export const storageLoad = () => {
    return dispatch => {
        dispatch(storageLoadStart());
        axios.get(`${apiURL}/${pathURL}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(storageLoadSuccess(res.data));
        })
        .catch(err => {
            dispatch(storageLoadFail(err.response.data));
        })
    }
}

export const addStorage = (data) => {
    return dispatch => {
        dispatch(addNewStorageStart());
        axios.post(`${apiURL}/${pathURL}/`, data, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(_ => {
            axios.get(`${apiURL}/${pathURL}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch(addNewStorageSuccess(res.data));
            })
            .catch(err => {
                dispatch(addNewStorageFail(err.response.data));
            })
        })
        .catch(err => {
            dispatch(addNewStorageFail(err.response.data))
        })
    }
}

export const storageLoadDetails = id => {
    return dispatch => {
        dispatch(storageLoadStart());
        axios.get(`${apiURL}/${pathURL}/${id}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(storageLoadSuccess([res.data]));
        })
        .catch(err => {
            dispatch(storageLoadFail(err.response.data));
        })
    }
}

export const storageLoadAidList = id => {
    return dispatch => {
        dispatch(storageLoadAidListStart());
        axios.get(`${apiURL}/aid/?storage_id=${id}`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(storageLoadAidListSuccess(res.data));
        })
        .catch(err => {
            dispatch(storageLoadAidListFail(err.response.data));
        })
    }
}

export const storageDelete = id => {
    return async dispatch => {
        dispatch(storageDeleteStart());

        await axios.delete(`${apiURL}/${pathURL}/${id}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .catch(err => {
            dispatch(storageDeleteFail(err.response.data))
        })
        
        axios.get(`${apiURL}/${pathURL}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(storageDeleteSuccess(res.data));
        })
        .catch(err => {
            dispatch(storageDeleteFail(err.response.data))
        })
    }
}

export const storagePatch  = (id, data) => {
    return dispatch => {
        dispatch(storagePatchStart());
        axios.patch(`${apiURL}/${pathURL}/${id}/`, data, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(_ => {
            axios.get(`${apiURL}/${pathURL}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
            .then(res => {
                dispatch(storagePatchSuccess(res.data));
            })
            .catch(err => {
                dispatch(storagePatchFail(err.response.data));
            })
        })
        .catch(err => {
            dispatch(storagePatchFail(err.response.data));
        })
    }
}

// other

export const setViewForm = (isView) => {
    return dispatch => {
        switch (isView) {
            case true  : return dispatch(viewFormAddStorageTrue());
            case false : return dispatch(viewFormAddStorageFalse());
            default    : return dispatch(viewFormAddStorageFail('Я не знаю такой команды смены состояния!'))
        }
    }
}

export const getTypeStorage = () => {
    return dispatch => {
        dispatch(getTypesStorageStart());
        axios.get(`${apiURL}/type_store/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            let typesList = [];
            for (let i in res.data){
                typesList.push({
                    id   : res.data[i].id,
                    name : res.data[i].name
                });
            }
            dispatch(getTypesStorageSuccess(typesList));
        })
        .catch(err => {
            dispatch(getTypesStorageFail(err.response.data));
        })
    }
}