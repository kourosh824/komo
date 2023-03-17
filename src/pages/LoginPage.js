import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pageStyles from '../styles/login.module.css';

const LoginPage = () => {
    // User database
    const database = [
        {
            username: "kourosh824",
            password: "12345678"
        },
        {
            username: "yiannisha",
            password: "87654321"
        }
    ];
    // Store an object with the name of the field and the associated error message
    const [errorMessages, setErrorMessages] = useState({});
    // Boolean value to indicate if the form is successfully submitted or not
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Generate JSX code for error message
    const renderErrorMessage = (name) => {
        name === errorMessages.name && (
            <div
            className="error">
                {errorMessages.message}
            </div>
        );
    };

    // Function to handle submit
    const handleSubmit = (e) => {
        // Prevent page reload
        e.preventDefault();

        var { uname, pass } = document.forms[0];
        // Find user login info
        const userData = database.find(
            (user) => user.username === uname.value
        );

        // Compare user info
        if(userData) {
            if(userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({
                    name: "pass",
                    message: errorMessages.pass
                })
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({
                name: "uname",
                message: errorMessages.uname
            })
        }
    };

    // JSX code for the login form
    const renderForm = (
        <form
        className={pageStyles['login-form']}
        onSubmit={handleSubmit}>
            <div
            className={pageStyles['login-form__input']}>
                <label>Username </label>
                <input
                type="text"
                name="uname"
                required />
                {renderErrorMessage("uname")}
            </div>
            <div
            className={pageStyles['login-form__input']}>
                <label>Password </label>
                <input
                type="password"
                name="pass"
                required />
                {renderErrorMessage("pass")}
            </div>
            <div
            className={pageStyles['login-form__submit']}>
                <input
                type="submit" />
            </div>
        </form>
    );

    const navigate = useNavigate();

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
                {isSubmitted ? 
                    navigate(
                        '/home',
                        {state: true}
                    )
                    : renderForm
                }
            </div>
        </div>
    );
};

export default LoginPage;