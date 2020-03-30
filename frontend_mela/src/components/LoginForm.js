import React, { useEffect } from 'react';

import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;

const LoginForm = (props) => {
    const onFinish = values => {
        props.onAuth(values.username, values.password);
    };

    useEffect(() =>  {
        console.log(props.error);
        if (props.isAuth) {
            props.history.push('/home');
        }
    })

    return (
        <React.Fragment>
        { props.loading ?
            <div className='d-flex justify-content-center'>
                <Spin className='spin-center' indicator={antIcon} />
            </div>
            :
            <React.Fragment>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Введите корректный логин!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Введите корректный пароль!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Пароль"
                        />
                    </Form.Item>
                    <Form.Item noStyle>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button my-2">
                            Войти
                        </Button>
                        Или <Link to='/signup'>зарегистрируйтесь сейчас!</Link>
                    </Form.Item>
                    <div className='error-block'>
                        {props.error}
                    </div>
                </Form>
                
            </React.Fragment>
        }
        </React.Fragment>
    );
};

export default LoginForm;