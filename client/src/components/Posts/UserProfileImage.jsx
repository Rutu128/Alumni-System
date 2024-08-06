export default function UserProfile({profileSrc="", initials="", className=""}){
    if(profileSrc){
        return (
            <img src={profileSrc} className={"profile-img " + className} alt="User Profile" />
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