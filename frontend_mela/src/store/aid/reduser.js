import * as actionTypes from './actionTypes';

const initState = {
    data          : [],
    types         : [],

    error         : null,

    loadingTypes  : false,
    loadingAids   : false,
    loadingDelete : false,

    viewForm      : false,
    
}

// load aid data 

const aidLoadStart = (state) => {
    return {
        ...state,
        data        : [],
        error       : null,  
        loadingAids : true
    };
}

const aidLoadSuccess = (state, action) => {
    return {
        ...state,
        data        : action.data,
        loadingAids : false
    };
}

const aidLoadFail = (state, action) => {
    return {
        ...state,
        error       : action.error,
        loadingAids : false
    };
}

// view form

const viewFormAddAidSetTrue = (state) => {
    return {
        ...state,
        viewForm : true,
        error    : null
    }
}

const viewFormAddAidSetFalse = (state) => {
    return {
        ...state,
        viewForm : false,
        error    : null
    }
}

const viewFormAddAidFail = (state, action) => {
    return {
        ...state,
        viewForm : false,
        error    : action.error
    }
}

// get types

const getTypesAidStart = (state) => {
    return {
        ...state,
        error        : null,  
        loadingTypes : true
    }
}

const getTypesAidSuccess = (state, action) => {
    return {
        ...state,
        types        : action.types,
        loadingTypes : false
    }
}

const getTypesAidFail = (state, action) => {
    return {
        ...state,
        error        : action.error,
        loadingTypes : false
    }
}

// delete

const aidDeleteStart = (state) => {
    return {
        ...state,
        error         : null,  
        loadingDelete : true
    };
}

const aidDeleteSuccess = (state, action) => {
    return {
        ...state,
        data          : action.data, 
        loadingDelete : false
    };
}

const aidDeleteFail = (state, action) => {
    return {
        ...state,
        error         : action.error,
        loadingDelete : false
    };
}


// add new aid

const aidAddStart = (state) => {
    return {
        ...state,
        error       : null,
        loadingAids : true
    };
}

const aidAddSuccess = (state, action) => {
    return {
        ...state,
        data        : action.data,
        loadingAids : false
    };
}

const aidAddFail = (state, action) => {
    return {
        ...state,
        error         : action.error,
        loadingAids : false
    };
}

// patch aid 

const aidPatchStart = (state) => {
    return {
        ...state,
        error : null
    };
}

const aidPatchSuccess = (state, action) => {
    return {
        ...state,
        data  : action.data
    };
}

const aidPatchFail = (state, action) => {
    return {
        ...state,
        error         : action.error
    };
}

// reducer

const AidReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AID_LOAD_START             : return aidLoadStart(state);
        case actionTypes.AID_LOAD_SUCCESS           : return aidLoadSuccess(state, action);
        case actionTypes.AID_LOAD_FAIL              : return aidLoadFail(state, action);
        
        case actionTypes.VIEW_FORM_ADD_AID_SET_TRUE : return viewFormAddAidSetTrue(state);
        case actionTypes.VIEW_FORM_ADD_AID_SET_FALSE: return viewFormAddAidSetFalse(state);
        case actionTypes.VIEW_FORM_ADD_AID_FAIL     : return viewFormAddAidFail(state, action);

        case actionTypes.GET_TYPES_AID_START        : return getTypesAidStart(state);
        case actionTypes.GET_TYPES_AID_SUCCESS      : return getTypesAidSuccess(state, action);
        case actionTypes.GET_TYPES_AID_FAIL         : return getTypesAidFail(state, action);

        case actionTypes.AID_DELETE_START           : return aidDeleteStart(state);
        case actionTypes.AID_DELETE_SUCCESS         : return aidDeleteSuccess(state, action);
        case actionTypes.AID_DELETE_FAIL            : return aidDeleteFail(state, action);

        case actionTypes.AID_ADD_START              : return aidAddStart(state);
        case actionTypes.AID_ADD_SUCCESS            : return aidAddSuccess(state, action);
        case actionTypes.AID_ADD_FAIL               : return aidAddFail(state, action);

        case actionTypes.AID_PATCH_START            : return aidPatchStart(state);
        case actionTypes.AID_PATCH_SUCCESS          : return aidPatchSuccess(state, action);
        case actionTypes.AID_PATCH_FAIL             : return aidPatchFail(state, action);

        default: return state;
    };
}

export default AidReducer;