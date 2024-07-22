import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUsers, LuSearch } from "react-icons/lu";
import { MdOutlineNotifications } from "react-icons/md";
import { LuMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { FaBell } from "react-icons/fa";

export default function HomepageHeader({ userLoggedIn, profileImg, initials }) {


    const navigate = useNavigate();

    return (
        <>
            <header className="header">
                <div className="header__cont">
                    <div className="section--left section">
                        <h1 className="u-dynamic-text">Alumni Hub</h1>
                    </div>
                    <div className="section--right section">
                        <div className="input-search">
                            <button className="search-button"><LuSearch className="search-icon" /></button>
                            <input className="search-input" placeholder="Search" onClick={() => hover} />
                        </div>
                        <button className="header__button desktop_window" title="Network"><FaUsers className="button--icon" /><p>My Network</p></button>
                        <button className="header__button desktop_window" title="Interactions"><BiSolidLike className="button--icon smaller" /><p>Interactions</p></button>
                        <button className="header__button desktop_window" title="Notifications"><FaBell className="button--icon smaller" /><p>Notifications</p></button>
                        {!userLoggedIn ?
                            <>
                                <button
                                    className="header__button login-button"
                                    onClick={() => navigate('/login')}
                                >
                                    Log in
                                </button>
                            </>
                            :
                            <div className="header__profile">
                                {
                                    profileImg === null ?
                                        <button className="dummy-profile">
                                            {initials}
                                        </button>
                                        :
                                        <img className="profile-img" src={profileImg} alt="Profile Photo" />
                                }
                            </div>
                        }
                    </div>
                </div>
            </header>
        </>
    )
}