import React, { useState } from 'react';

import { 
    PageHeader, Tabs, Button, Select ,
    Statistic, Descriptions, Skeleton,
    Tag, Popconfirm, Form, Input, DatePicker,
    Upload, Radio, message, Empty, Tooltip,
    Checkbox
} from 'antd';

import { UploadOutlined, SafetyOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import SwapStatusAidForm from './modelForm/SwapStateAid';

const { TabPane } = Tabs;
const { Option } = Select;

const formatDate = 'DD.MM.YYYY';
const formatDateOnServer = 'YYYY-MM-DD';

const downloadFileEula = (url) => {
    window.location.href = url;
}

const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const DescriptionsItems = (props) => {
    const [fileList, setFileList] = useState([]);

    let { data, employers, isEdit, types, storages, is_staff } = props;
    
    let actEmployer = data.employer ? data.employer : null;
    let infoCompany = data.company ? data.company : null;
    let infoStorage = data.storage ? data.storage : null;
    let infoType    = data.type    ? data.type : {};

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
    console.log(infoStorage);
    return (
    <Descriptions column={2}>
        <Descriptions.Item label="Название">
            { isEdit? 
                <Form.Item name='title' noStyle>
                    <Input defaultValue={data.title} />
                </Form.Item>
                :
                data.title
            }
        </Descriptions.Item>
        <Descriptions.Item label="Авторы">
            { isEdit? 
                <Form.Item name='authors' noStyle>
                    <Input defaultValue={data.authors} />
                </Form.Item>
                :
                data.authors
            }
        </Descriptions.Item>
        <Descriptions.Item label="Язык">
            { isEdit? 
                <Form.Item name='language' noStyle>
                    <Radio.Group defaultValue='ru' buttonStyle="solid">
                        <Radio.Button value="ru">русский</Radio.Button>
                        <Radio.Button value="en">english</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                :
                data.language
            }
        </Descriptions.Item>
        <Descriptions.Item label="Серийный номер">
            { isEdit && is_staff ? 
                <Form.Item name='serial_number' noStyle>
                    <Input defaultValue={data.serial_number} />
                </Form.Item>
                :
                data.serial_number
            }
        </Descriptions.Item>
        <Descriptions.Item label="Тип ЭОП">
            { isEdit? 
                <Form.Item name='type_id' noStyle>
                    <Select defaultValue={infoType.name} style={{ minWidth: 300 }}>
                        {types.map((type) => (
                            <Option value={type.id} >
                                <Tooltip 
                                style={{ zIndex: 200, maxWidth: 500}}
                                title={type.description}
                                >
                                {type.name}
                                </Tooltip>
                          </Option>
                        ) )}
                    </Select>
                </Form.Item>
                :
                infoType.name
            }
        </Descriptions.Item>
        <Descriptions.Item label="Дата публикации">
            { isEdit? 
                <Form.Item name='date_public' noStyle>
                    <DatePicker 
                        defaultValue={moment(data.date_public, formatDate)}
                        placeholder={moment().format(formatDate)}
                        format={formatDate}
                    />
                </Form.Item>
                :
                data.date_public
            }
        </Descriptions.Item>
        
        <Descriptions.Item label="Лицензия">
        {isEdit? 
            <React.Fragment>
                <Form.Item 
                    name="eula"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    noStyle
                >
                    <Upload
                        accept=".txt, .docx, .jpg, .jpeg, .png"
                        showUploadList={false}
                        beforeUpload={ file => {
                            setFileList([file]);
                            return false;
                        }}
                    >
                        <Button>
                            {fileList.length > 0 ? 
                            <React.Fragment>
                                <SafetyOutlined 
                                style={{ fontSize: '18px'}}
                                /> {fileList[0].name}
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <UploadOutlined /> Выберите файл
                                </React.Fragment>
                            }
                        </Button>
                    </Upload>
                </Form.Item>
            </React.Fragment>
            :
            <React.Fragment>
                { !data.eula ?
                    'Не найдена' 
                    :
                    <Link onClick={() => downloadFileEula(data.eula)}> Скачать </Link>
                }
            </React.Fragment>
        }
        </Descriptions.Item>
        <Descriptions.Item label="Компания владелец">
            { infoCompany === null ?
                'Не найдено' 
                :
                <React.Fragment>
                    { is_staff ? 
                        <Link to={`/customers/${infoCompany.id}`}>
                            {infoCompany.name}
                        </Link> 
                    : 
                        infoCompany.name
                    }
                </React.Fragment>
                
            }
        </Descriptions.Item>

        <Descriptions.Item label="Ключевые слова">
            { isEdit? 
                <Form.Item name='key_words' noStyle>
                    <Input defaultValue={data.key_words} />
                </Form.Item>
                :
                data.key_words || 'Не указано'
            }
        </Descriptions.Item>

        <Descriptions.Item label="Издание">
            { isEdit? 
                <Form.Item name='publisher' noStyle>
                    <Input defaultValue={data.publisher} />
                </Form.Item>
                :
                data.publisher || 'Не указано'
            }
        </Descriptions.Item>

        <Descriptions.Item label="Совместимость с">
            { isEdit? 
                <Form.Item 
                    name="type_device" 
                >
                    <Checkbox.Group options={optionsCheckBox}/>
                </Form.Item>
                :
                data.device || 'Не указано'
            }
        </Descriptions.Item>

        <Descriptions.Item label="Медиа">
            { isEdit ? 
                <Form.Item 
                    name="media" 
                >
                    <Checkbox.Group options={optionsCheckBoxMedia}/>
                </Form.Item>
                :
                data.media_r || 'Не указано'
            }
        </Descriptions.Item>

        <Descriptions.Item label="Доступность">
            { isEdit ? 
                <Form.Item 
                    name="type_access" 
                >
                    <Radio.Group buttonStyle="solid">
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
                :
                data.access || 'Не указано'
            }
        </Descriptions.Item>

        <Descriptions.Item label="Руководящий">
            {isEdit && is_staff ? 
                <Form.Item name='employer_id' noStyle>
                    <Select defaultValue={actEmployer && actEmployer.id} style={{ minWidth: 300 }}>
                        {employers.map((emp) => (
                            <Option value={emp.id}>{emp.user.full_name}</Option>
                        ) )}
                    </Select>
                </Form.Item>
                :
                <React.Fragment>
                    { actEmployer === null ?
                    'Не назначен' 
                    :
                    <Link to={`/employers/${actEmployer.id}`}>
                        {actEmployer.name}
                    </Link>
                    }
                </React.Fragment>
            }
        </Descriptions.Item>

        <Descriptions.Item label="Хранилище">
            {isEdit && is_staff ? 
                <Form.Item name='storage_id' noStyle>
                    <Select defaultValue={infoStorage && infoStorage.id} style={{ minWidth: 300 }}>
                        {storages.map((str) => (
                            <Option value={str.id}>{str.name}</Option>
                        ) )}
                    </Select>
                </Form.Item>
                :
                <React.Fragment>
                    { infoStorage === null ?
                        'Не размещено' 
                        :
                        <React.Fragment>
                            { is_staff ? 
                            <Link to='/storages'>{infoStorage.name}</Link> : infoStorage.name
                            }
                        </React.Fragment>
                    }
                </React.Fragment>
            }
        </Descriptions.Item>
    </Descriptions>
)};

const getColorStatus = {
    'Работает'  : 'green', 
    'Обработка' : 'orange',
    'Ошибка'    : 'volcano',
    'Создано'   : 'blue',
    'Доработка' : 'lime',
    undefined   : 'purple'
}

const extraContent = (data, isEdit) => (
    <React.Fragment>
        { isEdit?
        <div className='d-flex flex-column align-items-center'>
            <div className='ant-statistic-title'> Цена </div>
            <Form.Item name='cost' noStyle>
                <Input 
                size='large'
                style={{ maxWidth: '100px'}}
                defaultValue={data.cost}
                suffix={ data.language === 'ru' ? '₽' : '$'}
                />
            </Form.Item>
        </div>
        :
        <Statistic title="Цена" suffix={ data.language === 'ru' ? '₽' : '$'} value={data.cost} />
        }
    </React.Fragment>
);

const Content = ({ children, extra }) => {
    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col">{children}</div>
                <div className="col-auto d-flex align-items-end">{extra}</div>
            </div>
        </div>
    );
};

