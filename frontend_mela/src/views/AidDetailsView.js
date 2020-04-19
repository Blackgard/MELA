import React, { useEffect } from 'react';
import AidDetailsContainer from '../containers/AidDetails';
import { connect } from 'react-redux';
import * as action from '../store/aid/action';
import * as actionEmp from '../store/employer/action';
import * as actionSto from '../store/storage/action';

const TableAidsView = (props) => {
    useEffect(() => {
        document.title = 'ЭОП | MELA'
    })
    return <AidDetailsContainer { ...props }/>
}

const mapStateToProps = (state) => {
    return {
        loadingTypes  : state.aid.loadingTypes,
        loadingAids   : state.aid.loadingAids,
        loadingDelete : state.aid.loadingDelete,

        data          : state.aid.data,
        employers     : state.employer.data,
        types         : state.aid.types,

        storages      : state.storage.data,

        viewForm      : state.aid.viewForm,
        
        error         : state.aid.error,
        user_info     : JSON.parse(localStorage.getItem('user_info')),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTypeAid     : async()         => {await dispatch(action.getTypeAid())},
        getStorages    : async()         => {await dispatch(actionSto.storageLoad())},
        onDeleteAid    : async(listAids) => {await dispatch(action.aidDelete(listAids))},
        aidLoadDetails : async(id)       => {await dispatch(action.aidLoadDetails(id))},
        onLoadEmployer : async()         => {await dispatch(actionEmp.employerLoad())},
        onPatchAid     : async(id, data) => {await dispatch(action.aidPatch(id, data))},
        setViewForm    : async(isView)   => {await dispatch(action.setViewForm(isView))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableAidsView);