import { useContext, useState } from "react";
import { log } from "../log";
import Input from "./UI components/Input";
import Button from "./UI components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Login() {
    const navigate = useNavigate();

    const { userDetail, loginUser } = useContext(UserContext);

    log('<Login/> rendered', 1);
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        emailError: '',
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

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function handleSubmit(e) {
        let errorMessage;
        let errorField;
        e.preventDefault();

        if(userDetails.email.trim() === ""){
            errorMessage = 'This field is required!'
            errorField = 'emailError'
        } 
        else if(userDetails.password.trim() === ""){
            errorMessage = 'This field is required!'
            errorField = 'passwordError'
        } 
        else if(!isValidEmail(userDetails.email)){
            errorMessage = 'Enter a valid email!'
            errorField = 'emailError'
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

        const userStatus = await loginUser({
            email: userDetails.email,
            password: userDetails.password,
        })

        console.log(userStatus);
        if(userStatus.status === 200){
            navigate('/');
        }

        console.log('email: ', userDetails.email, ' password: ', userDetails.password);
    }

    return (
        <main className="login">
            <section className="login-cont narrow">
                <form className="login-cont-main">
                    <h1 className="heading-primary-dark u-margin-bottom-small">Login to <br /><span className="u-dynamic-text">Alumni Hub</span></h1>
                    <Input
                        labelText='email'
                        className={`u-margin-bottom-small ${userDetails.email === "" ? 'invalid' : 'valid'} ${userDetails.emailError ? 'error' : ''}`}
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={userDetails.email}
                        errorText={userDetails.emailError}
                        inputFor='login'
                    />
                    <Input
                        labelText='Password'
                        className={`u-margin-bottom-small ${userDetails.password === "" ? 'invalid' : 'valid'} ${userDetails.passwordError ? 'error' : ''}`}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={userDetails.password}
                        errorText={userDetails.passwordError}
                        inputFor='login'
                    />
                    <Button
                        className="login-button u-margin-bottom-small"
                        btnText='Login'
                        type='submit'
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
                </form>
            </section>
            <div className="img-cont wider">
                <img src="/login-bg.svg" alt="login-illustration" />
            </div>
        </main>
    )
}