const menuEditButton = (isEdit, props, swapStateEdit, eop_id, setViewForm, is_staff) => {
    let { error, onDeleteAid, history } = props;
    return ([
        <React.Fragment>
            { !isEdit && is_staff ?
                <Button type='primary' className='mr-3' onClick={() => setViewForm(true)}>
                    Изменить статус
                </Button> : null
            }
        </React.Fragment>,
        <React.Fragment>
            { isEdit ?
                <Popconfirm
                    title="Вы уверены что хотите удалить данное ЭОП?"
                    onConfirm={async () => {
                        await onDeleteAid([eop_id]);
                        if (!error) {
                            history.goBack();
                        }
                    }}
                    okText="Да"
                    cancelText="Отмена"
                >
                    <Button key="3" type='danger' className='mr-3'>Удалить ЭОП</Button>
                </Popconfirm> : null
            }
        </React.Fragment>,
        <Button key="2" type='ghost' onClick={() => swapStateEdit()}>
            {isEdit ? 'Отмена' : 'Изменить данные'}
        </Button>,
        <Form.Item noStyle>
            { isEdit ?
                <Button key="1" type="primary" htmlType="submit">
                    Сохранить
                </Button> : null
            }
        </Form.Item>,
    ])
}

const ShowDescAndBody = (props) => {
    let { data, isEdit, tabsKey, isStorageActive, is_staff } = props;
    if (isStorageActive) {
        if (isEdit) {
            return (
                <React.Fragment>
                    <Form.Item name='description' noStyle>
                        <TextArea
                            placeholder='Введите описание'
                            autoSize
                            className={tabsKey === '1' ? null : 'd-none'}
                        />
                    </Form.Item>
                    <Form.Item name='body' noStyle>
                        <TextArea
                            placeholder='Введите тело ЭОП'
                            autoSize
                            className={tabsKey === '2' ? null : 'd-none'}
                        />
                    </Form.Item>

                    <Form.Item name='additional_req' noStyle>
                        <TextArea
                            placeholder='Введите дополнительные требования для работы вашего ЭОП'
                            autoSize
                            className={tabsKey === '3' ? null : 'd-none' }
                        />
                    </Form.Item>
                </React.Fragment>
            )
        } else {
            switch (tabsKey) {
                case '1':
                    return data.description || 'Описание не найдено';
                case '2':
                    return data.body || 'Тело не найдено';
                case '3':
                    return data.additional_req || 'Дополнительные требования не найдены';
                default:
                    return 'Не найдено'
            }
        }
    } else {
        return (
            <Empty
                image="https://image.flaticon.com/icons/svg/2818/2818743.svg"
                imageStyle={{
                height: 60,
                }}
                className='mt-5'
                description={
                <div>
                    { is_staff?
                        <div>
                            <span>Что-то не так с сервером! Возможные причины:</span>
                            <ol style={{ padding: 0 }}> 
                                <li className='mt-2'>
                                    Он выключен (поверьте включен ли он <Link to='/storages'>Клик</Link>)
                                </li> 
                                <li>ЭОП не сохранен на сервер (В настройках выше укажите хранилище)</li> 
                            </ol> 
                        </div>
                        : 
                        <span>
                            Что-то не так с сервером!<br/>
                            Зайдите позже, возможно, прямо сейчас мы проводим профилактические работы.
                        </span>
                    }
                </div>
                }
            />
        )
    }
}

class AidDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsKey : '1',
            isEdit  : false
        }
    }

    eop_id = this.props.match.params.id;

    componentDidMount() {
        this.props.aidLoadDetails(this.eop_id);
        this.props.getTypeAid();
        this.props.onLoadEmployer();
        this.props.getStorages();
    }

    componentDidUpdate() {
        let { error } = this.props;

        if (error) {
            message.error(error);
        }
    }

    onChangeTabs = (key) => {
        this.setState({
            tabsKey: key
        })
    }

    swapStateEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    onFinish = async (values) => {
        let date_public = values.date_public ? values.date_public.format(formatDateOnServer) : undefined
        values = {
            ...values,
            date_public   : date_public,
            eula          : values.eula && values.eula[0].originFileObj
        }

        if (values.type_device) {
            let typeDevice = '';
            values.type_device.forEach((elem) => typeDevice += elem);
            values = {
                ...values,
                type_device: typeDevice
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
                media: mediaChoice
            }
        }

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value || value === '') {
                formData.append(String(key), value)
            }
        })

        console.log(values)
        
        await this.props.onPatchAid(this.eop_id, formData);
        
        this.swapStateEdit()
    };

    render() {
        let { 
            data, loadingAids, employers, 
            types, storages, user_info, 
            setViewForm, 
        } = this.props;

        let { tabsKey, isEdit } = this.state;

        data = data.length === 0 ?  {} : data[0];

        let isStorageActive = false;
        if (data.storage) {
            for (let str of storages) {
                if (str.id === data.storage.id) {
                    isStorageActive = str.status;
                }
            }
        }

        return (
            <React.Fragment>
            {loadingAids ? 
                <React.Fragment>
                    <Skeleton active paragraph={{ rows: 8 }}/>
                    <Skeleton active className='mt-4' paragraph={{ rows: 6 }}/>
                </React.Fragment>
                :
                <React.Fragment>
                    <Form
                        name="basic"
                        onFinish={this.onFinish}
                        initialValues={{
                            'body': data.body,
                            'description': data.description,
                            'additional_req' : data.additional_req
                        }}
                    >
                        <PageHeader
                            className='aid-detail-header'
                            onBack={() => this.props.history.goBack()}
                            title={
                            <span className='d-flex align-items-center'>
                                { isEdit? 
                                    <Form.Item name='short_title' noStyle>
                                        <Input defaultValue={data.short_title}/> 
                                    </Form.Item>
                                    : 
                                    data.short_title
                                }
                                <Tag 
                                    color={getColorStatus[data.status]} 
                                    className='ml-3 text-tag text-no-bold'
                                >
                                    {data.status}
                                </Tag>
                            </span>
                            }
                            extra={menuEditButton(
                                isEdit, this.props, this.swapStateEdit, this.eop_id, 
                                setViewForm, user_info.is_staff
                                )}
                            footer={
                                <Tabs defaultActiveKey={tabsKey} onChange={this.onChangeTabs}>
                                    <TabPane tab="Описание ЭОП" key="1" />
                                    <TabPane tab="Доп. требования" key="3" />
                                    <TabPane tab="Тело ЭОП" key="2" />
                                </Tabs>
                            }
                        >
                            <Content extra={extraContent(data, isEdit)}>
                               <DescriptionsItems 
                                data={data} 
                                isEdit={isEdit} 
                                employers={employers}
                                types={types}
                                storages={storages}
                                is_staff={user_info.is_staff}
                               />
                            </Content>
                        </PageHeader>
                        <div className='container-fluid aid-detail-other-block'>
                            <div className="row">
                                <div className="col">
                                    <ShowDescAndBody 
                                        isEdit={isEdit}
                                        data={data}
                                        tabsKey={tabsKey}
                                        isStorageActive={isStorageActive}
                                        is_staff={user_info.is_staff}
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                    <SwapStatusAidForm 
                        visible={this.props.viewForm} 
                        setVisible={this.props.setViewForm}
                        onPatch={this.props.onPatchAid}
                        eop_id={this.eop_id}
                        data={data}
                        user_info={user_info}
                    />
                </React.Fragment>

            }
            </React.Fragment>
        )
    }
}

export default AidDetails;