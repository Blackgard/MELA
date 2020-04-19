import React, { useState } from 'react';
import { 
  Modal, Form, Input, 
  Radio, DatePicker, InputNumber, 
  notification, Select, Checkbox, Tooltip } from 'antd';
import moment from 'moment';

const { Option } = Select;

interface Values {
  title: string;
  short_title: string;
  authors    : string;

  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  types: array;
}

const formatDate = 'DD.MM.YYYY';
const formatDateOnServer = 'YYYY-MM-DD';
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  types
}) => {
  const [form] = Form.useForm();
  const [type, setType] = useState('free');
  const optionsCheckBox = [
    { label: 'телефон', value: 'Phone' },
    { label: 'планшет', value: 'Tablet' },
    { label: 'ПК', value: 'Pc' }
  ];

  const optionsCheckBoxMedia = [
    { label: 'фото', value: 'Photo' },
    { label: 'видео', value: 'Video' },
    { label: 'флеш', value: 'Flash' },
    { label: 'другое', value: 'Other' },
    { label: 'смешанное', value: 'All' },
  ]

  return (
    <Modal
      visible={visible}
      style={{ top: 20 }}
      className='modal-add-aid'
      title="Форма создания заявки на добавление ЭОП"
      okText="Создать"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
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
          'language': 'ru',
          'type_access' : 'free'
        }}
        {...layout}
      >
        <Form.Item
          name="title"
          label="Название"
          rules={[{ required: true, message: 'Введите корректное название!' }]}
        >
          <Input placeholder='Введите название ЭОП'/>
        </Form.Item>
        <Form.Item
          name="short_title"
          label="Аббревиатура"
          rules={[{ required: true, message: 'Введите корректное короткое название!' }]}
        >
          <Input placeholder='Введите аббревиатуру ЭОП'/>
        </Form.Item>
        <Form.Item
          name="authors"
          label="Авторы"
          rules={[{ required: true, message: 'Введите авторов!' }]}
        >
          <Input placeholder='Введите авторов через запятую'/>
        </Form.Item>
        <Form.Item
          name="date_public"
          label="Дата публ."
          rules={[{ required: true, message: 'Введите дату публикации!' }]}
        >
          <DatePicker 
          placeholder={moment().format(formatDate)}
          format={formatDate}
          />
        </Form.Item>

        <Form.Item 
          name="language" 
          label="Язык" 
          className="collection-create-form_last-form-item"
          rules={[{ required: true, message: 'Выберите язык!' }]}
        >
          <Radio.Group defaultValue='ru' buttonStyle="solid">
            <Radio.Button value="ru">русский</Radio.Button>
            <Radio.Button value="en">english</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item 
          name="type_access" 
          label="Доступность" 
          className="collection-create-form_last-form-item"
          rules={[{ required: true, message: 'Выберите доступность ЭОП!' }]}
        >
          <Radio.Group onChange={(e) => setType(e.target.value)} buttonStyle="solid">
            <Radio.Button value="free">
              Бесплатное
            </Radio.Button>
            <Radio.Button value="buy">
              Платное
            </Radio.Button>
            <Radio.Button value="demo">
              Демо
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item 
          name="cost" 
          label="Цена" 
          defaultValue={0}
          rules={[{ required: true, message: 'Введите цену!' }]}
        >
          <InputNumber
          defaultValue={0}
          min={0}
          formatter={value => `${value}₽`}
          parser={value => value.replace(/\D/, '').replace('₽', '')}
          disabled={type === 'free' ? true : false}
          /> 
        </Form.Item>

        <Form.Item 
          name="type_id" 
          label="Тип ЭОП" 
          className="collection-create-form_last-form-item"
          rules={[{ required: true, message: 'Выберите тип!' }]}
        >
          <Select
          buttonStyle="solid"
          placeholder='Выберите тип (Наведя на тип - откроется описание типа)'
          >
            {types.map((type) => (
                <Option value={type.id} >
                  <Tooltip 
                    style={{ zIndex: 200, maxWidth: 500}}
                    title={type.description}
                  >
                    {type.name}
                  </Tooltip>
                </Option>
                )
            )}
          </Select>
        </Form.Item>
            
        <Form.Item 
          name="type_device" 
          label="Совместимость с" 
          rules={[{ required: true, message: 'Выберите совместимые устройства!' }]}
        >
          <Checkbox.Group options={optionsCheckBox}/>
        </Form.Item>

        <Form.Item 
          name="media" 
          label="Встроенные медиа" 
          rules={[{ required: true, message: 'Выберите встроенные в ЭОП медиа!' }]}
        >
          <Checkbox.Group options={optionsCheckBoxMedia}/>
        </Form.Item>

        <Form.Item name="publisher" label="Издатель">
          <Input placeholder='Введите издательство (Если есть)' />
        </Form.Item>

        <Form.Item name="key_words" label="Ключевые слова">
          <Input placeholder='Введите ключевые слова через запятую' />
        </Form.Item>

        <Form.Item name="additional_req" label="Доп. требования">
          <Input.TextArea placeholder='Введите дополнительные требования для работы вашего ЭОП'/>
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <Input.TextArea placeholder='Введите описание вашего ЭОП'/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

class AddNewAidForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        resetForm  : null,
        upload     : false
    }
  }

  componentDidMount() {
    this.props.getTypeAid()
  }

  onCreate = async (values, resetFormData) => {
    let { user_info } = this.props;
    values.date_public = values.date_public.format(formatDateOnServer);

    if (user_info.is_staff) {
      values.status_id = 'wait';
    } else {
      values.id_company = user_info.id_company;
    }

    if (values.type_device) {
      let typeDevice = '';
      values.type_device.forEach((elem) => typeDevice += elem);
      values = {
        ...values,
        type_device : typeDevice
      }
    }

    if (values.media) {
      let mediaChoice = '';
      values.media.every((elem) => {
        if (elem === 'All') {
          mediaChoice = 'All';
          return false
        }
        mediaChoice += elem
        return true
      });
      values = {
        ...values,
        media : mediaChoice
      }
    }
    
    await this.props.onAddAid(values);

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

export default AddNewAidForm;