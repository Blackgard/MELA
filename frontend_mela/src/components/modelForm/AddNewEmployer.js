import React from 'react';
import { 
    Modal, Form, Input, 
    DatePicker, Divider, notification  
} from 'antd';

import moment from 'moment';
import InputMask from "react-input-mask";

interface Values {
    first_name  : string;
    second_name : string;
    login       : string;
    password    : string;
    email       : string;
    phone       : string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

const formatDate = 'DD.MM.YYYY';
const formatDateOnServer = 'YYYY-MM-DD';

function disabledDate(current) {
    return current && current > moment().endOf('day');
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel
}) => {
    const [form] = Form.useForm();

    const compareToFirstPassword = (rule, value, callback) => {
        const _form = form;

        if (value && value !== _form.getFieldValue('password1')) {
            callback('Пароли должны совпадать!');
        } else {
            callback();
        }
    }

    return (
        <Modal
            visible={visible}
            centered
            title="Форма создания нового сотрудника"
            okText="Создать"
            cancelText="Отмена"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onCreate(values, form.resetFields);
                    })
            }}
        >
            <Form
                form={form}
                layout="horizontal"
                name="form_in_modal"
                size='middle'
                initialValues={{
                    'cost': 0,
                    'language': 'ru'
                }}
                {...layout}
            >
                <Form.Item
                    name="username"
                    label="Логин"
                    rules={[{ required: true, message: 'Введите корректный логин!' }]}
                >
                    <Input placeholder='Введите логин' />
                </Form.Item>
                <Form.Item
                    name="password1"
                    label="Пароль"
                    rules={[{ required: true, message: 'Введите корректный пароль!' }]}
                >
                    <Input.Password placeholder='Введите пароль' />
                </Form.Item>

                <Form.Item
                    name="password2"
                    label="Еще пароль"
                    rules={[
                        { required: true, message: 'Введите корректный пароль!' },
                        { validator : compareToFirstPassword}
                    ]}
                >
                    <Input.Password placeholder='Введите пароль еще раз' />
                </Form.Item>

                <Divider> Дополнительная информация </Divider>

                <Form.Item
                    name="first_name"
                    label="Имя"
                    rules={[{ required: true, message: 'Введите корректное имя!' }]}
                >
                    <Input placeholder='Введите имя сотрудника' />
                </Form.Item>

                <Form.Item
                    name="last_name"
                    label="Фамилия"
                    rules={[{ required: true, message: 'Введите корректную фамилию!' }]}
                >
                    <Input placeholder='Введите фамилию сотрудника' />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Почта"
                    rules={[{ required: true, message: 'Введите корректную почту!', type: 'email' }]}
                >
                    <Input placeholder='example@gmail.com'/>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Телефон"
                    rules={[{ required: true, message: 'Введите корректный телефон!'}]}
                >
                    <InputMask 
                        className='ant-input'
                        mask="+7 (999) 999-99-99" 
                        placeholder="+7 (999) 999-99-99"
                    />
                </Form.Item>

                <Form.Item
                    name="brith_date"
                    label="Дата рождения"
                >
                    <DatePicker 
                        placeholder={moment().format(formatDate)}
                        format={formatDate}
                        disabledDate={disabledDate}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

class AddNewEmployerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resetForm  : null,
            upload     : false
        }
    }

    onCreate = async (values, resetFormData) => {
        values = {
            ...values,
            is_staff  : true,
            is_active : true,
            brith_date: values.brith_date && values.brith_date.format(formatDateOnServer)
        }
        
        await this.props.addEmployer(values);
        this.setState({
            resetForm  : resetFormData,
            upload     : true
        });
    };

    componentDidUpdate(prevProps) {
        let { upload } = this.state;
        let { error, setVisible, data } = this.props;

        if (error !== prevProps.error) {
            if (error) {
                let messageError = '';
                for (let value in error) {
                    for (let i = 0; i < error[value].length; i++) {
                        messageError += `${value} -> ${error[value][i]}\n`;
                    }
                }
                notification['error']({
                    message: 'Что-то пошло не так!',
                    description: messageError,
                    className: 'notification-signup'
                });
            }
        }
        if (data !== prevProps.data && upload) {
            if (!error) {
                setVisible(false);
                this.state.resetForm();
                this.setState({
                    upload : false
                })
            }
        }
    }

    render() {
        const { visible, setVisible, types } = this.props;
        return (
            <div>
                <CollectionCreateForm
                    visible={visible}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                    types={types}
                />
            </div>
        )
    }
};

export default AddNewEmployerForm;