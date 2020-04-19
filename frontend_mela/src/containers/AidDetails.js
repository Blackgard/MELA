import React from 'react';
import AidDetails from '../components/AidDetails';

const AidDetailsContainer = (props) => {
    return (
        <div className='container h-100 mt-3'>
            <AidDetails {...props} />
        </div>
    );
}

export default AidDetailsContainer; 