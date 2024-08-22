/* The above code is a React functional component called `Post` that represents a post in a social
media application. Here is a summary of what the code is doing: */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from "./UserProfileImage";
import { formatDate } from "../../utils/formatDate";

import { PiThumbsUpDuotone, PiChatTeardropText, PiShare, PiChatTeardropTextFill, PiThumbsUpFill, PiDotsThreeVerticalBold, PiTrash, PiArrowsOut, PiLinkSimple } from "react-icons/pi";
import ProfileImage from '../Homepage UI/ProfileImage';
import { isImage, isVideo, isPdf, getProcessedPdfUrl } from '../../utils/Uploads/urlProcessor';
import SendButton from '../UI components/SendButton';
import CommentBlock from './CommentBlock';
import { log } from '../../log';
import Loading from 'react-loading';
import parse from 'html-react-parser';
import Dropdown from '../UI components/Dropdown';
import { UserContext } from '../../context/UserContext';
import { PostContext } from '../../context/PostContext';
import { useEmojiFont } from '../../Hooks/useEmojiFont';



export default function Post({ postData, modalView = false, notOwner, handleFetchPosts }) {
    // log('<Post /> rendered', 4);

    const [postState, setPostState] = useState({
        isLiked: postData.isLiked,
        like: postData.isLiked,
        comment: false,
        fetchedComments: [],
        fetchingComments: false,
        newCommentLoading: false,
        animateComment: false,
        commentCount: postData.comments,
        showMenu: false,
    });

    const { getOwnerDetails, createNotification } = useContext(UserContext);
    const { likePost, likeComment, getComments, newComment: postNewComment, deletePost } = useContext(PostContext);


    const commentRef = useRef();
    const textRef = useRef(null);
    useEmojiFont(textRef);

    const username = postData.user.firstName + '_' + postData.user.lastName;

    useEffect(() => {
        if (postState.comment && postState.fetchedComments.length === 0) {
            fetchComments();
        }
    }, [postState.comment]);

    const fetchComments = async () => {
        setPostState(prevOption => {
            return {
                ...prevOption,
                fetchingComments: true
            }
        });
        const comments = await getComments(postData._id);
        setPostState(prevOption => ({
            ...prevOption,
            fetchedComments: comments,
            fetchingComments: false,
            commentCount: comments.length,
        }));
    };

    const handleSelection = async (option) => {
        if (option === 'like') {
            setPostState(prevOption => ({
                ...prevOption,
                like: !prevOption.like,
            }));
            console.log(postData._id);

            const res = await likePost(postData._id);
            if (res === 200) {
                postData.likes += postState.like ? -1 : 1;
            }
        } else if (option === 'comment') {
            setPostState(prevOption => ({
                ...prevOption,
                comment: !prevOption.comment,
                animateComment: !prevOption.animateComment,
            }));
        }
    };

    async function handleLikeComment(id) {
        const res = await likeComment(id);
        if (res.status === 200) {
            fetchComments();
        }
    }

    async function handleDeletePost() {
        if(notOwner) return;
        const res = await deletePost(postData._id);
        if(res.status === 200){
            console.log('Post deleted');
            createNotification('Post deleted', 'success');
            handleFetchPosts();
        }
    }

    const newComment = async () => {
        setPostState(prevState => {
            return {
                ...prevState,
                newCommentLoading: true,
            }
        })
        const res = await postNewComment(postData._id, commentRef.current.value);
        if (res.status === 200) {
            fetchComments();
            commentRef.current.value = "";
            setPostState(prevState => {
                return {
                    ...prevState,
                    newCommentLoading: false,
                }
            })
        }
    }

    return (
        <div className={`post ${modalView ? 'post-modalView' : null}`}>
            {modalView &&
                <button className='post-head-close' onClick={handleCloseModal}><PiX className='post-head-icon' /></button>
            }
            <div className="post__container">
                <div className="post__head">
                    <div className="post__profile">
                        <UserProfile initials={postData.user.initials} profileSrc={postData.user.avatar} className="user-profile" />
                    </div>
                    <div className="post__userInfo">
                        <div className="user_name">
                            <Link to={`/users/${username}`} state={{ userId: postData.user._id }} className='u-user-link'>
                                {postData.user.firstName + ' ' + postData.user.lastName}
                            </Link>
                        </div>
                        <div className="post_date">
                            {formatDate(postData.createdAt)}
                        </div>
                    </div>
                        <Dropdown label={null} icon={<PiDotsThreeVerticalBold className='post-head-icon u-phosphor-icons' />} buttonClassName={'action-button u-button u-button-tertiary u-icon-button-tertiary'} >
                            <div className="post__menu">
                                <button
                                    className='u-button menu--item'
                                >
                                    <PiArrowsOut className='u-icon-font u-icon-margin-r' />
                                    Open in expanded view
                                </button>
                                <button
                                    className='u-button menu--item'
                                >
                                    <PiShare className='u-icon-font u-icon-margin-r' />
                                    Share
                                </button>
                                <button
                                    className='u-button menu--item'
                                >
                                    <PiLinkSimple className='u-icon-font u-icon-margin-r' />
                                    Copy link
                                </button>
                                {!notOwner &&
                                    <button 
                                    className='u-button menu--item item-red'
                                    onClick={handleDeletePost}
                                >
                                    <PiTrash className='u-icon-font u-icon-margin-r' />
                                    Delete
                                </button>}
                            </div>
                        </Dropdown>
                </div>
                <div className="post__description">
                    <div ref={textRef} className="description--text parsed-editor-text emoji-text">
                        {parse(postData.description)}
                    </div>
                </div>
                <div className="post__content">
                    {postData.content.length > 0 &&
                        <div className="content-container">
                            {postData.content.map((content, index) => (
                                <div className="media-container" key={index}>
                                    {isImage(content.url) && <img src={content.url} alt="Post media" />}
                                    {isVideo(content.url) && (
                                        <video controls>
                                            <source src={content.url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    {isPdf(content.url) && (
                                        <img
                                            src={getProcessedPdfUrl(content.url)}
                                            alt='User content'
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className="post__statistics">
                    <div className="likes">
                        {(postData.isLiked ? (!postState.like ? postData.likes - 1 : postData.likes) : (postState.like ? postData.likes + 1 : postData.likes)) + ' Likes'}
                    </div>
                    <div>|</div>
                    <div className="comments">
                        {postState.commentCount + ' Comments'}
                    </div>
                </div>
                <div className="post__foot">
                    <button className="post-interactions" onClick={() => handleSelection('like')}>
                        {postState.like
                            ?
                            <PiThumbsUpFill
                                className='interaction-icons align animate-like'
                            />
                            :
                            <PiThumbsUpDuotone
                                className='interaction-icons align'
                            />
                        }
                        Like
                    </button>
                    <button className="post-interactions" onClick={() => handleSelection('comment')}>
                        {postState.comment
                            ?
                            <PiChatTeardropTextFill
                                className='interaction-icons align'
                            />
                            :
                            <PiChatTeardropText
                                className='interaction-icons align'
                            />
                        }
                        Comment
                    </button>
                    <button className="post-interactions" onClick={() => handleSelection('share')}>
                        <PiShare
                            className={`interaction-icons`}
                        />
                        Share
                    </button>
                </div>
            </div>
            {postState.comment &&
                <div className={`post__comments ${postState.animateComment && 'comment-animate'}`}>
                    <div className="new_comment">
                        <div className="profile_comm_user">
                            <ProfileImage />
                        </div>
                        <div className="comment-input">
                            <input
                                type="text"
                                ref={commentRef}
                                placeholder='Add a comment...'
                                onKeyUp={(e) => {
                                    e.key === "Enter" && newComment()
                                }}
                            />
                        </div>
                        <div className="comment-submit" onClick={newComment}>
                            <SendButton isLoading={postState.newCommentLoading} />
                        </div>
                    </div>
                    {/* {postState.fetchingComments ? 
                        <div className="u-fallback">
                            <Loading type='spin' color='$color-theme-light' width={'2rem'} height={'2rem'} />
                        </div> 
                        : */}
                    {(postState.fetchedComments.length > 0) &&
                        postState.fetchedComments.map((comment, index) => (
                            <CommentBlock data={comment} handleCommentLike={handleLikeComment} key={index} />
                        ))}

                </div>
            }
        </div>
    );
}


{/* <div className="post__actions">
                            <button 
                                className="action-button u-button u-button-tertiary u-icon-button-tertiary" 
                                onFocus={() => setPostState(prev => { return { ...prev, showMenu: !prev.showMenu } })}
                            >
                                <PiDotsThreeVerticalBold className='post-head-icon u-phosphor-icons' />
                            </button>
                            {postState.showMenu &&
                                <div className='post__actions--menu'>
                                    <h1>Actions menu</h1>
                                    <button className='menu-button'>Delete</button>
                                </div>
                            }
                        </div> */}