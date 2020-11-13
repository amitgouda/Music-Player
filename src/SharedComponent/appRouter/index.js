import React from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom";
import PrivateRoute from "./PrivateRouter";
import { ROUTES } from "./Constants";

import "./appRouter.css";

const AppRouter = () => {
  return (
    <div className="parent-app-router">
      <BrowserRouter>
        <Switch>
          {ROUTES &&
            ROUTES.length &&
            ROUTES.map((route, index) => {
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
              } else {
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
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
