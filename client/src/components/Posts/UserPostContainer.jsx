import { useContext } from "react";
import ProfileImage from "../Homepage UI/ProfileImage";
import { PostContext } from "../../context/PostContext";
import Post from "./Post";

export default function PostContainer({ posts }) {
    const { likePost, likeComment, getComments, newComment } = useContext(PostContext);

    if (posts.length === 0 || posts === null) {
        return null;
    }
    else {
        return (
            <>
                <div className="posts">
                    {posts.map((post, index) => {
                        return (
                            <div key={index}>
                                <Post postData={post} getComments={getComments} newComment={newComment} likePost={likePost} likeComment={likeComment} />
                                <div className="separator"></div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}

//Hello