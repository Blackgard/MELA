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
        loading     : state.aid.loading,
        error       : state.aid.error,
        data        : state.aid.data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadAids : async() => {await dispatch(action.aidLoad())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableAidsView);