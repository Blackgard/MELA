import React, { useEffect } from 'react';
import TableEmployersContainer from '../containers/TableEmployers';
import { connect } from 'react-redux';
import * as action from '../store/employer/action';

const TableEmployersView = (props) => {
    useEffect(() => {
        document.title = 'Список работников | MELA'
    })
    return <TableEmployersContainer { ...props }/>
}

const mapStateToProps = (state) => {
    return {
        data          : state.employer.data,
        viewForm      : state.employer.viewForm,
        error         : state.employer.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadEmployers : async()       => {await dispatch(action.employerLoad())},
        setViewForm     : async(isView) => {await dispatch(action.setViewForm(isView))},
        addEmployer     : async(data)   => {await dispatch(action.addEmployer(data))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableEmployersView);