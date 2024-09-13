// import { useState } from "react";

// export default function MultiStepSignUp() {
//     const [step, setStep] = useState(1);
//     const [user, setUser] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//     const [error, setError] = useState('');

//     return (
//         <div className="signup">
//             <div className="signup--left">
//                 <div className="signup__cont">
//                     <div className="signup__head">
//                         <h1>Sign Up</h1>
//                     </div>
//                     <div className="signup__main">
//                         {step === 1 && <Step1 user={user} setUser={setUser} setStep={setStep} />}
//                         {step === 2 && <Step2 user={user} setUser={setUser} setStep={setStep} />}
//                         {step === 3 && <Step3 user={user} setUser={setUser} setStep={setStep} />}
//                     </div>
//                 </div>
//             </div>
//             <div className="signup--right">
//                 <div className="signup--right__cont">
//                     <h1>Right</h1>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function Step1() {
//     return (
//         <div>
//             <h1>Step 1</h1>
//         </div>
//     )
// }

// function Step2() {
//     return (
//         <div>
//             <h1>Step 2</h1>
//         </div>
//     )
// }

// function Step3() {
//     return (
//         <div>
//             <h1>Step 3</h1>
//         </div>
//     )
// }

import { useContext, useState } from "react";
import { log } from "../../log";
import Input from "../UI components/Input";
import Button from "../UI components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import React from "react";
import ReactLoading from 'react-loading'
import SignupSteps from "./SignupSteps";
import ProgressBar from "./ProgressBar";

export default function SignUp() {
    log('<SignUp/> rendered', 1);
    const navigate = useNavigate();

    // const { userDetail, registerUser } = useContext(UserContext);
    // const [isLoading, setIsLoading] = useState(false);

    // const [userDetails, setUserDetails] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     c_id: '',
    //     dob: '',
    //     passingYear: '',
    //     password: '',
    //     confirmPassword: '',
    // })

    // const [userErrors, setUserErrors] = useState({
    //     firstNameError: '',
    //     lastNameError: '',
    //     emailError: '',
    //     c_idError: '',
    //     dobError: '',
    //     passingYearError: '',
    //     passwordError: '',
    //     confirmPasswordError: '',
    // })

    // function handleChange(e) {
    //     let name = e.target.name;
    //     let value = e.target.value;

    //     if (value !== value.trim()) {
    //         name += 'Error';
    //         value = 'Spaces are not allowed!'
    //         setUserErrors(prevDetails => {
    //             return {
    //                 ...prevDetails,
    //                 [name]: value,
    //             }
    //         })
    //         return;
    //     }

    //     setUserDetails(prevDetails => {
    //         return {
    //             ...prevDetails,
    //             [name]: value
    //         }
    //     })

    //     setUserErrors(prevErrors => {
    //         return {
    //             ...prevErrors,
    //             [name + 'Error']: ''
    //         }
    //     })
    // }

    // function isValidEmail(email) {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };

    // function displayError(field, message) {
    //     setUserErrors(prevDetails => {
    //         return {
    //             ...prevDetails,
    //             [field + 'Error']: message,
    //         }
    //     })
    //     setIsLoading(false);
    // }

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     for (const [key, value] of Object.entries(userDetails)) {
    //         if (value === "") {
    //             console.log('Key: ', key, ', Value: ', value);
    //             setUserErrors(prevDetails => {
    //                 return {
    //                     ...prevDetails,
    //                     [key + 'Error']: 'This field is required!'
    //                 }
    //             })
    //             return;
    //         }
    //     }

    //     let pattern = new RegExp(
    //         "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    //     );

    //     if (!isValidEmail(userDetails.email)) {
    //         displayError('email', 'Enter a valid email!')
    //         return;
    //     }
    //     else if (userDetails.password.trim() === "" || userDetails.password.trim().length < 6) {
    //         displayError('password', 'Password must be minimum of 6 characters')
    //         return;
    //     }
    //     else if (!pattern.test(userDetails.password.trim())) {
    //         displayError('password', 'Password must contain an uppercase, lowercase, numeric and special characters.')
    //         return;
    //     }
    //     else if (userDetails.password.trim().normalize() !== userDetails.confirmPassword.trim().normalize()) {
    //         displayError('confirmPassword', 'Password and confirm password Does not match')
    //         return;
    //     }

    //     setIsLoading(true);
    //     console.log('No errors found!');

    //     // setIsLoading(false);
    //     const response = await registerUser({
    //         firstName: userDetails.firstName,
    //         lastName: userDetails.lastName,
    //         email: userDetails.email,
    //         c_id: userDetails.c_id,
    //         dob: userDetails.dob,
    //         passingYear: userDetails.passingYear,
    //         password: userDetails.password
    //     })

    //     console.log(response);
    //     setIsLoading(false);
    //     if (response.status === 200) {
    //         navigate('/login');
    //     }
    //     else if (response.status === 409) {
    //         displayError('email', 'User with given email or charusat ID already exists!');
    //         return;
    //     }
    //     // else if(userStatus.status === 500){
    //     //     displayError('passwordError', 'Incorrect Password!');
    //     //     return;
    //     // }
    // }

    const [step, setStep] = useState(1);

    return (
        <main className="login">
            <section className="login-cont">
                <div className="login-cont-main">
                    {step === 1 ?
                        <div className="login-cont-main-head">
                            <div className="head-icon">
                                <img src="/site-icon.svg" alt="" />
                            </div>
                            <h1 className="heading-primary-dark u-margin-bottom-s_small">Start your journey with <span className="u-dynamic-text">Alumni Hub</span></h1>
                            <ProgressBar step={step} className={"u-margin-bottom-ss_small"} />
                        </div>
                        :
                        <div className="login-cont-main-head-left">
                            <div className="head-icon icon-with-text u-margin-bottom-ss_small">
                                <img src="/site-icon.svg" alt="" />
                                <h1 className="heading-primary-dark-small">Alumni Hub</h1>
                            </div>
                            <ProgressBar step={step} className={"u-margin-bottom-ss_small"} />
                            {step === 2 && <h2 className="heading-secondary-dark">Tell us more about you!</h2>}
                            {step === 3 && <h2 className="heading-secondary-dark">Finishing up!</h2>}
                        </div>
                    }

                    <div className="login-cont-main-form u-margin-bottom-ss_small">
                        <SignupSteps step={step} setStep={setStep} />
                    </div>
                    {/* <div className="separator u-margin-bottom-small">
                        <div className="line line-small"></div>
                    </div> */}
                    <div className="sign-up u-margin-bottom-s_small">Already have an account?
                        <div className="link u-dynamic-text-link">
                            <Link to="/login" className="link-element">Login</Link>
                            <div className="underline"></div>
                        </div>
                    </div>
                    {/* <div className="auth-login">
                        <Button
                            className="auth-login-button"
                        >
                            <FcGoogle className="react-icons google-icon" />
                            <div className="description u-il-blk">
                                Sign in using google
                            </div>
                        </Button>
                    </div> */}
                </div>
            </section>
            <div className="img-cont wider">
                <img src="/sign-up-bg.svg" alt="sign up illustration" />
            </div>
        </main>
    )
}