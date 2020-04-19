import React, { useEffect } from 'react';
import TableAidsContainer from '../containers/TableAids';
import { connect } from 'react-redux';
import * as action from '../store/aid/action';

const TableAidsView = (props) => {
    useEffect(() => {
        document.title = 'Список ЭОП | MELA'
    })
    return <TableAidsContainer { ...props }/>
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
        onLoadAids   : async()       => {await dispatch(action.aidLoad())},
        setViewForm  : async(isView) => {await dispatch(action.setViewForm(isView))},
        onAddAid     : async(data)   => {await dispatch(action.aidAdd(data))},
        getTypeAid   : async()       => {await dispatch(action.getTypeAid())},
        onDeleteAid  : async(listAids)   => {await dispatch(action.aidDelete(listAids))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableAidsView);