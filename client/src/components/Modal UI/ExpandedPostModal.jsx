import Post from "../Posts/Post";

export default function ExpandedPostModal({ postData, ...props }) {
    return (
        <>
            <Post postData={postData} modalView={true} {...props} />
        </>
    )
}