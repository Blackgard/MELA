import * as actionTypes from './actionTypes';

const initState = {
    data            : [], 
    listAids        : [],

    error           : null,

    loadingEmployer : false,
    loadingAidList  : false,
    viewForm        : false,
}

// load data

const employerLoadStart = (state) => {
    return {
        ...state,
        error           : null,
        loadingEmployer : true
    };
}

const employerLoadSuccess = (state, action) => {
    return {
        ...state,
        data            : action.data,
        error           : null,
        loadingEmployer : false
    };
}

const employerLoadFail = (state, action) => {
    return {
        ...state,
        error           : action.error,
        loadingEmployer : false
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
        error    : action.error,
        viewForm : false
    }
}

// add new

const addNewEmployerStart = (state) => {
    return {
        ...state,
        loadingEmployer : true
    };
}

const addNewEmployerSuccess = (state, action) => {
    return {
        ...state,
        data            : action.data,
        error           : null,
        loadingEmployer : false
    };
}

const addNewEmployerFail = (state, action) => {
    return {
        ...state,
        error           : action.error,
        loadingEmployer : false
    };
}

// load detail

const employerLoadAidListStart = (state) => {
    return {
        ...state,
        loadingAidList : true
    };
}

const employerLoadAidListSuccess = (state, action) => {
    return {
        ...state,
        listAids        : action.list,
        error           : null,
        loadingAidList : false
    };
}

const employerLoadAidListFail = (state, action) => {
    return {
        ...state,
        error           : action.error,
        loadingAidList  : false
    };
}

// delete

const employerDeleteStart = (state) => {
    return {
        ...state,
        error         : null,  
        loadingDelete : true
    };
}

const employerDeleteSuccess = (state, action) => {
    return {
        ...state,
        data          : action.data, 
        loadingDelete : false
    };
}

const employerDeleteFail = (state, action) => {
    return {
        ...state,
        error         : action.error,
        loadingDelete : false
    };
}

// patch 

const employerPatchStart = (state) => {
    return {
        ...state,
        error : null
    };
}

const employerPatchSuccess = (state, action) => {
    return {
        ...state,
        data  : action.data
    };
}

const employerPatchFail = (state, action) => {
    return {
        ...state,
        error         : action.error
    };
}

// reducer

const EmployerReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.EMPLOYER_LOAD_START   : return employerLoadStart(state);
        case actionTypes.EMPLOYER_LOAD_SUCCESS : return employerLoadSuccess(state, action);
        case actionTypes.EMPLOYER_LOAD_FAIL    : return employerLoadFail(state, action);

        case actionTypes.VIEW_FORM_ADD_EMPLOYER_SET_TRUE : return viewFormAddAidSetTrue(state);
        case actionTypes.VIEW_FORM_ADD_EMPLOYER_SET_FALSE: return viewFormAddAidSetFalse(state);
        case actionTypes.VIEW_FORM_ADD_EMPLOYER_FAIL     : return viewFormAddAidFail(state, action);

        case actionTypes.ADD_NEW_EMPLOYER_START   : return addNewEmployerStart(state);
        case actionTypes.ADD_NEW_EMPLOYER_SUCCESS : return addNewEmployerSuccess(state, action);
        case actionTypes.ADD_NEW_EMPLOYER_FAIL    : return addNewEmployerFail(state, action);

        case actionTypes.EMPLOYER_LOAD_AID_LIST_START   : return employerLoadAidListStart(state);
        case actionTypes.EMPLOYER_LOAD_AID_LIST_SUCCESS : return employerLoadAidListSuccess(state, action);
        case actionTypes.EMPLOYER_LOAD_AID_LIST_FAIL    : return employerLoadAidListFail(state, action);

        case actionTypes.EMPLOYER_DELETE_START           : return employerDeleteStart(state);
        case actionTypes.EMPLOYER_DELETE_SUCCESS         : return employerDeleteSuccess(state, action);
        case actionTypes.EMPLOYER_DELETE_FAIL            : return employerDeleteFail(state, action);

        case actionTypes.EMPLOYER_PATCH_START            : return employerPatchStart(state);
        case actionTypes.EMPLOYER_PATCH_SUCCESS          : return employerPatchSuccess(state, action);
        case actionTypes.EMPLOYER_PATCH_FAIL             : return employerPatchFail(state, action);

        default: return state;
    };
}

export default EmployerReducer;