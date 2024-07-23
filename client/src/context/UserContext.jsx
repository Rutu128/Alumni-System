import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import postApi from "../utils/postApi";
import getApi from "../utils/getApi";
export const UserContext = createContext({
    userDetail: {
        firstName: String,
        lastName: String,
        email: String,
        initials: String,
        isAuthenticated: Boolean
    },
    loginUser: () => { },
    logoutUser: () => { },
    registerUser: () => { },
    getUserDetails: () => { },
    authenticateUser: () => { },
})


export default function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        initials: '',
        profileImg: '',
        isAuthenticated: false
    })

    async function handleLoginUser(credentials) {
        let responseData;
        const response = await postApi('/auth/login', credentials);
        if (response.response) {
            console.log(response.response);
            if (response.response.status === 404 || 401) {
                return {
                    status: response.response.status,
                }
            }
        }
        responseData = response.data;

        if (responseData.statusCode === 200 && responseData.success) {
            console.log('Updating User details!!');
            setUserInfo(prevInfo => {
                return {
                    ...prevInfo,
                    firstName: responseData.data.user.firstName,
                    lastName: responseData.data.user.lastName,
                    email: responseData.data.user.email,
                    initials: responseData.data.user.firstName[0] + responseData.data.user.lastName[0],
                    isAuthenticated: true
                }
            })
        }
        return {
            status: responseData.statusCode,
        }
    }

    async function handleRegisterUser(userDetails) {
        console.log('Registering user with following credentials: ');
        console.table(userDetails);

        const response = await postApi('/auth/signup', userDetails);
        if (response.response.status === 409 || 500) {
            return {
                status: response.response.status,
            }
        }
        console.log(response.data);
        return {
            status: response.data.statusCode,
        }
    }
    
    function handleLogoutUser() {
        setUserInfo({
            firstName: '',
            lastName: '',
            email: '',
            initials: '',
            profileImg: '',
            isAuthenticated: false
        })
        return {
            logoutStatus: 200
        }
    }

    function getUserDetails() {

    }
    
    async function handleAuthenticateUser() {
        axios.defaults.withCredentials = true;
        const response = await getApi('/auth/ping');
        if(response.response){
            if (response.response.status === 401) {
                console.log('Unauthorized access');
                return {
                    status: response.response.status,
                }
            }
        }

        console.log(response);
        if (response.data.statusCode === 200 && response.data.success === true) {
            setUserInfo({
                firstName: response.data.data.firstName,
                lastName: response.data.data.lastName,
                email: response.data.data.email,
                initials: response.data.data.firstName[0] + response.data.data.lastName[0],
                isAuthenticated: true
            })
            return {
                status: response.data.statusCode,
            }
        } 
    }

    const ctxValue = {
        userDetail: userInfo,
        loginUser: handleLoginUser,
        logoutUser: handleLogoutUser,
        registerUser: handleRegisterUser,
        getUserDetails: getUserDetails,
        authenticateUser: handleAuthenticateUser,
    }

    return <UserContext.Provider value={ctxValue}>
        {children}
    </UserContext.Provider>
}