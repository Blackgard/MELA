import React, { useEffect } from 'react';
import CompanyProfileContainer from '../containers/CompanyProfile';
import { connect } from 'react-redux';
import * as action from '../store/company/action';
import * as actionAid from '../store/aid/action';

const CompanyProfileView = (props) => {
    useEffect(() => {
        document.title = 'Профиль | MELA'
    })
    return <CompanyProfileContainer { ...props }/>
}

const mapStateToProps = (state) => {
    return {
        loadingCompany : state.company.loadingCompany,
        data           : state.company.data,
        listAids       : state.company.listAids,
        error          : state.company.error,
        types          : state.company.types,

        viewForm       : state.aid.viewForm,
        typesAid       : state.aid.types,
        user_info      : JSON.parse(localStorage.getItem('user_info')),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad        : async(id)       => {await dispatch(action.companyLoadDetails(id))},
        onAddNewAid   : async(data)       => {await dispatch(action.companyAddNewAid(data))},
        onPatch       : async(id_cmp, data) => {await dispatch(action.companyPatch(id_cmp,  data))},
        onDelete      : async(list)     => {await dispatch(action.companyDelete(list))},
        onLoadTypes   : async()         => {await dispatch(action.getTypeCompany())   },

        setViewForm   : async(isView)   => {await dispatch(actionAid.setViewForm(isView))},
        onAddAid      : async(data)     => {await dispatch(actionAid.aidAdd(data))},
        getTypeAid    : async()         => {await dispatch(actionAid.getTypeAid())},
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CompanyProfileView);