import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import ProfileImage from "./ProfileImage";
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from "react";


export default function HomepageHeader2({ isLoggedIn, initials }) {
    const [selectedMenu, setSelectedMenu] = useState({});

    return (
        <div className="menu">
            <div className="menu__cont">
                <div className="menu__header">
                    <div className="header__cont">
                        <h1 className="">Alumni Hub</h1>
                    </div>
                </div>
                <div className="menu__navigation">
                    <div className="nav--item">
                        <Link className="nav--link" to={'/testPage'}>
                            <GoHomeFill className="nav--icons" />
                            <p>
                                Home
                            </p>
                        </Link>
                    </div>
                    <div className="nav--item">
                        <Link className="nav--link" to={'/testPage'}>
                            <LuSearch className="nav--icons" />
                            <p>
                                Search
                            </p>
                        </Link>
                    </div>
                    <div className="nav--item">
                        <Link className="nav--link" to={'/testPage'}>
                            <FaBell className="nav--icons" />
                            <p>
                                Notifications
                            </p>
                        </Link>
                    </div>
                    <div className="nav--item">
                        <Link className="nav--link" to={'/testPage'}>
                            <FaUsers className="nav--icons" />
                            <p>
                                Network
                            </p>
                        </Link>
                    </div>
                    <div className="nav--item">
                        <Link className="nav--link" to={'/testPage'}>
                            <BiSolidLike className="nav--icons" />
                            <p>
                                Interactions
                            </p>
                        </Link>
                    </div>
                </div>
                <div className="menu__footer">
                    <div className="nav--item">
                        <Link className="nav--link" to={'/testPage'}>
                            <IoSettingsSharp className="nav--icons" />
                            <p>
                                Settings
                            </p>
                        </Link>
                    </div>
                    <div className="nav--item">
                        <Link className="nav--link link-profile" to={'/testPage'}>
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