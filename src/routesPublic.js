import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
// import AccountView from 'src/views/account/AccountView';
// import CustomerListView from 'src/views/customer/CustomerListView';
// import DashboardView from 'src/views/reports/DashboardView';
// import LoginView from 'src/views/auth/LoginView';
// import NotFoundView from 'src/views/errors/NotFoundView';
// import ProductListView from 'src/views/product/ProductListView';
// import RegisterView from 'src/views/auth/RegisterView';
// import SettingsView from 'src/views/settings/SettingsView';

import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import FogotPassWordView from "./views/auth/ForgotPassWordView";
import ActiveAccountView from './views/auth/ActiveAccountView';
import ResetPassWordView from './views/auth/ResetPassWordView';
import Test from './components/header';
import NotFoundView from './views/errors/NotFoundView';
import ChangePassWordView from './views/account/ChangePassWordView';

const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Navigate to="/login" /> },
            { path: '/login', element: <LoginView /> },
            { path: '/register', element: <RegisterView /> },
            { path: '/forgot_password', element: <FogotPassWordView /> },
            { path: "/active/:token", element: <ActiveAccountView /> },
            { path: "/reset_password/:token", element: <ResetPassWordView /> },
            { path: "/profile", element: <Navigate to="/login" /> },
            { path: "/change_password", element: <ChangePassWordView /> },
            { path: '/404', element: <NotFoundView /> },
            { path: '*', element: <Navigate to="/404" /> },
            { path: '/test', element: <Test /> },
            // { path: 'register', element: <RegisterView /> },
            // { path: '/user/active/:token', element: <ActiveView /> },
            // { path: "/forgot_password", element: <FogotPassWordView /> },
            // { path: "/reset_password/:token", element: <ResetPassWordView /> },
            // { path: "/game/:id", element:isAuthenticated ? <GameView/>:<Navigate to="/login"/> },
            // { path: '404', element: <NotFoundView /> },
            // { path: '*', element: <Navigate to="/404" /> },

        ]
    },

];

export default routes;
