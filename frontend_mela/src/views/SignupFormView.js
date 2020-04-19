import React, { useEffect } from 'react';
import SignupFormContainer from '../containers/SignupForm';
import { connect } from 'react-redux';
import * as action from '../store/company/action';


const SignupFormView = (props) => {
    useEffect(() => {
        document.title = 'Регистрация | MELA'
    })
    return <SignupFormContainer { ...props }/>
}

const mapStateToProps = (state) => {
    return {
        loading     : state.company.loadingCompany,
        error       : state.company.error,
        types       : state.company.types
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignup    : async(data) => { await dispatch(action.SignupCompany(data)) },
        onLoadTypes : async()     => { await dispatch(action.getTypeCompany())    }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormView);