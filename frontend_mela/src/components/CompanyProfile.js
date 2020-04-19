import React from 'react';

import {
    PageHeader, Tabs, Button,
    Descriptions, Skeleton, Tag,
    Form, Input, Select, Steps,
    List, Empty, notification,
    Popover, Tooltip, Alert
} from 'antd';

import { QuestionCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AddNewAidForm from './modelForm/AddNewAid';

const { TabPane } = Tabs;
const { Option } = Select;
const { Step } = Steps;

const DescriptionsItems = (props) => {
    let { data, isEdit, types } = props;
    return (
        <Descriptions column={2}>
            <Descriptions.Item label="Почта">
                {isEdit ?
                    <Form.Item name='email' noStyle>
                        <Input defaultValue={data.email} />
                    </Form.Item>
                    :
                    data.email
                }
            </Descriptions.Item>
            <Descriptions.Item label="Город">
                {isEdit ?
                    <Form.Item name='location' noStyle>
                        <Input defaultValue={data.location} />
                    </Form.Item>
                    :
                    data.location
                }
            </Descriptions.Item>
            <Descriptions.Item label="Тип учреждения">
                {isEdit ?
                    <Form.Item name='type_company' noStyle>
                        <Select
                            showSearch
                            placeholder="Выберите тип компании"
                            optionFilterProp="children"
                            defaultValue={data.type}
                            style={{ minWidth: 400 }}
                        >
                            {types.map((type) => (
                                <Option value={type.id}>{type.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    :
                    data.type
                }
            </Descriptions.Item>
            <Descriptions.Item label="Название компании">
                {isEdit ?
                    <Form.Item name='name' noStyle>
                        <Input defaultValue={data.name} />
                    </Form.Item>
                    :
                    data.name
                }
            </Descriptions.Item>
        </Descriptions>
    )
};

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

const menuSaveEditButton = (isEdit) => {
    if (isEdit) {
        return (
            <Form.Item noStyle>
                <Button key="1" type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        )
    }
}

const getStatusName = {
    'finish': 'Выполнено',
    'process': 'В процессе',
    'error': 'Ошибка в предоставленных данных',
    'wait': 'Ожидание выполнения прошлого шага',
    undefined: ''
}

const customDot = (dot, { status, index }) => (
    <Popover
        content={
            <span>
                Шаг {index + 1} статус: {getStatusName[status]}
            </span>
        }
    >
        {dot}
    </Popover>
);


const getStatusNumber = {
    'Работает': 2,
    'Обработка': 1,
    'Ошибка': 1,
    'Создано': 0,
    'Доработка': 1,
    undefined: 0
}

const getStatus = {
    'Работает': 'finish',
    'Обработка': 'process',
    'Ошибка': 'error',
    'Создано': 'process',
    'Доработка': 'process',
    undefined: ''
}

class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        if (!props.user_info) {
            props.history.push('/home')
        }

        this.state = {
            tabsKey: '1',
            isEdit: false,
            viewInfoBlock: true
        }
    }

    company_id = (this.props.user_info && this.props.user_info.id_company)
        || this.props.match.params.id;

    componentDidMount() {
        this.props.onLoad(this.company_id);
        this.props.onLoadTypes();
    }

    componentDidUpdate(prevProps) {
        let { error } = this.props;
        if (error !== prevProps.error) {
            if (error) {
                let messageError = '';
                for (let value in error) {
                    for (let i = 0; i < error[value].length; i++) {
                        messageError += `Ошибки в ${value}:\n${error[value][i]}\n`;
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
        await this.props.onPatch(this.company_id, values);
        this.swapStateEdit()
    };

    handleCloseAlertInfo = () => {
        sessionStorage.setItem('viewInfoBlock', 0);
        this.setState({
            viewInfoBlock: false
        });
    }
    render() {
        let { data, loadingCompany, types, user_info } = this.props;
        let { tabsKey, isEdit, viewInfoBlock } = this.state;

        let isNotEmptyDataAids = data.length === 0 ? false : true;

        let is_staff = false;
        if (user_info) is_staff = user_info.is_staff;

        data = data.length === 0 ? {} : data[0];

        let data_aids = {
            'actual_aids': [],
            'request_aids': []
        };

        if (isNotEmptyDataAids && data) {
            for (let i of data.aids) {
                if (i.status === 'Работает') {
                    data_aids.actual_aids.push(i)
                } 
                data_aids.request_aids.push(i);
            }
        }

        if (sessionStorage.getItem('viewInfoBlock')) {
            viewInfoBlock = Boolean(Number(sessionStorage.getItem('viewInfoBlock')))
        }

        return (
            <React.Fragment>
                {loadingCompany ?
                    <React.Fragment>
                        <Skeleton active avatar paragraph={{ rows: 8 }} />
                        <Skeleton active className='mt-4' paragraph={{ rows: 6 }} />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        { viewInfoBlock && !is_staff? 
                            <Alert 
                                message='Для добавления вашего первого ЭОП Вам необходимо создать заявку, для этого в поле ниже выберите "Заявки на добавление", затем нажмите на кнопку "Создать заявку" и заполните все необходимые поля. После того, как наши сотрудники проверят все введенные Вами данные, будет произведено сохранение Вашего ЭОП на наши сервера. После этого вы сможете просматривать и редактировать ЭОП.'
                                type="info" 
                                showIcon 
                                closable 
                                afterClose={this.handleCloseAlertInfo}
                                className='mb-3'
                            /> : null
                        }
                        <Form
                            name="basic"
                            onFinish={this.onFinish}
                        >
                            <PageHeader
                                className='aid-detail-header'
                                onBack={() => this.props.history.goBack()}
                                title={data.name}
                                extra={[
                                    <Button key="2" type='ghost' onClick={this.swapStateEdit}>
                                        {isEdit ? 'Отмена' : 'Настройки профиля'}
                                    </Button>,
                                    menuSaveEditButton(isEdit)
                                ]}
                                footer={
                                    <Tabs defaultActiveKey={tabsKey} onChange={this.onChangeTabs}>
                                        
                                        <TabPane 
                                        tab={
                                            <React.Fragment>
                                                Активные ЭОП
                                                <Tooltip 
                                                    className='ml-2 '
                                                    title="ЭОП доступные к изучению и администрированию"
                                                    align='center'
                                                    >
                                                    <QuestionCircleFilled  
                                                        className='icon-info'
                                                    />
                                                </Tooltip>
                                            </React.Fragment>
                                        } 
                                        key="1" />
                                        
                                        <TabPane 
                                        tab={
                                            <React.Fragment>
                                                Заявки на добавление
                                                <Tooltip 
                                                    className='ml-2 '
                                                    title="Заявки на размещение Вашего ЭОП у нас на сервере">
                                                    <QuestionCircleFilled 
                                                        className='icon-info'
                                                    />
                                                </Tooltip>
                                            </React.Fragment>
                                        } 
                                        key="2" />
                                    </Tabs>

                                }
                            >
                                <Content>
                                    <DescriptionsItems
                                        data={data}
                                        isEdit={isEdit}
                                        types={types}
                                    />
                                </Content>
                            </PageHeader>
                            <div className='container-fluid aid-detail-other-block'>
                                <div className="row ">
                                    <div className="col">
                                        {(data_aids.actual_aids.length === 0 && tabsKey === '1') ||
                                            (data_aids.request_aids.length === 0 && tabsKey === '2') ?
                                            <Empty
                                                className='mt-5'
                                                description={
                                                    is_staff ?
                                                        <span> Нет размещенных ЭОП </span>
                                                        :
                                                        <div>
                                                            <span> {tabsKey === '1' ? 'У вас нет размещенных ЭОП' : 'У вас нет заявок'}</span>
                                                            <br />
                                                            <Button
                                                                type='primary'
                                                                className='mt-3'
                                                                onClick={() => this.props.setViewForm(true)}
                                                            >
                                                                Создать заявку
                                                            </Button>
                                                        </div>
                                                }
                                            />
                                            :
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={
                                                    tabsKey === '1' ?
                                                        data_aids.actual_aids.reverse()
                                                        :
                                                        data_aids.request_aids.reverse()
                                                }
                                                header={
                                                    tabsKey === '2' && !is_staff ?
                                                        <div className='d-flex justify-content-between align-items-end'>
                                                            <Button
                                                                type='primary'
                                                                onClick={() => this.props.setViewForm(true)}
                                                            >Создать заявку</Button> 
                                                            <span 
                                                                style={{ fontSize: 12 }}
                                                                className='text-description'
                                                            > 
                                                                Наведите на точку, чтобы узнать состояние заявки 
                                                            </span>
                                                        </div>: null
                                                }
                                                renderItem={item => (

                                                    <List.Item
                                                        actions={ tabsKey === '1' || is_staff ?
                                                            [<Link to={`/eops/${item.id}`}>Просмотреть ЭОП</Link>]
                                                            :
                                                            getStatus[item.status] === 'error' ?
                                                                [<Link to={`/eops/${item.id}`}>Исправить</Link>] 
                                                                : null
                                                        }
                                                    >
                                                        <List.Item.Meta
                                                            className='list-meta-desc-short'
                                                            title={
                                                                <Tooltip title='Аббревиатура ЭОП'>
                                                                    {item.short_title}
                                                                </Tooltip>
                                                            }
                                                            description={
                                                                tabsKey === '2' ?
                                                                    <Steps
                                                                        size="small"
                                                                        className='mt-4'
                                                                        current={getStatusNumber[item.status]}
                                                                        status={getStatus[item.status]}
                                                                        progressDot={customDot}
                                                                    >
                                                                        <Step title="Создано" />
                                                                        <Step title="Проверка данных" />
                                                                        <Step title="Одобрено" />
                                                                    </Steps> :
                                                                    <p>{item.title} | {item.serial_number}</p>

                                                            }
                                                        />


                                                        {tabsKey === '1' ?
                                                            <React.Fragment>
                                                                <Tag color='magenta'>{item.device}</Tag>
                                                                <Tag color='gold'>{item.media_r}</Tag>
                                                                <Tag color='green'> {item.language} </Tag>
                                                            </React.Fragment> : null
                                                        }

                                                    </List.Item>
                                                )}
                                            />
                                        }
                                        <AddNewAidForm
                                            {...this.props}
                                            visible={this.props.viewForm}
                                            setVisible={this.props.setViewForm}
                                            onAddAid={this.props.onAddNewAid}
                                            types={this.props.typesAid}
                                            data={data_aids}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </React.Fragment>
                }
            </React.Fragment>

        )
    }
}

export default CompanyProfile;