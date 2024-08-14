import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function Dropdown({ heading, children, ...props }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownClasses, setDropdownClasses] = useState('');

    // function handleDropdown(){
    //     setIsOpen(true);
    //     setDropdownClasses('showDropdown');
    // }

    return (
        <div className="dropdown" {...props}>
            <button className="dropdown__heading" onClick={() => setIsOpen(openState => !openState)}>
                {heading}
                <FaChevronDown className="dropdown__icon" />
            </button>
            <div className={`dropdown_links ${isOpen ? 'showDropdown' : 'hidden'}`}>
                {children}
            </div>
        </div>
    )
}