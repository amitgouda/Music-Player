import Login from '../../Components/SignUpLogin';
import Home from '../../Components/Home';

export const ROUTES = [
    {
        name: "login",
        url: "/login",
        private: false,
        component: Login,
        isLoginSignupRoute: true,
        exact: true,
    },
    {
        name: "signUp",
        url: "/signUp",
        private: false,
        component: Login,
        isLoginSignupRoute: true,
        exact: true,
    },
    {
        name: "home",
        url: "/",
        private: true,
        component: Home,
        exact: true,
        isSideBarOpen: true,
    },
]