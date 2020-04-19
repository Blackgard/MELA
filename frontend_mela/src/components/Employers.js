import React from 'react';

import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import AddNewEmployer from './modelForm/AddNewEmployer';
import { IdcardOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Имя',
        dataIndex: 'full_name',
        key: 'full_name',
        render: (text, obj) => ( 
            <React.Fragment>
                { obj.user.is_superuser ? 
                    <IdcardOutlined style={{ color: '#1890ff'}}/> : null
                }
                <Link to={`/employers/${obj.id}`} className='ml-1'> 
                    {obj.user.full_name} 
                </Link>
            </React.Fragment>
        )
    },
    {
        title: 'Почта',
        dataIndex: 'email',
        key: 'email',
        render: (text, obj) => ( obj.user.email || 'Не заданно' )
    },
    {
        title: 'Номер телефона',
        dataIndex: 'phone',
        key: 'phone',
        render: (text, obj) => ( obj.user.phone || 'Не заданно' )
    },
    {
        title: 'Логин',
        dataIndex: 'username',
        key: 'username',
        render: (text, obj) => ( obj.user.username || 'Не заданно' )
    },
    {
        title: 'Дата рождения',
        dataIndex: 'brith_date',
        key: 'brith_date',
        render: (text, obj) => ( obj.user.brith_date || 'Не заданно' )
    }
];

class Employers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: []
        }
    }

    componentDidMount() {
        this.props.onLoadEmployers();
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }

    render() {
        let { data, setViewForm } = this.props;

        return (
            <React.Fragment>
                <Table 
                bordered
                className='table-aids'
                title={() => <h1> Список сотрудников </h1>}
                footer={() => (
                    <div className='d-flex justify-content-end'>
                        <Button type='primary' onClick={() => setViewForm(true)}>
                            Добавить нового сотрудника
                        </Button>
                    </div>
                )}
                dataSource={data} 
                columns={columns} />
                <AddNewEmployer
                    visible={this.props.viewForm} 
                    setVisible={this.props.setViewForm}
                    onAddAid={this.props.onAddAid}
                    {...this.props}
                />
            </React.Fragment>
        )
    }
}

export default Employers;