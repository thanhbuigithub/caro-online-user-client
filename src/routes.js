import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import auth from './components/common/router/auth';
import LoginView from './components/auth/LoginView';
import RegisterView from './components/auth/RegisterView';
import FogotPassWordView from "./components/auth/ForgotPassWordView";
import ActiveAccountView from './components/auth/ActiveAccountView';
import ResetPassWordView from './components/auth/ResetPassWordView';
import Profile from './components/account/AccountView';
import ChangePassWordView from './components/account/ChangePassWordView';

import Home from "./components/dashboard";
import NotFoundView from './components/errors/NotFoundView';
import GameView from "./components/game";

const routes = [
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
            { path: "/change_password", element: <ChangePassWordView /> },
            { path: "/game/:id", element: <GameView /> },
            { path: '/404', element: <NotFoundView /> },
            { path: '*', element: <Navigate to="/404" /> },

        ]
    },
];

export default routes;
