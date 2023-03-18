import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import pageStyles from '../styles/login.module.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

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
                navigate('/login');
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
        className={pageStyles['login-form']}>
            <div
            className={pageStyles['login-form__input']}>
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
            className={pageStyles['login-form__input']}>
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
            className={pageStyles['login-form__submit']}>
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
                className={pageStyles['login__title']}>Sign Up</div>
                {renderForm}
                <p>
                    Already have an account?{' '}
                    <NavLink to="/login">
                        Sign In
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;