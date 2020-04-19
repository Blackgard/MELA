import * as actionTypes from './actionTypes';

const initState = {
    data            : [], 
    listAids        : [],
    types           : [],

    error           : null,

    loadingDelete : false,
    loadingStorage : false,
    loadingAidList  : false,

    viewForm        : false,
}

// load data

const storageLoadStart = (state) => {
    return {
        ...state,
        error           : null,
        loadingStorage : true
    };
}

const storageLoadSuccess = (state, action) => {
    return {
        ...state,
        data            : action.data,
        error           : null,
        loadingStorage : false
    };
}

const storageLoadFail = (state, action) => {
    return {
        ...state,
        error           : action.error,
        loadingStorage : false
    };
}

// view form

const viewFormAddStorageSetTrue = (state) => {
    return {
        ...state,
        viewForm : true,
        error    : null
    }
}

const viewFormAddStorageSetFalse = (state) => {
    return {
        ...state,
        viewForm : false,
        error    : null
    }
}

const viewFormAddStorageFail = (state, action) => {
    return {
        ...state,
        error    : action.error,
        viewForm : false
    }
}

// add new

const addNewStorageStart = (state) => {
    return {
        ...state,
        loadingStorage : true
    };
}

const addNewStorageSuccess = (state, action) => {
    return {
        ...state,
        data            : action.data,
        error           : null,
        loadingStorage : false
    };
}

const addNewStorageFail = (state, action) => {
    return {
        ...state,
        error           : action.error,
        loadingStorage : false
    };
}

// load detail

const storageLoadAidListStart = (state) => {
    return {
        ...state,
        loadingAidList : true
    };
}

const storageLoadAidListSuccess = (state, action) => {
    return {
        ...state,
        listAids        : action.list,
        error           : null,
        loadingAidList : false
    };
}

const storageLoadAidListFail = (state, action) => {
    return {
        ...state,
        error           : action.error,
        loadingAidList  : false
    };
}

// delete

const storageDeleteStart = (state) => {
    return {
        ...state,
        error         : null,  
        loadingDelete : true
    };
}

const storageDeleteSuccess = (state, action) => {
    return {
        ...state,
        data          : action.data, 
        loadingDelete : false
    };
}

const storageDeleteFail = (state, action) => {
    return {
        ...state,
        error         : action.error,
        loadingDelete : false
    };
}

// patch 

const storagePatchStart = (state) => {
    return {
        ...state,
        error : null
    };
}

const storagePatchSuccess = (state, action) => {
    return {
        ...state,
        data  : action.data
    };
}

const storagePatchFail = (state, action) => {
    return {
        ...state,
        error         : action.error
    };
}

// load types

export const getTypesStorageStart = (state) => {
    return {
        ...state,
        error : null
    }
}

export const getTypesStorageSuccess = (state, action) => {
    return {
        ...state,
        types  : action.types
    }
}

export const getTypesStorageFail = (state, action) => {
    return {
        ...state,
        error  : action.error
    }
}

// reducer

const StorageReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.STORAGE_LOAD_START   : return storageLoadStart(state);
        case actionTypes.STORAGE_LOAD_SUCCESS : return storageLoadSuccess(state, action);
        case actionTypes.STORAGE_LOAD_FAIL    : return storageLoadFail(state, action);

        case actionTypes.VIEW_FORM_ADD_STORAGE_SET_TRUE : return viewFormAddStorageSetTrue(state);
        case actionTypes.VIEW_FORM_ADD_STORAGE_SET_FALSE: return viewFormAddStorageSetFalse(state);
        case actionTypes.VIEW_FORM_ADD_STORAGE_FAIL     : return viewFormAddStorageFail(state, action);

        case actionTypes.ADD_NEW_STORAGE_START   : return addNewStorageStart(state);
        case actionTypes.ADD_NEW_STORAGE_SUCCESS : return addNewStorageSuccess(state, action);
        case actionTypes.ADD_NEW_STORAGE_FAIL    : return addNewStorageFail(state, action);

        case actionTypes.STORAGE_LOAD_AID_LIST_START   : return storageLoadAidListStart(state);
        case actionTypes.STORAGE_LOAD_AID_LIST_SUCCESS : return storageLoadAidListSuccess(state, action);
        case actionTypes.STORAGE_LOAD_AID_LIST_FAIL    : return storageLoadAidListFail(state, action);

        case actionTypes.STORAGE_DELETE_START           : return storageDeleteStart(state);
        case actionTypes.STORAGE_DELETE_SUCCESS         : return storageDeleteSuccess(state, action);
        case actionTypes.STORAGE_DELETE_FAIL            : return storageDeleteFail(state, action);

        case actionTypes.STORAGE_PATCH_START            : return storagePatchStart(state);
        case actionTypes.STORAGE_PATCH_SUCCESS          : return storagePatchSuccess(state, action);
        case actionTypes.STORAGE_PATCH_FAIL             : return storagePatchFail(state, action);

        case actionTypes.GET_TYPES_STORAGE_START        : return getTypesStorageStart(state);
        case actionTypes.GET_TYPES_STORAGE_SUCCESS      : return getTypesStorageSuccess(state, action);
        case actionTypes.GET_TYPES_STORAGE_FAIL         : return getTypesStorageFail(state, action);

        default: return state;
    };
}

export default StorageReducer;