import { PiArrowLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function NavigateBack(){
    const navigate = useNavigate();

    function handleNavigateBack(){
        navigate(-1);
    }

    return (
        <div className="u-navigate-back" onClick={handleNavigateBack}>
            <PiArrowLeft className="back-icon" />
        </div>
    )
}