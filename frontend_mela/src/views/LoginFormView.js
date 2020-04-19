import React, { useEffect } from 'react';
import LoginFormCont from '../containers/LoginFormCont';
import { connect } from 'react-redux';
import * as action from '../store/auth/action';

const LoginFormView = (props) => {
    useEffect(() => {
        document.title = 'Авторизация | MELA'
    })
    return <LoginFormCont { ...props }/>
}

const mapStateToProps = (state) => {
    return {
        loading     : state.auth.loading,
        error       : state.auth.error,
        isAuth      : localStorage.getItem('token') !== null,
        user_info   : JSON.parse(localStorage.getItem('user_info')),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth : async(username, password) => {await dispatch(action.authLogin(username, password))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormView);