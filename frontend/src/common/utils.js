import numeral from 'numeral';
import queryString from 'query-string';
import { toJS } from 'mobx';
import { Modal } from 'antd';
import diff from 'deep-diff';
import { routerStore } from '../store/routerStore';
import { ROUTE_PRE_FIX } from './constant';
// import { RESOIURCE_UPLOAD } from './api';
import { RESOURCE } from './fetch';
import { PERMISSION } from './permission';
import { userStore } from '../store/userStore';

// js跳轉頁面
export function navigate(path, params) {
    const query = queryString.stringify(params);
    routerStore.push({
        pathname: `/tw/${ROUTE_PRE_FIX}${path}`,
        search: query && `?${query}`,
    });
}


// 獲取URL參數
export function getUrlParams() {
    return queryString.parse(window.location.search);
}

// js返回登入頁面
// eslint-disable-next-line camelcase
export function navigate2Login(params) {
    routerStore.push({
        pathname: '/tw/login',
        state: params,
    });
}
