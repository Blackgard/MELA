import React from 'react';

import { List, Card, Button, Popconfirm, Drawer, Tooltip} from 'antd';
import { Link } from 'react-router-dom';
import { 
    SwapOutlined, CloudServerOutlined, ContainerOutlined
} from '@ant-design/icons';
import AddNewStorageForm from './modelForm/AddNewStorage';

const { Meta } = Card;

class Storages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            viewDrawer     : false
        }
    }

    swapStateViewDrawer() {
        this.setState({
            viewDrawer: !this.state.viewDrawer
        })
    }

    viewDrawer(id) {
        this.props.onLoadAidList(id);
        this.setState({
            viewDrawer: !this.state.viewDrawer
        });
    }

    componentDidMount() {
        this.props.onLoadList();
        this.props.onLoadTypes();
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    }

    render() {
        let { data, listAids,  setViewForm, onPatch } = this.props;
        let { viewDrawer } = this.state;
        return (
            <React.Fragment>
                <div className='header'>
                    <div className='name-header'>
                        <span> Список хранилищ</span>
                    </div>

                    <Button type='primary' onClick={() => setViewForm(true)}>
                        Создать новое хранилище
                    </Button>
                </div>
                <List
                    grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4,
                    xxl: 3,
                    }}
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                            <Card
                                cover={
                                    <CloudServerOutlined 
                                        style={{ 
                                            fontSize: '40px'
                                        }}
                                        className='pt-4'
                                    />
                                }
                                actions={[
                                    
                                    <Popconfirm
                                        title={
                                            item.status === 0 ? 
                                            'Вы уверены, что хотите включить хранилище?' 
                                            : 
                                            'Вы уверены, что хотите отключить хранилище?'
                                        }
                                        onConfirm={() => onPatch(item.id, {
                                            status: Number(!item.status)
                                        })}
                                        okText="Да"
                                        cancelText="Нет"
                                    >
                                        <Tooltip placement="bottom" title='Выкл/Откл хранилища'>
                                            <SwapOutlined key="swap_state"/>
                                        </Tooltip>
                                    </Popconfirm>,
                                    <Tooltip placement="bottom" title='Список хранящихся ЭОП'>
                                        <ContainerOutlined 
                                            key="view_list" 
                                            onClick={() => this.viewDrawer(item.id)}
                                        />
                                    </Tooltip>
                                ]}
                            >
                                <Meta
                                    title={item.name}
                                    description={
                                        <div>
                                            <div className='d-flex align-items-center'>
                                                {item.status ?
                                                    <React.Fragment>
                                                        <span className='circle circle-on mr-2'></span>
                                                        <span>Включен</span>
                                                    </React.Fragment>
                                                    :
                                                    <React.Fragment>
                                                        <span className='circle circle-off mr-2'></span>
                                                        <span>Выключен</span>
                                                    </React.Fragment>
                                                }
                                            </div>
                                            <div>
                                                <div><b>IP:</b> {item.ip}</div>
                                                <div><b>UUID:</b> {item.identifying_number}</div>
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                            <Drawer
                                title="Список хранящихся ЕОП"
                                placement="right"
                                width={520}
                                onClose={() => this.swapStateViewDrawer()}
                                visible={viewDrawer}
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={listAids}
                                    renderItem={itemAids => (
                                    <List.Item>
                                        <List.Item.Meta
                                        title={<Link to={`/eops/${itemAids.id}`}>{itemAids.title}</Link>}
                                        description={itemAids.serial_number}
                                        />
                                    </List.Item>
                                    )}
                                />
                            </Drawer>
                    </List.Item>
                    )}
                />
                <AddNewStorageForm
                    visible={this.props.viewForm} 
                    setVisible={this.props.setViewForm}
                    onAdd={this.props.onAdd}
                    {...this.props}
                />
            </React.Fragment>
        )
    }
}

export default Storages;