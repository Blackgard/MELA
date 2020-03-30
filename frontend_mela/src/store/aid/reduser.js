import * as actionTypes from './actionTypes';

const initState = {
    data      : [],
    error     : null,
    loading   : false
}

const aidLoadStart = (state) => {
    return {
        ...state,
        error     : null,  
        loading   : true
    };
}

const aidLoadSuccess = (state, action) => {
    return {
        ...state,
        data     : action.data,
        error     : null,
        loading   : false
    };
}

const aidLoadFail = (state, action) => {
    return {
        ...state,
        error   : action.error,
        loading : false
    };
}


const AidReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AID_LOAD_START: return aidLoadStart(state);
        case actionTypes.AID_LOAD_FAIL: return aidLoadFail(state, action);
        case actionTypes.AID_LOAD_SUCCESS: return aidLoadSuccess(state, action);
        default: return state;
    };
}

export default AidReducer;