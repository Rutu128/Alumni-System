import { useContext, useEffect, useRef, useState } from "react";
import { PiUserPlus, PiUserCheck } from "react-icons/pi";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import ModalContainer from "../Modal UI/ModalContainer";


export default function FollowButton({ profileRequest, setUserDetail, postIndex, isRequested, isAccepted, id, isSmall = false }) {
    // const [following, setFollowing] = useState(isRequested && isAccepted);

    const { sendFollowRequest } = useContext(UserContext);
    const { updatePostState } = useContext(PostContext);

    const modalRef = useRef();

    async function handleClick() {
        console.log('Follow clicked');
        // setFollowing(prevValue => !prevValue);
        if (!isRequested) {
            const res = await sendFollowRequest(id);
            if (res.status === 200) {
                console.log("Post Index: ", postIndex);
                profileRequest && setUserDetail((prevData) => {
                    return {
                        ...prevData,
                        isRequested: true,
                    }
                })
                !profileRequest && updatePostState("isRequested", true, postIndex);
            }
        }
    }

    function openModal() {
        modalRef.current.open();
    }

    function closeModal() {
        modalRef.current.close();
    }

    async function handleDeleteRequest() {

    }

    return (
        <>
            <ModalContainer ref={modalRef} >
                <div className="request_modal__cont">
                    {isAccepted ?
                        <>
                            <div className="modal_head">
                                <h2 className="heading-secondary-dark">Unfollow</h2>
                            </div>
                            <div className="modal_body">
                                <p>Are you sure you want to unfollow this user?</p>
                                <div className="modal__btn">
                                    <button className="u-button u-button-secondary" onClick={closeModal}>Cancel</button>
                                    <button className="u-button u-button-primary" onClick={handleDeleteRequest}>Unfollow</button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="modal_head">
                                <h2 className="heading-secondary-dark">Cancel Request</h2>
                            </div>
                            <div className="modal_body">
                                <p>Are you sure you want to delete your follow request?</p>
                                <div className="modal__btn">
                                    <button className="u-button u-button-secondary" onClick={closeModal}>Cancel</button>
                                    <button className="u-button u-button-primary" onClick={handleDeleteRequest}>Delete</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </ModalContainer>
            {(isRequested && isAccepted) &&
                <button className={`u-button ${isSmall ? 'follow-button-small following-small' : 'follow-button following'}`} onClick={handleClick}>
                    <PiUserCheck className={`u-phosphor-icons ${isSmall ? 'u-icon-font' : 'u-icon-font-large'} u-icon-margin-r`} />
                    Following
                </button>
            }
            {(isRequested && !isAccepted) &&
                <button className={`u-button ${isSmall ? 'follow-button-small following-small' : 'follow-button following'}`} onClick={openModal}>
                    <PiUserCheck className={`u-phosphor-icons ${isSmall ? 'u-icon-font' : 'u-icon-font-large'} u-icon-margin-r`} />
                    Requested
                </button>
            }
            {(!isRequested && !isAccepted) &&
                <button className={`u-button ${isSmall ? 'follow-button-small' : 'follow-button'}`} onClick={handleClick}>
                    <PiUserPlus className={`u-phosphor-icons ${isSmall ? 'u-icon-font' : 'u-icon-font-large'} u-icon-margin-r`} />
                    Follow
                </button>
            }
        </>
    )
}