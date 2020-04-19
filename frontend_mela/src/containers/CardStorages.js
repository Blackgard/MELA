import React from 'react';
import Storages from '../components/Storages';

const CardStoragesContainer = (props) => {
    return (
        <div className='container-fluid h-100'>
            <Storages {...props} />
        </div>
    );
}

export default CardStoragesContainer; 