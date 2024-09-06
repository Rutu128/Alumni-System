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
    },
    submitUserData: () => {},
})

export default function SignUpContextProvider({children}){
    const [userData, setUserData] = useState({});

    function handleUserDataSubmit(userData){
        setUserData(userData);
        console.log(userData);
    }
    
    const ctxValue = {
        userData: userData,
        submitUserData: handleUserDataSubmit,
    }
}