import React from 'react';
import EmployerDetails from '../components/EmployerDetails';

const EmployerDetailsContainer = (props) => {
    return (
        <div className='container h-100'>
            <EmployerDetails {...props} />
        </div>
    );
}

export default EmployerDetailsContainer; 