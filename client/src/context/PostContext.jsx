import { createContext, useState } from "react";
import uploadFiles from "../utils/Uploads/UploadImage";
import postApi from "../utils/API/postApi";
import getApi from "../utils/API/getApi";
import putApi from "../utils/API/putApi";
import handleResponse from '../utils/responseHandler';
import deleteApi from "../utils/API/deleteApi";

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
            initials: String,
            avatar: String,
            _id: String,
        },
        likes: String,
    }],
    submitNewPost: () => { },
    getPosts: () => { },
    getPostData: () => { },
    likePost: () => { },
    likeComment: () => { },
    getComments: () => { },
    newComment: () => { },
    deletePost: () => { },
})

export default function PostContextProvider({ children }){
    const [posts, setPosts] = useState([])

    async function handleNewPost(files, type, description){
        let cloudUrls = [];
        // if(!files || files.length === 0){
        //     return {
        //         status: 400,
        //         message: 'No files selected'
        //     };
        // }
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
            return handleResponse(response);
        
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
        
        const apiStatus = handleResponse(response);
        
        if(apiStatus.status === 200){
            const postData = response.data.data;
            console.log(postData);
            
            setPosts(prevPosts => {
                return [
                    ...prevPosts,
                    ...postData
                ]
            });
        }
    }

    async function handleGetPostData(id){
        const response = await getApi('/post/findPost/' + id);
        const apiStatus = handleResponse(response);
        if(apiStatus.status === 200){
            return response.data.data;
        }
    }

    async function handleLikePost(id){
        const response = await putApi(`/post/like/${id}`);
        console.log(response);
        return handleResponse(response);
    }

    async function handleLikeComment(id){
        const response = await putApi(`/post/likeComment/${id}`);
        return handleResponse(response);
    }

    async function handleGetComments(id){
        const response = await getApi('/post/getComments/' + id);
        // const comments = [];
        
        const apiStatus = handleResponse(response);
        
        console.log(apiStatus.status);
        if(apiStatus.status === 200){
            console.log(response.data.data);
            
            // response.data.data.map(data => {
            //     comments.push(data.comment);
            // })
            // console.log(comments);
            return response.data.data;
        }
        if(apiStatus.status === 202){
            return [];
        }
    }
    
    async function handleNewComment(id, comment){
        const response = await postApi('/post/addComment/' + id, {
            comment: comment,
        });
        const apiStatus = handleResponse(response);
        console.log(response);
        if(apiStatus.status === 200){
            return {
                status: apiStatus.status,
            }
        }
    }

    async function handleDeletePost(id){
        const response = await deleteApi('/post/delete/' + id);
        return handleResponse(response);
    }

    const ctxValue = {
        posts: posts,
        submitNewPost: handleNewPost,
        getPosts: handleGetPosts,
        getPostData: handleGetPostData,
        likePost: handleLikePost,
        likeComment: handleLikeComment,
        getComments: handleGetComments,
        newComment: handleNewComment,
        deletePost: handleDeletePost,
    }

    return <PostContext.Provider value={ctxValue}>
        { children }
    </PostContext.Provider>
}