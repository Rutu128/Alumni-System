import { useState } from "react";
import { PiUserPlus, PiUserCheck } from "react-icons/pi";


export default function FollowButton({ isFollowing, onClick, isSmall = false }) {
    const [following, setFollowing] = useState(isFollowing);

    function handleClick() {
        console.log('Follow clicked');
        setFollowing(prevValue => !prevValue);
    }

    if (following) {
        return (
            <button className={`u-button ${isSmall ? 'follow-button-small following-small' : 'follow-button following'}`} onClick={handleClick}>
                <PiUserCheck className={`u-phosphor-icons ${isSmall ? 'u-icon-font' : 'u-icon-font-large'} u-icon-margin-r`} />
                Following
            </button>
        )
    } else {
        return (
            <button className={`u-button ${isSmall ? 'follow-button-small' : 'follow-button'}`} onClick={handleClick}>
                <PiUserPlus className={`u-phosphor-icons ${isSmall ? 'u-icon-font' : 'u-icon-font-large'} u-icon-margin-r`} />
                Follow
            </button>
        )
    }
}