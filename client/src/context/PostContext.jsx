import { createContext, useState } from "react";

export const PostContext = createContext({
    posts: [{
        user_id: String,
        post_id: String,
        dateTime: Date,
        description: String,
        likes: String,
        comments: {
            user_id: String,
            profile_url: String,
            comment_id: String,
            comment: String
        }
    }],
    submitNewPost: () => { },
    getPosts: () => { },
    getSpecificPosts: () => { },
})

export default function PostContextProvider({ children }){
    const [posts, setPosts] = useState({
        user_id: '',
        post_id: '',
        dateTime: '',
        description: '',
        likes: '',
        comments: {
            user_id: '',
            profile_url: '',
            comment_id: '',
            comment: ''
        }
    })

    async function handleNewPost(files, type){

    }

    const ctxValue = {
        posts: posts,
        submitNewPost: handleNewPost,
    }

    return <PostContext.Provider value={ctxValue}>
        { children }
    </PostContext.Provider>
}