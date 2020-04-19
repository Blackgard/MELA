
import React, { useEffect } from 'react';
import ApplicationsContainer from '../containers/TableApplications';
import { connect } from 'react-redux';
import * as action from '../store/aid/action';

const TableApplicationsView = (props) => {
    useEffect(() => {
        document.title = 'Заявки | MELA'
    })
    return <ApplicationsContainer { ...props }/>
}

const mapStateToProps = (state) => {
    return {
        loadingCompany : state.aid.loadingCompany,
        data           : state.aid.data,
        error          : state.aid.error,
        types          : state.aid.types
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad        : async()     => {await dispatch(action.aidLoad())},
        onDelete      : async(list) => {await dispatch(action.aidDelete(list))},
        getTypeAid    : async()     => {await dispatch(action.getTypeAid())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TableApplicationsView);