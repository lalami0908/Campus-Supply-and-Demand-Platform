import React, { useState, useEffect } from 'react';
import {
    Layout, Menu, Icon, Modal, ConfigProvider,
} from 'antd';

import { navigate2Login } from '../common/utils';
import {
    Route, Switch,
} from 'react-router-dom';
import './basicLayout.scss';
import { ROUTE_PRE_FIX } from '../common/constant';
import { layoutRouter } from '../router/rootRouter';
// import propTypes from 'prop-types';
const { SubMenu } = Menu;
const { Header, Sider } = Layout;
export default function BasicLayout(props){

    return (
        <Layout id="basicLayout">
            <Header className="layout-header">
                <div className="left">
                    <div className="logo"><img alt="" src={require('../assets/images/logo.png')} /></div>
                    <div className="header-text">
                        <span style={{ fontSize: 14 }}>天才小布丁</span>
                        <p>滿滿的大平台</p>
                    </div>

                    <div className="header-item">
                        <LoginOut onCancel={() =>{}} onSubmit={navigate2Login} />
                    </div>
                </div>
            </Header>
            <Switch>
                {
                // 記錄當前的路由
                    layoutRouter.map(({ path, router }) => (
                        <Route key={path} path={`/${props.lan}/${ROUTE_PRE_FIX}${path}`}>
                            <SwitchLayout history={props.history} location={props.location} path={path} key={path} permission={props.permission} router={router} lan={props.lan} />
                        </Route>
                    ))
                }
            </Switch>
        </Layout>
    )

}

// 彈框-退出登錄
const LoginOut = function (props) {
    return (
        <Modal onCancel={props.onCancel} onOk={props.onSubmit} visible={props.visible} title="退出登錄" okText="確認" cancelText="取消">
            <p>確認退出當前登錄嗎</p>
        </Modal>
    );
};

function SwitchLayout(props){
    const [openKeys, setOpenKeys]  = useState([])
    const [selectedKeys, setSelectedKeys]  = useState([])


    useEffect(()=>{
        changeMenuStatus();
    }, [])

    function  onToggle(keys){
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        // 控制當前menu只有一項打開
        if (props.router.map(({ key }) => key).indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys)
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
        }
    };

    // 根據當前path改變menu狀態
    function  changeMenuStatus(){
        const curPath = props.history.location.pathname.substring(props.history.location.pathname.indexOf('ta') - 1);
        const curMenu = curPath.split('/').slice(2);
        const keys = getCurrentSelectedKeys(curMenu) || [];
        setSelectedKeys(keys)
        setOpenKeys(keys)
    };

    function  gotoUrl(item, contentPath){
        const { history, location, lan } = props;
        // eslint-disable-next-line no-param-reassign
        item.path = item.path.split(':')[0];
        if (location.pathname !== item.path) {
            history.push(`/${lan}/${ROUTE_PRE_FIX + contentPath}${item.path}`);
        }
    };

    function menuMap (contentPath, routerTree, callback){
        const isArrFun = value => value && Array.isArray(value);
        const routesIsArr = value => value && value.routes && Array.isArray(value.routes) && value.routes.length > 0;
        // eslint-disable-next-line consistent-return
        const repeatRouter = (arr) => {
            if (isArrFun(arr)) {
                return arr.map((arrItem) => {
                    if (routesIsArr(arrItem)) {
                        return (

                                <SubMenu
                                    key={arrItem.key}
                                    title={(
                                        <div>
                                            <span>{arrItem.name}</span>
                                        </div>
                                    )}
                                >
                                    {repeatRouter(arrItem.routes)}
                                </SubMenu>
                            
                        );
                    }
                    return (
                        <Menu.Item key={arrItem.key} onClick={() => callback(arrItem, contentPath)}>
                            <span>{arrItem.name}</span>
                        </Menu.Item>
                        
                    );
                });
            }
        };
        return repeatRouter(routerTree);
    };

    /**
     *
     * @param keys
     * @return [k1,k2]
     */
    // eslint-disable-next-line consistent-return
    function getCurrentSelectedKeys(keys){
        // eslint-disable-next-line consistent-return
        const recursive = function (nav, key) {
            for (let i = 0; i < nav.length; i += 1) {
                if (nav[i].key === key) {
                    return nav[i];
                } 
                if (Array.isArray(nav[i].routes)) {
                    const r = recursive(nav[i].routes, key);
                    if (r) {
                        return r;
                    }
                }
            }
        };

        for (let i = keys.length - 1; i >= 0; i--) {
            const r = recursive(props.router, keys[i]);
            if (r) {
                if (r.hidden) {
                    continue;
                } else {
                    return keys.slice(0, i + 1);
                }
            } else {
                // console.error('請檢查路由的key值');
            }
        }
    }

    
        return (
            <Layout>
                <Sider collapsed={props.collapsed}>
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={this.state.selectedKeys}
                        // menu收起時，不再自動打開選中項
                        {...(props.collapsed ? {} : { openKeys: this.state.openKeys })}
                        style={{ height: '100%', borderRight: 0 }}
                        onOpenChange={onToggle}
                        key={`${props.collapsed}`}
                    >
                        {
                            menuMap(props.path, props.router, gotoUrl)
                        }
                    </Menu>
                </Sider>
                {/* <ContentLayout selectedKeys={this.state.selectedKeys} lan={props.lan} router={props.router} contentPath={props.path} /> */}
            </Layout>
        );
    
}

// SwitchLayout.propTypes = {
//     lan: propTypes.string.isRequired,
//     router: propTypes.array.isRequired,
//     permission: propTypes.oneOfType([
//         propTypes.string,
//         propTypes.arrayOf(propTypes.string),
//     ]),
//     path: propTypes.string.isRequired,
// };

