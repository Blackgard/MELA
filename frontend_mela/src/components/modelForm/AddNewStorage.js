import React from 'react';
import { 
    Modal, Form, Input, notification, Radio  
} from 'antd';

interface Values {
    name    : string;
    ip      : string;
    type_id : number;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
    types
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            centered
            title="Форма создания нового хранилища"
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
                {...layout}
            >
                <Form.Item
                    name="name"
                    label="Наименование"
                    rules={[{ required: true, message: 'Введите корректное имя!' }]}
                >
                    <Input placeholder='Введите название сервера' />
                </Form.Item>
                <Form.Item
                    name="ip"
                    label="ip хранилища"
                    rules={[{ required: true, message: 'Введите корректное ip!' }]}
                >
                    <Input placeholder='255.255.255.255' />
                </Form.Item>

                <Form.Item 
                    name="type_id" 
                    label="Тип хранилища" 
                    rules={[{ required: true, message: 'Выберите тип хранилища!' }]}
                >
                    <Radio.Group buttonStyle="solid">
                        {types.map((type) => <Radio.Button value={type.id}>{type.name}</Radio.Button>)}
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

class AddNewStorageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resetForm  : null,
            upload     : false
        }
    }

    onCreate = async (values, resetFormData) => {
        await this.props.onAdd(values);
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

export default AddNewStorageForm;