import { useContext, useEffect, useState } from 'react';
import '../../sass/pages/_profile.scss';
import ProfileImage from '../Homepage UI/ProfileImage';
import { UserContext } from '../../context/UserContext';
import ProfileInfo from '../UI components/ProfileInfo';
import { useLocation } from 'react-router-dom';
import UserProfileImage from '../Posts/UserProfileImage';


export default function Profile() {
    const { getUserDetails } = useContext(UserContext);

    const location = useLocation();
    const { userId } = location.state || {};

    const [userDetail, setUserDetail] = useState({
        firstName: '',
        lastName: '',
        headline: '',
        designation: '',
        avatar: '',
        initials: '',
        posts: [],
    });

    useEffect(() => {
        async function fetchUserDetails() {
            // console.log(userId);
            
            const details = await getUserDetails(userId);
            console.log(details);
            
            setUserDetail(details[0]);
        }
        fetchUserDetails();
    }, []);

    return (
        <>
            <section className="profile">
                <div className="profile__cont">
                    <div className="profile__head">
                        <h1>Profile</h1>
                        {/* <hr /> */}
                    </div>
                    <div className="profile__main">
                        <div className="profile__left">
                            <div className="profile-image">
                                <UserProfileImage initials={userDetail.initials} profileSrc={userDetail.avatar} className={'full-length-image'} />
                            </div>
                            <div className="section-info">
                                <div className="user-info">
                                    <div className="user-info-name u-bold">
                                        {userDetail.firstName + ' ' + userDetail.lastName}
                                    </div>
                                    <div className="user-info u-light">
                                        {/* {userDetail.email} */}
                                        {userDetail.headline}
                                        <br />
                                        {userDetail.designation}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile__right">
                            {userDetail.firstName !== '' && <ProfileInfo userDetail={userDetail} notOwner={true} />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}