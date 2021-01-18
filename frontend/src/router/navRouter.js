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
                    loader: () => import('../page/search/search'),
                    loading: () => <SDLoading />,
                }),
            },
            {
                key: 'current',
                name: '近期刊登',
                path: '/search/current',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/search/search'),
                    loading: () => <SDLoading />,
                }),
            },
            {
                key: 'highPayment',
                name: '高報酬',
                path: '/search/highPayment',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/search/search'),
                    loading: () => <SDLoading />,
                }),
            },
            {
                key: 'urgent',
                path: '/search/urgent',
                name: '緊急任務',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/search/search'),
                    loading: () => <SDLoading />,
                }),
            },
            {
                key: 'all',
                path: '/search/all',
                name: '所有',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/search/search'),
                    loading: () => <SDLoading />,
                }),
            },
        ],
    },
    {
        key: 'personalArea',
        name: '個人專區',
        icon: '',
        routes: [
            {
                key: 'personalInfo',
                name: '個人資料',
                path: '/personal/personalInfo',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/personal/personal'),
                    loading: () => <SDLoading />,
                }),
            },
            {
                key: 'ownDemand',
                name: '你的需求',
                path: '/personal/ownDemand',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/personal/ownDemand'),
                    loading: () => <SDLoading />,
                }),
            },
            {
                key: 'ownSupply',
                name: '你的接單',
                path: '/personal/ownSupply',
                exact: true,
                component: Loadable({
                    loader: () => import('../page/personal/ownSupply'),
                    loading: () => <SDLoading />,
                }),
            },
            
        ],
    },


];


