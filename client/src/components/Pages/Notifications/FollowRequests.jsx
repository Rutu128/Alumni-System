import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/UserContext";
import { formatDate } from "../../../utils/formatDate";
import UserProfile from "../../Posts/UserProfileImage";

export default function FollowRequests() {
    const [followRequests, setFollowRequests] = useState([]);

    const { getFollowRequests } = useContext(UserContext);

    useEffect(() => {
        async function fetchRequests() {
            const data = await getFollowRequests();
            console.log(data);
            setFollowRequests(data);
        }
        fetchRequests();
    }, []);

    async function acceptRequest(){
        
    }

    return (
        <div className="follow-requests">
            <div className="follow-requests-head">
                <h2 className="heading-secondary-dark-small underline u-margin-bottom-s_small">
                    Follow Requests
                </h2>
            </div>
            <div className="follow-requests-cont">
                {followRequests.map((request, index) => {
                    return (
                        <div className="request" key={index}>
                            <div className="request__cont">
                                <div className="request__cont-left">
                                    <div className="request__avatar">
                                        <UserProfile profileSrc={request.avatar} className="user-profile" />
                                    </div>
                                    <div className="request__info">
                                        <div className="request__info--head">
                                            <div className="username">{`${request.firstName} ${request.lastName}`}</div>
                                            {/* <div className="request__date">
                                                {formatDate(request.createdAt)}
                                            </div> */}
                                        </div>
                                        <p>Sent you a follow request</p>
                                    </div>
                                </div>
                                <div className="request__btn">
                                    <button className="u-button u-button-primary">Accept</button>
                                    <button className="u-button u-button-secondary">Decline</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
