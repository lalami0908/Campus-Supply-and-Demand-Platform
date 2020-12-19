import React from 'react';
import Loadable from 'react-loadable';
import { SDLoading } from '../component/SDLoading/SDLoading';
import { adminRouter } from './navRouter';


export const rootRouter = [
    {
        path: '/login',
        forceRefresh: true,
        component: Loadable({
            loader: () => import('../page/login'),
            loading: () => <SDLoading />,
        }),
    },
    // {
    //     path: `/${ROUTE_PRE_FIX}`,
    //     component: Loadable({
    //         loader: () => import('../layout/basicLayout'),
    //         loading: () => <SDLoading />,
    //     }),
    // },
];

export const layoutRouter = [
    {
        defaultPath: '/admin/role',
        path: '',
        router: adminRouter,
    },

];