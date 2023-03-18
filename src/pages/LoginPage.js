import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import pageStyles from '../styles/login.module.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/home");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    // JSX code for the login form
    const renderForm = (
        <form
        className={pageStyles['login-form']}>
            <div
            className={pageStyles['login-form__input']}>
                <label htmlFor="email-address">Email </label>
                <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div
            className={pageStyles['login-form__input']}>
                <label htmlFor="password">Password </label>
                <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div
            className={pageStyles['login-form__submit']}>
                <button
                onClick={onLogin}>
                    Login
                </button>
            </div>
        </form>
    );

    return (
        <div
        className={pageStyles['login']}>
            <div
            className={pageStyles['login__back']}>
                <p
                className={pageStyles['login__logo']}>
                    🎥
                </p>
                <p
                className={pageStyles['login__logo-title']}>
                    KOMO
                </p>
                <p
                className={pageStyles['login__credits']}>
                    Made with 🖤️ by kourosh824.
                </p>
            </div>
            <div
            className={pageStyles['login__container']}>
                <div
                className={pageStyles['login__title']}>Sign In</div>
                {renderForm}
                <p>
                    No account yet? {' '}
                    <NavLink to="/signup">
                        Sign Up
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;