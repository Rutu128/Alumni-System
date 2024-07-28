import { useContext } from "react";
import ProfileImage from "../Homepage UI/ProfileImage";
import { PostContext } from "../../context/PostContext";
import Post from "./Post";

export default function PostContainer(props) {
    const { posts } = useContext(PostContext);

    return (
        <>
            <div className="posts">
                { posts.map((post, index) => {
                    return (
                        <Post postData={post} key={index} />
                    )    
                })}
            </div>
        </>
    )
}