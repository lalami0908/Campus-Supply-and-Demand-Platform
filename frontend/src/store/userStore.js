//TODO

import { flow, action, observable } from 'mobx';
import { navigate, navigate2Login } from '../common/utils';
import {
    CREDENTIAL_LOGIN,
} from '../common/APIpath';
import { RESOURCE } from '../common/fetch';
import { Message } from '../common/message';
// import { appStore } from './appStore';

class UserStore {
    getToken() {
        return localStorage.getItem('token') || '';
    }

    @observable loading = false;

    // 用戶名
    @observable loginName = '';

    // 是否顯示退出登錄彈框
    @observable showLoginOut = false;

    @observable collapsed = false;

    // 登錄
    @action
    handleLogin = flow(function* ({ userName, passWord }) {
        try {
            const { data } = yield RESOURCE.post(CREDENTIAL_LOGIN, {
                passWord,
                userName,
            });
            localStorage.setItem('token', data.loginToken);
            localStorage.setItem('loginName', userName);
            navigate('/home');
        } catch (e) {
            Message.alert(e);
        }
    }) 

    // 登出
    @action
    logout() {
        // RESOURCE.post(LOGIN_OUT);
        this.loginName = '';
        localStorage.clear();
        this.handleHideModal();
        navigate2Login();
    }

    // 初始化數據 獲取用戶名
    @action
    init() {
        this.loginName = localStorage.getItem('token') ? 'admin' : '';
    }

    // 打開對話框
    @action
    handleShowModal() {
        this.showLoginOut = true;
    }

    // 關閉對話框
    @action
    handleHideModal() {
        this.showLoginOut = false;
    }

    openNotificationCenter() {
        window.open(`/smnAdmin/zh/token?authorization=${this.getToken()}`, "_blank");
    }
}


export const userStore = new UserStore();