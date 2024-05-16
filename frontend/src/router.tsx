import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/auth";
import { PropsWithChildren } from "react";
import { Layout } from "./components/layout/layout";
import { Room } from "./components/room";
import { Channel } from "./components/channel";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    const [auth] = useRecoilState(authState);

    if (!auth.logged_in) {
        return <Navigate to="/login" />
    }

    return <>{children}</>
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                Component: Layout,
                children: [
                    {
                        path: ":roomId",
                        Component: Room,
                        children: [
                            {
                                path: ":channelId",
                                Component: Channel
                            }
                        ]
                    },
                ]
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/logout",
                async action() {
                    await fetch('/logout', { method: 'DELETE' });
                    return redirect("/login");
                }
            }
        ]
    },
]);

