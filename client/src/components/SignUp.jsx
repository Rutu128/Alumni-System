import { useContext, useState } from "react";
import { log } from "../log";
import Input from "./UI components/Input";
import Button from "./UI components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import React from "react";
import ReactLoading from 'react-loading'

export default function SignUp() {
    log('<SignUp/> rendered', 1);
    const navigate = useNavigate();

    const { userDetail, registerUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        c_id: '',
        dob: '',
        passingYear: '',
        password: '',
        confirmPassword: '',
    })
    
    const [userErrors, setUserErrors] = useState({
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
                [name]: value
            }
        })

        setUserErrors(prevErrors => {
            return {
                ...prevErrors,
                [name + 'Error']: ''
            }
        })
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    function displayError (field, message){
        setUserErrors(prevDetails => {
            return {
                ...prevDetails,
                [field + 'Error']: message,
            }
        })
        setIsLoading(false);
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        for (const [key, value] of Object.entries(userDetails)) {
                if(value === ""){
                console.log('Key: ', key, ', Value: ', value);
                setUserErrors(prevDetails => {
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

        if(!isValidEmail(userDetails.email)){
            displayError('email', 'Enter a valid email!')
            return;
        }
        else if (userDetails.password.trim() === "" || userDetails.password.trim().length < 6){
            displayError('password', 'Password must be minimum of 6 characters')
            return;
        } 
        else if (!pattern.test(userDetails.password.trim())){
            displayError('password', 'Password must contain an uppercase, lowercase, numeric and special characters.')
            return;
        } 
        else if (userDetails.password.trim().normalize() !== userDetails.confirmPassword.trim().normalize()){
            displayError('confirmPassword', 'Password and confirm password Does not match')
            return;
        }

        console.log('No errors found!');
        
        // setIsLoading(false);
        const response = await registerUser({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            c_id: userDetails.c_id,
            dob: userDetails.dob,
            passingYear: userDetails.passingYear,
            password: userDetails.password
        })

        console.log(response);
        setIsLoading(false);
        if(response.status === 200){
            navigate('/login');
        }
        else if(response.status === 409){
            displayError('email', 'User with given email or charusat ID already exists!');
            return;
        }
        // else if(userStatus.status === 500){
        //     displayError('passwordError', 'Incorrect Password!');
        //     return;
        // }
    }

    return (
        <main className="login">
            <section className="login-cont">
                <form className="login-cont-main">
                    <h1 className="heading-primary-dark u-margin-bottom-s_small">Start your journey with <span className="u-dynamic-text">Alumni Hub</span></h1>
                    <Input
                        labelText='First name'
                        className={`u-margin-bottom-small ${userDetails.firstName === "" ? 'invalid' : 'valid'} ${userErrors.firstNameError ? 'error' : ''}`}
                        type="text"
                        name="firstName"
                        onChange={handleChange}
                        value={userDetails.firstName}
                        errorText={userErrors.firstNameError}
                    />
                    <Input
                        labelText='Last name'
                        className={`u-margin-bottom-small ${userDetails.lastName === "" ? 'invalid' : 'valid'} ${userErrors.lastNameError ? 'error' : ''}`}
                        type="text"
                        name="lastName"
                        onChange={handleChange}
                        value={userDetails.lastName}
                        errorText={userErrors.lastNameError}
                    />
                    <Input
                        labelText='Email'
                        className={`u-margin-bottom-small ${userDetails.email === "" ? 'invalid' : 'valid'} ${userErrors.emailError ? 'error' : ''}`}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={userDetails.email}
                        errorText={userErrors.emailError}
                    />
                    <Input
                        labelText='College ID'
                        className={`u-margin-bottom-small ${userDetails.c_id === "" ? 'invalid' : 'valid'} ${userErrors.c_idError ? 'error' : ''}`}
                        type="text"
                        name="c_id"
                        onChange={handleChange}
                        value={userDetails.c_id}
                        errorText={userErrors.c_idError}
                    />
                    <Input
                        labelText='Date of Birth'
                        className={`u-margin-bottom-small ${userDetails.dob === '' ? 'invalid' : 'valid'} ${userErrors.dobError ? 'error' : ''}`}
                        type="date"
                        name="dob"
                        onChange={handleChange}
                        value={userDetails.dob}
                        errorText={userErrors.dobError}
                    />
                    <Input
                        labelText='Passing Year'
                        className={`u-margin-bottom-small ${userDetails.passingYear === '' ? 'invalid' : 'valid'} ${userErrors.passingYearError ? 'error' : ''}`}
                        type="dropdown"
                        values={[1990, 2024]}
                        name="passingYear"
                        onChange={handleChange}
                        value={userDetails.passingYear}
                        errorText={userErrors.passingYearError}
                    />
                    <Input
                        labelText='Password'
                        className={`u-margin-bottom-small ${userDetails.password === "" ? 'invalid' : 'valid'} ${userErrors.passwordError ? 'error' : ''}`}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={userDetails.password}
                        errorText={userErrors.passwordError}
                    />
                    <Input
                        labelText='Confirm Password'
                        className={`u-margin-bottom-small ${userDetails.confirmPassword === "" ? 'invalid' : 'valid'} ${userErrors.confirmPasswordError ? 'error' : ''}`}
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={userDetails.confirmPassword}
                        errorText={userErrors.confirmPasswordError}
                    />
                    <Button
                        className="login-button u-margin-bottom-s_small"
                        type='submit'
                        onClick={handleSubmit}
                    >
                        {isLoading ?
                            <ReactLoading type={'spin'} width={'2rem'} height={'2rem'} className={"loader"} />
                            :
                            'Create Account'
                        }
                    </Button>
                    <div className="sign-up u-margin-bottom-s_small">Already have an account?
                        <div className="link u-dynamic-text-link">
                            <Link to="/login" className="link-element">Login</Link>
                            <div className="underline"></div>
                        </div>
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
                </form>
            </section>
            <div className="img-cont">
                <img src="/sign-up-bg.svg" alt="sign up illustration" />
            </div>
        </main>
    )
}