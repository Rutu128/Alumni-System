import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext({
    userDetail: {
        firstName: String,
        lastName: String,
        email: String,
        accessToken: String,
        refreshToken: String,
        isAuthenticated: Boolean
    },
    loginUser: () => { },
    logoutUser: () => { },
    registerUser: () => { },
    getUserDetails: () => { }
})


export default function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false
    })

    async function handleLoginUser(credentials) {
        let responseData;

        await axios.post('http://localhost:8000/auth/login', credentials)
            .then(response => {
                responseData = response.data;
            })
            .catch(error => {
                console.log(error);
            })

        if (responseData.statusCode === 200 && responseData.success) {
            console.log('Updating User details!!');
            setUserInfo(prevInfo => {
                return {
                    ...prevInfo,
                    firstName: responseData.data.user.firstName,
                    lastName: responseData.data.user.lastName,
                    email: responseData.data.user.email,
                    accessToken: responseData.data.accessToken,
                    refreshToken: responseData.data.refreshToken,
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
        await axios.post('http://localhost:8000/auth/signup', userDetails)
            .then(response => {
                console.log(response.status);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    function handleLogoutUser() {

    }
    function getUserDetails() {

    }

    const ctxValue = {
        userDetail: userInfo,
        loginUser: handleLoginUser,
        logoutUser: handleLogoutUser,
        registerUser: handleRegisterUser,
        getUserDetails: getUserDetails,
    }

    return <UserContext.Provider value={ctxValue}>
        {children}
    </UserContext.Provider>
}