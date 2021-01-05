import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
// import AccountView from 'src/views/account/AccountView';
// import CustomerListView from 'src/views/customer/CustomerListView';
// import DashboardView from 'src/views/reports/DashboardView';
// import LoginView from 'src/views/auth/LoginView';
// import NotFoundView from 'src/views/errors/NotFoundView';
// import ProductListView from 'src/views/product/ProductListView';
// import RegisterView from 'src/views/auth/RegisterView';
// import SettingsView from 'src/views/settings/SettingsView';
import auth from './components/common/router/auth';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import FogotPassWordView from "./views/auth/ForgotPassWordView";
import ActiveAccountView from './views/auth/ActiveAccountView';
import ResetPassWordView from './views/auth/ResetPassWordView';
import Profile from './views/account/AccountView';

import Home from "./views/dashboard";
import Test from './components/header';
import NotFoundView from './views/errors/NotFoundView';
let isAuthenticated = auth.isAuthenticated();

const routes = [
    // {
    //     path: '/',
    //     element: isAuthenticated ? <DashboardLayout /> : <MainLayout />,
    //     children: [
    //         { path: '/', element: isAuthenticated ? <Home /> : <Navigate to="/login" /> },
    //         { path: '/login', element: isAuthenticated ? <Navigate to="/" /> : <LoginView /> },
    //         { path: '/register', element: isAuthenticated ? <Navigate to="/" /> : <RegisterView /> },
    //         { path: '/forgot_password', element: isAuthenticated ? <Navigate to="/" /> : <FogotPassWordView /> },
    //         { path: "/user/active/:token", element: isAuthenticated ? <Navigate to="/" /> : <ActiveAccountView /> },
    //         { path: "/reset_password/:token", element: <ResetPassWordView /> },
    //         { path: "/profile", element: isAuthenticated ? <Profile /> : <Navigate to="/login" /> },
    //         { path: "/change_password", element: isAuthenticated ? <ChangePassWordView /> : <Navigate to="/login" /> },
    //         { path: '404', element: <NotFoundView /> },
    //         { path: '*', element: <Navigate to="/404" /> },
    //         { path: '/test', element: <Test /> },
    //         // { path: 'register', element: <RegisterView /> },
    //         // { path: '/user/active/:token', element: <ActiveView /> },
    //         // { path: "/forgot_password", element: <FogotPassWordView /> },
    //         // { path: "/reset_password/:token", element: <ResetPassWordView /> },
    //         // { path: "/game/:id", element:isAuthenticated ? <GameView/>:<Navigate to="/login"/> },
    //         // { path: '404', element: <NotFoundView /> },
    //         // { path: '*', element: <Navigate to="/404" /> },

    //     ]
    // },
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Navigate to="/" /> },
            { path: '/register', element: <Navigate to="/" /> },
            { path: '/forgot_password', element: <Navigate to="/" /> },
            { path: "/active/:token", element: <Navigate to="/" /> },
            { path: "/reset_password/:token", element: <Navigate to="/" /> },
            { path: "/profile", element: <Profile /> },
            { path: "/change_password", element: <Navigate to="/" /> },
            { path: '/404', element: <NotFoundView /> },
            { path: '*', element: <Navigate to="/404" /> },
            { path: '/test', element: <Test /> },

        ]
    },
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <Navigate to="/login" /> },
            { path: '/login', element: <LoginView /> },
            { path: '/register', element: <RegisterView /> },
            { path: '/forgot_password', element: <FogotPassWordView /> },
            { path: "/user/active/:token", element: <ActiveAccountView /> },
            { path: "/reset_password/:token", element: <ResetPassWordView /> },
            { path: "/profile", element: <Navigate to="/login" /> },
            { path: "/change_password", element: <Navigate to="/login" /> },
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
