// import { useParams } from "react-router-dom";
// import Post from "../Posts/Post";
// import { useContext, useEffect, useRef, useState } from "react";
// import Loading from "react-loading";
// import { PostContext } from "../../context/PostContext";
// import ModalContainer from "./ModalContainer";

// export default function ExpandedPostModal({ ...props }) {
//     const [postData, setPostData] = useState({
//         isLoading: true,
//     });

//     const modalRef = useRef();

//     const { getPostData } = useContext(PostContext);

//     const { id } = useParams();

//     useEffect(() => {
//         console.log(id);
//         async function fetchPost() {
//             const post = await getPostData(id);
//             console.log(post);

//             if (post) {
//                 setPostData(prevData => {
//                     return {
//                         ...prevData,
//                         ...post[0],
//                         isLoading: false,
//                     }
//                 });
//                 modalRef.current.open();
//             } else {
//                 console.log('Post not found');
//             }
//         }
//         fetchPost();
//     }, [])

//     return (
//         <>
//             <ModalContainer ref={modalRef}>
//                 {postData.isLoading ?
//                     <div className="u-fallback">
//                         <Loading
//                             type="spin"
//                             width={'3rem'}
//                             height={'3rem'}
//                         />
//                     </div>
//                     :
//                     <Post postData={postData} notOwner={true} modalView={true} />
//                 }
//             </ModalContainer>
//         </>
//     )
// }

import { useLocation, useNavigate, useParams } from "react-router-dom";
import Post from "../Posts/Post";
import { useContext, useEffect, useRef, useState } from "react";
import Loading from "react-loading";
import { PostContext } from "../../context/PostContext";
import ModalContainer from "./ModalContainer";
import { PiX } from "react-icons/pi";
import NavigateBack from "../UI components/NavigateBack";

export default function ExpandedPostModal({ isModal = false }) {
    const [postData, setPostData] = useState({
        isLoading: true,
    });

    const modalRef = useRef();
    const navigate = useNavigate();

    const { getPostData } = useContext(PostContext);
    // const location = useLocation();
    // const isModal = location.state && location.state.modal;


    const { id } = useParams();

    useEffect(() => {
        async function fetchPost() {
            const post = await getPostData(id);

            if (post) {
                setPostData(prevData => ({
                    ...prevData,
                    ...post[0],
                    isLoading: false,
                }));
                if (isModal) {
                    modalRef.current.open();
                }
            } else {
                console.log('Post not found');
            }
        }
        fetchPost();
    }, [id, getPostData, isModal]);

    if (isModal) {
        return (
            <>
                <ModalContainer ref={modalRef}>
                    {postData.isLoading ?
                        <div className="u-fallback">
                            <Loading type="spin" width={'3rem'} height={'3rem'} />
                        </div>
                        :
                        <div className="post__modal">
                            <div className="post-head">
                                <h1>Post</h1>
                                <button className='post-head-close' onClick={() => navigate(-1)}><PiX className='post-head-icon' /></button>
                            </div>
                            <Post postData={postData} notOwner={true} modalView={true} />
                        </div>
                    }
                </ModalContainer>
            </>
        );
    } else {
        return (
            <>
                {postData.isLoading ?
                    <div className="u-fallback">
                        <Loading type="spin" width={'3rem'} height={'3rem'} />
                    </div>
                    :
                    <div className="post__regular">
                        <div className="profile__head">
                            <NavigateBack to={'/'} />
                            <h1>Post</h1>
                        </div>
                        <Post postData={postData} notOwner={true} modalView={false} />
                    </div>
                }
            </>
        );
    }
}
