import React from 'react';

import { 
    PageHeader, Tabs, Button,
    Descriptions, Skeleton, Tag, 
    Popconfirm, Form, Input, DatePicker,
    List, Empty, notification
} from 'antd';

import { Link } from 'react-router-dom';
import moment from 'moment';
import InputMask from "react-input-mask";

const { TabPane } = Tabs;


const formatDate = 'DD.MM.YYYY';
const formatDateOnServer = 'YYYY-MM-DD';

const DescriptionsItems = (props) => {
    let { data, isEdit } = props;
    let first_name = ''; 
    let last_name = '';

    if (data.name) {
        first_name = data.name.first
        last_name  = data.name.last
    }

    let dpBrithDate = null;
    if (data.brith_date === 'Не установлена') dpBrithDate = moment()
    else dpBrithDate = moment(data.brith_date, formatDate)

    return (
    <Descriptions column={3}>
        <Descriptions.Item label="Почта">
            { isEdit? 
                <Form.Item name='email' noStyle>
                    <Input defaultValue={data.email} />
                </Form.Item>
                :
                data.email
            }
        </Descriptions.Item>
        <Descriptions.Item label="Логин">
            { isEdit? 
                <Form.Item name='username' noStyle>
                    <Input defaultValue={data.username} />
                </Form.Item>
                :
                data.username 
            }
        </Descriptions.Item>
        
        <Descriptions.Item label="Имя">
            { isEdit? 
                <Form.Item name='first_name' noStyle>
                    <Input defaultValue={first_name} />
                </Form.Item>
                :
                first_name
            }
        </Descriptions.Item>

        <Descriptions.Item label="День рождения">
            { isEdit? 
                <Form.Item name='brith_date' noStyle>
                    <DatePicker 
                        defaultValue={dpBrithDate}
                        placeholder={moment().format(formatDate)}
                        format={formatDate}
                    />
                </Form.Item>
                :
                data.brith_date
            }
        </Descriptions.Item>

        <Descriptions.Item label="Телефон">
            { isEdit? 
                <Form.Item name='phone' noStyle>
                    <InputMask 
                        className='ant-input'
                        mask="+7 (999) 999-99-99" 
                        placeholder="+7 (999) 999-99-99"
                        defaultValue={data.phone} 
                    />
                </Form.Item>
                :
                data.phone
            }
        </Descriptions.Item>

        <Descriptions.Item label="Фамилия">
            { isEdit? 
                <Form.Item name='last_name' noStyle>
                    <Input defaultValue={last_name} />
                </Form.Item>
                :
                last_name
            }
        </Descriptions.Item>
    </Descriptions>
)};

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

const getColorStatus = {
    'Работает'  : 'green', 
    'Обработка' : 'orange',
    'Ошибка'    : 'volcano',
    'Создано'   : 'blue',
    'Доработка' : 'lime',
    undefined   : 'purple'
}


class AidDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabsKey : '1',
            isEdit  : false
        }
    }

    employer_id = this.props.match.params.id;

    componentDidMount() {
        this.props.onLoadEmployer(this.employer_id);
        this.props.onLoadAidList(this.employer_id);
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
        let brith_date = values.brith_date ? values.brith_date.format(formatDateOnServer) : undefined
        values = {
            ...values,
            brith_date: brith_date
        }

        let id_user = this.props.data[0].user.id_obj_user;
        await this.props.onPatchEmployer(id_user, this.employer_id, values);
        this.swapStateEdit()
    };

    render() {
        let { data, loadingEmployer, listAids  } = this.props;
        let { tabsKey, isEdit } = this.state;

        data = data.length === 0 ?  {} : data[0].user;

        return (
            <React.Fragment>
            {loadingEmployer ? 
                <React.Fragment>
                    <Skeleton active avatar paragraph={{ rows: 8 }}/>
                    <Skeleton active className='mt-4' paragraph={{ rows: 6 }}/>
                </React.Fragment>
                :
                <React.Fragment>
                    <Form
                        name="basic"
                        onFinish={this.onFinish}
                    >
                        <PageHeader
                            className='aid-detail-header'
                            onBack={() => this.props.history.goBack()}
                            title={data.full_name}
                            extra={[
                                <Popconfirm
                                    title="Вы уверены что хотите удалить данного сотрудника?"
                                    okText="Да"
                                    onConfirm={() => {
                                        this.props.onDeleteEmployer([this.employer_id]);
                                        this.props.history.goBack();
                                    }}
                                    cancelText="Отмена"
                                >
                                    <Button key="3" type='danger' className='mr-3'>Удалить</Button>
                                </Popconfirm>,
                                <Button key="2" type='ghost' onClick={this.swapStateEdit}>
                                    {isEdit ? 'Отмена' : 'Изменить'}
                                </Button>,
                                menuSaveEditButton(isEdit)
                            ]}
                            footer={
                                <Tabs defaultActiveKey={tabsKey} onChange={this.onChangeTabs}>
                                    <TabPane tab="ЭОП под руководством" key="1" />
                                </Tabs>
                            }
                        >
                            <Content>
                               <DescriptionsItems 
                                data={data} 
                                isEdit={isEdit}
                               />
                            </Content>
                        </PageHeader>
                        <div className='container-fluid aid-detail-other-block'>
                            <div className="row ">
                                <div className="col">
                                    { listAids.length === 0 ?
                                        <Empty 
                                            className='mt-5'
                                            description={
                                                <span> У данного работника не найдено обслуживаемых им ЭОП </span>
                                            }
                                        />
                                        :
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={listAids}
                                            renderItem={item => (
                                                <List.Item 
                                                actions={[<Link to={`/eops/${item.id}`}>Изменить</Link>]}
                                                >
                                                    <List.Item.Meta
                                                        title={item.short_title}
                                                        description={
                                                            item.serial_number
                                                        }
                                                    />
                                                    
                                                    <Tag color='blue'>{item.type.name}</Tag>
                                                    <Tag color={getColorStatus[item.status]}>{item.status}</Tag>
                                                    <Tag color='green'> {item.language} </Tag>
                                                </List.Item>
                                            )}
                                        />
                                    }
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

export default AidDetails;