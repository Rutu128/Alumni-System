import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Dropdown({ heading, children, ...props }){

    return (
        <div className="dropdown" {...props}>
            <button className="dropdown__heading">
                {heading}
                <FaChevronDown className="dropdown__icon"/>
            </button>
            <div className='showDropdown'>
                {children}
            </div>
        </div>
    )
}