import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/auth";
import { Layout } from "./components/layout/layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: []
    },
    {
        path: "/login",
        element: <Login />,
        action: requireAuthAction
    },
    {
        path: "/register",
        element: <Register />,
        action: requireAuthAction
    },
    {
        path: "/logout",
        async action() {
            await fetch('/logout', { method: 'DELETE' });
            return redirect("/login");
        }
    }
]);

async function requireAuthAction() {
    const [auth] = useRecoilState(authState);
    if (auth.isLoggedIn) {
        return redirect('/');
    }
}
