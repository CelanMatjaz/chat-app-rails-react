import React, { useEffect, useState } from 'react'
import { Form } from '../partials/form'
import { useFetch } from '../../hooks/use_fetch';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import { Errors } from '../partials/errors';
import { authState } from '../../atoms/auth';
import { useRecoilState } from 'recoil';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [auth, setAuth] = useRecoilState(authState);

    const { fetch, isLoading, data } = useFetch('auth/login', 'POST');

    async function submit() {
        await fetch({
            user: {
                email,
                password,
                password_confirmation: password,
            }
        });

        setPassword('');
    }

    useEffect(() => {
        if (!data) return;
        setAuth({ ...auth, ...data });
        navigate('/')
    }, [data]);

    if (auth.logged_in) {
        return <Navigate to="/" />
    }

    return (
        <div className="form-page">
            <Form onSubmit={submit}>
                {data?.errors && <Errors errors={data.errors} />}
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="username">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>

                <div>
                    <Link className="link" to="/register">Register</Link>
                </div>

                <button type="submit" className="button" disabled={isLoading}>{isLoading ? "Submitting..." : "Login"}</button>
            </Form>
        </div>
    )
}

