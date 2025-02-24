import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { log } from "../../log";
import React from "react";

export default function ProfileImage({ className }) {
    const { userDetail } = useContext(UserContext);
    let profileImg = userDetail.avatar;

    if (profileImg === (undefined || null || "")) {
        return (
            <div className={"dummy-profile " + className}>
                {userDetail.initials}
            </div>
        )
    }
    else {
        return (
            <div className={"image-wrapper " + className}>
                <img src={profileImg} className={"profile-img"} alt="User Profile" />
            </div>
        )
    }
}