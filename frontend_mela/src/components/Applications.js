import React from 'react';

import { Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

const getColorStatus = {
    'Работает'  : 'green', 
    'Обработка' : 'orange',
    'Ошибка'    : 'volcano',
    'Создано'   : 'blue',
    'Доработка' : 'lime',
    undefined   : 'purple'
}

const columns = [
    {
        title: 'Название ЭОП',
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
        title: 'Дата создания заявки',
        dataIndex: 'date_create_rq',
        key: 'date_create_rq',
        render: (_, obj) => {
            if (obj.company)
                return obj.company.date_create_rq 
            return 'Не найдено'
        }
    },
    {
        title: 'Тип компании клиента',
        dataIndex: 'serial_number',
        key: 'serial_number',
        render: (_, obj) => {
            if (obj.company)
                return obj.company.type_company 
            return 'Не найдено'
        }
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
        title: 'Язык',
        dataIndex: 'language',
        key: 'language',
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

class Applications extends React.Component {
    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        let { data } = this.props;
        let listDataStartAid = [];

        for (let eop of data) {
            if (eop.status === 'Создано') {
                listDataStartAid.push(eop);
            }
        }

        return (
            <React.Fragment>
                <Table 
                bordered
                className='table-aids'
                title={() => <h1> Список заявок </h1>}
                dataSource={listDataStartAid} 
                columns={columns} />
            </React.Fragment>
        )
    }
}

export default Applications;