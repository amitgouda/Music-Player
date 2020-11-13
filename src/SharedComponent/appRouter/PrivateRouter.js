import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authenticate } from "../helpers/common";

const PrivateRoute = ({ component: Component, dispatch, match, ...rest }) => {
  let isAuthenticated = authenticate();
  return (
    <Route
      {...rest}
      render={(props) => {
        const { location } = props;
        const key = `${location.pathname}${location.search}`;
        props = { ...props, key };
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
              ...props,
            }}
          />
        );
      }}
    />
  );
};

export default connect()(PrivateRoute);
