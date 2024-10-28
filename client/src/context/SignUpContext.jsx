import { createContext, useState } from "react";
import postApi from "../utils/API/postApi";
import handleResponse from "../utils/responseHandler";

export const SignUpContext = createContext({
    userData: {
        firstName: String,
        lastName:String,
        email: String,
        dob: String,
        role: String, 
        password: String,
        confirmPassword: String,
        otp: String,
    },
    setUserData: () => {},
    setUserDesignation: () => {},
    verifyEmail: () => {},
    submitUserData: () => {},
    submitUserOtp: () => {},
})

export default function SignUpContextProvider({children}){
    const [userData, setUserData] = useState({
        firstName: '',
        lastName:'',
        email: '',
        dob: '',
        role: '', 
        password: '',
        confirmPassword: '',
        otp: '',
    });

    function handleSetUserDesignation(designation){
        setUserData(prevData => {
            return {
                ...prevData,
                role: designation
            }
        })
    }

    async function handleVerifyEmail(){
        const response = await postApi('/auth/verify-email', {
            email: userData.email,
        })
        console.log(response);
        const res = handleResponse(response);
        if(res.status === 200){
            return {
                status: response.status,
            };
        }
    }

    async function handleUserDataSubmit(){
        setUserData(userData);
        console.log(userData);
        const response = await postApi('/auth/signup', userData);
        console.log(response);
        const res = handleResponse(response);
        if (res.status === 200){
            console.log(res);
            setUserData(prevData => {
                return {
                    ...prevData,
                    _id: response.data.data._id,
                }
            })
            return {
                status: 200,
                message: 'User registered successfully!',
                _id: response.data.data._id,
            };
        }
    }

    async function handleSubmitUserOtp(){
        console.log(userData);
        
        const response = await postApi('/auth/verify-otp', {
            userId: userData._id,
            otp: +userData.otp
        });
        const res = handleResponse(response);
        if (res.status === 200){
            console.log(res);
            return res;
        }
    }
    
    const ctxValue = {
        userData: userData,
        setUserData: setUserData,
        setUserDesignation: handleSetUserDesignation,
        verifyEmail: handleVerifyEmail,
        submitUserData: handleUserDataSubmit,
        submitUserOtp: handleSubmitUserOtp,
    }

    return (
        <SignUpContext.Provider value={ctxValue} >
            {children}
        </SignUpContext.Provider>
    )
}