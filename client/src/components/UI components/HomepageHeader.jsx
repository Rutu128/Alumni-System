import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuUsers, LuSearch } from "react-icons/lu";
import { MdOutlineNotifications } from "react-icons/md";

export default function HomepageHeader() {
    return (
        <>
            <header className="header">
                <div className="header_cont">
                    <div className="header_cont--left">
                        <h1 className="main-header u-dynamic-text u-il-blk">Alumni Hub</h1>
                        <div className="search u-il-blk">
                            <input type="text" className="search--input" placeholder="Search" />
                            <button><LuSearch className="search--icon" /></button>
                        </div>
                    </div>
                    <div className="header_cont--right">
                        <nav className="navigation u-il-blk">
                            <a href="" className="navigation--links u-il-blk" title="Dashboard"><div className="nav--icon"><MdOutlineSpaceDashboard className="header--icons" /></div></a>
                            <a href="" className="navigation--links u-il-blk" title="Network"><div className="nav--icon"><LuUsers className="header--icons" /></div></a>
                            <a href="" className="navigation--links u-il-blk" title="Notifications"><div className="nav--icon"><MdOutlineNotifications className="header--icons" /></div></a>
                        </nav>
                            <a href="" className="profile u-il-blk" title="Profile">
                                <div className="nav--icon">
                                    <img src="/vite.svg" className="header--icons" alt="User Profile Image" />
                                </div>
                            </a>
                    </div>
                </div>
            </header>
        </>
    )
}