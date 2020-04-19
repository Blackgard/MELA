import React from 'react';
import Reporting from '../components/Reporting';

const ReportingContainer = (props) => {
    return (
        <div className='container-fluid h-100'>
            <Reporting {...props} />
        </div>
    );
}

export default ReportingContainer;