import { useContext, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { SignUpContext } from "../../context/SignUpContext";
import { SignUpFields } from "./SignUpFields";


export default function SignupSteps({ step, setStep }) {
    const [error, setError] = useState({
        field: '',
        message: ''
    });
    
    const {userData} = useContext(SignUpContext);

    let stepNo = step;

    function incrementStep() {
        console.log("Incrementing step");
        
        setStep(prevStep => prevStep + 1);
    }

    function decrementStep() {
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
        
        if (userData.password.trim() === "" || userData.password.trim().length < 6){
            setError({
                field: 'password',
                message: 'Password must be at least 6 characters long!'
            })
            return false;
        } 
        else if (!pattern.test(userData.password.trim())){
            setError({
                field: 'password',
                message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!'
            })
            return false;
        } 
        else if (userData.password.trim().normalize() !== userData.confirmPassword.trim().normalize()){
            setError({
                field: 'confirmPassword',
                message: 'Passwords do not match!'
            })
            return false;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted!!");
        
        if (stepNo === 1) {
            if (userData.designation !== '' | undefined) {
                incrementStep();
            } else {
                setError({
                    field: 'designation',
                    message: 'Designation is required!'
                });
            }
            return;
        } else {
            for (let field of SignUpFields[(stepNo-2)]) {
                console.log(field);
                
                if (userData[field.name] === "") {
                    setError({
                        field: field.name,
                        message: field.label + ' is required!'
                    })
                    return;
                }
            }
        }
        if(step === 2 && !isValidEmail(userData.email)) {
            setError({
                field: 'email',
                message: 'Invalid email!'
            })
            return;
        }
        if(step === 3 && !isValidPassword()) {
            return;
        }
        incrementStep();
        console.log(userData);
    }


    return (
        <>
            <form>
                {stepNo === 1 && <Step1 incrementStep={incrementStep} error={error} setError={setError} />}
                {stepNo === 2 && <Step2 incrementStep={incrementStep} decrementStep={decrementStep} error={error} setError={setError} />}
                {stepNo === 3 && <Step3 incrementStep={incrementStep} decrementStep={decrementStep} error={error} setError={setError} />}

                <div className="auth-actions">
                    <div className="multi-step-buttons">
                        {stepNo !== 1 && <button type="button" onClick={decrementStep} className="u-button-secondary">
                            <PiCaretLeftBold className="u-phosphor-icons icon-l u-icon-font" />
                            Back
                        </button>}
                        {stepNo !== 5 && <button type="button" onClick={handleSubmit} className="u-button-primary">
                            Continue
                            <PiCaretRightBold className="u-phosphor-icons icon-r u-icon-font" />
                        </button>}
                    </div>
                </div>

            </form>
        </>
    )
}