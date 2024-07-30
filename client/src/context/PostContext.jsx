import { createContext, useContext, useState } from "react";
import uploadFiles from "../utils/UploadImage";
import postApi from "../utils/postApi";
import getApi from "../utils/getApi";
import { UserContext } from "./UserContext";
import putApi from "../utils/putApi";

export const PostContext = createContext({
    posts: [{
        post_id: String,
        content: [{
            "url": String,
        }],
        description: String,
        createdAt: Date,
        comments: [],
        user: {
            firstName: String,
            lastName: String,
            initials: String
        },
        likes: String,
    }],
    submitNewPost: () => { },
    getPosts: () => { },
    getSpecificPosts: () => { },
    likePost: () => { },
})

export default function PostContextProvider({ children }){
    const { userDetail } = useContext(UserContext);

    const [posts, setPosts] = useState([])

    async function handleNewPost(files, type, description){
        let cloudUrls = [];
        if(type !== 'text'){
            cloudUrls = await uploadFiles(files, type);
        }
        console.log(cloudUrls);
        console.log('Description : ' + description);
        try {
            const response = await postApi('/post/uploadPost', {
                content: cloudUrls,
                description: description
            });
        
            console.log(response);
        
            if(response.response){
                if (response.response.status === 400 || response.response.status === 300) {
                    return {
                        status: response.response.status,
                    };
                }
            }
        
            if (response.data && response.data.statusCode) {
                console.log(response.data);
                return {
                    status: response.data.statusCode,
                };
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    async function handleGetPosts(page){
        const response = await getApi('/post/getpost/' + page);
        
        // console.log(response);
        if(response.response){
            if(response.response.status === 400){
                console.log("Error fetching posts!");
            }
        }
        
        const postData = response.data.data;
        console.log(postData);

        setPosts(prevPosts => {
            return [
                ...prevPosts,
                ...postData
            ]
        });
        // if()
    }

    async function handleLikePost(id){
        const response = await putApi('/post/like/' + id);
        console.log(response);
        if(response.data){
            if(response.data.statusCode === 200){
                return 200;
            }
        }
    }

    const ctxValue = {
        posts: posts,
        submitNewPost: handleNewPost,
        getPosts: handleGetPosts,
        likePost: handleLikePost,
    }

    return <PostContext.Provider value={ctxValue}>
        { children }
    </PostContext.Provider>
}