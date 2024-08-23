import { Link } from "react-router-dom";

import { log } from "../../log";
import { PiUsers, PiUsersFill, PiThumbsUp, PiThumbsUpFill, PiBell, PiBellFill, PiHouse, PiHouseFill, PiGear, PiGearFill, PiMagnifyingGlass, PiMagnifyingGlassDuotone } from "react-icons/pi";

import ProfileImage from "./ProfileImage";
import SiteIcon from "../UI components/SiteIcon";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

import { UserContext } from "../../context/UserContext";
import React from "react";

export default function HomepageMenu() {
    log('<HomepageMenu /> rendered', 2);
    const { selectedMenu, setSelectedMenu } = useContext(GlobalContext);

    const navItems = [
        { name: 'Home', icon: PiHouse, fillIcon: PiHouseFill, path: '/' },
        { name: 'Search', icon: PiMagnifyingGlass, fillIcon: PiMagnifyingGlassDuotone, path: '/search' },
        { name: 'Notifications', icon: PiBell, fillIcon: PiBellFill, path: '/testPage' },
        { name: 'Network', icon: PiUsers, fillIcon: PiUsersFill, path: '/testPage' },
        { name: 'Interactions', icon: PiThumbsUp, fillIcon: PiThumbsUpFill, path: '/testPage' },
        { name: 'Settings', icon: PiGear, fillIcon: PiGearFill, path: '/testPage' },
    ]
    

    return (
        <div className="menu">
            <div className="menu__cont">
                <div className="menu__header">
                    <div className="header__cont">
                            <SiteIcon width='4.6rem' className="site-icon" />
                        <h1 className="header-text">
                            Alumni 
                            <br />
                            Hub
                        </h1>
                    </div>
                </div>
                <div className="menu__navigation">
                    {navItems.map((item, index) => {
                        const isSelected = item.name === selectedMenu;
                        const IconComponent = isSelected ? item.fillIcon : item.icon;
                        return (
                            <div className={"nav--item " + item.name} key={index}>
                                <Link onClick={() => { setSelectedMenu(item.name) }} to={item.path} className={`nav--link ${selectedMenu === item.name && 'highlight'}`}>
                                    <IconComponent className='nav--icons' />
                                    <p>
                                        {item.name}
                                    </p>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className="menu__footer">
                    <div className="nav--item">
                        <Link to={'/settings'} onClick={() => { setSelectedMenu('Settings') }} className={`nav--link ${selectedMenu === 'Settings' && 'highlight'}`}>
                            <PiGear className="nav--icons" />
                            <p>
                                Settings
                            </p>
                        </Link>
                    </div>
                    <div className="nav--item Profile">
                        <Link to={'/profile'} onClick={() => { setSelectedMenu('Profile') }} className={`link-profile ${selectedMenu === 'Profile' && 'highlight'}`}>
                            <div className="menu-profile-cont">
                                <ProfileImage />
                            </div>
                            <p>
                                Profile
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}