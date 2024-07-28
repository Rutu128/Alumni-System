import React from "react"
export default function Button({ btnText, type, children, ...props }){
    if(btnText){
        return (
            <button {...props}>{btnText}</button>
        )
    } else if(children){
        return (
            <button {...props}>{children}</button>
        )
    }
}