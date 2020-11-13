import Login from "../../Components/SignUpLogin";
import Home from "../../Components/Home";

export const ROUTES = [
  {
    name: "login",
    url: "/login",
    private: false,
    component: Login,
    exact: false,
  },
  {
    name: "signUp",
    url: "/signUp",
    private: false,
    component: Login,
    exact: false,
  },
  {
    name: "home",
    url: "/",
    private: false,
    component: Home,
    exact: true,
  },
];
