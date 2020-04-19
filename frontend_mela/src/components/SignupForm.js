import React from 'react';

import { Form, Input, Button, Spin, Select, notification } from 'antd';
import { 
    UserOutlined, LockOutlined, HomeOutlined,
    LoadingOutlined, MailOutlined, CommentOutlined
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 35 }} spin />;
const { Option } = Select;

class SignupForm extends React.Component {
    onFinish = values => {
        values = {
            ...values,
            'id_employer' : {
                username : values.username,
                email    : values.email,
                password1: values.password1,
                password2: values.password2
            }
        }
        this.props.onSignup(values);
    };

    componentDidMount() {
        if (this.props.isAuth) {
            this.props.history.push('/profile');
        }
        this.props.onLoadTypes();
    }
    
    getUserError = {
        'username'  : 'ЛОГИН',
        'email'     : 'ПОЧТА',
        'password1' : 'ПАРОЛЬ (1)',
        'password2' : 'ПАРОЛЬ (2)',
        undefined   : 'нет ошибки'
    }

    componentDidUpdate(prevProps) {
        let { error } = this.props;

        if (error !== prevProps.error) {
            if (error) {
                let messageError = '';
                error = error.id_employer;

                for (let value in error) {
                    for (let i = 0; i < error[value].length; i++) {
                        messageError += `Ошибки в ${this.getUserError[value]}:\n${error[value][i]}\n`;
                    }
                }
                notification['error']({
                    message: 'Что-то пошло не так!',
                    description: messageError,
                    className: 'notification-signup'
                });
            }
        }
    }

    render() {
        return (
            <React.Fragment>
            { this.props.loading ?
                <div className='d-flex justify-content-center'>
                    <Spin className='spin-center' indicator={antIcon} />
                </div>
                :
                <React.Fragment>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Введите корректный логин!' }]}
                        >
                            <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="Введите логин" />
                        </Form.Item>
                        <Form.Item className='text-center'>
                            <Form.Item
                                name="password1"
                                rules={[{ required: true, message: 'Введите корректный пароль!' }]}
                                noStyle
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Пароль"
                                />
                            </Form.Item>
                            <span className='text-description'>
                                Пароль должен состоять из 8 символов и включать буквы и цифры!
                            </span>
                        </Form.Item>
                        <Form.Item
                            name="password2"
                            rules={[{ required: true, message: 'Повторите пароль!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Пароль еще раз"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Введите корректную почту!' }]}
                        >
                            <Input
                                prefix={<MailOutlined className="site-form-item-icon" />}
                                type="email"
                                placeholder="Введите почту компании"
                            />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Введите корректное название!' }]}
                        >
                            <Input
                                prefix={<CommentOutlined className="site-form-item-icon" />}
                                
                                placeholder="Введите название компании"
                            />
                        </Form.Item>

                        <Form.Item
                            name="location"
                            rules={[{ required: true, message: 'Введите корректный город!' }]}
                        >
                            <Input
                                prefix={<HomeOutlined className="site-form-item-icon" />}
                                
                                placeholder="Введите город компании"
                            />
                        </Form.Item>

                        <Form.Item
                            name="type_company"
                            rules={[{ required: true, message: 'Выберите тип компании!' }]}
                        >
                            <Select
                                showSearch
                                placeholder="Выберите тип компании"
                                optionFilterProp="children"
                            >
                                {this.props.types.map((type) => (
                                    <Option value={type.id}>{type.name}</Option>
                                ) )}
                            </Select>
                            </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button my-2">
                                Зарегистрироваться
                            </Button>
                            Или <Link to='/login'>войти сейчас!</Link>
                        </Form.Item>
                    </Form>
                    
                </React.Fragment>
            }
            </React.Fragment>

        )
    }
};

export default SignupForm;