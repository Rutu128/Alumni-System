export default function UserProfile({profileSrc="", initials="", className=""}){
    if(profileSrc){
        return (
            <div className={"image-wrapper " + className}>
                <img src={profileSrc} className={"profile-img"} alt="User Profile" />
            </div>
        )
    }
    if(initials){
        return (
            <button className={"dummy-profile " + className}>
                {initials}
            </button>
        )
    }
}