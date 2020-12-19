// /* eslint-disable prefer-destructuring */
// /* eslint-disable no-plusplus */
// /* eslint-disable react/sort-comp */
// import React, { Component } from 'react';
// import {
//     Layout, Menu, Icon, Modal, ConfigProvider,
// } from 'antd';
// import { observer, inject } from 'mobx-react';
// import {
//     Route, Switch,
// } from 'react-router-dom';
// import propTypes from 'prop-types';
// import './basicLayout.scss';
// import ContentLayout from './component/contentLayout';
// import { ROUTE_PRE_FIX } from '../common/constant';
// import { layoutRouter } from '../router/rootRouter';

// const { SubMenu } = Menu;
// const { Header, Sider } = Layout;

// export default function BasicLayout(){

//     return (
//             <ConfigProvider getPopupContainer={triggerNode => (triggerNode ? triggerNode.parentNode : document.body)}>
//                 <Layout id="basicLayout">
//                     <Header className="layout-header">
//                         <div className="left">
//                             {/* <div className={classNames('header-menu-fold', { active: appStore.collapsed })} onClick={() => appStore.toggleSider()}>
//                                 <img src={require('../assets/images/flod.png')} alt="" />
//                             </div> */}
//                             <div className="logo"><img alt="" src={require('../assets/images/logo.png')} /></div>
//                             <div className="header-text">
//                                 <span style={{ fontSize: 14 }}>富蘭克林</span>
//                                 <p>行動行銷管理系統</p>
//                             </div>
//                             {/* <Menu selectedKeys={['manage']} mode="horizontal" className="tab">
//                                 <Menu.Item key="manage">
//                                 管理中心
//                                 </Menu.Item>
//                                 <Menu.Item key="notification" onClick={() => userStore.openNotificationCenter()}>
//                                 通知中心
//                                 </Menu.Item>
//                             </Menu> */}
//                             <div className="header-item">
//                                 {/* {
//                                     layoutRouter.filter(item => comparePermission(item.permission, this.props.permission)).map(({
//                                         path, defaultPath, name, ...props 
//                                     }) => (
//                                         <JFHeaderItem key={path} to={`/${this.props.lan}/${ROUTE_PRE_FIX}${path + defaultPath}`} {...{ ...props, prefix: path }}>{name}</JFHeaderItem>
//                                     ))
//                                 } */}
//                                 {
//                                     userStore.loginName ? (
//                                         <JFAvatar name={userStore.loginName}>
//                                             <JFAvatarItem onClick={() => userStore.handleShowModal()} icon="poweroff" name="退出登錄" />
//                                         </JFAvatar>
//                                     ) : null
//                                 }
//                                 <LoginOut visible={userStore.showLoginOut} onCancel={() => userStore.handleHideModal()} onSubmit={() => userStore.logout()} />
//                             </div>
//                         </div>
//                     </Header>
//                     <Switch>
//                         {
//                         // 記錄當前的路由
//                             layoutRouter.filter(item => comparePermission(item.permission, this.props.permission)).map(({ path, router }) => (
//                                 <Route key={path} path={`/${this.props.lan}/${ROUTE_PRE_FIX}${path}`}>
//                                     {
//                                         () => (
//                                             <SwitchLayout collapsed={appStore.collapsed} history={this.props.history} location={this.props.location} path={path} key={path} permission={this.props.permission} router={router} lan={this.props.lan} />
//                                         )
//                                     }
//                                 </Route>
//                             ))
//                         }
//                     </Switch>
//                 </Layout>
//             </ConfigProvider>
//     )

// }


// class SwitchLayout extends Component {
//     state = {
//         openKeys: [],
//         selectedKeys: [],
//     };

//     // eslint-disable-next-line 
//     UNSAFE_componentWillReceiveProps(nextProps) {
//         if (nextProps.location.pathname !== this.props.location.pathname) {
//             this.changeMenuStatus();
//         }
//     }

//     componentDidMount() {
//         // this.props.setAppState({permission: permission()});
//         this.changeMenuStatus();
//     }

//     onToggle = (openKeys) => {
//         const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
//         // 控制当前menu只有一项打开
//         if (this.props.router.map(({ key }) => key).indexOf(latestOpenKey) === -1) {
//             this.setState({ openKeys });
//         } else {
//             this.setState({
//                 openKeys: latestOpenKey ? [latestOpenKey] : [],
//             });
//         }
//     };



