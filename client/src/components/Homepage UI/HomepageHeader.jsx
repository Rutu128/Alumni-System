// import { useNavigate } from "react-router-dom";
// import ProfileImage from "./ProfileImage";
// import SiteIcon from "../UI components/SiteIcon";
// import { PiBell } from "react-icons/pi";
// import { Link } from "react-router-dom";

// export default function HomepageHeader({ userLoggedIn, profileImg, initials }) {


//     const navigate = useNavigate();

//     return (
//         <>
//             <header className="header">
//                 <div className="header__cont">
//                     <div className="section--left section">
//                         <div className="header__cont--mobile">
//                             <SiteIcon width='4rem' className="site-icon-small" />
//                             <h1 className="header-text--mobile">
//                                 Alumni Hub
//                             </h1>
//                         </div>
//                     </div>
//                     <div className="section--right section">
//                         <div className="header__nav--item">
//                             <Link className="header__nav--link" to={'/testPage'}>
//                                 <PiBell className="header__nav--icons" />
//                             </Link>
//                         </div>
//                         <div className="header__nav--item">
//                             <Link className="header__nav--link link-profile" to={'/testPage'}>
//                                 <ProfileImage />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </header>
//         </>
//     )
// }

// HomepageHeader.jsx
import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import SiteIcon from "../UI components/SiteIcon";
import { PiBell } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function HomepageHeader({ userLoggedIn, profileImg, initials }) {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header__cont">
                <div className="header__cont--mobile">
                    <SiteIcon width="4rem" className="site-icon-small" />
                    <h1 className="header-text--mobile">Alumni Hub</h1>
                </div>
                <div className="section section--right">
                    <Link className="header__nav--item" to={'/testPage'}>
                        <PiBell className="header__nav--icon" />
                    </Link>
                    <Link className="link-profile" to={'/testPage'}>
                        <ProfileImage />
                    </Link>
                </div>
            </div>
        </header>
    );
}
