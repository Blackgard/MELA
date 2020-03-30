import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginFormCont = (props) => {
    return (
        <div className='container h-100'>
            <div className="row h-100 align-items-center">
                <div className="mx-auto d-block col-xl-4 col-lg-5 col-md-6 col-sm-10 col-10 ">
                    <h5 className='text-center mb-4'>
                        Войдите в аккаунт для работы
                    </h5>
                    <LoginForm {...props} />
                </div>
            </div>
        </div>
    );
}

export default LoginFormCont;