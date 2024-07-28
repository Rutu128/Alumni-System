import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

export default function ProfileImage({className}) {
    const { userDetail } = useContext(UserContext);
    let profileImg = userDetail.profileImg;

    if (profileImg === (undefined || null || "")) {
        return (
            <button className={"dummy-profile " + className}>
                {userDetail.initials}
            </button>
        )
    }
    else {
        return (
            <img src={profileImg} className={"profile-img " + className} alt="User Profile" />
        )
    }
}