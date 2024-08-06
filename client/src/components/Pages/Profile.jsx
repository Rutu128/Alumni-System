import { useContext } from 'react';
import '../../sass/pages/_profile.scss';
import ProfileImage from '../Homepage UI/ProfileImage';
import UserProfile from '../Posts/UserProfileImage';
import { UserContext } from '../../context/UserContext';
import { PiPencilSimpleDuotone } from "react-icons/pi";


export default function Profile({ isUserProfile }) {
    const { userDetail } = useContext(UserContext);

    return (
        <section className="profile">
            <div className="profile__cont">
                <div className="profile__head">
                    <h1>Profile</h1>
                    <hr />
                </div>
                <div className="profile__main">
                    <div className="profile__left">
                        <div className="profile-image">
                            <ProfileImage className={'full_length_image'} />
                        </div>
                        <div className="section-info">
                            <div className="user-info">
                                <div className="user-info-name u-bold">
                                    {userDetail.firstName + ' ' + userDetail.lastName}
                                </div>
                                <div className="user-info-email u-light">
                                    {userDetail.email}
                                </div>
                            </div>
                            <div className="edit-profile-cont">
                                <button className="edit-profile u-button">
                                    {/* <PiPencilSimpleDuotone className='u-phosphor-icons' /> */}
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="profile__right">
                        <p>right section</p>
                    </div>
                </div>
            </div>
        </section>
    )
}