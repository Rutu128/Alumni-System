import { useContext } from "react"
import { UserContext } from "../../context/UserContext"

export default function ProfileImage({className}) {
    const { userDetail } = useContext(UserContext);
    let initials = userDetail.firstName[0] + userDetail.lastName[0];
    let profileImg = userDetail.profileImg;

    if (profileImg === '') {
        return (
            <button className={"dummy-profile " + className}>
                {initials}
            </button>
        )
    }
    else {
        return (
            <img src={profileImg} className={className} alt="User Profile" />
        )
    }
}