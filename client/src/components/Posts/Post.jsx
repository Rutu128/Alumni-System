/* The above code is a React functional component called `Post` that represents a post in a social
media application. Here is a summary of what the code is doing: */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import UserProfile from "./UserProfileImage";
import { formatDate } from "../../utils/formatDate";

import { PiThumbsUpDuotone, PiChatTeardropText, PiShare, PiChatTeardropTextFill, PiThumbsUpFill, PiDotsThreeVerticalBold } from "react-icons/pi";
import ProfileImage from '../Homepage UI/ProfileImage';
import { isImage, isVideo, isPdf, getProcessedPdfUrl } from '../../utils/urlProcessor';
import SendButton from '../UI components/SendButton';
import CommentBlock from './CommentBlock';
import { log } from '../../log';
import Loading from 'react-loading';
import parse from 'html-react-parser';



export default function Post({ postData, likePost, likeComment, getComments, newComment: postNewComment, modalView = false, notOwner }) {
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
    });

    const commentRef = useRef();

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
        <div className="post">
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
                    {!notOwner &&
                        <div className="post_actions">
                            <button className="action-button u-button u-button-tertiary u-icon-button-tertiary">
                                <PiDotsThreeVerticalBold className='post-head-icon u-phosphor-icons' />
                            </button>
                        </div>
                    }
                </div>
                <div className="post__description">
                    <div className="description--text parsed-editor-text">
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
