import React, { useState } from 'react'
import { Form } from '../partials/form'
import { Link } from 'react-router-dom';
import { Errors } from '../partials/errors';
import { useFetch } from '../../hooks/use_fetch';

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const { fetch, isLoading, data } = useFetch('auth/register', 'POST');

    async function submit() {
        const obj = {
            user: {
                email,
                password,
                password_confirmation: passwordConfirmation,
                display_name: username
            }
        }

        await fetch(obj);
    }

    return (
        <div className="form-page">
            <Form onSubmit={submit}>
                {data?.errors && <Errors errors={data.errors} />}
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="username">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>

                <div>
                    <label htmlFor="password_confirmation">Confirm password</label>
                    <input id="password_confirmation" name="password_confirmation" type="password" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required />
                </div>

                <div>
                    <Link className="link" to="/login">Login</Link>
                </div>

                <button type="submit" className="button" disabled={isLoading}>{isLoading ? "Submitting..." : "Register"}</button>
            </Form>
        </div>
    )
}
