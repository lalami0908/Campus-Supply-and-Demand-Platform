import queryString from 'query-string';
import { routerStore } from '../store/routerStore';
import { ROUTE_PRE_FIX } from '../common/constant';
// js跳轉頁面
export function navigate(path, params) {
    console.log(`navigate to path:${path},param:${JSON.stringify(params)}`)
    const query = queryString.stringify(params);
    routerStore.push({
        pathname: `${ROUTE_PRE_FIX}${path}`,
        // search: query && `?${query}`,
    });
}


// 獲取URL參數
export function getUrlParams() {
    return queryString.parse(window.location.search);
}

// js返回登入頁面
// eslint-disable-next-line camelcase
export function navigate2Login() {
    routerStore.push({
        pathname: '/login',
        // state: params,
    });
}
