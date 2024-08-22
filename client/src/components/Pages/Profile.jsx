import { useContext, useEffect, useState } from 'react';
import '../../sass/pages/_profile.scss';
import ProfileImage from '../Homepage UI/ProfileImage';
import { UserContext } from '../../context/UserContext';
import ProfileInfo from '../UI components/ProfileInfo';
import { useLocation } from 'react-router-dom';
import UserProfileImage from '../Posts/UserProfileImage';
import { GlobalContext } from '../../context/GlobalContext';
import NavigateBack from '../UI components/NavigateBack';


export default function Profile() {
    
    const [userDetail, setUserDetail] = useState({
        firstName: '',
        lastName: '',
        headline: '',
        designation: '',
        avatar: '',
        initials: '',
    });
    
    const location = useLocation();
    const { userId } = location.state || {};
    
    const { getUserDetails } = useContext(UserContext);

    useEffect(() => {
        async function fetchUserDetails() {
            console.log(userId);
            
            const details = await getUserDetails(userId);
            console.log(details);
            
            setUserDetail(details);
        }
        fetchUserDetails();
    }, []);

    return (
        <>
            <section className="profile">
                <div className="profile__cont">
                    <div className="profile__head">
                        <NavigateBack />
                        <h1>Profile</h1>
                        {/* <hr /> */}
                    </div>
                    <div className="profile__main">
                        <div className="profile__left">
                            <div className="profile-image">
                                <UserProfileImage profileSrc={userDetail.avatar} className={'full-length-image'} />
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