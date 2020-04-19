import axios from 'axios';
import * as ActionTypes from './actionTypes';
import { apiURL, nextFormatDate, serverFormatDate } from '../settings';
import moment from 'moment';

const normalizeData = data => {
    for (let i in data) {
        let _data = data[i];

        _data.date_public = moment(
            _data.date_public, serverFormatDate
        )
        .format(nextFormatDate);

        if (_data.company) {
            _data.company.date_create_rq = moment(
                _data.company.date_create_rq, serverFormatDate
            )
            .format(nextFormatDate);
        }
        _data.key = _data.id;
    }
    return data
}

// load data aid 

export const aidLoadStart = () => {
    return {
        type : ActionTypes.AID_LOAD_START
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

// view form 

export const viewFormAddAidSetTrue = () => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_AID_SET_TRUE
    }
}

export const viewFormAddAidSetFalse = () => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_AID_SET_FALSE
    }
}

export const viewFormAddAidFail = (error) => {
    return {
        type  : ActionTypes.VIEW_FORM_ADD_AID_FAIL,
        error : error
    }
}

// get types aid

export const getTypesAidStart = () => {
    return {
        type : ActionTypes.GET_TYPES_AID_START
    }
}

export const getTypesAidSuccess = (types) => {
    return {
        type  : ActionTypes.GET_TYPES_AID_SUCCESS,
        types : types
    }
}

export const getTypesAidFail = (error) => {
    return {
        type  : ActionTypes.GET_TYPES_AID_FAIL,
        error : error
    }
}

// delete aid

export const aidDeleteStart = () => {
    return {
        type: ActionTypes.AID_DELETE_START
    }
}

export const aidDeleteSuccess = (data) => {
    return {
        type  : ActionTypes.AID_DELETE_SUCCESS,
        data  : data
    }
}

export const aidDeleteFail = (error) => {
    return {
        type  : ActionTypes.AID_DELETE_FAIL,
        error : error
    }
}

// add new aid

export const aidAddStart = () => {
    return {
        type: ActionTypes.AID_ADD_START
    }
}

export const aidAddSuccess = (data) => {
    return {
        type  : ActionTypes.AID_ADD_SUCCESS,
        data  : data
    }
}

export const aidAddFail = (error) => {
    return {
        type  : ActionTypes.AID_ADD_FAIL,
        error : error
    }
}

// patch aid

export const aidPatchStart = () => {
    return {
        type: ActionTypes.AID_PATCH_START
    }
}

export const aidPatchSuccess = (data) => {
    return {
        type  : ActionTypes.AID_PATCH_SUCCESS,
        data  : data
    }
}

export const aidPatchFail = (error) => {
    return {
        type  : ActionTypes.AID_PATCH_FAIL,
        error : error
    }
}

// actions 

export const aidLoad   = () => {
    return dispatch => {
        dispatch(aidLoadStart());
        axios.get(`${apiURL}/aid/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(aidLoadSuccess(normalizeData(res.data)));
        })
        .catch(err => {
            dispatch(aidLoadFail(err.response.data));
        })
    }
}

export const aidLoadDetails = id => {
    return dispatch => {
        dispatch(aidLoadStart());
        axios.get(`${apiURL}/aid/${id}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            res.data.date_public = moment(
                res.data.date_public, serverFormatDate
            )
            .format(nextFormatDate);
            console.group(res.data);
            dispatch(aidLoadSuccess([res.data]));
        })
        .catch(err => {
            dispatch(aidLoadFail(err));
        })
    }
}

export const aidAdd    = data => {
    return dispatch => {
        dispatch(aidAddStart());
        axios.post(`${apiURL}/aid/`, data, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(_ => {
            axios.get(`${apiURL}/aid/`, {
                headers : {
                    'Authorization': "JWT " + localStorage.getItem('token')
                }
            })
            .then(res => {
                dispatch(aidAddSuccess(normalizeData(res.data)));
            })
            .catch(err => {
                dispatch(aidAddFail(err.response.data));
            })
        })
        .catch(err => {
            dispatch(aidAddFail(err.response.data));
        })
    }
}

export const aidDelete = data => {
    return async dispatch => {
        dispatch(aidDeleteStart());
        for (let aid of data) {
            await axios.delete(`${apiURL}/aid/${aid}/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
            .catch(err => {
                dispatch(aidDeleteFail(err.response.data))
            })
        }

        axios.get(`${apiURL}/aid/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            dispatch(aidDeleteSuccess(normalizeData(res.data)));
        })
        .catch(err => {
            dispatch(aidDeleteFail(err.response.data))
        })
    }
}

export const aidPatch  = (id, data) => {
    return dispatch => {
        dispatch(aidPatchStart());
        axios.patch(`${apiURL}/aid/${id}/`, data, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            dispatch(aidPatchSuccess(normalizeData([res.data])));
        })
        .catch(err => {
            dispatch(aidPatchFail(err.response.data));
        })
    }
}
// action other

export const getTypeAid = () => {
    return dispatch => {
        dispatch(getTypesAidStart());
        axios.get(`${apiURL}/type_aids/`, {
            headers : {
                'Authorization': "JWT " + localStorage.getItem('token')
            }
        })
        .then(res => {
            let typesList = [];
            for (let i in res.data){
                typesList.push({
                    id   : res.data[i].id,
                    name : res.data[i].name,
                    description : res.data[i].description
                });
            }
            dispatch(getTypesAidSuccess(typesList));
        })
        .catch(err => {
            dispatch(getTypesAidFail(err.response.data));
        })
    }
}

export const setViewForm = (isView) => {
    return dispatch => {
        switch (isView) {
            case true  : return dispatch(viewFormAddAidSetTrue());
            case false : return dispatch(viewFormAddAidSetFalse());
            default    : return dispatch(viewFormAddAidFail('Я не знаю такой команды смены состояния!'))
        }
    }
}