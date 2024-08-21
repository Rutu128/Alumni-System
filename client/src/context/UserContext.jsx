import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import postApi from "../utils/postApi";
import getApi from "../utils/getApi";
import { ToastContainer, toast } from 'react-toastify';
import handleResponse from "../utils/responseHandler";

import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext({
    userDetail: {
        firstName: String,
        lastName: String,
        email: String,
        initials: String,
        avatar: String,
        designation: String,
        headline: String,
        description: String,
        isAuthenticated: Boolean
    },
    loginUser: () => { },
    logoutUser: () => { },
    registerUser: () => { },
    getUserPosts: () => { },
    getOwnerPosts: () => { },
    authenticateUser: () => { },
    createNotification: () => { },
    getOwnerDetails: () => { },
    updateProfile: () => { },
    getUserDetails: () => { },
    searchUser: () => { },
})


export default function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        initials: '',
        avatar: '',
        designation: '',
        headline: '',
        description: '',
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
                    avatar: responseData.data.user.avatar,
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
        if (response.response) {
            if (response.response.status === 409 || 500) {
                return {
                    status: response.response.status,
                }
            }
        }
        console.log(response.data);
        return {
            status: response.data.statusCode,
        }
    }

    async function handleLogoutUser() {
        const response = await axios.get('/auth/logout');
        
        const res = handleResponse(response);
        console.log(res);

        if(res.status === 200){
            setUserInfo({
                firstName: '',
                lastName: '',
                email: '',
                initials: '',
                avatar: '',
                isAuthenticated: false
            })
            return {
                status: 200
            }
        }
    }

    async function handleGetUserPosts(id) {
        const response = await getApi('/user/posts/' + id);
        const res = handleResponse(response);
        if (res.status === 200 | 202) {
            return response.data.data;
        }
    }
    
    async function handleGetOwnerPosts() {
        const response = await getApi('/user/myPosts');
        const res = handleResponse(response);
        if (res.status === 200 | 202) {
            return response.data.data;
        }
    }

    async function handleAuthenticateUser() {
        axios.defaults.withCredentials = true;
        const response = await getApi('/auth/ping');
        if (response.response) {
            if (response.response.status === 401) {
                console.log('Unauthorized access');
                return {
                    status: response.response.status,
                }
            }
        }

        console.log(response);
        if (response.data.statusCode === 200 && response.data.success === true) {
            setUserInfo(prevInfo => {
                return {
                    ...prevInfo,
                    firstName: response.data.data.firstName,
                    lastName: response.data.data.lastName,
                    email: response.data.data.email,
                    initials: response.data.data.firstName[0] + response.data.data.lastName[0],
                    avatar: response.data.data.avatar,
                    headline: response.data.data.headline,
                    description: response.data.data.description,
                    designation: response.data.data.designation,
                    isAuthenticated: true
                }
            })
            return {
                status: response.data.statusCode,
            }
        }
    }

    function createNotification(message, type) {
        type === 'success' && toast.success(message, {
            className: 'toast-notification',
        });
        type === 'error' && toast.error(message, {
            className: 'toast-notification',
        });
        type === 'warning' && toast.warning(message, {
            className: 'toast-notification',
        });
        type === 'info' && toast.info(message, {
            className: 'toast-notification',
        });
    }

    async function handleUpdateProfile(profile_about){
        const response = await postApi('/user/addInfo', profile_about);
        const res = handleResponse(response);
        if(res.status === 200) {
            console.log('User updated');
            handleGetUserDetails();
            return res;
        }
    }

    async function handleGetOwnerDetails(){
        const response = await getApi('/user/me');
        const res = handleResponse(response);
        if(res.status === 200 | 202){
            const newData = response.data.data;
            console.log(newData);
            
            setUserInfo(prevInfo => {
                return {
                    ...prevInfo,
                    ...newData[0],
                }
            })
        }
    }

    async function handleGetUserDetails(userId){
        const response = await getApi(`/user/getUser/${userId}`);
        
        const res = handleResponse(response);
        if(res.status === 200 | 202){
            console.log(response.data.data);
            const newData = response.data.data;
            return newData;
        }
    }

    async function handleSearchUser(searchText){
        const response = await getApi(`/user/find/${searchText}`);
                
        const res = handleResponse(response);
        if(res.status === 200 | 202){
            return response.data.data;
        } else {
            console.log(response.data);
        }
    }

    const ctxValue = {
        userDetail: userInfo,
        loginUser: handleLoginUser,
        logoutUser: handleLogoutUser,
        registerUser: handleRegisterUser,
        getUserPosts: handleGetUserPosts,
        getOwnerPosts: handleGetOwnerPosts,
        authenticateUser: handleAuthenticateUser,
        createNotification: createNotification,
        updateProfile: handleUpdateProfile,
        getOwnerDetails: handleGetOwnerDetails,
        getUserDetails: handleGetUserDetails,
        searchUser: handleSearchUser,
    }

    return <UserContext.Provider value={ctxValue}>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            theme="dark"
        />
        {children}
    </UserContext.Provider>
}