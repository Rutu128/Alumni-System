import { Link } from "react-router-dom";

import { PiUsers, PiUsersFill, PiThumbsUp, PiThumbsUpFill, PiBell, PiBellFill, PiHouse, PiHouseFill, PiGear, PiGearFill, PiMagnifyingGlass, PiMagnifyingGlassDuotone } from "react-icons/pi";

import ProfileImage from "./ProfileImage";
import SiteIcon from "../UI components/SiteIcon";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import React from "react";

export default function HomepageHeader2({ isLoggedIn, initials }) {
    const [selectedMenu, setSelectedMenu] = useState('Home');

    const navItems = [
        { name: 'Home', icon: PiHouse, fillIcon: PiHouseFill, path: '/', isSelected: true },
        { name: 'Search', icon: PiMagnifyingGlass, fillIcon: PiMagnifyingGlassDuotone, path: '/testPage', isSelected: false },
        { name: 'Notifications', icon: PiBell, fillIcon: PiBellFill, path: '/testPage', isSelected: false },
        { name: 'Network', icon: PiUsers, fillIcon: PiUsersFill, path: '/testPage', isSelected: false },
        { name: 'Interactions', icon: PiThumbsUp, fillIcon: PiThumbsUpFill, path: '/testPage', isSelected: false },
        { name: 'Settings', icon: PiGear, fillIcon: PiGearFill, path: '/testPage', isSelected: false },
    ]
    function handleSelectMenu(name) {
        setSelectedMenu(name);
    }

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
                                <Link onClick={() => { handleSelectMenu(item.name) }} to={item.path} className={`nav--link ${isSelected && 'highlight'}`}>
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
                        <Link className="nav--link" to={'/testPage'}>
                            <PiGear className="nav--icons" />
                            <p>
                                Settings
                            </p>
                        </Link>
                    </div>
                    <div className="nav--item Profile">
                        <Link className="link-profile" to={'/testPage'}>
                            <ProfileImage className='u-margin-right-small' />
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

//remaining work
//  -removing menu__header and menu__footer for mobile devices
//  -removing notification from menu__navigation and displaying it in header
//  -selected menu highlighting