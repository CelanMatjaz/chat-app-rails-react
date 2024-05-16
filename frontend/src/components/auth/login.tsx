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
    const { fetch, isLoading, response } = useFetch(false);

    useEffect(() => {
        if (isLoading) {
            return;
        }

        setAuth({ ...response?.data });
    }, [isLoading]);

    if (!isLoading && auth.logged_in) {
        navigate('/');
    }

    async function submit() {
        fetch('auth/login', 'POST', {
            user: {
                email,
                password,
                password_confirmation: password,
            }
        });
    }

    return (
        <div className="form-page">
            <Form onSubmit={submit}>
                <Errors errors={response?.errors} />

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

                <button type="submit" className="button" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
            </Form>
        </div>
    )
}

