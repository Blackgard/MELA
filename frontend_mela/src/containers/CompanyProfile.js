import React from 'react';
import CompanyProfile from '../components/CompanyProfile';

const CompanyProfileContainer = (props) => {
    return (
        <div className='container h-100 mt-3'>
            <CompanyProfile {...props} />
        </div>
    );
}

export default CompanyProfileContainer; 