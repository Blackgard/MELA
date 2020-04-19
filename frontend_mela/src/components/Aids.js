import React from 'react';

import { Table, Tag, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import AddNewAidForm from './modelForm/AddNewAid';

const getColorStatus = {
    'Работает'  : 'green', 
    'Обработка' : 'orange',
    'Ошибка'    : 'volcano',
    'Создано'   : 'blue',
    'Доработка' : 'lime',
    undefined   : 'purple'
}

export const columns = [
    {
        title: 'Название',
        dataIndex: 'short_title',
        key: 'short_title',
        render: (title, obj) => ( <Link to={`/eops/${obj.id}`}> {title} </Link>)
    },
    {
        title: 'Клиент',
        dataIndex: 'company',
        key: 'company',
        render: (_, obj) => {
            if (obj.company)
                return <Link to={`/customers/${obj.company.id}`}> {obj.company.name} </Link>
            return 'Не найден'
        }
    },
    {
        title: 'Дата публикации',
        dataIndex: 'date_public',
        key: 'date_public',
    },
    {
        title: 'Язык',
        dataIndex: 'language',
        key: 'language',
    },
    {
        title: 'Серийный номер',
        dataIndex: 'serial_number',
        key: 'serial_number',
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        className: 'column-status',
        key: 'status',
        render: status => {
            return (
                <Tag color={getColorStatus[status]} key={status}>
                    {status.toUpperCase()}
                </Tag>
            )
        }
    },
    {
        title: 'Тип ЭОП',
        dataIndex: 'type',
        key: 'type',
        render: (_, obj) => {
            if (obj.type)
                return obj.type.name
            return 'Не найден'
        }
    },
    {
        title: 'Цена',
        dataIndex: 'cost',
        key: 'cost',
        render: (text, record) => (
            <span> 
            { record.language === 'ru' ? 
                text + ' RUB' : text + ' USD'
            }
            </span>
          ),
    },
];

class Aids extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        this.props.onLoadAids();
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }

    render() {
        let { selectedRowKeys } = this.state;
        let { data, onDeleteAid, user_info } = this.props;

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }

        let listDataStartAid = [];
        for (let eop of data) {
            if (eop.status !== 'Создано') {
                listDataStartAid.push(eop);
            }
        }

        return (
            <React.Fragment>
                <Table 
                bordered
                rowSelection={rowSelection}
                className='table-aids'
                title={() => <h1> Список ЕОП </h1>}
                footer={() => (
                    <div className='d-flex justify-content-between'>
                        <Popconfirm
                            title="Вы уверены что хотите удалить выделенные ЭОП?"
                            onConfirm={() => onDeleteAid(selectedRowKeys)}
                            okText="Да"
                            cancelText="Отмена"
                            disabled={selectedRowKeys.length === 0 ? true : false}
                        >
                            <Button
                                type='danger'
                                disabled={selectedRowKeys.length === 0 ? true : false}
                            >
                                Удалить ЭОП
                            </Button>
                        </Popconfirm>
                        <Button type='primary' onClick={() => this.props.setViewForm(true)}>
                            Добавить новое ЭОП
                        </Button>
                    </div>
                )}
                dataSource={listDataStartAid} 
                columns={columns} />
                <AddNewAidForm 
                    {...this.props}
                    visible={this.props.viewForm} 
                    setVisible={this.props.setViewForm}
                    onAddAid={this.props.onAddAid}
                    user_info={user_info}
                />
            </React.Fragment>
        )
    }
}

export default Aids;