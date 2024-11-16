import React, { useState, useEffect, useRef, cloneElement } from 'react';

export default function Dropdown({ isOpen, setIsOpen, label, icon: Icon, buttonClassName, children }) {
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeDropdown();
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

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return cloneElement(child, { closeDropdown });
        }
        return child;
    });

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
                    {childrenWithProps}
                </div>
            )}
        </div>
    );
}
