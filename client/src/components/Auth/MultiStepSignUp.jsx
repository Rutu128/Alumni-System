export default function MultiStepSignUp() {
    const [step, setStep] = useState(1);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    return (
        <div className="multi-step-signup">
            <div className="multi-step-signup__cont">
                <div className="multi-step-signup__head">
                    <h1>Sign Up</h1>
                </div>
                <div className="multi-step-signup__main">
                    {step === 1 && <Step1 user={user} setUser={setUser} setStep={setStep} />}
                    {step === 2 && <Step2 user={user} setUser={setUser} setStep={setStep} />}
                    {step === 3 && <Step3 user={user} setUser={setUser} setStep={setStep} />}
                </div>
            </div>
        </div>
    )
}

function Step1(){
    return (
        <div>
            <h1>Step 1</h1>
        </div>
    )
}

function Step2(){
    return (
        <div>
            <h1>Step 2</h1>
        </div>
    )
}

function Step3(){
    return (
        <div>
            <h1>Step 3</h1>
        </div>
    )
}