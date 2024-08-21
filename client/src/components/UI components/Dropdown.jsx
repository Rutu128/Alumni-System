import React, { useState, useEffect, useRef } from 'react';

export default function Dropdown({ label, icon: Icon, buttonClassName, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', handleClickOutside);
        } else {
            window.removeEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button
                className={`dropdown__button ${buttonClassName}`}
                onClick={toggleDropdown}
            >
                {Icon}
                {label ? label : null}
            </button>
            {isOpen && (
                <div className={`dropdown__menu ${isOpen && 'animate-dropdown'}`}>
                    {children}
                </div>
            )}
        </div>
    );
}
