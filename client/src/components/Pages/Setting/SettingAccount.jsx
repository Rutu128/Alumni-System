import { useContext } from "react";
import SettingItem from "./SettingItem";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";
import React from "react";

export default function SettingAccount() {
    const { logoutUser } = useContext(UserContext);
    const navigate = useNavigate();

    async function handleLogout() {
        const res = await logoutUser();
        if(res.status === 200){
            console.log('Logged out');
            navigate('/login');
        }
    }

    return (
        <>
            <div className="u-section-header">
                <h3>Account Settings</h3>
            </div>
            <div className="settings__item-cont">
                <SettingItem 
                    name={'Logout'}
                    description={'Logout from your account. This will clear all your session data. You would need to login again to access your account.'}
                    buttonClass={'u-button btn--danger'}
                    buttonLabel={'Logout'}
                    buttonAction={handleLogout}
                    buttonIcon={<PiSignOut className="u-phosphor-icons u-icon-font u-icon-margin-r" />}
                />
            </div>
        </>
    )
}