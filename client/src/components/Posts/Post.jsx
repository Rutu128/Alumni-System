import ProfileImage from "../Homepage UI/ProfileImage";
import UserProfile from "./UserProfile";
import { formatDate } from "../../utils/formatDate";

export default function Post({ postData }) {

    const isImage = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
    };

    const isVideo = (url) => {
        return url.match(/\.(mp4|webm|ogg)$/) != null;
    };

    return (
        <div className="post">
            <div className="post__container">
                <div className="post__head">
                    <div className="post__profile">
                        <UserProfile initials={postData.user.initials} className="user-profile" />
                    </div>
                    <div className="post__userInfo">
                        <div className="user_name">
                            {postData.user.firstName + ' ' + postData.user.lastName}
                        </div>
                        <div className="post_date">
                            {formatDate(postData.createdAt, true)}
                        </div>
                    </div>
                </div>
                <div className="post__description">
                    {postData.description}
                </div>
                <div className="post__content">
                    {postData.content.length > 0 &&
                        <div className="content-container">
                            {postData.content.map((content, index) => {
                                return (
                                    <div className="media-container" key={index}>
                                        {isImage(content.url) && <img src={content.url} alt="Post media" />}
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
                <div className="post__statistics">
                    <div className="likes">
                        {postData.likes + ' Likes'}
                    </div>
                    <div>|</div>
                    <div className="comments">
                        {postData.comments.length + ' Comments'}
                    </div>
                </div>
                <div className="post__foot">
                    <button className="post-interactions">
                        Like
                    </button>
                    <button className="post-interactions">
                        Comment
                    </button>
                    <button className="post-interactions">
                        Share
                    </button>
                </div>
            </div>
        </div>
    )
}