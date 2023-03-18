import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import pageStyles from '../styles/signPage.module.css';

const SignupPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate('/signin');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.Message;
                console.log(errorCode, errorMessage);
            });
    };

    // JSX code for the login form
    const renderForm = (
        <form
        className={pageStyles['sign-form']}>
            <div
            className={pageStyles['sign-form__input']}>
                <label>Email </label>
                <input
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email Address" />
            </div>
            <div
            className={pageStyles['sign-form__input']}>
                <label>Password </label>
                <input
                type="password"
                label="Create Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password" />
            </div>
            <div
            className={pageStyles['sign-form__submit']}>
                <button
                type="submit"
                onClick={onSubmit}>
                    Sign Up
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
                className={pageStyles['sign__title']}>Sign Up</div>
                {renderForm}
                <p
                className={pageStyles['sign__details']}>
                    Already have an account?{' '}
                    <NavLink
                    className={pageStyles['sign__text']}
                    to="/signin">
                        Sign In
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;