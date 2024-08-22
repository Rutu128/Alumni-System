import { useContext } from "react";
import ProfileImage from "../Homepage UI/ProfileImage";
import { PostContext } from "../../context/PostContext";
import Post from "./Post";

export default function PostContainer({ handleFetchPosts, posts, notOwner }) {
    const { likePost, likeComment, getComments, newComment, deletePost } = useContext(PostContext);

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
                                <Post 
                                    notOwner={notOwner} 
                                    postData={post} 
                                    // getComments={getComments} 
                                    // newComment={newComment} 
                                    // likePost={likePost} 
                                    // likeComment={likeComment} 
                                    // deletePost={deletePost}
                                    handleFetchPosts={handleFetchPosts}
                                />
                                {/* <div className="separator"></div> */}
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}

//Hello