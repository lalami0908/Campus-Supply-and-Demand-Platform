import React from 'react';
import Loadable from 'react-loadable';
import { SDLoading } from '../component/SDLoading/SDLoading';
import { ROUTE_PRE_FIX } from '../common/constant';
import { adminRouter } from './navRouter';


export const rootRouter = [
    {
        path: '/login',
        forceRefresh: true,
        component: Loadable({
            loader: () => import('../page/login/login'),
            loading: () => <SDLoading />,
        }),
    },
    {
        path: '/home',
        component: Loadable({
            // loader: () => import('../page/home/home.js'),
            loader: () => import('../layout/basicLayout'),
            loading: () => <SDLoading />,
        }),
    },
];

export const layoutRouter = [
    {
        defaultPath: '/home',
        path: '',
        router: adminRouter,
    },
];