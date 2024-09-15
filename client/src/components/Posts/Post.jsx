/* The above code is a React functional component called `Post` that represents a post in a social
media application. Here is a summary of what the code is doing: */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserProfile from "./UserProfileImage";
import { formatDate } from "../../utils/formatDate";

import { PiThumbsUpDuotone, PiChatTeardropText, PiShare, PiChatTeardropTextFill, PiThumbsUpFill, PiDotsThreeVerticalBold, PiTrash, PiArrowsOut, PiLinkSimple, PiX } from "react-icons/pi";
import ProfileImage from '../Homepage UI/ProfileImage';
import { isImage, isVideo, isPdf, getProcessedPdfUrl } from '../../utils/Uploads/urlProcessor';
import SendButton from '../UI components/SendButton';
import CommentBlock from './CommentBlock';
import parse from 'html-react-parser';
import Dropdown from '../UI components/Dropdown';
import { UserContext } from '../../context/UserContext';
import { PostContext } from '../../context/PostContext';
import { useEmojiFont } from '../../Hooks/useEmojiFont';
import InputEmoji from 'react-input-emoji';
import { } from 'react-input-emoji';
import VideoPost from '../UI components/Video';
import FollowButton from '../UI components/FollowButton';

export default function Post({ postData, modalView = false, notOwner, handleFetchPosts, profileView=false }) {
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

    const [comment, setComment] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { getOwnerDetails, createNotification } = useContext(UserContext);
    const { likePost, likeComment, getComments, newComment: postNewComment, deletePost } = useContext(PostContext);


    const location = useLocation();
    const navigate = useNavigate();
    const commentRef = useRef();
    const textRef = useRef(null);
    useEmojiFont(textRef);

    const username = postData.user.firstName + '_' + postData.user.lastName;

    useEffect(() => {
        if ((postState.comment || modalView) && postState.fetchedComments.length === 0) {
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
        if (notOwner) return;
        const res = await deletePost(postData._id);
        if (res.status === 200) {
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
        const res = await postNewComment(postData._id, comment);
        if (res.status === 200) {
            fetchComments();
            setComment('');
            setPostState(prevState => {
                return {
                    ...prevState,
                    newCommentLoading: false,
                }
            })
        }
    }

    const closeDropdown = () => {

    }

    return (
        <div className={`post ${modalView ? 'post-modalView' : null}`}>
            <div className="post__container">
                <div className="post__head">
                    <div className="post__profile">
                        <Link to={`/users/${username}`} state={{ userId: postData.user._id }} className='u-user-link'>
                            <UserProfile initials={postData.user.initials} profileSrc={postData.user.avatar} className="user-profile" />
                        </Link>
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
                    {
                        !profileView &&
                        <div className="post_actions u-margin-right-small">
                            <FollowButton isFollowing={postData.isFollowing} isRequested={postData.isRequested} isAccepted={postData.isAccepted} isSmall={true} id={postData.user._id}  />
                        </div>
                    }
                    <Dropdown isOpen={dropdownOpen} setIsOpen={setDropdownOpen} label={null} icon={<PiDotsThreeVerticalBold className='post-head-icon u-phosphor-icons' />} buttonClassName={'action-button u-button u-button-tertiary u-icon-button-tertiary'} >
                        <div className="post__menu">
                            <button
                                className='u-button menu--item'
                                onClick={(e) => {
                                    if (modalView) {
                                        navigate(-1);
                                    } else {
                                        navigate(`/post/${postData._id}`, { state: { background: location } })
                                    }
                                    setDropdownOpen(false);
                                }
                                }
                            >
                                {modalView ?
                                    <PiX className='u-icon-font u-icon-margin-r' />
                                    :
                                    <PiArrowsOut className='u-icon-font u-icon-margin-r' />
                                }
                                {modalView ? 'Close' : 'Open in expanded view'}
                            </button>
                            <button
                                className='u-button menu--item'
                            >
                                <PiShare className='u-icon-font u-icon-margin-r' />
                                Share
                            </button>
                            <button
                                className='u-button menu--item'
                                onClick={(e) => {
                                    navigator.clipboard.writeText(`${window.location.origin}/post/${postData._id}`)
                                    createNotification('Link copied to clipboard', 'success');
                                    setDropdownOpen(false);
                                }}
                            >
                                <PiLinkSimple className='u-icon-font u-icon-margin-r' />
                                Copy link
                            </button>
                            {!notOwner &&
                                <button
                                    className='u-button menu--item item-red'
                                    onClick={(e) => {
                                        handleDeletePost();
                                        setDropdownOpen(false);
                                    }}
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
                                        <VideoPost src={content.url} />
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
                    {!modalView &&
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
                    }
                    <button className="post-interactions" onClick={() => handleSelection('share')}>
                        <PiShare
                            className={`interaction-icons`}
                        />
                        Share
                    </button>
                </div>
            </div>
            {(postState.comment || modalView) &&
                <div className={`post__comments ${postState.animateComment && 'comment-animate'}`}>
                    <div className="new_comment">
                        <div className="profile_comm_user">
                            <ProfileImage />
                        </div>
                        <div className="comment-input">
                            {/* <input
                                type="text"
                                ref={commentRef}
                                placeholder='Add a comment...'
                                onKeyUp={(e) => {
                                    e.key === "Enter" && newComment()
                                }}
                                autoFocus
                            /> */}
                            <InputEmoji
                                placeholder='Add a comment...'
                                inputClass='comment-input-field'
                                value={comment}
                                onChange={setComment}
                                fontFamily='Mona-sans, sans-serif'
                                autoFocus
                                theme='light'
                                keepOpened
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
                    <div className="comment--cont">
                        {(postState.fetchedComments.length > 0) &&
                            postState.fetchedComments.map((comment, index) => (
                                <CommentBlock data={comment} handleCommentLike={handleLikeComment} key={index} />
                            ))
                        }
                    </div>
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