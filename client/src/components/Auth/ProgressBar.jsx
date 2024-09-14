export default function ProgressBar({ step, className, totalSteps }) {
    const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

    return (
        <div className={"progress-bar " + className}>
            {steps.map((s) => (
                <div
                    key={s}
                    className={`progress-bar-step ${step === s ? 'current' : ''} ${step > s ? 'completed' : ''}`}
                ></div>
            ))}
        </div>
    );
}