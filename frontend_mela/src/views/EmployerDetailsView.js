import React, { useEffect } from 'react';
import EmployerDetailsContainer from '../containers/EmployerDetails';
import { connect } from 'react-redux';
import * as action from '../store/employer/action';

const TableAidsView = (props) => {
    useEffect(() => {
        document.title = 'Сотрудник | MELA'
    })
    return <EmployerDetailsContainer { ...props }/>
}

const mapStateToProps = (state) => {
    return {
        loadingEmployer : state.employer.loadingEmployer,
        data            : state.employer.data,
        listAids        : state.employer.listAids,
        error           : state.employer.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadEmployer  : async(id)       => {await dispatch(action.employerLoadDetails(id))},
        onLoadAidList   : async(id)       => {await dispatch(action.employerLoadAidList(id))},
        onPatchEmployer : async(id_user, id_emp, data) => {await dispatch(action.employerPatch(id_user, id_emp, data))},
        onDeleteEmployer: async(list)     => {await dispatch(action.employerDelete(list))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableAidsView);