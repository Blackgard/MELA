import React from 'react';
import { Layout as LayoutANTD, Menu, Tooltip, Button } from 'antd';
import {
    AppstoreOutlined, BulbOutlined, TeamOutlined,
    HddOutlined, LogoutOutlined, SolutionOutlined,
    AreaChartOutlined,
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

import * as action from '../store/auth/action';
import { connect } from 'react-redux';

const { Content, Footer, Sider, Header } = LayoutANTD;
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            selectedKeys : null
        };
    }
    
    componentDidMount() {
        this.getSelectedKey()
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    getSelectedKey = () => {
        switch(this.props.history.location.pathname) {
            case '/applications':
                this.setState({selectedKeys: ['1']})
                break;
            case '/storages':
                this.setState({selectedKeys: ['2']})
                break;
            case '/eops':
                this.setState({selectedKeys: ['3']})
                break;
            case '/customers':
                this.setState({selectedKeys: ['4']})
                break;
            case '/employers':
                this.setState({selectedKeys: ['5']})
                break;
            case '/reporting':
                this.setState({selectedKeys: ['6']})
                break;
            default:
                break;
        }
    }

    render() {
        let { isAuth, user_info } = this.props;

        let is_staff = false;
        if (user_info) is_staff = user_info.is_staff;

        if (isAuth && is_staff) {
            return (
                <LayoutANTD style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="header-logo text-center">
                            <Link to='applications' className='text-logo no-decorate-link'> MELA </Link>
                        </div>
                        <Menu 
                            theme="dark" 
                            mode="inline" 
                            className='sider-menu-font'
                            selectedKeys={this.state.selectedKeys}
                            onClick={() => this.getSelectedKey()}
                        >
                            <Menu.Item key="1" onClick={() => this.props.history.push('/applications')}>
                                <BulbOutlined />
                                <span>Заявки</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => this.props.history.push('/storages')}>
                                <HddOutlined />
                                <span>Хранилища</span>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={() => this.props.history.push('/eops')}>
                                <AppstoreOutlined />
                                <span>ЭОП</span>
                            </Menu.Item>
                            <Menu.Item key="4" onClick={() => this.props.history.push('/customers')}>
                                <TeamOutlined/>
                                <span>Клиенты</span>
                            </Menu.Item>
                            <Menu.Item key="5" onClick={() => this.props.history.push('/employers')}>
                                <SolutionOutlined />
                                <span>Сотрудники</span>
                            </Menu.Item>
                            <Menu.Item key="6" onClick={() => this.props.history.push('/reporting')}>
                                <AreaChartOutlined />
                                <span>Отчетность</span>
                            </Menu.Item>
                            <Menu.Divider className='divider-menu'/>
                            <Menu.Item key="20"
                            onClick={() => {
                                this.props.logout();
                                this.props.history.push('/login');
                            }}>
                                <LogoutOutlined />
                                <span> Выход </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <LayoutANTD className="site-layout">
                        <Header>
                            <span className='name mr-3'>{this.props.user_info.username}</span> 
                            <Tooltip title="Выход">
                                <LogoutOutlined 
                                style={{ fontSize: '18px'}}
                                className='logout-icon'
                                onClick={() => {
                                    this.props.logout();
                                    this.props.history.push('login');
                                }}/>
                            </Tooltip>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <div className="site-layout-background" style={{ padding: 24, height: '100%' }}>
                                {this.props.children} 
                            </div>
                        </Content>
                        <Footer className='text-center'>MELA ©2020 Created by Ant UED</Footer>
                    </LayoutANTD>
                </LayoutANTD>
            );
        } else {
            return (
                <React.Fragment>
                    <header>
                        <div className='container h-100'>
                            <div className='d-flex h-100 justify-content-center align-items-center'>
                                <div className="col">
                                    <span className='d-none d-sm-flex'> 
                                        <Link to='/home' className='no-decorate-link'>Movement of e-learning aids</Link>
                                    </span>
                                    <span className='d-flex d-sm-none text-logo'> 
                                        <Link to='/home' className='no-decorate-link'>MELA</Link> 
                                    </span>
                                </div>
                                
                                <div className="col d-flex justify-content-end">
                                    { isAuth ?
                                        <React.Fragment>
                                            <nav className='navbar-header'>
                                                <Link to='profile' className='no-decorate-link'>Профиль</Link>
                                            </nav>
                                            <div className='d-flex ml-5'>
                                                <span className='name mr-2'>{this.props.user_info.username}</span>
                                                <Tooltip title="Выход">
                                                    <LogoutOutlined
                                                        style={{ fontSize: '18px' }}
                                                        className='logout-icon'
                                                        onClick={() => {
                                                            this.props.logout();
                                                            this.props.history.push('/login');
                                                        }} />
                                                </Tooltip>
                                            </div>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <nav className='navbar-header'>
                                                <Link to='signup' className='mr-4 no-decorate-link'>Регистрация</Link>
                                                <Button type='primary'>
                                                    <Link to='login' className='mr no-decorate-link'>
                                                        Войти
                                                    </Link>
                                                </Button>
                                            </nav>
                                        </React.Fragment>
                                        }
                                </div>
                            </div>
                        </div>
                    </header>

                    {this.props.children}
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user_info : JSON.parse(localStorage.getItem('user_info'))
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(action.logout()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);