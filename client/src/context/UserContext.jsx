import { createContext, useState } from "react";

export const UserContext = createContext({
    userDetails: {
        user_id: String,
        college_id: String,
        batch: Number,
        auth_token: String
    },
    loginUser: () => { },
    logoutUser: () => { },
    getUserDetails: () => { }
})

export default function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({
        user_id: String,
        college_id: String,
        batch: Number,
        auth_token: String
    })
}