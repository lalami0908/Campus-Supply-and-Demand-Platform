import React, { useState, useEffect } from 'react';
import {
    Layout, Menu, Icon, ConfigProvider,
} from 'antd';
import { Button, Modal } from 'antd';
import { navigate2Login } from '../common/utils';
import {
    Route, Switch,Redirect
} from 'react-router-dom';
import './basicLayout.scss';
import { ROUTE_PRE_FIX } from '../common/constant';
import { layoutRouter } from '../router/rootRouter';
import ContentLayout from './contentLayout';
import propTypes from 'prop-types';
import logoUrl from '../assets/images/logo.png'
const { SubMenu } = Menu;
const { Header, Sider } = Layout;
export default function BasicLayout(props){
    console.log('basic localStorage:',localStorage)
    for (var i = 0; i < localStorage.length; i++){
        console.log('basic storage:',localStorage.getItem(localStorage.key(i)))
    }
    // const [showLoginOut, setShowLoginOut] = useState(false)
    return (
        <>
        {
            (localStorage.length===0)&&(<Redirect exact from="/" to='/login' />)
        }
        <Layout id="basicLayout">
            <Header className="layout-header">

                <div className="logo"><img alt="logo" src={logoUrl}/></div>
                     
                <div className="header-text">
                    <span style={{ fontSize: 14 }}>你有需求</span>
                    <p className="typing">讓台大人幫你</p>
                </div>

                <div className="loginout-button">
                    <LoginOut onSubmit={navigate2Login}>登出</LoginOut>
                </div>

            </Header>
            <Switch>
                {
                // 記錄當前的路由
                    layoutRouter.map(({ path, router }) => {
                        console.log(`path:${JSON.stringify(path)}, router:${JSON.stringify(router)}`)
                        console.log('props.location:',props.location)
                        return(
                        <Route key={path} path={`${path}`}>
                            <SwitchLayout history={props.history} location={props.location} path={path} key={path} permission={props.permission} router={router} />
                        </Route>
                    )})
                }
            </Switch>
        </Layout>
        </>
    )

}

// 彈框-退出登錄
const LoginOut = function (props) {
    const [visible, setVisible] = useState(false)
    const showModal = () => {
        console.log('logout')
        setVisible(true)
    };
    const handleOk = () => {
        setVisible(false)
        localStorage.clear()
        props.onSubmit()
    };
    const handleCancel = () => {
        setVisible(false)
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                離開我們
            </Button>
            <Modal onCancel={handleCancel} onOk={handleOk} visible={visible} title="484不小心按到" okText="確認" cancelText="取消">
                <p>確認退出當前登錄嗎</p>
            </Modal>
        </>
    );
};

function SwitchLayout(props){
    console.log('switch props:',props)
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
        const { history, location } = props;
        console.log('history:',history)
        console.log('location:',location)
        // eslint-disable-next-line no-param-reassign
        item.path = item.path.split(':')[0];
        if (location.pathname !== item.path) {
            console.log('contentPath:',contentPath)
            history.push(`/${ROUTE_PRE_FIX + contentPath}${item.path}`);
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
                        selectedKeys={selectedKeys}
                        // menu收起時，不再自動打開選中項
                        {...(props.collapsed ? {} : { openKeys: openKeys })}
                        style={{ height: '100%', borderRight: 0 }}
                        onOpenChange={onToggle}
                        key={`${props.collapsed}`}
                    >
                        {
                            menuMap(props.path, props.router, gotoUrl)
                        }
                    </Menu>
                </Sider>
                <ContentLayout selectedKeys={selectedKeys} lan={props.lan} router={props.router} contentPath={props.path} />
            </Layout>
        );
    
}

SwitchLayout.propTypes = {
    // lan: propTypes.string.isRequired,
    router: propTypes.array.isRequired,
    permission: propTypes.oneOfType([
        propTypes.string,
        propTypes.arrayOf(propTypes.string),
    ]),
    path: propTypes.string.isRequired,
};

