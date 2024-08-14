import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { log } from "../../log";

export default function ProfileImage({className}) {
    const { userDetail } = useContext(UserContext);
    let profileImg = userDetail.avatar;

    if (profileImg === (undefined || null || "")) {
        return (
            <div className={"dummy-profile " + className}>
                {userDetail.initials}
            </div>
        )
    }
    else {
        return (
            <img src={profileImg} className={"profile-img " + className} alt="User Profile" />
        )
    }
}