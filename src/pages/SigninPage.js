import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import pageStyles from '../styles/signPage.module.css';

const SigninPage = () => {
    // the navigate hook is used to change the webpage
    const navigate = useNavigate();
    // where the users email address will be stored
    const [email, setEmail] = useState('');
    // where the users password will be stores
    const [password, setPassword] = useState('');

    const onSignin = (e) => {
        e.preventDefault(); // the default action of the event will be canceled
        // using Firebase authentication to sign in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // once signed in navigate to home
                navigate("/home");
            })
            .catch((error) => {
                /**
                 * if there was an error log it to the console
                 * TODO: add some sort of popup error message
                 */
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

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
                        onClick={onSignin}>
                            Sign in
                        </button>
                    </div>
                </form>
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