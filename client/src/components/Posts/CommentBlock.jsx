import { formatDate } from "../../utils/formatDate";
import { PiThumbsUpDuotone, PiThumbsUpFill } from "react-icons/pi";
import UserProfile from "./UserProfile";

export default function CommentBlock({ data, isLiked, handleCommentLike, ...props }) {
    return (
        <div className="comment_cont" {...props}>
            <div className="comment_profile">
                <UserProfile initials={data.users?.initials} profileSrc={data.users?.profileSrc} />
            </div>

            <div className="comment_main">
                <div className="comment_body">
                    <div className="comment_user">
                        <div className="comment_user_name u-bold">
                            {data.users.firstName + " " + data.users.lastName}
                        </div>
                    </div>

                    <div className="comment_text">
                        {data.comment}
                    </div>

                    {/* <div className="comment_body_bottom">
                        <div className="comment_date">
                            {formatDate(data.createdAt)}
                        </div>
                        <div className="like_count">
                            {data.like}{data.like === 1 ? ' like' : ' likes'}
                        </div>
                    </div> */}
                </div>
                <div className="comment_main_bottom">
                    <div className="comment_date">
                        {formatDate(data.createdAt)}
                    </div>
                    <div className="like_count">
                        {data.like}{data.like === 1 ? ' like' : ' likes'}
                    </div>
                </div>
            </div>

            <div className="comment_interactions">
                <div className="like_cont">
                    <button className="post-interactions small-button" onClick={() => {handleCommentLike(data._id)}}>
                        {data.isLiked
                            ?
                            <PiThumbsUpFill
                                className='interaction-icons align'
                            />
                            :
                            <PiThumbsUpDuotone
                                className='interaction-icons align'
                            />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}