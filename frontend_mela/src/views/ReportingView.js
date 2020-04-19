import React, { useEffect } from 'react';
import ReportingContainer from '../containers/Reporting';
import { connect } from 'react-redux';
import * as actionAid from '../store/aid/action';

const ReportingView = (props) => {
    useEffect(() => {
        document.title = 'Отчетность | MELA'
    })
    return <ReportingContainer { ...props }/>
}



const mapStateToProps = (state) => {
    return {
        loadingTypes  : state.aid.loadingTypes,
        loadingAids   : state.aid.loadingAids,
        loadingDelete : state.aid.loadingDelete,

        data          : state.aid.data,
        types         : state.aid.types,

        viewForm      : state.aid.viewForm,
        error         : state.aid.error,
        user_info   : JSON.parse(localStorage.getItem('user_info')),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadAids   : async()       => {await dispatch(actionAid.aidLoad())},
        getTypeAid   : async()       => {await dispatch(actionAid.getTypeAid())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportingView);