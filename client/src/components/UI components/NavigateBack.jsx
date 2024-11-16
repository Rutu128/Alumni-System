import { PiArrowLeft } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function NavigateBack({ to = -1 }){
    const navigate = useNavigate();

    function handleNavigateBack(){
        navigate(to);
    }

    return (
        <div className="u-navigate-back" onClick={handleNavigateBack}>
            <PiArrowLeft className="back-icon" />
        </div>
    )
}