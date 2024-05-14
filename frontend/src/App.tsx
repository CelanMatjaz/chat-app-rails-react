import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import './App.css';
import { authState } from './atoms/auth';
import { useFetch } from './hooks/use_fetch';
import { User } from './types/user';

interface IsLoggedInResponse {
    status: number;
    logged_in: boolean;
    user: User;
};

function App() {
    const [_, setAuth] = useRecoilState(authState);

    function setLoggedIn(data: IsLoggedInResponse) {
        if (data.status === 200 && data.logged_in) {
            setAuth({
                logged_in: true,
                user: data.user
            });
        }
    }

    const { fetch } = useFetch<IsLoggedInResponse>('auth/logged_in', 'GET', (data) => setLoggedIn(data));

    useEffect(() => {
        async function _fetch() {
            await fetch();
        }

        _fetch();
    }, []);

    return <Outlet />
}

export default App
