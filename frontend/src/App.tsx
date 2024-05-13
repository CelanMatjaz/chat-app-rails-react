import { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/layout'
import { useRecoilState } from 'recoil';
import { authState } from './atoms/auth';
import { useFetch } from './hooks/use_fetch';
import { User } from './types/user';

interface IsLoggedInResponse {
    status: number;
    logged_in: boolean;
    user: User;
};

function App() {
    const [auth, setAuth] = useRecoilState(authState);

    function setLoggedIn(data: IsLoggedInResponse) {
        console.log(data)
        if (data.status === 200 && data.logged_in) {
            setAuth({
                isLoggedIn: true,
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



    return (
        <Routes>
            <Route path="/" element={<Layout />}></Route>
        </Routes>
    )
}

export default App
