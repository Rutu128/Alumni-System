import { useContext } from "react";
import ProfileImage from "../Homepage UI/ProfileImage";
import { PostContext } from "../../context/PostContext";
import Post from "./Post";

export default function PostContainer(props) {
    const { posts, likePost, likeComment, getComments, newComment } = useContext(PostContext);

    return (
        <>
            <div className="posts">
                {posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <Post postData={post} getComments={getComments} newComment={newComment} likePost={likePost} likeComment={likeComment} />
                            {/* <div className="separator"></div> */}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

//Hello