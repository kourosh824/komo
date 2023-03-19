import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

import pageStyles from '../styles/signPage.module.css';

const SignupPage = () => {
    // the navigate hook is used to change the webpage
    const navigate = useNavigate();
    // where the users email address will be stored
    const [email, setEmail] = useState('');
    // where the users password will be stores
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault(); // the default action of the event will be canceled
        // using Firebase authentication to create user
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // once the account is created navigate
                // to the sign in page
                navigate('/signin');
            })
            .catch((error) => {
                /**
                 * if there was an error log it to the console
                 * TODO: add some sort of popup error message
                 */
                const errorCode = error.code;
                const errorMessage = error.Message;
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
                className={pageStyles['sign__title']}>Sign Up</div>
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