import { useContext, useState } from "react";
import { log } from "../log";
import Input from "./UI components/Input";
import Button from "./UI components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
// import { Oval } from 'svg-loaders-react';
import ReactLoading from 'react-loading';
import React from "react";

export default function Login() {
    const navigate = useNavigate();

    const { userDetail, loginUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    log('<Login/> rendered', 1);
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
    })
    const [userErrors, setUserErrors] = useState({
        emailError: '',
        passwordError: ''
    });

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        if (value !== value.trim()) {
            name += 'Error';
            value = 'Spaces are not allowed'
            setUserErrors(prevDetails => {
                return {
                    ...prevDetails,
                    [name]: value,
                }
            })
            return;
        }

        setUserDetails(prevDetails => {
            return {
                ...prevDetails,
                [name]: value,
            }
        })

        setUserErrors(prevErrors => {
            return {
                ...prevErrors,
                [name + 'Error']: ''
            }
        })
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    function displayError(field, message) {
        setUserErrors(prevDetails => {
            return {
                ...prevDetails,
                [field]: message,
            }
        })
        setIsLoading(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        if (userDetails.email.trim() === "") {
            displayError('emailError', 'This field is required!');
            return;
        }
        else if (userDetails.password.trim() === "") {
            displayError('passwordError', 'This field is required!');
            return;
        }
        else if (!isValidEmail(userDetails.email)) {
            displayError('emailError', 'Enter a valid email!');
            return;
        }

        const userStatus = await loginUser({
            email: userDetails.email,
            password: userDetails.password,
        })

        console.log(userStatus);
        setIsLoading(false);
        if (userStatus.status === 404) {
            displayError('emailError', 'User with entered email does not exist!');
            return;
        }
        else if (userStatus.status === 401) {
            displayError('passwordError', 'Incorrect Password!');
            return;
        }
        else if (userStatus.status === 200) {
            navigate('/');
        }

        console.log('email: ', userDetails.email, ' password: ', userDetails.password);
    }

    return (
        <main className="login">
            <section className="login-cont narrow">
                <form className="login-cont-main">
                <div className="login-cont-main-head">
                    <img src="/site-icon.svg" alt="" />
                    <h1 className="heading-primary-dark u-margin-bottom-small">Login to <br /><span className="u-dynamic-text">Alumni Hub</span></h1>
                </div>
                    <Input
                        labelText='Email'
                        wrapperClass='u-margin-bottom-small'
                        className={`${userDetails.email === "" ? 'invalid' : 'valid'} ${userErrors.emailError ? 'error' : ''}`}
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={userDetails.email}
                        errorText={userErrors.emailError}
                        inputFor='login'
                    />
                    <Input
                        labelText='Password'
                        wrapperClass='u-margin-bottom-small'
                        className={`${userDetails.password === "" ? 'invalid' : 'valid'} ${userErrors.passwordError ? 'error' : ''}`}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={userDetails.password}
                        errorText={userErrors.passwordError}
                        inputFor='login'
                        onKeyUp={(e) => {
                            e.key === "Enter" && handleSubmit(e)
                        }}
                    />
                    <Button
                        className="u-button-primary u-margin-bottom-small"
                        type='submit'
                        onClick={handleSubmit}
                    >
                        {isLoading ?
                            <ReactLoading type={'bubbles'} width={'2rem'} height={'2rem'} className={"loader"} />
                            :
                            'Login'
                        }
                    </Button>
                    <div className="sign-up u-margin-bottom-small">Don't have an account?
                        <div className="link u-dynamic-text-link">
                            <Link to="/signUp" className="link-element">Sign Up</Link>
                            <div className="underline"></div>
                        </div>
                    </div>
                    <div className="separator u-margin-bottom-small">
                        <div className="line"></div>
                        <div className="separator-text">OR</div>
                    </div>
                    <div className="auth-login">
                        <Button
                            className="auth-login-button"
                        >
                            <FcGoogle className="react-icons google-icon" />
                            <div className="description u-il-blk">
                                Login using google
                            </div>
                        </Button>
                    </div>
                </form>
            </section>
            <div className="img-cont wider">
                <img src="/login-bg.svg" alt="login-illustration" />
            </div>
        </main>
    )
}