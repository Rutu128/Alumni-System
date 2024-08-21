import { PiGearSix, PiKey, PiUserCircleGear } from "react-icons/pi";
import SettingGeneral from "./SettingGeneral";
import SettingSecurity from "./SettingSecurity";
import SettingAccount from "./SettingAccount";

export const Categories = [
    {
        name: 'General',
        icon : <PiGearSix className="u-phosphor-icons-settings" />,
        component: <SettingGeneral />
    },
    {
        name: 'Security',
        icon: <PiKey className="u-phosphor-icons-settings"/>,
        component: <SettingSecurity />
    },
    {
        name: 'Account',
        icon : <PiUserCircleGear className="u-phosphor-icons-settings" />,
        component: <SettingAccount />
    }
]