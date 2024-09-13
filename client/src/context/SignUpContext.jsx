import { createContext, useState } from "react";

export const SignUpContext = createContext({
    userData: {
        firstName: String,
        lastName:String,
        email: String,
        batch: String,
        dob: String,
        designation: String, 
        college: String,
        department: String,
        status: String,
        company: String,
        location: String,
        password: String,
        confirmPassword: String,
    },
    setUserData: () => {},
    setUserDesignation: () => {},
    submitUserData: () => {},
})

export default function SignUpContextProvider({children}){
    const [userData, setUserData] = useState({
        firstName: '',
        lastName:'',
        email: '',
        batch: '',
        dob: '',
        designation: '', 
        college: '',
        department: '',
        status: '',
        company: '',
        location: '',
        password: '',
        confirmPassword: '',
    });

    function handleSetUserDesignation(designation){
        setUserData(prevData => {
            return {
                ...prevData,
                designation: designation
            }
        })
    }

    function handleUserDataSubmit(userData){
        setUserData(userData);
        console.log(userData);
    }
    
    const ctxValue = {
        userData: userData,
        setUserData: setUserData,
        setUserDesignation: handleSetUserDesignation,
        submitUserData: handleUserDataSubmit,
    }

    return (
        <SignUpContext.Provider value={ctxValue} >
            {children}
        </SignUpContext.Provider>
    )
}