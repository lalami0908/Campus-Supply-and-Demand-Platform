import React from 'react';
import Loadable from 'react-loadable';
import { SDLoading } from '../component/SDLoading/SDLoading';

export const adminRouter = [
    {
        key: 'home',
        name: '首頁',
        exact: true,
        icon: 'home',
        path: '/home',
        component: Loadable({
            loader: () => import('../page/home/home'),
            loading: () => <SDLoading />,
        }),
    },
    {
        key: 'search',
        name: '需求搜索',
        icon: '',
        routes: [
            {
                key: 'hot',
                name: '熱門',
                path: '/search/hot',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/search'),
                    loading: () => <SDLoading />,
                }),
            },
            {
                key: 'current',
                name: '近期',
                path: '/search/current',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/search'),
                    loading: () => <SDLoading />,
                }),
            },
            {
                key: 'highPayment',
                name: '高報酬',
                path: '/search/highPayment',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/search'),
                    loading: () => <SDLoading />,
                }),
            },
            {
                key: 'vip',
                path: '/search/vip',
                name: '熱門用戶',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/search'),
                    loading: () => <SDLoading />,
                }),
            },
        ],
    },
    {
        key: 'personal',
        name: '個人專區',
        exact: true,
        icon: '',
        path: '/personal',
        component: Loadable({
            loader: () => import('../page/personal/personal'),
            loading: () => <SDLoading />,
        }),
    },

];


