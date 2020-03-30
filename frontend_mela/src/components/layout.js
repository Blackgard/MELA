import React from 'react';
import { Layout as LayoutANTD, Menu } from 'antd';
import {
    AppstoreOutlined, BulbOutlined, TeamOutlined,
    FireOutlined, HddOutlined, LogoutOutlined
} from '@ant-design/icons';

import { Link } from 'react-router-dom';

import * as action from '../store/auth/action';
import { connect } from 'react-redux';

const { Content, Footer, Sider } = LayoutANTD;

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        if (this.props.isAuth) {
            return (
                <LayoutANTD style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="header-logo text-center">
                            <Link to='home' className='text-logo no-decorate-link'> MELA </Link>
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className='sider-menu-font'>
                            <Menu.Item key="1" onClick={() => this.props.history.push('/home')}>
                                <FireOutlined />
                                <span>Главная</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <BulbOutlined />
                                <span>Заявки</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <HddOutlined />
                                <span>Хранилища</span>
                            </Menu.Item>
                            <Menu.Item key="4" onClick={() => this.props.history.push('/eop')}>
                                <AppstoreOutlined />
                                <span>ЭОП</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <TeamOutlined/>
                                <span>Клиенты</span>
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
                        <div className='d-flex h-100 justify-content-center align-items-center'>
                            <span className='d-none d-sm-block'> Movement of e-learning aids </span>
                            <span className='d-block d-sm-none text-logo'> MELA </span>
                        </div>
                    </header>
                    {this.props.children}
                </React.Fragment>
            )
        }
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => { dispatch(action.logout()); }
    }
}

export default connect(null, mapDispatchToProps)(Layout);