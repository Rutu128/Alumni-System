import Step1 from "./Step1";

export default function SignupSteps({ step, setStep }) {
    let stepNo = step;

    function incrementStep(){
        setStep(prevStep => prevStep + 1);
    }

    function decrementStep(){
        setStep(prevStep => prevStep - 1);
    }

    return (
        <>
            {stepNo === 1 && <Step1 incrementStep={incrementStep} />}
        </>
    )
}