import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

export default function EditProfile() {
    const { userDetail } = useContext(UserContext);

    return (
        <>
            <section className="profile">
                <div className="profile__cont">
                    <div className="profile__head">
                        <NavigateBack />
                        <h1>Edit profile</h1>
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
                                    <div className="u-light">
                                        <div className="user-info-cell">
                                            {userDetail.headline}
                                        </div>
                                        <div className="user-info-cell">
                                            {userDetail.designation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile__right">
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}