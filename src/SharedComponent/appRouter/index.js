import React from "react";
import {
  Switch,
  Route,
  Router as BrowserRouter,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./PrivateRouter";
import { ROUTES } from "./Constants";
import "./appRouter.css";
import history from "../helpers/history";

const AppRouter = () => {
  return (
    <div className="parent-app-router">
      <BrowserRouter history={history}>
        <Switch>
          {ROUTES &&
            ROUTES.length &&
            ROUTES.map((route, index) => {
              const isLoggedInAlready = false;
              let path = route && route.url;
              if (route.private) {
                return (
                  <PrivateRoute
                    key={index}
                    path={path}
                    exact={route.exact}
                    component={route.component}
                    {...route}
                  />
                );
              } else if (!(route.isLoginSignupRoute && isLoggedInAlready)) {
                return (
                  <Route
                    key={index}
                    path={route && route.url}
                    exact={route.exact}
                    component={route.component}
                    {...route}
                  />
                );
              }
            })}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
