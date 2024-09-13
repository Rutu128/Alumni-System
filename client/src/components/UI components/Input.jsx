import { useState } from "react";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { MdError } from "react-icons/md";
import { PiCaretDown } from "react-icons/pi";

import React from "react";

function Input({ labelText, type, errorText, inputFor, values, showError, generateYears, ...props }) {

    if (type === 'password') {
        const [showPassword, setShowPassword] = useState(false);

        function handleShowPassword(e) {
            e.preventDefault();
            setShowPassword(prevValue => !prevValue);
        }

        return (
            <div className={"field-wrapper " + props.wrapperClass}>
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
            </div>
        )
    }
    else if (type === 'dropdown') {
        let options = [];
        const generateOptions = (start, end) => {
            for (let i = start; i >= end; i--) {
                options.push(i);
            }
            return options;
        };

        if (generateYears) {
            options = generateOptions(values[1], values[0]);
        } else {
            options = values;
            console.log(options);
        }

        return (
            <div className={"field-wrapper " + props.wrapperClass}>
                <div className={`input-field ${inputFor === 'login' ? 'input-field-login' : 'input-field'}`}>
                    {errorText === '' ? null : <span className="u-error-text"><MdError className="error-icon" />{errorText}</span>}
                    <select id={labelText + '-input'} {...props}>
                        <option htmlFor={labelText + '-input'} value="" hidden={true} disabled defaultChecked>{props.placeholder}</option>
                        {options.map(value => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </select>
                    <label htmlFor={labelText + '-input'}>{labelText}</label>
                    <PiCaretDown className={`react-icons select-arrow ${props.value !== '' && 'option-selected'}`} />
                </div>
            </div>
        )
    }

    else {
        return (
            <div className={"field-wrapper " + props.wrapperClass}>
                <div className={`input-field ${inputFor === 'login' ? 'input-field-login' : 'input-field'}`}>
                    {errorText === '' ? null : <span className="u-error-text"><MdError className="error-icon" />{errorText}</span>}
                    <input {...props} type={type} id={labelText + '-input'} />
                    <label htmlFor={labelText + '-input'}>{labelText}</label>
                </div>
            </div>
        )
    }
};

export default Input;