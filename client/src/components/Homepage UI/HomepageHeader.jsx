import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import SiteIcon from "../UI components/SiteIcon";
import { PiBell, PiBellFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { log } from "../../log";

export default function HomepageHeader({ handleSelectMenu, selectedMenu }) {
    log('<HomepageHeader /> rendered', 2);

    return (
        <header className="header">
            <div className="header__cont">
                <div className="header__cont--mobile">
                    <SiteIcon width="4rem" className="site-icon-small" />
                    <h1 className="header-text--mobile">Alumni Hub</h1>
                </div>
                <div className="section section--right">
                    <Link to={'/testPage'} onClick={() => { handleSelectMenu('Notifications') }} className={`header__nav--item ${selectedMenu === 'Notifications' && 'highlight'}`}>
                        <span className="icon-cont">
                            {selectedMenu === 'Notifications' ?
                                <PiBellFill className="header__nav--icon" />
                                :
                                <PiBell className="header__nav--icon" />
                            }
                        </span>
                    </Link>
                    <Link to={'/profile'} onClick={() => { handleSelectMenu('Profile') }} className={`link-profile ${selectedMenu === 'Profile' && 'highlight'}`}>
                        <ProfileImage />
                    </Link>
                </div>
            </div>
        </header>
    );
}
