import { useState } from "react";
import { log } from "../log";
import Input from "./UI components/Input";
import Button from "./UI components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Login() {
    log('<Login/> rendered', 1);
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        usernameError: '',
        passwordError: ''
    })

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        
        if(value !== value.trim()){
            name += 'Error';
            value = 'Spaces are not allowed'
            setUserDetails(prevDetails => {
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
                [name + 'Error']: ''
            }
        })
    }

    function handleSubmit() {
        let errorMessage;
        let errorField;

        if(userDetails.username.trim() === "" || userDetails.username.trim().length < 6){
            errorMessage = 'Username must be minimum of 6 characters'
            errorField = 'usernameError'
        } 
        else if (userDetails.password.trim() === "" || userDetails.password.trim().length < 6){
            errorMessage = 'Password must be minimum of 6 characters'
            errorField = 'passwordError'
        } 

        if(errorMessage !== undefined){
            setUserDetails(prevDetails => {
                return {
                    ...prevDetails,
                    [errorField]: errorMessage,
                }
            })
            return;
        }

        console.log('username: ', username, ' password: ', password);
    }

    return (
        <main className="login">
            <section className="login-cont">
                <div className="login-cont-main">
                    <h1 className="heading-primary-dark u-margin-bottom-small">Login to <br /><span className="u-dynamic-text">Charusat Alumni</span></h1>
                    <Input
                        labelText='Username'
                        className={`u-margin-bottom-small ${userDetails.username === "" ? 'invalid' : 'valid'} ${userDetails.usernameError ? 'error' : ''}`}
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={userDetails.username}
                        errorText={userDetails.usernameError}
                    />
                    <Input
                        labelText='Password'
                        className={`u-margin-bottom-small ${userDetails.password === "" ? 'invalid' : 'valid'} ${userDetails.passwordError ? 'error' : ''}`}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={userDetails.password}
                        errorText={userDetails.passwordError}
                    />
                    <Button
                        className="login-button u-margin-bottom-small"
                        btnText='Login'
                        type='primary'
                        onClick={handleSubmit}
                    />
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
                </div>
            </section>
            <div className="img-cont">
                <img src="/login-bg.svg" alt="login-illustration" />
            </div>
        </main>
    )
}