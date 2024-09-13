export default function ProgressBar({ step, className }) {
    return (
        <div className={"progress-bar " + className}>
            <div className={`progress-bar-step ${step === 1 && 'current'} ${step > 1 && 'completed'}`}></div>
            <div className={`progress-bar-step ${step === 2 && 'current'} ${step > 2 && 'completed'}`}></div>
            <div className={`progress-bar-step ${step === 3 && 'current'} ${step > 3 && 'completed'}`}></div>
        </div>
    )
}