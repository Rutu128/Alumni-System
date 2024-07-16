import { useState } from "react";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdError } from "react-icons/md";

function Input({ labelText, type, errorText, inputFor, ...props }) {

    if (type === 'password') {
        const [showPassword, setShowPassword] = useState(false);

        function handleShowPassword() {
            setShowPassword(prevValue => !prevValue);
        }

        return (
            <div className={`input-field ${inputFor === 'login' ? 'input-field-login' : 'input-field'}`}>
                {errorText === '' ? null : <div className="u-error-text"><MdError className="error-icon"/>{errorText}</div>}
                <input {...props} type={showPassword ? 'text' : 'password'} />
                <label>{labelText}</label>
                <button onClick={handleShowPassword} className={showPassword ? "showPassword" : "hidePassword"} >
                    {showPassword ?
                        <RiEyeCloseLine className="react-icons" /> :
                        <RiEyeFill className="react-icons" />
                    } 
                </button>
            </div>
        )
    } else {
        return (
            <div className={`input-field ${inputFor === 'login' ? 'input-field-login' : 'input-field'}`}>
                {errorText === '' ? null : <span className="u-error-text"><MdError className="error-icon"/>{errorText}</span>}
                <input {...props} type={type} />
                <label>{labelText}</label>
            </div>
        )
    }
};

export default Input;