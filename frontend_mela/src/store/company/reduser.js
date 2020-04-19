import * as actionTypes from './actionTypes';

const initState = {
    data            : [], 
    
    types           : [],

    error           : null,

    loadingDelete : false,
    loadingCompany : false,
    loadingAidList  : false,

    viewForm        : false
}

// load data

const companyLoadStart = (state) => {
    return {
        ...state,
        error           : null,
        loadingCompany : true
    };
}

const companyLoadSuccess = (state, action) => {
    return {
        ...state,
        data            : action.data,
        error           : null,
        loadingCompany : false
    };
}

const companyLoadFail = (state, action) => {
    return {
        ...state,
        error           : action.error,
        loadingCompany : false
    };
}

// view form

const viewFormAddCompanySetTrue = (state) => {
    return {
        ...state,
        viewForm : true,
        error    : null
    }
}

const viewFormAddCompanySetFalse = (state) => {
    return {
        ...state,
        viewForm : false,
        error    : null
    }
}

const viewFormAddCompanyFail = (state, action) => {
    return {
        ...state,
        error    : action.error,
        viewForm : false
    }
}

// add new

const signUpStart = (state) => {
    return {
        ...state,
        loadingCompany : true
    };
}

const signUpSuccess = (state) => {
    return {
        ...state,
        error           : null,
        loadingCompany : false
    };
}

const signUpFail = (state, action) => {
    return {
        ...state,
        error           : action.error,
        loadingCompany : false
    };
}

// load detail

const companyAddNewAidStart = (state) => {
    return {
        ...state,
        loadingAidList : true
    };
}

const companyAddNewAidSuccess = (state, action) => {
    return {
        ...state,
        data           : action.data,
        error          : null,
        loadingAidList : false
    };
}

const companyAddNewAidFail = (state, action) => {
    return {
        ...state,
        error           : action.error,
        loadingAidList  : false
    };
}

// delete

const companyDeleteStart = (state) => {
    return {
        ...state,
        error         : null,  
        loadingDelete : true
    };
}

const companyDeleteSuccess = (state, action) => {
    return {
        ...state,
        data          : action.data, 
        loadingDelete : false
    };
}

const companyDeleteFail = (state, action) => {
    return {
        ...state,
        error         : action.error,
        loadingDelete : false
    };
}

// patch 

const companyPatchStart = (state) => {
    return {
        ...state,
        error : null
    };
}

const companyPatchSuccess = (state, action) => {
    return {
        ...state,
        data  : action.data
    };
}

const companyPatchFail = (state, action) => {
    return {
        ...state,
        error         : action.error
    };
}

// load types

export const getTypesCompanyStart = (state) => {
    return {
        ...state,
        error : null
    }
}

export const getTypesCompanySuccess = (state, action) => {
    return {
        ...state,
        types  : action.types
    }
}

export const getTypesCompanyFail = (state, action) => {
    return {
        ...state,
        error  : action.error
    }
}

// reducer

const CompanyReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.COMPANY_LOAD_START   : return companyLoadStart(state);
        case actionTypes.COMPANY_LOAD_SUCCESS : return companyLoadSuccess(state, action);
        case actionTypes.COMPANY_LOAD_FAIL    : return companyLoadFail(state, action);

        case actionTypes.VIEW_FORM_ADD_COMPANY_SET_TRUE : return viewFormAddCompanySetTrue(state);
        case actionTypes.VIEW_FORM_ADD_COMPANY_SET_FALSE: return viewFormAddCompanySetFalse(state);
        case actionTypes.VIEW_FORM_ADD_COMPANY_FAIL     : return viewFormAddCompanyFail(state, action);

        case actionTypes.SIGNUP_START   : return signUpStart(state);
        case actionTypes.SIGNUP_SUCCESS : return signUpSuccess(state);
        case actionTypes.SIGNUP_FAIL    : return signUpFail(state, action);

        case actionTypes.COMPANY_ADD_NEW_AID_START   : return companyAddNewAidStart(state);
        case actionTypes.COMPANY_ADD_NEW_AID_SUCCESS : return companyAddNewAidSuccess(state, action);
        case actionTypes.COMPANY_ADD_NEW_AID_FAIL    : return companyAddNewAidFail(state, action);

        case actionTypes.COMPANY_DELETE_START           : return companyDeleteStart(state);
        case actionTypes.COMPANY_DELETE_SUCCESS         : return companyDeleteSuccess(state, action);
        case actionTypes.COMPANY_DELETE_FAIL            : return companyDeleteFail(state, action);

        case actionTypes.COMPANY_PATCH_START            : return companyPatchStart(state);
        case actionTypes.COMPANY_PATCH_SUCCESS          : return companyPatchSuccess(state, action);
        case actionTypes.COMPANY_PATCH_FAIL             : return companyPatchFail(state, action);

        case actionTypes.GET_TYPES_COMPANY_START        : return getTypesCompanyStart(state);
        case actionTypes.GET_TYPES_COMPANY_SUCCESS      : return getTypesCompanySuccess(state, action);
        case actionTypes.GET_TYPES_COMPANY_FAIL         : return getTypesCompanyFail(state, action);

        default: return state;
    };
}

export default CompanyReducer;