import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  dispatch,
  match,
  ...rest
}) => {
  let isAuthenticated = true;
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
                pathname: "/login",
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
