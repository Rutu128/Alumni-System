import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';
import { PiX } from "react-icons/pi";
import React from "react";

const ModalContainer = forwardRef(function ModalContainer({ children, onReset }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className="portal">
            {children}
        </dialog>,
        document.getElementById('modal')
    )
})

export default ModalContainer;