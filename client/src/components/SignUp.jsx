import { useState } from "react";
import { log } from "../log";
import Input from "./UI components/Input";
import Button from "./UI components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Login() {
    log('<Login/> rendered', 1);
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        c_id: '',
        dob: '',
        passingYear: '',
        password: '',
        confirmPassword: '',
        firstNameError: '',
        lastNameError: '',
        emailError: '',
        c_idError: '',
        dobError: '',
        passingYearError: '',
        passwordError: '',
        confirmPasswordError: '',
    })

    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        if(value !== value.trim()){
            name += 'Error';
            value = 'Spaces are not allowed!'
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

        for (const [key, value] of Object.entries(userDetails)) {
            if(value === ""){
                console.log('Key: ', key, ', Value: ', value);
                setUserDetails(prevDetails => {
                    return {
                        ...prevDetails,
                        [key + 'Error']: 'This field is required!'
                    }
                })
                return;
            }
        }

        let pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );

        if (userDetails.password.trim() === "" || userDetails.password.trim().length < 6){
            errorMessage = 'Password must be minimum of 6 characters'
            errorField = 'passwordError'
        } 
        else if (!pattern.test(userDetails.password.trim())){
            errorMessage = 'Password must contain an uppercase, lowercase, numeric and special characters.'
            errorField = 'passwordError'
        } 
        else if (userDetails.password.trim().normalize() !== userDetails.confirmPassword.trim().normalize()){
            errorMessage = 'Password and confirm password Does not match'
            errorField = 'confirmPasswordError'
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

        console.log('username: ', userDetails.username, ' password: ', userDetails.password);
    }

    return (
        <main className="login">
            <section className="login-cont">
                <div className="login-cont-main">
                    <h1 className="heading-primary-dark u-margin-bottom-s_small">Start your journey with <span className="u-dynamic-text">Alumni Hub</span></h1>
                    <Input
                        labelText='First name'
                        className={`u-margin-bottom-small ${userDetails.firstName === "" ? 'invalid' : 'valid'} ${userDetails.firstNameError ? 'error' : ''}`}
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        value={userDetails.firstName}
                        errorText={userDetails.firstNameError}
                    />
                    <Input
                        labelText='Last name'
                        className={`u-margin-bottom-small ${userDetails.lastName === "" ? 'invalid' : 'valid'} ${userDetails.lastNameError ? 'error' : ''}`}
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        value={userDetails.lastName}
                        errorText={userDetails.lastNameError}
                    />
                    <Input
                        labelText='Email'
                        className={`u-margin-bottom-small ${userDetails.email === "" ? 'invalid' : 'valid'} ${userDetails.emailError ? 'error' : ''}`}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={userDetails.email}
                        errorText={userDetails.emailError}
                    />
                    <Input
                        labelText='College ID'
                        className={`u-margin-bottom-small ${userDetails.c_id === "" ? 'invalid' : 'valid'} ${userDetails.c_idError ? 'error' : ''}`}
                        type="text"
                        name="c_id"
                        onChange={handleChange}
                        value={userDetails.c_id}
                        errorText={userDetails.c_idError}
                    />
                    <Input
                        labelText='Date of Birth'
                        className={`u-margin-bottom-small ${userDetails.dob === '' ? 'invalid' : 'valid'}`}
                        type="date"
                        name="dob"
                        onChange={handleChange}
                        value={userDetails.dob}
                        errorText={userDetails.dobError}
                        // placeholder='Hey'
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
                    <Input
                        labelText='Confirm Password'
                        className={`u-margin-bottom-small ${userDetails.confirmPassword === "" ? 'invalid' : 'valid'} ${userDetails.confirmPasswordError ? 'error' : ''}`}
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={userDetails.confirmPassword}
                        errorText={userDetails.confirmPasswordError}
                    />
                    <Button
                        className="login-button u-margin-bottom-s_small"
                        btnText='Create Account'
                        onClick={handleSubmit}
                    />
                    <div className="sign-up u-margin-bottom-s_small">Already have an account?
                        <div className="link u-dynamic-text-link">
                            <Link to="/login" className="link-element">Login</Link>
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
                                Sign in using google
                            </div>
                        </Button>
                    </div>
                </div>
            </section>
            <div className="img-cont">
                <img src="/sign-up-bg.svg" alt="sign up illustration" />
            </div>
        </main>
    )
}