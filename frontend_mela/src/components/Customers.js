import React from 'react';

import { Table, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: (_, obj) => ( 
            <React.Fragment>
                <Link to={`/customers/${obj.id}`} className='ml-1'> 
                    {obj.name} 
                </Link>
            </React.Fragment>
        )
    },
    {
        title: 'Почта',
        dataIndex: 'email',
        key: 'email',
        render: (_, obj) => ( obj.email || 'Не заданно' )
    },
    {
        title: 'Город',
        dataIndex: 'phone',
        key: 'phone',
        render: (_, obj) => ( obj.location || 'Не заданно' )
    },
    {
        title: 'Логин',
        dataIndex: 'username',
        key: 'username',
        render: (_, obj) => ( obj.employer.name || 'Не заданно' )
    },
    {
        title: 'Тип организации',
        dataIndex: 'type_company',
        key: 'type_company',
        render: (_, obj) => ( obj.type || 'Не заданно' )
    },
    {
        title: 'Количество ЭОП',
        dataIndex: 'count_eop',
        key: 'count_eop',
        render: (_, obj) => ( obj.aids.length )
    }
];

class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        this.props.onLoad();
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }

    render() {
        let { data, onDelete } = this.props;
        let { selectedRowKeys } = this.state;

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        
        return (
            <React.Fragment>
                <Table 
                bordered
                className='table-aids'
                rowSelection={rowSelection}
                title={() => <h1> Список клиентов </h1>}
                footer={() => (
                    <div className='d-flex justify-content-between'>
                        <Popconfirm
                            title="Вы уверены что хотите удалить выделенные ЭОП?"
                            onConfirm={() => onDelete(selectedRowKeys)}
                            okText="Да"
                            cancelText="Отмена"
                            disabled={selectedRowKeys.length === 0 ? true : false}
                        >
                            <Button
                                type='danger'
                                disabled={selectedRowKeys.length === 0 ? true : false}
                            >
                                Удалить аккаунты
                            </Button>
                        </Popconfirm>
                    </div>
                )}
                dataSource={data} 
                columns={columns} />
            </React.Fragment>
        )
    }
}

export default Customers;