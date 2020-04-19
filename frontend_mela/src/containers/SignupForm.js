import React from 'react';
import SignupForm from '../components/SignupForm';

const SignupFormContainer = (props) => {
    return (
        <div className='container h-100'>
            <div className="row h-100 align-items-center">
                <div className="mx-auto d-block col-xl-5 col-lg-5 col-md-6 col-sm-10 col-10 ">
                    <h5 className='text-center mb-4'>
                        Регистрация компании
                    </h5>
                    <SignupForm {...props} />
                </div>
            </div>
        </div>
    );
}

export default SignupFormContainer;