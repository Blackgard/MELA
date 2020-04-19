import React from 'react';
import Customers from '../components/Customers';

const CustomersContainer = (props) => {
    return (
        <div>
            <Customers {...props} />
        </div>
    );
}

export default CustomersContainer; 