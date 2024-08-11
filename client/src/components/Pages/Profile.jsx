import { useContext, useEffect, useRef } from 'react';
import '../../sass/pages/_profile.scss';
import ProfileImage from '../Homepage UI/ProfileImage';
import UserProfile from '../Posts/UserProfileImage';
import { UserContext } from '../../context/UserContext';
import { PiPencilSimpleDuotone } from "react-icons/pi";
import ProfileInfo from '../UI components/ProfileInfo';
import ModalContainer from '../Modal UI/ModalContainer';
import ProfileEditModal from '../Modal UI/ProfileEditModal';


export default function Profile({ isUserProfile }) {
    const { userDetail, getUserDetails } = useContext(UserContext);
    const profileEdit = useRef();

    function showProfileEdit() {
        profileEdit.current.open();
    }

    function resetModal() {
        profileEdit.current.close();
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <>
            <ModalContainer onReset={resetModal} ref={profileEdit} >
                <ProfileEditModal closeModal={resetModal} about={userDetail.about} designation={userDetail.designation} />
            </ModalContainer>
            <section className="profile">
                <div className="profile__cont">
                    <div className="profile__head">
                        <h1>Profile</h1>
                        {/* <hr /> */}
                    </div>
                    <div className="profile__main">
                        <div className="profile__left">
                            <div className="profile-image">
                                <ProfileImage className={'u-full-length-image'} />
                            </div>
                            <div className="section-info">
                                <div className="user-info">
                                    <div className="user-info-name u-bold">
                                        {userDetail.firstName + ' ' + userDetail.lastName}
                                    </div>
                                    <div className="user-info u-light">
                                        {/* {userDetail.email} */}
                                        {userDetail.designation}
                                    </div>
                                </div>
                                <div className="edit-profile-cont">
                                    <button className="edit-profile u-button-secondary" onClick={showProfileEdit}>
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="profile__right">
                            <ProfileInfo userDetail={userDetail} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}