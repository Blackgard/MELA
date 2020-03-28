import React from 'react';
import { Layout as LayoutANTD, Menu } from 'antd';
import {
    AppstoreOutlined,
    BulbOutlined,
    TeamOutlined,
    FireOutlined,
    HddOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Content, Footer, Sider } = LayoutANTD;
// const { SubMenu } = Menu;

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
                        {/* <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <TeamOutlined />
                                    <span>Team</span>
                                </span>
                            }
                        >
                            <Menu.Item key="6">Team 1</Menu.Item>
                            <Menu.Item key="8">Team 2</Menu.Item>
                        </SubMenu> */}
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
    }
}

export default Layout;