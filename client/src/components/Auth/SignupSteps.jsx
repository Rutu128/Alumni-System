import { useContext, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { SignUpContext } from "../../context/SignUpContext";
import { SignUpFields } from "./SignUpFields";
import Step4 from "./Step4";
import { useNavigate } from "react-router-dom";
import Loading from "react-loading";


export default function SignupSteps({ step, setStep }) {
    const [error, setError] = useState({
        field: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    
    const { userData, verifyEmail, submitUserData, submitUserOtp } = useContext(SignUpContext);
    const navigate = useNavigate();

    let stepNo = step;
    
    function incrementStep() {
        console.log("Incrementing step");
        setLoading(false);
        setStep(prevStep => prevStep + 1);
    }

    function decrementStep() {
        setLoading(false);
        setStep(prevStep => prevStep - 1);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    function isValidPassword(password) {
        let pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        );

        if (userData.password.trim() === "" || userData.password.trim().length < 6) {
            setError({
                field: 'password',
                message: 'Password must be at least 6 characters long!'
            })
            return false;
        }
        else if (!pattern.test(userData.password.trim())) {
            setError({
                field: 'password',
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!'
            })
            return false;
        }
        else if (userData.password.trim().normalize() !== userData.confirmPassword.trim().normalize()) {
            setError({
                field: 'confirmPassword',
                message: 'Passwords do not match!'
            })
            return false;
        }
        return true;
    }

    function checkEmptyFields() {
        for (let field of SignUpFields[(stepNo - 2)]) {
            console.log(field);

            if (userData[field.name] === "") {
                setError({
                    field: field.name,
                    message: field.label + ' is required!'
                })
                return false;
            }
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(loading) return; 
        step === 1 && handleSubmitStep1();
        step === 2 && handleSubmitStep2();
        step === 3 && handleSubmitStep3();
        step === 4 && handleSubmitStep4();
    }

    function handleSubmitStep1() {
        if (userData.role !== '' | undefined) {
            incrementStep();
        } else {
            setError({
                field: 'role',
                message: 'Designation is required!'
            });
        }
    }

    async function handleSubmitStep2() {
        if (userData.email !== '' && !isValidEmail(userData.email)) {
            setError({
                field: 'email',
                message: 'Invalid email!'
            })
            return;
        }
        checkEmptyFields();
        setLoading(true);
        const res = await verifyEmail();
        console.log(res);
        if (res.status === 200) {
            incrementStep();
        } else if (res.status === 202) {
            console.log("Creating Error!");
            setError({
                field: 'email',
                message: 'User with given email already exists!'
            })
        }
        setLoading(false);
    }

    async function handleSubmitStep3() {
        if (!isValidPassword()) {
            return;
        }
        checkEmptyFields();
        setLoading(true);
        const res = await submitUserData();
        if (res.status === 200) {
            incrementStep();
        }
        setLoading(false);
    }
    
    async function handleSubmitStep4() {
        checkEmptyFields();
        console.log("Submitting data");
        setLoading(true);
        const res = await submitUserOtp();
        if (res.status === 200) {
            setLoading(false);
            navigate('/login');
        }
    }


    return (
        <>
            <form>
                {stepNo === 1 && <Step1 incrementStep={incrementStep} error={error} setError={setError} />}
                {stepNo === 2 && <Step2 incrementStep={incrementStep} decrementStep={decrementStep} error={error} setError={setError} />}
                {stepNo === 3 && <Step3 incrementStep={incrementStep} decrementStep={decrementStep} error={error} setError={setError} />}
                {stepNo === 4 && <Step4 incrementStep={incrementStep} decrementStep={decrementStep} error={error} setError={setError} />}

                <div className="auth-actions">
                    <div className={`multi-step-buttons ${step === 4 ? "button-large" : null}`}>
                        {stepNo !== 1 && <button type="button" onClick={decrementStep} className="u-button-secondary">
                            <PiCaretLeftBold className="u-phosphor-icons icon-l u-icon-font" />
                            Back
                        </button>}
                        <button type="button" onClick={handleSubmit} className="u-button-primary">
                            {
                                loading ?
                                    <Loading type="spin" width={'2rem'} height={'2rem'} />
                                    :
                                    step === 4 ?
                                        'Submit'
                                        :
                                        <>
                                            Continue
                                            <PiCaretRightBold className="u-phosphor-icons icon-r u-icon-font" />
                                        </>
                            }
                        </button>
                    </div>
                </div>

            </form>
        </>
    )
}