//     menuMap = (contentPath, routerTree, callback) => {
//         const isArrFun = value => value && Array.isArray(value);
//         const routesIsArr = value => value && value.routes && Array.isArray(value.routes) && value.routes.length > 0;
//         // eslint-disable-next-line consistent-return
//         const repeatRouter = (arr) => {
//             if (isArrFun(arr)) {
//                 return arr.map((arrItem) => {
//                     if (routesIsArr(arrItem)) {
//                         return (
//                             !arrItem.hidden && comparePermission(arrItem.permission, this.props.permission) && (
//                                 <SubMenu
//                                     key={arrItem.key}
//                                     title={(
//                                         <div>
//                                             {arrItem.icon ? (arrItem.icon.indexOf('JF') < 0 ? <Icon type={arrItem.icon} /> : Icons[arrItem.icon]) : null}
//                                             <span>{arrItem.name}</span>
//                                         </div>
//                                     )}
//                                 >
//                                     {repeatRouter(arrItem.routes)}
//                                 </SubMenu>
//                             )
//                         );
//                     }
//                     return (
//                         !arrItem.hidden && comparePermission(arrItem.permission, this.props.permission)
//                         && (
//                             <Menu.Item key={arrItem.key} onClick={() => callback(arrItem, contentPath)}>
//                                 {arrItem.icon ? (arrItem.icon.indexOf('JF') < 0 ? <Icon type={arrItem.icon} /> : Icons[arrItem.icon]) : null}
//                                 <span>{arrItem.name}</span>
//                             </Menu.Item>
//                         )
//                     );
//                 });
//             }
//         };
//         return repeatRouter(routerTree);
//     };

//     /**
//      *
//      * @param keys
//      * @return [k1,k2]
//      */
//     // eslint-disable-next-line consistent-return
//     getCurrentSelectedKeys(keys) {
//         // eslint-disable-next-line consistent-return
//         const recursive = function (nav, key) {
//             for (let i = 0; i < nav.length; i += 1) {
//                 if (nav[i].key === key) {
//                     return nav[i];
//                 } 
//                 if (Array.isArray(nav[i].routes)) {
//                     const r = recursive(nav[i].routes, key);
//                     if (r) {
//                         return r;
//                     }
//                 }
//             }
//         };

//         for (let i = keys.length - 1; i >= 0; i--) {
//             const r = recursive(this.props.router, keys[i]);
//             if (r) {
//                 if (r.hidden) {
//                     continue;
//                 } else {
//                     return keys.slice(0, i + 1);
//                 }
//             } else {
//                 // console.error('請檢查路由的key值');
//             }
//         }
//     }

//     render() {
//         return (
//             <Layout>
//                 <Sider collapsed={this.props.collapsed}>
//                     <Menu
//                         mode="inline"
//                         theme="dark"
//                         selectedKeys={this.state.selectedKeys}
//                         // menu收起時，不再自動打開選中項
//                         {...(this.props.collapsed ? {} : { openKeys: this.state.openKeys })}
//                         style={{ height: '100%', borderRight: 0 }}
//                         onOpenChange={this.onToggle}
//                         key={`${this.props.collapsed}`}
//                     >
//                         {
//                             this.menuMap(this.props.path, this.props.router, this.gotoUrl)
//                         }
//                     </Menu>
//                 </Sider>
//                 <ContentLayout selectedKeys={this.state.selectedKeys} lan={this.props.lan} router={this.props.router} contentPath={this.props.path} />
//             </Layout>
//         );
//     }
// }

// SwitchLayout.propTypes = {
//     lan: propTypes.string.isRequired,
//     router: propTypes.array.isRequired,
//     permission: propTypes.oneOfType([
//         propTypes.string,
//         propTypes.arrayOf(propTypes.string),
//     ]),
//     path: propTypes.string.isRequired,
// };

// export default function WrapperBasicLayout(props) {
//     return (
//         <PermissionContext.Consumer>
//             {
//                 permission => <BasicLayout permission={permission} lan="tw" {...props} />
//             }
//         </PermissionContext.Consumer>
        
//     );
// }
