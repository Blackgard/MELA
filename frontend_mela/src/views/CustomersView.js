import React, { useEffect } from 'react';
import CustomersContainer from '../containers/Customers';
import { connect } from 'react-redux';
import * as action from '../store/company/action';

const CustomersView = (props) => {
    useEffect(() => {
        document.title = 'Пользователи | MELA'
    })
    return <CustomersContainer { ...props }/>
}

const mapStateToProps = (state) => {
    return {
        loadingCompany : state.company.loadingCompany,
        data           : state.company.data,
        error          : state.company.error,
        types          : state.company.types
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoad        : async()     => {await dispatch(action.companyLoad())},
        onDelete      : async(list) => {await dispatch(action.companyDelete(list))},
        onLoadTypes   : async()     => {await dispatch(action.getTypeCompany())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomersView);