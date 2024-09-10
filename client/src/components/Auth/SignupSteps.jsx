import Step1 from "./Step1";
import Step2 from "./Step2";

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
            {stepNo === 2 && <Step2 decrementStep={decrementStep} />}
        </>
    )
}