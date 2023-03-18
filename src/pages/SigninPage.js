import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

import pageStyles from '../styles/signPage.module.css';

const SigninPage = () => {
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
        className={pageStyles['sign-form']}>
            <div
            className={pageStyles['sign-form__input']}>
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
            className={pageStyles['sign-form__input']}>
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
            className={pageStyles['sign-form__submit']}>
                <button
                onClick={onLogin}>
                    Sign in
                </button>
            </div>
        </form>
    );

    return (
        <div
        className={pageStyles['sign']}>
            <div
            className={pageStyles['sign__back']}>
                <p
                className={pageStyles['sign__logo']}>
                    🎥
                </p>
                <p
                className={pageStyles['sign__logo-title']}>
                    KOMO
                </p>
                <p
                className={pageStyles['sign__credits']}>
                    Made with 🖤️ by kourosh824.
                </p>
            </div>
            <div
            className={pageStyles['sign__container']}>
                <div
                className={pageStyles['sign__title']}>Sign In</div>
                {renderForm}
                <p
                className={pageStyles['sign__details']}>
                    No account yet? {' '}
                    <NavLink
                    className={pageStyles['sign__text']}
                    to="/signup">
                        Sign Up
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default SigninPage;