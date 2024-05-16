import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import './App.css';
import { authState } from './atoms/auth';
import { useFetch } from './hooks/use_fetch';
import { User } from './types/user';

import { } from './web_socket'

interface IsLoggedInResponse {
    logged_in: boolean;
    user?: User;
};

function App() {
    const [_, setAuth] = useRecoilState(authState);

    const { fetch, isLoading, response } = useFetch<IsLoggedInResponse>(true);

    useEffect(() => {
        fetch('auth/logged_in');
    }, []);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const { status, data } = response!;
        if (status === 200 && data.logged_in) {
            setAuth({
                logged_in: true,
                user: data.user
            });
        }
    }, [isLoading]);

    return <Outlet />
}

export default App
