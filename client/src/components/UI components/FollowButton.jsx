import { useContext, useEffect, useState } from "react";
import { PiUserPlus, PiUserCheck } from "react-icons/pi";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";


export default function FollowButton({ postIndex, isRequested, isAccepted, id, isSmall = false }) {
    // const [following, setFollowing] = useState(isRequested && isAccepted);

    const { sendFollowRequest } = useContext(UserContext);
    const { updatePostState } = useContext(PostContext);

    async function handleClick() {
        console.log('Follow clicked');
        // setFollowing(prevValue => !prevValue);
        if (!isRequested){
            // const res = await sendFollowRequest(id);
            // console.log(res);
            updatePostState("isRequested", true, postIndex);
        }
    }

    if (isRequested && isAccepted) {
        return (
            <button className={`u-button ${isSmall ? 'follow-button-small following-small' : 'follow-button following'}`} onClick={handleClick}>
                <PiUserCheck className={`u-phosphor-icons ${isSmall ? 'u-icon-font' : 'u-icon-font-large'} u-icon-margin-r`} />
                Following
            </button>
        )
    } else if (isRequested && !isAccepted) {
        return (
            <button className={`u-button ${isSmall ? 'follow-button-small following-small' : 'follow-button following'}`} onClick={handleClick}>
                <PiUserCheck className={`u-phosphor-icons ${isSmall ? 'u-icon-font' : 'u-icon-font-large'} u-icon-margin-r`} />
                Requested
            </button>
        )
    } 
    else {
        return (
            <button className={`u-button ${isSmall ? 'follow-button-small' : 'follow-button'}`} onClick={handleClick}>
                <PiUserPlus className={`u-phosphor-icons ${isSmall ? 'u-icon-font' : 'u-icon-font-large'} u-icon-margin-r`} />
                Follow
            </button>
        )
    }
}