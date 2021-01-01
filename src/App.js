import React from "react";
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
// import Login from "./components/login";
// import Active from "./components/active";
// import Home from "./components/dashboard";
// import Game from "./components/game";
// import FogotPassWord from "./components/reset_password/FogotPassWord";
// import ResetPassWord from "./components/reset_password/ResetPassWord";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./components/common/router/protected";
// import GuestRoute from "./components/common/router/guest";
// import Register from "./components/register";

// const guestRoutes = [
//   { path: "/login", element: Login },
//   { path: "/user/active/:token", component: Active, exact: true },
//   { path: "/register", component: Register, exact: true },
//   { path: "/forgot_password", component: FogotPassWord, exact: true },
//   { path: "/reset_password/:token", component: ResetPassWord, exact: true },
// ];

// const protectedRoutes = [
//   { path: "/", component: Home, exact: true },
//   { path: "/game/:id", component: Game, exact: true },
// ];

function App() {
  const routelist = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <BrowserRouter>
        <Routes> */}
      {routelist}
      {/* {guestRoutes.map((route, key) => {
            return (
              <GuestRoute
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={key}
              />
            );
          })} */}
      {/* {protectedRoutes.map((route, key) => {
            return (
              <ProtectedRoute
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={key}
              />
            );
          })} */}
      {/* </Routes>
      </BrowserRouter> */}
    </ThemeProvider>
    // </div>
  );
}

export default App;
