import React from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "../auth";
import Header from "../../../header";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated())
          return (
            <>
              <Header isSocialLogin={auth.isSocialLogin()} />
              <Component {...props} />
            </>
          );
        else {
          return <Navigate to={{ pathname: "/login" }} />
        };
      }}
    />
  );
};

export default ProtectedRoute;
