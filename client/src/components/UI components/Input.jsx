import { useState } from "react";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdError } from "react-icons/md";
import React from "react";

function Input({ labelText, type, errorText, inputFor, values, showError, ...props }) {

    if (type === 'password') {
        const [showPassword, setShowPassword] = useState(false);

        function handleShowPassword(e) {
            e.preventDefault();
            setShowPassword(prevValue => !prevValue);
        }

        return (
            <div className={`input-field ${inputFor === 'login' ? 'input-field-login' : 'input-field'}`}>
                {errorText === '' ? null : <div className="u-error-text"><MdError className="error-icon" />{errorText}</div>}
                <input {...props} type={showPassword ? 'text' : 'password'} id={labelText + '-input'} autoComplete="true" />
                <label htmlFor={labelText + '-input'}>{labelText}</label>
                <button onClick={handleShowPassword} className={showPassword ? "showPassword" : "hidePassword"} >
                    {showPassword ?
                        <RiEyeCloseLine className="react-icons" /> :
                        <RiEyeFill className="react-icons" />
                    }
                </button>
            </div>
        )
    } else if (type === 'dropdown') {
        const generateOptions = (start, end) => {
            let options = [];
            for (let i = start; i >= end; i--) {
                options.push(i);
            }
            return options;
        };

        return (
            <div className={`input-field ${inputFor === 'login' ? 'input-field-login' : 'input-field'}`}>
                {errorText === '' ? null : <span className="u-error-text"><MdError className="error-icon" />{errorText}</span>}
                <select id={labelText + '-input'} {...props}>
                    <option htmlFor={labelText + '-input'} value="" hidden={true} disabled></option>
                    {generateOptions(values[1], values[0]).map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
                <label htmlFor={labelText + '-input'}>{labelText}</label>
            </div>
        )
    }

    else {
        return (
            <div className={`input-field ${inputFor === 'login' ? 'input-field-login' : 'input-field'}`}>
                {errorText === '' ? null : <span className="u-error-text"><MdError className="error-icon" />{errorText}</span>}
                <input {...props} type={type} id={labelText + '-input'} />
                <label htmlFor={labelText + '-input'}>{labelText}</label>
            </div>
        )
    }
};

export default Input;