import { useContext } from "react";
import ProfileImage from "../Homepage UI/ProfileImage";
import { PostContext } from "../../context/PostContext";
import Post from "./Post";
import { log } from "../../log";
import React from "react";

export default function PostContainer(props) {
    log('<PostContainer /> rendered', 3);
    const { posts, likePost, likeComment, getComments, newComment } = useContext(PostContext);

    return (
        <>
            <div className="posts">
                {posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <Post notOwner={true} postIndex={index} postData={post} getComments={getComments} newComment={newComment} likePost={likePost} likeComment={likeComment} />
                            {/* <div className="separator"></div> */}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

//Hello