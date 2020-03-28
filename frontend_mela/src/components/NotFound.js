import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default () => (
    <div className='d-flex h-100 justify-content-center align-items-center'>
        <Result
            status="404"
            title="404"
            subTitle="Извините, но похоже, что вы заблудились..."
            extra={<Button type="primary"><Link to='home'>На главную</Link></Button>}
        />
    </div>
)
