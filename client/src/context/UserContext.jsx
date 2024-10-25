import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import postApi from "../utils/API/postApi";
import getApi from "../utils/API/getApi";
import { ToastContainer, toast } from 'react-toastify';
import handleResponse from "../utils/responseHandler";

import 'react-toastify/dist/ReactToastify.css';
import putApi from "../utils/API/putApi";
import getData from "../utils/Data/getData";

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
    editedInfo: {},
    setEditedInfo: () => { },
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
    sendFollowRequest: () => { },
    getFollowRequests: () => { },
    getMyRequests: () => { },
    acceptFollowRequest: () => { },
    rejectFollowRequest: () => { },
    deleteFollowRequest: () => { },
})


export default function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        initials: '',
        avatar: '',
        role: '',
        headline: '',
        description: '',
        isAuthenticated: false
    })
    const [ editedInfo, setEditedInfo ] = useState({});

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
                    ...responseData.data,
                    // firstName: responseData.data.user.firstName,
                    // lastName: responseData.data.user.lastName,
                    // email: responseData.data.user.email,
                    // initials: responseData.data.user.firstName[0] + responseData.data.user.lastName[0],
                    // avatar: responseData.data.user.avatar,
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
        const response = await postApi('/auth/logout');
        
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
            }
            return {
                status: response.response.status,
            }
        }

        console.log(response);
        if (response.data.statusCode === 200 && response.data.success === true) {
            setUserInfo(prevInfo => {
                return {
                    ...prevInfo,
                    ...response.data.data,
                }
            })
            setEditedInfo(getData(response.data.data.role));
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
            handleGetOwnerDetails();
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
                    ...newData,
                }
            })
        }
    }

    async function handleGetUserDetails(userId){
        const response = await getApi(`/user/getUser/${userId}`);
        
        const res = handleResponse(response);
        if(res.status === 200 | 202){
            console.log(response.data.data);
            const newData = response.data.data[0];
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

    async function handleSendFollowRequest(userId){
        const response = await putApi(`/follow/${userId}`);
        const res = handleResponse(response);
        if(res.status === 200){
            return res;
        }
    }

    async function handleGetFollowRequests(){
        const response = await getApi('/follow');
        const res = handleResponse(response);
        if(res.status === 200){
            console.log(response.data.data);
            return response.data.data;
        }
    }

    async function getMyRequests(){
        const response = await getApi('/follow/myRequests');
        const res = handleResponse(response);
        if(res.status === 200){
            console.log(response.data.data);
            return response.data.data;
        }
    }

    async function handleAcceptFollowRequest(id){
        const response = await putApi('/follow/accept/' + id, {
            requestId: id,
        })
        const res = handleResponse(response);
        if(res.status === 200){
            console.log(response.data.data);
            return response.data.data;
        }
    }

    async function handleRejectFollowRequest(){
        const response = await putApi('/follow/reject/' + id, {
            requestId: id,
        })
        const res = handleResponse(response);
        if(res.status === 200){
            console.log(response.data.data);
            return response.data.data;
        }
    }

    const ctxValue = {
        userDetail: userInfo,
        editedInfo: editedInfo,
        setEditedInfo: setEditedInfo,
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
        sendFollowRequest: handleSendFollowRequest,
        getFollowRequests: handleGetFollowRequests,
        getMyRequests: getMyRequests,
        acceptFollowRequest: handleAcceptFollowRequest,
        rejectFollowRequest: handleRejectFollowRequest,
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