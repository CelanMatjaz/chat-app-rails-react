import React, { useState } from 'react'
import { Form } from '../partials/form'
import { useFetch } from '../../hooks/use_fetch';
import { Link } from 'react-router-dom';
import { Errors } from '../partials/errors';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { fetch, isLoading, data } = useFetch('auth/login', 'POST');

    async function submit() {
        const obj = {
            user: {
                email,
                password,
                password_confirmation: password,
            }
        }

        await fetch(obj);
    }


    return (
        <div className="form-page">

            <Form onSubmit={submit}>
                {data?.errors && <Errors errors={data.errors} />}
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="username">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <div>
                    <Link className="link" to="/register">Register</Link>
                </div>

                <button type="submit" className="button" disabled={isLoading}>{isLoading ? "Submitting..." : "Login"}</button>
            </Form>

        </div>
    )
}

