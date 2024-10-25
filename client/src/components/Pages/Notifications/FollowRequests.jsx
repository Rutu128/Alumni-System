import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../context/UserContext";
import { formatDate } from "../../../utils/formatDate";
import UserProfile from "../../Posts/UserProfileImage";
import { Link } from "react-router-dom";

export default function FollowRequests() {
    const [followRequests, setFollowRequests] = useState([]);

    const { getFollowRequests, acceptFollowRequest } = useContext(UserContext);

    useEffect(() => {
        fetchRequests();
    }, []);

    async function fetchRequests() {
        const data = await getFollowRequests();
        console.log(data);
        setFollowRequests(data);
    }

    async function acceptRequest(id) {
        const res = await acceptFollowRequest(id);
        console.log(res);
        if (res) {
            const data = await fetchRequests();
            setFollowRequests(data);
        }
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
                                        <Link to={`/users/${request.firstName}_${request.lastName}`} state={{ userId: request.userId }} className='u-user-link'>
                                            <UserProfile profileSrc={request.avatar} className="user-profile" />
                                        </Link>
                                    </div>
                                    <div className="request__info">
                                        <div className="request__info--head">
                                            <Link to={`/users/${request.firstName}_${request.lastName}`} state={{ userId: request.userId }} className='u-user-link u-il-blk'>
                                                <div className="username">{`${request.firstName} ${request.lastName}`}</div>
                                            </Link>
                                            <div className="request__date u-il-blk">
                                                {formatDate(request.updatedAt)}
                                            </div>
                                        </div>
                                        <p>Sent you a follow request</p>
                                    </div>
                                </div>
                                <div className="request__btn">
                                    <button className="u-button u-button-primary" onClick={() => {
                                        acceptRequest(request._id);
                                    }}>Accept</button>
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
