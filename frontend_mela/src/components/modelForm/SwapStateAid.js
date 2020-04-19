import React from 'react';
import { 
    Modal, Form, notification, message, Select
} from 'antd';

const { Option } = Select;

const getStatus = {
    'Работает'  : 'ok', 
    'Обработка' : 'wait',
    'Ошибка'    : 'err',
    'Создано'   : 'start',
    'Доработка' : 'comp',
    undefined   : ''
}

interface Values {
    state    : string;
    ip      : string;
    type_id : number;
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

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
    status
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            centered
            title="Изменение состояния ЭОП"
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
                    name="status_id"
                    label="Статус"
                    rules={[{ required: true, message: 'Выберите статус!' }]}
                >
                    <Select defaultValue={getStatus[status]}>
                        <Option value='ok'> Работает </Option>
                        <Option value='err'> Ошибка </Option>
                        <Option value='comp'> Доработка </Option>
                        <Option value='wait'> Обработка </Option>
                        <Option value='start'> Создано </Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

class SwapStatusAidForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resetForm  : null,
            upload     : false
        }
    }

    onCreate = async (values, resetFormData) => {
        const formData = new FormData();
        formData.append('status_id', values.status_id)
        await this.props.onPatch(this.props.eop_id, formData);
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
                message.success('Статус успешно сменен!')
                this.state.resetForm();
                this.setState({
                    upload : false
                })
            }
        }
    }

    render() {
        const { visible, setVisible, types, data } = this.props;
        return (
            <div>
                <CollectionCreateForm
                    visible={visible}
                    onCreate={this.onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                    types={types}
                    status={data.status}
                />
            </div>
        )
    }
};

export default SwapStatusAidForm;