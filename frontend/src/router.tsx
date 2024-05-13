import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);
